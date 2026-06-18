'use client'
import { useState } from 'react'
import { Bell, Calendar, XCircle, Clock } from 'lucide-react'

export default function TherapistNotificationsPage() {
  const [notifications] = useState([
    { id: 1, type: 'NEW_BOOKING', title: 'New Appointment Booked', message: 'Neha Sharma booked a Deep Tissue Massage for Dec 20, 2024 at 10:00 AM.', date: '10 mins ago', read: false },
    { id: 2, type: 'REMINDER', title: 'Upcoming Appointment', message: 'Reminder: You have a Swedish Massage with Priya K. in 30 minutes.', date: '30 mins ago', read: false },
    { id: 3, type: 'CANCELLATION', title: 'Appointment Cancelled', message: 'Rahul Verma cancelled their Sports Massage on Dec 19, 2024.', date: '2 hours ago', read: true },
    { id: 4, type: 'SYSTEM', title: 'Schedule Updated', message: 'Your blockout dates for Dec 25, 2024 have been saved successfully.', date: '1 day ago', read: true },
  ])

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-display text-3xl text-cream font-bold">Notifications</h1>
          <p className="text-cream/50 mt-1 text-sm">Stay updated with your bookings and schedule changes.</p>
        </div>
        <button className="text-xs text-gold-400 hover:text-gold-300">Mark all as read</button>
      </div>

      <div className="space-y-3">
        {notifications.map(notif => (
          <div key={notif.id} className={`glass-card p-5 border flex gap-4 ${notif.read ? 'border-white/5 opacity-70' : 'border-gold-400/30 bg-gold-400/5'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              notif.type === 'NEW_BOOKING' ? 'bg-green-400/20 text-green-400' :
              notif.type === 'CANCELLATION' ? 'bg-red-400/20 text-red-400' :
              notif.type === 'REMINDER' ? 'bg-yellow-400/20 text-yellow-400' :
              'bg-blue-400/20 text-blue-400'
            }`}>
              {notif.type === 'NEW_BOOKING' ? <Calendar size={18} /> :
               notif.type === 'CANCELLATION' ? <XCircle size={18} /> :
               notif.type === 'REMINDER' ? <Clock size={18} /> :
               <Bell size={18} />}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <h4 className={`font-medium text-sm ${notif.read ? 'text-cream/80' : 'text-gold-400'}`}>{notif.title}</h4>
                <span className="text-[10px] text-cream/40 uppercase tracking-wider">{notif.date}</span>
              </div>
              <p className="text-sm text-cream/70 leading-relaxed">{notif.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
