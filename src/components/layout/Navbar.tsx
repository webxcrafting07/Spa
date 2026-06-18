'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Menu, X, ChevronDown, User, LogOut, Settings, Calendar, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'Services', href: '/services',
    children: [
      { label: 'Hair Services', href: '/services#hair-services' },
      { label: 'Spa Treatments', href: '/services#spa-services' },
      { label: 'Skin Care', href: '/services#skin-care' },
      { label: 'Beauty Services', href: '/services#beauty-services' },
    ]
  },
  { label: 'Therapists', href: '/therapists' },
  { label: 'Membership', href: '/membership' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      isScrolled
        ? 'bg-dark-900/95 backdrop-blur-xl border-b border-gold-400/10 shadow-luxury'
        : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold">
                <span className="text-dark font-luxury font-bold text-lg">A</span>
              </div>
              <div className="absolute inset-0 rounded-full bg-gold-400/20 animate-ping opacity-0 group-hover:opacity-100" />
            </div>
            <div>
              <span className="font-luxury text-xl text-cream tracking-widest block leading-none">AURA</span>
              <span className="text-gold-400 text-xs tracking-[0.3em] font-light">LUXURY SPA</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}>
                <Link
                  href={link.href}
                  className={cn(
                    'flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    pathname === link.href
                      ? 'text-gold-400'
                      : 'text-cream/70 hover:text-cream'
                  )}>
                  {link.label}
                  {link.children && <ChevronDown size={14} className={cn('transition-transform', activeDropdown === link.label && 'rotate-180')} />}
                </Link>

                {link.children && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 pt-2 w-52">
                    <div className="glass-card py-2 shadow-luxury animate-fade-up">
                      {link.children.map((child) => (
                        <Link key={child.href} href={child.href}
                          className="block px-4 py-2.5 text-sm text-cream/70 hover:text-gold-400 hover:bg-gold-400/5 transition-colors">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA + User */}
          <div className="hidden lg:flex items-center gap-3">
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 glass-card px-4 py-2 hover:border-gold-400/40 transition-all">
                  <div className="w-7 h-7 rounded-full bg-gold-gradient flex items-center justify-center">
                    <span className="text-dark text-xs font-bold">
                      {session.user?.name?.[0]?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <span className="text-sm text-cream/80">{session.user?.name?.split(' ')[0]}</span>
                  <ChevronDown size={14} className="text-gold-400" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 glass-card py-2 shadow-luxury">
                    <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm text-cream/70 hover:text-gold-400 hover:bg-gold-400/5">
                      <User size={15} /> Dashboard
                    </Link>
                    <Link href="/dashboard/appointments" className="flex items-center gap-3 px-4 py-2.5 text-sm text-cream/70 hover:text-gold-400 hover:bg-gold-400/5">
                      <Calendar size={15} /> My Appointments
                    </Link>
                    <Link href="/dashboard/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-cream/70 hover:text-gold-400 hover:bg-gold-400/5">
                      <Settings size={15} /> Profile
                    </Link>
                    {(session.user as any)?.role === 'SUPER_ADMIN' || (session.user as any)?.role === 'ADMIN' ? (
                      <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gold-400 hover:bg-gold-400/5">
                        <Star size={15} /> Admin Panel
                      </Link>
                    ) : null}
                    <div className="border-t border-gold-400/10 mt-1 pt-1">
                      <button onClick={() => signOut({ callbackUrl: '/' })}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-400/5 w-full">
                        <LogOut size={15} /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
            {!session || (session.user as any)?.role === 'CUSTOMER' ? (
              <Link href={session ? "/dashboard/booking" : "/login"} className="btn-gold text-xs py-2 px-6">
                Book Now
              </Link>
            ) : null}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-cream/70 hover:text-gold-400 transition-colors">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-dark-900/98 backdrop-blur-xl border-t border-gold-400/10">
          <div className="px-4 py-6 space-y-2 max-h-[80vh] overflow-y-auto">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link href={link.href}
                  className={cn(
                    'block px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'text-gold-400 bg-gold-400/10'
                      : 'text-cream/70 hover:text-cream hover:bg-white/5'
                  )}>
                  {link.label}
                </Link>
                {link.children && (
                  <div className="ml-4 mt-1 space-y-1">
                    {link.children.map((child) => (
                      <Link key={child.href} href={child.href}
                        className="block px-4 py-2 text-sm text-cream/50 hover:text-gold-400 transition-colors">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              {session ? (
                <>
                  <Link href="/dashboard" className="btn-outline-gold text-center text-xs">
                    My Dashboard
                  </Link>
                  <button onClick={() => signOut({ callbackUrl: '/' })} className="text-red-400 text-sm py-2">
                    Sign Out
                  </button>
                </>
              ) : null}
              {!session || (session.user as any)?.role === 'CUSTOMER' ? (
                <Link href={session ? "/dashboard/booking" : "/login"} className="btn-gold text-center text-xs">
                  Book Appointment
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
