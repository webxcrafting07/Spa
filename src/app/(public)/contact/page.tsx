'use client'
import { useState, useEffect } from 'react'
import { MapPin, Phone, Mail, Clock, MessageCircle, Instagram, Send, Star, ShieldCheck } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' })
  const [loading, setLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    toast.success('Your inquiry has been received. Our concierge will contact you shortly.', {
      style: {
        background: '#0a0a0a',
        color: '#D4AF37',
        border: '1px solid rgba(212, 175, 55, 0.3)',
      },
      iconTheme: {
        primary: '#D4AF37',
        secondary: '#0a0a0a',
      },
    })
    setForm({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' })
    setLoading(false)
  }

  if (!isMounted) return null

  return (
    <div className="min-h-screen bg-black text-cream selection:bg-gold-500/30 pb-24">
      
      {/* Cinematic Hero */}
      <div className="relative h-[60vh] min-h-[500px] flex flex-col items-center justify-center overflow-hidden">
        {/* Massive Watermark Text */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 text-center pointer-events-none overflow-hidden opacity-[0.02] select-none z-0">
          <span className="font-display text-[10rem] md:text-[16rem] font-bold tracking-tighter whitespace-nowrap leading-none">
            CONCIERGE
          </span>
        </div>

        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1600&q=80" 
            alt="The Concierge Desk" 
            className="w-full h-full object-cover opacity-20 scale-105 animate-slow-zoom grayscale" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mt-24">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-gold-400/50 to-gold-400 mx-auto mb-8" />
          <span className="font-luxury tracking-[0.5em] text-gold-400 text-[10px] md:text-xs uppercase mb-6 block">Private Client Services</span>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cream via-white to-cream/70 mb-6 leading-none tracking-tight">
            The Concierge
          </h1>
          <p className="text-cream/50 text-lg md:text-xl font-light leading-relaxed max-w-xl mx-auto italic">
            "At your service, anticipating every need for a flawless experience."
          </p>
        </div>
      </div>

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-20 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* The Concierge Desk (Info) */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <span className="text-[10px] text-gold-400 uppercase tracking-[0.4em] font-bold block mb-4">Reach Out</span>
              <h2 className="font-display text-4xl text-cream mb-6">Direct Access</h2>
              <p className="text-cream/50 leading-relaxed font-light text-lg">
                Whether you seek a bespoke treatment plan or wish to reserve our private suites, our concierge team is available to assist you with absolute discretion.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { icon: MapPin, title: 'The Sanctuary', lines: ['12, Luxury Plaza, MG Road', 'Bangalore, Karnataka 560001'] },
                { icon: Phone, title: 'Direct Line', lines: ['+91 98765 43210 (VIP Desk)', '+91 80 4567 8901 (General)'] },
                { icon: Mail, title: 'Private Email', lines: ['concierge@auraspa.in', 'bookings@auraspa.in'] },
                { icon: Clock, title: 'Operating Hours', lines: ['Monday – Saturday: 9:00 AM – 9:00 PM', 'Sunday: Exclusive Appointments Only'] },
              ].map(({ icon: Icon, title, lines }) => (
                <div key={title} className="flex gap-6 group">
                  <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover:border-gold-400/50 group-hover:bg-gold-400/10 transition-all duration-500">
                    <Icon size={22} className="text-cream group-hover:text-gold-400 transition-colors duration-500" />
                  </div>
                  <div className="pt-2">
                    <p className="font-display text-xl text-cream mb-2 group-hover:text-gold-400 transition-colors duration-500">{title}</p>
                    {lines.map((l, i) => <p key={i} className="text-cream/50 font-light leading-relaxed">{l}</p>)}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="pt-8 border-t border-white/10">
              <p className="text-[10px] text-cream/40 uppercase tracking-[0.3em] font-bold mb-6">Instant Connect</p>
              <div className="flex flex-wrap gap-4">
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-[#0a0a0a] hover:border-green-500/50 hover:bg-green-500/10 transition-all duration-500 group">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-cream/50 group-hover:text-green-400 transition-colors">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  <span className="text-xs uppercase tracking-widest font-bold text-cream group-hover:text-green-400 transition-colors">WhatsApp</span>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-[#0a0a0a] hover:border-pink-500/50 hover:bg-pink-500/10 transition-all duration-500 group">
                  <Instagram size={18} className="text-cream/50 group-hover:text-pink-400 transition-colors" /> 
                  <span className="text-xs uppercase tracking-widest font-bold text-cream group-hover:text-pink-400 transition-colors">Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Premium Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="relative rounded-[3rem] overflow-hidden border border-white/10 bg-[#0a0a0a] p-10 md:p-16">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-400/5 to-transparent pointer-events-none" />
              
              <div className="relative z-10 mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <Star size={16} className="text-gold-400" />
                  <span className="text-[10px] text-gold-400 uppercase tracking-[0.4em] font-bold block">Priority Inquiry</span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl text-cream font-bold">Request a Callback</h3>
              </div>

              <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group">
                    <label className="text-[10px] text-cream/40 uppercase tracking-widest mb-3 block group-focus-within:text-gold-400 transition-colors">Full Name *</label>
                    <input type="text" placeholder="e.g. Eleanor Vance" required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-transparent border-b border-white/10 pb-3 text-cream placeholder-cream/20 focus:outline-none focus:border-gold-400 transition-colors font-light" />
                  </div>
                  
                  <div className="group">
                    <label className="text-[10px] text-cream/40 uppercase tracking-widest mb-3 block group-focus-within:text-gold-400 transition-colors">Email Address *</label>
                    <input type="email" placeholder="eleanor@example.com" required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-transparent border-b border-white/10 pb-3 text-cream placeholder-cream/20 focus:outline-none focus:border-gold-400 transition-colors font-light" />
                  </div>

                  <div className="group">
                    <label className="text-[10px] text-cream/40 uppercase tracking-widest mb-3 block group-focus-within:text-gold-400 transition-colors">Contact Number</label>
                    <input type="tel" placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-transparent border-b border-white/10 pb-3 text-cream placeholder-cream/20 focus:outline-none focus:border-gold-400 transition-colors font-light" />
                  </div>

                  <div className="group">
                    <label className="text-[10px] text-cream/40 uppercase tracking-widest mb-3 block group-focus-within:text-gold-400 transition-colors">Inquiry Type</label>
                    <select 
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-transparent border-b border-white/10 pb-3 text-cream focus:outline-none focus:border-gold-400 transition-colors font-light appearance-none cursor-pointer"
                    >
                      <option value="General Inquiry" className="bg-black text-cream">General Inquiry</option>
                      <option value="Private Booking" className="bg-black text-cream">Private Booking</option>
                      <option value="Black Card Membership" className="bg-black text-cream">Black Card Membership</option>
                      <option value="Corporate Retreat" className="bg-black text-cream">Corporate Retreat</option>
                    </select>
                  </div>
                </div>

                <div className="group">
                  <label className="text-[10px] text-cream/40 uppercase tracking-widest mb-3 block group-focus-within:text-gold-400 transition-colors">Your Message *</label>
                  <textarea placeholder="How may we assist you today?" rows={4} required
                    value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-transparent border-b border-white/10 pb-3 text-cream placeholder-cream/20 focus:outline-none focus:border-gold-400 transition-colors font-light resize-none" />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                  <div className="flex items-center gap-2 text-cream/40">
                    <ShieldCheck size={16} />
                    <span className="text-[10px] uppercase tracking-widest">Strictly Confidential</span>
                  </div>
                  
                  <button type="submit" disabled={loading}
                    className="w-full sm:w-auto px-10 py-4 rounded-full font-bold tracking-[0.2em] uppercase text-xs transition-all duration-500 bg-gold-400 text-black hover:bg-gold-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed">
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Processing
                      </>
                    ) : (
                      <>
                        Submit Inquiry <Send size={14} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Immersive Map */}
        <div className="mt-32 mb-20 relative rounded-[3rem] overflow-hidden border border-white/10 bg-[#0a0a0a] h-[500px] group">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000 z-10 pointer-events-none" />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9955863895295!2d77.5945627!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sMG+Road%2C+Bangalore!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
            width="100%" height="100%" 
            style={{ border: 0, filter: 'invert(100%) hue-rotate(180deg) contrast(120%) brightness(80%)' }}
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full transform group-hover:scale-105 transition-transform duration-[2s] ease-in-out"
            title="Aura Spa Location" 
          />
        </div>

      </div>
    </div>
  )
}
