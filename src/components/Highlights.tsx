import { motion } from 'motion/react';

export default function Highlights() {
  const products = [
    {
      title: "Signature Espresso",
      desc: "A rotating single-origin bean, roasted light to preserve origin characteristics. Served with sparkling water and a tasting note card.",
      img: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=800&q=70",
      delay: 0.1
    },
    {
      title: "Laminated Pastries",
      desc: "Our butter croissants and pain au chocolat are laminated over three days for a shatteringly crisp exterior and airy honeycomb crumb.",
      img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=70",
      delay: 0.2
    },
    {
      title: "Hand-Poured Filter",
      desc: "Precision brewed using the V60 method. Expect clean, tea-like bodies with vibrant floral and fruit notes.",
      img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=70",
      delay: 0.3
    }
  ];

  return (
    <section id="highlights" className="py-[105px] bg-gradient-to-b from-[#f6eee3]/75 via-[#faf5ec]/68 to-[#f4ede1]/75 backdrop-blur-[2px] relative overflow-hidden">
      {/* Top radiant copper line separating from dark Concept section */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#b3541e]/60 to-transparent shadow-[0_0_12px_#b3541e] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#b3541e]/30 to-transparent pointer-events-none" />

      {/* Atmospheric radial ambient light diffusions */}
      <div className="absolute top-1/4 -right-10 w-[550px] h-[550px] bg-brand-accent/[0.06] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 -left-10 w-[500px] h-[500px] bg-[#d98236]/[0.05] rounded-full blur-[150px] pointer-events-none" />

      {/* Roastery geometry watermark pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply overflow-hidden">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="highlightsGrid" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M 64 0 L 0 0 0 64" fill="none" stroke="#7e4620" strokeWidth="0.8" />
              <circle cx="32" cy="32" r="1.2" fill="#7e4620" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#highlightsGrid)" />
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto px-7 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.7 }}
          className="mb-[52px]"
        >
          <p className="eyebrow">Product Highlights</p>
          <h2 className="font-display font-normal text-[clamp(34px,4.4vw,52px)] leading-[1.08] tracking-[-0.3px] mt-[18px] max-w-[22ch]">Crafted with intention.</h2>
          <p className="text-brand-text-mid max-w-[58ch] mt-[16px] text-[16px]">From the careful selection of green coffee to the final dusting of cocoa, every item on our menu is treated with the utmost respect.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px]">
          {products.map((product, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: "-10%" }} 
              transition={{ duration: 0.8, delay: product.delay, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer"
            >
              <div className="relative rounded-[14px] overflow-hidden aspect-[4/5] bg-brand-bg shadow-brand mb-[24px]">
                <motion.img 
                  src={product.img} 
                  alt={product.title} 
                  className="w-full h-full object-cover origin-center"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h3 className="font-display font-normal text-[28px] leading-[1.15] mb-[12px] group-hover:text-brand-accent-deep transition-colors duration-300">{product.title}</h3>
              <p className="text-brand-text-mid text-[15px] leading-relaxed">{product.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
