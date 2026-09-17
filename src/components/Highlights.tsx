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
    <section id="highlights" className="py-[96px] bg-brand-bg-deep">
      <div className="max-w-[1200px] mx-auto px-7">
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
