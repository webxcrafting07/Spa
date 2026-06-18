'use client'
import { useState, useEffect } from 'react'
import { Plus, Search, Edit, Star, Calendar, DollarSign, Phone, RefreshCcw, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminStaffPage() {
  const [staff, setStaff] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [view, setView] = useState<'grid' | 'table'>('grid')
  const [submitting, setSubmitting] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', role: 'THERAPIST', password: '', experience: '', salary: '', bio: '', isActive: true })

  const fetchStaff = () => {
    setLoading(true)
    fetch('/api/admin/staff')
      .then(res => res.json())
      .then(data => {
        setStaff(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    fetchStaff()
  }, [])

  const handleEdit = (s: any) => {
    setEditId(s.id)
    setForm({
      name: s.name, email: s.email, phone: s.phone, role: s.role, password: '',
      experience: String(s.experience || 0), salary: String(s.salary || 0), bio: s.bio || '', isActive: s.isActive
    })
    setShowModal(true)
  }

  const handleAdd = () => {
    setEditId(null)
    setForm({ name: '', email: '', phone: '', role: 'THERAPIST', password: '', experience: '', salary: '', bio: '', isActive: true })
    setShowModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const url = '/api/admin/staff'
      const method = editId ? 'PATCH' : 'POST'
      const body = editId ? { id: editId, ...form } : form

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')

      toast.success(editId ? 'Staff updated successfully!' : 'Staff created successfully!')
      setShowModal(false)
      fetchStaff()
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setSubmitting(false)
    }
  }



  const filtered = staff.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.role.toLowerCase().includes(search.toLowerCase())
  )

  const activeStaff = staff.filter(s => s.isActive).length
  const avgRating = staff.length ? (staff.reduce((a, s) => a + s.rating, 0) / staff.length).toFixed(1) : '0.0'
  const totalRevenue = staff.reduce((a, s) => a + s.totalRevenue, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-cream font-bold">Staff Management</h1>
          <p className="text-cream/50 mt-1 text-sm">{staff.length} team members</p>
        </div>
        <button onClick={handleAdd} className="btn-gold text-xs py-2.5 px-5 flex items-center gap-2">
          <Plus size={15} /> Add Staff
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Staff', value: activeStaff, color: 'text-green-400' },
          { label: 'On Leave/Inactive', value: staff.length - activeStaff, color: 'text-yellow-400' },
          { label: 'Avg Rating', value: avgRating + '★', color: 'text-gold-400' },
          { label: 'Total Revenue', value: '₹' + (totalRevenue / 1000).toFixed(1) + 'k', color: 'text-blue-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="glass-card p-4 text-center">
            <p className={`font-display text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-cream/50 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Search & Toggle */}
      <div className="glass-card p-4 flex gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search staff..." className="input-luxury pl-9" />
        </div>
        <div className="flex gap-1 bg-dark-800 rounded-lg p-1">
          {(['grid', 'table'] as const).map(v => (
            <button key={v} onClick={() => setView(v)}
              className={`px-3 py-1.5 rounded text-xs transition-all capitalize ${view === v ? 'bg-gold-400/20 text-gold-400' : 'text-cream/50 hover:text-cream'}`}>
              {v}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-cream/50">
          <RefreshCcw className="animate-spin mx-auto mb-4" /> Loading staff directory...
        </div>
      ) : (
        <>
          {/* Grid view */}
          {view === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(s => (
                <div key={s.id} className="glass-card p-6 hover:border-gold-400/30 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center font-bold text-dark text-lg">
                        {s.avatar}
                      </div>
                      <div>
                        <h3 className="font-semibold text-cream">{s.name}</h3>
                        <p className="text-xs text-gold-400">{s.role.replace('_', ' ')}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      s.isActive ? 'badge-confirmed' : 'badge-pending'
                    }`}>{s.isActive ? 'ACTIVE' : 'INACTIVE'}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      { icon: Star, val: s.rating.toFixed(1) + '★', label: 'Rating' },
                      { icon: Calendar, val: s.totalAppointments, label: 'Apts' },
                      { icon: DollarSign, val: '₹' + (s.totalRevenue / 1000).toFixed(0) + 'k', label: 'Revenue' },
                    ].map(({ icon: Icon, val, label }) => (
                      <div key={label} className="text-center bg-dark-800/50 rounded-lg p-2">
                        <p className="text-gold-400 font-semibold text-sm">{val}</p>
                        <p className="text-cream/40 text-xs">{label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {s.specialties.map((sp: string) => (
                      <span key={sp} className="text-xs bg-dark-700 text-cream/60 px-2 py-0.5 rounded-full">{sp}</span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-cream/50 mb-4">
                    <Phone size={11} className="text-gold-400" /> {s.phone}
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(s)} className="flex-1 text-xs py-2 rounded-lg border border-gold-400/30 text-gold-400 hover:bg-gold-400/10 transition-all flex items-center justify-center gap-1">
                      <Edit size={12} /> Edit
                    </button>
                    <button className="flex-1 text-xs py-2 rounded-lg border border-dark-600 text-cream/60 hover:text-cream hover:border-gold-400/20 transition-all">
                      Schedule
                    </button>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="col-span-3 text-center py-10 text-cream/40">No staff found</div>
              )}
            </div>
          )}

          {/* Table view */}
          {view === 'table' && (
            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full table-luxury">
                  <thead>
                    <tr>
                      <th>Staff Member</th><th>Role</th><th>Experience</th>
                      <th>Rating</th><th>Appointments</th><th>Revenue</th>
                      <th>Salary</th><th>Status</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(s => (
                      <tr key={s.id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gold-gradient flex items-center justify-center font-bold text-dark text-sm shrink-0">
                              {s.avatar}
                            </div>
                            <div>
                              <p className="font-medium text-cream">{s.name}</p>
                              <p className="text-xs text-cream/40">{s.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="text-cream/70">{s.role.replace('_', ' ')}</td>
                        <td className="text-cream/70">{s.experience} yrs</td>
                        <td className="text-yellow-400 font-semibold">⭐ {s.rating.toFixed(1)}</td>
                        <td className="text-cream/70">{s.totalAppointments}</td>
                        <td className="text-gold-400 font-semibold">₹{s.totalRevenue.toLocaleString('en-IN')}</td>
                        <td className="text-cream/70">₹{s.salary.toLocaleString('en-IN')}/mo</td>
                        <td>
                          <span className={s.isActive ? 'badge-confirmed' : 'badge-pending'}>
                            {s.isActive ? 'ACTIVE' : 'INACTIVE'}
                          </span>
                        </td>
                        <td>
                          <button onClick={() => handleEdit(s)} className="text-cream/50 hover:text-gold-400 transition-colors">
                            <Edit size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={9} className="text-center py-10 text-cream/40">No staff found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* Add/Edit Staff Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/80">
          <div className="glass-card w-full max-w-lg p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="font-display text-xl text-cream font-bold mb-6">{editId ? 'Edit Staff Member' : 'Add New Staff Member'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Staff member name' },
                { label: 'Email', key: 'email', type: 'email', placeholder: 'staff@auraspa.in', disabled: !!editId },
                { label: 'Phone', key: 'phone', type: 'tel', placeholder: '+91 98765 00000' },
                { label: 'Experience (years)', key: 'experience', type: 'number', placeholder: '5' },
                { label: 'Monthly Salary (₹)', key: 'salary', type: 'number', placeholder: '40000' },
              ].map(({ label, key, type, placeholder, disabled }) => (
                <div key={key}>
                  <label className="block text-sm text-cream/60 mb-2">{label}</label>
                  <input type={type} placeholder={placeholder} required={!disabled} disabled={disabled}
                    value={(form as any)[key]} onChange={e => setForm({...form, [key]: e.target.value})}
                    className="input-luxury disabled:opacity-50" />
                </div>
              ))}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-cream/60 mb-2">Role</label>
                  <select value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="input-luxury bg-dark-800">
                    <option value="THERAPIST">Therapist</option>
                    <option value="RECEPTIONIST">Receptionist</option>
                    <option value="STAFF">General Staff</option>
                  </select>
                </div>
                {editId && (
                  <div>
                    <label className="block text-sm text-cream/60 mb-2">Status</label>
                    <select value={form.isActive ? 'ACTIVE' : 'INACTIVE'} onChange={e => setForm({...form, isActive: e.target.value === 'ACTIVE'})} className="input-luxury bg-dark-800">
                      <option value="ACTIVE">Active</option>
                      <option value="INACTIVE">Inactive</option>
                    </select>
                  </div>
                )}
              </div>

              {!editId && (
                <div>
                  <label className="block text-sm text-cream/60 mb-2">Temporary Password</label>
                  <input type="text" placeholder="Set initial password" required
                    value={form.password} onChange={e => setForm({...form, password: e.target.value})}
                    className="input-luxury" />
                  <p className="text-xs text-cream/40 mt-1">Staff will use this password to log in.</p>
                </div>
              )}

              <div>
                <label className="block text-sm text-cream/60 mb-2">Bio</label>
                <textarea rows={3} placeholder="Brief professional bio..."
                  value={form.bio} onChange={e => setForm({...form, bio: e.target.value})}
                  className="input-luxury resize-none" />
              </div>
              <div className="flex gap-3 mt-6 pt-4 border-t border-dark-700">
                <button type="button" onClick={() => setShowModal(false)} className="btn-outline-gold text-sm flex-1 py-3">Cancel</button>
                <button type="submit" disabled={submitting} className="btn-gold text-sm flex-1 py-3 flex items-center justify-center gap-2">
                  {submitting ? <Loader2 size={16} className="animate-spin" /> : (editId ? 'Update Staff' : 'Add Staff Member')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
