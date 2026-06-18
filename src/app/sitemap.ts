import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'https://auraspa.in'
  const now = new Date()

  const staticRoutes = [
    '', '/services', '/therapists', '/gallery', '/blog',
    '/about', '/contact', '/membership', '/booking', '/login', '/register',
  ].map(route => ({
    url: `${base}${route}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  const blogSlugs = [
    'glowing-skin-winter-secrets', 'ultimate-hair-spa-guide',
    'hot-stone-massage-benefits', 'bridal-skincare-timeline',
    'aromatherapy-wellbeing', 'keratin-treatment-guide',
  ]

  const blogRoutes = blogSlugs.map(slug => ({
    url: `${base}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...blogRoutes]
}
