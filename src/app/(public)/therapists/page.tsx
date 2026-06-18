'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Star, Award, ChevronRight, Filter } from 'lucide-react'

const therapists = [
  { name: 'Priya Sharma', category: 'Spa Specialist', role: 'Senior Spa Therapist', exp: 12, rating: 4.9, reviews: 328, specialties: ['Hot Stone Massage', 'Ayurvedic Therapy', 'Deep Tissue Massage', 'Aromatherapy'], certs: ['CIDESCO Certified', 'CIBTAC Diploma', 'Ayurveda Practitioner'], bio: 'With over 12 years of expertise in holistic healing, Priya brings ancient wisdom and modern techniques together for transformative spa experiences. Her signature touch combines rhythmic movements with precise pressure to dissolve tension entirely.', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1000&q=80' },
  { name: 'Meera Kapoor', category: 'Skin Specialist', role: 'Skin Care Expert', exp: 9, rating: 4.8, reviews: 245, specialties: ['Anti-Aging Facial', 'Hydra Facial', 'Chemical Peels', 'Microdermabrasion'], certs: ['ITEC Certified', 'Advanced Aesthetics Diploma'], bio: 'Meera\'s passion for skin science has helped hundreds of clients achieve their skin goals through personalized, evidence-based treatments. She believes in nurturing the skin\'s natural barrier while delivering visible, glowing results.', img: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=1000&q=80' },
  { name: 'Kavita Nair', category: 'Hair Specialist', role: 'Master Hair Stylist', exp: 15, rating: 4.9, reviews: 412, specialties: ['Balayage', 'Keratin Treatment', 'Bridal Styling', 'Precision Cutting'], certs: ['Vidal Sassoon Alumni', 'L\'Oreal Professional Certified'], bio: 'A visionary stylist who transforms hair into art. Kavita\'s 15 years of mastery makes her the go-to expert for luxury hair transformations, ensuring every client leaves feeling empowered and beautiful.', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=1000&q=80' },
  { name: 'Ritu Gupta', category: 'Beauty Specialist', role: 'Beauty & Makeup Artist', exp: 8, rating: 4.7, reviews: 189, specialties: ['Bridal Makeup', 'Airbrush Makeup', 'Nail Art', 'Lash Extensions'], certs: ['MAC Pro Certified', 'NAHA Graduate'], bio: 'Ritu\'s artistic eye and precise technique create flawless looks that celebrate each client\'s unique beauty. From subtle elegance to high-fashion glamour, her work is tailored to your most special moments.', img: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=1000&q=80' },
  { name: 'Sunita Rao', category: 'Spa Specialist', role: 'Wellness Consultant', exp: 11, rating: 4.8, reviews: 201, specialties: ['Reflexology', 'Shirodhara', 'Body Wrap', 'Swedish Massage'], certs: ['International Reflexology Cert.', 'Panchakarma Specialist'], bio: 'Sunita blends traditional Indian wellness practices with contemporary spa techniques to deliver deeply restorative healing experiences. Her sessions are designed to align body, mind, and spirit.', img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1000&q=80' },
  { name: 'Anjali Iyer', category: 'Hair Specialist', role: 'Hair & Scalp Expert', exp: 7, rating: 4.6, reviews: 143, specialties: ['Scalp Treatment', 'Hair Botox', 'Color Correction', 'Trichology Analysis'], certs: ['Wella Master Colorist', 'Trichology Certificate'], bio: 'Anjali specializes in hair restoration and color artistry, bringing life back to damaged hair with her signature treatment protocols. Her clinical approach ensures long-lasting hair health.', img: 'https://images.unsplash.com/photo-1532910404247-7ee9488d7292?w=1000&q=80' },
]

const categories = ['All', 'Spa Specialist', 'Skin Specialist', 'Hair Specialist', 'Beauty Specialist']

export default function TherapistsPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredTherapists = therapists.filter(t => 
    activeCategory === 'All' ? true : t.category === activeCategory
  )

  return (
    <div className="min-h-screen bg-black text-cream selection:bg-gold-500/30">
      {/* Editorial Hero Section */}
      <div className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1600&q=80" 
            alt="Spa Therapists" 
            className="w-full h-full object-cover opacity-30 scale-110 animate-slow-zoom" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        </div>
        
        {/* Subtle decorative grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        <div className="relative z-10 text-center px-4 max-w-5xl mt-24 flex flex-col items-center">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-gold-400/50 to-gold-400 mb-8" />
          <span className="font-luxury tracking-[0.5em] text-gold-400 text-[10px] md:text-xs uppercase mb-6 block">The Inner Circle</span>
          <h1 className="font-display text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cream via-white to-cream/70 mb-8 leading-none tracking-tight">The Masters</h1>
          <p className="text-cream/50 text-xl md:text-3xl font-light leading-relaxed max-w-3xl mx-auto italic">
            "Where artistry meets healing. Discover the hands that craft perfection."
          </p>
        </div>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-2xl border-b border-white/5 py-6 mb-32 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 text-gold-400">
              <div className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
              <span className="font-luxury text-[10px] tracking-[0.3em] uppercase">Filter by Expertise</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-full text-[10px] tracking-[0.2em] uppercase transition-all duration-500 ${
                    activeCategory === cat 
                      ? 'text-black bg-gold-400 shadow-[0_0_20px_rgba(212,175,55,0.3)] scale-105' 
                      : 'text-cream/40 border border-white/5 hover:text-cream hover:border-gold-400/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Profiles List */}
      <div className="max-w-[90rem] mx-auto px-4 sm:px-8 lg:px-16 space-y-40">
        {filteredTherapists.map((t, index) => {
          const isEven = index % 2 === 0
          // Get initials for background watermark
          const initials = t.name.split(' ').map(n => n[0]).join('')
          
          return (
            <section key={t.name} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 lg:gap-32 items-center group relative`}>
              
              {/* Massive Watermark Text */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 text-center pointer-events-none overflow-hidden opacity-[0.02] select-none z-0">
                <span className="font-display text-[20rem] md:text-[30rem] font-bold tracking-tighter whitespace-nowrap leading-none">
                  {initials}
                </span>
              </div>

              {/* Image Column */}
              <div className="w-full lg:w-[45%] relative z-10">
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img 
                    src={t.img} 
                    alt={t.name} 
                    className="w-full h-full object-cover grayscale brightness-75 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 transition-all duration-[2s] ease-[cubic-bezier(0.25,1,0.5,1)]"
                  />
                  {/* Luxury Inner Border */}
                  <div className="absolute inset-6 border border-white/10 opacity-50 group-hover:opacity-100 group-hover:border-gold-400/40 group-hover:inset-4 transition-all duration-1000 z-20" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000" />
                </div>

                {/* Floating Experience Badge (Minimalist) */}
                <div className={`absolute -bottom-8 ${isEven ? '-right-8' : '-left-8'} bg-black p-8 border border-white/5 shadow-2xl z-30 hidden md:flex items-center gap-4`}>
                  <span className="font-display text-5xl text-transparent bg-clip-text bg-gradient-to-br from-gold-300 to-gold-600">{t.exp}</span>
                  <div className="w-px h-10 bg-white/10" />
                  <span className="font-luxury text-[9px] tracking-[0.3em] text-cream/40 uppercase leading-loose">Years<br/>Mastery</span>
                </div>
              </div>

              {/* Typography / Content Column */}
              <div className="w-full lg:w-[55%] relative z-10">
                <div className={`max-w-xl ${isEven ? 'mr-auto' : 'ml-auto'}`}>
                  
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-px w-8 bg-gold-400" />
                    <span className="text-[10px] font-luxury tracking-[0.4em] uppercase text-gold-400/80">
                      {t.category}
                    </span>
                  </div>
                  
                  <h2 className="font-display text-5xl md:text-7xl text-cream mb-2 tracking-tight group-hover:text-gold-100 transition-colors duration-700">{t.name}</h2>
                  <p className="text-2xl text-cream/40 font-light italic mb-10">{t.role}</p>

                  <div className="flex items-center gap-6 mb-10 pb-10 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <Star size={16} className="text-gold-400 fill-gold-400" />
                      <span className="text-lg font-medium text-cream">{t.rating}</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-sm tracking-widest text-cream/30 uppercase">{t.reviews} Reviews</span>
                  </div>

                  <p className="text-cream/70 text-xl leading-[1.8] mb-12 font-light">
                    {t.bio}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-16">
                    <div>
                      <h4 className="font-luxury text-[10px] tracking-[0.3em] text-gold-400/60 uppercase mb-6 flex items-center gap-3">
                        <div className="w-1 h-1 bg-gold-400/60 rotate-45" /> Signature
                      </h4>
                      <ul className="space-y-4">
                        {t.specialties.map(s => (
                          <li key={s} className="text-sm text-cream/60 tracking-wide font-light flex items-center gap-3">
                            <div className="w-3 h-px bg-white/10" /> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-luxury text-[10px] tracking-[0.3em] text-gold-400/60 uppercase mb-6 flex items-center gap-3">
                        <div className="w-1 h-1 bg-gold-400/60 rotate-45" /> Credentials
                      </h4>
                      <ul className="space-y-4">
                        {t.certs.map(c => (
                          <li key={c} className="text-sm text-cream/60 tracking-wide font-light flex items-start gap-3">
                            <Award size={14} className="text-gold-400/50 shrink-0 mt-0.5" /> {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link 
                    href={`/booking?therapist=${encodeURIComponent(t.name)}`} 
                    className="inline-flex items-center gap-6 group/link"
                  >
                    <div className="w-14 h-14 rounded-full border border-gold-400/20 flex items-center justify-center group-hover/link:bg-gold-400 transition-all duration-500">
                      <ChevronRight size={18} className="text-gold-400 group-hover/link:text-black group-hover/link:translate-x-1 transition-transform" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-luxury tracking-[0.3em] uppercase text-[11px] text-cream/40 mb-1">Schedule with {t.name.split(' ')[0]}</span>
                      <span className="text-sm font-medium text-cream group-hover/link:text-gold-400 transition-colors">Request Appointment</span>
                    </div>
                  </Link>
                </div>
              </div>
              
            </section>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredTherapists.length === 0 && (
        <div className="text-center py-40">
          <p className="text-cream/30 text-2xl font-light tracking-widest">No artisans found in this category.</p>
        </div>
      )}

      {/* Editorial Footer CTA */}
      <div className="mt-40 relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070" 
            alt="Spa Ambience" 
            className="w-full h-full object-cover opacity-20" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <div className="w-px h-24 bg-gradient-to-b from-transparent to-gold-400 mx-auto mb-10" />
          <h2 className="font-display text-5xl md:text-7xl text-cream font-bold mb-8">
            Begin The Journey
          </h2>
          <p className="text-cream/50 max-w-lg mx-auto mb-12 text-xl font-light leading-relaxed">
            Allow our concierge to perfectly pair you with the artisan best suited for your transformation.
          </p>
          <div className="flex justify-center">
            <Link href="/booking" className="group relative inline-flex items-center justify-center px-12 py-5 overflow-hidden">
              <div className="absolute inset-0 w-full h-full border border-gold-400/30 group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 w-full h-full bg-gold-400/5 group-hover:bg-gold-400/10 transition-colors duration-500" />
              <span className="relative font-luxury tracking-[0.3em] text-xs text-gold-400 uppercase">Consult Concierge</span>
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}
