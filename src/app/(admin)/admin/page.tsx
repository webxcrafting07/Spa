import { TrendingUp, TrendingDown, Users, Calendar, DollarSign, Star, AlertCircle } from 'lucide-react'
import AdminRevenueChart from '@/components/admin/AdminRevenueChart'
import AdminBookingsChart from '@/components/admin/AdminBookingsChart'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const appointments = await prisma.appointment.findMany({
    include: { customer: true, service: true, staff: true },
    orderBy: { createdAt: 'desc' }
  })

  const totalRevenue = appointments.filter(a => a.status !== 'CANCELLED').reduce((sum, a) => sum + a.finalAmount, 0)
  const pendingApprovals = appointments.filter(a => a.status === 'PENDING').length
  const confirmedBookings = appointments.filter(a => a.status === 'CONFIRMED').length

  const kpis = [
    { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}`, change: '+18.2%', up: true, icon: DollarSign, color: 'text-gold-400', bg: 'bg-gold-400/10' },
    { label: 'Total Bookings', value: appointments.length.toString(), change: '+12.4%', up: true, icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Pending Approvals', value: pendingApprovals.toString(), change: 'Needs attention', up: false, icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-400/10' },
    { label: 'Confirmed', value: confirmedBookings.toString(), change: 'Scheduled', up: true, icon: Calendar, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  ]

  const recentBookings = appointments.slice(0, 5)

  // Calculate top services
  const serviceStats: Record<string, { bookings: number, revenue: number }> = {}
  appointments.forEach(a => {
    if (a.status !== 'CANCELLED') {
      const sName = a.service?.name || 'Unknown'
      if (!serviceStats[sName]) serviceStats[sName] = { bookings: 0, revenue: 0 }
      serviceStats[sName].bookings += 1
      serviceStats[sName].revenue += a.finalAmount
    }
  })
  
  const topServices = Object.entries(serviceStats)
    .map(([name, stats]) => ({ name, ...stats }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)

  // Calculate Revenue Data (last 6 months)
  const revenueDataMap: Record<string, number> = {}
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  
  // Initialize last 6 months
  const now = new Date()
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    revenueDataMap[`${monthNames[d.getMonth()]} ${d.getFullYear()}`] = 0
  }

  appointments.forEach(a => {
    if (a.status !== 'CANCELLED') {
      const d = new Date(a.date)
      const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`
      if (revenueDataMap[key] !== undefined) {
        revenueDataMap[key] += a.finalAmount
      }
    }
  })
  
  const revenueData = Object.entries(revenueDataMap).map(([month, revenue]) => ({ month: month.split(' ')[0], revenue }))

  // Calculate Bookings Data (last 7 days by day of week)
  const bookingsDataMap: Record<string, { confirmed: number, completed: number, cancelled: number }> = {
    'Sun': { confirmed: 0, completed: 0, cancelled: 0 },
    'Mon': { confirmed: 0, completed: 0, cancelled: 0 },
    'Tue': { confirmed: 0, completed: 0, cancelled: 0 },
    'Wed': { confirmed: 0, completed: 0, cancelled: 0 },
    'Thu': { confirmed: 0, completed: 0, cancelled: 0 },
    'Fri': { confirmed: 0, completed: 0, cancelled: 0 },
    'Sat': { confirmed: 0, completed: 0, cancelled: 0 },
  }

  appointments.forEach(a => {
    const d = new Date(a.date)
    // Only count appointments from the last 7 days
    if ((now.getTime() - d.getTime()) <= 7 * 24 * 60 * 60 * 1000) {
      const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()]
      if (a.status === 'CONFIRMED') bookingsDataMap[dayName].confirmed += 1
      if (a.status === 'COMPLETED') bookingsDataMap[dayName].completed += 1
      if (a.status === 'CANCELLED') bookingsDataMap[dayName].cancelled += 1
    }
  })

  // Order days starting from today - 6 days
  const bookingsData = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
    const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()]
    bookingsData.push({ day: dayName, ...bookingsDataMap[dayName] })
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] text-gold-400 uppercase tracking-[0.4em] font-bold block mb-2">Live Overview</span>
          <h1 className="font-display text-4xl text-cream font-bold">Executive Dashboard</h1>
          <p className="text-cream/40 mt-2 text-sm font-light">All systems nominal</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-green-400 bg-[#0a0a0a] border border-green-400/20 px-4 py-2 rounded-full shadow-[0_0_15px_rgba(74,222,128,0.05)]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_5px_#4ade80]" />
            Live Sync
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map(({ label, value, change, up, icon: Icon, color }) => (
          <div key={label} className="relative group overflow-hidden rounded-2xl border border-white/5 bg-[#0a0a0a] p-5 hover:border-gold-400/20 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl bg-[#050505] border border-white/5 flex items-center justify-center shadow-inner group-hover:border-gold-400/20 transition-colors`}>
                  <Icon size={18} className={color} />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 px-2 py-1 rounded-md ${up ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>
                  {up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {change.split(' ')[0]}
                </span>
              </div>
              <p className="font-display text-3xl font-bold text-cream mb-1">{value}</p>
              <p className="text-xs text-cream/40 font-light uppercase tracking-widest">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-[2rem] border border-white/5 bg-[#0a0a0a] p-8">
          <h2 className="font-display text-2xl text-cream font-bold mb-8">Revenue Analysis</h2>
          <AdminRevenueChart data={revenueData} />
        </div>
        <div className="rounded-[2rem] border border-white/5 bg-[#0a0a0a] p-8">
          <h2 className="font-display text-2xl text-cream font-bold mb-8">Booking Trends (Last 7 Days)</h2>
          <AdminBookingsChart data={bookingsData} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="rounded-[2rem] border border-white/5 bg-[#0a0a0a] overflow-hidden">
          <div className="p-8 border-b border-white/5 flex items-center justify-between bg-[#050505]">
            <h2 className="font-display text-2xl text-cream font-bold">Recent Bookings</h2>
            <a href="/admin/appointments" className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold-400 hover:text-gold-300 transition-colors">View All</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0a0a0a] border-b border-white/5 text-[10px] uppercase tracking-widest text-cream/40">
                  <th className="p-6 font-medium">VIP Client</th>
                  <th className="p-6 font-medium">Service</th>
                  <th className="p-6 font-medium">Value</th>
                  <th className="p-6 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm font-light text-cream/70 divide-y divide-white/5">
                {recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                    <td className="p-6 font-medium text-cream group-hover:text-gold-400 transition-colors">{b.customer?.name}</td>
                    <td className="p-6">{b.service?.name}</td>
                    <td className="p-6 font-medium text-cream tracking-wide">₹{b.finalAmount.toLocaleString('en-IN')}</td>
                    <td className="p-6">
                      <span className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-md ${
                        b.status === 'CONFIRMED' ? 'bg-green-400/10 text-green-400' :
                        b.status === 'PENDING' ? 'bg-yellow-400/10 text-yellow-400' :
                        'bg-blue-400/10 text-blue-400'
                      }`}>
                        {b.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
                {recentBookings.length === 0 && <tr><td colSpan={4} className="text-center p-6 text-cream/50">No recent bookings</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Services */}
        <div className="rounded-[2rem] border border-white/5 bg-[#0a0a0a] p-8">
          <h2 className="font-display text-2xl text-cream font-bold mb-8">Premium Collections</h2>
          <div className="space-y-6">
            {topServices.map((s, i) => (
              <div key={s.name} className="flex items-center gap-4">
                <span className="w-6 h-6 rounded-full bg-gold-400/10 text-gold-400 text-xs flex items-center justify-center font-bold shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between mb-1">
                    <p className="text-sm font-medium text-cream">{s.name}</p>
                  </div>
                  <div className="flex justify-between text-xs text-cream/50">
                    <span>{s.bookings} bookings</span>
                    <span className="text-gold-400">₹{s.revenue.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            ))}
            {topServices.length === 0 && <div className="text-cream/50">No service data</div>}
          </div>
        </div>
      </div>

    </div>
  )
}
