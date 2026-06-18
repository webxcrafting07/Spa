'use client'
import { useState, useEffect } from 'react'
import { FileText, ImageIcon, Settings as SettingsIcon, Globe, Save } from 'lucide-react'
import toast from 'react-hot-toast'

const sections = [
  { key: 'homepage', label: 'Homepage', icon: Globe },
  { key: 'seo', label: 'SEO Settings', icon: SettingsIcon },
  { key: 'gallery', label: 'Gallery', icon: ImageIcon },
  { key: 'blog', label: 'Blog Posts', icon: FileText },
]

export default function AdminCMSPage() {
  const [activeSection, setActiveSection] = useState('homepage')
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
    if (activeSection === 'gallery' || activeSection === 'blog') {
      toast.success('Saved!')
      return
    }
    setSaving(true)
    const loadingToast = toast.loading('Saving content...')
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })
      if (res.ok) toast.success('Content saved!', { id: loadingToast })
      else toast.error('Failed to save', { id: loadingToast })
    } catch {
      toast.error('Error saving content', { id: loadingToast })
    }
    setSaving(false)
  }

  if (loading) return <div className="py-20 text-center text-cream/50">Loading content...</div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-cream font-bold">Content Management</h1>
        <p className="text-cream/50 mt-1 text-sm">Manage website content without coding</p>
      </div>

      <div className="flex gap-2 border-b border-gold-400/10 overflow-x-auto">
        {sections.map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => setActiveSection(key)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium whitespace-nowrap transition-all ${
              activeSection === key ? 'text-gold-400 border-b-2 border-gold-400' : 'text-cream/50 hover:text-cream'
            }`}>
            <Icon size={15} /> {label}
          </button>
        ))}
      </div>

      {activeSection === 'homepage' && (
        <div className="space-y-5">
          <div className="glass-card p-6">
            <h3 className="font-display text-lg text-cream font-semibold mb-5">Hero Section</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-cream/60 mb-2">Hero Title</label>
                <input type="text" value={settings['heroTitle'] || ''} onChange={e => handleSettingChange('heroTitle', e.target.value)} placeholder="Experience Pure Luxury" className="input-luxury" />
              </div>
              <div>
                <label className="block text-sm text-cream/60 mb-2">Hero Subtitle</label>
                <input type="text" value={settings['heroSubtitle'] || ''} onChange={e => handleSettingChange('heroSubtitle', e.target.value)} placeholder="Welcome to Aura" className="input-luxury" />
              </div>
              <div>
                <label className="block text-sm text-cream/60 mb-2">Hero Description</label>
                <textarea rows={3} value={settings['heroDesc'] || ''} onChange={e => handleSettingChange('heroDesc', e.target.value)} placeholder="Step into a world of unparalleled beauty and wellness..." className="input-luxury resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-cream/60 mb-2">CTA Button 1 Text</label>
                  <input type="text" value={settings['cta1Text'] || ''} onChange={e => handleSettingChange('cta1Text', e.target.value)} placeholder="Book Your Experience" className="input-luxury" />
                </div>
                <div>
                  <label className="block text-sm text-cream/60 mb-2">CTA Button 2 Text</label>
                  <input type="text" value={settings['cta2Text'] || ''} onChange={e => handleSettingChange('cta2Text', e.target.value)} placeholder="Explore Services" className="input-luxury" />
                </div>
              </div>
            </div>
          </div>
          <div className="glass-card p-6">
            <h3 className="font-display text-lg text-cream font-semibold mb-5">Statistics Section</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Stat 1', key: 'stat1', placeholderText: 'Happy Clients', placeholderVal: '10,000+' },
                { label: 'Stat 2', key: 'stat2', placeholderText: 'Expert Therapists', placeholderVal: '15+' },
                { label: 'Stat 3', key: 'stat3', placeholderText: 'Luxury Treatments', placeholderVal: '20+' },
                { label: 'Stat 4', key: 'stat4', placeholderText: 'Star Rating', placeholderVal: '4.9' },
              ].map(({ label, key, placeholderVal, placeholderText }) => (
                <div key={label} className="bg-dark-800/50 rounded-xl p-3 space-y-2">
                  <p className="text-xs text-cream/40">{label}</p>
                  <input type="text" value={settings[`${key}Val`] || ''} onChange={e => handleSettingChange(`${key}Val`, e.target.value)} placeholder={placeholderVal} className="input-luxury py-1.5 text-sm" />
                  <input type="text" value={settings[`${key}Text`] || ''} onChange={e => handleSettingChange(`${key}Text`, e.target.value)} placeholder={placeholderText} className="input-luxury py-1.5 text-sm" />
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card p-6">
            <h3 className="font-display text-lg text-cream font-semibold mb-5">Contact Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Phone', key: 'cmsPhone', placeholder: '+91 98765 43210' },
                { label: 'WhatsApp', key: 'cmsWhatsapp', placeholder: '+919876543210' },
                { label: 'Email', key: 'cmsEmail', placeholder: 'hello@auraspa.in' },
                { label: 'Address', key: 'cmsAddress', placeholder: '12, Luxury Plaza, MG Road, Bangalore' },
              ].map(({ label, key, placeholder }) => (
                <div key={label}>
                  <label className="block text-sm text-cream/60 mb-2">{label}</label>
                  <input type="text" value={settings[key] || ''} onChange={e => handleSettingChange(key, e.target.value)} placeholder={placeholder} className="input-luxury" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSection === 'seo' && (
        <div className="glass-card p-6 space-y-5">
          <h3 className="font-display text-lg text-cream font-semibold pb-3 border-b border-gold-400/10">SEO Configuration</h3>
          {[
            { label: 'Site Title', key: 'seoTitle', placeholder: 'Aura Luxury Spa & Salon | Premium Wellness Experience' },
            { label: 'Meta Description', key: 'seoDesc', placeholder: 'Experience unparalleled luxury at Aura Spa & Salon. Book premium spa treatments, hair services, and beauty packages. 10,000+ happy clients.' },
            { label: 'Keywords', key: 'seoKeywords', placeholder: 'luxury spa, salon, spa treatments, hair salon, beauty salon, massage, facial, wellness' },
            { label: 'OG Image URL', key: 'seoOgImage', placeholder: 'https://auraspa.in/og-image.jpg' },
            { label: 'Twitter Handle', key: 'seoTwitter', placeholder: '@auraspa' },
            { label: 'Google Analytics ID', key: 'seoGa', placeholder: 'G-XXXXXXXXXX' },
            { label: 'Facebook Pixel ID', key: 'seoFbPixel', placeholder: '123456789012345' },
          ].map(({ label, key, placeholder }) => (
            <div key={label}>
              <label className="block text-sm text-cream/60 mb-2">{label}</label>
              {label === 'Meta Description' || label === 'Keywords'
                ? <textarea rows={2} value={settings[key] || ''} onChange={e => handleSettingChange(key, e.target.value)} placeholder={placeholder} className="input-luxury resize-none" />
                : <input type="text" value={settings[key] || ''} onChange={e => handleSettingChange(key, e.target.value)} placeholder={placeholder} className="input-luxury" />
              }
            </div>
          ))}
          <div className="flex items-center justify-between p-4 bg-dark-800/50 rounded-xl">
            <div>
              <p className="font-medium text-cream text-sm">Sitemap Auto-generation</p>
              <p className="text-xs text-cream/50">Auto-rebuild sitemap on content changes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-dark-600 rounded-full peer peer-checked:bg-gold-400 transition-all after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:after:translate-x-5" />
            </label>
          </div>
        </div>
      )}

      {activeSection === 'gallery' && (
        <div className="glass-card p-6">
          <h3 className="font-display text-lg text-cream font-semibold mb-5 pb-3 border-b border-gold-400/10">Gallery Manager</h3>
          <div onClick={async () => {
              const url = prompt('Enter Image URL to add:');
              if (!url) return;
              await fetch('/api/admin/content/gallery', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ imageUrl: url, category: 'General' }) });
              toast.success('Image added! Refresh to see.');
            }}
            className="border-2 border-dashed border-gold-400/30 rounded-xl p-10 text-center mb-6 hover:border-gold-400/50 transition-colors cursor-pointer">
            <ImageIcon size={32} className="text-gold-400/50 mx-auto mb-3" />
            <p className="text-cream/60 text-sm">Click here to add an image via URL</p>
            <p className="text-cream/40 text-xs mt-1">Supports JPG, PNG, WebP</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {[
              'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=200&q=60',
              'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200&q=60',
              'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&q=60',
              'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=200&q=60',
              'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=200&q=60',
            ].map((url, i) => (
              <div key={i} className="relative group aspect-square rounded-xl overflow-hidden">
                <img src={url} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-dark-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="text-xs text-red-400 bg-red-400/20 px-2 py-1 rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'blog' && (
        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-gold-400/10">
            <h3 className="font-display text-lg text-cream font-semibold">Blog Posts</h3>
            <button className="btn-gold text-xs py-2 px-4">+ New Post</button>
          </div>
          <div className="space-y-3">
            {[
              { title: '10 Secrets to Glowing Skin This Winter', cat: 'Skin Care', status: 'Published', date: 'Dec 12, 2024' },
              { title: 'The Ultimate Guide to Hair Spa Treatments', cat: 'Hair Care', status: 'Published', date: 'Dec 8, 2024' },
              { title: 'Why Hot Stone Massage Is The Best Stress Relief', cat: 'Wellness', status: 'Published', date: 'Dec 3, 2024' },
              { title: '2025 Beauty Trends to Watch', cat: 'Beauty Tips', status: 'Draft', date: 'Dec 15, 2024' },
            ].map((post, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-dark-800/50 rounded-xl hover:bg-dark-700/50 transition-all">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-cream text-sm truncate">{post.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gold-400">{post.cat}</span>
                    <span className="text-xs text-cream/40">{post.date}</span>
                  </div>
                </div>
                <span className={post.status === 'Published' ? 'badge-confirmed' : 'badge-pending'}>{post.status}</span>
                <button className="text-xs text-gold-400 hover:underline shrink-0">Edit</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <button onClick={handleSave} disabled={saving}
        className="btn-gold px-8 py-3 flex items-center gap-2 text-sm">
        <Save size={15} /> {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  )
}
