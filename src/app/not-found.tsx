import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="font-luxury text-8xl text-gold-400/20 font-bold mb-4">404</div>
        <h1 className="font-display text-4xl text-cream font-bold mb-4">Page Not Found</h1>
        <p className="text-cream/60 mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Let us guide you back to your wellness journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-gold text-sm px-8 py-3">Go Home</Link>
          <Link href="/booking" className="btn-outline-gold text-sm px-8 py-3">Book Appointment</Link>
        </div>
      </div>
    </div>
  )
}
