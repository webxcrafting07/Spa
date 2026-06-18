import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { sendCancellationEmail } from '@/lib/email'

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params
    const body = await req.json()
    const { status, paymentStatus, staffId, date, timeSlot } = body

    const existing = await prisma.appointment.findUnique({
      where: { id },
      include: {
        customer: { select: { email: true, name: true, id: true } },
        service: { select: { name: true } },
      }
    })

    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const isAdmin = ['ADMIN', 'SUPER_ADMIN'].includes((session.user as any).role)
    const isTherapist = (session.user as any).role === 'THERAPIST'
    const isCustomer = existing.customerId === session.user.id
    
    if (!isAdmin && !isCustomer && !(isTherapist && existing.staffId === session.user.id)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const dataToUpdate: any = {}
    // Only Admin can change paymentStatus, staffId, date, timeSlot
    if (status) dataToUpdate.status = status
    if (body.internalNotes && (isAdmin || isTherapist)) dataToUpdate.internalNotes = body.internalNotes
    if (paymentStatus && isAdmin) dataToUpdate.paymentStatus = paymentStatus
    if (staffId !== undefined && isAdmin) dataToUpdate.staffId = staffId === 'unassigned' ? null : staffId
    if (date && isAdmin) dataToUpdate.date = new Date(date)
    if (timeSlot && isAdmin) dataToUpdate.timeSlot = timeSlot

    if (status === 'COMPLETED') dataToUpdate.completedAt = new Date()

    const updated = await prisma.appointment.update({
      where: { id },
      data: dataToUpdate,
    })

    if (status === 'CANCELLED') {
      try {
        await sendCancellationEmail({
          to: existing.customer.email,
          name: existing.customer.name || 'Valued Guest',
          service: existing.service.name,
          date: new Date(existing.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
          time: existing.timeSlot,
        })
      } catch (e) {
        console.error('Cancellation email failed:', e)
      }
    }

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Update appointment error:', error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}
