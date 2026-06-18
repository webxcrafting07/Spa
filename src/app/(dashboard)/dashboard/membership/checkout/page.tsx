'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Check, Crown, Loader2, ArrowLeft, ShieldCheck, CreditCard } from 'lucide-react'
import { MEMBERSHIP_PLANS, formatCurrency } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const planQuery = searchParams.get('plan')
  
  const selectedPlan = MEMBERSHIP_PLANS.find(p => p.name.toLowerCase() === planQuery?.toLowerCase()) || MEMBERSHIP_PLANS[1]

  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')

  const isPlatinum = selectedPlan.name.toLowerCase() === 'platinum'
  const isGold = selectedPlan.name.toLowerCase() === 'gold'

  // Subtotal calculations
  const subtotal = selectedPlan.price
  const gst = subtotal * 0.18
  const total = subtotal + gst

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed) {
      toast.error('Please accept the membership terms')
      return
    }
    
    setLoading(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false)
      localStorage.setItem('aura_membership', selectedPlan.name.toLowerCase())
      toast.success(`Welcome to ${selectedPlan.name} Membership!`)
      router.push('/dashboard')
    }, 2500)
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link href="/membership" className="inline-flex items-center text-cream/50 hover:text-gold-400 transition-colors text-sm mb-8">
          <ArrowLeft size={16} className="mr-2" />
          Back to Memberships
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Form & Payment */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <h1 className="font-display text-4xl text-cream font-bold mb-2">Checkout</h1>
              <p className="text-cream/50 text-sm">Complete your acquisition of the {selectedPlan.name} Membership.</p>
            </div>

            <form onSubmit={handleCheckout} className="space-y-8">
              
              {/* Personal Details */}
              <div className="bg-dark-900/50 border border-white/5 p-6 md:p-8 rounded-[2rem] backdrop-blur-sm">
                <h2 className="font-display text-xl text-cream mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-gold-400/10 text-gold-400 flex items-center justify-center text-sm">1</span>
                  Member Details
                </h2>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs text-cream/50 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                    <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Enter your full name" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-cream placeholder-cream/20 focus:border-gold-400/50 focus:outline-none transition-colors" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-cream/50 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                      <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-cream placeholder-cream/20 focus:border-gold-400/50 focus:outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs text-cream/50 uppercase tracking-widest mb-2 ml-1">Phone Number</label>
                      <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-cream placeholder-cream/20 focus:border-gold-400/50 focus:outline-none transition-colors" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-dark-900/50 border border-white/5 p-6 md:p-8 rounded-[2rem] backdrop-blur-sm">
                <h2 className="font-display text-xl text-cream mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-gold-400/10 text-gold-400 flex items-center justify-center text-sm">2</span>
                  Payment
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {[
                    { id: 'card', label: 'Credit Card', icon: CreditCard },
                    { id: 'upi', label: 'UPI / Netbanking', icon: ShieldCheck }
                  ].map(method => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${
                        paymentMethod === method.id 
                          ? 'border-gold-400 bg-gold-400/5 text-gold-400' 
                          : 'border-white/10 bg-black/20 text-cream/50 hover:border-white/30'
                      }`}
                    >
                      <method.icon size={20} className={paymentMethod === method.id ? 'text-gold-400' : 'text-cream/30'} />
                      <span className="font-medium text-sm">{method.label}</span>
                    </button>
                  ))}
                </div>

                <label className="flex items-start gap-4 cursor-pointer p-4 bg-black/30 rounded-xl border border-white/5">
                  <button type="button" onClick={() => setAgreed(!agreed)}
                    className={`w-6 h-6 rounded border shrink-0 flex items-center justify-center transition-all ${
                      agreed ? 'bg-gold-400 border-gold-400' : 'border-white/20 hover:border-gold-400/50'
                    }`}>
                    {agreed && <Check size={14} className="text-black" strokeWidth={3} />}
                  </button>
                  <span className="text-xs text-cream/50 leading-relaxed">
                    By confirming this purchase, I agree to the <Link href="#" className="text-gold-400 hover:underline">Membership Terms and Conditions</Link>, which includes an auto-renewal policy and an exclusive commitment to the Aura Luxury Spa code of conduct.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button type="submit" disabled={loading}
                className={`w-full py-5 rounded-xl font-bold tracking-widest uppercase flex items-center justify-center gap-3 transition-all duration-500 shadow-xl ${
                  loading ? 'bg-white/10 text-cream/30 cursor-not-allowed' 
                  : isPlatinum ? 'bg-white text-black hover:bg-gray-200 shadow-[0_0_40px_rgba(255,255,255,0.2)]'
                  : 'bg-gold-400 text-black hover:bg-gold-300 shadow-[0_0_40px_rgba(212,175,55,0.2)]'
                }`}>
                {loading ? <><Loader2 size={20} className="animate-spin" /> Processing Authorization...</> : `Confirm & Pay ${formatCurrency(total)}`}
              </button>

              <p className="text-center text-[10px] text-cream/30 uppercase tracking-widest flex items-center justify-center gap-2 mt-4">
                <ShieldCheck size={12} /> 256-bit Secure Encryption
              </p>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className={`sticky top-32 rounded-[2rem] p-8 md:p-10 border transition-all ${
              isPlatinum 
                ? 'border-white/20 bg-gradient-to-b from-[#1a1a1a] to-black shadow-[0_20px_50px_rgba(255,255,255,0.05)]' 
                : isGold
                ? 'border-gold-400/40 bg-gradient-to-b from-[#2a220a] to-[#0a0802] shadow-[0_20px_50px_rgba(212,175,55,0.1)]'
                : 'border-white/10 bg-[#111] shadow-2xl'
            }`}>
              
              <div className="mb-8 pb-8 border-b border-white/10 text-center">
                <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 border border-white/10 bg-white/5">
                  <Crown size={24} className={isPlatinum ? 'text-white' : isGold ? 'text-gold-400' : 'text-cream/50'} />
                </div>
                <h3 className="font-luxury tracking-[0.4em] uppercase text-xs mb-2" style={{ color: selectedPlan.color }}>{selectedPlan.name} Membership</h3>
                <p className="text-cream/40 text-xs">Billed {selectedPlan.duration === 12 ? 'Annually' : 'Bi-Annually'}</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-cream/60">Subtotal</span>
                  <span className="text-cream">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-cream/60">Taxes (18% GST)</span>
                  <span className="text-cream">{formatCurrency(gst)}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex justify-between items-baseline mb-8">
                <span className="text-cream/80 font-medium">Total Due</span>
                <span className={`text-4xl font-display font-bold ${
                  isPlatinum ? 'text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-white' 
                  : isGold ? 'text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500' 
                  : 'text-cream'
                }`}>
                  {formatCurrency(total)}
                </span>
              </div>

              <div className="bg-black/30 rounded-xl p-5 border border-white/5 space-y-3">
                <p className="text-[10px] text-cream/40 uppercase tracking-widest border-b border-white/5 pb-2 mb-3">Included Benefits</p>
                {selectedPlan.benefits.slice(0, 4).map(b => (
                  <div key={b} className="flex gap-3 text-xs text-cream/70">
                    <Check size={14} className={isPlatinum ? 'text-white' : isGold ? 'text-gold-400' : 'text-cream/30'} />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
