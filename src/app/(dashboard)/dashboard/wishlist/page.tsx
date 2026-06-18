'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Heart, Trash2, Clock, IndianRupee } from 'lucide-react'

const initialServices = [
  { id: '1', name: 'Hot Stone Therapy', category: 'Spa Services', duration: 75, price: 4200, img: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&q=80' },
  { id: '2', name: 'Anti-Aging Therapy', category: 'Skin Care', duration: 90, price: 5500, img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80' },
]

const initialTherapists = [
  { id: 't1', name: 'Dr. Sarah Lee', role: 'Senior Therapist', rating: 4.9, img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80' },
  { id: 't2', name: 'Anita Patel', role: 'Massage Specialist', rating: 4.8, img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80' },
]

export default function WishlistPage() {
  const [activeTab, setActiveTab] = useState<'services'|'therapists'>('services')
  const [services, setServices] = useState(initialServices)
  const [therapists, setTherapists] = useState(initialTherapists)

  const removeService = (id: string) => setServices(w => w.filter(i => i.id !== id))
  const removeTherapist = (id: string) => setTherapists(w => w.filter(i => i.id !== id))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-cream font-bold">My Wishlist</h1>
          <p className="text-cream/50 mt-1">Saved services and favorite therapists</p>
        </div>
      </div>

      <div className="flex gap-2 border-b border-gold-400/10 pb-1">
        <button onClick={() => setActiveTab('services')} className={`px-4 py-2.5 text-sm font-medium transition-all rounded-t-lg ${activeTab === 'services' ? 'text-gold-400 border-b-2 border-gold-400' : 'text-cream/50 hover:text-cream'}`}>
          Favorite Services ({services.length})
        </button>
        <button onClick={() => setActiveTab('therapists')} className={`px-4 py-2.5 text-sm font-medium transition-all rounded-t-lg ${activeTab === 'therapists' ? 'text-gold-400 border-b-2 border-gold-400' : 'text-cream/50 hover:text-cream'}`}>
          Favorite Therapists ({therapists.length})
        </button>
      </div>

      {activeTab === 'services' && (
        services.length === 0 ? (
          <div className="glass-card p-16 text-center">
            <Heart size={48} className="text-cream/20 mx-auto mb-4" />
            <h2 className="font-display text-xl text-cream font-semibold mb-2">No saved services</h2>
            <p className="text-cream/50 text-sm mb-6">Save services you love to book them later</p>
            <Link href="/services" className="btn-gold text-sm">Explore Services</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
            {services.map(item => (
              <div key={item.id} className="glass-card overflow-hidden group flex flex-col sm:flex-row">
                <div className="relative h-40 sm:w-36 sm:h-auto overflow-hidden shrink-0">
                  <img src={item.img} alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-cream">{item.name}</h3>
                      <p className="text-gold-400 text-xs">{item.category}</p>
                    </div>
                    <button onClick={() => removeService(item.id)}
                      className="text-cream/30 hover:text-red-400 transition-colors p-1 shrink-0">
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-cream/50 mb-4 mt-auto">
                    <span className="flex items-center gap-1"><Clock size={12} className="text-gold-400" />{item.duration} min</span>
                    <span className="flex items-center gap-1"><IndianRupee size={12} className="text-gold-400" />{item.price.toLocaleString('en-IN')}</span>
                  </div>
                  <Link href="/booking"
                    className="w-full text-center py-2 rounded-lg bg-gold-400/10 border border-gold-400/30 text-gold-400 text-sm hover:bg-gold-400/20 transition-all font-medium">
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {activeTab === 'therapists' && (
        therapists.length === 0 ? (
          <div className="glass-card p-16 text-center">
            <Heart size={48} className="text-cream/20 mx-auto mb-4" />
            <h2 className="font-display text-xl text-cream font-semibold mb-2">No favorite therapists</h2>
            <p className="text-cream/50 text-sm mb-6">Save your preferred experts</p>
            <Link href="/therapists" className="btn-gold text-sm">View Staff</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {therapists.map(item => (
              <div key={item.id} className="glass-card p-5 flex items-center gap-5">
                <img src={item.img} alt={item.name} className="w-16 h-16 rounded-full object-cover border-2 border-gold-400/30" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-cream">{item.name}</h3>
                  <p className="text-xs text-cream/60">{item.role}</p>
                  <p className="text-gold-400 text-xs mt-1">★ {item.rating} Rating</p>
                </div>
                <button onClick={() => removeTherapist(item.id)} className="text-cream/30 hover:text-red-400 p-2">
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  )
}
