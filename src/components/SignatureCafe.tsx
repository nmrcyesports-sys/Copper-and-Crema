import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Flame, Coffee, Heart, Utensils, ChevronRight } from 'lucide-react';

interface SignatureProduct {
  id: string;
  name: string;
  category: 'coffee' | 'bakery' | 'kitchen';
  price: string;
  tag: string;
  rating: string;
  reviews: number;
  notes: string[];
  desc: string;
  originInfo: string;
  img: string;
}

const bestsellerProducts: SignatureProduct[] = [
  {
    id: 'honey-flat-white',
    name: 'Burnt Honey Flat White',
    category: 'coffee',
    price: '₹260',
    tag: '#1 Drink Bestseller',
    rating: '4.98',
    reviews: 312,
    notes: ['Wild Forest Honey', 'Yirgacheffe Citrus', 'Velvet Foam'],
    desc: 'Wild mountain honey caramelized slowly in copper vessels, blended with a double ristretto shot of high-elevation Ethiopian beans and steamed silky milk.',
    originInfo: 'Yirgacheffe, Ethiopia (Natural Process) • Light-Medium Roast',
    img: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=75'
  },
  {
    id: 'cardamom-croissant',
    name: 'Cardamom Pistachio Croissant',
    category: 'bakery',
    price: '₹240',
    tag: 'Pastry Bestseller',
    rating: '4.95',
    reviews: 280,
    notes: ['Green Cardamom', 'Bronte Pistachio', '72-Layer Flake'],
    desc: 'Seventy-two hours of slow cold-lamination with Normandy butter, filled with aromatic hand-ground green cardamom frangipane and topped with crushed Sicilian pistachios.',
    originInfo: 'Normandy Cultured Butter AOP • Freshly Laminated Daily',
    img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=75'
  },
  {
    id: 'geisha-cold-drip',
    name: 'Geisha Cold Drip Reserve',
    category: 'coffee',
    price: '₹340',
    tag: 'Barista Choice',
    rating: '4.99',
    reviews: 194,
    notes: ['Jasmine Florals', 'Bergamot', 'White Peach'],
    desc: 'A fourteen-hour slow ice-drip extraction of rare Panama Geisha. Unbelievably delicate, tea-like, and crystal clean, presented over a hand-carved crystal ice sphere.',
    originInfo: 'Boquete, Panama • Elevation 1,850m • Washed Lot',
    img: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=75'
  },
  {
    id: 'ricotta-fig-brioche',
    name: 'Whipped Ricotta & Fig Brioche',
    category: 'kitchen',
    price: '₹380',
    tag: 'Brunch Favorite',
    rating: '4.92',
    reviews: 165,
    notes: ['Fresh Mission Figs', 'House Whipped Ricotta', 'Thyme Blossom'],
    desc: 'Thick toasted Hokkaido milk brioche spread with whole-milk lemon ricotta, sliced sweet figs, sea salt crystals, and drizzled with mountain thyme blossom honey.',
    originInfo: 'Artisanal Brioche • Local Organic Dairy Farm',
    img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=75'
  },
  {
    id: 'crema-cold-brew',
    name: 'Orange Crema Cold Brew',
    category: 'coffee',
    price: '₹280',
    tag: 'Summer Icon',
    rating: '4.91',
    reviews: 210,
    notes: ['Valencia Orange Peel', 'Dark Chocolate', 'Spiced Float'],
    desc: 'Eighteen-hour steeped Chikmagalur dark roast infused with sun-dried Valencia orange zest, finished with a chilled cinnamon sweet cream floating cloud.',
    originInfo: 'Western Ghats, India • 18-Hour Slow Immersion',
    img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=75'
  },
  {
    id: 'canele-bordeaux',
    name: 'Tahitian Vanilla Canelé',
    category: 'bakery',
    price: '₹190',
    tag: 'House Classic',
    rating: '4.96',
    reviews: 245,
    notes: ['Caramelized Crust', 'Tahitian Vanilla', 'Custard Center'],
    desc: 'Baked inside traditional copper fluted molds lined with pure local beeswax. Shattering caramelized mahogany exterior giving way to a rich, custardy vanilla crumb.',
    originInfo: 'Hand-seasoned Copper Molds • 48-Hour Batter Rest',
    img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=75'
  }
];

interface SignatureCafeProps {
  onReserve?: (type?: 'tasting' | 'table' | 'sensory-flight') => void;
}

export default function SignatureCafe({ onReserve }: SignatureCafeProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'coffee' | 'bakery' | 'kitchen'>('all');
  const [favorited, setFavorited] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string) => {
    setFavorited(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredProducts = activeFilter === 'all' 
    ? bestsellerProducts 
    : bestsellerProducts.filter(p => p.category === activeFilter);

  return (
    <section id="signature-cafe" className="py-[110px] bg-gradient-to-b from-[#f7f2e8]/75 via-[#faf6ee]/68 to-[#f4ede2]/75 backdrop-blur-[2px] relative overflow-hidden">
      {/* Top and bottom subtle glowing copper accent lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#b3541e]/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#b3541e]/25 to-transparent pointer-events-none" />

      {/* Aesthetic Background ambient lighting accents */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-brand-accent/[0.06] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-[-5%] w-[500px] h-[500px] bg-[#d98236]/[0.05] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-[#f0d8c0]/[0.15] rounded-full blur-[180px] pointer-events-none" />

      {/* Architectural roastery lattice watermark SVG */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply overflow-hidden">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="signatureGrid" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M 64 0 L 0 0 0 64" fill="none" stroke="#7e4620" strokeWidth="0.8" />
              <circle cx="32" cy="32" r="1.2" fill="#7e4620" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#signatureGrid)" />
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto px-7 relative z-10">
        
        {/* Header Section with Scroll Entrance */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-[48px]"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="eyebrow">Signature Cafe</span>
              <span className="inline-flex items-center gap-1 font-mono text-[10px] tracking-[1.2px] uppercase bg-brand-accent/10 text-brand-accent px-2.5 py-0.5 rounded-full font-semibold border border-brand-accent/20">
                <Flame className="w-3 h-3" /> All-Time Bestsellers
              </span>
            </div>
            <h2 className="font-display font-normal text-[clamp(34px,4.5vw,52px)] leading-[1.08] tracking-[-0.3px] mt-[16px]">
              The cups and plates that made our name.
            </h2>
          </div>

          {/* Filter Pills with Hover animations */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { key: 'all', label: 'All Bestsellers' },
              { key: 'coffee', label: 'Coffee Crafts' },
              { key: 'bakery', label: 'Artisan Bakery' },
              { key: 'kitchen', label: 'Warm Kitchen' }
            ].map((tab) => (
              <motion.button
                key={tab.key}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveFilter(tab.key as any)}
                className={`px-4 py-2 rounded-full font-mono text-[11.5px] tracking-[1px] uppercase transition-all whitespace-nowrap cursor-pointer ${
                  activeFilter === tab.key
                    ? 'bg-brand-text text-brand-surface shadow-md'
                    : 'bg-brand-surface border border-brand-line text-brand-text-mid hover:border-brand-accent hover:text-brand-accent'
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Bestseller Grid with Scroll Animations */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                className="group flex flex-col justify-between rounded-[22px] bg-brand-surface border border-brand-line-soft hover:border-brand-accent/40 overflow-hidden shadow-brand hover:shadow-2xl transition-all duration-300"
              >
                {/* Photo & Tag container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-brand-bg-deep">
                  <img 
                    src={product.img} 
                    alt={product.name} 
                    className="w-full h-full object-cover origin-center transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30 pointer-events-none" />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                    <span className="font-mono text-[10px] tracking-[1.2px] uppercase bg-brand-accent text-white px-3 py-1 rounded-full font-semibold shadow-md flex items-center gap-1 group-hover:bg-brand-accent-deep transition-colors">
                      <Sparkles className="w-3 h-3" /> {product.tag}
                    </span>
                  </div>

                  {/* Favorite button with bounce animation */}
                  <motion.button 
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.85 }}
                    onClick={() => toggleFavorite(product.id)}
                    aria-label="Save to favorites"
                    className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/85 hover:bg-white backdrop-blur-md flex items-center justify-center text-brand-text transition-colors shadow-sm cursor-pointer z-10"
                  >
                    <Heart className={`w-4 h-4 transition-colors ${favorited[product.id] ? 'fill-red-500 text-red-500' : 'text-brand-text-mid'}`} />
                  </motion.button>

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-[13px]">
                    <span className="font-mono bg-black/45 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] tracking-wider border border-white/10">
                      ★ {product.rating} ({product.reviews})
                    </span>
                    <span className="font-display text-[23px] tracking-wide text-[#ffecd1] drop-shadow-md font-semibold">
                      {product.price}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-display font-normal text-[25px] leading-tight mb-2.5 text-brand-text group-hover:text-brand-accent transition-colors">
                      {product.name}
                    </h3>

                    {/* Tasting / Flavor notes pills */}
                    <div className="flex flex-wrap gap-1.5 mb-3.5">
                      {product.notes.map((note, noteIdx) => (
                        <span key={noteIdx} className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full bg-brand-bg border border-brand-line-soft text-brand-text-mid group-hover:border-brand-accent/20 transition-colors">
                          {note}
                        </span>
                      ))}
                    </div>

                    <p className="text-[14px] text-brand-text-mid leading-relaxed mb-4 line-clamp-3">
                      {product.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-brand-line-soft flex items-center justify-between gap-2">
                    <span className="text-[11.5px] font-mono text-brand-text-dim truncate max-w-[190px]">
                      {product.originInfo}
                    </span>

                    {onReserve && (
                      <button 
                        onClick={() => onReserve('table')}
                        className="font-mono text-[11px] tracking-[1px] uppercase text-brand-accent hover:text-brand-accent-deep font-semibold flex items-center gap-1 cursor-pointer transition-all hover:translate-x-1 shrink-0"
                      >
                        <span>Taste at Cafe</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
