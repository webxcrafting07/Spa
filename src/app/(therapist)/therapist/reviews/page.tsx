'use client'
import { useState } from 'react'
import { Star, MessageSquare } from 'lucide-react'
import toast from 'react-hot-toast'

export default function TherapistReviewsPage() {
  const [reviews] = useState([
    { id: 1, customer: 'Neha Sharma', service: 'Deep Tissue Massage', rating: 5, date: 'Dec 15, 2024', comment: 'Absolutely wonderful experience! Felt completely relaxed.', reply: '' },
    { id: 2, customer: 'Rahul Verma', service: 'Sports Massage', rating: 4, date: 'Dec 12, 2024', comment: 'Good pressure, but the room could have been warmer.', reply: 'Thank you for your feedback Rahul! I will make sure the room temperature is adjusted for your next visit.' },
    { id: 3, customer: 'Priya K.', service: 'Swedish Massage', rating: 5, date: 'Dec 10, 2024', comment: 'Very professional and polite. Highly recommend.', reply: '' },
  ])

  const handleReply = (id: number) => {
    const reply = prompt('Enter your reply to the customer:')
    if (reply) {
      toast.success('Reply submitted successfully! Awaiting admin approval.')
    }
  }

  const averageRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-cream font-bold">My Reviews</h1>
        <p className="text-cream/50 mt-1 text-sm">See what customers are saying about your services.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="glass-card p-6 border border-white/5 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-cream/40 uppercase tracking-widest font-bold mb-2">Average Rating</p>
            <p className="font-display text-4xl font-bold text-gold-400">{averageRating}</p>
          </div>
          <Star size={40} className="text-gold-400/20" />
        </div>
        <div className="glass-card p-6 border border-white/5 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-cream/40 uppercase tracking-widest font-bold mb-2">Total Reviews</p>
            <p className="font-display text-4xl font-bold text-cream">{reviews.length}</p>
          </div>
          <MessageSquare size={40} className="text-cream/10" />
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map(review => (
          <div key={review.id} className="glass-card p-6 border border-white/5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-medium text-cream">{review.customer}</h4>
                <p className="text-xs text-cream/50">{review.service} • {review.date}</p>
              </div>
              <div className="flex text-gold-400 text-sm">
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </div>
            </div>
            
            <p className="text-sm text-cream/80 mb-4 font-light leading-relaxed">"{review.comment}"</p>
            
            {review.reply ? (
              <div className="bg-dark-800/50 p-4 rounded-xl border border-white/5 ml-4 md:ml-8 relative before:content-[''] before:absolute before:-left-4 before:top-4 before:w-4 before:h-px before:bg-white/10">
                <p className="text-xs text-gold-400 font-medium mb-1">Your Reply</p>
                <p className="text-sm text-cream/70 italic">"{review.reply}"</p>
              </div>
            ) : (
              <button onClick={() => handleReply(review.id)} className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gold-400/10 hover:bg-gold-400/20 transition-all">
                <MessageSquare size={12} /> Reply to Review
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
