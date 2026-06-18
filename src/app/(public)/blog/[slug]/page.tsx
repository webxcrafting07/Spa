import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, User, ArrowRight } from 'lucide-react'

const posts: Record<string, any> = {
  'glowing-skin-winter-secrets': {
    title: '10 Secrets to Glowing Skin This Winter',
    category: 'Skin Care', author: 'Meera Kapoor', date: 'December 12, 2024', readTime: '5 min',
    img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1600&q=80',
    content: `Winter can be brutal on your skin. The cold air strips moisture, the heating indoors dehydrates, and your complexion can look dull and lackluster. But it doesn't have to be that way.

## 1. Double Up on Moisturiser
Switch from your light summer gel to a rich, oil-based moisturiser. Look for ingredients like hyaluronic acid, ceramides, and shea butter. Apply within 60 seconds of stepping out of the shower to lock in moisture.

## 2. Never Skip SPF
UV rays don't take a winter holiday. Even on cloudy days, UVA rays penetrate clouds and cause premature aging. A broad-spectrum SPF 30+ is non-negotiable year-round.

## 3. Lukewarm Showers Only
We know — hot showers feel amazing in winter. But they strip your skin's natural oils. Switch to lukewarm water and your skin will thank you within a week.

## 4. Professional Hydra Facials
Winter is the perfect time for professional skin treatments. Our signature Gold Facial and Hydra Facial at Aura use medical-grade hyaluronic acid and customised serums to deeply hydrate and restore your glow.

## 5. Consistency Over Everything
The best skincare routine is one you actually do every day. Keep it simple: cleanse, treat (serum), moisturise, SPF in the morning. Your skin transforms with consistency, not complexity.`,
  },
  'ultimate-hair-spa-guide': {
    title: 'The Ultimate Guide to Hair Spa Treatments',
    category: 'Hair Care', author: 'Kavita Nair', date: 'December 8, 2024', readTime: '7 min',
    img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1600&q=80',
    content: `Your hair endures a lot — heat styling, chemical treatments, environmental pollution, and seasonal changes all take their toll. A professional hair spa is not a luxury; it's essential maintenance for healthy, beautiful hair.

## What Is a Hair Spa?
A hair spa is a deep conditioning treatment that goes beyond regular conditioning. It combines massage, steam, and nutrient-rich products to nourish the scalp, strengthen hair strands, and restore shine and manageability.

## Benefits of Regular Hair Spa
- Deep hydration and moisture restoration
- Reduced breakage and split ends
- Improved scalp health and reduced dandruff
- Enhanced shine and smoothness
- Relaxation through scalp massage (which also stimulates growth)

## What to Expect at Aura
Our signature Hair Spa at Aura begins with a personalised scalp analysis to assess your hair type and specific needs. We then select the ideal treatment formulation — whether that's a protein-rich mask for damaged hair or an Argan oil-infused treatment for frizzy hair.

The process includes a pre-treatment oil massage to stimulate blood flow, a clarifying cleanse to remove buildup, the application of a customized mask, steam therapy to open cuticles, and a final rinse to boost shine.`,
  },
  'hot-stone-massage-benefits': {
    title: 'Why Hot Stone Massage Is The Best Stress Relief',
    category: 'Spa Treatments', author: 'Priya Sharma', date: 'December 3, 2024', readTime: '4 min',
    img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=80',
    content: `Stress manifests physically. It knots our shoulders, tightens our lower backs, and restricts our breathing. While a classic Swedish massage offers great relief, incorporating heat through a Hot Stone Massage takes relaxation to an entirely different, therapeutic level.

## The Power of Volcanic Basalt
Hot stone therapy utilizes smooth, flat, heated stones made of volcanic basalt. These stones are chosen specifically because they retain heat exceptionally well. When placed on key acupressure points along your spine, palms, or stomach, the heat deeply penetrates your muscle tissue.

## Rapid Muscle Relaxation
The primary benefit of heat is that it allows your therapist to manipulate your deep tissues more effectively. The warmth causes your blood vessels to dilate, improving circulation and delivering oxygen to aching muscles. This means tension melts away faster and with less pressure than a standard massage.

## Neurological Decompression
Beyond physical relief, the sensation of warm stones gliding over your skin actively calms your central nervous system. This triggers the release of endorphins and severely reduces cortisol (the stress hormone) levels. Many of our clients fall into a deep, meditative state or even fall asleep during the session.

## Who Is It For?
If you suffer from chronic muscle pain, insomnia, or high-stress corporate lifestyles, this treatment is highly recommended. However, it is always advised to consult with your therapist before the session to customize the temperature and pressure to your absolute comfort.`,
  },
  'bridal-skincare-timeline': {
    title: 'The Perfect Bridal Skincare Timeline',
    category: 'Beauty Tips', author: 'Ritu Gupta', date: 'November 28, 2024', readTime: '8 min',
    img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1600&q=80',
    content: `Your wedding day is one of the most photographed days of your life. Every bride dreams of that effortless, lit-from-within glow, but radiant skin doesn't happen overnight. It requires a strategic approach. Here is the ultimate timeline curated by our master aestheticians.

## 6 Months Before: The Foundation
This is the time to assess and reset. Book a deep consultation with our skincare experts. We will analyze your skin type and begin targeting long-term concerns like hyperpigmentation, acne scarring, or uneven texture.
- Start a strict, personalized daily skincare regimen.
- Begin monthly chemical peels or laser treatments if needed.

## 3 Months Before: The Refinement
Your skin should now be accustomed to your new routine. It’s time to focus on hydration and brightness.
- Switch to gentler professional treatments.
- Schedule bi-weekly hydration facials.
- Focus heavily on your diet—cut down on refined sugars and dairy to prevent unexpected breakouts.

## 1 Month Before: The Glow Up
No more extractions or harsh chemical peels. We only want to nourish and plump the skin.
- Book a signature 24K Gold Facial to boost circulation and elasticity.
- Ensure you are drinking at least 3 liters of water a day.

## 1 Week Before: The Final Polish
Stress levels are peaking, which can wreak havoc on your skin. This week is all about calming and soothing.
- Get a gentle, hydrating oxygen facial.
- Avoid trying ANY new products, including makeup or serums.
- Focus on getting 8 hours of sleep each night.

Aura Luxury Spa offers bespoke Bridal Packages that handle this entire timeline for you, ensuring that when you walk down the aisle, your skin is as flawless as your dress.`,
  },
  'aromatherapy-wellbeing': {
    title: 'How Aromatherapy Transforms Your Mental Wellbeing',
    category: 'Wellness', author: 'Sunita Rao', date: 'November 20, 2024', readTime: '6 min',
    img: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1600&q=80',
    content: `Scent is the most primitive of our senses. It bypasses the logical brain and travels directly to the limbic system, the area of the brain responsible for emotions, memories, and arousal. This is why a simple fragrance can instantly transport you to a childhood memory—and it is exactly why aromatherapy is so powerfully effective.

## The Science of Scent
When you inhale essential oils, molecules enter your nasal cavity and stimulate the olfactory nerves. These nerves send immediate signals to the amygdala, the emotional center of the brain. Depending on the oil used, this can trigger a release of serotonin (the happiness hormone) or GABA (a calming neurotransmitter).

## Lavender: The Ultimate Calmer
Lavender is extensively researched for its anxiolytic (anti-anxiety) properties. Studies have shown that inhaling lavender before sleep increases the percentage of deep, restorative sleep. It is our go-to oil for clients struggling with insomnia or severe stress.

## Citrus Oils: The Uplifters
Lemon, sweet orange, and bergamot are incredibly effective at combating lethargy and mild depression. The crisp, bright notes stimulate the brain, increasing alertness and fostering a positive, energetic mood.

## Integrating It Into Your Spa Experience
At Aura, aromatherapy is not just an add-on; it is woven into the fabric of your experience. From the moment you enter our sanctuary, curated essential oil blends are diffused through the air. During massages, we allow you to blindly select an oil blend, trusting that your body will naturally gravitate toward the scent it currently needs for balance.`,
  },
  'keratin-treatment-guide': {
    title: 'Keratin Treatment: Everything You Need to Know',
    category: 'Hair Care', author: 'Anjali Iyer', date: 'November 15, 2024', readTime: '5 min',
    img: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=1600&q=80',
    content: `If you battle daily frizz, spend hours straightening your hair, or simply wish for a smoother, more manageable mane, a Keratin treatment might seem like a miracle. But what exactly is it, and is it right for your hair type? Our master stylists break it down.

## Understanding Keratin
Keratin is a protein that naturally occurs in your hair, skin, and nails. Over time, due to sun exposure, heat styling, and chemical coloring, your hair loses keratin, resulting in porous, frizzy, and brittle strands. A professional keratin treatment artificially injects this protein back into the porous parts of your hair follicle.

## The Process
The treatment involves applying a keratin-rich liquid solution to your hair, which is then blow-dried and flat-ironed to seal the protein into the cuticle. The result is hair that looks incredibly glossy, feels silky, and is completely resistant to humidity.

## Who Benefits the Most?
If you have thick, curly, or notoriously frizzy hair, the results will be life-changing. It cuts blow-drying time in half and completely eliminates the need for daily flat-ironing. However, if your hair is extremely fine or severely damaged from bleach, a softer 'botox' hair treatment might be a safer alternative.

## Crucial Aftercare
The longevity of your keratin treatment (usually 3 to 5 months) depends entirely on your aftercare:
- Wait 72 hours before washing your hair or tying it back.
- Switch exclusively to sulphate-free and sodium-chloride-free shampoos, as salt and sulphates strip the keratin prematurely.
- Minimize exposure to chlorine and salt water.

Book a consultation at The Hair Studio at Aura to see if a Keratin treatment is the key to your perfect hair days.`,
  }
}

export async function generateStaticParams() {
  return Object.keys(posts).map(slug => ({ slug }))
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug]

  if (!post) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-cream mb-4">Article Not Found</h1>
          <Link href="/blog" className="text-gold-400 hover:underline">Return to The Beauty Journal</Link>
        </div>
      </div>
    )
  }

  const paragraphs = post.content.split('\n\n')

  return (
    <div className="min-h-screen bg-black text-cream selection:bg-gold-500/30 pb-24">
      
      {/* Cinematic Editorial Hero */}
      <div className="relative h-[60vh] min-h-[500px] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={post.img} 
            alt={post.title} 
            className="w-full h-full object-cover opacity-30 transform scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mt-32">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold-400 hover:text-white transition-colors mb-8">
            <ArrowLeft size={12} /> The Beauty Journal
          </Link>
          
          <div className="mb-6">
            <span className="bg-white/5 border border-white/10 backdrop-blur-md text-gold-400 text-[10px] uppercase tracking-[0.3em] font-bold px-4 py-2 rounded-full">
              {post.category}
            </span>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl text-cream font-bold mb-8 leading-tight tracking-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] uppercase tracking-widest text-cream/50">
            <span className="flex items-center gap-2"><User size={14} className="text-gold-400" />{post.author}</span>
            <span className="flex items-center gap-2"><Calendar size={14} className="text-gold-400" />{post.date}</span>
            <span className="flex items-center gap-2"><Clock size={14} className="text-gold-400" />{post.readTime} read</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        
        {/* Content Section */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold-400/5 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="prose-luxury relative z-10 text-lg">
            {paragraphs.map((para: string, i: number) => {
              if (para.startsWith('## ')) {
                return <h2 key={i} className="font-display text-3xl text-cream font-bold mt-16 mb-6">{para.replace('## ', '')}</h2>
              }
              if (para.startsWith('- ')) {
                const items = para.split('\n').filter(l => l.startsWith('- '))
                return (
                  <ul key={i} className="space-y-3 mb-8 ml-2 text-cream/60 font-light">
                    {items.map((item, j) => (
                      <li key={j} className="flex gap-4">
                        <span className="text-gold-400 mt-1.5">•</span>
                        <span>{item.replace('- ', '')}</span>
                      </li>
                    ))}
                  </ul>
                )
              }
              return <p key={i} className="text-cream/60 leading-relaxed mb-8 font-light">{para}</p>
            })}
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-16" />

          {/* Luxury Author Card */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <div className="w-20 h-20 rounded-full border border-gold-400/30 flex items-center justify-center relative shrink-0">
              <div className="absolute inset-0 rounded-full bg-gold-400/10" />
              <span className="text-gold-400 font-display text-3xl relative z-10">{post.author[0]}</span>
            </div>
            <div>
              <p className="text-[10px] text-gold-400 uppercase tracking-widest font-bold mb-1">Written By</p>
              <p className="font-display text-2xl text-cream mb-2">{post.author}</p>
              <p className="text-cream/50 text-sm font-light leading-relaxed">
                Expert therapist and resident wellness contributor at Aura Luxury Spa. Passionate about holistic treatments and advanced skincare science.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Footer */}
        <div className="mt-12 text-center">
          <Link href="/booking" className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold tracking-[0.2em] uppercase text-xs transition-all duration-500 bg-gold-400 text-black hover:bg-gold-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] group">
            Book Consultation <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}
