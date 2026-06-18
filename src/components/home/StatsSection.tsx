'use client'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { Users, Award, Sparkles, Star } from 'lucide-react'

const stats = [
  { icon: Users, value: 10000, suffix: '+', label: 'Happy Clients', description: 'Satisfied customers worldwide' },
  { icon: Award, value: 15, suffix: '+', label: 'Expert Therapists', description: 'Certified professionals' },
  { icon: Sparkles, value: 20, suffix: '+', label: 'Luxury Treatments', description: 'Premium services offered' },
  { icon: Star, value: 4.9, suffix: '', label: 'Star Rating', description: 'Average client rating', decimals: 1 },
]

export default function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-800/50" />
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(212,175,55,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ icon: Icon, value, suffix, label, description, decimals }, i) => (
            <div key={label} className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold-400/10 border border-gold-400/20 mb-4 mx-auto group-hover:bg-gold-400/20 group-hover:border-gold-400/40 transition-all">
                <Icon size={22} className="text-gold-400" />
              </div>
              <div className="font-display text-4xl lg:text-5xl font-bold text-cream mb-1">
                {inView ? (
                  <CountUp end={value} duration={2.5} delay={i * 0.2} decimals={decimals || 0} />
                ) : '0'}
                <span className="text-gold-400">{suffix}</span>
              </div>
              <div className="font-luxury text-xs tracking-widest text-cream/90 uppercase mb-1">{label}</div>
              <div className="text-xs text-cream/40">{description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
