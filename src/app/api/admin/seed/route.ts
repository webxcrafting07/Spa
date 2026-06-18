import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const customers = await prisma.user.findMany({ where: { role: 'CUSTOMER' } })
    const services = await prisma.service.findMany()
    const staff = await prisma.user.findMany({ where: { role: 'THERAPIST' } })

    if (customers.length === 0 || services.length === 0 || staff.length === 0) {
      return NextResponse.json({ error: 'Please ensure you have customers, services, and staff in DB before seeding.' })
    }

    const appointmentsData = []
    const statuses = ['COMPLETED', 'COMPLETED', 'COMPLETED', 'COMPLETED', 'CANCELLED']
    
    for (let i = 0; i < 50; i++) {
      const customer = customers[Math.floor(Math.random() * customers.length)]
      const service = services[Math.floor(Math.random() * services.length)]
      const therapist = staff[Math.floor(Math.random() * staff.length)]
      const status = statuses[Math.floor(Math.random() * statuses.length)] as 'COMPLETED' | 'CANCELLED'
      
      const date = new Date()
      date.setDate(date.getDate() - Math.floor(Math.random() * 180))
      
      const hour = Math.floor(Math.random() * 11) + 9
      const ampm = hour >= 12 ? 'PM' : 'AM'
      const displayHour = hour > 12 ? hour - 12 : hour
      const timeSlot = `${displayHour}:00 ${ampm}`

      appointmentsData.push({
        customerId: customer.id,
        serviceId: service.id,
        staffId: therapist.id,
        date,
        timeSlot,
        duration: service.duration,
        status,
        paymentStatus: (status === 'COMPLETED' ? 'PAID' : 'PENDING') as any,
        paymentMethod: 'ONLINE',
        totalAmount: service.price,
        finalAmount: service.price,
      })
    }

    await prisma.appointment.createMany({
      data: appointmentsData,
      skipDuplicates: true
    })

    return NextResponse.json({ success: true, message: 'Successfully seeded 50 historical appointments!' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to seed' }, { status: 500 })
  }
}
