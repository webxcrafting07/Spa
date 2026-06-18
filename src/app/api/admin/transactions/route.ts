import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !['ADMIN', 'SUPER_ADMIN'].includes((session.user as any).role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const page = Number(searchParams.get('page') || 1)
    const limit = Number(searchParams.get('limit') || 50)

    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        include: {
          user: { select: { name: true, email: true } },
          appointment: { select: { service: { select: { name: true } } } }
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.transaction.count()
    ])

    const formatted = transactions.map(t => ({
      id: t.id,
      customer: t.user.name,
      service: t.appointment?.service?.name || 'Unknown Service',
      amount: t.amount,
      method: t.method || 'Online',
      status: t.status,
      date: t.createdAt,
    }))

    return NextResponse.json({ transactions: formatted, total, page, limit })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !['ADMIN', 'SUPER_ADMIN'].includes((session.user as any).role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json({ error: 'Transaction ID and Status are required' }, { status: 400 })
    }

    const transaction = await prisma.transaction.update({
      where: { id },
      data: { status }
    })

    // If refunding, we might also want to update the appointment status or send an email, but for now we just update the transaction
    if (status === 'REFUNDED' && transaction.appointmentId) {
      await prisma.appointment.update({
        where: { id: transaction.appointmentId },
        data: { paymentStatus: 'REFUNDED' }
      })
    }

    return NextResponse.json({ success: true, transaction })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to update transaction' }, { status: 500 })
  }
}
