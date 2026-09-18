import { motion } from 'motion/react';
import { Coffee, Compass, Sun, Flame, Sparkles, Award } from 'lucide-react';

export default function Concept() {
  const pillars = [
    {
      icon: Coffee,
      term: "Purpose",
      tag: "All-Day Hospitality",
      desc: "A warm all-day cafe for careful pours, fresh bakery plates, and conversations that don't watch the clock.",
      delay: 0.05
    },
    {
      icon: Flame,
      term: "Atmosphere",
      tag: "Warm Light & Copper",
      desc: "Warm interiors, soft light, slower tables, and editorial cafe imagery — copper in the fixtures, crema in every cup.",
      delay: 0.12
    },
    {
      icon: Sun,
      term: "Window tables",
      tag: "Quiet Sanctuaries",
      desc: "Soft daylight, slower conversations, and enough space for a proper story between two coffees.",
      delay: 0.19
    },
    {
      icon: Compass,
      term: "The Brew Bar",
      tag: "3 Single Origins",
      desc: "A rotating single-origin espresso, a weekly slow-brew lot, and a traditional filter kaapi that honours our roots.",
      delay: 0.26
    },
  ];

  return (
    <section id="concept" className="py-[110px] bg-gradient-to-b from-[#18130e]/92 via-[#211a14]/88 to-[#16110d]/92 backdrop-blur-[3px] text-[#efe6d9] relative overflow-hidden">
      {/* Top and bottom subtle copper glow lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#b3541e]/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#b3541e]/30 to-transparent pointer-events-none" />

      {/* Atmospheric radial ambient light diffusions */}
      <div className="absolute -top-24 -left-20 w-[550px] h-[550px] bg-[#c76b31]/[0.09] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-[600px] h-[600px] bg-[#e0956a]/[0.07] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#7a411f]/[0.04] rounded-full blur-[200px] pointer-events-none" />

      {/* Architectural roastery lattice & coordinates watermark SVG */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-screen overflow-hidden">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="conceptGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#e0956a" strokeWidth="1" />
              <circle cx="30" cy="30" r="1.5" fill="#e0956a" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#conceptGrid)" />
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto px-7 relative z-10">
        
        {/* Header with scroll animation */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-[64px] max-w-[760px]"
        >
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-accent shadow-[0_0_12px_#b3541e]"></span>
            <span className="font-mono text-[11px] font-semibold tracking-[2.4px] uppercase text-[#e0956a]">
              About the space
            </span>
          </div>

          <h2 className="font-display font-normal text-[clamp(36px,4.6vw,56px)] leading-[1.06] tracking-[-0.4px] text-[#fbf6ef] mt-3">
            A quieter space, with good coffee at the centre.
          </h2>

          <p className="text-[#bfae9c] text-[16.5px] leading-relaxed mt-4 max-w-[62ch]">
            Copper & Crema is purposefully designed as an artisanal roastery, slow bakery, and unhurried neighborhood coffee sanctuary — without ever asking you to choose between them.
          </p>
        </motion.div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Interactive Pillar Cards */}
          <div className="lg:col-span-7 flex flex-col gap-3.5">
            {pillars.map((fact, i) => {
              const Icon = fact.icon;
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: fact.delay, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 6 }}
                  className="group p-5 md:p-6 rounded-[20px] bg-[#231b15]/60 hover:bg-[#2c221a]/85 border border-[#3b2f24] hover:border-[#b3541e]/50 backdrop-blur-md transition-all duration-300 shadow-sm hover:shadow-xl cursor-default"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#34271c] group-hover:bg-[#b3541e] border border-[#483728] group-hover:border-[#b3541e] flex items-center justify-center text-[#e0956a] group-hover:text-white shrink-0 transition-all duration-300 shadow-inner group-hover:shadow-[0_0_15px_rgba(179,84,30,0.4)]">
                      <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                        <span className="font-mono text-[11px] tracking-[1.8px] uppercase text-[#e0956a] font-semibold group-hover:text-[#ffab7b] transition-colors">
                          {fact.term}
                        </span>
                        <span className="font-mono text-[10px] tracking-wider uppercase text-[#8c7a68] px-2.5 py-0.5 rounded-full bg-[#1b1510] border border-[#362a20]">
                          {fact.tag}
                        </span>
                      </div>
                      <p className="text-[#cbbba9] group-hover:text-[#e4d9cc] text-[14.5px] leading-relaxed transition-colors">
                        {fact.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            
            {/* Editorial Quote Box */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-6 p-6 md:p-7 rounded-[22px] bg-gradient-to-r from-[#291e16] to-[#1f1712] border border-[#4a392b] relative overflow-hidden shadow-lg group hover:border-[#b3541e]/50 transition-colors"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#b3541e]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10 flex items-start gap-4">
                <span className="font-display text-[48px] leading-none text-[#e0956a] select-none -mt-3">“</span>
                <div>
                  <p className="font-display italic font-normal text-[clamp(21px,2.4vw,28px)] leading-[1.3] text-[#fbf6ef]">
                    Nobody ever regretted one more cup, taken slowly.
                  </p>
                  <span className="font-mono text-[11px] tracking-[1.5px] uppercase text-[#9c8976] mt-2 block">
                    — From the Barista Desk, Copper & Crema
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visual Roastery Frames with Hover Zoom & Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            <div className="grid grid-cols-2 gap-4">
              
              {/* Photo 1: Coffee beans in warm light */}
              <motion.div 
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="group rounded-[20px] overflow-hidden bg-[#241c16] border border-[#443528] hover:border-[#b3541e]/60 transition-all duration-500 shadow-2xl mt-10 relative"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=75"
                    alt="Coffee beans roasted in warm light" 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5">
                    <span className="font-mono text-[9.5px] tracking-[1.2px] uppercase bg-black/50 backdrop-blur-md text-[#ffcca3] px-2.5 py-1 rounded-full border border-white/10 block w-fit mb-1 font-semibold">
                      Direct Trade Lots
                    </span>
                    <p className="text-[12px] font-display text-[#f6efe7] leading-tight">
                      Small-batch roast profiles
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Photo 2: Latte Art Pour */}
              <motion.div 
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="group rounded-[20px] overflow-hidden bg-[#241c16] border border-[#443528] hover:border-[#b3541e]/60 transition-all duration-500 shadow-2xl relative"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=75"
                    alt="Barista pouring silky latte art" 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5">
                    <span className="font-mono text-[9.5px] tracking-[1.2px] uppercase bg-[#b3541e] text-white px-2.5 py-1 rounded-full shadow-md block w-fit mb-1 font-semibold">
                      Silk Microfoam
                    </span>
                    <p className="text-[12px] font-display text-[#f6efe7] leading-tight">
                      Steamed at 64°C precisely
                    </p>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Floating Atelier Stamp / Seal */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              className="mt-5 p-4 rounded-[18px] bg-[#1e1712]/90 border border-[#443528] hover:border-[#b3541e]/50 backdrop-blur-md flex items-center justify-between gap-4 shadow-xl transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#b3541e] to-[#78320e] flex items-center justify-center text-white shadow-md shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-display text-[16.5px] text-[#fbf6ef] leading-tight">
                    Heritage Roasting Floor
                  </div>
                  <div className="font-mono text-[10.5px] text-[#a4917e] tracking-wider uppercase">
                    Roasted On-Site • Bangalore
                  </div>
                </div>
              </div>

              <span className="font-mono text-[11px] font-semibold text-[#e0956a] px-3 py-1 rounded-full bg-[#35251a] border border-[#523c2a] shrink-0">
                Est. 2026
              </span>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
