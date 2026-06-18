'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Star, Heart, TrendingUp, Clock, CheckCircle, Gift, Crown } from 'lucide-react'

export default function DashboardPage() {
  const defaultUpcoming = [
    { service: 'Deep Tissue Massage', therapist: 'Priya Sharma', date: 'Dec 20, 2024', time: '11:00 AM', status: 'CONFIRMED', price: 3500 },
    { service: 'Gold Facial', therapist: 'Meera Kapoor', date: 'Dec 28, 2024', time: '2:00 PM', status: 'PENDING', price: 2200 },
  ]

  const [activeMembership, setActiveMembership] = useState<string | null>(null)
  const [upcomingAppointments, setUpcomingAppointments] = useState(defaultUpcoming)

  useEffect(() => {
    setActiveMembership(localStorage.getItem('aura_membership') || null)
    
    const localApts = JSON.parse(localStorage.getItem('aura_appointments') || '[]')
    if (localApts.length > 0) {
      setUpcomingAppointments([...localApts, ...defaultUpcoming])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const stats = [
    { label: 'Total Appointments', value: 12, icon: Calendar, color: 'text-blue-400' },
    { label: 'Reward Points', value: '1,240', icon: Star, color: 'text-gold-400' },
    { label: 'Amount Saved', value: '₹3,600', icon: TrendingUp, color: 'text-green-400' },
    { label: 'Wishlist Items', value: 4, icon: Heart, color: 'text-pink-400' },
  ]



  const recentActivity = [
    { text: 'Appointment completed — Hot Stone Therapy', time: '3 days ago', icon: CheckCircle, color: 'text-green-400' },
    { text: 'Earned 350 reward points', time: '3 days ago', icon: Star, color: 'text-gold-400' },
    { text: activeMembership ? `Membership upgraded to ${activeMembership.charAt(0).toUpperCase() + activeMembership.slice(1)}` : 'Joined Aura Luxury Spa', time: '2 weeks ago', icon: Crown, color: activeMembership === 'platinum' ? 'text-white' : activeMembership === 'gold' ? 'text-gold-400' : 'text-gray-300' },
    { text: 'Referral bonus credited — 200 pts', time: '1 month ago', icon: Gift, color: 'text-purple-400' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl text-cream font-bold">My Dashboard</h1>
        <p className="text-cream/50 mt-1">Manage your wellness journey</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-cream/50">{label}</span>
              <Icon size={18} className={color} />
            </div>
            <p className="font-display text-2xl font-bold text-cream">{value}</p>
          </div>
        ))}
      </div>

      {/* Membership banner */}
      <div className={`glass-card p-6 border transition-all ${
        activeMembership === 'platinum' ? 'border-white/20 bg-gradient-to-r from-white/10 to-transparent' :
        activeMembership === 'gold' ? 'border-gold-400/30 bg-gradient-to-r from-gold-400/5 to-transparent' :
        activeMembership === 'silver' ? 'border-gray-400/30 bg-gradient-to-r from-gray-400/5 to-transparent' :
        'border-white/5 bg-black/20'
      }`}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              activeMembership === 'platinum' ? 'bg-gradient-to-br from-white to-gray-300' :
              activeMembership === 'gold' ? 'bg-gold-gradient' :
              activeMembership === 'silver' ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
              'bg-white/10'
            }`}>
              <Crown size={22} className={activeMembership ? 'text-black' : 'text-cream/30'} />
            </div>
            <div>
              <p className={`font-luxury text-sm tracking-widest uppercase ${
                activeMembership === 'platinum' ? 'text-white' :
                activeMembership === 'gold' ? 'text-gold-400' :
                activeMembership === 'silver' ? 'text-gray-300' :
                'text-cream/50'
              }`}>
                {activeMembership ? `${activeMembership} MEMBER` : 'No Active Membership'}
              </p>
              <p className="text-cream/60 text-xs mt-1">
                {activeMembership ? 'Valid until Dec 2025 · Enjoy your privileges' : 'Upgrade to unlock exclusive benefits'}
              </p>
            </div>
          </div>
          <Link href="/dashboard/membership" className={`text-xs py-2 px-5 transition-all ${
            activeMembership ? 'btn-outline-gold' : 'btn-gold'
          }`}>
            {activeMembership ? 'Manage Plan' : 'View Memberships'}
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming appointments */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-lg text-cream font-semibold">Upcoming Appointments</h2>
            <Link href="/dashboard/appointments" className="text-xs text-gold-400 hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {upcomingAppointments.map((apt, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-dark-800/50 rounded-xl border border-dark-600">
                <div className="w-10 h-10 rounded-xl bg-gold-400/10 flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-gold-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-cream text-sm">{apt.service}</p>
                  <p className="text-xs text-cream/50">{apt.therapist} · {apt.date} at {apt.time}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className={apt.status === 'CONFIRMED' ? 'badge-confirmed' : 'badge-pending'}>
                    {apt.status}
                  </span>
                </div>
              </div>
            ))}
            {upcomingAppointments.length === 0 && (
              <div className="text-center py-8">
                <Calendar size={32} className="text-cream/20 mx-auto mb-3" />
                <p className="text-cream/50 text-sm">No upcoming appointments</p>
                <Link href="/booking" className="btn-gold text-xs py-2 px-4 mt-3 inline-block">Book Now</Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent activity */}
        <div className="glass-card p-6">
          <h2 className="font-display text-lg text-cream font-semibold mb-5">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <item.icon size={16} className={`${item.color} mt-0.5 shrink-0`} />
                <div>
                  <p className="text-sm text-cream/80">{item.text}</p>
                  <p className="text-xs text-cream/40 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="glass-card p-6">
        <h2 className="font-display text-lg text-cream font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { href: '/dashboard/booking', icon: Calendar, label: 'Book Appointment', color: 'text-blue-400' },
            { href: '/services', icon: Star, label: 'Browse Services', color: 'text-gold-400' },
            { href: '/dashboard/rewards', icon: Gift, label: 'Redeem Points', color: 'text-purple-400' },
            { href: '/dashboard/membership', icon: Crown, label: activeMembership ? 'Manage Plan' : 'Get Membership', color: activeMembership === 'platinum' ? 'text-white' : activeMembership === 'gold' ? 'text-gold-400' : 'text-gray-300' },
          ].map(({ href, icon: Icon, label, color }) => (
            <Link key={href} href={href}
              className="flex flex-col items-center gap-3 p-4 glass-card hover:border-gold-400/30 transition-all group text-center">
              <div className="w-10 h-10 rounded-xl bg-dark-700 group-hover:bg-gold-400/10 flex items-center justify-center transition-all">
                <Icon size={18} className={color} />
              </div>
              <span className="text-xs text-cream/70 group-hover:text-cream transition-colors">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
