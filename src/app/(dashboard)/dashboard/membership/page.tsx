'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Check, Crown, Star, Zap, ChevronDown, Plus, Minus } from 'lucide-react'
import { MEMBERSHIP_PLANS, formatCurrency } from '@/lib/utils'

const faqs = [
  { q: 'Can I upgrade my membership?', a: 'Absolutely. You can elevate your tier at any time. Our concierge will seamlessly prorate the remaining days from your current plan to ensure a flawless transition.' },
  { q: 'Is membership transferable?', a: 'To maintain the exclusivity and personalized nature of our service, memberships are strictly non-transferable and assigned exclusively to the registered member.' },
  { q: 'What happens when my membership expires?', a: 'For your convenience, memberships auto-renew. However, you maintain full control and may cancel the renewal up to 7 days prior to expiration.' },
  { q: 'Can I freeze my membership?', a: 'Yes. We understand that our patrons travel frequently. Gold and Platinum members enjoy the privilege of pausing their membership for up to 30 days per calendar year.' },
  { q: 'Are there family membership plans?', a: 'Indeed. We offer bespoke family and corporate packages. Please consult with our concierge for a tailored arrangement that suits your household.' },
]

export default function DashboardMembershipPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-cream mb-2">Membership Plans</h1>
        <p className="text-cream/50 text-sm">Upgrade your experience with our exclusive Black Cards.</p>
      </div>
      
      {/* The Black Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
        {MEMBERSHIP_PLANS.map(plan => {
          const isPlatinum = plan.name.toLowerCase() === 'platinum'
          const isGold = plan.name.toLowerCase() === 'gold'
          
          return (
            <div key={plan.name}
              className={`relative flex flex-col rounded-[2rem] transition-all duration-700 hover:-translate-y-2 group overflow-hidden ${
                isPlatinum 
                  ? 'border border-white/20 bg-gradient-to-b from-[#1a1a1a] to-black shadow-[0_20px_50px_rgba(255,255,255,0.05)]' 
                  : isGold
                  ? 'border border-gold-400/40 bg-gradient-to-b from-[#2a220a] to-[#0a0802] shadow-[0_20px_50px_rgba(212,175,55,0.1)]'
                  : 'border border-gray-400/20 bg-gradient-to-b from-[#1e1e1e] to-[#0a0a0a]'
              }`}>
              
              {/* Metallic Sheen Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.07] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] pointer-events-none" />

              {/* Top Card "Chip" Area (Aesthetic) */}
              <div className={`h-24 w-full absolute top-0 left-0 bg-gradient-to-b opacity-20 pointer-events-none ${
                isPlatinum ? 'from-white to-transparent' : isGold ? 'from-gold-400 to-transparent' : 'from-gray-400 to-transparent'
              }`} />

              <div className="p-8 flex-1 flex flex-col relative z-10 mt-6">
                <div className="mb-8 text-center">
                  <h3 className="font-luxury text-xl tracking-[0.4em] uppercase mb-4" style={{ color: plan.color, textShadow: `0 0 20px ${plan.color}40` }}>
                    {plan.name}
                  </h3>
                  
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className={`text-4xl font-display tracking-tighter font-bold ${
                      isPlatinum ? 'text-white' : isGold ? 'text-gold-400' : 'text-gray-300'
                    }`}>
                      {formatCurrency(plan.price)}
                    </span>
                  </div>
                  <p className="text-cream/40 text-[10px] tracking-[0.2em] uppercase mb-4">Billed {plan.duration === 12 ? 'Annually' : 'Bi-Annually'}</p>
                </div>

                <ul className="space-y-4 flex-1 mb-8">
                  {plan.benefits.slice(0, 4).map(b => (
                    <li key={b} className="flex items-start gap-3 text-xs tracking-wide font-light text-cream/80">
                      <Check size={14} style={{ color: plan.color }} strokeWidth={2} className="mt-0.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <Link href={`/dashboard/membership/checkout?plan=${plan.name.toLowerCase()}`}
                  className={`w-full py-4 text-center text-[10px] tracking-[0.3em] uppercase transition-all duration-500 rounded-lg backdrop-blur-md font-semibold ${
                    isPlatinum ? 'bg-white text-black hover:bg-gray-200' 
                    : isGold ? 'bg-gold-400 text-black hover:bg-gold-300'
                    : 'bg-transparent border border-gray-400 text-gray-300 hover:bg-gray-400 hover:text-black'
                  }`}>
                  Acquire {plan.name}
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {/* Interactive FAQ */}
      <div className="max-w-2xl mx-auto mb-10">
        <h2 className="font-display text-2xl text-cream mb-8 border-b border-gold-400/10 pb-4">Membership Inquiries</h2>
        <div className="space-y-2">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index
            return (
              <div key={faq.q} className="border-b border-white/5">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full py-4 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className={`text-sm transition-colors ${isOpen ? 'text-gold-400' : 'text-cream/80 group-hover:text-cream'}`}>
                    {faq.q}
                  </span>
                  <div className="ml-4 flex-shrink-0">
                    {isOpen ? <Minus size={16} className="text-gold-400" /> : <Plus size={16} className="text-cream/30" />}
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
                  <p className="text-cream/50 text-xs leading-relaxed pr-8">{faq.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
