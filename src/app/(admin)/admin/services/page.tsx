'use client'
import { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, Eye, EyeOff, Star, RefreshCcw, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminServicesPage() {
  const [search, setSearch] = useState('')
  const [services, setServices] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editService, setEditService] = useState<any>(null)
  const [form, setForm] = useState({ name: '', description: '', categoryId: '', duration: '', price: '', active: true, featured: false })

  const fetchServices = () => {
    Promise.all([
      fetch('/api/admin/services').then(res => res.json()),
      fetch('/api/categories').then(res => res.json())
    ]).then(([servicesData, categoriesData]) => {
      setServices(Array.isArray(servicesData) ? servicesData : [])
      setCategories(Array.isArray(categoriesData) ? categoriesData : [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }

  useEffect(() => {
    fetchServices()
  }, [])


  const filtered = services.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  )

  const toggleActive = async (id: string, currentActive: boolean) => {
    const loadingToast = toast.loading('Updating status...')
    try {
      const res = await fetch('/api/admin/services', {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, active: !currentActive })
      })
      if (!res.ok) throw new Error('Failed to update status')
      toast.success('Status updated', { id: loadingToast })
      fetchServices()
    } catch (err: any) {
      toast.error(err.message, { id: loadingToast })
    }
  }

  const openEdit = (service: any) => {
    setEditService(service)
    setForm({
      name: service.name, description: service.description || '',
      categoryId: service.categoryId, duration: String(service.duration),
      price: String(service.price), active: service.active, featured: service.featured,
    })
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return
    const loadingToast = toast.loading('Deleting...')
    try {
      const res = await fetch(`/api/admin/services?id=${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      toast.success('Deleted successfully', { id: loadingToast })
      fetchServices()
    } catch (err: any) {
      toast.error(err.message, { id: loadingToast })
    }
  }

  const openAdd = () => {
    setEditService(null)
    setForm({ name: '', description: '', categoryId: categories[0]?.id || '', duration: '', price: '', active: true, featured: false })
    setShowModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const url = '/api/admin/services'
      const method = editService ? 'PATCH' : 'POST'
      const body = editService ? { id: editService.id, ...form } : form

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')

      toast.success(editService ? 'Service updated successfully!' : 'Service created successfully!')
      setShowModal(false)
      fetchServices()
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-cream font-bold">Services</h1>
          <p className="text-cream/50 mt-1 text-sm">{services.length} services across {categories.length} categories</p>
        </div>
        <button onClick={openAdd} className="btn-gold text-xs py-2.5 px-5 flex items-center gap-2">
          <Plus size={15} /> Add Service
        </button>
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map(cat => (
          <div key={cat.id} className="glass-card p-4 text-center">
            <span className="text-3xl">{cat.icon || '✨'}</span>
            <p className="font-medium text-cream mt-2 text-sm">{cat.name}</p>
            <p className="text-cream/50 text-xs mt-1">{cat.services?.length || 0} services</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="glass-card p-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search services..." className="input-luxury pl-9" />
        </div>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-20 text-center text-cream/50">
              <RefreshCcw className="animate-spin mx-auto mb-4" /> Loading services catalog...
            </div>
          ) : (
            <table className="w-full table-luxury">
              <thead>
                <tr>
                  <th>Service</th><th>Category</th><th>Duration</th>
                  <th>Price</th><th>Bookings</th><th>Rating</th>
                  <th>Featured</th><th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(s => (
                  <tr key={s.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{s.icon}</span>
                        <div>
                          <p className="font-medium text-cream">{s.name}</p>
                          <p className="text-xs text-cream/40 truncate max-w-[140px]">{s.description}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-xs bg-gold-400/10 border border-gold-400/20 text-gold-400 px-2 py-1 rounded-full">{s.category}</span>
                    </td>
                    <td className="text-cream/70">{s.duration} min</td>
                    <td className="text-gold-400 font-semibold">₹{s.price.toLocaleString('en-IN')}</td>
                    <td className="text-cream/70">{s.bookings}</td>
                    <td className="text-yellow-400 flex items-center gap-1 text-sm">
                      <Star size={12} className="fill-yellow-400" />{s.rating.toFixed(1)}
                    </td>
                    <td>
                      <button onClick={async () => {
                        const loadingToast = toast.loading('Updating featured status...')
                        try {
                          await fetch('/api/admin/services', { method: 'PATCH', body: JSON.stringify({ id: s.id, featured: !s.featured }) })
                          fetchServices()
                          toast.success('Featured status updated', { id: loadingToast })
                        } catch {
                          toast.error('Failed to update', { id: loadingToast })
                        }
                      }}
                        className={`text-xs px-2 py-1 rounded-full transition-all ${s.featured ? 'bg-gold-400/20 text-gold-400' : 'bg-dark-700 text-cream/40 hover:text-cream/70'}`}>
                        {s.featured ? '⭐ Yes' : 'No'}
                      </button>
                    </td>
                    <td>
                      <button onClick={() => toggleActive(s.id, s.active)}
                        className={`text-xs px-3 py-1 rounded-full transition-all ${s.active ? 'badge-confirmed' : 'bg-dark-700 text-cream/40'}`}>
                        {s.active ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(s)} className="text-cream/50 hover:text-gold-400 transition-colors">
                          <Edit size={14} />
                        </button>
                        <button onClick={() => toggleActive(s.id, s.active)} className="text-cream/50 hover:text-blue-400 transition-colors">
                          {s.active ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                        <button onClick={() => handleDelete(s.id)} className="text-cream/50 hover:text-red-400 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={9} className="text-center py-10 text-cream/40">No services found</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/80">
          <div className="glass-card w-full max-w-lg p-8">
            <h2 className="font-display text-xl text-cream font-bold mb-6">
              {editService ? 'Edit Service' : 'Add New Service'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: 'Service Name', key: 'name', type: 'text', placeholder: 'e.g. Luxury Deep Tissue Massage' },
                { label: 'Duration (minutes)', key: 'duration', type: 'number', placeholder: '60' },
                { label: 'Price (₹)', key: 'price', type: 'number', placeholder: '2500' },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm text-cream/60 mb-2">{label}</label>
                  <input type={type} placeholder={placeholder} required
                    value={(form as any)[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    className="input-luxury" />
                </div>
              ))}
              
              <div>
                <label className="block text-sm text-cream/60 mb-2">Category</label>
                <select required value={form.categoryId} onChange={e => setForm({ ...form, categoryId: e.target.value })} className="input-luxury bg-dark-800">
                  <option value="" disabled>Select a category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-cream/60 mb-2">Description</label>
                <textarea rows={3} placeholder="Service description..."
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  className="input-luxury resize-none" />
              </div>
              <div className="flex gap-6">
                {[
                  { label: 'Active', key: 'active' },
                  { label: 'Featured', key: 'featured' },
                ].map(({ label, key }) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={(form as any)[key]}
                      onChange={e => setForm({ ...form, [key]: e.target.checked })}
                      className="accent-gold-400" />
                    <span className="text-sm text-cream/70">{label}</span>
                  </label>
                ))}
              </div>
            </form>
            <div className="flex gap-3 mt-6 pt-4 border-t border-dark-700">
              <button onClick={() => setShowModal(false)} type="button" className="btn-outline-gold text-sm flex-1 py-3">Cancel</button>
              <button onClick={handleSubmit} disabled={submitting} type="submit" className="btn-gold text-sm flex-1 py-3 flex items-center justify-center gap-2">
                {submitting ? <Loader2 size={16} className="animate-spin" /> : (editService ? 'Update Service' : 'Add Service')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
