import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !['ADMIN', 'SUPER_ADMIN'].includes((session.user as any).role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const services = await prisma.service.findMany({
      include: {
        category: true,
        _count: {
          select: {
            appointments: true
          }
        }
      },
      orderBy: [
        { category: { name: 'asc' } },
        { name: 'asc' }
      ]
    })

    const formattedServices = services.map(service => ({
      id: service.id,
      name: service.name,
      description: service.description,
      categoryId: service.categoryId,
      category: service.category.name,
      icon: service.category.icon || '✨',
      duration: service.duration,
      price: service.price,
      active: service.isActive,
      featured: service.isFeatured,
      rating: service.rating || 0,
      bookings: service._count.appointments
    }))

    return NextResponse.json(formattedServices)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !['ADMIN', 'SUPER_ADMIN'].includes((session.user as any).role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const { name, description, categoryId, duration, price, active, featured } = body
    if (!name || !categoryId || !duration || !price) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 })
    }
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now().toString().slice(-4)
    
    const service = await prisma.service.create({
      data: { 
        name, slug, description: description || '', categoryId, 
        duration: Number(duration), price: Number(price), 
        isActive: active !== false, isFeatured: featured === true
      },
    })
    return NextResponse.json({ success: true, service }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !['ADMIN', 'SUPER_ADMIN'].includes((session.user as any).role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const { id, name, description, categoryId, duration, price, active, featured } = body
    if (!id) {
      return NextResponse.json({ error: 'Service ID missing' }, { status: 400 })
    }

    const data: any = {}
    if (name) data.name = name
    if (description !== undefined) data.description = description
    if (categoryId) data.categoryId = categoryId
    if (duration) data.duration = Number(duration)
    if (price) data.price = Number(price)
    if (active !== undefined) data.isActive = active
    if (featured !== undefined) data.isFeatured = featured

    const service = await prisma.service.update({
      where: { id },
      data
    })
    
    return NextResponse.json({ success: true, service })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !['ADMIN', 'SUPER_ADMIN'].includes((session.user as any).role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Service ID required' }, { status: 400 })

    await prisma.service.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 })
  }
}

