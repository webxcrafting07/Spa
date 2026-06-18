import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import AuthProvider from '@/components/providers/AuthProvider'

export const metadata: Metadata = {
  title: {
    default: 'Aura Luxury Spa & Salon | Premium Wellness Experience',
    template: '%s | Aura Luxury Spa & Salon',
  },
  description: 'Experience unparalleled luxury at Aura Spa & Salon. Book premium spa treatments, hair services, and beauty packages. 10,000+ happy clients. Expert therapists. World-class experience.',
  keywords: ['luxury spa', 'salon', 'spa treatments', 'hair salon', 'beauty salon', 'massage', 'facial', 'wellness'],
  authors: [{ name: 'Aura Luxury Spa' }],
  creator: 'Aura Luxury Spa & Salon',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: 'Aura Luxury Spa & Salon',
    description: 'Experience unparalleled luxury wellness',
    siteName: 'Aura Luxury Spa & Salon',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Aura Luxury Spa' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aura Luxury Spa & Salon',
    description: 'Experience unparalleled luxury wellness',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-dark-900 text-cream min-h-screen antialiased">
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1F2937',
                color: '#F8F6F0',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '12px',
              },
              success: {
                iconTheme: { primary: '#D4AF37', secondary: '#111827' },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}
