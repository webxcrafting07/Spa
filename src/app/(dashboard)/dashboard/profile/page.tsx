'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Save, Camera, Crown } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const { data: session } = useSession()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    phone: '+91 98765 43210',
    dob: '1990-05-15',
    gender: 'Female',
    address: 'Mumbai, Maharashtra',
    skinType: 'Combination',
    hairType: 'Wavy',
    allergies: 'None',
    preferences: 'Prefer female therapists, no strong fragrances',
  })

  const handleSave = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 1000))
    toast.success('Profile updated successfully!')
    setSaving(false)
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display text-3xl text-cream font-bold">My Profile</h1>
        <p className="text-cream/50 mt-1">Manage your personal information and preferences</p>
      </div>

      {/* Avatar */}
      <div className="glass-card p-6 flex items-center gap-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gold-gradient flex items-center justify-center text-dark font-bold text-3xl">
            {session?.user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gold-400 flex items-center justify-center border-2 border-dark-900 hover:bg-gold-300 transition-colors">
            <Camera size={13} className="text-dark" />
          </button>
        </div>
        <div>
          <h2 className="font-display text-xl text-cream font-semibold">{session?.user?.name}</h2>
          <p className="text-cream/50 text-sm">{session?.user?.email}</p>
          <div className="flex items-center gap-2 mt-2">
            <Crown size={14} className="text-gold-400" />
            <span className="text-gold-400 text-sm font-medium">Gold Member</span>
            <span className="text-cream/40 text-xs">· 1,240 reward points</span>
          </div>
        </div>
      </div>

      {/* Personal info */}
      <div className="glass-card p-6">
        <h3 className="font-display text-lg text-cream font-semibold mb-5 pb-3 border-b border-gold-400/10">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { label: 'Full Name', key: 'name', type: 'text' },
            { label: 'Email Address', key: 'email', type: 'email' },
            { label: 'Phone Number', key: 'phone', type: 'tel' },
            { label: 'Date of Birth', key: 'dob', type: 'date' },
          ].map(({ label, key, type }) => (
            <div key={key}>
              <label className="block text-sm text-cream/60 mb-2">{label}</label>
              <input type={type} value={(form as any)[key]}
                onChange={e => setForm({ ...form, [key]: e.target.value })}
                className="input-luxury" />
            </div>
          ))}
          <div>
            <label className="block text-sm text-cream/60 mb-2">Gender</label>
            <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}
              className="input-luxury">
              <option>Female</option><option>Male</option><option>Non-binary</option><option>Prefer not to say</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-cream/60 mb-2">City / Location</label>
            <input type="text" value={form.address}
              onChange={e => setForm({ ...form, address: e.target.value })}
              className="input-luxury" />
          </div>
        </div>
      </div>

      {/* Wellness profile */}
      <div className="glass-card p-6">
        <h3 className="font-display text-lg text-cream font-semibold mb-5 pb-3 border-b border-gold-400/10">
          Wellness Profile
        </h3>
        <p className="text-cream/50 text-sm mb-5">Help our therapists personalise your experience</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm text-cream/60 mb-2">Skin Type</label>
            <select value={form.skinType} onChange={e => setForm({ ...form, skinType: e.target.value })}
              className="input-luxury">
              {['Normal', 'Oily', 'Dry', 'Combination', 'Sensitive'].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-cream/60 mb-2">Hair Type</label>
            <select value={form.hairType} onChange={e => setForm({ ...form, hairType: e.target.value })}
              className="input-luxury">
              {['Straight', 'Wavy', 'Curly', 'Coily', 'Fine', 'Thick'].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-cream/60 mb-2">Known Allergies</label>
            <input type="text" value={form.allergies}
              onChange={e => setForm({ ...form, allergies: e.target.value })}
              placeholder="e.g. Nuts, Latex, Fragrance..." className="input-luxury" />
          </div>
          <div>
            <label className="block text-sm text-cream/60 mb-2">Special Preferences</label>
            <input type="text" value={form.preferences}
              onChange={e => setForm({ ...form, preferences: e.target.value })}
              placeholder="e.g. No strong fragrances..." className="input-luxury" />
          </div>
        </div>
      </div>

      {/* Change password */}
      <div className="glass-card p-6">
        <h3 className="font-display text-lg text-cream font-semibold mb-5 pb-3 border-b border-gold-400/10">
          Change Password
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {['Current Password', 'New Password', 'Confirm Password'].map(l => (
            <div key={l}>
              <label className="block text-sm text-cream/60 mb-2">{l}</label>
              <input type="password" placeholder="••••••••" className="input-luxury" />
            </div>
          ))}
        </div>
        <button className="btn-outline-gold text-sm mt-4 px-6">Update Password</button>
      </div>

      <button onClick={handleSave} disabled={saving}
        className="btn-gold px-8 py-3 flex items-center gap-2 text-sm">
        <Save size={15} /> {saving ? 'Saving...' : 'Save Profile'}
      </button>
    </div>
  )
}
