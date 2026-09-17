import { motion } from 'motion/react';

export default function Hero() {
  return (
    <header id="top" className="relative pt-[150px] pb-[72px] md:pt-[120px] overflow-hidden">
      {/* Aesthetic Background Elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 pointer-events-none z-[-1] overflow-hidden"
      >
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6], x: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-accent/[0.12] blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[20%] right-[-10%] w-[40vw] h-[60vw] rounded-full bg-[#e0956a]/[0.12] blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.9, 0.6], x: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[50vw] rounded-full bg-brand-sage/[0.12] blur-[120px]" 
        />
        <div className="absolute inset-0 opacity-[0.25] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
      </motion.div>

      <div className="max-w-[1200px] mx-auto px-7 grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-10 md:gap-14 items-center">
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
            className="flex gap-[14px] flex-wrap"
          >
            <a href="#menu" className="inline-block font-mono text-[11.5px] tracking-[1.2px] uppercase no-underline px-[26px] py-[14px] rounded-full transition-all bg-brand-accent text-white hover:bg-brand-accent-deep hover:-translate-y-[2px]">See the menu</a>
            <a href="#visit" className="inline-block font-mono text-[11.5px] tracking-[1.2px] uppercase no-underline px-[26px] py-[14px] rounded-full transition-all border border-brand-line text-brand-text-mid hover:border-brand-accent hover:text-brand-accent-deep hover:-translate-y-[2px]">Visit us</a>
          </motion.div>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.16 }}
          className="relative rounded-[14px] overflow-hidden shadow-brand aspect-[5/6] bg-brand-bg-deep"
        >
          <motion.img 
               src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=75"
               alt="A ceramic cup of coffee resting on a wooden cafe table in soft morning light" 
               className="w-full h-full object-cover origin-center"
               initial={{ scale: 1.15 }}
               animate={{ scale: 1 }}
               transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          />
        </motion.div>
      </div>
    </header>
  );
}
