'use client'
import { useState } from 'react'
import { Bell, Calendar, CreditCard, Tag } from 'lucide-react'

export default function CustomerNotificationsPage() {
  const [notifications] = useState([
    { id: 1, type: 'PROMO', title: 'Special Winter Offer! ❄️', message: 'Get 20% off on all Deep Tissue Massages this December. Use code WINTER20 at checkout.', date: '2 hours ago', read: false },
    { id: 2, type: 'REMINDER', title: 'Upcoming Appointment', message: 'Just a reminder! You have a Deep Tissue Massage scheduled for tomorrow at 10:00 AM.', date: '1 day ago', read: false },
    { id: 3, type: 'PAYMENT', title: 'Payment Successful', message: 'Your payment of ₹4,500 for Booking #BK-9281 was successful. Invoice is available for download.', date: '3 days ago', read: true },
    { id: 4, type: 'BOOKING', title: 'Booking Confirmed', message: 'Your appointment for Gold Facial on Dec 10 has been confirmed. We look forward to seeing you!', date: '1 week ago', read: true },
  ])

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-display text-3xl text-cream font-bold">Notifications</h1>
          <p className="text-cream/50 mt-1 text-sm">Alerts, reminders, and exclusive offers.</p>
        </div>
        <button className="text-xs text-gold-400 hover:text-gold-300">Mark all as read</button>
      </div>

      <div className="space-y-3">
        {notifications.map(notif => (
          <div key={notif.id} className={`glass-card p-5 border flex gap-4 ${notif.read ? 'border-white/5 opacity-70' : 'border-gold-400/30 bg-gold-400/5'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              notif.type === 'PROMO' ? 'bg-purple-400/20 text-purple-400' :
              notif.type === 'PAYMENT' ? 'bg-green-400/20 text-green-400' :
              notif.type === 'REMINDER' ? 'bg-yellow-400/20 text-yellow-400' :
              'bg-blue-400/20 text-blue-400'
            }`}>
              {notif.type === 'PROMO' ? <Tag size={18} /> :
               notif.type === 'PAYMENT' ? <CreditCard size={18} /> :
               notif.type === 'REMINDER' ? <Bell size={18} /> :
               <Calendar size={18} />}
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
        {notifications.length === 0 && (
          <div className="text-center py-20 text-cream/50 glass-card">
            <Bell size={32} className="mx-auto mb-4 opacity-50" />
            No new notifications.
          </div>
        )}
      </div>
    </div>
  )
}
