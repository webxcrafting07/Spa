import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding historical appointments...')

  const customers = await prisma.user.findMany({ where: { role: 'CUSTOMER' } })
  const services = await prisma.service.findMany()
  const staff = await prisma.user.findMany({ where: { role: 'THERAPIST' } })

  if (customers.length === 0 || services.length === 0 || staff.length === 0) {
    console.log('Please ensure you have customers, services, and staff in DB before seeding.')
    return
  }

  // Create 50 past appointments spanning the last 6 months
  const statuses = ['COMPLETED', 'COMPLETED', 'COMPLETED', 'COMPLETED', 'CANCELLED']
  
  for (let i = 0; i < 50; i++) {
    const customer = customers[Math.floor(Math.random() * customers.length)]
    const service = services[Math.floor(Math.random() * services.length)]
    const therapist = staff[Math.floor(Math.random() * staff.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)] as 'COMPLETED' | 'CANCELLED'
    
    // Random date within last 180 days
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 180))
    
    // Random time slot between 9am and 8pm
    const hour = Math.floor(Math.random() * 11) + 9
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour > 12 ? hour - 12 : hour
    const timeSlot = `${displayHour}:00 ${ampm}`

    await prisma.appointment.create({
      data: {
        customerId: customer.id,
        serviceId: service.id,
        staffId: therapist.id,
        date,
        timeSlot,
        duration: service.duration,
        status,
        paymentStatus: status === 'COMPLETED' ? 'PAID' : 'PENDING',
        paymentMethod: 'ONLINE',
        totalAmount: service.price,
        finalAmount: service.price,
      }
    })
  }

  console.log('Successfully seeded 50 historical appointments!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
