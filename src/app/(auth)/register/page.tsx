'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2, Check } from 'lucide-react'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const passwordStrength = () => {
    const p = form.password
    if (!p) return 0
    let score = 0
    if (p.length >= 8) score++
    if (/[A-Z]/.test(p)) score++
    if (/[0-9]/.test(p)) score++
    if (/[^A-Za-z0-9]/.test(p)) score++
    return score
  }

  const strengthColors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500']
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirm) { toast.error('Passwords do not match'); return }
    if (!agreed) { toast.error('Please accept the terms'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, password: form.password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Registration failed')
      toast.success('Account created! Please sign in.')
      router.push('/login')
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  const ps = passwordStrength()

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80"
          alt="Spa" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-dark-900/60" />
        <div className="absolute inset-0 flex flex-col justify-center px-16">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center">
              <span className="text-dark font-luxury font-bold text-lg">A</span>
            </div>
            <div>
              <span className="font-luxury text-xl text-cream tracking-widest block leading-none">AURA</span>
              <span className="text-gold-400 text-xs tracking-[0.3em]">LUXURY SPA</span>
            </div>
          </div>
          <h2 className="font-display text-5xl text-cream font-bold leading-tight mb-6">
            Join The<br /><span className="text-gradient-gold italic">Aura Family</span>
          </h2>
          {['Exclusive member discounts up to 20%', 'Priority booking for all treatments', 'Earn reward points on every visit', 'Birthday special treatments & gifts', 'Access to members-only events'].map(b => (
            <div key={b} className="flex items-center gap-3 mb-3">
              <div className="w-5 h-5 rounded-full bg-gold-400/20 flex items-center justify-center">
                <Check size={12} className="text-gold-400" />
              </div>
              <span className="text-cream/80 text-sm">{b}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-dark-900 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center">
              <span className="text-dark font-luxury font-bold text-lg">A</span>
            </div>
            <span className="font-luxury text-xl text-cream tracking-widest">AURA</span>
          </div>

          <h1 className="font-display text-3xl font-bold text-cream mb-2">Create Account</h1>
          <p className="text-cream/50 mb-8">Start your luxury wellness journey today</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-cream/60 mb-2">Full Name</label>
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Your full name" required className="input-luxury" />
            </div>
            <div>
              <label className="block text-sm text-cream/60 mb-2">Email Address</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com" required className="input-luxury" />
            </div>
            <div>
              <label className="block text-sm text-cream/60 mb-2">Phone Number</label>
              <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 98765 43210" className="input-luxury" />
            </div>
            <div>
              <label className="block text-sm text-cream/60 mb-2">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="Min. 8 characters" required className="input-luxury pr-12" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream/70">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= ps ? strengthColors[ps] : 'bg-dark-600'}`} />
                    ))}
                  </div>
                  <p className={`text-xs ${ps <= 1 ? 'text-red-400' : ps <= 2 ? 'text-orange-400' : ps <= 3 ? 'text-yellow-400' : 'text-green-400'}`}>
                    {strengthLabels[ps]} password
                  </p>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm text-cream/60 mb-2">Confirm Password</label>
              <input type="password" value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })}
                placeholder="Re-enter password" required className="input-luxury" />
            </div>
            <label className="flex items-start gap-3 cursor-pointer">
              <button type="button" onClick={() => setAgreed(!agreed)}
                className={`w-5 h-5 rounded border mt-0.5 shrink-0 flex items-center justify-center transition-all ${
                  agreed ? 'bg-gold-400 border-gold-400' : 'border-dark-500 hover:border-gold-400/50'
                }`}>
                {agreed && <Check size={12} className="text-dark" />}
              </button>
              <span className="text-sm text-cream/60">
                I agree to the{' '}
                <Link href="#" className="text-gold-400 hover:underline">Terms of Service</Link>{' '}and{' '}
                <Link href="#" className="text-gold-400 hover:underline">Privacy Policy</Link>
              </span>
            </label>

            <button type="submit" disabled={loading}
              className="btn-gold w-full py-3.5 text-sm flex items-center justify-center gap-2 mt-2">
              {loading ? <><Loader2 size={16} className="animate-spin" /> Creating Account...</> : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-cream/50 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-gold-400 hover:underline font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
