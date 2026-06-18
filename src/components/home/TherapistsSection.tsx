import Link from 'next/link'
import { Star, ArrowRight } from 'lucide-react'

const therapists = [
  { name: 'Priya Sharma', role: 'Master Therapist', exp: '12 Years', rating: 4.9, reviews: 328, speciality: 'Ayurvedic & Hot Stone', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80' },
  { name: 'Meera Kapoor', role: 'Skin Care Expert', exp: '9 Years', rating: 4.8, reviews: 245, speciality: 'Anti-Aging & Facials', img: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=400&q=80' },
  { name: 'Kavita Nair', role: 'Hair Stylist', exp: '15 Years', rating: 4.9, reviews: 412, speciality: 'Hair Color & Styling', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80' },
  { name: 'Ritu Gupta', role: 'Beauty Artist', exp: '8 Years', rating: 4.7, reviews: 189, speciality: 'Bridal & Makeup', img: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&q=80' },
]

export default function TherapistsSection() {
  return (
    <section className="py-24 bg-dark-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-label">Meet The Team</span>
          <div className="gold-divider" />
          <h2 className="section-title mt-4">Our Expert Therapists</h2>
          <p className="text-cream/60 max-w-xl mx-auto mt-4">
            Each of our therapists is a certified specialist with years of experience delivering transformative results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {therapists.map((t) => (
            <div key={t.name} className="glass-card-hover overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
                <img src={t.img} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 overlay-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link href="/booking" className="w-full btn-gold text-xs text-center py-2">
                    Book Session
                  </Link>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-cream">{t.name}</h3>
                <p className="text-gold-400 text-sm mb-1">{t.role}</p>
                <p className="text-cream/50 text-xs mb-3">{t.speciality}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star size={13} className="text-gold-400 fill-gold-400" />
                    <span className="text-sm font-semibold text-cream">{t.rating}</span>
                    <span className="text-xs text-cream/40">({t.reviews})</span>
                  </div>
                  <span className="text-xs text-cream/50">{t.exp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/therapists" className="btn-outline-gold inline-flex items-center gap-2">
            Meet All Therapists <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
