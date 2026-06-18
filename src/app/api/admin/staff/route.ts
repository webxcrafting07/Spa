import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !['ADMIN', 'SUPER_ADMIN'].includes((session.user as any).role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const staffUsers = await prisma.user.findMany({
      where: {
        role: {
          in: ['THERAPIST', 'RECEPTIONIST', 'STAFF']
        }
      },
      include: {
        staffProfile: true,
        staffAppointments: {
          where: {
            status: 'COMPLETED'
          },
          select: {
            finalAmount: true
          }
        },
        _count: {
          select: {
            staffAppointments: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const formattedStaff = staffUsers.map(user => {
      const revenue = user.staffAppointments.reduce((sum, apt) => sum + apt.finalAmount, 0)
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone || 'N/A',
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        avatar: user.avatar || user.name.charAt(0),
        bio: user.staffProfile?.bio || '',
        experience: user.staffProfile?.experience || 0,
        rating: user.staffProfile?.rating || 0,
        specialties: user.staffProfile?.specializations || [],
        salary: user.staffProfile?.salary || 0,
        totalAppointments: user._count.staffAppointments,
        totalRevenue: revenue
      }
    })

    return NextResponse.json(formattedStaff)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch staff data' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !['ADMIN', 'SUPER_ADMIN'].includes((session.user as any).role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const data = await req.json()
    const { name, email, phone, role, password, experience, salary, bio } = data

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 })
    }

    const hashed = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        phone,
        password: hashed,
        role,
        staffProfile: {
          create: {
            experience: Number(experience) || 0,
            salary: Number(salary) || 0,
            bio: bio || '',
            specializations: []
          }
        }
      }
    })

    return NextResponse.json({ success: true, user })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to create staff member' }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !['ADMIN', 'SUPER_ADMIN'].includes((session.user as any).role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const data = await req.json()
    const { id, name, phone, role, isActive, experience, salary, bio } = data

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        phone,
        role,
        isActive,
        staffProfile: {
          upsert: {
            create: {
              experience: Number(experience) || 0,
              salary: Number(salary) || 0,
              bio: bio || ''
            },
            update: {
              experience: Number(experience) || 0,
              salary: Number(salary) || 0,
              bio: bio || ''
            }
          }
        }
      }
    })

    return NextResponse.json({ success: true, user: updatedUser })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to update staff member' }, { status: 500 })
  }
}

