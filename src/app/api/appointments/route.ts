import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')

    const role = (session.user as any).role
    let where: any = {}
    if (role === 'CUSTOMER') where = { customerId: session.user.id }
    else if (role === 'THERAPIST') where = { staffId: session.user.id }
    // ADMIN and SUPER_ADMIN see all
    
    if (status) where.status = status

    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        customer: { select: { name: true, email: true, phone: true } },
        staff: { select: { name: true } },
        service: { select: { name: true, duration: true, price: true } },
      },
      orderBy: { date: 'desc' },
    })

    return NextResponse.json(appointments)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 })
  }
}

import { sendBookingConfirmation } from '@/lib/email'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const { serviceId, staffId, date, timeSlot, notes, paymentMethod } = body

    if (!serviceId || !date || !timeSlot) {
      return NextResponse.json({ error: 'Service, date and time slot are required' }, { status: 400 })
    }

    const service = await prisma.service.findUnique({ where: { id: serviceId } })
    if (!service) return NextResponse.json({ error: 'Service not found' }, { status: 404 })

    const gst = service.price * 0.18
    const totalAmount = service.price
    const finalAmount = service.price + gst

    const appointment = await prisma.appointment.create({
      data: {
        customerId: session.user.id,
        serviceId,
        staffId: staffId || null,
        date: new Date(date),
        timeSlot,
        duration: service.duration,
        totalAmount,
        finalAmount,
        paymentMethod: paymentMethod || 'PENDING',
        notes,
        status: 'PENDING',
        paymentStatus: 'PENDING',
      },
      include: {
        service: true,
        customer: { select: { name: true, email: true } },
        staff: { select: { name: true } },
      },
    })

    // Try sending confirmation email
    try {
      await sendBookingConfirmation({
        to: appointment.customer.email,
        name: appointment.customer.name || 'Valued Guest',
        service: appointment.service.name,
        therapist: appointment.staff?.name || 'Any Available Expert',
        date: new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        time: timeSlot,
        amount: finalAmount,
        bookingId: appointment.id.slice(-6).toUpperCase(),
      })
    } catch (emailError) {
      console.error('Email sending failed (likely missing RESEND_API_KEY):', emailError)
    }

    return NextResponse.json(appointment, { status: 201 })
  } catch (error) {
    console.error('Appointment creation error:', error)
    return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 })
  }
}
