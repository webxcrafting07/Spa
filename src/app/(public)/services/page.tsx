'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Clock, IndianRupee, ArrowRight, ChevronDown } from 'lucide-react'
import * as Icons from 'lucide-react'
import { SERVICES_DATA } from '@/lib/utils'

const serviceImages: Record<string, string> = {
  'Hair Services': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
  'Spa Services': 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
  'Skin Care': 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
  'Beauty Services': 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80',
}

const faqs = [
  { question: "How do I know which facial is right for me?", answer: "Our expert estheticians will conduct a thorough skin analysis during your consultation to recommend the best treatment for your specific skin type and concerns." },
  { question: "What products do you use for hair coloring?", answer: "We exclusively use premium, salon-grade products from top global brands like L'ORÉAL Professionnel and Kérastase to ensure vibrant color and optimal hair health." },
  { question: "Should I wash my hair before a styling appointment?", answer: "For updos and styling, day-old hair usually holds better. However, if you're coming in for a cut or color, it's best to arrive with clean, dry hair." }
]

export default function ServicesPage() {
  const [activeSection, setActiveSection] = useState<string>('')

  // Intersection Observer to highlight active sidebar link
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, { rootMargin: '-20% 0px -80% 0px' })

    SERVICES_DATA.forEach(cat => {
      const el = document.getElementById(cat.slug)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 100, // Account for fixed header
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="min-h-screen bg-dark-950 pb-20">
      {/* Immersive Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1600&q=80"
            alt="Luxury Spa Services" 
            className="w-full h-full object-cover opacity-60" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-900/60 to-dark-900/40" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mt-16">
          <span className="font-luxury tracking-[0.3em] text-gold-400 text-sm uppercase mb-4 block">Our Treatments</span>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-cream mb-6">Elevate Your Senses</h1>
          <p className="text-cream/70 text-lg md:text-xl font-light leading-relaxed">
            Discover a curated collection of bespoke treatments crafted with the finest ingredients, ancient techniques, and modern innovation.
          </p>
        </div>
      </div>

      {/* Main Content: Two Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Left Column: Sticky Sidebar */}
          <div className="lg:w-1/4 hidden lg:block">
            <div className="sticky top-32">
              <h3 className="font-luxury tracking-widest text-cream/40 text-xs uppercase mb-8">Categories</h3>
              <ul className="space-y-2">
                {SERVICES_DATA.map(cat => {
                  const IconComponent = (Icons as any)[cat.icon]
                  return (
                    <li key={cat.slug}>
                      <button
                        onClick={() => scrollToSection(cat.slug)}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 font-medium flex items-center ${
                          activeSection === cat.slug 
                            ? 'bg-gold-400/10 text-gold-400 border-l-2 border-gold-400' 
                            : 'text-cream/60 hover:bg-white/5 hover:text-cream border-l-2 border-transparent'
                        }`}
                      >
                        <span className="mr-3">{IconComponent && <IconComponent size={18} />}</span>
                        {cat.category}
                      </button>
                    </li>
                  )
                })}
              </ul>

              <div className="mt-12 p-6 bg-gradient-to-br from-gold-400/10 to-transparent border border-gold-400/20 rounded-2xl">
                <h4 className="font-display text-lg text-cream mb-2">Need Guidance?</h4>
                <p className="text-sm text-cream/60 mb-6">Let our experts help you choose the perfect treatment.</p>
                <Link href="/contact" className="text-sm font-medium text-gold-400 hover:text-gold-300 flex items-center gap-2 transition-colors">
                  Contact Us <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Service Lists */}
          <div className="lg:w-3/4">
            {SERVICES_DATA.map(cat => {
              const IconComponent = (Icons as any)[cat.icon]
              return (
              <section key={cat.slug} id={cat.slug} className="mb-24 scroll-mt-32">
                
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/5">
                  <div className="w-14 h-14 rounded-2xl bg-gold-400/10 flex items-center justify-center text-gold-400 border border-gold-400/20 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                    {IconComponent && <IconComponent size={28} />}
                  </div>
                  <div>
                    <h2 className="font-display text-3xl text-cream font-bold">{cat.category}</h2>
                    <p className="text-cream/50 mt-1">{cat.services.length} luxury treatments</p>
                  </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cat.services.map(service => (
                    <div key={service.name} className="group relative bg-dark-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-gold-400/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.05)]">
                      {/* Image Thumbnail */}
                      <div className="h-48 overflow-hidden relative">
                        <img 
                          src={serviceImages[cat.category]} 
                          alt={service.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                          <h3 className="font-display text-xl font-semibold text-cream leading-tight shadow-sm">
                            {service.name}
                          </h3>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <p className="text-sm text-cream/60 mb-6 leading-relaxed line-clamp-2">{service.description}</p>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <div className="flex flex-col">
                            <span className="text-xs text-cream/40 uppercase tracking-wider mb-1">Price</span>
                            <div className="flex items-center gap-1 text-gold-400 font-semibold">
                              <IndianRupee size={14} />
                              <span className="text-lg">{service.price.toLocaleString('en-IN')}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end">
                            <span className="text-xs text-cream/40 uppercase tracking-wider mb-1">Duration</span>
                            <span className="text-sm text-cream/80 flex items-center gap-1">
                              <Clock size={12} className="text-gold-400/70" /> {service.duration} min
                            </span>
                          </div>
                        </div>

                        <Link href="/booking" className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-gold-400 text-cream hover:text-dark-950 transition-all duration-300 font-medium text-sm group/btn">
                          Book Treatment
                          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              )
            })}
            
            {/* Services FAQ */}
            <section className="mt-16 pt-16 border-t border-white/5">
              <h3 className="font-display text-2xl font-bold text-cream mb-8">Before Your Visit</h3>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <details key={idx} className="group bg-dark-900/50 border border-white/5 rounded-2xl open:bg-white/5 transition-all">
                    <summary className="flex items-center justify-between cursor-pointer p-6 font-display text-lg text-cream select-none list-none [&::-webkit-details-marker]:hidden">
                      {faq.question}
                      <ChevronDown size={20} className="text-gold-400 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="px-6 pb-6 text-cream/60 leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="relative rounded-3xl overflow-hidden bg-dark-900 border border-gold-400/20 text-center p-12 md:p-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600334129128-685054112630?q=80&w=2070')] bg-cover bg-center opacity-5 mix-blend-overlay" />
          <div className="relative z-10">
            <h2 className="font-display text-3xl md:text-4xl text-cream font-bold mb-4">
              Begin Your Journey of Relaxation
            </h2>
            <p className="text-cream/60 max-w-lg mx-auto mb-10 text-lg">
              Experience the pinnacle of luxury wellness. Reserve your sanctuary today.
            </p>
            <Link href="/booking" className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 hover:bg-gold-400 text-dark-900 font-medium rounded-full transition-all group shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]">
              Reserve Your Appointment
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
