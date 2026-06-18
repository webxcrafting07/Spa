'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, ZoomIn, Play } from 'lucide-react'

const categories = ['All', 'Spa & Wellness', 'Hair Studio', 'Skin Care', 'Beauty', 'Ambient']

const images = [
  { url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80', cat: 'Spa & Wellness', title: 'The Royal Suite' },
  { url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80', cat: 'Skin Care', title: '24K Gold Facial' },
  { url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80', cat: 'Hair Studio', title: 'Expert Styling' },
  { url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80', cat: 'Ambient', title: 'Serenity Details' },
  { url: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80', cat: 'Beauty', title: 'Bridal Makeup' },
  { url: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80', cat: 'Spa & Wellness', title: 'Hot Stone Therapy' },
  { url: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=600&q=80', cat: 'Hair Studio', title: 'Color Transformation' },
  { url: 'https://images.unsplash.com/photo-1531853121101-cb94c8ed218d?w=800&q=80', cat: 'Ambient', title: 'Aromatherapy' },
  { url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80', cat: 'Skin Care', title: 'Deep Hydration' },
  { url: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80', cat: 'Spa & Wellness', title: 'Hydrotherapy' },
  { url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80', cat: 'Beauty', title: 'Nail Artistry' },
  { url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80', cat: 'Hair Studio', title: 'Volume Blowout' },
  { url: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&q=80', cat: 'Spa & Wellness', title: 'Cedarwood Sauna' },
  { url: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80', cat: 'Skin Care', title: 'Organic Serums' },
  { url: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=600&q=80', cat: 'Ambient', title: 'Lounge Area' },
]

export default function GalleryPage() {
  const [active, setActive] = useState('All')
  const [lightbox, setLightbox] = useState<{ url: string, title: string, cat: string } | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const filtered = active === 'All' ? images : images.filter(i => i.cat === active)

  // Prevent background scrolling when lightbox is open
  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [lightbox])

  if (!isMounted) return null // Prevent hydration mismatch for masonry layout

  return (
    <div className="min-h-screen bg-black text-cream selection:bg-gold-500/30 pb-24">
      
      {/* Cinematic Hero */}
      <div className="relative h-[60vh] min-h-[500px] flex flex-col items-center justify-center overflow-hidden">
        {/* Massive Watermark Text */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 text-center pointer-events-none overflow-hidden opacity-[0.02] select-none z-0">
          <span className="font-display text-[12rem] md:text-[20rem] font-bold tracking-tighter whitespace-nowrap leading-none">
            GALLERY
          </span>
        </div>

        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=80" 
            alt="Spa Ambience" 
            className="w-full h-full object-cover opacity-20 scale-110 animate-slow-zoom grayscale" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mt-24">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-gold-400/50 to-gold-400 mx-auto mb-8" />
          <span className="font-luxury tracking-[0.5em] text-gold-400 text-[10px] md:text-xs uppercase mb-6 block">The Visual Journey</span>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cream via-white to-cream/70 mb-6 leading-none tracking-tight">
            Aura in Motion
          </h1>
          <p className="text-cream/50 text-lg md:text-xl font-light leading-relaxed max-w-xl mx-auto italic">
            "A glimpse into our sanctuary. Where luxury meets tranquility."
          </p>
        </div>
      </div>

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Sleek Sticky Filters */}
        <div className="sticky top-20 z-30 flex justify-center mb-16">
          <div className="inline-flex items-center gap-1 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl overflow-x-auto max-w-full hide-scrollbar">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActive(cat)}
                className={`px-6 py-2.5 rounded-full text-xs tracking-widest uppercase transition-all duration-500 whitespace-nowrap ${
                  active === cat 
                    ? 'bg-gold-400 text-black font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)]' 
                    : 'text-cream/60 hover:text-cream hover:bg-white/5'
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filtered.map((img, i) => (
            <div key={i}
              className="relative overflow-hidden rounded-[2rem] group cursor-pointer break-inside-avoid border border-white/5 bg-[#0a0a0a]"
              onClick={() => setLightbox(img)}>
              <img 
                src={img.url} 
                alt={img.title}
                loading="lazy"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" 
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-gold-400 text-[10px] uppercase tracking-[0.3em] font-bold mb-2">{img.cat}</span>
                <h3 className="text-cream font-display text-xl leading-tight mb-3">{img.title}</h3>
                
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm group-hover:border-gold-400/50 transition-colors">
                  <ZoomIn size={14} className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-32 text-center relative max-w-3xl mx-auto p-12 rounded-[3rem] border border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05),transparent)] pointer-events-none" />
          <h2 className="font-display text-3xl md:text-5xl text-cream mb-6">Experience It Yourself</h2>
          <p className="text-cream/40 mb-10 text-sm tracking-wide leading-relaxed">
            Step into a world curated for your ultimate relaxation and beauty.
          </p>
          <Link href="/login" className="inline-block py-4 px-12 rounded-full font-bold tracking-[0.2em] uppercase text-xs transition-all duration-500 bg-gold-400 text-black hover:bg-gold-300 shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:-translate-y-1">
            Book Your Appointment
          </Link>
        </div>
      </div>

      {/* Cinematic Full-Screen Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center animate-in fade-in duration-300">
          
          {/* Backdrop with heavy blur */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setLightbox(null)} />
          
          {/* Close Button */}
          <button 
            onClick={() => setLightbox(null)}
            className="absolute top-8 right-8 z-10 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-cream/70 hover:text-white hover:border-white transition-all bg-black/50 backdrop-blur-md"
          >
            <X size={20} />
          </button>

          {/* Image Container */}
          <div className="relative z-10 max-w-[90vw] max-h-[85vh] flex flex-col items-center animate-in zoom-in-95 duration-500">
            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)]">
              <img 
                src={lightbox.url} 
                alt={lightbox.title} 
                className="max-w-full max-h-[75vh] object-contain" 
              />
            </div>
            
            {/* Caption */}
            <div className="mt-8 text-center bg-black/50 px-8 py-4 rounded-full border border-white/10 backdrop-blur-md">
              <span className="text-gold-400 text-[10px] uppercase tracking-[0.4em] font-bold block mb-1">{lightbox.cat}</span>
              <h3 className="text-white font-display text-2xl">{lightbox.title}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
