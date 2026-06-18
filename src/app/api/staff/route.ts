import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const staff = await prisma.user.findMany({
      where: { role: 'THERAPIST', isActive: true },
      include: {
        staffProfile: true
      }
    })
    return NextResponse.json(staff)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch staff' }, { status: 500 })
  }
}
