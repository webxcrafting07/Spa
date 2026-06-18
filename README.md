# 🌟 Aura Luxury Spa & Salon — Full-Stack Platform

A premium, production-ready luxury Spa & Salon management platform built with Next.js 15, featuring a stunning dark-gold luxury UI, full admin panel, booking system, customer dashboard, and more.

---

## ✨ Features

### Public Website
- 🎬 Animated hero section with auto-sliding backgrounds
- 💆 Full services catalog (Hair, Spa, Skin Care, Beauty)
- 👩‍⚕️ Therapist profiles with ratings & specialties
- 📅 Multi-step booking system with time slots
- 💳 Membership plans (Silver / Gold / Platinum)
- 🖼️ Interactive gallery with lightbox
- ✍️ Blog with categories & search
- ⭐ Testimonials carousel
- 📍 Contact page with Google Maps embed
- 📱 Fully responsive mobile-first design

### Customer Dashboard
- 📊 Personal dashboard with stats
- 📅 Appointment history & management
- 👤 Profile & wellness preferences
- ⭐ Rewards points & redemption
- 💜 Wishlist & referrals

### Super Admin Panel
- 📈 Analytics dashboard with live charts
- 📅 Appointment management with bulk actions
- ✂️ Services CRUD management
- 👥 Staff management (grid & table view)
- 👩‍💼 Customer management with membership tracking
- 💰 Finance dashboard (revenue, expenses, tax)
- 📦 Inventory management with low-stock alerts
- 📣 Marketing (email/SMS campaigns, coupons, referrals)
- 📝 CMS (homepage content, SEO, gallery, blog)
- ⚙️ Full settings (general, payments, notifications, security)

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone <your-repo>
cd luxury-spa
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env
```
Fill in your `.env` with:
- **DATABASE_URL** — Neon PostgreSQL connection string
- **NEXTAUTH_SECRET** — Random secret (generate: `openssl rand -base64 32`)
- **CLOUDINARY_*** — Your Cloudinary credentials
- **RESEND_API_KEY** — From resend.com
- **RAZORPAY_*** — From razorpay.com dashboard
- **STRIPE_*** — From stripe.com dashboard

### 3. Database Setup
```bash
npx prisma generate
npx prisma db push
npx ts-node prisma/seed.ts
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔐 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@auraspa.in | Admin@123 |
| Customer | demo@auraspa.in | Customer@123 |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (public)/          # Public website pages
│   │   ├── page.tsx       # Homepage
│   │   ├── services/      # Services page
│   │   ├── therapists/    # Therapists page
│   │   ├── gallery/       # Gallery page
│   │   ├── blog/          # Blog listing & posts
│   │   ├── about/         # About page
│   │   ├── contact/       # Contact page
│   │   └── membership/    # Membership plans
│   ├── (auth)/            # Auth pages (no layout)
│   │   ├── login/         # Login page
│   │   └── register/      # Registration page
│   ├── (dashboard)/       # Customer dashboard
│   │   └── dashboard/     # Dashboard, appointments, profile, rewards
│   ├── (admin)/           # Admin panel
│   │   └── admin/         # All admin pages
│   ├── api/               # API routes
│   │   └── auth/          # NextAuth + register
│   └── booking/           # Public booking page
├── components/
│   ├── home/              # Homepage section components
│   ├── layout/            # Navbar, Footer
│   ├── admin/             # Admin charts
│   └── providers/         # Auth provider
├── lib/
│   ├── auth.ts            # NextAuth config
│   ├── prisma.ts          # DB client
│   └── utils.ts           # Helpers & data
prisma/
├── schema.prisma          # Full database schema
└── seed.ts                # Database seeder
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS with custom luxury design system |
| Database | PostgreSQL (Neon) |
| ORM | Prisma |
| Auth | NextAuth.js v4 |
| File Storage | Cloudinary |
| Email | Resend |
| Payments | Razorpay + Stripe |
| Charts | Recharts |
| Animations | Framer Motion |
| Deployment | Vercel |

---

## 🚢 Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Add all environment variables in Vercel dashboard → Project Settings → Environment Variables.

---

## 📦 Key Commands

```bash
npm run dev          # Development server
npm run build        # Production build
npm run db:push      # Push schema to database
npm run db:generate  # Regenerate Prisma client
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed initial data
```

---

## 🎨 Design System

- **Primary Color**: `#D4AF37` (Luxury Gold)
- **Background**: `#111827` (Deep Dark)
- **Accent**: `#F8F6F0` (Cream White)
- **Fonts**: Playfair Display, Cinzel, Inter, Cormorant Garamond
- **Effects**: Glassmorphism, Gold gradients, Smooth animations

---

Built with ❤️ — A premium ₹10L+ quality spa platform.
