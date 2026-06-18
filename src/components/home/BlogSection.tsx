import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'

const posts = [
  { title: '10 Secrets to Glowing Skin This Winter', category: 'Skin Care', date: 'Dec 12, 2024', readTime: '5 min', img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80', slug: 'glowing-skin-winter-secrets' },
  { title: 'The Ultimate Guide to Hair Spa Treatments', category: 'Hair Care', date: 'Dec 8, 2024', readTime: '7 min', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80', slug: 'ultimate-hair-spa-guide' },
  { title: 'Why Hot Stone Massage Is The Best Stress Relief', category: 'Wellness', date: 'Dec 3, 2024', readTime: '4 min', img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80', slug: 'hot-stone-massage-stress-relief' },
]

export default function BlogSection() {
  return (
    <section className="py-24 sm:py-32 bg-dark-800/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-label">Beauty Journal</span>
          <div className="gold-divider" />
          <h2 className="section-title mt-4">Latest From Our Blog</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="glass-card-hover overflow-hidden group block">
              <div className="h-52 overflow-hidden">
                <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gold-400 font-medium bg-gold-400/10 px-3 py-1 rounded-full">{post.category}</span>
                  <div className="flex items-center gap-1 text-xs text-cream/40">
                    <Clock size={12} />
                    {post.readTime} read
                  </div>
                </div>
                <h3 className="font-display text-lg font-semibold text-cream group-hover:text-gold-400 transition-colors leading-snug mb-2">
                  {post.title}
                </h3>
                <p className="text-xs text-cream/40">{post.date}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/blog" className="btn-outline-gold inline-flex items-center gap-2">
            Read All Articles <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
