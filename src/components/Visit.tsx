import { motion } from 'motion/react';

export default function Visit() {
  return (
    <section id="visit" className="py-[96px]">
      <div className="max-w-[1200px] mx-auto px-7">
        <motion.div 
          initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.7 }}
          className="border border-brand-line-soft rounded-[18px] p-[52px_26px] md:p-[72px_56px] text-center shadow-brand"
          style={{ background: 'linear-gradient(135deg, var(--color-brand-accent-soft), transparent 55%), var(--color-brand-surface)' }}
        >
          <p className="eyebrow justify-center">Come sit a while</p>
          <h2 className="font-display font-normal text-[clamp(34px,4.2vw,50px)] leading-[1.1] my-[18px] md:my-[20px] mx-auto max-w-[20ch]">Built as a cafe, ready for your table.</h2>
          <p className="text-brand-text-mid max-w-[56ch] mx-auto mb-[36px]">Walk in for a quick espresso or settle in for the afternoon — the space is set up for both. Reserve ahead, or just follow the smell of the bakery.</p>
          <a href="mailto:hello@copperandcrema.example" className="inline-block font-mono text-[11.5px] tracking-[1.2px] uppercase no-underline px-[26px] py-[14px] rounded-full transition-all bg-brand-accent text-white hover:bg-brand-accent-deep hover:-translate-y-[2px]">Reserve a table</a>
          
          <motion.dl 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.3
                }
              }
            }}
            className="flex justify-center gap-[40px] flex-wrap mt-[48px] pt-[40px] border-t border-brand-line-soft"
          >
            {[
              { label: "Hours", value: "7:30 — 22:00, daily" },
              { label: "Kitchen", value: "Till 21:00" },
              { label: "Find us", value: "12 Lane Road, your city" },
              { label: "Call", value: "+91 · 98xxx xxxxx" }
            ].map((meta, i) => (
              <motion.div 
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                className="min-w-[140px]"
              >
                <dt className="font-mono text-[10.5px] tracking-[2px] uppercase text-brand-text-dim mb-[6px]">{meta.label}</dt>
                <dd className="font-semibold text-[15px]">{meta.value}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  );
}
