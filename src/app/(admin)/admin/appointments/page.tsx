'use client'
import { useState, useEffect } from 'react'
import { Search, Filter, Eye, Check, X, Calendar, Clock, RefreshCcw } from 'lucide-react'
import toast from 'react-hot-toast'

const statusTabs = ['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled']

const statusClass: Record<string, string> = {
  CONFIRMED: 'badge-confirmed',
  PENDING: 'badge-pending',
  COMPLETED: 'badge-completed',
  CANCELLED: 'badge-cancelled',
}

export default function AdminAppointmentsPage() {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('All')
  const [selected, setSelected] = useState<string[]>([])
  const [appointments, setAppointments] = useState<any[]>([])
  const [therapists, setTherapists] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchAppointments = async () => {
    try {
      const [res, staffRes] = await Promise.all([
        fetch('/api/appointments'),
        fetch('/api/admin/staff')
      ])
      if (res.ok) {
        const data = await res.json()
        setAppointments(data)
      }
      if (staffRes.ok) {
        const staffData = await staffRes.json()
        setTherapists(staffData.filter((s: any) => s.isActive && s.role === 'THERAPIST'))
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      if (res.ok) {
        toast.success(`Appointment ${status.toLowerCase()}!`)
        fetchAppointments()
      } else {
        toast.error('Failed to update')
      }
    } catch (e) {
      toast.error('An error occurred')
    }
  }

  const assignTherapist = async (id: string, staffId: string) => {
    const loadingToast = toast.loading('Assigning therapist...')
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ staffId })
      })
      if (res.ok) {
        toast.success('Therapist assigned', { id: loadingToast })
        fetchAppointments()
      } else {
        toast.error('Failed to assign', { id: loadingToast })
      }
    } catch (e) {
      toast.error('Error assigning therapist', { id: loadingToast })
    }
  }

  const filtered = appointments.filter(a => {
    const matchSearch = search === '' ||
      a.customer?.name?.toLowerCase().includes(search.toLowerCase()) ||
      a.service?.name?.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase())
    const matchTab = activeTab === 'All' ||
      (activeTab === 'Pending' && a.status === 'PENDING') ||
      (activeTab === 'Confirmed' && a.status === 'CONFIRMED') ||
      (activeTab === 'Completed' && a.status === 'COMPLETED') ||
      (activeTab === 'Cancelled' && a.status === 'CANCELLED')
    return matchSearch && matchTab
  })

  const toggleSelect = (id: string) =>
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-cream font-bold">Appointments</h1>
          <p className="text-cream/50 mt-1 text-sm">{appointments.length} total bookings</p>
        </div>
        <div className="flex gap-3">
          <a href="/booking" target="_blank" className="btn-gold text-xs py-2 px-4">+ New Booking</a>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Pending', count: appointments.filter(a => a.status === 'PENDING').length, color: 'text-yellow-400' },
          { label: 'Confirmed', count: appointments.filter(a => a.status === 'CONFIRMED').length, color: 'text-green-400' },
          { label: 'Completed', count: appointments.filter(a => a.status === 'COMPLETED').length, color: 'text-purple-400' },
          { label: 'Cancelled', count: appointments.filter(a => a.status === 'CANCELLED').length, color: 'text-red-400' },
        ].map(s => (
          <div key={s.label} className="glass-card p-4 text-center">
            <p className={`font-display text-2xl font-bold ${s.color}`}>{s.count}</p>
            <p className="text-xs text-cream/50 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="glass-card p-4 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40" />
          <input
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by customer, service, booking ID..."
            className="input-luxury pl-9" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gold-400/10 overflow-x-auto">
        {statusTabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab
                ? 'text-gold-400 border-b-2 border-gold-400'
                : 'text-cream/50 hover:text-cream'
            }`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="py-20 text-center text-cream/50">
              <RefreshCcw className="animate-spin mx-auto mb-4" /> Loading bookings...
            </div>
          ) : (
            <table className="w-full table-luxury">
              <thead>
                <tr>
                  <th>ID</th><th>Customer</th><th>Service</th><th>Therapist</th>
                  <th>Date & Time</th><th>Amount</th><th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(a => (
                  <tr key={a.id}>
                    <td className="text-gold-400 font-mono text-xs font-bold">{a.id.slice(-6).toUpperCase()}</td>
                    <td>
                      <div>
                        <p className="font-medium text-cream">{a.customer?.name}</p>
                        <p className="text-xs text-cream/40">{a.customer?.email}</p>
                      </div>
                    </td>
                    <td>
                      <div>
                        <p className="text-cream">{a.service?.name}</p>
                        <p className="text-xs text-cream/40 flex items-center gap-1"><Clock size={10} />{a.duration} min</p>
                      </div>
                    </td>
                    <td className="text-cream/70">
                      {a.status === 'PENDING' || a.status === 'CONFIRMED' ? (
                        <select 
                          className="bg-dark-800 text-xs px-2 py-1 rounded border border-white/10 text-cream focus:outline-none focus:border-gold-400"
                          value={a.staffId || 'unassigned'}
                          onChange={(e) => assignTherapist(a.id, e.target.value)}
                        >
                          <option value="unassigned">Any / Unassigned</option>
                          {therapists.map(t => (
                            <option key={t.id} value={t.id}>{t.name}</option>
                          ))}
                        </select>
                      ) : (
                        a.staff?.name || 'Any'
                      )}
                    </td>
                    <td className="text-cream/60 text-xs">{new Date(a.date).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}<br />{a.timeSlot}</td>
                    <td className="text-gold-400 font-semibold">₹{a.finalAmount.toLocaleString('en-IN')}</td>
                    <td><span className={statusClass[a.status] || 'badge-pending'}>{a.status.replace('_', ' ')}</span></td>
                    <td>
                      <div className="flex items-center gap-2">
                        {a.status === 'PENDING' && (
                          <>
                            <button onClick={() => updateStatus(a.id, 'CONFIRMED')} title="Confirm" className="text-green-400 hover:text-green-300 transition-colors">
                              <Check size={15} />
                            </button>
                            <button onClick={() => updateStatus(a.id, 'CANCELLED')} title="Cancel" className="text-red-400 hover:text-red-300 transition-colors">
                              <X size={15} />
                            </button>
                          </>
                        )}
                        {a.status === 'CONFIRMED' && (
                          <button onClick={() => updateStatus(a.id, 'COMPLETED')} title="Mark Completed" className="text-purple-400 text-xs border border-purple-400/30 px-2 py-1 rounded hover:bg-purple-400/10 transition-colors">
                            Complete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center py-10 text-cream/50">No bookings found</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
