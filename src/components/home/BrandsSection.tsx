export default function BrandsSection() {
  const brands = [
    "L'ORÉAL",
    "M·A·C",
    "KÉRASTASE",
    "O·P·I",
    "DERMALOGICA"
  ]

  return (
    <section className="py-16 bg-dark-950 border-t border-b border-gold-400/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center font-luxury tracking-widest text-cream/40 text-xs uppercase mb-10">Premium Brands We Trust</p>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
          {brands.map((brand, i) => (
            <div 
              key={i} 
              className="font-display text-2xl md:text-3xl tracking-widest font-bold text-cream/30 hover:text-gold-400/80 transition-colors duration-500 cursor-default"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
