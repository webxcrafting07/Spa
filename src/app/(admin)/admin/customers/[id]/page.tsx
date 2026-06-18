import { notFound } from 'next/navigation'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { ArrowLeft, Calendar, DollarSign, Star, Clock, CheckCircle, XCircle } from 'lucide-react'

export default async function CustomerDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      appointments: {
        include: { service: true, staff: true },
        orderBy: { date: 'desc' },
      },
      transactions: {
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!user) return notFound()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/customers" className="p-2 glass-card hover:bg-white/5 transition-colors rounded-lg">
          <ArrowLeft size={20} className="text-cream" />
        </Link>
        <div>
          <h1 className="font-display text-3xl text-cream font-bold">{user.name}</h1>
          <p className="text-cream/50 mt-1 text-sm">{user.email} • {user.phone || 'No phone'}</p>
        </div>
        <div className="ml-auto flex gap-3">
          <span className={`px-4 py-2 rounded-full text-xs font-bold ${
            user.isActive ? 'bg-green-400/20 text-green-400' : 'bg-red-400/20 text-red-400'
          }`}>
            {user.isActive ? 'Active' : 'Blocked'}
          </span>
          <span className="px-4 py-2 rounded-full text-xs font-bold bg-gold-400/20 text-gold-400">
            {user.membershipTier} Member
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats */}
        <div className="lg:col-span-1 space-y-4">
          <div className="glass-card p-6">
            <h3 className="text-cream font-bold mb-4">Customer Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-cream/50 text-sm">Total Spent</span>
                <span className="text-gold-400 font-bold">₹{user.totalSpent.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-cream/50 text-sm">Reward Points</span>
                <span className="text-gold-400 font-bold flex items-center gap-1">
                  <Star size={14} className="fill-gold-400" /> {user.rewardPoints}
                </span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-cream/50 text-sm">Total Bookings</span>
                <span className="text-cream font-bold">{user.appointments.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-cream/50 text-sm">Member Since</span>
                <span className="text-cream font-bold">{new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings & Payments */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-cream font-bold mb-4 flex items-center gap-2">
              <Calendar size={18} className="text-gold-400" /> Booking History
            </h3>
            <div className="space-y-4">
              {user.appointments.length === 0 ? (
                <p className="text-cream/40 text-sm">No bookings found.</p>
              ) : (
                user.appointments.map(apt => (
                  <div key={apt.id} className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center p-4 bg-white/5 rounded-xl">
                    <div>
                      <p className="font-bold text-cream">{apt.service.name}</p>
                      <p className="text-xs text-cream/50 mt-1 flex items-center gap-2">
                        <Clock size={12} /> {new Date(apt.date).toLocaleDateString()} • {apt.timeSlot}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gold-400 font-bold">₹{apt.finalAmount}</span>
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        apt.status === 'COMPLETED' ? 'bg-green-400/20 text-green-400' :
                        apt.status === 'CANCELLED' ? 'bg-red-400/20 text-red-400' :
                        'bg-blue-400/20 text-blue-400'
                      }`}>
                        {apt.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-cream font-bold mb-4 flex items-center gap-2">
              <DollarSign size={18} className="text-gold-400" /> Payment History
            </h3>
            <div className="space-y-4">
              {user.transactions.length === 0 ? (
                <p className="text-cream/40 text-sm">No payments found.</p>
              ) : (
                user.transactions.map(txn => (
                  <div key={txn.id} className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                    <div>
                      <p className="text-xs text-cream/50">{new Date(txn.createdAt).toLocaleDateString()}</p>
                      <p className="text-sm font-medium text-cream">{txn.method || 'Unknown Method'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gold-400 font-bold">₹{txn.amount}</p>
                      <span className={`text-[10px] uppercase font-bold ${txn.status === 'PAID' ? 'text-green-400' : 'text-yellow-400'}`}>
                        {txn.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
