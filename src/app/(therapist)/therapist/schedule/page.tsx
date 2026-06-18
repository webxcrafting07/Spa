'use client'
import { useState, useEffect } from 'react'
import { Save, Calendar, Clock } from 'lucide-react'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function TherapistSchedulePage() {
  const { data: session } = useSession()
  const [workingHours, setWorkingHours] = useState<any>({})
  const [saving, setSaving] = useState(false)
  
  useEffect(() => {
    // Initialize default empty schedule
    const defaultSchedule = DAYS.reduce((acc, day) => ({
      ...acc,
      [day]: { isWorking: true, start: '10:00', end: '19:00' }
    }), {})
    setWorkingHours(defaultSchedule)
    // Here we would fetch actual data from /api/therapist/schedule
  }, [])

  const toggleDay = (day: string) => {
    setWorkingHours((prev: any) => ({
      ...prev,
      [day]: { ...prev[day], isWorking: !prev[day].isWorking }
    }))
  }

  const updateTime = (day: string, field: 'start'|'end', value: string) => {
    setWorkingHours((prev: any) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 800)) // Mock API call
    toast.success('Schedule updated successfully!')
    setSaving(false)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-3xl text-cream font-bold">My Schedule & Availability</h1>
        <p className="text-cream/50 mt-1 text-sm">Set your weekly working hours and manage days off.</p>
      </div>

      <div className="glass-card p-6 border border-white/5">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
          <Clock className="text-gold-400" />
          <h2 className="font-display text-xl text-cream font-semibold">Weekly Working Hours</h2>
        </div>

        <div className="space-y-4">
          {DAYS.map(day => {
            const schedule = workingHours[day]
            if (!schedule) return null
            return (
              <div key={day} className="flex items-center justify-between p-4 bg-dark-800/50 rounded-xl">
                <div className="flex items-center gap-4 w-40">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={schedule.isWorking} onChange={() => toggleDay(day)} />
                    <div className="w-11 h-6 bg-dark-600 rounded-full peer peer-checked:bg-gold-400 transition-all after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:after:translate-x-5" />
                  </label>
                  <span className={`text-sm font-medium ${schedule.isWorking ? 'text-cream' : 'text-cream/40 line-through'}`}>{day}</span>
                </div>

                {schedule.isWorking ? (
                  <div className="flex items-center gap-3 flex-1 justify-end">
                    <input type="time" value={schedule.start} onChange={(e) => updateTime(day, 'start', e.target.value)} className="input-luxury w-32 py-1.5 text-sm" />
                    <span className="text-cream/40">to</span>
                    <input type="time" value={schedule.end} onChange={(e) => updateTime(day, 'end', e.target.value)} className="input-luxury w-32 py-1.5 text-sm" />
                  </div>
                ) : (
                  <div className="flex-1 text-right text-sm text-cream/40 italic">Day Off</div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="glass-card p-6 border border-white/5">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
          <Calendar className="text-gold-400" />
          <h2 className="font-display text-xl text-cream font-semibold">Block Holidays / Time Off</h2>
        </div>
        <p className="text-sm text-cream/60 mb-4">Select dates when you will not be available. Customers will not be able to book appointments with you on these days.</p>
        
        <div className="flex gap-4 mb-4">
          <input type="date" className="input-luxury w-48" />
          <button className="btn-gold text-sm px-6">Add Blockout Date</button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {/* Example tags */}
          <span className="bg-red-400/10 text-red-400 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            Dec 25, 2024 <button className="hover:text-white">&times;</button>
          </span>
          <span className="bg-red-400/10 text-red-400 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            Jan 1, 2025 <button className="hover:text-white">&times;</button>
          </span>
        </div>
      </div>

      <button onClick={handleSave} disabled={saving} className="btn-gold px-8 py-3 flex items-center gap-2 text-sm">
        <Save size={16} /> {saving ? 'Saving...' : 'Save Schedule'}
      </button>
    </div>
  )
}
