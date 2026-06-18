import Link from 'next/link'
import { Star, Gift, TrendingUp, Crown } from 'lucide-react'

const history = [
  { desc: 'Hot Stone Massage — Appointment', pts: +350, date: 'Dec 10, 2024', type: 'earn' },
  { desc: 'Gold Facial — Appointment', pts: +220, date: 'Nov 28, 2024', type: 'earn' },
  { desc: 'Redeemed for ₹200 discount', pts: -200, date: 'Nov 28, 2024', type: 'redeem' },
  { desc: 'Referral Bonus — Divya Menon', pts: +200, date: 'Nov 15, 2024', type: 'earn' },
  { desc: 'Gold Membership Bonus', pts: +150, date: 'Oct 1, 2024', type: 'earn' },
  { desc: 'Review Posted', pts: +50, date: 'Sep 20, 2024', type: 'earn' },
]

const rewards = [
  { title: '₹250 Off Next Visit', pts: 250, desc: 'Flat discount on any service above ₹1000' },
  { title: '₹500 Off Any Service', pts: 500, desc: 'Valid on any single service booking' },
  { title: 'Free Hair Spa', pts: 800, desc: 'Complimentary 60-minute hair spa session' },
  { title: 'Free Facial Treatment', pts: 1000, desc: 'Complimentary 45-minute luxury facial' },
  { title: 'VIP Day Package', pts: 2500, desc: 'Full day spa experience worth ₹8,000' },
]

export default function RewardsPage() {
  const currentPoints = 1240
  const nextTier = 2000
  const progress = (currentPoints / nextTier) * 100

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-cream font-bold">Rewards</h1>
        <p className="text-cream/50 mt-1">Earn points and unlock exclusive rewards</p>
      </div>

      {/* Points card */}
      <div className="glass-card p-8 border-gold-400/40 bg-gradient-to-br from-gold-400/10 to-transparent">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gold-gradient flex items-center justify-center">
              <Star size={28} className="text-dark fill-dark" />
            </div>
            <div>
              <p className="text-cream/60 text-sm">Your Balance</p>
              <p className="font-display text-5xl font-bold text-gold-400">{currentPoints.toLocaleString()}</p>
              <p className="text-cream/50 text-sm">reward points</p>
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-cream/60">Progress to Platinum</span>
              <span className="text-gold-400">{currentPoints} / {nextTier} pts</span>
            </div>
            <div className="h-3 bg-dark-700 rounded-full overflow-hidden">
              <div className="h-full bg-gold-gradient rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs text-cream/40 mt-2">Earn {nextTier - currentPoints} more points to unlock Platinum benefits</p>
          </div>
        </div>
      </div>

      {/* Earn points guide */}
      <div className="glass-card p-6">
        <h2 className="font-display text-lg text-cream font-semibold mb-4">How to Earn Points</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: '💆', title: 'Book Appointments', desc: 'Earn 10 pts for every ₹100 spent on services', pts: '10 pts/₹100' },
            { icon: '👥', title: 'Refer Friends', desc: 'Get 200 points for every successful referral', pts: '200 pts' },
            { icon: '⭐', title: 'Write Reviews', desc: 'Earn points for leaving verified reviews', pts: '50 pts' },
          ].map(({ icon, title, desc, pts }) => (
            <div key={title} className="bg-dark-800/50 rounded-xl p-4 text-center">
              <span className="text-3xl">{icon}</span>
              <h3 className="font-semibold text-cream mt-2 mb-1 text-sm">{title}</h3>
              <p className="text-cream/50 text-xs mb-2">{desc}</p>
              <span className="text-gold-400 text-sm font-bold bg-gold-400/10 px-3 py-1 rounded-full">{pts}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Redeem rewards */}
        <div className="glass-card p-6">
          <h2 className="font-display text-lg text-cream font-semibold mb-4">Redeem Rewards</h2>
          <div className="space-y-3">
            {rewards.map(r => (
              <div key={r.title} className="flex items-center gap-4 p-4 bg-dark-800/50 rounded-xl hover:bg-dark-700/50 transition-all">
                <div className="w-10 h-10 rounded-full bg-gold-400/10 flex items-center justify-center shrink-0">
                  <Gift size={18} className="text-gold-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-cream text-sm">{r.title}</p>
                  <p className="text-xs text-cream/50">{r.desc}</p>
                </div>
                <button
                  disabled={currentPoints < r.pts}
                  className={`shrink-0 text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    currentPoints >= r.pts
                      ? 'bg-gold-400/20 text-gold-400 hover:bg-gold-400/30 border border-gold-400/30'
                      : 'bg-dark-700 text-cream/30 cursor-not-allowed'
                  }`}>
                  {r.pts} pts
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Points history */}
        <div className="glass-card p-6">
          <h2 className="font-display text-lg text-cream font-semibold mb-4">Points History</h2>
          <div className="space-y-3">
            {history.map((h, i) => (
              <div key={i} className="flex items-center justify-between gap-4 py-3 border-b border-gold-400/08 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    h.type === 'earn' ? 'bg-green-400/15' : 'bg-red-400/15'
                  }`}>
                    {h.type === 'earn'
                      ? <TrendingUp size={14} className="text-green-400" />
                      : <Gift size={14} className="text-red-400" />}
                  </div>
                  <div>
                    <p className="text-sm text-cream/80">{h.desc}</p>
                    <p className="text-xs text-cream/40">{h.date}</p>
                  </div>
                </div>
                <span className={`font-bold text-sm shrink-0 ${h.pts > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {h.pts > 0 ? '+' : ''}{h.pts}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card p-6 text-center border-gold-400/30">
        <Crown size={32} className="text-gold-400 mx-auto mb-3" />
        <h3 className="font-display text-xl text-cream font-bold mb-2">Upgrade to Platinum</h3>
        <p className="text-cream/60 text-sm mb-4">Get 20% off all services, a dedicated therapist, and 500 bonus points</p>
        <Link href="/membership" className="btn-gold text-sm px-8">View Membership Plans</Link>
      </div>
    </div>
  )
}
