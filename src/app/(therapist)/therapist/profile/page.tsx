'use client'
import { useState } from 'react'
import { Save, User, Lock, Upload } from 'lucide-react'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'

export default function TherapistProfilePage() {
  const { data: session } = useSession()
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('details')

  const handleSave = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 800))
    toast.success('Profile updated successfully!')
    setSaving(false)
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-cream font-bold">My Profile</h1>
        <p className="text-cream/50 mt-1 text-sm">Manage your personal information and security.</p>
      </div>

      <div className="flex gap-2 border-b border-white/5 pb-4">
        <button onClick={() => setActiveTab('details')} className={`px-4 py-2 text-sm font-medium transition-all ${activeTab === 'details' ? 'text-gold-400 border-b-2 border-gold-400' : 'text-cream/60 hover:text-cream'}`}>
          Personal Details
        </button>
        <button onClick={() => setActiveTab('security')} className={`px-4 py-2 text-sm font-medium transition-all ${activeTab === 'security' ? 'text-gold-400 border-b-2 border-gold-400' : 'text-cream/60 hover:text-cream'}`}>
          Password & Security
        </button>
      </div>

      {activeTab === 'details' && (
        <div className="glass-card p-6 border border-white/5 space-y-6">
          <div className="flex items-center gap-6 pb-6 border-b border-white/5">
            <div className="w-24 h-24 rounded-full bg-dark-600 border-2 border-gold-400/30 flex items-center justify-center relative group overflow-hidden">
              <span className="text-3xl text-gold-400 font-display">{session?.user?.name?.[0]}</span>
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Upload size={20} className="text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-cream">Profile Photo</h3>
              <p className="text-sm text-cream/50 mb-3">JPG, PNG or WebP. Max size of 5MB.</p>
              <button className="btn-gold px-4 py-1.5 text-xs">Upload New</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-cream/60 mb-2">Full Name</label>
              <input type="text" defaultValue={session?.user?.name || ''} className="input-luxury" />
            </div>
            <div>
              <label className="block text-sm text-cream/60 mb-2">Email Address</label>
              <input type="email" defaultValue={session?.user?.email || ''} className="input-luxury opacity-50" readOnly />
            </div>
            <div>
              <label className="block text-sm text-cream/60 mb-2">Phone Number</label>
              <input type="tel" defaultValue="+91 98765 43210" className="input-luxury" />
            </div>
            <div>
              <label className="block text-sm text-cream/60 mb-2">Years of Experience</label>
              <input type="number" defaultValue="5" className="input-luxury" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-cream/60 mb-2">Bio / Description (Shown to customers)</label>
              <textarea rows={3} defaultValue="Expert massage therapist with 5 years of experience specializing in deep tissue and Swedish massage..." className="input-luxury resize-none"></textarea>
            </div>
          </div>
          <button onClick={handleSave} disabled={saving} className="btn-gold px-8 py-3 flex items-center gap-2 text-sm mt-4">
            <Save size={16} /> {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="glass-card p-6 border border-white/5 space-y-6 max-w-xl">
          <div>
            <h3 className="text-lg font-semibold text-cream mb-4">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-cream/60 mb-2">Current Password</label>
                <input type="password" placeholder="••••••••" className="input-luxury" />
              </div>
              <div>
                <label className="block text-sm text-cream/60 mb-2">New Password</label>
                <input type="password" placeholder="••••••••" className="input-luxury" />
              </div>
              <div>
                <label className="block text-sm text-cream/60 mb-2">Confirm New Password</label>
                <input type="password" placeholder="••••••••" className="input-luxury" />
              </div>
            </div>
          </div>
          <button onClick={handleSave} disabled={saving} className="btn-gold px-8 py-3 flex items-center gap-2 text-sm">
            <Lock size={16} /> {saving ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      )}
    </div>
  )
}
