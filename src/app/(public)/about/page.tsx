'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Award, Heart, Leaf, Star, ChevronRight, Play } from 'lucide-react'

const values = [
  { icon: Heart, title: 'Personalized Care', desc: 'Every treatment is tailored to your unique skin type, preferences, and wellness goals. We believe in individuality over standardization.' },
  { icon: Leaf, title: 'Natural Ingredients', desc: 'We use only the finest organic and sustainably sourced ingredients in all our treatments, respecting both your body and the earth.' },
  { icon: Award, title: 'Expert Team', desc: 'Our therapists hold international certifications and train regularly with global masters to bring you unparalleled expertise.' },
  { icon: Star, title: 'Luxury Experience', desc: 'From the moment you enter to the moment you leave, every detail is crafted for indulgence, serenity, and absolute comfort.' },
]

const awards = [
  { year: '2024', title: 'Best Luxury Spa', org: 'India Wellness Awards' },
  { year: '2023', title: 'Top Salon of the Year', org: 'Beauty & Wellness Council' },
  { year: '2023', title: 'Excellence in Service', org: 'Hospitality India' },
  { year: '2022', title: 'Best Skin Care Clinic', org: 'Derma Awards India' },
]

const timeline = [
  { year: '2015', title: 'The Inception', desc: 'Aura Luxury Spa was born with a single boutique studio and a vision to redefine wellness.' },
  { year: '2018', title: 'Expansion', desc: 'Opened our flagship multi-story sanctuary, introducing advanced hydrotherapy and holistic treatments.' },
  { year: '2021', title: 'The Academy', desc: 'Launched the Aura Wellness Academy to train the next generation of world-class therapists.' },
  { year: '2024', title: 'A New Era', desc: 'Awarded "Best Luxury Spa" and launched our exclusive Black Card membership programs.' },
]

export default function AboutPage() {
  const [activeYear, setActiveYear] = useState('2015')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className="min-h-screen bg-black text-cream selection:bg-gold-500/30 pb-24 overflow-x-hidden">
      
      {/* Cinematic Hero */}
      <div className="relative h-[80vh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
        {/* Massive Watermark Text */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 text-center pointer-events-none overflow-hidden opacity-[0.02] select-none z-0">
          <span className="font-display text-[12rem] md:text-[20rem] font-bold tracking-tighter whitespace-nowrap leading-none">
            LEGACY
          </span>
        </div>

        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=80" 
            alt="The Aura Legacy" 
            className="w-full h-full object-cover opacity-30 scale-105 animate-slow-zoom grayscale" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mt-24">
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-gold-400/50 to-gold-400 mx-auto mb-10" />
          <span className="font-luxury tracking-[0.5em] text-gold-400 text-[10px] md:text-xs uppercase mb-6 block">Our Story</span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cream via-white to-cream/70 mb-6 leading-none tracking-tight">
            The Aura Legacy
          </h1>
          <p className="text-cream/50 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto italic">
            "Redefining the essence of tranquility since 2015."
          </p>
        </div>
      </div>

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Editorial Founder's Note */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center mb-40 mt-10">
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-t-full overflow-hidden border border-white/10 bg-[#0a0a0a] p-2">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80" 
                alt="Founder"
                className="w-full h-[600px] object-cover rounded-t-full grayscale hover:grayscale-0 transition-all duration-1000" 
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 border border-gold-400/20 rounded-full flex items-center justify-center animate-spin-slow pointer-events-none hidden md:flex">
              <div className="w-32 h-32 border border-dashed border-gold-400/30 rounded-full" />
            </div>
          </div>
          
          <div className="lg:col-span-7 space-y-8">
            <span className="text-[10px] text-gold-400 uppercase tracking-[0.4em] font-bold block">A Vision Realized</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream font-bold leading-tight">
              A decade of<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500 italic">pure indulgence.</span>
            </h2>
            <div className="space-y-6 text-cream/50 leading-relaxed font-light text-lg">
              <p>
                Aura Luxury Spa & Salon was born from a simple yet profound vision: to create a sanctuary where every individual can experience the transformative power of expert care and absolute luxury.
              </p>
              <p>
                Founded in 2015 by wellness entrepreneur Kavya Menon, Aura began as a boutique spa with just 3 treatment rooms. Today, we serve over 10,000 clients annually across our premium locations, setting the gold standard for wellness in India.
              </p>
              <p>
                Our philosophy is rooted in the belief that true beauty radiates from within. Every treatment we offer is designed not just to enhance appearance, but to restore balance, renew energy, and elevate the spirit.
              </p>
            </div>
            
            <div className="pt-8 border-t border-white/10 mt-12 flex items-center gap-6">
              <div 
                className="text-4xl text-cream/70 opacity-80 select-none" 
                style={{ fontFamily: "'Brush Script MT', 'Alex Brush', cursive" }}
              >
                Kavya Menon
              </div>
              <div>
                <p className="text-cream font-medium tracking-widest uppercase text-xs">Kavya Menon</p>
                <p className="text-gold-400 text-[10px] tracking-widest uppercase">Founder & Visionary</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Timeline */}
        <div className="mb-40">
          <div className="text-center mb-20">
            <span className="text-[10px] text-gold-400 uppercase tracking-[0.4em] font-bold block mb-4">Our Journey</span>
            <h2 className="font-display text-4xl md:text-5xl text-cream">The Evolution</h2>
          </div>
          
          <div className="relative">
            {/* Horizontal Line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 -translate-y-1/2 hidden md:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {timeline.map((item, index) => {
                const isTop = index % 2 === 0
                return (
                <div 
                  key={item.year}
                  className="relative group cursor-pointer py-10 md:py-0 md:h-96 flex flex-col justify-center"
                  onMouseEnter={() => setActiveYear(item.year)}
                >
                  {/* Node */}
                  <div className={`w-4 h-4 rounded-full mx-auto md:absolute md:top-1/2 md:-translate-y-1/2 md:left-1/2 md:-translate-x-1/2 z-10 transition-all duration-500 mb-4 md:mb-0 ${
                    activeYear === item.year 
                      ? 'bg-gold-400 ring-8 ring-gold-400/20 scale-125' 
                      : 'bg-white/20 group-hover:bg-gold-400/50'
                  }`} />
                  
                  {/* Content Top/Bottom Alternating */}
                  <div className={`text-center transition-all duration-500 md:absolute md:left-0 md:right-0 px-2 ${
                    activeYear === item.year ? 'opacity-100 transform md:translate-y-0' : 'opacity-50 transform md:translate-y-2'
                  } ${isTop ? 'md:bottom-1/2 md:mb-8' : 'md:top-1/2 md:mt-8'}`}>
                    <span className={`font-luxury text-3xl block mb-2 transition-colors duration-500 ${
                      activeYear === item.year ? 'text-gold-400' : 'text-cream'
                    }`}>{item.year}</span>
                    <h3 className="text-cream font-display text-xl mb-2">{item.title}</h3>
                    <p className="text-cream/40 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              )})}
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-40">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-[10px] text-gold-400 uppercase tracking-[0.4em] font-bold block mb-4">What Drives Us</span>
              <h2 className="font-display text-4xl md:text-5xl text-cream">Our Core Values</h2>
            </div>
            <p className="text-cream/50 max-w-md text-sm leading-relaxed">
              The principles that guide every interaction, every treatment, and every moment you spend with us.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#0a0a0a] p-8 hover:border-gold-400/30 transition-all duration-500 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mb-8 group-hover:border-gold-400/50 group-hover:bg-gold-400/10 transition-all duration-500">
                    <Icon size={24} className="text-cream group-hover:text-gold-400 transition-colors duration-500" />
                  </div>
                  <h3 className="font-display text-xl text-cream font-semibold mb-4">{title}</h3>
                  <p className="text-cream/40 text-sm leading-relaxed font-light">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="mb-40 relative rounded-[3rem] overflow-hidden border border-white/10 bg-[#0a0a0a] p-12 lg:p-20">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold-400/5 blur-[120px] rounded-full pointer-events-none" />
          </div>
          
          <div className="relative z-10 text-center mb-16">
            <span className="text-[10px] text-gold-400 uppercase tracking-[0.4em] font-bold block mb-4">Recognition</span>
            <h2 className="font-display text-4xl md:text-5xl text-cream">Excellence Acknowledged</h2>
          </div>
          
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {awards.map(a => (
              <div key={a.title} className="flex flex-col items-center text-center group">
                <span className="text-gold-400/50 text-sm font-luxury tracking-widest mb-4 group-hover:text-gold-400 transition-colors">{a.year}</span>
                <div className="w-20 h-20 rounded-full border border-gold-400/20 flex items-center justify-center mb-6 relative">
                  <div className="absolute inset-0 rounded-full border-t border-gold-400 animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Award size={28} className="text-gold-400" />
                </div>
                <h4 className="font-display text-xl text-cream mb-2 leading-tight">{a.title}</h4>
                <p className="text-cream/40 text-xs uppercase tracking-widest">{a.org}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team CTA */}
        <div className="text-center relative max-w-4xl mx-auto mb-20">
          <h2 className="font-display text-4xl md:text-6xl text-cream mb-8">The Hands That Heal</h2>
          <p className="text-cream/50 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-2xl mx-auto">
            Meet the internationally certified masters and aestheticians behind the Aura experience.
          </p>
          <Link href="/therapists" className="inline-flex items-center gap-4 py-5 px-12 rounded-full font-bold tracking-[0.2em] uppercase text-xs transition-all duration-500 bg-white text-black hover:bg-gray-200 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:-translate-y-1">
            Meet Our Experts <ChevronRight size={16} />
          </Link>
        </div>

      </div>
    </div>
  )
}
