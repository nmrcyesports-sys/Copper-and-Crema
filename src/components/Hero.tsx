import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface HeroProps {
  onReserve?: (type?: 'tasting' | 'table') => void;
}

export default function Hero({ onReserve }: HeroProps) {
  return (
    <header id="top" className="relative pt-[150px] pb-[72px] md:pt-[120px] overflow-hidden bg-gradient-to-b from-[#f9f5ee]/70 via-[#f5ede1]/60 to-[#f7f2e8]/70 backdrop-blur-[2px]">
      {/* Top subtle radiant copper accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#b3541e]/50 to-transparent pointer-events-none" />

      {/* Aesthetic Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated ambient warm glows */}
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.75, 0.5], x: [0, 30, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-brand-accent/[0.09] blur-[130px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4], y: [0, -30, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[15%] right-[-10%] w-[45vw] h-[65vw] rounded-full bg-[#e0956a]/[0.10] blur-[140px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.65, 0.4], x: [0, -20, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-15%] left-[25%] w-[60vw] h-[50vw] rounded-full bg-[#d48b59]/[0.08] blur-[150px]" 
        />

        {/* Delicate Architectural Roastery Geometry Watermark */}
        <div className="absolute inset-0 opacity-[0.035] mix-blend-multiply pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="heroLattice" width="70" height="70" patternUnits="userSpaceOnUse">
                <path d="M 70 0 L 0 0 0 70" fill="none" stroke="#8a4b23" strokeWidth="0.8" />
                <circle cx="35" cy="35" r="1.5" fill="#8a4b23" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#heroLattice)" />
          </svg>
        </div>

        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.2] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-7 grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-10 md:gap-14 items-center relative z-10">
        <div>
          <motion.p 
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0 }}
            className="eyebrow"
          >
            Warming up the space
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08 }}
            className="font-display font-normal text-[clamp(46px,6.4vw,78px)] leading-[1.02] tracking-[-0.5px] mt-[22px] mb-[24px]"
          >
            Built for coffee,<br/>and <em className="italic text-brand-accent-deep">made to stay in.</em>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.16 }}
            className="text-[17.5px] text-brand-text-mid max-w-[52ch] mb-[36px] font-normal"
          >
            Copper & Crema is an all-day cafe where specialty coffee, warm baking,
            and quiet conversation sit comfortably together. The space is lighter than
            a rush-stop counter, and warmer than a studio set.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.24 }}
            className="flex gap-[12px] flex-wrap items-center"
          >
            <a 
              href="#menu" 
              className="inline-flex items-center justify-center font-mono text-[11.5px] tracking-[1.2px] uppercase no-underline px-[26px] py-[14px] rounded-full transition-all bg-brand-accent text-white hover:bg-brand-accent-deep hover:-translate-y-[2px] shadow-sm font-semibold cursor-pointer"
            >
              The Counter Menu
            </a>
            <a 
              href="#why-visit" 
              className="inline-flex items-center justify-center font-mono text-[11.5px] tracking-[1.2px] uppercase no-underline px-[24px] py-[14px] rounded-full transition-all border border-brand-line bg-brand-surface/90 hover:bg-brand-surface text-brand-text hover:border-brand-accent hover:text-brand-accent-deep hover:-translate-y-[2px] font-medium"
            >
              Visit Us →
            </a>
          </motion.div>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.16 }}
          className="relative rounded-[16px] overflow-hidden shadow-brand aspect-[5/6] bg-brand-bg-deep border border-brand-line-soft/80 group"
        >
          <motion.img 
               src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=75"
               alt="A ceramic cup of coffee resting on a wooden cafe table in soft morning light" 
               className="w-full h-full object-cover origin-center transition-transform duration-700 group-hover:scale-105"
               initial={{ scale: 1.15 }}
               animate={{ scale: 1 }}
               transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </header>
  );
}
