'use client'
import { useState, useEffect } from 'react'
import { Calendar, Clock, CheckCircle, RefreshCcw } from 'lucide-react'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'

export default function TherapistDashboard() {
  const { data: session } = useSession()
  const [appointments, setAppointments] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

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

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      if (res.ok) {
        toast.success(`Appointment marked as ${status}!`)
        fetchAppointments()
      } else {
        toast.error('Failed to update status')
      }
    } catch (e) {
      toast.error('An error occurred')
    }
  }

  const addNote = async (id: string) => {
    const note = prompt('Enter an internal note for this appointment:');
    if (!note) return;
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ internalNotes: note })
      })
      if (res.ok) {
        toast.success('Note added successfully')
        fetchAppointments()
      } else {
        toast.error('Failed to add note')
      }
    } catch {
      toast.error('An error occurred')
    }
  }

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const myEarnings = appointments.filter(a => a.status === 'COMPLETED').reduce((sum, a) => sum + (a.finalAmount * 0.4), 0) // Therapist gets 40%
  const todayCount = appointments.filter(a => new Date(a.date).toDateString() === new Date().toDateString() && a.status !== 'CANCELLED').length
  
  const upcoming = appointments.filter(a => ['CONFIRMED', 'PENDING', 'IN_PROGRESS'].includes(a.status)).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] text-gold-400 uppercase tracking-[0.4em] font-bold block mb-2">Therapist Portal</span>
          <h1 className="font-display text-4xl text-cream font-bold">My Schedule</h1>
          <p className="text-cream/40 mt-2 text-sm font-light">{today}</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card p-6 border border-white/5">
          <p className="text-[10px] text-cream/40 uppercase tracking-widest font-bold mb-2">Today's Sessions</p>
          <p className="font-display text-3xl font-bold text-cream">{todayCount}</p>
        </div>
        <div className="glass-card p-6 border border-white/5">
          <p className="text-[10px] text-cream/40 uppercase tracking-widest font-bold mb-2">Pending Appointments</p>
          <p className="font-display text-3xl font-bold text-gold-400">{upcoming.length}</p>
        </div>
        <div className="glass-card p-6 border border-white/5">
          <p className="text-[10px] text-cream/40 uppercase tracking-widest font-bold mb-2">My Total Earnings (Est.)</p>
          <p className="font-display text-3xl font-bold text-green-400">₹{myEarnings.toLocaleString('en-IN')}</p>
        </div>
      </div>

      {/* Schedule Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-[#050505]">
          <h2 className="font-display text-xl text-cream font-bold">Upcoming Appointments</h2>
        </div>
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="py-20 text-center text-cream/50">
              <RefreshCcw className="animate-spin mx-auto mb-4" /> Loading schedule...
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0a0a0a] border-b border-white/5 text-[10px] uppercase tracking-widest text-cream/40">
                  <th className="p-6 font-medium">Date & Time</th>
                  <th className="p-6 font-medium">Client</th>
                  <th className="p-6 font-medium">Service</th>
                  <th className="p-6 font-medium">Status</th>
                  <th className="p-6 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm font-light text-cream/70 divide-y divide-white/5">
                {upcoming.map((a) => (
                  <tr key={a.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-cream font-medium flex items-center gap-2"><Calendar size={12}/> {new Date(a.date).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}</span>
                        <span className="text-cream/50 text-xs flex items-center gap-2"><Clock size={12}/> {a.timeSlot}</span>
                      </div>
                    </td>
                    <td className="p-6 font-medium text-cream">{a.customer?.name}</td>
                    <td className="p-6">
                      <p className="text-cream">{a.service?.name}</p>
                      <p className="text-xs text-cream/40">{a.duration} mins</p>
                    </td>
                    <td className="p-6">
                      <span className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-md ${
                        a.status === 'CONFIRMED' ? 'bg-green-400/10 text-green-400' :
                        a.status === 'PENDING' ? 'bg-yellow-400/10 text-yellow-400' :
                        'bg-blue-400/10 text-blue-400'
                      }`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="p-6 text-right space-y-2">
                      <div className="flex justify-end gap-2 flex-wrap">
                        {a.status === 'PENDING' && (
                          <>
                            <button onClick={() => updateStatus(a.id, 'CONFIRMED')}
                              className="text-[10px] uppercase tracking-widest font-bold bg-green-400/10 text-green-400 hover:bg-green-400/20 px-3 py-1.5 rounded-lg transition-colors">
                              Accept
                            </button>
                            <button onClick={() => updateStatus(a.id, 'CANCELLED')}
                              className="text-[10px] uppercase tracking-widest font-bold bg-red-400/10 text-red-400 hover:bg-red-400/20 px-3 py-1.5 rounded-lg transition-colors">
                              Reject
                            </button>
                          </>
                        )}
                        {a.status === 'CONFIRMED' && (
                          <button onClick={() => updateStatus(a.id, 'IN_PROGRESS')}
                            className="text-[10px] uppercase tracking-widest font-bold bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/20 px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1">
                            Start Session
                          </button>
                        )}
                        {a.status === 'IN_PROGRESS' && (
                          <button onClick={() => updateStatus(a.id, 'COMPLETED')}
                            className="text-[10px] uppercase tracking-widest font-bold bg-purple-400/10 text-purple-400 hover:bg-purple-400/20 px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1">
                            <CheckCircle size={14} /> Complete
                          </button>
                        )}
                        <button onClick={() => addNote(a.id)}
                          className="text-[10px] uppercase tracking-widest font-bold bg-white/5 text-cream hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors">
                          Note
                        </button>
                      </div>
                      {a.internalNotes && <p className="text-xs text-cream/40 mt-1 max-w-xs ml-auto truncate" title={a.internalNotes}>Note: {a.internalNotes}</p>}
                    </td>
                  </tr>
                ))}
                {upcoming.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center p-10 text-cream/50">
                      <Calendar size={32} className="mx-auto mb-4 opacity-50" />
                      No upcoming appointments. Enjoy your rest!
                    </td>
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
