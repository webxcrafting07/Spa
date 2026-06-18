'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronRight, Calendar, Clock, User, Check, ArrowLeft, ShieldCheck, CreditCard, Droplets } from 'lucide-react'
import { generateTimeSlots } from '@/lib/utils'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'

const STEPS = ['Select Service', 'Therapist', 'Date & Time', 'Your Details', 'Payment']

export default function BookingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()
  const requestedTherapist = searchParams.get('therapist')

  const [categories, setCategories] = useState<any[]>([])
  const [therapistsList, setTherapistsList] = useState<any[]>([])
  
  const [step, setStep] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [selectedServices, setSelectedServices] = useState<any[]>([])
  const [selectedTherapist, setSelectedTherapist] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState('')
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', notes: '' })
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [isProcessing, setIsProcessing] = useState(false)

  const timeSlots = generateTimeSlots()
  const today = new Date()
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() + i + 1)
    return d
  })

  useEffect(() => {
    if (!selectedDate && dates.length > 0) {
      setSelectedDate(dates[0].toISOString().split('T')[0])
    }
    
    // Fetch DB Data
    Promise.all([
      fetch('/api/categories').then(res => res.json()),
      fetch('/api/staff').then(res => res.json())
    ]).then(([cats, staff]) => {
      setCategories(cats)
      setTherapistsList(staff)
      
      if (requestedTherapist && staff.length > 0) {
        const match = staff.find((t: any) => t.name === requestedTherapist)
        if (match) {
          setSelectedTherapist(match)
          setStep(0)
        }
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        name: session.user.name || '',
        email: session.user.email || '',
      }))
    }
  }, [session])

  const canNext = () => {
    if (step === 0) return selectedServices.length > 0
    if (step === 1) return !!selectedTherapist
    if (step === 2) return !!(selectedDate && selectedTime)
    if (step === 3) return !!(formData.name && formData.email && formData.phone)
    return true
  }

  const subtotal = selectedServices.reduce((sum, s) => sum + s.price, 0)
  const gst = Math.round(subtotal * 0.18)
  const total = subtotal + gst
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.duration, 0)

  const toggleService = (service: any, categoryName: string) => {
    setSelectedServices(prev => {
      const exists = prev.find(s => s.id === service.id)
      if (exists) return prev.filter(s => s.id !== service.id)
      return [{ ...service, categoryName }] // Replace: only 1 service allowed for DB simplicity right now
    })
  }

  const isSelected = (serviceId: string) => selectedServices.some(s => s.id === serviceId)

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: selectedServices[0]?.id,
          staffId: selectedTherapist?.id === 'any' ? null : selectedTherapist?.id,
          date: selectedDate,
          timeSlot: selectedTime,
          notes: formData.notes,
          paymentMethod
        })
      })
      
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Booking failed')
      }
      
      toast.success('Your Concierge Booking is confirmed!')
      router.push('/dashboard/appointments')
    } catch (err: any) {
      toast.error(err.message || 'Failed to book appointment')
      setIsProcessing(false)
    }
  }

  if (categories.length === 0) {
    return <div className="min-h-screen bg-black flex items-center justify-center"><span className="text-gold-400">Loading Concierge...</span></div>
  }

  return (
    <div className="min-h-screen bg-black text-cream pt-24 pb-20 selection:bg-gold-500/30">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Top Header */}
        <div className="mb-16">
          <span className="font-luxury tracking-[0.5em] text-gold-400 text-[10px] uppercase block mb-4">The Concierge</span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-cream to-cream/50 tracking-tight">
            Reserve Your Experience
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Flow */}
          <div className="lg:col-span-7">
            
            {/* Elegant Step Indicator */}
            <div className="flex justify-between items-center mb-16 relative">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-white/5 -translate-y-1/2 z-0" />
              <div 
                className="absolute top-1/2 left-0 h-px bg-gold-400 -translate-y-1/2 z-0 transition-all duration-700 ease-in-out" 
                style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
              />
              
              {STEPS.map((s, i) => {
                const isActive = i === step
                const isPassed = i < step
                return (
                  <div key={s} className="relative z-10 flex flex-col items-center">
                    <button 
                      onClick={() => i < step && setStep(i)}
                      className={`w-3 h-3 rounded-full transition-all duration-500 ${
                        isActive ? 'bg-gold-400 ring-4 ring-gold-400/20 scale-125' : 
                        isPassed ? 'bg-gold-400' : 'bg-dark-600'
                      }`}
                      disabled={i > step}
                    />
                    <span className={`absolute top-6 text-[10px] uppercase tracking-widest whitespace-nowrap transition-colors duration-500 ${
                      isActive ? 'text-gold-400 font-bold' :
                      isPassed ? 'text-cream/50' : 'text-cream/20'
                    }`}>
                      <span className="hidden md:inline">{s}</span>
                      <span className="md:hidden">{i + 1}</span>
                    </span>
                  </div>
                )
              })}
            </div>

            <div className="min-h-[500px]">
              {/* STEP 0: SERVICE */}
              {step === 0 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
                  <h2 className="font-display text-2xl text-cream mb-8">What shall we prepare for you?</h2>
                  
                  {/* Custom Category Tabs */}
                  <div className="flex overflow-x-auto hide-scrollbar gap-8 border-b border-white/10 mb-8 pb-4">
                    {categories.map((cat, i) => (
                      <button key={cat.id} onClick={() => setSelectedCategory(i)}
                        className={`text-xs uppercase tracking-widest whitespace-nowrap transition-all duration-300 relative ${
                          selectedCategory === i ? 'text-gold-400' : 'text-cream/40 hover:text-cream/80'
                        }`}>
                        {cat.name}
                        {selectedCategory === i && (
                          <span className="absolute -bottom-4 left-0 right-0 h-0.5 bg-gold-400" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-4">
                    {categories[selectedCategory]?.services?.map((service: any) => (
                      <button key={service.id}
                        onClick={() => toggleService(service, categories[selectedCategory].name)}
                        className={`w-full text-left p-6 rounded-2xl border transition-all duration-500 group relative overflow-hidden ${
                          isSelected(service.id)
                            ? 'border-gold-400/50 bg-gradient-to-r from-gold-400/10 to-transparent'
                            : 'border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                        }`}>
                        
                        <div className="flex justify-between items-start mb-2 relative z-10">
                          <div>
                            <h3 className={`font-display text-xl transition-colors ${isSelected(service.id) ? 'text-gold-400' : 'text-cream group-hover:text-gold-100'}`}>
                              {service.name}
                            </h3>
                            <div className="flex items-center gap-4 text-xs text-cream/40 mt-2 tracking-widest uppercase">
                              <span className="flex items-center gap-1"><Clock size={12}/> {service.duration} MIN</span>
                              <span className="w-1 h-1 rounded-full bg-white/20" />
                              <span className="text-cream/70 font-medium">₹{service.price.toLocaleString('en-IN')}</span>
                            </div>
                          </div>
                          
                          <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                            isSelected(service.id) ? 'bg-gold-400 border-gold-400' : 'border-white/20 group-hover:border-white/40'
                          }`}>
                            {isSelected(service.id) && <Check size={14} className="text-black" strokeWidth={3} />}
                          </div>
                        </div>
                        <p className="text-sm text-cream/50 relative z-10 font-light leading-relaxed max-w-xl">{service.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 1: THERAPIST */}
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
                  <h2 className="font-display text-2xl text-cream mb-8">Who do you prefer?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {therapistsList.map((t) => {
                      const img = t.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80'
                      const specialty = t.staffProfile?.specializations?.[0] || 'Therapist'
                      const rating = t.staffProfile?.rating || 5
                      
                      return (
                      <button key={t.id} onClick={() => setSelectedTherapist(t)}
                        className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 text-left h-32 ${
                          selectedTherapist?.id === t.id ? 'border-gold-400 shadow-[0_0_30px_rgba(212,175,55,0.15)]' : 'border-white/10 hover:border-white/30'
                        }`}>
                        <img src={img} alt={t.name} className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                          selectedTherapist?.id === t.id ? 'grayscale-0 scale-105 opacity-40' : 'grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-40'
                        }`} />
                        <div className={`absolute inset-0 bg-gradient-to-r ${
                          selectedTherapist?.id === t.id ? 'from-black/90 to-black/40' : 'from-black/90 to-black/60'
                        }`} />
                        
                        <div className="relative z-10 h-full p-6 flex flex-col justify-center">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-display text-xl text-cream group-hover:text-gold-100 transition-colors">{t.name}</span>
                            {selectedTherapist?.id === t.id && <div className="w-2 h-2 rounded-full bg-gold-400 shadow-[0_0_10px_rgba(212,175,55,0.8)]" />}
                          </div>
                          <span className="text-xs text-gold-400 tracking-widest uppercase mb-2">{specialty}</span>
                          <div className="flex gap-0.5">
                            {[1,2,3,4,5].map(star => (
                              <svg key={star} className={`w-3 h-3 ${star <= Math.floor(rating) ? 'text-gold-400 fill-gold-400' : 'text-white/20 fill-transparent'}`} viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </button>
                    )})}
                    <button onClick={() => setSelectedTherapist({ id: 'any', name: 'Concierge Choice', specialty: 'Best match for your service' })}
                      className={`group flex items-center justify-center p-6 rounded-2xl border border-dashed transition-all duration-500 h-32 ${
                        selectedTherapist?.id === 'any' ? 'border-gold-400 bg-gold-400/5' : 'border-white/20 hover:border-gold-400/50 hover:bg-white/[0.02]'
                      }`}>
                      <div className="text-center">
                        <span className={`block font-display text-lg mb-1 transition-colors ${selectedTherapist?.id === 'any' ? 'text-gold-400' : 'text-cream group-hover:text-gold-100'}`}>Any Available Expert</span>
                        <span className="text-xs text-cream/40 uppercase tracking-widest">Let us choose the best for you</span>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: DATE & TIME */}
              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
                  <h2 className="font-display text-2xl text-cream mb-8">When shall we expect you?</h2>
                  
                  <div className="mb-10">
                    <span className="text-[10px] text-cream/40 uppercase tracking-[0.2em] mb-4 block">Select Date</span>
                    <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
                      {dates.map((d) => {
                        const ds = d.toISOString().split('T')[0]
                        const isSelected = selectedDate === ds
                        return (
                          <button key={ds} onClick={() => setSelectedDate(ds)}
                            className={`shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-2xl transition-all duration-300 border ${
                              isSelected 
                                ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                                : 'bg-transparent border-white/10 text-cream/60 hover:border-white/30 hover:text-cream'
                            }`}>
                            <span className="text-[10px] uppercase font-semibold tracking-wider mb-1">{d.toLocaleDateString('en', { weekday: 'short' })}</span>
                            <span className="text-2xl font-display leading-none mb-1">{d.getDate()}</span>
                            <span className="text-[10px] uppercase tracking-wider">{d.toLocaleDateString('en', { month: 'short' })}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-cream/40 uppercase tracking-[0.2em] mb-4 block">Select Time</span>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                      {timeSlots.map((slot) => {
                        const booked = ['10:00', '11:00', '14:30', '16:00'].includes(slot)
                        const isSelected = selectedTime === slot
                        return (
                          <button key={slot} disabled={booked} onClick={() => setSelectedTime(slot)}
                            className={`py-3 rounded-xl text-xs tracking-widest transition-all duration-300 border ${
                              booked ? 'opacity-20 cursor-not-allowed border-transparent' :
                              isSelected ? 'bg-gold-400 text-black border-gold-400 font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)]' :
                              'bg-white/[0.02] border-white/10 text-cream/60 hover:border-gold-400/50 hover:text-gold-400'
                            }`}>
                            {slot}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: DETAILS */}
              {step === 3 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
                  <h2 className="font-display text-2xl text-cream mb-8">Who is this reservation for?</h2>
                  
                  <div className="space-y-6 max-w-2xl">
                    <div>
                      <label className="block text-[10px] text-cream/40 uppercase tracking-[0.2em] mb-2 pl-1">Full Name</label>
                      <input type="text" placeholder="Your name" required
                        value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/[0.02] border-0 border-b border-white/20 px-4 py-3 text-cream placeholder-cream/20 focus:ring-0 focus:border-gold-400 transition-colors" />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] text-cream/40 uppercase tracking-[0.2em] mb-2 pl-1">Email</label>
                        <input type="email" placeholder="your@email.com" required
                          value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white/[0.02] border-0 border-b border-white/20 px-4 py-3 text-cream placeholder-cream/20 focus:ring-0 focus:border-gold-400 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-[10px] text-cream/40 uppercase tracking-[0.2em] mb-2 pl-1">Phone</label>
                        <input type="tel" placeholder="+91" required
                          value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-white/[0.02] border-0 border-b border-white/20 px-4 py-3 text-cream placeholder-cream/20 focus:ring-0 focus:border-gold-400 transition-colors" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-[10px] text-cream/40 uppercase tracking-[0.2em] mb-2 pl-1">Special Requests (Optional)</label>
                      <textarea placeholder="Allergies, focus areas, preferences..." rows={3}
                        value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full bg-white/[0.02] border-0 border-b border-white/20 px-4 py-3 text-cream placeholder-cream/20 focus:ring-0 focus:border-gold-400 transition-colors resize-none" />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: PAYMENT */}
              {step === 4 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
                  <h2 className="font-display text-2xl text-cream mb-8">Finalize Your Experience</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 max-w-2xl">
                    {[
                      { id: 'CARD', label: 'Credit Card', icon: CreditCard },
                      { id: 'UPI', label: 'UPI / Netbanking', icon: ShieldCheck },
                      { id: 'CASH', label: 'Pay at Concierge', icon: Droplets }
                    ].map(method => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-5 rounded-2xl border flex items-center gap-4 transition-all duration-300 ${
                          paymentMethod === method.id 
                            ? 'border-gold-400 bg-gold-400/5' 
                            : 'border-white/10 bg-white/[0.02] hover:border-white/30'
                        }`}
                      >
                        <method.icon size={20} className={paymentMethod === method.id ? 'text-gold-400' : 'text-cream/30'} />
                        <span className={`font-medium text-sm tracking-wide ${paymentMethod === method.id ? 'text-gold-400' : 'text-cream/70'}`}>{method.label}</span>
                      </button>
                    ))}
                  </div>

                  <form onSubmit={handleBooking} className="max-w-md">
                    <button type="submit" disabled={isProcessing}
                      className={`w-full py-5 rounded-xl font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-3 transition-all duration-500 shadow-xl text-xs ${
                        isProcessing ? 'bg-white/10 text-cream/30 cursor-not-allowed' 
                        : 'bg-gold-400 text-black hover:bg-gold-300 shadow-[0_0_40px_rgba(212,175,55,0.2)]'
                      }`}>
                      {isProcessing ? <><Clock size={16} className="animate-spin" /> Finalizing...</> : `Confirm Reservation`}
                    </button>
                    <p className="text-center text-[10px] text-cream/30 uppercase tracking-widest mt-4">
                      Free cancellation up to 24 hours prior.
                    </p>
                  </form>
                </div>
              )}
            </div>

            {/* Navigation Controls */}
            {step < 4 && (
              <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/5">
                {step > 0 ? (
                  <button onClick={() => setStep(step - 1)} className="text-[10px] uppercase tracking-[0.2em] text-cream/40 hover:text-cream flex items-center gap-2 transition-colors">
                    <ArrowLeft size={14} /> Back
                  </button>
                ) : <div />}
                
                <button onClick={() => setStep(step + 1)} disabled={!canNext()}
                  className={`py-4 px-10 rounded-xl font-bold tracking-[0.2em] uppercase text-[10px] flex items-center gap-3 transition-all duration-500 ${
                    !canNext() 
                      ? 'bg-white/5 text-cream/20 cursor-not-allowed' 
                      : 'bg-gold-400 text-black hover:bg-gold-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:-translate-y-1'
                  }`}>
                  Continue <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Luxury Receipt Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 border border-white/10 bg-[#0a0a0a] rounded-[2rem] p-8 lg:p-10 shadow-2xl relative overflow-hidden">
              
              {/* Decorative Receipt Header */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 opacity-50" />
              
              <div className="text-center mb-10 pb-8 border-b border-white/5">
                <span className="font-luxury text-2xl text-cream tracking-[0.3em] block mb-2">AURA</span>
                <span className="text-[9px] uppercase tracking-[0.4em] text-gold-400">Concierge Receipt</span>
              </div>

              <div className="space-y-8 min-h-[250px]">
                
                {/* Services */}
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-cream/30 block mb-4">Treatments</span>
                  {selectedServices.length > 0 ? (
                    <div className="space-y-4">
                      {selectedServices.map(s => (
                        <div key={s.id} className="flex justify-between items-start group">
                          <div>
                            <p className="text-sm text-cream/90 font-medium leading-none mb-1">{s.name}</p>
                            <p className="text-[10px] text-cream/40 tracking-wider uppercase">{s.duration} MIN</p>
                          </div>
                          <span className="text-sm text-gold-400">₹{s.price.toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-cream/20 italic">Awaiting selection...</p>
                  )}
                </div>

                {/* Details */}
                {(selectedTherapist || (selectedDate && selectedTime)) && (
                  <div className="pt-6 border-t border-white/5">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-cream/30 block mb-4">Reservation Details</span>
                    <div className="space-y-3">
                      {selectedTherapist && (
                        <div className="flex items-center gap-3 text-xs text-cream/70">
                          <User size={14} className="text-gold-400" />
                          <span className="tracking-wide">{selectedTherapist.name}</span>
                        </div>
                      )}
                      {selectedDate && selectedTime && (
                        <div className="flex items-center gap-3 text-xs text-cream/70">
                          <Calendar size={14} className="text-gold-400" />
                          <span className="tracking-wide">
                            {new Date(selectedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })} at {selectedTime}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Totals */}
              {selectedServices.length > 0 && (
                <div className="mt-10 pt-6 border-t border-white/10 space-y-3">
                  <div className="flex justify-between text-xs tracking-widest text-cream/50 uppercase">
                    <span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-xs tracking-widest text-cream/50 uppercase">
                    <span>GST (18%)</span><span>₹{gst.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-end pt-6 border-t border-dashed border-white/20 mt-4">
                    <span className="text-xs tracking-[0.2em] text-cream/80 uppercase">Total Estimate</span>
                    <span className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
