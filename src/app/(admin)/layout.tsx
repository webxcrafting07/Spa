'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import {
  LayoutDashboard, Calendar, Users, Scissors, BarChart3, ShoppingBag,
  Megaphone, FileText, Settings, LogOut, Menu, X, ChevronRight,
  DollarSign, Star, Package, Shield
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navGroups = [
  {
    label: 'Overview',
    items: [
      { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
      { href: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
    ],
  },
  {
    label: 'Operations',
    items: [
      { href: '/admin/appointments', icon: Calendar, label: 'Appointments' },
      { href: '/admin/services', icon: Scissors, label: 'Services' },
      { href: '/admin/staff', icon: Users, label: 'Staff' },
      { href: '/admin/customers', icon: Star, label: 'Customers' },
    ],
  },
  {
    label: 'Business',
    items: [
      { href: '/admin/finance', icon: DollarSign, label: 'Finance' },
      { href: '/admin/inventory', icon: Package, label: 'Inventory' },
      { href: '/admin/marketing', icon: Megaphone, label: 'Marketing' },
    ],
  },
  {
    label: 'Content',
    items: [
      { href: '/admin/content', icon: FileText, label: 'CMS' },
      { href: '/admin/settings', icon: Settings, label: 'Settings' },
    ],
  },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-40 w-64 bg-[#050505] border-r border-white/5 flex flex-col transition-transform duration-300 shadow-[20px_0_40px_rgba(0,0,0,0.5)]',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        <div className="p-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-gold-400/30 flex items-center justify-center relative group">
              <div className="absolute inset-0 rounded-full bg-gold-400/5 group-hover:bg-gold-400/10 transition-colors duration-500" />
              <span className="text-gold-400 font-luxury font-bold text-xl relative z-10">A</span>
            </div>
            <div>
              <span className="font-luxury text-lg tracking-[0.2em] text-cream block leading-none mb-1">AURA</span>
              <span className="text-gold-400 text-[9px] tracking-[0.3em] font-bold block uppercase">Command Center</span>
            </div>
          </Link>
        </div>

        <div className="p-4 border-b border-white/5">
          <div className="glass-card p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gold-gradient flex items-center justify-center font-bold text-dark text-sm">
              {session?.user?.name?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-cream truncate">{session?.user?.name || 'Admin'}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Shield size={10} className="text-gold-400" />
                <span className="text-gold-400 text-[10px] tracking-wider">SUPER ADMIN</span>
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 overflow-y-auto space-y-5">
          {navGroups.map(group => (
            <div key={group.label}>
              <p className="text-[10px] font-medium text-cream/30 tracking-widest uppercase px-3 mb-2">{group.label}</p>
              <div className="space-y-0.5">
                {group.items.map(({ href, icon: Icon, label }) => {
                  const active = pathname === href || (href !== '/admin' && pathname.startsWith(href))
                  return (
                    <Link key={href} href={href}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-300 font-light',
                        active
                          ? 'bg-gradient-to-r from-gold-400/10 to-transparent border border-gold-400/20 text-gold-400 shadow-[inset_2px_0_0_#D4AF37]'
                          : 'text-cream/50 hover:text-white hover:bg-white/5'
                      )}>
                      <Icon size={16} className={active ? 'text-gold-400' : 'opacity-70'} />
                      <span className="flex-1 tracking-wide">{label}</span>
                      {active && <ChevronRight size={14} className="text-gold-400" />}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <Link href="/" className="flex items-center justify-between px-4 py-3 rounded-xl text-xs uppercase tracking-widest font-bold text-cream/40 hover:text-gold-400 hover:bg-white/5 transition-all">
            <span>View Website</span>
            <ChevronRight size={14} />
          </Link>
          <button onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-400/10 transition-all">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/80 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[400px] bg-gold-400/5 blur-[150px] rounded-full pointer-events-none z-0" />
        
        <header className="sticky top-0 z-20 bg-black/80 backdrop-blur-md border-b border-white/5 px-8 py-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-cream/60 hover:text-white transition-colors">
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="hidden lg:flex items-center gap-3 text-xs tracking-widest uppercase font-bold text-cream/30">
            <span>Command Center</span>
            {pathname !== '/admin' && (
              <>
                <ChevronRight size={14} />
                <span className="text-cream capitalize">
                  {pathname.split('/').slice(2).join(' / ') || 'Dashboard'}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/booking" target="_blank"
              className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold-400 border border-gold-400/30 px-6 py-2.5 rounded-full hover:bg-gold-400 hover:text-black shadow-[0_0_15px_rgba(212,175,55,0.1)] transition-all duration-300">
              New Booking
            </Link>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-10 relative z-10">{children}</main>
      </div>
    </div>
  )
}
