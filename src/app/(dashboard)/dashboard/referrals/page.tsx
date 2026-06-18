'use client'
import { useState } from 'react'
import { Gift, Copy, Check, Users, TrendingUp } from 'lucide-react'
import toast from 'react-hot-toast'

const referrals = [
  { name: 'Divya Menon', date: 'Nov 15, 2024', status: 'COMPLETED', reward: 200 },
  { name: 'Pooja Singh', date: 'Oct 22, 2024', status: 'COMPLETED', reward: 200 },
  { name: 'Anjali Kumar', date: 'Dec 5, 2024', status: 'PENDING', reward: 0 },
]

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false)
  const referralCode = 'AURA-ANANYA84'
  const referralLink = `https://auraspa.in/register?ref=${referralCode}`

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    toast.success('Referral link copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display text-3xl text-cream font-bold">Referrals</h1>
        <p className="text-cream/50 mt-1">Invite friends and earn rewards together</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Referred', value: referrals.length, icon: Users, color: 'text-blue-400' },
          { label: 'Successful', value: referrals.filter(r => r.status === 'COMPLETED').length, icon: Check, color: 'text-green-400' },
          { label: 'Points Earned', value: referrals.reduce((a, r) => a + r.reward, 0), icon: Gift, color: 'text-gold-400' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="glass-card p-4 text-center">
            <Icon size={18} className={`${color} mx-auto mb-2`} />
            <p className={`font-display text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-cream/50 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Referral card */}
      <div className="glass-card p-8 border-gold-400/30 bg-gradient-to-br from-gold-400/5 to-transparent">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gold-gradient flex items-center justify-center mx-auto mb-4">
            <Gift size={28} className="text-dark" />
          </div>
          <h2 className="font-display text-2xl text-cream font-bold mb-2">Your Referral Code</h2>
          <p className="text-cream/60 text-sm">Share this code with friends. You both earn rewards when they book their first appointment!</p>
        </div>

        <div className="bg-dark-800/80 rounded-xl p-4 flex items-center justify-between gap-4 mb-4 border border-gold-400/20">
          <span className="font-mono text-gold-400 font-bold text-xl tracking-widest">{referralCode}</span>
          <button onClick={copyLink}
            className="flex items-center gap-2 text-sm text-cream/70 hover:text-gold-400 transition-colors shrink-0">
            {copied ? <Check size={15} className="text-green-400" /> : <Copy size={15} />}
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>

        <button onClick={copyLink} className="btn-gold w-full py-3 flex items-center justify-center gap-2">
          <Copy size={15} /> Copy Referral Link
        </button>
      </div>

      {/* How it works */}
      <div className="glass-card p-6">
        <h3 className="font-display text-lg text-cream font-semibold mb-4">How It Works</h3>
        <div className="space-y-4">
          {[
            { step: '01', title: 'Share your code', desc: 'Share your unique referral link or code with friends and family.' },
            { step: '02', title: 'Friend registers', desc: 'Your friend signs up using your referral code — they get 15% off their first booking.' },
            { step: '03', title: 'Both earn rewards', desc: 'After their first appointment, you earn 200 reward points (worth ₹200).' },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex gap-4">
              <span className="font-luxury text-gold-400/40 text-2xl font-bold shrink-0 w-10">{step}</span>
              <div>
                <p className="font-medium text-cream text-sm">{title}</p>
                <p className="text-cream/50 text-xs mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Referral history */}
      <div className="glass-card p-6">
        <h3 className="font-display text-lg text-cream font-semibold mb-4">Referral History</h3>
        {referrals.length > 0 ? (
          <div className="space-y-3">
            {referrals.map((r, i) => (
              <div key={i} className="flex items-center justify-between gap-4 py-3 border-b border-gold-400/08 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gold-400/10 flex items-center justify-center font-bold text-gold-400 text-sm">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-cream">{r.name}</p>
                    <p className="text-xs text-cream/40">{r.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={r.status === 'COMPLETED' ? 'badge-confirmed' : 'badge-pending'}>
                    {r.status}
                  </span>
                  {r.reward > 0 && (
                    <span className="text-gold-400 font-semibold text-sm">+{r.reward} pts</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Users size={32} className="text-cream/20 mx-auto mb-3" />
            <p className="text-cream/50 text-sm">No referrals yet. Share your code to start earning!</p>
          </div>
        )}
      </div>
    </div>
  )
}
