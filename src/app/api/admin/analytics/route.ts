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

    const appointments = await prisma.appointment.findMany({
      include: { service: { include: { category: true } }, customer: true },
      orderBy: { date: 'asc' }
    })

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const now = new Date()

    // 1. Revenue Data (Last 12 months)
    const revenueDataMap: Record<string, { revenue: number, expenses: number, profit: number }> = {}
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      revenueDataMap[`${monthNames[d.getMonth()]}`] = { revenue: 0, expenses: 0, profit: 0 }
    }

    // 2. Service Breakdown
    const serviceBreakdownMap: Record<string, number> = {}

    // 3. Customer Growth
    const customerGrowthMap: Record<string, { new: Set<string>, returning: number }> = {}
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      customerGrowthMap[`${monthNames[d.getMonth()]}`] = { new: new Set(), returning: 0 }
    }

    // 4. Peak Hours
    const peakHoursMap: Record<string, number> = {
      '9am': 0, '10am': 0, '11am': 0, '12pm': 0, '1pm': 0, '2pm': 0,
      '3pm': 0, '4pm': 0, '5pm': 0, '6pm': 0, '7pm': 0, '8pm': 0,
    }

    const seenCustomers = new Set<string>()

    appointments.forEach(a => {
      const d = new Date(a.date)
      const monthStr = monthNames[d.getMonth()]

      // Revenue
      if (a.status !== 'CANCELLED' && revenueDataMap[monthStr]) {
        revenueDataMap[monthStr].revenue += a.finalAmount
        revenueDataMap[monthStr].expenses += a.finalAmount * 0.4 // Fake expense 40%
        revenueDataMap[monthStr].profit = revenueDataMap[monthStr].revenue - revenueDataMap[monthStr].expenses
      }

      // Service Breakdown
      if (a.status !== 'CANCELLED') {
        const cat = a.service?.category?.name || 'Other'
        serviceBreakdownMap[cat] = (serviceBreakdownMap[cat] || 0) + a.finalAmount
      }

      // Customer Growth (last 6 months)
      if (customerGrowthMap[monthStr]) {
        if (!seenCustomers.has(a.customerId)) {
          customerGrowthMap[monthStr].new.add(a.customerId)
          seenCustomers.add(a.customerId)
        } else {
          customerGrowthMap[monthStr].returning += 1
        }
      }

      // Peak Hours (all time)
      const hourMap: Record<string, string> = {
        '9:00 AM': '9am', '10:00 AM': '10am', '11:00 AM': '11am', '12:00 PM': '12pm',
        '1:00 PM': '1pm', '2:00 PM': '2pm', '3:00 PM': '3pm', '4:00 PM': '4pm',
        '5:00 PM': '5pm', '6:00 PM': '6pm', '7:00 PM': '7pm', '8:00 PM': '8pm',
      }
      if (hourMap[a.timeSlot]) {
        peakHoursMap[hourMap[a.timeSlot]] += 1
      }
    })

    const revenueData = Object.entries(revenueDataMap).map(([month, data]) => ({ month, ...data }))
    
    const colors = ['#D4AF37', '#10B981', '#8B5CF6', '#EC4899', '#3B82F6']
    const totalRev = Object.values(serviceBreakdownMap).reduce((a, b) => a + b, 0)
    const serviceBreakdown = Object.entries(serviceBreakdownMap).map(([name, value], i) => ({
      name,
      value: totalRev ? Math.round((value / totalRev) * 100) : 0,
      color: colors[i % colors.length]
    })).filter(x => x.value > 0)

    const customerGrowth = Object.entries(customerGrowthMap).map(([month, data]) => ({
      month,
      new: data.new.size,
      returning: data.returning
    }))

    const peakHours = Object.entries(peakHoursMap).map(([hour, bookings]) => ({ hour, bookings }))

    // KPIs
    const ytdRev = revenueData.reduce((a, b) => a + b.revenue, 0)
    const ytdProfit = revenueData.reduce((a, b) => a + b.profit, 0)
    const newCustomers = seenCustomers.size
    
    return NextResponse.json({
      revenueData,
      serviceBreakdown,
      customerGrowth,
      peakHours,
      kpis: {
        ytdRev: '₹' + (ytdRev / 100000).toFixed(2) + 'L',
        ytdProfit: '₹' + (ytdProfit / 100000).toFixed(2) + 'L',
        newCustomers: newCustomers.toString(),
        repeatRate: newCustomers ? Math.round((appointments.length - newCustomers) / appointments.length * 100) + '%' : '0%'
      }
    })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to generate analytics' }, { status: 500 })
  }
}
