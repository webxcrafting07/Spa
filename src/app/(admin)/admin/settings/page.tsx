'use client'
import { useState, useEffect } from 'react'
import { Save, Globe, Bell, Shield, CreditCard, Mail } from 'lucide-react'
import toast from 'react-hot-toast'

const tabs = [
  { key: 'general', label: 'General', icon: Globe },
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'payment', label: 'Payment', icon: CreditCard },
  { key: 'email', label: 'Email', icon: Mail },
  { key: 'security', label: 'Security', icon: Shield },
]

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => {
        setSettings(data)
        setLoading(false)
      })
  }, [])

  const handleSettingChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    const loadingToast = toast.loading('Saving settings...')
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })
      if (res.ok) toast.success('Settings saved successfully!', { id: loadingToast })
      else toast.error('Failed to save', { id: loadingToast })
    } catch {
      toast.error('Error saving settings', { id: loadingToast })
    }
    setSaving(false)
  }

  if (loading) return <div className="py-20 text-center text-cream/50">Loading settings...</div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-cream font-bold">Settings</h1>
        <p className="text-cream/50 mt-1 text-sm">Manage your spa & salon configuration</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar tabs */}
        <div className="lg:w-52 shrink-0">
          <div className="glass-card p-2 space-y-1">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button key={key} onClick={() => setActiveTab(key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === key
                    ? 'bg-gold-400/15 text-gold-400 border-l-2 border-gold-400'
                    : 'text-cream/60 hover:text-cream hover:bg-white/5'
                }`}>
                <Icon size={16} /> {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 glass-card p-8">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="font-display text-xl text-cream font-semibold border-b border-gold-400/10 pb-4">General Settings</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { label: 'Business Name', key: 'businessName', placeholder: 'Business name' },
                  { label: 'Tagline', key: 'tagline', placeholder: 'Business tagline' },
                  { label: 'Phone Number', key: 'phone', placeholder: '+91 XXXXX XXXXX' },
                  { label: 'Email', key: 'email', placeholder: 'contact@email.com' },
                  { label: 'GST Number', key: 'gst', placeholder: 'GST registration number' },
                  { label: 'Currency', key: 'currency', placeholder: 'INR' },
                ].map(({ label, key, placeholder }) => (
                  <div key={label}>
                    <label className="block text-sm text-cream/60 mb-2">{label}</label>
                    <input type="text" value={settings[key] || ''} onChange={(e) => handleSettingChange(key, e.target.value)} placeholder={placeholder} className="input-luxury" />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="block text-sm text-cream/60 mb-2">Address</label>
                  <textarea rows={2} value={settings['address'] || ''} onChange={(e) => handleSettingChange('address', e.target.value)}
                    className="input-luxury resize-none" />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-cream mb-3">Working Hours</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { day: 'Monday – Saturday', open: '09:00', close: '21:00' },
                    { day: 'Sunday', open: '10:00', close: '19:00' },
                  ].map(h => (
                    <div key={h.day} className="flex items-center gap-3 glass-card p-3">
                      <span className="text-sm text-cream/70 w-40">{h.day}</span>
                      <input type="time" defaultValue={h.open} className="input-luxury w-28 py-1.5 px-2 text-sm" />
                      <span className="text-cream/40">–</span>
                      <input type="time" defaultValue={h.close} className="input-luxury w-28 py-1.5 px-2 text-sm" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="font-display text-xl text-cream font-semibold border-b border-gold-400/10 pb-4">Notification Settings</h2>
              <div className="space-y-4">
                {[
                  { label: 'New Booking Notification', desc: 'Get notified when a new appointment is booked', on: true },
                  { label: 'Booking Cancellation', desc: 'Alert when a customer cancels an appointment', on: true },
                  { label: 'Payment Received', desc: 'Notify when payment is processed successfully', on: true },
                  { label: 'Low Inventory Alert', desc: 'Alert when product stock falls below minimum', on: true },
                  { label: 'New Review Posted', desc: 'Get notified when a customer posts a review', on: false },
                  { label: 'Staff Attendance', desc: 'Daily staff check-in/out notifications', on: false },
                ].map(({ label, desc, on }, i) => (
                  <div key={label} className="flex items-start justify-between gap-4 p-4 bg-dark-800/50 rounded-xl">
                    <div>
                      <p className="font-medium text-cream text-sm">{label}</p>
                      <p className="text-xs text-cream/50 mt-0.5">{desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input type="checkbox" defaultChecked={on} className="sr-only peer" />
                      <div className="w-11 h-6 bg-dark-600 rounded-full peer peer-checked:bg-gold-400 transition-all after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:after:translate-x-5" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="space-y-6">
              <h2 className="font-display text-xl text-cream font-semibold border-b border-gold-400/10 pb-4">Payment Settings</h2>
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-semibold text-gold-400 mb-3 flex items-center gap-2">💳 Razorpay Configuration</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-cream/60 mb-2">Key ID</label>
                      <input type="text" value={settings['rzp_key'] || ''} onChange={e => handleSettingChange('rzp_key', e.target.value)} placeholder="rzp_live_XXXXXXXXXXXX" className="input-luxury font-mono text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm text-cream/60 mb-2">Key Secret</label>
                      <input type="password" value={settings['rzp_secret'] || ''} onChange={e => handleSettingChange('rzp_secret', e.target.value)} placeholder="xxxxxxxxxxxxxxxxxxxx" className="input-luxury" />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gold-400 mb-3 flex items-center gap-2">🌐 Stripe Configuration</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-cream/60 mb-2">Publishable Key</label>
                      <input type="text" value={settings['stripe_pub'] || ''} onChange={e => handleSettingChange('stripe_pub', e.target.value)} placeholder="pk_live_XXXXXXXXXXXX" className="input-luxury font-mono text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm text-cream/60 mb-2">Secret Key</label>
                      <input type="password" value={settings['stripe_secret'] || ''} onChange={e => handleSettingChange('stripe_secret', e.target.value)} placeholder="sk_live_XXXXXXXXXXXX" className="input-luxury" />
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <h3 className="text-sm font-semibold text-gold-400 mb-3 flex items-center gap-2">☁️ Cloudinary Configuration</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-cream/60 mb-2">Cloud Name</label>
                      <input type="text" value={settings['cloudinary_name'] || ''} onChange={e => handleSettingChange('cloudinary_name', e.target.value)} placeholder="dzqxxxxx" className="input-luxury" />
                    </div>
                    <div>
                      <label className="block text-sm text-cream/60 mb-2">API Key</label>
                      <input type="text" value={settings['cloudinary_key'] || ''} onChange={e => handleSettingChange('cloudinary_key', e.target.value)} placeholder="123456789" className="input-luxury" />
                    </div>
                    <div>
                      <label className="block text-sm text-cream/60 mb-2">API Secret</label>
                      <input type="password" value={settings['cloudinary_secret'] || ''} onChange={e => handleSettingChange('cloudinary_secret', e.target.value)} placeholder="xxxxxxx" className="input-luxury" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-cream/60 mb-2">GST Rate (%)</label>
                  <input type="number" defaultValue={18} className="input-luxury w-40" />
                </div>
                <div className="flex items-center justify-between p-4 bg-dark-800/50 rounded-xl">
                  <div>
                    <p className="font-medium text-cream text-sm">Test Mode</p>
                    <p className="text-xs text-cream/50">Use sandbox/test keys for development</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-dark-600 rounded-full peer peer-checked:bg-gold-400 transition-all after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:after:translate-x-5" />
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'email' && (
            <div className="space-y-6">
              <h2 className="font-display text-xl text-cream font-semibold border-b border-gold-400/10 pb-4">Email Settings</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { label: 'Resend API Key', value: 're_XXXXXXXXXXXXXXXX', type: 'password' },
                  { label: 'From Email', value: 'bookings@auraspa.in', type: 'email' },
                  { label: 'From Name', value: 'Aura Luxury Spa', type: 'text' },
                  { label: 'Reply-To Email', value: 'hello@auraspa.in', type: 'email' },
                ].map(({ label, value, type }) => (
                  <div key={label}>
                    <label className="block text-sm text-cream/60 mb-2">{label}</label>
                    <input type={type} defaultValue={value} className="input-luxury" />
                  </div>
                ))}
              </div>
              <div>
                <h3 className="text-sm font-medium text-cream mb-3">Email Templates</h3>
                <div className="space-y-2">
                  {['Booking Confirmation', 'Appointment Reminder', 'Cancellation Notice', 'Review Request', 'Welcome Email'].map(t => (
                    <div key={t} className="flex items-center justify-between p-3 bg-dark-800/50 rounded-xl">
                      <span className="text-sm text-cream/70">{t}</span>
                      <button className="text-xs text-gold-400 hover:underline">Edit Template</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="font-display text-xl text-cream font-semibold border-b border-gold-400/10 pb-4">Security Settings</h2>
              <div className="space-y-4">
                {[
                  { label: 'Two-Factor Authentication', desc: 'Require 2FA for all admin logins', on: false },
                  { label: 'Login Activity Alerts', desc: 'Email alert on new admin login', on: true },
                  { label: 'Session Timeout', desc: 'Auto logout after 2 hours of inactivity', on: true },
                  { label: 'IP Whitelist', desc: 'Restrict admin access to specific IPs', on: false },
                  { label: 'Audit Logging', desc: 'Track all admin actions for compliance', on: true },
                ].map(({ label, desc, on }) => (
                  <div key={label} className="flex items-start justify-between gap-4 p-4 bg-dark-800/50 rounded-xl">
                    <div>
                      <p className="font-medium text-cream text-sm">{label}</p>
                      <p className="text-xs text-cream/50 mt-0.5">{desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input type="checkbox" defaultChecked={on} className="sr-only peer" />
                      <div className="w-11 h-6 bg-dark-600 rounded-full peer peer-checked:bg-gold-400 transition-all after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:after:translate-x-5" />
                    </label>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="text-sm font-medium text-cream mb-3">Change Admin Password</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['Current Password', 'New Password', 'Confirm New Password'].map(l => (
                    <div key={l}>
                      <label className="block text-xs text-cream/60 mb-2">{l}</label>
                      <input type="password" placeholder="••••••••" className="input-luxury" />
                    </div>
                  ))}
                </div>
                <button className="btn-outline-gold text-sm mt-4 px-6">Update Password</button>
              </div>
            </div>
          )}

          <div className="pt-6 mt-6 border-t border-gold-400/10">
            <button onClick={handleSave} disabled={saving}
              className="btn-gold px-8 py-3 flex items-center gap-2 text-sm">
              <Save size={15} /> {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
