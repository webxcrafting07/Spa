'use client'
import { useState } from 'react'
import { Mail, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      toast.success('Subscribed successfully!')
      setEmail('')
      setLoading(false)
    }, 1000)
  }

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gold-900/20" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600334129128-685054112630?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-400/20 mb-8 border border-gold-400/30">
          <Mail className="text-gold-400" size={32} />
        </div>
        
        <h2 className="font-display text-4xl lg:text-5xl font-bold text-cream mb-4">Join Our Exclusive Circle</h2>
        <p className="text-cream/70 text-lg mb-10 max-w-2xl mx-auto">
          Subscribe to our newsletter to receive curated wellness tips, special offers, and early access to our new luxury treatments.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4 text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/50 transition-all"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 hover:bg-gold-400 text-dark-900 font-medium rounded-full transition-all disabled:opacity-70 disabled:cursor-not-allowed group whitespace-nowrap"
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
            {!loading && <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>
      </div>
    </section>
  )
}
