'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Play } from 'lucide-react'

const slides = [
  {
    subtitle: 'Welcome to Aura',
    title: 'Experience Pure',
    highlight: 'Luxury',
    description: 'Step into a world of unparalleled beauty and wellness. Our expert therapists craft personalized experiences that rejuvenate your body, mind, and soul.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&q=80',
  },
  {
    subtitle: 'World-Class Spa',
    title: 'Rediscover Your',
    highlight: 'Radiance',
    description: 'From deep tissue massages to luxury facials, every treatment is designed to transport you to a state of complete bliss and transformation.',
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1600&q=80',
  },
  {
    subtitle: 'Expert Stylists',
    title: 'Unveil Your',
    highlight: 'Beauty',
    description: 'Our master stylists and therapists bring years of expertise and passion to craft the perfect look and feel that\'s uniquely you.',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1600&q=80',
  },
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 6000)
    return () => clearInterval(timer)
  }, [])

  const slide = slides[current]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      {slides.map((s, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}>
          <img src={s.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900/70 via-dark-900/50 to-dark-900" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 via-transparent to-transparent" />
        </div>
      ))}

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-8 w-px h-48 bg-gradient-to-b from-transparent via-gold-400/30 to-transparent" />
      <div className="absolute bottom-1/3 left-8 w-px h-32 bg-gradient-to-b from-transparent via-gold-400/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-3xl">
          <div className={`transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="section-label inline-block mb-4">{slide.subtitle}</span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-2 text-cream">
              {slide.title}
              <br />
              <span className="text-gradient-gold italic">{slide.highlight}</span>
            </h1>
            <p className="text-cream/70 text-lg md:text-xl max-w-xl mt-6 mb-10 leading-relaxed">
              {slide.description}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/booking" className="btn-gold text-sm">
                Book Your Experience
              </Link>
              <Link href="/services" className="btn-outline-gold text-sm flex items-center gap-2">
                <Play size={14} className="fill-current" />
                Explore Services
              </Link>
            </div>
          </div>

          {/* Slide indicators */}
          <div className="flex items-center gap-3 mt-16">
            {slides.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className={`transition-all duration-300 rounded-full ${i === current ? 'w-8 h-2 bg-gold-400' : 'w-2 h-2 bg-cream/30 hover:bg-cream/50'}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Floating service pills */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-3">
        {['Hair Care', 'Spa & Wellness', 'Skin Treatments', 'Beauty Services'].map((item, i) => (
          <div key={item} className={`glass-card px-4 py-2.5 text-sm text-cream/70 cursor-default transition-all hover:text-gold-400 hover:border-gold-400/30`}
            style={{ animationDelay: `${i * 0.15}s` }}>
            {item}
          </div>
        ))}
      </div>


    </section>
  )
}
