'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Star, Eye, Mail, Phone, RefreshCcw, Edit2, ShieldAlert, Trash2, X } from 'lucide-react'

const membershipColor: Record<string, string> = {
  PLATINUM: 'text-purple-400 bg-purple-400/20',
  GOLD: 'text-gold-400 bg-gold-400/20',
  SILVER: 'text-gray-300 bg-gray-300/20',
  NONE: 'text-cream/40 bg-dark-700',
}

const membershipIcon: Record<string, string> = {
  PLATINUM: '👑', GOLD: '⭐', SILVER: '🥈', NONE: '—',
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterMembership, setFilterMembership] = useState('All')
  const [editingUser, setEditingUser] = useState<any>(null)

  const fetchUsers = () => {
    setLoading(true)
    fetch('/api/admin/users?role=CUSTOMER&limit=500')
      .then(res => res.json())
      .then(data => {
        setCustomers(data.users || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleUpdate = async (userId: string, data: any) => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, ...data }),
      })
      if (res.ok) {
        setEditingUser(null)
        fetchUsers()
      } else {
        alert('Failed to update user')
      }
    } catch (e) {
      alert('Error updating user')
    }
  }

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this customer? This action cannot be undone.')) return
    try {
      const res = await fetch(`/api/admin/users?userId=${userId}`, { method: 'DELETE' })
      if (res.ok) fetchUsers()
      else alert('Failed to delete')
    } catch (e) {
      alert('Error deleting user')
    }
  }

  const filtered = customers.filter(c => {
    const matchSearch = search === '' ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
    const matchMembership = filterMembership === 'All' || c.membershipTier === filterMembership
    return matchSearch && matchMembership
  })

  const totalRevenue = customers.reduce((a, c) => a + c.totalSpent, 0)
  const avgSpend = customers.length ? totalRevenue / customers.length : 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-cream font-bold">Customers</h1>
          <p className="text-cream/50 mt-1 text-sm">{customers.length} registered customers</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Customers', value: customers.length, color: 'text-blue-400' },
          { label: 'Total Revenue', value: '₹' + (totalRevenue / 1000).toFixed(1) + 'k', color: 'text-gold-400' },
          { label: 'Avg. Spend', value: '₹' + Math.round(avgSpend), color: 'text-green-400' },
          { label: 'Members', value: customers.filter(c => c.membershipTier !== 'NONE').length, color: 'text-purple-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="glass-card p-4 text-center">
            <p className={`font-display text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-cream/50 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="glass-card p-4 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search customers..." className="input-luxury pl-9" />
        </div>
        <div className="flex gap-2">
          {['All', 'PLATINUM', 'GOLD', 'SILVER', 'NONE'].map(m => (
            <button key={m} onClick={() => setFilterMembership(m)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                filterMembership === m ? 'bg-gold-400/20 text-gold-400 border border-gold-400/30' : 'glass-card text-cream/60 hover:text-cream'
              }`}>
              {m === 'NONE' ? 'No Membership' : m === 'All' ? 'All' : membershipIcon[m] + ' ' + m}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-20 text-center text-cream/50">
              <RefreshCcw className="animate-spin mx-auto mb-4" /> Loading customers...
            </div>
          ) : (
            <table className="w-full table-luxury">
              <thead>
                <tr>
                  <th>Customer</th><th>Status</th><th>Membership</th><th>Points</th>
                  <th>Total Spent</th><th>Appointments</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gold-gradient flex items-center justify-center font-bold text-dark text-xs shrink-0">
                          {c.avatar || c.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-cream">{c.name}</p>
                          <p className="text-xs text-cream/40">{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md ${
                        c.isActive ? 'bg-green-400/20 text-green-400' : 'bg-red-400/20 text-red-400'
                      }`}>
                        {c.isActive ? 'Active' : 'Blocked'}
                      </span>
                    </td>
                    <td>
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${membershipColor[c.membershipTier]}`}>
                        {membershipIcon[c.membershipTier]} {c.membershipTier}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1 text-gold-400">
                        <Star size={12} className="fill-gold-400" />
                        <span className="font-semibold">{c.rewardPoints.toLocaleString('en-IN')}</span>
                      </div>
                    </td>
                    <td className="text-gold-400 font-semibold">₹{c.totalSpent.toLocaleString('en-IN')}</td>
                    <td className="text-cream/70">{c._count?.appointments || 0}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <Link href={`/admin/customers/${c.id}`} title="View Details" className="text-cream/50 hover:text-gold-400 transition-colors">
                          <Eye size={16} />
                        </Link>
                        <button onClick={() => setEditingUser(c)} title="Edit Customer" className="text-cream/50 hover:text-blue-400 transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleUpdate(c.id, { isActive: !c.isActive })} title={c.isActive ? 'Block' : 'Unblock'} className="text-cream/50 hover:text-yellow-400 transition-colors">
                          <ShieldAlert size={16} />
                        </button>
                        <button onClick={() => handleDelete(c.id)} title="Delete Customer" className="text-cream/50 hover:text-red-400 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center p-8 text-cream/40">No customers found</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-md p-6 relative">
            <button onClick={() => setEditingUser(null)} className="absolute top-4 right-4 text-cream/50 hover:text-white">
              <X size={20} />
            </button>
            <h2 className="text-xl font-display font-bold text-cream mb-6">Edit Customer</h2>
            
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              handleUpdate(editingUser.id, {
                name: formData.get('name'),
                phone: formData.get('phone'),
                membershipTier: formData.get('membershipTier'),
              })
            }} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-cream/50 mb-1">Full Name</label>
                <input name="name" defaultValue={editingUser.name} required className="input-luxury w-full" />
              </div>
              <div>
                <label className="block text-xs font-medium text-cream/50 mb-1">Email (Read Only)</label>
                <input value={editingUser.email} disabled className="input-luxury w-full opacity-50 cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-xs font-medium text-cream/50 mb-1">Phone</label>
                <input name="phone" defaultValue={editingUser.phone} className="input-luxury w-full" />
              </div>
              <div>
                <label className="block text-xs font-medium text-cream/50 mb-1">Membership Tier</label>
                <select name="membershipTier" defaultValue={editingUser.membershipTier} className="input-luxury w-full bg-[#0a0a0a]">
                  <option value="NONE">None</option>
                  <option value="SILVER">Silver</option>
                  <option value="GOLD">Gold</option>
                  <option value="PLATINUM">Platinum</option>
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setEditingUser(null)} className="flex-1 btn-outline py-2.5">Cancel</button>
                <button type="submit" className="flex-1 btn-gold py-2.5">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
