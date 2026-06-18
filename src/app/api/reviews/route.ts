import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const serviceId = searchParams.get('serviceId')
    const where: any = { isPublished: true }
    if (serviceId) where.serviceId = serviceId
    const reviews = await prisma.review.findMany({
      where,
      include: { user: { select: { name: true, avatar: true } } },
      orderBy: { createdAt: 'desc' },
      take: 20,
    })
    return NextResponse.json(reviews)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { serviceId, appointmentId, rating, title, comment } = await req.json()
    if (!serviceId || !rating || !comment) {
      return NextResponse.json({ error: 'Service, rating and comment are required' }, { status: 400 })
    }
    const review = await prisma.review.create({
      data: {
        userId: session.user.id,
        serviceId,
        appointmentId,
        rating: Number(rating),
        title,
        comment,
      },
    })
    return NextResponse.json(review, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 })
  }
}
