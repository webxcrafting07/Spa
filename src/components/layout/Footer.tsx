'use client'
import Link from 'next/link'
import { useState } from 'react'
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, Twitter, Send, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    toast.success('Welcome to The Inner Circle. Subscription confirmed.', {
      style: { background: '#0a0a0a', color: '#D4AF37', border: '1px solid rgba(212, 175, 55, 0.3)' },
      iconTheme: { primary: '#D4AF37', secondary: '#0a0a0a' },
    })
    setEmail('')
  }

  return (
    <footer className="bg-[#050505] border-t border-white/5 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gold-400/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Global Newsletter Section */}
      <div className="border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[10px] text-gold-400 uppercase tracking-[0.4em] font-bold block mb-4">Join The Inner Circle</span>
              <h2 className="font-display text-3xl md:text-5xl text-cream font-bold leading-tight mb-4">
                Exclusive insights &<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500 italic">private privileges.</span>
              </h2>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4 text-cream placeholder-cream/30 focus:outline-none focus:border-gold-400 focus:bg-white/10 transition-all font-light"
                required
              />
              <button 
                type="submit"
                className="px-8 py-4 rounded-full font-bold tracking-[0.2em] uppercase text-xs transition-all duration-500 bg-gold-400 text-black hover:bg-gold-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] flex items-center justify-center gap-3 whitespace-nowrap group"
              >
                Subscribe <Send size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand - Span 4 */}
          <div className="lg:col-span-4 pr-8">
            <Link href="/" className="inline-block group mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-gold-400/30 flex items-center justify-center group-hover:border-gold-400 transition-colors duration-500 relative">
                  <div className="absolute inset-0 rounded-full bg-gold-400/5 group-hover:bg-gold-400/10 transition-colors duration-500" />
                  <span className="text-gold-400 font-luxury font-bold text-2xl relative z-10">A</span>
                </div>
                <div>
                  <span className="font-luxury text-2xl text-cream tracking-widest block leading-none mb-1 group-hover:text-gold-400 transition-colors duration-500">AURA</span>
                  <span className="text-cream/50 text-[10px] tracking-[0.4em] font-light block">THE LEGACY</span>
                </div>
              </div>
            </Link>
            <p className="text-cream/40 text-sm leading-relaxed mb-8 font-light pr-4">
              Where absolute luxury meets holistic wellness. Experience the zenith of spa treatments and bespoke beauty services in an environment crafted for pure opulence.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: Instagram, href: '#' },
                { icon: Facebook, href: '#' },
                { icon: Youtube, href: '#' },
                { icon: Twitter, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a key={i} href={href}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-cream/40 hover:text-gold-400 hover:border-gold-400/40 hover:bg-gold-400/5 transition-all duration-500 hover:-translate-y-1">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Curated Services - Span 3 */}
          <div className="lg:col-span-3 lg:ml-8">
            <h3 className="font-luxury text-xs tracking-[0.3em] text-gold-400 mb-8 font-bold">THE COLLECTIONS</h3>
            <ul className="space-y-4">
              {['Signature Massages', 'Advanced Skin Care', 'The Hair Studio', 'Bridal Enhancements', 'Hydrotherapy', 'Black Card Memberships'].map((s) => (
                <li key={s}>
                  <Link href="/services" className="text-cream/50 text-sm hover:text-white transition-colors flex items-center gap-3 group font-light">
                    <ArrowRight size={12} className="text-gold-400 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{s}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* The Experience - Span 2 */}
          <div className="lg:col-span-2">
            <h3 className="font-luxury text-xs tracking-[0.3em] text-gold-400 mb-8 font-bold">EXPERIENCE</h3>
            <ul className="space-y-4">
              {[
                { label: 'Private Booking', href: '/booking' },
                { label: 'Our Experts', href: '/therapists' },
                { label: 'Visual Journey', href: '/gallery' },
                { label: 'The Journal', href: '/blog' },
                { label: 'Our Legacy', href: '/about' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-cream/50 text-sm hover:text-white transition-colors flex items-center gap-3 group font-light">
                    <ArrowRight size={12} className="text-gold-400 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* The Concierge - Span 3 */}
          <div className="lg:col-span-3">
            <h3 className="font-luxury text-xs tracking-[0.3em] text-gold-400 mb-8 font-bold">THE CONCIERGE</h3>
            <div className="space-y-6">
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                className="flex gap-4 text-sm text-cream/50 hover:text-white transition-colors group font-light">
                <MapPin size={18} className="text-gold-400 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                <span>12, Luxury Plaza, MG Road<br />Bangalore, Karnataka 560001</span>
              </a>
              <a href="tel:+919876543210" className="flex gap-4 text-sm text-cream/50 hover:text-white transition-colors group font-light">
                <Phone size={18} className="text-gold-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span>+91 98765 43210</span>
              </a>
              <a href="mailto:concierge@auraspa.in" className="flex gap-4 text-sm text-cream/50 hover:text-white transition-colors group font-light">
                <Mail size={18} className="text-gold-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span>concierge@auraspa.in</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 relative z-10 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-xs text-cream/30 uppercase tracking-widest font-light mb-1">
              © {new Date().getFullYear()} Aura Luxury Spa. Excellence in Wellness.
            </p>
            <p className="text-[10px] text-cream/20 uppercase tracking-widest font-light">
              Developed by <a href="https://webxcrafting.in" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">webxcrafting.in</a>
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Discretion Agreement'].map((item) => (
              <Link key={item} href="#" className="text-[10px] text-cream/30 hover:text-gold-400 uppercase tracking-widest transition-colors font-bold">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
