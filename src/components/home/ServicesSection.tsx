'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { Clock, IndianRupee, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { SERVICES_DATA } from '@/lib/utils'

import * as Icons from 'lucide-react'

export default function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <section className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label">What We Offer</span>
          <div className="gold-divider" />
          <h2 className="section-title mt-4">Premium Services</h2>
          <p className="text-cream/60 max-w-xl mx-auto mt-4 leading-relaxed">
            Each treatment is a bespoke journey crafted with the finest products, ancient techniques, and modern innovation.
          </p>
        </div>

      {/* Category tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {SERVICES_DATA.map((cat, i) => {
          const IconComponent = (Icons as any)[cat.icon]
          return (
            <button key={cat.category} onClick={() => setActiveCategory(i)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === i
                  ? 'bg-gold-gradient text-dark shadow-gold'
                  : 'glass-card text-cream/70 hover:text-cream hover:border-gold-400/30'
              }`}>
              {IconComponent && <IconComponent size={16} />}
              {cat.category}
            </button>
          )
        })}
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SERVICES_DATA[activeCategory].services.map((service: any, i: number) => (
          <div key={service.name} className="glass-card-hover p-0 cursor-pointer group flex flex-col overflow-hidden"
            style={{ animationDelay: `${i * 0.1}s` }}>
            {/* Image area */}
            <div className="relative w-full h-48 overflow-hidden">
              <img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-cream group-hover:text-gold-400 transition-colors">
                  {service.name}
                </h3>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <p className="text-sm text-cream/60 mb-6 leading-relaxed flex-1">{service.description}</p>

              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-1.5 text-sm text-cream/50 bg-dark-800 px-3 py-1.5 rounded-full">
                  <Clock size={14} className="text-gold-400" />
                  <span>{service.duration} min</span>
                </div>
                <div className="flex items-center gap-1 text-gold-400 bg-gold-400/10 px-3 py-1.5 rounded-full font-semibold text-sm">
                  <IndianRupee size={14} />
                  <span>{service.price.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <Link href="/booking"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-gold-400/20 text-sm text-gold-400 hover:bg-gold-400 hover:text-dark transition-all duration-300 font-medium">
                Book Now <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link href="/services" className="btn-outline-gold inline-flex items-center gap-2">
          View All Services <ArrowRight size={16} />
        </Link>
      </div>
      </div>
    </section>
  )
}
