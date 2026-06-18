import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create Super Admin
  const adminPassword = await bcrypt.hash('Admin@123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@auraspa.in' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@auraspa.in',
      password: adminPassword,
      role: 'SUPER_ADMIN',
      phone: '+91 98765 00000',
    },
  })
  console.log('✅ Admin created:', admin.email)

  // Create demo customer
  const custPassword = await bcrypt.hash('Customer@123', 12)
  const customer = await prisma.user.upsert({
    where: { email: 'demo@auraspa.in' },
    update: {},
    create: {
      name: 'Ananya Reddy',
      email: 'demo@auraspa.in',
      password: custPassword,
      role: 'CUSTOMER',
      phone: '+91 98765 11111',
      membershipTier: 'GOLD',
      rewardPoints: 1240,
    },
  })
  console.log('✅ Demo customer created:', customer.email)

  // Create Therapists
  const therapistPassword = await bcrypt.hash('Therapist@123', 12)
  const therapists = [
    { email: 'meera@auraspa.in', name: 'Meera Kapoor', role: 'Skin Care Expert', exp: 8, rating: 4.9 },
    { email: 'kavita@auraspa.in', name: 'Kavita Nair', role: 'Hair Stylist', exp: 12, rating: 4.8 },
    { email: 'priya@auraspa.in', name: 'Priya Sharma', role: 'Massage Therapist', exp: 6, rating: 4.7 }
  ]

  for (const t of therapists) {
    const user = await prisma.user.upsert({
      where: { email: t.email },
      update: {},
      create: {
        name: t.name,
        email: t.email,
        password: therapistPassword,
        role: 'THERAPIST',
        phone: '+91 98765 2222' + Math.floor(Math.random() * 9),
        staffProfile: {
          create: {
            bio: `Expert ${t.role} with ${t.exp} years of experience.`,
            experience: t.exp,
            specializations: [t.role],
            rating: t.rating,
            totalReviews: 45
          }
        }
      },
    })
    console.log('✅ Therapist created:', user.email)
  }

  // Service categories
  const categories = [
    { name: 'Hair Services', slug: 'hair-services', icon: '✂️' },
    { name: 'Spa Services', slug: 'spa-services', icon: '🌿' },
    { name: 'Skin Care', slug: 'skin-care', icon: '✨' },
    { name: 'Beauty Services', slug: 'beauty-services', icon: '💄' },
  ]

  for (const cat of categories) {
    const createdCat = await prisma.serviceCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })

    // Seed services for this category
    let services: any[] = []
    if (cat.slug === 'hair-services') {
      services = [
        { name: 'Signature Haircut', duration: 60, price: 1500, description: 'Bespoke styling tailored to your face shape' },
        { name: 'Keratin Treatment', duration: 120, price: 5500, description: 'Premium smoothing and frizz control' },
        { name: 'Balayage & Color', duration: 180, price: 6500, description: 'Artisanal hand-painted color techniques' },
        { name: 'Scalp Detox Spa', duration: 90, price: 2500, description: 'Deep cleansing and revitalizing therapy' },
      ]
    } else if (cat.slug === 'spa-services') {
      services = [
        { name: 'Aroma Relaxation', duration: 60, price: 3500, description: 'Gentle therapy using premium essential oils' },
        { name: 'Deep Tissue Massage', duration: 90, price: 4500, description: 'Intensive muscle recovery and tension release' },
        { name: 'Hot Stone Therapy', duration: 90, price: 5000, description: 'Volcanic stones for deep warmth and healing' },
        { name: 'Couples Retreat', duration: 120, price: 8500, description: 'Synchronized massage in a private suite' },
      ]
    } else if (cat.slug === 'skin-care') {
      services = [
        { name: '24K Gold Facial', duration: 90, price: 6000, description: 'Ultimate anti-aging illumination therapy' },
        { name: 'HydraFacial MD', duration: 60, price: 4500, description: 'Advanced deep cleansing and hydration' },
        { name: 'Chemical Peel', duration: 45, price: 3500, description: 'Professional skin resurfacing treatment' },
        { name: 'Diamond Microdermabrasion', duration: 60, price: 4000, description: 'Crystal-free exfoliation for glowing skin' },
      ]
    } else if (cat.slug === 'beauty-services') {
      services = [
        { name: 'Bridal Makeup', duration: 180, price: 15000, description: 'HD and Airbrush makeup for your special day' },
        { name: 'Party Makeup', duration: 90, price: 4500, description: 'Flawless glam for evening events' },
        { name: 'Luxury Manicure', duration: 45, price: 1200, description: 'Spa-grade nail care with gel polish' },
        { name: 'Signature Pedicure', duration: 60, price: 1500, description: 'Relaxing foot therapy with organic scrubs' },
      ]
    }

    for (const s of services) {
      await prisma.service.upsert({
        where: { slug: s.name.toLowerCase().replace(/\s+/g, '-') },
        update: {},
        create: {
          name: s.name,
          slug: s.name.toLowerCase().replace(/\s+/g, '-'),
          description: s.description,
          duration: s.duration,
          price: s.price,
          categoryId: createdCat.id,
          benefits: [],
        }
      })
    }
  }
  console.log('✅ Service categories and services seeded')

  // Membership plans
  const plans = [
    { name: 'Silver', tier: 'SILVER' as const, price: 2999, duration: 6, discount: 5, description: 'Perfect starter membership for wellness enthusiasts', benefits: ['5% Discount on all services', 'Priority booking access', 'Birthday special treatment', '50 bonus reward points'] },
    { name: 'Gold', tier: 'GOLD' as const, price: 5999, duration: 12, discount: 10, description: 'Our most popular plan for regular spa visitors', benefits: ['10% Discount on all services', 'Priority booking', 'Free monthly consultation', 'Birthday luxury treatment', '150 bonus points', '2 guest passes/year'] },
    { name: 'Platinum', tier: 'PLATINUM' as const, price: 11999, duration: 12, discount: 20, description: 'Ultimate luxury membership with VIP privileges', benefits: ['20% Discount on all services', 'VIP lounge access', 'Personal dedicated therapist', 'Free quarterly facial', 'Birthday full-day spa', '500 bonus points', '6 guest passes/year', '2 home services/month'] },
  ]

  for (const plan of plans) {
    await prisma.membershipPlan.create({ data: plan }).catch(() => {})
  }
  console.log('✅ Membership plans seeded')

  // Site settings
  const settings = [
    { key: 'site_name', value: 'Aura Luxury Spa & Salon' },
    { key: 'site_tagline', value: 'Where Luxury Meets Wellness' },
    { key: 'contact_phone', value: '+91 98765 43210' },
    { key: 'contact_email', value: 'hello@auraspa.in' },
    { key: 'contact_address', value: '12, Luxury Plaza, MG Road, Bangalore, Karnataka 560001' },
    { key: 'working_hours_weekday', value: '09:00-21:00' },
    { key: 'working_hours_weekend', value: '10:00-19:00' },
    { key: 'gst_rate', value: '18' },
    { key: 'reward_points_rate', value: '10' },
    { key: 'referral_reward', value: '200' },
  ]

  for (const setting of settings) {
    await prisma.siteSettings.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: { ...setting, type: 'text' },
    })
  }
  console.log('✅ Site settings seeded')

  console.log('\n🎉 Seeding complete!')
  console.log('👤 Admin login: admin@auraspa.in / Admin@123')
  console.log('👤 Demo login: demo@auraspa.in / Customer@123')
  console.log('👤 Therapist logins: meera@auraspa.in, kavita@auraspa.in, priya@auraspa.in / Therapist@123')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
