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

export default function MembershipPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-black text-cream selection:bg-gold-500/30">
      
      {/* Cinematic Hero Section */}
      <div className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Massive Watermark Text */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 text-center pointer-events-none overflow-hidden opacity-[0.02] select-none z-0">
          <span className="font-display text-[15rem] md:text-[25rem] font-bold tracking-tighter whitespace-nowrap leading-none">
            ELITE
          </span>
        </div>

        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=80" 
            alt="Exclusive Access" 
            className="w-full h-full object-cover opacity-30 scale-110 animate-slow-zoom" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mt-24 flex flex-col items-center">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-gold-400/50 to-gold-400 mb-8" />
          <span className="font-luxury tracking-[0.5em] text-gold-400 text-[10px] md:text-xs uppercase mb-6 block">Privileged Access</span>
          <h1 className="font-display text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cream via-white to-cream/70 mb-8 leading-none tracking-tight">The Inner Circle</h1>
          <p className="text-cream/50 text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto italic">
            "Unlock unparalleled privileges. A sanctuary reserved exclusively for those who demand perfection."
          </p>
        </div>
      </div>

      <div className="max-w-[90rem] mx-auto px-4 sm:px-8 lg:px-16 py-20">
        
        {/* The Black Cards (Pricing Tiers) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mb-40 mt-[-100px] relative z-20">
          {MEMBERSHIP_PLANS.map(plan => {
            const isPlatinum = plan.name.toLowerCase() === 'platinum'
            const isGold = plan.name.toLowerCase() === 'gold'
            
            return (
              <div key={plan.name}
                className={`relative flex flex-col rounded-[2rem] transition-all duration-700 hover:-translate-y-4 group overflow-hidden backdrop-blur-2xl ${
                  isPlatinum 
                    ? 'scale-100 md:scale-110 z-20 shadow-[0_20px_50px_rgba(255,255,255,0.05)] border border-white/20 bg-gradient-to-b from-[#1a1a1a] to-black' 
                    : isGold
                    ? 'z-10 shadow-[0_20px_50px_rgba(212,175,55,0.1)] border border-gold-400/40 bg-gradient-to-b from-[#2a220a] to-[#0a0802]'
                    : 'z-0 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-gray-400/20 bg-gradient-to-b from-[#1e1e1e] to-[#0a0a0a]'
                }`}>
                
                {/* Metallic Sheen Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.07] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] pointer-events-none" />

                {/* Top Card "Chip" Area (Aesthetic) */}
                <div className={`h-32 w-full absolute top-0 left-0 bg-gradient-to-b opacity-20 pointer-events-none ${
                  isPlatinum ? 'from-white to-transparent' : isGold ? 'from-gold-400 to-transparent' : 'from-gray-400 to-transparent'
                }`} />

                {/* Popular Badge inside the card so it doesn't get cut by overflow-hidden */}
                {plan.popular && (
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 px-6 py-1.5 rounded-full text-black text-[10px] tracking-[0.3em] font-bold uppercase shadow-[0_0_30px_rgba(212,175,55,0.6)] z-20 w-max">
                    Most Desired
                  </div>
                )}

                <div className={`p-8 lg:p-10 flex-1 flex flex-col relative z-10 ${plan.popular ? 'mt-12' : 'mt-6'}`}>
                  {/* Card Header */}
                  <div className="mb-10 text-center">
                    <h3 className="font-luxury text-xl tracking-[0.4em] uppercase mb-6" style={{ color: plan.color, textShadow: `0 0 20px ${plan.color}40` }}>
                      {plan.name}
                    </h3>
                    
                    <div className="flex items-baseline justify-center gap-2 mb-4">
                      <span className={`text-6xl font-display tracking-tighter font-bold ${
                        isPlatinum ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                        : isGold ? 'text-gold-400 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                        : 'text-gray-300 drop-shadow-[0_0_15px_rgba(200,200,200,0.2)]'
                      }`}>
                        {formatCurrency(plan.price)}
                      </span>
                    </div>
                    <p className="text-cream/40 text-xs tracking-[0.2em] uppercase mb-6">Billed {plan.duration === 12 ? 'Annually' : 'Bi-Annually'}</p>
                    
                    <div className="inline-block px-5 py-2 border rounded-full text-xs tracking-widest font-medium uppercase backdrop-blur-md" 
                         style={{ borderColor: `${plan.color}50`, color: plan.color, backgroundColor: `${plan.color}10` }}>
                      {plan.discount}% Privilege Discount
                    </div>
                  </div>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-10" />

                  {/* Benefits */}
                  <ul className="space-y-6 flex-1 mb-12">
                    {plan.benefits.map(b => (
                      <li key={b} className="flex items-start gap-4 text-sm tracking-wide font-light text-cream/80">
                        <div className="mt-0.5 rounded-full p-1" style={{ backgroundColor: `${plan.color}20` }}>
                          <Check size={12} style={{ color: plan.color }} strokeWidth={3} />
                        </div>
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Button */}
                  <Link href="/login"
                    className={`w-full py-4 text-center text-xs tracking-[0.3em] uppercase transition-all duration-500 rounded-lg backdrop-blur-md font-semibold ${
                      isPlatinum 
                        ? 'bg-white text-black hover:bg-gray-200 shadow-[0_0_30px_rgba(255,255,255,0.3)]' 
                        : isGold
                        ? 'bg-gold-400 text-black hover:bg-gold-300 shadow-[0_0_30px_rgba(212,175,55,0.3)]'
                        : 'bg-transparent border border-gray-400 text-gray-300 hover:bg-gray-400 hover:text-black'
                    }`}>
                    Acquire {plan.name}
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* High-End Comparison Table */}
        <div className="mb-40 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-cream mb-4 tracking-tight">Privilege Comparison</h2>
            <div className="w-px h-12 bg-gold-400/30 mx-auto" />
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="py-6 px-4 font-luxury text-[10px] tracking-[0.3em] uppercase text-cream/40 border-b border-white/10 w-2/5">Benefit</th>
                  <th className="py-6 px-4 font-luxury text-[10px] tracking-[0.3em] uppercase text-cream/40 border-b border-white/10 text-center">Silver</th>
                  <th className="py-6 px-4 font-luxury text-[10px] tracking-[0.3em] uppercase text-gold-400/70 border-b border-gold-400/30 text-center">Gold</th>
                  <th className="py-6 px-4 font-luxury text-[10px] tracking-[0.3em] uppercase text-gold-400 border-b border-gold-400 text-center">Platinum</th>
                </tr>
              </thead>
              <tbody className="font-light text-sm text-cream/70">
                {[
                  ['Service Discount', '5%', '10%', '20%'],
                  ['Priority Booking', '✓', '✓', '✓'],
                  ['Complimentary Consultation', '—', '✓', '✓'],
                  ['Birthday Experience', 'Standard', 'Luxury Upgrade', 'Full Day Retreat'],
                  ['Guest Passes / Year', '—', '2', '6'],
                  ['VIP Lounge Access', '—', '—', '✓'],
                  ['Dedicated Concierge', '—', '—', '✓'],
                  ['Home Service / Month', '—', '—', '2'],
                  ['Reward Points Multiplier', '1x', '1.5x', '3x'],
                  ['Membership Freeze', '—', '30 days', '60 days'],
                ].map(([feature, silver, gold, platinum], idx) => (
                  <tr key={feature} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="py-6 px-4 border-b border-white/5 tracking-wide">{feature}</td>
                    <td className="py-6 px-4 border-b border-white/5 text-center text-cream/40">
                      {silver === '—' ? <span className="opacity-30">—</span> : silver === '✓' ? <Check size={16} className="mx-auto text-cream/50" /> : silver}
                    </td>
                    <td className="py-6 px-4 border-b border-white/5 text-center text-gold-400/70">
                      {gold === '—' ? <span className="opacity-30">—</span> : gold === '✓' ? <Check size={16} className="mx-auto text-gold-400/70" /> : gold}
                    </td>
                    <td className="py-6 px-4 border-b border-white/5 text-center text-gold-400 font-medium">
                      {platinum === '—' ? <span className="opacity-30">—</span> : platinum === '✓' ? <Check size={16} className="mx-auto text-gold-400" /> : platinum}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How it works */}
        <div className="mb-40">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-cream mb-4 tracking-tight">The Process</h2>
            <div className="w-px h-12 bg-gold-400/30 mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
            {[
              { step: 'I', icon: Star, title: 'Select Tier', desc: 'Choose the level of privilege that perfectly aligns with your wellness aspirations.' },
              { step: 'II', icon: Zap, title: 'Instant Activation', desc: 'Your status is recognized immediately. The digital black card is provisioned to your profile.' },
              { step: 'III', icon: Crown, title: 'Bespoke Experience', desc: 'Begin booking your treatments and enjoy priority access, lounge entry, and VIP rates.' },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="text-center group">
                <div className="font-display text-6xl text-white/5 mb-[-30px] group-hover:text-gold-400/10 transition-colors duration-700">{step}</div>
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-8 bg-black relative z-10 group-hover:border-gold-400/50 transition-colors duration-500">
                  <Icon size={24} className="text-cream/50 group-hover:text-gold-400 transition-colors" />
                </div>
                <h3 className="font-luxury tracking-[0.2em] text-xs text-cream uppercase mb-4">{title}</h3>
                <p className="text-cream/40 font-light leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive FAQ */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-cream mb-4 tracking-tight">Inquiries</h2>
            <div className="w-px h-12 bg-gold-400/30 mx-auto" />
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index
              return (
                <div key={faq.q} className="border-b border-white/10">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
                  >
                    <span className={`text-sm tracking-wide transition-colors ${isOpen ? 'text-gold-400' : 'text-cream group-hover:text-gold-400/70'}`}>
                      {faq.q}
                    </span>
                    <div className="ml-4 flex-shrink-0">
                      {isOpen ? (
                        <Minus size={18} className="text-gold-400" />
                      ) : (
                        <Plus size={18} className="text-cream/30 group-hover:text-gold-400/70 transition-colors" />
                      )}
                    </div>
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isOpen ? 'max-h-48 opacity-100 pb-6' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-cream/50 font-light text-sm leading-relaxed pr-12">
                      {faq.a}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}
