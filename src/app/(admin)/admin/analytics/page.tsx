'use client'
import { useState, useEffect } from 'react'
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { RefreshCcw } from 'lucide-react'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="glass-card p-3 text-xs">
        <p className="text-cream/60 mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color || p.stroke }}>
            {p.name}: {typeof p.value === 'number' && p.value > 1000
              ? '₹' + p.value.toLocaleString('en-IN')
              : p.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/analytics')
      .then(res => res.json())
      .then(d => {
        setData(d)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="py-20 text-center text-cream/50">
        <RefreshCcw className="animate-spin mx-auto mb-4" /> Calculating analytics...
      </div>
    )
  }

  const { revenueData, serviceBreakdown, customerGrowth, peakHours, kpis } = data || {}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-cream font-bold">Analytics</h1>
          <p className="text-cream/50 mt-1 text-sm">Business intelligence & performance metrics</p>
        </div>
        <button onClick={() => {
          const csv = 'Date,Metric,Value\n2024-YTD,Revenue,' + (kpis?.ytdRev || '0') + '\n2024-YTD,Profit,' + (kpis?.ytdProfit || '0');
          const blob = new Blob([csv], { type: 'text/csv' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'luxury_spa_analytics_report.csv';
          a.click();
        }} className="btn-outline-gold text-xs py-2.5 px-5">
          Export Report (CSV)
        </button>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'YTD Revenue', value: kpis?.ytdRev || '₹0', change: 'Tracked live', up: true },
          { label: 'YTD Profit', value: kpis?.ytdProfit || '₹0', change: 'Tracked live', up: true },
          { label: 'Total Customers', value: kpis?.newCustomers || '0', change: 'All time', up: true },
          { label: 'Repeat Rate', value: kpis?.repeatRate || '0%', change: 'All time', up: true },
        ].map(({ label, value, change, up }) => (
          <div key={label} className="glass-card p-4">
            <p className="text-xs text-cream/50 mb-2">{label}</p>
            <p className="font-display text-2xl font-bold text-cream">{value}</p>
            <p className={`text-xs mt-1 ${up ? 'text-green-400' : 'text-red-400'}`}>{change}</p>
          </div>
        ))}
      </div>

      {/* Revenue vs Expenses */}
      <div className="glass-card p-6">
        <h2 className="font-display text-lg text-cream font-semibold mb-5">Revenue vs Expenses vs Profit (2024)</h2>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
            <defs>
              {[
                { id: 'rev', color: '#D4AF37' },
                { id: 'exp', color: '#EF4444' },
                { id: 'pro', color: '#10B981' },
              ].map(({ id, color }) => (
                <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,175,55,0.08)" />
            <XAxis dataKey="month" tick={{ fill: 'rgba(248,246,240,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'rgba(248,246,240,0.4)', fontSize: 11 }} axisLine={false} tickLine={false}
              tickFormatter={v => '₹' + (v / 1000) + 'k'} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '11px', color: 'rgba(248,246,240,0.6)' }} />
            <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#D4AF37" strokeWidth={2} fill="url(#rev)" />
            <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#EF4444" strokeWidth={2} fill="url(#exp)" />
            <Area type="monotone" dataKey="profit" name="Profit" stroke="#10B981" strokeWidth={2} fill="url(#pro)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Breakdown */}
        <div className="glass-card p-6">
          <h2 className="font-display text-lg text-cream font-semibold mb-5">Revenue by Service Category</h2>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie data={serviceBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80}
                  dataKey="value" strokeWidth={0}>
                  {serviceBreakdown.map((entry: any, i: number) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 flex-1">
              {serviceBreakdown.map((s: any) => (
                <div key={s.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center gap-2 text-cream/80">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: s.color }} />
                      {s.name}
                    </span>
                    <span style={{ color: s.color }} className="font-semibold">{s.value}%</span>
                  </div>
                  <div className="h-1.5 bg-dark-700 rounded-full">
                    <div className="h-full rounded-full" style={{ width: `${s.value}%`, background: s.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customer Growth */}
        <div className="glass-card p-6">
          <h2 className="font-display text-lg text-cream font-semibold mb-5">Customer Growth</h2>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={customerGrowth} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barSize={10} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,175,55,0.08)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: 'rgba(248,246,240,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(248,246,240,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(212,175,55,0.05)' }} />
              <Legend wrapperStyle={{ fontSize: '11px', color: 'rgba(248,246,240,0.5)' }} />
              <Bar dataKey="new" name="New" fill="#D4AF37" radius={[4, 4, 0, 0]} />
              <Bar dataKey="returning" name="Returning" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Peak Booking Hours */}
      <div className="glass-card p-6">
        <h2 className="font-display text-lg text-cream font-semibold mb-5">Peak Booking Hours (This Week)</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={peakHours} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barSize={24}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,175,55,0.08)" vertical={false} />
            <XAxis dataKey="hour" tick={{ fill: 'rgba(248,246,240,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'rgba(248,246,240,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(212,175,55,0.05)' }} />
            <Bar dataKey="bookings" name="Bookings" radius={[4, 4, 0, 0]}>
              {peakHours.map((entry: any, i: number) => (
                <Cell key={i} fill={entry.bookings > 15 ? '#d4af37' : '#d4af3740'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-cream/40 mt-2 text-center">Peak hours: 4pm–5pm · Lowest: 8pm–9pm</p>
      </div>

      {/* Retention metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Customer Retention Rate', value: '78%', desc: '+5% vs last quarter', color: 'text-green-400' },
          { label: 'Avg. Visit Frequency', value: '2.4x', desc: 'Per customer per month', color: 'text-gold-400' },
          { label: 'NPS Score', value: '72', desc: 'Net Promoter Score', color: 'text-purple-400' },
        ].map(({ label, value, desc, color }) => (
          <div key={label} className="glass-card p-6 text-center">
            <p className={`font-display text-4xl font-bold ${color} mb-2`}>{value}</p>
            <p className="font-medium text-cream text-sm mb-1">{label}</p>
            <p className="text-cream/50 text-xs">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
