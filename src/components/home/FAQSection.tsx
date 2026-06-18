'use client'
import { useState } from 'react'
import { ChevronDown, Send } from 'lucide-react'

const faqs = [
  {
    question: "Do I need to book an appointment in advance?",
    answer: "Yes, we highly recommend booking in advance to ensure your preferred time and therapist are available. However, we do welcome walk-ins subject to availability."
  },
  {
    question: "What time should I arrive for my treatment?",
    answer: "Please arrive at least 15 minutes prior to your scheduled appointment. This allows time to check-in, complete any necessary forms, and begin relaxing before your treatment."
  },
  {
    question: "What is your cancellation policy?",
    answer: "We request a minimum of 24 hours notice for cancellations or rescheduling. Cancellations within 24 hours may incur a 50% charge of the treatment value."
  },
  {
    question: "Can I choose the gender of my therapist?",
    answer: "Absolutely. Please state your preference when making your reservation and we will do our best to accommodate your request."
  },
  {
    question: "What should I wear to the spa?",
    answer: "Wear whatever is comfortable. We provide luxurious robes and slippers for your use during your visit. For most treatments, you will be professionally draped at all times to ensure your privacy."
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-24 bg-dark-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="font-luxury tracking-widest text-gold-400 text-sm uppercase mb-4">Support</div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-cream mb-6">Frequently Asked Questions</h2>
          <p className="text-cream/60">Everything you need to know about your upcoming spa experience.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'bg-white/5' : 'bg-transparent hover:bg-white/5'
              }`}
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-display text-lg text-cream">{faq.question}</span>
                <ChevronDown 
                  className={`text-gold-400 transition-transform duration-300 shrink-0 ml-4 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`} 
                  size={20} 
                />
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-cream/60 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
