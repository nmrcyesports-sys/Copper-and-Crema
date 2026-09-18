import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, Coffee, Clock, Heart, Sparkles, Award, Utensils, 
  Flame, Compass, Droplets, Calendar, Users, ChevronRight, CheckCircle2
} from 'lucide-react';

interface WhyPeopleVisitProps {
  onReserve?: (type?: 'tasting' | 'table') => void;
}

interface TastingLot {
  id: string;
  name: string;
  elevation: string;
  process: string;
  origin: string;
  flavorNotes: string[];
  description: string;
  tempEvolution: string;
}

const tastingLots: TastingLot[] = [
  {
    id: 'geisha',
    name: 'Panama Boquete Geisha Reserve',
    elevation: '1,850 MASL',
    origin: 'Boquete Valley, Panama',
    process: 'Washed Extended Fermentation',
    flavorNotes: ['Jasmine Floral', 'Bergamot Zest', 'White Peach', 'Cane Sugar'],
    description: 'Prized for an intoxicating perfume of spring jasmine and crisp white tea. Incredibly silky body with high crystalline clarity.',
    tempEvolution: 'Opens floral and citrusy at 65°C, transforming into sweet honeydew and ripe stone fruit as it cools to 45°C.'
  },
  {
    id: 'anaerobic',
    name: 'Chikmagalur Red Honey Anaerobic',
    elevation: '1,420 MASL',
    origin: 'Western Ghats, India',
    process: '72h Anaerobic Maceration • Red Honey',
    flavorNotes: ['Wild Blackberry', 'Toffee Crust', 'Cardamom', 'Cacao Nib'],
    description: 'Sourced from shade-grown forest canopy under silver oaks. Dense natural sweetness with spiced confectionery undertones.',
    tempEvolution: 'Rich molten brown sugar and dark berry jam when piping hot, finishing with spiced cardamom chocolate sweetness.'
  },
  {
    id: 'yirgacheffe',
    name: 'Ethiopia Yirgacheffe Gedeb G1',
    elevation: '2,100 MASL',
    origin: 'Gedeb District, Ethiopia',
    process: 'Sun-Dried African Raised Beds',
    flavorNotes: ['Meyer Lemon', 'Lavender Blossom', 'Dried Apricot', 'Earl Grey'],
    description: 'Classic heirloom varietals slow-dried in cherry for 24 days. Radiant winey sweetness and a lingering lavender finish.',
    tempEvolution: 'Starts bright with Meyer lemon and sparkling tea tannins, settling into sweet apricot marmalade and wild honey.'
  }
];

export default function WhyPeopleVisit({ onReserve }: WhyPeopleVisitProps) {
  const [selectedLot, setSelectedLot] = useState<string>('geisha');
  const [activeStep, setActiveStep] = useState<number>(0);

  const activeLotData = tastingLots.find(lot => lot.id === selectedLot) || tastingLots[0];

  const experienceFormats = [
    {
      title: "The Head Barista Tasting Table",
      badge: "Signature Sensory Flight",
      badgeColor: "bg-brand-accent text-white",
      time: "45 Minutes",
      capacity: "Intimate • Max 6 guests",
      price: "₹450 / guest",
      tagline: "A guided flight of three contrasting micro-lots, brewed three different ways.",
      features: [
        "3 Single-origin comparative extractions (Geisha, Anaerobic Honey, Washed)",
        "Aroma cupping & flavor scorecard with head barista",
        "Warm cardamon croissant or almond brioche pairing",
        "Souvenir tasting wheel & single-origin coffee card"
      ],
      type: "tasting" as const,
      popular: true
    },
    {
      title: "The Roaster's Floor & Live Crack",
      badge: "Behind The Scenes",
      badgeColor: "bg-[#292019] text-[#e0956a] border border-[#4a3a2e]",
      time: "30 Minutes",
      capacity: "Tuesday & Thursday mornings",
      price: "Complimentary with reservation",
      tagline: "Watch green beans transform inside our vintage German drum roaster.",
      features: [
        "Live roasting observation through yellowing, first crack, and drop",
        "Raw green bean tactile inspection (moisture & screen grading)",
        "Discussion on development ratio, airflow, and burner curve",
        "Fresh 50g sample bag of the morning roast batch"
      ],
      type: "tasting" as const,
      popular: false
    },
    {
      title: "The Unhurried Cafe Table",
      badge: "Breakfast & Slow Living",
      badgeColor: "bg-brand-sage text-white",
      time: "75–90 Minutes",
      capacity: "Solo, couples, or small tables",
      price: "A la carte kitchen menu",
      tagline: "A reserved haven for hot bakery bakes, sourdough plates, and reading.",
      features: [
        "Reserved window table or quiet banquette corner",
        "Wheel-thrown artisan stoneware service",
        "Full access to kitchen bakes, poached eggs, and tartines",
        "No rushed table turns — linger as long as you desire"
      ],
      type: "table" as const,
      popular: false
    }
  ];

  const sensorySteps = [
    {
      phase: "Phase 01",
      title: "Dry Aroma & Green Lot Analysis",
      desc: "Before water touches the beans, examine whole roasted beans and fresh grinds in warmed porcelain bowls. Learn to detect subtle floral aromatics, cacao nibs, and fruit esters.",
      stat: "24h post-roast rest",
      icon: Coffee
    },
    {
      phase: "Phase 02",
      title: "The Crust & Silver Spoon Break",
      desc: "Filtered water hits the coffee at precisely 93.5°C. After 4 minutes of steeping, we break the aromatic crust with custom silver cupping spoons, releasing trapped steam volatiles.",
      stat: "93.5°C soft mineral water",
      icon: Droplets
    },
    {
      phase: "Phase 03",
      title: "Aspiration & Palate Cooling",
      desc: "Slurping aerates the coffee across your palate, stimulating both taste receptors and retro-nasal olfaction. Experience how sweetness blossoms as the cup cools to ambient warmth.",
      stat: "65°C down to 42°C spectrum",
      icon: Sparkles
    }
  ];

  const roasteryAmenities = [
    {
      icon: Compass,
      title: "Direct Trade Micro-Lots",
      desc: "Ethically contracted directly from family estates in Karnataka, Boquete, and Yirgacheffe."
    },
    {
      icon: Flame,
      title: "Cast-Iron Drum Roasting",
      desc: "Gentle convective heat transfer preserves delicate floral volatile compounds without smoky char."
    },
    {
      icon: Clock,
      title: "72-Hour Viennoiserie",
      desc: "House-made French pastry dough slowly laminated over three days with Normandy AOP butter."
    },
    {
      icon: Award,
      title: "Custom Ceramic Stoneware",
      desc: "Every vessel thrown locally by master potters to optimize thermal inertia and crema preservation."
    }
  ];

  const testimonials = [
    {
      quote: "Sitting at their tasting counter felt like entering a quiet Tokyo coffee atelier. The Geisha tasted like honeysuckle and peach tea.",
      author: "Aarav M.",
      title: "Coffee Explorer & Designer"
    },
    {
      quote: "The smell of cardamom morning buns coming out of the oven at 8:15 AM while watching the roaster spin is pure magic.",
      author: "Priya S.",
      title: "Architect & Regular Guest"
    },
    {
      quote: "No rushing, no aggressive playlist. Just pure craftsmanship, warm ceramic mugs, and the kindest baristas in Bangalore.",
      author: "Devang K.",
      title: "Culinary Journalist"
    }
  ];

  return (
    <section id="why-visit" className="py-[115px] bg-gradient-to-b from-[#f7f2e8]/75 via-[#faf6ef]/68 to-[#f4ede1]/75 backdrop-blur-[2px] relative overflow-hidden">
      {/* Top glowing copper accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#b3541e]/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#b3541e]/40 to-transparent pointer-events-none" />

      {/* Atmospheric radial ambient light diffusions */}
      <div className="absolute top-10 right-1/4 w-[600px] h-[600px] bg-brand-accent/[0.06] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[-5%] w-[550px] h-[550px] bg-[#dca176]/[0.07] rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[650px] h-[650px] bg-[#f0d8c0]/[0.12] rounded-full blur-[200px] pointer-events-none" />

      {/* Roastery cupping geometry watermark SVG */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.032] mix-blend-multiply overflow-hidden">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="visitCuppingGrid" width="72" height="72" patternUnits="userSpaceOnUse">
              <path d="M 72 0 L 0 0 0 72" fill="none" stroke="#7e4620" strokeWidth="0.8" />
              <circle cx="36" cy="36" r="1.5" fill="#7e4620" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#visitCuppingGrid)" />
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto px-7 relative z-10">
        
        {/* Main Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="max-w-[800px] mb-[64px]"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="eyebrow">The Experience</span>
            <span className="inline-flex items-center gap-1 font-mono text-[10px] tracking-[1.4px] uppercase bg-brand-accent/10 text-brand-accent px-2.5 py-0.5 rounded-full font-semibold border border-brand-accent/20">
              <Sparkles className="w-3 h-3" /> Sensory Roastery & Kitchen
            </span>
          </div>

          <h2 className="font-display font-normal text-[clamp(36px,5vw,56px)] leading-[1.06] tracking-[-0.4px] mt-2 text-brand-text">
            Experience our roastery firsthand.
          </h2>

          <p className="text-brand-text-mid text-[17px] leading-relaxed mt-4 max-w-[66ch]">
            Step past the espresso counter and onto our working roastery floor. From cupping rare micro-lot harvests to watching the cast-iron drum roaster in motion, we invite you to experience coffee as a slow, deliberate ritual.
          </p>
        </motion.div>

        {/* 3 Experience Format Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 mb-20">
          {experienceFormats.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              whileHover={{ y: -6 }}
              className={`rounded-[22px] p-7 md:p-8 flex flex-col justify-between transition-all duration-300 relative shadow-brand border ${
                exp.popular 
                  ? 'bg-brand-surface border-brand-accent/40 shadow-xl' 
                  : 'bg-brand-surface/80 hover:bg-brand-surface border-brand-line-soft hover:border-brand-line'
              }`}
            >
              {exp.popular && (
                <div className="absolute -top-3.5 right-6 bg-brand-accent text-white font-mono text-[10px] tracking-[1.5px] uppercase font-semibold px-3 py-1 rounded-full shadow-md">
                  Most Requested
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`font-mono text-[10px] tracking-[1.2px] uppercase font-semibold px-2.5 py-1 rounded-full ${exp.badgeColor}`}>
                    {exp.badge}
                  </span>
                  <span className="font-mono text-[11px] text-brand-text-dim flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-accent" /> {exp.time}
                  </span>
                </div>

                <h3 className="font-display font-normal text-[26px] text-brand-text leading-tight mb-2">
                  {exp.title}
                </h3>

                <p className="text-brand-text-mid text-[14px] leading-relaxed mb-6">
                  {exp.tagline}
                </p>

                <div className="py-3 px-4 rounded-[12px] bg-brand-bg/80 border border-brand-line-soft mb-6 flex items-center justify-between">
                  <span className="text-[12px] font-mono text-brand-text-dim">{exp.capacity}</span>
                  <span className="font-mono font-semibold text-[13px] text-brand-accent-deep">{exp.price}</span>
                </div>

                {/* Features list */}
                <div className="space-y-3 mb-8">
                  {exp.features.map((feat, featIdx) => (
                    <div key={featIdx} className="flex items-start gap-2.5 text-[13px] text-brand-text-mid leading-snug">
                      <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {onReserve && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onReserve(exp.type)}
                  className={`w-full py-3.5 rounded-full font-mono text-[11.5px] tracking-[1.2px] uppercase font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    exp.popular
                      ? 'bg-brand-accent hover:bg-brand-accent-deep text-white shadow-md'
                      : 'bg-brand-bg hover:bg-brand-accent hover:text-white text-brand-text border border-brand-line hover:border-transparent'
                  }`}
                >
                  <span>{exp.type === 'tasting' ? 'Book Tasting Table' : 'Reserve Table'}</span>
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Interactive Sensory Tasting Lot Explorer */}
        <motion.div 
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="rounded-[24px] bg-brand-surface border border-brand-line-soft p-8 md:p-12 mb-20 shadow-brand"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-brand-line-soft mb-8">
            <div>
              <span className="font-mono text-[11px] tracking-[2px] uppercase text-brand-accent font-semibold block mb-2">
                On The Cupping Table This Week
              </span>
              <h3 className="font-display text-[30px] md:text-[36px] text-brand-text leading-tight">
                Explore our three single-lot origins.
              </h3>
            </div>

            {/* Origin lot selector pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {tastingLots.map(lot => (
                <button
                  key={lot.id}
                  onClick={() => setSelectedLot(lot.id)}
                  className={`px-4 py-2.5 rounded-full font-mono text-[11.5px] tracking-[1px] uppercase transition-all whitespace-nowrap cursor-pointer ${
                    selectedLot === lot.id
                      ? 'bg-brand-text text-brand-bg shadow-sm'
                      : 'bg-brand-bg border border-brand-line text-brand-text-mid hover:border-brand-accent hover:text-brand-accent'
                  }`}
                >
                  {lot.name.split(' ')[0]} Lot
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeLotData.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-2 text-[12px] font-mono text-brand-text-dim">
                  <span className="px-2.5 py-1 rounded-md bg-brand-bg border border-brand-line-soft text-brand-accent font-semibold">
                    {activeLotData.elevation}
                  </span>
                  <span>•</span>
                  <span>{activeLotData.origin}</span>
                  <span>•</span>
                  <span className="text-brand-sage font-medium">{activeLotData.process}</span>
                </div>

                <h4 className="font-display text-[26px] md:text-[32px] text-brand-text leading-tight">
                  {activeLotData.name}
                </h4>

                <p className="text-[15.5px] text-brand-text-mid leading-relaxed">
                  {activeLotData.description}
                </p>

                {/* Flavor Notes Tags */}
                <div>
                  <span className="font-mono text-[10.5px] tracking-[1.5px] uppercase text-brand-text-dim block mb-2">
                    Primary Tasting Notes
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeLotData.flavorNotes.map((note, noteIdx) => (
                      <span 
                        key={noteIdx}
                        className="px-3.5 py-1.5 rounded-full bg-brand-accent-soft/60 border border-brand-accent/30 text-brand-accent-deep font-mono text-[11.5px] font-semibold tracking-wide"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-[14px] bg-brand-bg border border-brand-line-soft">
                  <span className="font-mono text-[10.5px] tracking-[1.2px] uppercase text-brand-text-dim block mb-1">
                    Temperature Arc (65°C → 45°C)
                  </span>
                  <p className="text-[13px] text-brand-text-mid italic">
                    &ldquo;{activeLotData.tempEvolution}&rdquo;
                  </p>
                </div>
              </div>

              {/* Visual Photo Card */}
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] rounded-[20px] overflow-hidden border border-brand-line-soft shadow-lg bg-brand-bg-deep group">
                  <img 
                    src={
                      activeLotData.id === 'geisha'
                        ? 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=75'
                        : activeLotData.id === 'anaerobic'
                        ? 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=75'
                        : 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=75'
                    }
                    alt={activeLotData.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="font-mono text-[10px] tracking-[1.5px] uppercase bg-brand-accent text-white px-2.5 py-1 rounded-full font-semibold inline-block mb-1">
                      Served At Tasting Table
                    </span>
                    <p className="font-display text-[15px] text-white/90">
                      Paired with warm butter Viennoiserie
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* The 3-Phase Cupping Ritual Timeline */}
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-[620px] mx-auto mb-12"
          >
            <span className="eyebrow justify-center">The Barista Method</span>
            <h3 className="font-display text-[32px] md:text-[40px] text-brand-text mt-2">
              The Three-Phase Cupping Ritual
            </h3>
            <p className="text-brand-text-mid text-[15px] mt-3">
              How our head barista walks you through each lot during the guided session.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sensorySteps.map((step, sIdx) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={sIdx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: sIdx * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="p-7 rounded-[20px] bg-brand-surface border border-brand-line-soft hover:border-brand-accent/40 transition-all duration-300 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-full bg-brand-accent-soft text-brand-accent flex items-center justify-center font-semibold">
                        <StepIcon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-[11px] tracking-[1.5px] uppercase text-brand-accent font-semibold">
                        {step.phase}
                      </span>
                    </div>

                    <h4 className="font-display text-[21px] text-brand-text mb-2.5">
                      {step.title}
                    </h4>

                    <p className="text-[14px] text-brand-text-mid leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-brand-line-soft/80 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
                    <span className="font-mono text-[11px] text-brand-text-dim uppercase tracking-wider">
                      {step.stat}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 4 Roastery Craft Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {roasteryAmenities.map((item, aIdx) => {
            const ItemIcon = item.icon;
            return (
              <motion.div
                key={aIdx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: aIdx * 0.08 }}
                className="p-6 rounded-[18px] bg-brand-surface border border-brand-line-soft"
              >
                <div className="w-10 h-10 rounded-full bg-brand-bg text-brand-accent flex items-center justify-center mb-4 border border-brand-line-soft">
                  <ItemIcon className="w-5 h-5" />
                </div>
                <h4 className="font-display text-[18px] text-brand-text mb-1.5">
                  {item.title}
                </h4>
                <p className="text-[13px] text-brand-text-mid leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Guest Voices Testimonials Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-[22px] bg-brand-bg-deep p-8 md:p-12 border border-brand-line-soft"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-brand-line pb-6">
            <div>
              <span className="font-mono text-[10.5px] tracking-[2px] uppercase text-brand-accent font-semibold block mb-1">
                Guest Reflections
              </span>
              <h3 className="font-display text-[26px] text-brand-text">What our visitors love most</h3>
            </div>
            
            <div className="flex items-center gap-3 bg-brand-surface px-4 py-2 rounded-full border border-brand-line-soft self-start sm:self-auto">
              <div className="flex text-[#c97a3a]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-mono text-[12.5px] font-semibold text-brand-text">4.9 / 5</span>
              <span className="text-brand-text-dim text-[12px] font-medium">(480+ local reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item, idx) => (
              <div key={idx} className="flex flex-col justify-between">
                <p className="font-display italic text-[17px] text-brand-text-mid leading-relaxed mb-4">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div>
                  <div className="font-semibold text-[14px] text-brand-text">{item.author}</div>
                  <div className="text-brand-text-dim text-[12px]">{item.title}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
