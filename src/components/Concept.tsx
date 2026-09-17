import { motion } from 'motion/react';

export default function Concept() {
  return (
    <section id="concept" className="py-[96px] bg-brand-text text-[#efe6d9]">
      <div className="max-w-[1200px] mx-auto px-7">
        <motion.div 
          initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.7 }}
          className="mb-[52px]"
        >
          <p className="eyebrow text-[#e0956a]">About the space</p>
          <h2 className="font-display font-normal text-[clamp(34px,4.4vw,52px)] leading-[1.08] tracking-[-0.3px] mt-[18px] max-w-[22ch] text-[#f7efe3]">A quieter space, with good coffee at the centre.</h2>
          <p className="text-[#bfae9c] max-w-[58ch] mt-[16px] text-[16px]">Copper & Crema is set up as a cafe, bakery, and all-day coffee house at once — without ever asking you to choose between them.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-16 items-start">
          <div className="flex flex-col gap-0">
            {[
              { term: "Purpose", desc: "A warm all-day cafe for careful pours, fresh bakery plates, and conversations that don't watch the clock.", delay: 0.08 },
              { term: "Mood", desc: "Warm interiors, soft light, slower tables, and editorial cafe imagery — copper in the fixtures, crema in every cup.", delay: 0.16 },
              { term: "Window tables", desc: "Soft light, slower conversations, and enough space for a proper story between two coffees.", delay: 0.24 },
              { term: "The bar", desc: "A rotating single-origin espresso, a weekly slow-brew, and a filter kaapi that honours where we are.", delay: 0.32 },
            ].map((fact, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.7, delay: fact.delay }}
                className={`py-[26px] border-b border-[rgba(239,230,217,0.14)] ${i === 0 ? 'pt-[4px]' : ''}`}
              >
                <span className="font-mono text-[10.5px] tracking-[2px] uppercase text-[#e0956a] mb-[8px] block">{fact.term}</span>
                <p className="text-[#cbbba9] text-[15px] max-w-[46ch]">{fact.desc}</p>
              </motion.div>
            ))}
            
            <motion.p 
              initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.7, delay: 0.4 }}
              className="font-display italic font-normal text-[clamp(24px,2.6vw,32px)] leading-[1.3] text-[#f3e9da] mt-[56px] max-w-[30ch] before:content-['“'] before:text-[#e0956a] before:mr-[2px] after:content-['”'] after:text-[#e0956a] after:ml-[2px]"
            >
              Nobody ever regretted one more cup, taken slowly.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.7, delay: 0.16 }}
            className="grid grid-cols-2 gap-[16px]"
          >
            <figure className="rounded-[14px] overflow-hidden bg-[#3a2a1c] mt-[48px]">
              <img src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=70"
                   alt="Coffee and beans in warm light" className="w-full h-full object-cover aspect-[3/4]" />
            </figure>
            <figure className="rounded-[14px] overflow-hidden bg-[#3a2a1c]">
              <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=70"
                   alt="Barista pouring latte art" className="w-full h-full object-cover aspect-[3/4]" />
            </figure>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
