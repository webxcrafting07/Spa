'use client'
import { useState, useEffect } from 'react'
import { Calendar, Clock, RefreshCcw } from 'lucide-react'
import { useSession } from 'next-auth/react'

export default function TherapistHistory() {
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

  const pastAppointments = appointments.filter(a => ['COMPLETED', 'CANCELLED'].includes(a.status)).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] text-gold-400 uppercase tracking-[0.4em] font-bold block mb-2">Therapist Portal</span>
          <h1 className="font-display text-4xl text-cream font-bold">Work History</h1>
        </div>
      </div>

      {/* Schedule Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-[#050505]">
          <h2 className="font-display text-xl text-cream font-bold">Past Appointments</h2>
        </div>
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="py-20 text-center text-cream/50">
              <RefreshCcw className="animate-spin mx-auto mb-4" /> Loading history...
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0a0a0a] border-b border-white/5 text-[10px] uppercase tracking-widest text-cream/40">
                  <th className="p-6 font-medium">Date & Time</th>
                  <th className="p-6 font-medium">Client</th>
                  <th className="p-6 font-medium">Service</th>
                  <th className="p-6 font-medium">Earned (40%)</th>
                  <th className="p-6 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm font-light text-cream/70 divide-y divide-white/5">
                {pastAppointments.map((a) => (
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
                    <td className="p-6 font-medium text-gold-400">
                      {a.status === 'COMPLETED' ? `₹${(a.finalAmount * 0.4).toLocaleString('en-IN')}` : '-'}
                    </td>
                    <td className="p-6 text-right">
                      <span className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-md ${
                        a.status === 'COMPLETED' ? 'bg-purple-400/10 text-purple-400' :
                        'bg-red-400/10 text-red-400'
                      }`}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {pastAppointments.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center p-10 text-cream/50">
                      No past appointments found.
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
