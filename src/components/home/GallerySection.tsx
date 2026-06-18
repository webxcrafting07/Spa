import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const galleryImages = [
  { url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80', span: 'col-span-2 row-span-2', alt: 'Luxury Spa Room' },
  { url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80', span: '', alt: 'Facial Treatment' },
  { url: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=400&q=80', span: '', alt: 'Hair Styling' },
  { url: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&q=80', span: '', alt: 'Massage' },
  { url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=400&q=80', span: '', alt: 'Nail Art' },
  { url: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80', span: 'col-span-2', alt: 'Spa Pool' },
]

export default function GallerySection() {
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-label">Our Space</span>
          <div className="gold-divider" />
          <h2 className="section-title mt-4">Experience The Ambiance</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {galleryImages.map(({ url, span, alt }, i) => (
            <div key={i} className={`relative overflow-hidden rounded-xl ${span} group`}>
              <img src={url} alt={alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-dark-900/0 group-hover:bg-dark-900/40 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-cream text-sm font-medium bg-dark-900/60 px-4 py-2 rounded-full">{alt}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/gallery" className="btn-outline-gold inline-flex items-center gap-2">
            View Full Gallery <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
