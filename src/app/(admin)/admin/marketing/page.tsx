'use client'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Mail, MessageSquare, Bell, Tag, Plus, Send, Users, Star } from 'lucide-react'

const campaigns = [
  { id: '1', name: 'December Winter Glow Sale', type: 'EMAIL', status: 'ACTIVE', sent: 2847, opened: 1423, clicked: 389, date: 'Dec 10, 2024' },
  { id: '2', name: 'Bridal Season 2025 Launch', type: 'SMS', status: 'SCHEDULED', sent: 0, opened: 0, clicked: 0, date: 'Dec 20, 2024' },
  { id: '3', name: 'Platinum Member Exclusive Offer', type: 'EMAIL', status: 'COMPLETED', sent: 142, opened: 98, clicked: 67, date: 'Nov 25, 2024' },
  { id: '4', name: 'Weekend Spa Special Push', type: 'PUSH', status: 'COMPLETED', sent: 3200, opened: 1640, clicked: 520, date: 'Nov 15, 2024' },
]

// Removed hardcoded coupons

const typeIcon: Record<string, JSX.Element> = {
  EMAIL: <Mail size={14} className="text-blue-400" />,
  SMS: <MessageSquare size={14} className="text-green-400" />,
  PUSH: <Bell size={14} className="text-purple-400" />,
}

const typeColor: Record<string, string> = {
  EMAIL: 'bg-blue-400/20 text-blue-400',
  SMS: 'bg-green-400/20 text-green-400',
  PUSH: 'bg-purple-400/20 text-purple-400',
}

export default function AdminMarketingPage() {
  const [activeTab, setActiveTab] = useState('campaigns')
  const [showCampaignModal, setShowCampaignModal] = useState(false)
  const [showCouponModal, setShowCouponModal] = useState(false)
  const [coupons, setCoupons] = useState<any[]>([])
  const [couponForm, setCouponForm] = useState({ code: '', discountType: 'Percentage', discountValue: '', maxUses: '', expiresAt: '' })

  const fetchCoupons = () => {
    fetch('/api/admin/coupons')
      .then(res => res.json())
      .then(data => setCoupons(data))
  }

  useEffect(() => {
    fetchCoupons()
  }, [])

  const handleCouponSubmit = async (e: any) => {
    e.preventDefault()
    const loadingToast = toast.loading('Creating coupon...')
    try {
      const res = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(couponForm)
      })
      if (res.ok) {
        toast.success('Coupon created', { id: loadingToast })
        setShowCouponModal(false)
        fetchCoupons()
      } else {
        toast.error('Failed to create', { id: loadingToast })
      }
    } catch {
      toast.error('An error occurred', { id: loadingToast })
    }
  }

  const handleToggleCoupon = async (id: string, current: boolean) => {
    try {
      await fetch('/api/admin/coupons', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isActive: !current })
      })
      fetchCoupons()
    } catch {}
  }

  const handleDeleteCoupon = async (id: string) => {
    if (!confirm('Are you sure you want to delete this coupon?')) return
    try {
      await fetch(`/api/admin/coupons?id=${id}`, { method: 'DELETE' })
      fetchCoupons()
    } catch {}
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-cream font-bold">Marketing</h1>
          <p className="text-cream/50 mt-1 text-sm">Campaigns, coupons & customer engagement</p>
        </div>
        <div className="flex gap-3">
          {activeTab === 'campaigns'
            ? <button onClick={() => setShowCampaignModal(true)} className="btn-gold text-xs py-2.5 px-5 flex items-center gap-2"><Plus size={15} /> New Campaign</button>
            : <button onClick={() => setShowCouponModal(true)} className="btn-gold text-xs py-2.5 px-5 flex items-center gap-2"><Plus size={15} /> New Coupon</button>
          }
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Campaigns', value: campaigns.length, color: 'text-blue-400' },
          { label: 'Total Reach', value: '6,189', color: 'text-gold-400' },
          { label: 'Active Coupons', value: coupons.filter(c => c.isActive).length, color: 'text-green-400' },
          { label: 'Coupon Redemptions', value: coupons.reduce((a, c) => a + c.usedCount, 0), color: 'text-purple-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="glass-card p-4 text-center">
            <p className={`font-display text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-cream/50 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gold-400/10">
        {[
          { key: 'campaigns', label: 'Campaigns', icon: Send },
          { key: 'coupons', label: 'Coupons & Offers', icon: Tag },
          { key: 'referrals', label: 'Referral Program', icon: Users },
          { key: 'reviews', label: 'Customer Reviews', icon: Star },
        ].map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all ${
              activeTab === key ? 'text-gold-400 border-b-2 border-gold-400' : 'text-cream/50 hover:text-cream'
            }`}>
            <Icon size={15} /> {label}
          </button>
        ))}
      </div>

      {/* Campaigns */}
      {activeTab === 'campaigns' && (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-luxury">
              <thead>
                <tr>
                  <th>Campaign</th><th>Type</th><th>Status</th>
                  <th>Sent</th><th>Opened</th><th>Clicked</th>
                  <th>CTR</th><th>Date</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map(c => (
                  <tr key={c.id}>
                    <td className="font-medium text-cream">{c.name}</td>
                    <td>
                      <span className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-full w-fit ${typeColor[c.type]}`}>
                        {typeIcon[c.type]} {c.type}
                      </span>
                    </td>
                    <td>
                      <span className={
                        c.status === 'ACTIVE' ? 'badge-confirmed' :
                        c.status === 'SCHEDULED' ? 'badge-pending' :
                        'badge-completed'
                      }>{c.status}</span>
                    </td>
                    <td className="text-cream/70">{c.sent.toLocaleString()}</td>
                    <td className="text-cream/70">{c.opened > 0 ? c.opened.toLocaleString() : '—'}</td>
                    <td className="text-cream/70">{c.clicked > 0 ? c.clicked.toLocaleString() : '—'}</td>
                    <td className="text-gold-400 font-semibold">
                      {c.sent > 0 ? ((c.clicked / c.sent) * 100).toFixed(1) + '%' : '—'}
                    </td>
                    <td className="text-cream/50 text-xs">{c.date}</td>
                    <td>
                      <button className="text-xs text-gold-400 hover:underline">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Coupons */}
      {activeTab === 'coupons' && (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-luxury">
              <thead>
                <tr>
                  <th>Code</th><th>Type</th><th>Value</th>
                  <th>Used</th><th>Limit</th><th>Expires</th>
                  <th>Status</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map(c => (
                  <tr key={c.id}>
                    <td>
                      <span className="font-mono text-sm font-bold text-gold-400 bg-gold-400/10 px-3 py-1 rounded-lg">{c.code}</span>
                    </td>
                    <td className="text-cream/70">{c.discountType}</td>
                    <td className="text-gold-400 font-semibold">{c.discountType === 'Percentage' ? `${c.discountValue}%` : `₹${c.discountValue}`}</td>
                    <td className="text-cream/70">{c.usedCount}</td>
                    <td className="text-cream/70">{c.maxUses || 'Unlimited'}</td>
                    <td className="text-cream/60 text-xs">{c.expiresAt ? new Date(c.expiresAt).toLocaleDateString() : 'Never'}</td>
                    <td>
                      <button onClick={() => handleToggleCoupon(c.id, c.isActive)} className={c.isActive && (!c.maxUses || c.usedCount < c.maxUses) ? 'badge-confirmed' : 'badge-cancelled'}>
                        {c.isActive && (!c.maxUses || c.usedCount < c.maxUses) ? 'Active' : (c.maxUses && c.usedCount >= c.maxUses) ? 'Exhausted' : 'Inactive'}
                      </button>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button onClick={() => handleDeleteCoupon(c.id)} className="text-xs text-red-400 hover:underline">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Referrals */}
      {activeTab === 'referrals' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Total Referrals', value: '184', color: 'text-gold-400' },
              { label: 'Successful Conversions', value: '132', color: 'text-green-400' },
              { label: 'Rewards Given', value: '₹66,000', color: 'text-purple-400' },
            ].map(({ label, value, color }) => (
              <div key={label} className="glass-card p-5 text-center">
                <p className={`font-display text-3xl font-bold ${color}`}>{value}</p>
                <p className="text-cream/50 text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
          <div className="glass-card p-6">
            <h3 className="font-display text-lg text-cream font-semibold mb-4">Referral Program Settings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-cream/60 mb-2">Referrer Reward (₹)</label>
                <input type="number" defaultValue={500} className="input-luxury" />
              </div>
              <div>
                <label className="block text-sm text-cream/60 mb-2">Referred Friend Discount (%)</label>
                <input type="number" defaultValue={10} className="input-luxury" />
              </div>
              <div>
                <label className="block text-sm text-cream/60 mb-2">Min. Purchase for Referral</label>
                <input type="number" defaultValue={1000} className="input-luxury" />
              </div>
              <div>
                <label className="block text-sm text-cream/60 mb-2">Reward Validity (days)</label>
                <input type="number" defaultValue={90} className="input-luxury" />
              </div>
            </div>
            <button className="btn-gold text-sm mt-5 px-8">Save Settings</button>
          </div>
        </div>
      )}

      {/* Reviews */}
      {activeTab === 'reviews' && (
        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-gold-400/10">
            <h3 className="font-display text-lg text-cream font-semibold">Customer Reviews</h3>
          </div>
          <div className="space-y-4">
            {[
              { id: 1, name: 'Ananya R.', service: 'Gold Facial', rating: 5, comment: 'Absolutely amazing experience. The therapist was very professional.', date: 'Dec 15, 2024', published: true },
              { id: 2, name: 'Divya M.', service: 'Deep Tissue Massage', rating: 4, comment: 'Very relaxing, but the room was a bit too cold.', date: 'Dec 12, 2024', published: true },
              { id: 3, name: 'Pooja S.', service: 'Hair Coloring', rating: 2, comment: 'The color didn\'t match what I asked for. Not happy.', date: 'Dec 10, 2024', published: false },
            ].map((review) => (
              <div key={review.id} className="p-4 bg-dark-800/50 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-cream text-sm">{review.name} <span className="text-cream/50 font-normal ml-2">({review.service})</span></p>
                    <div className="flex text-gold-400 text-xs mt-1">
                      {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    </div>
                  </div>
                  <span className={review.published ? 'badge-confirmed' : 'badge-pending'}>{review.published ? 'Published' : 'Pending Review'}</span>
                </div>
                <p className="text-sm text-cream/70 mb-3">"{review.comment}"</p>
                <div className="flex gap-3 text-xs">
                  <button className="text-gold-400 hover:underline">Reply</button>
                  <button className="text-gold-400 hover:underline">{review.published ? 'Hide' : 'Publish'}</button>
                  <button className="text-red-400 hover:underline">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Campaign Modal */}
      {showCampaignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/80">
          <div className="glass-card w-full max-w-lg p-8">
            <h2 className="font-display text-xl text-cream font-bold mb-6">Create Campaign</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-cream/60 mb-2">Campaign Name</label>
                <input type="text" placeholder="e.g. New Year Special Offer" className="input-luxury" />
              </div>
              <div>
                <label className="block text-sm text-cream/60 mb-2">Type</label>
                <select className="input-luxury">
                  <option>Email</option><option>SMS</option><option>Push Notification</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-cream/60 mb-2">Target Audience</label>
                <select className="input-luxury">
                  <option>All Customers</option><option>Platinum Members</option>
                  <option>Gold Members</option><option>Inactive Customers</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-cream/60 mb-2">Subject / Title</label>
                <input type="text" placeholder="Email subject line or push title" className="input-luxury" />
              </div>
              <div>
                <label className="block text-sm text-cream/60 mb-2">Message</label>
                <textarea rows={4} placeholder="Campaign message..." className="input-luxury resize-none" />
              </div>
              <div>
                <label className="block text-sm text-cream/60 mb-2">Schedule Date</label>
                <input type="datetime-local" className="input-luxury" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowCampaignModal(false)} className="btn-outline-gold text-sm flex-1 py-3">Cancel</button>
              <button onClick={() => setShowCampaignModal(false)} className="btn-gold text-sm flex-1 py-3 flex items-center justify-center gap-2">
                <Send size={15} /> Schedule Campaign
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Coupon Modal */}
      {showCouponModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/80">
          <div className="glass-card w-full max-w-lg p-8">
            <h2 className="font-display text-xl text-cream font-bold mb-6">Create Coupon</h2>
            <form onSubmit={handleCouponSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-cream/60 mb-2">Coupon Code</label>
                <input type="text" required placeholder="e.g. SUMMER25" value={couponForm.code} onChange={e => setCouponForm({...couponForm, code: e.target.value.toUpperCase()})} className="input-luxury uppercase" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-cream/60 mb-2">Discount Type</label>
                  <select required value={couponForm.discountType} onChange={e => setCouponForm({...couponForm, discountType: e.target.value})} className="input-luxury">
                    <option value="Percentage">Percentage</option>
                    <option value="Fixed">Fixed Amount</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-cream/60 mb-2">Discount Value</label>
                  <input type="number" required placeholder="e.g. 25" value={couponForm.discountValue} onChange={e => setCouponForm({...couponForm, discountValue: e.target.value})} className="input-luxury" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-cream/60 mb-2">Max Uses (Optional)</label>
                  <input type="number" placeholder="e.g. 100" value={couponForm.maxUses} onChange={e => setCouponForm({...couponForm, maxUses: e.target.value})} className="input-luxury" />
                </div>
                <div>
                  <label className="block text-sm text-cream/60 mb-2">Expires At (Optional)</label>
                  <input type="date" value={couponForm.expiresAt} onChange={e => setCouponForm({...couponForm, expiresAt: e.target.value})} className="input-luxury" />
                </div>
              </div>
              <div className="flex gap-3 mt-6 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setShowCouponModal(false)} className="btn-outline-gold text-sm flex-1 py-3">Cancel</button>
                <button type="submit" className="btn-gold text-sm flex-1 py-3 flex items-center justify-center gap-2">
                  <Plus size={15} /> Create Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
