'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { LayoutDashboard, Calendar, User, Star, Heart, LogOut, Menu, X, Gift, CreditCard, Bell } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/appointments', icon: Calendar, label: 'Appointments' },
  { href: '/dashboard/payments', icon: CreditCard, label: 'Payments History' },
  { href: '/dashboard/membership', icon: Star, label: 'Membership' },
  { href: '/dashboard/rewards', icon: Star, label: 'Rewards' },
  { href: '/dashboard/wishlist', icon: Heart, label: 'Wishlist' },
  { href: '/dashboard/referrals', icon: Gift, label: 'Referrals' },
  { href: '/dashboard/notifications', icon: Bell, label: 'Notifications' },
  { href: '/dashboard/profile', icon: User, label: 'My Profile' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-dark-900 flex">
      {/* Sidebar */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-40 w-64 bg-dark-950 border-r border-gold-400/10 transform transition-transform duration-300 flex flex-col',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        {/* Logo */}
        <div className="p-6 border-b border-gold-400/10">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gold-gradient flex items-center justify-center">
              <span className="text-dark font-luxury font-bold">A</span>
            </div>
            <div>
              <span className="font-luxury text-sm tracking-widest text-cream block leading-none">AURA</span>
              <span className="text-gold-400 text-xs tracking-wider">MY ACCOUNT</span>
            </div>
          </Link>
        </div>

        {/* User info */}
        <div className="p-4 border-b border-gold-400/10">
          <div className="flex items-center gap-3 p-3 glass-card">
            <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center font-bold text-dark">
              {session?.user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-cream truncate">{session?.user?.name}</p>
              <p className="text-xs text-cream/50 truncate">{session?.user?.email}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                pathname === href
                  ? 'admin-nav-active'
                  : 'text-cream/60 hover:text-cream hover:bg-white/5'
              )}>
              <Icon size={17} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-gold-400/10 space-y-2">
          <Link href="/" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-cream/50 hover:text-cream hover:bg-white/5 transition-all">
            ← Back to Website
          </Link>
          <button onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-400/10 transition-all">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-dark-900/80 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-dark-900/95 backdrop-blur border-b border-gold-400/10 px-6 py-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-cream/60 hover:text-cream">
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <div className="hidden lg:block">
            <h1 className="text-sm font-medium text-cream/60">
              Welcome back, <span className="text-gold-400">{session?.user?.name?.split(' ')[0]}</span>
            </h1>
          </div>
          <Link href="/dashboard/booking" className="btn-gold text-xs py-2 px-5">Book Appointment</Link>
        </header>

        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  )
}
