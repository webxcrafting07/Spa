'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Clock, ArrowRight, Mail } from 'lucide-react'

const categories = ['All', 'Hair Care', 'Skin Care', 'Wellness', 'Beauty Tips', 'Spa Treatments']

const posts = [
  { slug: 'glowing-skin-winter-secrets', title: '10 Secrets to Glowing Skin This Winter', excerpt: 'Discover the expert-approved winter skincare routine that keeps your skin radiant, hydrated, and glowing even in the harshest weather conditions.', category: 'Skin Care', date: 'Dec 12, 2024', readTime: '5 min', author: 'Meera Kapoor', img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80', featured: true },
  { slug: 'ultimate-hair-spa-guide', title: 'The Ultimate Guide to Hair Spa Treatments', excerpt: 'Everything you need to know about hair spa — from choosing the right treatment for your hair type to maximising the long-term benefits.', category: 'Hair Care', date: 'Dec 8, 2024', readTime: '7 min', author: 'Kavita Nair', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80' },
  { slug: 'hot-stone-massage-benefits', title: 'Why Hot Stone Massage Is The Best Stress Relief', excerpt: 'The ancient healing power of volcanic basalt stones combined with modern massage techniques for deep relaxation and muscle recovery.', category: 'Spa Treatments', date: 'Dec 3, 2024', readTime: '4 min', author: 'Priya Sharma', img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80' },
  { slug: 'bridal-skincare-timeline', title: 'The Perfect Bridal Skincare Timeline', excerpt: 'A month-by-month guide to achieve your most radiant skin on your wedding day, curated by our expert aestheticians.', category: 'Beauty Tips', date: 'Nov 28, 2024', readTime: '8 min', author: 'Ritu Gupta', img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80' },
  { slug: 'aromatherapy-wellbeing', title: 'How Aromatherapy Transforms Your Mental Wellbeing', excerpt: 'Science-backed insights into how essential oils and aromatherapy can reduce anxiety, improve sleep, and boost overall mood.', category: 'Wellness', date: 'Nov 20, 2024', readTime: '6 min', author: 'Sunita Rao', img: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80' },
  { slug: 'keratin-treatment-guide', title: 'Keratin Treatment: Everything You Need to Know', excerpt: 'Is a keratin treatment right for you? Our master stylist explains the process, benefits, aftercare, and what to expect.', category: 'Hair Care', date: 'Nov 15, 2024', readTime: '5 min', author: 'Anjali Iyer', img: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&q=80' },
]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const filteredPosts = posts.filter(p => activeCategory === 'All' || p.category === activeCategory)
  const featured = filteredPosts.find(p => p.featured) || filteredPosts[0]
  const rest = filteredPosts.filter(p => p.slug !== featured?.slug)

  if (!isMounted) return null

  return (
    <div className="min-h-screen bg-black text-cream selection:bg-gold-500/30 pb-24">
      
      {/* Editorial Hero */}
      <div className="relative h-[50vh] min-h-[400px] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=1600&q=80" 
            alt="Editorial Background" 
            className="w-full h-full object-cover opacity-20 grayscale" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mt-24">
          <span className="font-luxury tracking-[0.5em] text-gold-400 text-[10px] md:text-xs uppercase mb-6 block">Editorial</span>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cream via-white to-cream/70 mb-6 leading-none tracking-tight">
            The Beauty Journal
          </h1>
          <p className="text-cream/50 text-lg md:text-xl font-light leading-relaxed max-w-xl mx-auto italic">
            "Insights, trends, and secrets from the world of luxury wellness."
          </p>
        </div>
      </div>

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Interactive Category Filters */}
        <div className="sticky top-20 z-30 flex justify-center mb-16">
          <div className="inline-flex items-center gap-1 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl overflow-x-auto max-w-full hide-scrollbar">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-xs tracking-widest uppercase transition-all duration-500 whitespace-nowrap ${
                  activeCategory === cat 
                    ? 'bg-gold-400 text-black font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)]' 
                    : 'text-cream/60 hover:text-cream hover:bg-white/5'
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-[500px]">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-cream/40 text-lg italic">No articles found in this category.</p>
            </div>
          ) : (
            <>
              {/* Featured Cover Story */}
              {featured && (
                <Link href={`/blog/${featured.slug}`} className="group block relative rounded-[2rem] overflow-hidden mb-12 border border-white/10 bg-[#0a0a0a]">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative h-96 lg:h-auto overflow-hidden">
                      <img src={featured.img} alt={featured.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                      <div className="absolute top-6 left-6">
                        <span className="bg-black/50 backdrop-blur-md border border-white/10 text-gold-400 text-[10px] uppercase tracking-[0.3em] font-bold px-4 py-2 rounded-full">
                          Cover Story
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-8 md:p-16 flex flex-col justify-center relative">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.03),transparent)] pointer-events-none" />
                      
                      <span className="text-[10px] text-gold-400 uppercase tracking-[0.4em] font-bold mb-6 block">
                        {featured.category}
                      </span>
                      
                      <h2 className="font-display text-4xl md:text-5xl text-cream font-bold mb-6 group-hover:text-gold-400 transition-colors leading-tight">
                        {featured.title}
                      </h2>
                      
                      <p className="text-cream/50 text-lg leading-relaxed mb-10 font-light">
                        {featured.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between border-t border-white/10 pt-8 mt-auto">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-xs text-gold-400 font-bold bg-white/[0.02]">
                            {featured.author[0]}
                          </div>
                          <div>
                            <p className="text-sm text-cream font-medium tracking-wide">{featured.author}</p>
                            <p className="text-[10px] text-cream/40 uppercase tracking-widest">{featured.date} · {featured.readTime} read</p>
                          </div>
                        </div>
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-gold-400 group-hover:border-gold-400 transition-all duration-500">
                          <ArrowRight size={18} className="text-gold-400 group-hover:text-black transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Standard Articles Grid */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map(post => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="group block relative rounded-[2rem] overflow-hidden border border-white/5 bg-[#0a0a0a] hover:border-white/20 transition-all duration-500 hover:-translate-y-2">
                      <div className="relative h-60 overflow-hidden">
                        <img src={post.img} alt={post.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-80" />
                        <div className="absolute top-4 left-4">
                          <span className="bg-black/50 backdrop-blur-md border border-white/10 text-gold-400 text-[9px] uppercase tracking-[0.3em] font-bold px-3 py-1.5 rounded-full">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-8 pt-4">
                        <div className="flex items-center gap-2 text-[10px] text-cream/40 uppercase tracking-widest mb-4">
                          <Clock size={12} className="text-gold-400" />
                          <span>{post.readTime} read</span>
                        </div>
                        
                        <h3 className="font-display text-2xl font-bold text-cream group-hover:text-gold-400 transition-colors leading-tight mb-4 line-clamp-2">
                          {post.title}
                        </h3>
                        
                        <p className="text-cream/50 text-sm leading-relaxed line-clamp-2 mb-8 font-light">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between border-t border-white/5 pt-6">
                          <p className="text-[10px] text-cream/40 uppercase tracking-widest">{post.author} · {post.date}</p>
                          <ArrowRight size={14} className="text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0 duration-300" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-32 relative rounded-[3rem] overflow-hidden border border-white/10 bg-[#0a0a0a] p-12 lg:p-20 text-center">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold-400/5 blur-[120px] rounded-full pointer-events-none" />
          </div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <Mail size={40} className="text-gold-400 mx-auto mb-6" strokeWidth={1} />
            <h2 className="font-display text-4xl md:text-5xl text-cream mb-4">Join The Inner Circle</h2>
            <p className="text-cream/50 mb-10 text-lg font-light leading-relaxed">
              Subscribe to receive exclusive insights, wellness tips, and early access to our seasonal offers directly in your inbox.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4 text-cream placeholder-cream/30 focus:outline-none focus:border-gold-400 focus:bg-white/10 transition-all"
                required
              />
              <button 
                type="submit"
                className="px-8 py-4 rounded-full font-bold tracking-[0.2em] uppercase text-xs transition-all duration-500 bg-gold-400 text-black hover:bg-gold-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p className="text-[10px] text-cream/30 uppercase tracking-widest mt-6">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
