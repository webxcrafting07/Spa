'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Clock, X, MessageSquare, RefreshCcw } from 'lucide-react'
import toast from 'react-hot-toast'

const tabs = ['All', 'Upcoming', 'Completed', 'Cancelled']

const statusMap: Record<string, string> = {
  CONFIRMED: 'badge-confirmed',
  PENDING: 'badge-pending',
  COMPLETED: 'badge-completed',
  CANCELLED: 'badge-cancelled',
}

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState('All')
  const [appointments, setAppointments] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCancelling, setIsCancelling] = useState<string | null>(null)

  const fetchAppointments = async () => {
    try {
      const res = await fetch('/api/appointments')
      if (res.ok) {
        const data = await res.json()
        setAppointments(data)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  const handleCancel = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return
    setIsCancelling(id)
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'CANCELLED' })
      })
      if (res.ok) {
        toast.success('Appointment cancelled successfully.')
        fetchAppointments()
      } else {
        toast.error('Failed to cancel appointment.')
      }
    } catch (e) {
      toast.error('An error occurred.')
    } finally {
      setIsCancelling(null)
    }
  }

  const filtered = appointments.filter(a => {
    if (activeTab === 'All') return true
    if (activeTab === 'Upcoming') return ['CONFIRMED', 'PENDING'].includes(a.status)
    if (activeTab === 'Completed') return a.status === 'COMPLETED'
    if (activeTab === 'Cancelled') return a.status === 'CANCELLED'
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-cream font-bold">My Appointments</h1>
          <p className="text-cream/50 mt-1">Track and manage all your bookings</p>
        </div>
        <Link href="/booking" className="btn-gold text-sm">+ Book New</Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gold-400/10 pb-1">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium transition-all rounded-t-lg ${
              activeTab === tab
                ? 'text-gold-400 border-b-2 border-gold-400'
                : 'text-cream/50 hover:text-cream'
            }`}>
            {tab}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-16 text-cream/50">
            <RefreshCcw className="animate-spin mx-auto mb-4" />
            Loading your appointments...
          </div>
        ) : (
          <>
            {filtered.map(apt => (
              <div key={apt.id} className="glass-card p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-16 h-16 rounded-xl shrink-0 flex items-center justify-center bg-white/5 border border-white/10 text-gold-400 font-display text-2xl">
                  {new Date(apt.date).getDate()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <h3 className="font-semibold text-cream">{apt.service?.name}</h3>
                      <p className="text-sm text-cream/60">with {apt.staff?.name || 'Any Expert'}</p>
                    </div>
                    <span className={statusMap[apt.status]}>{apt.status}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-cream/50">
                    <span className="flex items-center gap-1"><Calendar size={12} />{new Date(apt.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric'})}</span>
                    <span className="flex items-center gap-1"><Clock size={12} />{apt.timeSlot} · {apt.duration} min</span>
                    <span className="text-gold-400 font-semibold">₹{apt.finalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 mt-4 sm:mt-0">
                  {apt.status === 'COMPLETED' && (
                    <Link href={`/review/${apt.id}`}
                      className="text-xs text-gold-400 border border-gold-400/30 px-3 py-1.5 rounded-lg hover:bg-gold-400/10 transition-all flex items-center gap-1">
                      <MessageSquare size={12} /> Review
                    </Link>
                  )}
                  {['CONFIRMED', 'PENDING'].includes(apt.status) && (
                    <button 
                      onClick={() => handleCancel(apt.id)}
                      disabled={isCancelling === apt.id}
                      className="text-xs text-red-400 border border-red-400/30 px-3 py-1.5 rounded-lg hover:bg-red-400/10 transition-all flex items-center gap-1 disabled:opacity-50">
                      {isCancelling === apt.id ? <RefreshCcw size={12} className="animate-spin" /> : <X size={12} />} Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-16">
                <Calendar size={40} className="text-cream/20 mx-auto mb-4" />
                <p className="text-cream/50 mb-4">No {activeTab.toLowerCase()} appointments</p>
                <Link href="/booking" className="btn-gold text-sm">Book Now</Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
