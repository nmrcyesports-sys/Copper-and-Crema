import { motion } from 'motion/react';

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="border-t border-brand-line-soft py-[44px] bg-brand-bg"
    >
      <div className="max-w-[1200px] mx-auto px-7 flex justify-between items-center gap-[24px] flex-wrap">
        <span className="font-display text-[18px]">Copper & Crema</span>
        <p className="text-[13px] text-brand-text-dim">An all-day specialty cafe — espresso, bakery, and slower plates.</p>
        <p className="text-[13px] text-brand-text-dim">© 2026 Copper & Crema · Demo site</p>
      </div>
    </motion.footer>
  );
}
