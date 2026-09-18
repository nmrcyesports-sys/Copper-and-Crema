import { useState } from 'react';
import { motion } from 'motion/react';

const menuData = {
  'espresso': [
    { name: "Espresso", price: "₹180", desc: "Double shot, single-origin rotation" },
    { name: "Cortado", price: "₹220", desc: "Equal parts espresso and silk-steamed milk" },
    { name: "Flat White", price: "₹230", desc: "Velvet microfoam, ristretto base" },
    { name: "Filter Kaapi", price: "₹160", desc: "South Indian filter, hot or frothy" },
    { name: "Pour Over", price: "₹280", desc: "Slow brew of the week — ask the counter" },
    { name: "Cold Brew", price: "₹240", desc: "18-hour steep, orange peel note" },
    { name: "Cupping Flight", price: "₹350", desc: "Three origins, side by side" },
    { name: "House Chai", price: "₹150", desc: "Slow-simmered, whole spice" },
  ],
  'bakery': [
    { name: "Butter Croissant", price: "₹140", desc: "Laminated over three days" },
    { name: "Pain au Chocolat", price: "₹160", desc: "Two bars of dark couverture" },
    { name: "Cardamom Bun", price: "₹160", desc: "Knotted, buttery, green-cardamom sugar" },
    { name: "Cinnamon Roll", price: "₹170", desc: "Warm from 8 AM till it runs out" },
    { name: "Banana Bread", price: "₹150", desc: "Toasted, salted butter on the side" },
    { name: "Sourdough Toast", price: "₹130", desc: "Thick cut, house cultured starter" },
  ],
  'plates': [
    { name: "Avocado Toast", price: "₹320", desc: "Sourdough, chili oil, feta snow" },
    { name: "Masala Toast", price: "₹220", desc: "Green chutney, onion-tomato crunch" },
    { name: "Eggs Your Way", price: "₹280", desc: "Any style, house sourdough, side salad" },
    { name: "Big Slow Breakfast", price: "₹420", desc: "Eggs, sausage, roast tomato, roasted cremini, toast" },
    { name: "Granola Bowl", price: "₹260", desc: "House granola, curd, seasonal fruit, honey" },
    { name: "Soup & Sandwich", price: "₹340", desc: "Rotating pot, grilled cheese on sourdough" },
  ],
  'sweet': [
    { name: "Basque Cheesecake", price: "₹280", desc: "Burnt top, custard heart" },
    { name: "Tiramisu Jar", price: "₹260", desc: "Our espresso, mascarpone, cocoa dust" },
    { name: "Affogato", price: "₹220", desc: "Vanilla bean gelato drowned in espresso" },
    { name: "Dark Chocolate Cookie", price: "₹120", desc: "Sea salt, warm if you time it right" },
    { name: "Seasonal Galette", price: "₹240", desc: "Ask the counter what's baking" },
  ]
};

export default function Menu() {
  const [activeTab, setActiveTab] = useState<keyof typeof menuData>('espresso');

  return (
    <section id="menu" className="py-[100px] bg-gradient-to-b from-[#f4ede2]/75 via-[#f0e7d7]/68 to-[#f5eee3]/75 backdrop-blur-[2px] relative overflow-hidden">
      {/* Top and bottom subtle glowing copper accent lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#b3541e]/35 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#b3541e]/25 to-transparent pointer-events-none" />

      {/* Aesthetic Background ambient lighting accents */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-brand-accent/[0.05] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-[#d98236]/[0.05] rounded-full blur-[160px] pointer-events-none" />

      {/* Delicate vintage ledger grid watermark */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025] mix-blend-multiply overflow-hidden">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="menuGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#7e4620" strokeWidth="0.7" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#menuGrid)" />
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto px-7 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.7 }}
          className="mb-[52px]"
        >
          <p className="eyebrow">Fresh from the counter</p>
          <h2 className="font-display font-normal text-[clamp(34px,4.4vw,52px)] leading-[1.08] tracking-[-0.3px] mt-[18px] max-w-[22ch]">The Counter Menu.</h2>
          <p className="text-brand-text-mid max-w-[58ch] mt-[16px] text-[16px]">The counter menu moves from espresso and bakery staples into toast, breakfast plates, and desserts that feel calm, generous, and worth staying for.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.7, delay: 0.08 }}
          className="flex gap-[8px] flex-wrap mb-[44px]"
        >
          {[
            { id: 'espresso', label: 'Espresso & Brews' },
            { id: 'bakery', label: 'From the Bakery' },
            { id: 'plates', label: 'Slower Plates' },
            { id: 'sweet', label: 'Something Sweet' },
          ].map(tab => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab(tab.id as keyof typeof menuData)}
              className={`font-mono text-[11px] tracking-[1.4px] uppercase px-[20px] py-[10px] rounded-full border transition-all duration-200 cursor-pointer
                ${activeTab === tab.id 
                  ? 'bg-brand-text border-brand-text text-brand-bg shadow-sm' 
                  : 'bg-transparent border-brand-line text-brand-text-mid hover:border-brand-accent hover:text-brand-accent-deep'
                }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        <div className="min-h-[300px]">
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.04
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-[64px] gap-y-0"
          >
            {menuData[activeTab].map((item, i) => (
              <motion.div 
                key={i} 
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
                }}
                whileHover={{ x: 4 }}
                className="group flex flex-col py-[18px] border-b border-dashed border-brand-line min-w-0 transition-colors cursor-default"
              >
                <div className="flex flex-wrap items-baseline gap-[12px] flex-1 min-w-0">
                  <span className="font-semibold text-[15.5px] whitespace-nowrap group-hover:text-brand-accent transition-colors">{item.name}</span>
                  <span className="flex-1 border-b border-dotted border-brand-line -translate-y-1 min-w-[20px] group-hover:border-brand-accent/40 transition-colors"></span>
                  <span className="font-mono text-[13.5px] text-brand-accent-deep whitespace-nowrap font-medium">{item.price}</span>
                </div>
                <span className="basis-full text-brand-text-dim text-[13px] mt-[2px] group-hover:text-brand-text-mid transition-colors">{item.desc}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <p className="mt-[44px] text-center font-mono text-[11px] tracking-[1.6px] uppercase text-brand-text-dim">
          Prices in ₹ · Oat, almond or soy at no extra charge
        </p>
      </div>
    </section>
  );
}
