import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function LocationSection() {
  return (
    <section className="py-24 bg-dark-900 border-t border-gold-400/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="font-luxury tracking-widest text-gold-400 text-sm uppercase mb-4">Location</div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-cream mb-6">Visit Our Sanctuary</h2>
          <p className="text-cream/60 max-w-2xl mx-auto">
            Conveniently located in the heart of the city, Aura Luxury Spa offers a tranquil escape from the urban hustle.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map */}
          <div className="h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/5">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d113940.6926019572!2d80.8525043818318!3d26.822982855140656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b16b%3A0x93ccba8909978be7!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Aura Luxury Spa Location"
            />
          </div>

          {/* Contact Details */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-gold-400/10 flex items-center justify-center border border-gold-400/20 shrink-0">
                <MapPin className="text-gold-400" size={24} />
              </div>
              <div className="ml-6">
                <h3 className="font-display text-xl text-cream mb-2">Address</h3>
                <p className="text-cream/60 leading-relaxed">
                  123 Luxury Avenue, Premium Block<br />
                  Lucknow, UP 226010, India
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-gold-400/10 flex items-center justify-center border border-gold-400/20 shrink-0">
                <Phone className="text-gold-400" size={24} />
              </div>
              <div className="ml-6">
                <h3 className="font-display text-xl text-cream mb-2">Phone</h3>
                <p className="text-cream/60 leading-relaxed">
                  +91 98765 43210<br />
                  +91 12345 67890
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-gold-400/10 flex items-center justify-center border border-gold-400/20 shrink-0">
                <Mail className="text-gold-400" size={24} />
              </div>
              <div className="ml-6">
                <h3 className="font-display text-xl text-cream mb-2">Email</h3>
                <p className="text-cream/60 leading-relaxed">
                  info@auraspa.com<br />
                  bookings@auraspa.com
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-gold-400/10 flex items-center justify-center border border-gold-400/20 shrink-0">
                <Clock className="text-gold-400" size={24} />
              </div>
              <div className="ml-6">
                <h3 className="font-display text-xl text-cream mb-2">Working Hours</h3>
                <p className="text-cream/60 leading-relaxed">
                  Mon - Sun: 9:00 AM - 9:00 PM<br />
                  Public Holidays: 10:00 AM - 7:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
