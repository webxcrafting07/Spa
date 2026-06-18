import Link from 'next/link'
import { Check, Crown } from 'lucide-react'
import { MEMBERSHIP_PLANS, formatCurrency } from '@/lib/utils'

export default function MembershipSection() {
  return (
    <section className="py-24 sm:py-32 bg-dark-800/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-label">Exclusive Membership</span>
          <div className="gold-divider" />
          <h2 className="section-title mt-4">Join The Aura Family</h2>
          <p className="text-cream/60 max-w-xl mx-auto mt-4">
            Unlock exclusive benefits, priority access, and savings with our curated membership plans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MEMBERSHIP_PLANS.map((plan) => (
            <div key={plan.name}
              className={`relative glass-card p-8 transition-all duration-300 hover:shadow-gold-lg ${
                plan.popular ? 'border-gold-400/50 shadow-gold scale-[1.02]' : ''
              }`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-gradient px-6 py-1.5 rounded-full text-dark text-xs font-bold tracking-widest uppercase flex items-center gap-1">
                  <Crown size={12} /> Most Popular
                </div>
              )}
              <div className="mb-6">
                <span style={{ color: plan.color }} className="font-luxury text-sm tracking-widest uppercase">
                  {plan.name}
                </span>
                <div className="mt-3">
                  <span className="text-4xl font-display font-bold text-cream">{formatCurrency(plan.price)}</span>
                  <span className="text-cream/40 text-sm">/{plan.duration === 12 ? 'year' : '6 months'}</span>
                </div>
                <p className="text-cream/50 text-sm mt-2">{plan.discount}% discount on all services</p>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent mb-6" />

              <ul className="space-y-3 mb-8">
                {plan.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-sm text-cream/70">
                    <Check size={15} className="text-gold-400 mt-0.5 shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>

              <Link href="/membership"
                className={`w-full block text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                  plan.popular
                    ? 'btn-gold'
                    : 'border border-gold-400/30 text-gold-400 hover:bg-gold-400/10'
                }`}>
                Get {plan.name} Membership
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
