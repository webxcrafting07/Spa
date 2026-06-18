'use client'
import { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await signIn('credentials', { email, password, redirect: false })
    setLoading(false)
    if (res?.error) {
      toast.error(res.error)
    } else {
      toast.success('Welcome back!')
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1200&q=80"
          alt="Luxury Spa" className="w-full h-full object-cover" />
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
          <h2 className="font-display text-5xl text-cream font-bold leading-tight mb-4">
            Your Wellness<br /><span className="text-gradient-gold italic">Journey Awaits</span>
          </h2>
          <p className="text-cream/70 text-lg">Sign in to manage your appointments, track rewards, and access exclusive member benefits.</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-dark-900">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
            <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center">
              <span className="text-dark font-luxury font-bold text-lg">A</span>
            </div>
            <div>
              <span className="font-luxury text-xl text-cream tracking-widest block leading-none">AURA</span>
              <span className="text-gold-400 text-xs tracking-[0.3em]">LUXURY SPA</span>
            </div>
          </div>

          <h1 className="font-display text-3xl font-bold text-cream mb-2">Welcome Back</h1>
          <p className="text-cream/50 mb-8">Enter your credentials to access your account</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-cream/60 mb-2">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com" required className="input-luxury" />
            </div>
            <div>
              <label className="block text-sm text-cream/60 mb-2">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Your password" required className="input-luxury pr-12" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream/70">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-sm text-gold-400 hover:underline">Forgot password?</Link>
            </div>
            <button type="submit" disabled={loading} className="btn-gold w-full py-3.5 text-sm flex items-center justify-center gap-2">
              {loading ? <><Loader2 size={16} className="animate-spin" /> Signing In...</> : 'Sign In'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="h-px bg-gold-400/10" />
            <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark-900 px-4 text-xs text-cream/40">or</span>
          </div>

          <button onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-dark-600 hover:border-gold-400/30 text-cream/70 hover:text-cream text-sm transition-all">
            <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/></svg>
            Continue with Google
          </button>

          <p className="text-center text-sm text-cream/50 mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-gold-400 hover:underline font-medium">Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
