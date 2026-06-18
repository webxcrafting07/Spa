'use client'
import { useRef } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const testimonials = [
  { name: 'Ananya Reddy', role: 'Platinum Member', rating: 5, text: 'Aura Spa has completely transformed my wellness routine. The hot stone massage is divine.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
  { name: 'Shreya Patel', role: 'Gold Member', rating: 5, text: 'I\'ve visited luxury spas across the world, but Aura stands out for its exceptional attention to detail.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
  { name: 'Divya Menon', role: 'Regular Client', rating: 5, text: 'The bridal package was beyond my expectations. Kavita\'s makeup artistry was flawless.', avatar: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=100&q=80' },
  { name: 'Pooja Singh', role: 'Platinum Member', rating: 5, text: 'The aromatherapy session with Priya was life-changing. I came in stressed and left feeling completely renewed.', avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&q=80' },
  { name: 'Ritika Joshi', role: 'Silver Member', rating: 5, text: 'Professional, luxurious, and transformative. The hair spa treatment has completely restored my damaged hair.', avatar: 'https://images.unsplash.com/photo-1532910404247-7ee9488d7292?w=100&q=80' },
  { name: 'Karan Malhotra', role: 'Gold Member', rating: 5, text: 'The deep tissue massage was incredibly therapeutic. The therapists truly understand muscle anatomy.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80' },
  { name: 'Sneha Kapoor', role: 'Platinum Member', rating: 5, text: 'From the warm welcome to the incredibly relaxing luxury pedicure, everything was just flawless.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80' },
  { name: 'Vikram Singh', role: 'Regular Client', rating: 5, text: 'I booked the premium haircut and beard styling. The master stylist knew exactly what suited me.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
]

export default function TestimonialsSection() {
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&q=80" alt="Spa Background" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-dark-900/80 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-dark-900" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-label">Client Stories</span>
          <div className="gold-divider" />
          <h2 className="section-title mt-4">What Our Clients Say</h2>
        </div>

        <div className="relative px-2 lg:px-10">
          {/* Navigation Buttons */}
          <button ref={prevRef} className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-full bg-dark-900/80 border border-gold-400/30 text-gold-400 hover:bg-gold-400 hover:text-dark transition-all backdrop-blur-md">
            <ChevronLeft size={24} />
          </button>
          <button ref={nextRef} className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-full bg-dark-900/80 border border-gold-400/30 text-gold-400 hover:bg-gold-400 hover:text-dark transition-all backdrop-blur-md">
            <ChevronRight size={24} />
          </button>

          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, el: '.custom-pagination' }}
            onBeforeInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="pb-16 px-4"
          >
            {testimonials.map((testimonial, i) => (
              <SwiperSlide key={i} className="h-auto">
                <div className="h-full relative glass-card border border-gold-400/20 p-8 text-center overflow-hidden flex flex-col group transition-transform duration-300 hover:-translate-y-2">
                  <div className="absolute -top-4 -left-4 opacity-[0.03] text-gold-400 pointer-events-none group-hover:opacity-[0.06] transition-opacity">
                    <Quote size={120} />
                  </div>
                  
                  <div className="flex justify-center mb-6 gap-1">
                    {[...Array(testimonial.rating)].map((_, idx) => (
                      <Star key={idx} size={14} className="text-gold-400 fill-gold-400 drop-shadow-[0_0_4px_rgba(212,175,55,0.6)]" />
                    ))}
                  </div>

                  <p className="font-serif text-cream/90 leading-relaxed mb-8 italic flex-grow text-sm">
                    "{testimonial.text}"
                  </p>

                  <div className="flex flex-col items-center justify-center gap-3 mt-auto">
                    <div className="relative w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-gold-600 via-gold-400 to-yellow-200">
                      <img src={testimonial.avatar} alt={testimonial.name}
                        className="w-full h-full rounded-full object-cover border-2 border-dark-900" />
                    </div>
                    <div>
                      <p className="font-display text-lg font-semibold text-gold-400 tracking-wide">{testimonial.name}</p>
                      <p className="text-cream/50 text-[10px] uppercase tracking-widest mt-1">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          <div className="custom-pagination flex justify-center gap-2 mt-4" />
        </div>
      </div>
      
      <style jsx global>{`
        .custom-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.2);
          opacity: 1;
          transition: all 0.3s ease;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          background: #d4af37;
          width: 24px;
          border-radius: 4px;
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.8);
        }
      `}</style>
    </section>
  )
}
