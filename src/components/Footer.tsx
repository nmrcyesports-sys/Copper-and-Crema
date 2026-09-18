import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, Mail, MapPin, ExternalLink, Copy, Check, 
  Send, Navigation, Sparkles, ArrowUp, 
  Car, Train, Bike, Coffee, Heart
} from 'lucide-react';

interface FooterProps {
  onReserve?: (type?: 'tasting' | 'table') => void;
}

export default function Footer({ onReserve }: FooterProps) {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [activeMapTab, setActiveMapTab] = useState<'map' | 'transit'>('map');
  
  // Quick contact form state
  const [contactName, setContactName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const fullAddress = "12 Lane Road, Heritage Quarter, Bangalore 560001, Karnataka";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactInfo || !contactMessage) {
      alert('Please fill out all fields so we can get back to you.');
      return;
    }
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setMessageSent(true);
      setContactName('');
      setContactInfo('');
      setContactMessage('');
      setTimeout(() => setMessageSent(false), 6000);
    }, 600);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#3a3026] bg-gradient-to-b from-[#18130e]/94 via-[#1d1611]/90 to-[#0f0c0a]/95 backdrop-blur-[3px] text-[#e8dfd3] pt-16 md:pt-22 pb-12 relative overflow-hidden">
      
      {/* Top radiant copper hairline glow */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#b3541e] to-transparent shadow-[0_0_18px_#b3541e] pointer-events-none" />

      {/* Atmospheric radial ambient light diffusions */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-[#b3541e]/[0.08] rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#d98236]/[0.06] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#4a2612]/[0.04] rounded-full blur-[220px] pointer-events-none" />

      {/* Architectural roastery lattice & coordinates watermark SVG */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-screen overflow-hidden">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footerGrid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#e0956a" strokeWidth="0.8" />
              <circle cx="40" cy="40" r="1.5" fill="#e0956a" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footerGrid)" />
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto px-7 relative z-10">

        {/* Top Header & Hospitality Statement with scroll entrance */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#352f29]"
        >
          <div className="max-w-[620px]">
            <h2 className="font-display font-normal text-[36px] md:text-[48px] leading-[1.06] text-[#fbf8f3] tracking-[-0.4px]">
              Copper & Crema
            </h2>
            <p className="text-[#b5a999] text-[15.5px] leading-relaxed mt-3 max-w-[540px]">
              An unhurried sanctuary dedicated to single-origin roast profiles, 72-hour laminated Viennoiserie, and thoughtful neighborhood hospitality.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="tel:+918041238890"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#27201b] hover:bg-brand-accent text-[#f4efe8] font-mono text-[11px] tracking-[1px] uppercase transition-all border border-[#44372c] cursor-pointer group shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-brand-accent group-hover:text-white transition-colors" />
              <span>Call Counter</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="mailto:hello@copperandcrema.example"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#27201b] hover:bg-brand-accent text-[#f4efe8] font-mono text-[11px] tracking-[1px] uppercase transition-all border border-[#44372c] cursor-pointer group shadow-sm"
            >
              <Mail className="w-3.5 h-3.5 text-brand-accent group-hover:text-white transition-colors" />
              <span>Email Us</span>
            </motion.a>

            {onReserve && (
              <div className="flex items-center gap-2.5">
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onReserve('tasting')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-accent hover:bg-brand-accent-deep text-white font-mono text-[11px] tracking-[1px] uppercase transition-all shadow-md cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Book Tasting Table</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onReserve('table')}
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[#27201b] hover:bg-brand-accent text-[#f4efe8] font-mono text-[11px] tracking-[1px] uppercase transition-all border border-[#44372c] cursor-pointer group shadow-sm"
                >
                  <span>Reserve Table</span>
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Premade Map & Direct Contact Section */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="py-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start border-b border-[#352f29]"
        >
          
          {/* Premade Map Visual Card (Col 1-7) */}
          <div className="lg:col-span-7 bg-[#231c16]/80 hover:bg-[#271f19] rounded-[22px] p-6 border border-[#3e3226] hover:border-[#b3541e]/50 shadow-xl overflow-hidden relative transition-all duration-300 group">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-brand-accent" />
                  <span className="font-mono text-[10.5px] tracking-[1.5px] uppercase text-[#e0956a] font-semibold">
                    Premade Neighborhood Map
                  </span>
                </div>
                <h3 className="font-display text-[22px] text-[#fcf9f5]">12 Lane Road, Heritage Quarter</h3>
              </div>

              {/* Map / Transit Tabs with micro-interactions */}
              <div className="flex items-center gap-1 bg-[#1a1410] p-1 rounded-full border border-[#3e3226] self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setActiveMapTab('map')}
                  className={`px-3.5 py-1.5 rounded-full font-mono text-[10.5px] tracking-wider uppercase transition-all cursor-pointer ${
                    activeMapTab === 'map'
                      ? 'bg-brand-accent text-white shadow-sm'
                      : 'text-[#9c8e7e] hover:text-[#e8dfd3]'
                  }`}
                >
                  Map View
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMapTab('transit')}
                  className={`px-3.5 py-1.5 rounded-full font-mono text-[10.5px] tracking-wider uppercase transition-all cursor-pointer ${
                    activeMapTab === 'transit'
                      ? 'bg-brand-accent text-white shadow-sm'
                      : 'text-[#9c8e7e] hover:text-[#e8dfd3]'
                  }`}
                >
                  Transit & Access
                </button>
              </div>
            </div>

            {/* Premade Stylized Architectural Map Container */}
            <div className="relative rounded-[16px] overflow-hidden border border-[#44372c] bg-[#16120e] aspect-[16/10] sm:aspect-[16/9]">
              
              {activeMapTab === 'map' ? (
                /* Stylized Cartographic SVG */
                <div className="relative w-full h-full">
                  <svg 
                    viewBox="0 0 700 380" 
                    className="w-full h-full object-cover select-none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      {/* Grid Pattern */}
                      <pattern id="footerMapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#251e18" strokeWidth="0.8" />
                      </pattern>
                      {/* Park Green Gradient */}
                      <linearGradient id="parkGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#293324" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#20291c" stopOpacity="0.8" />
                      </linearGradient>
                      {/* Water Gradient */}
                      <linearGradient id="waterGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#1a252c" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#22313b" stopOpacity="0.8" />
                      </linearGradient>
                    </defs>

                    {/* Canvas Background */}
                    <rect width="700" height="380" fill="#17130f" />
                    <rect width="700" height="380" fill="url(#footerMapGrid)" />

                    {/* Heritage Promenade Garden Zone */}
                    <path 
                      d="M 20 40 Q 140 20, 240 60 L 260 140 L 40 160 Z" 
                      fill="url(#parkGrad2)" 
                      stroke="#33422d" 
                      strokeWidth="1.2" 
                    />
                    <text x="70" y="95" fill="#8ca87e" fontSize="11" fontFamily="sans-serif" letterSpacing="1" opacity="0.85">
                      HERITAGE BOTANIC GROVE
                    </text>

                    {/* Reflecting Pool Water */}
                    <path 
                      d="M 520 230 Q 610 210, 680 250 L 670 340 L 490 320 Z" 
                      fill="url(#waterGrad2)" 
                      stroke="#334654" 
                      strokeWidth="1" 
                    />
                    <text x="535" y="285" fill="#88b1c4" fontSize="10" fontFamily="sans-serif" letterSpacing="0.8" opacity="0.8">
                      OLD LOTUS POND
                    </text>

                    {/* Secondary Buildings / Blocks */}
                    <rect x="340" y="45" width="110" height="65" rx="6" fill="#201a15" stroke="#332a21" strokeWidth="1" />
                    <text x="355" y="80" fill="#756a5c" fontSize="9" fontFamily="monospace">ART GALLERY</text>

                    <rect x="480" y="45" width="160" height="70" rx="6" fill="#201a15" stroke="#332a21" strokeWidth="1" />
                    <text x="510" y="82" fill="#756a5c" fontSize="9" fontFamily="monospace">POTTERY ATELIER</text>

                    <rect x="40" y="220" width="140" height="90" rx="6" fill="#201a15" stroke="#332a21" strokeWidth="1" />
                    <text x="55" y="265" fill="#756a5c" fontSize="9" fontFamily="monospace">BOOK ARCHIVES</text>

                    {/* Road Network */}
                    {/* Heritage Boulevard (Main West-East Arterial) */}
                    <line x1="0" y1="180" x2="700" y2="180" stroke="#382e25" strokeWidth="26" strokeLinecap="round" />
                    <line x1="0" y1="180" x2="700" y2="180" stroke="#211a14" strokeWidth="22" strokeLinecap="round" />
                    <line x1="0" y1="180" x2="700" y2="180" stroke="#4d3f32" strokeWidth="1" strokeDasharray="10,12" />
                    <text x="100" y="184" fill="#a49685" fontSize="9" fontFamily="monospace" letterSpacing="2">
                      HERITAGE BOULEVARD
                    </text>

                    {/* 12 Lane Road (Vertical Crossing Arterial) */}
                    <line x1="280" y1="0" x2="280" y2="380" stroke="#382e25" strokeWidth="24" strokeLinecap="round" />
                    <line x1="280" y1="0" x2="280" y2="380" stroke="#211a14" strokeWidth="20" strokeLinecap="round" />
                    <line x1="280" y1="0" x2="280" y2="380" stroke="#4d3f32" strokeWidth="1" strokeDasharray="10,12" />
                    
                    {/* Roastery Mews (Branching East) */}
                    <line x1="280" y1="260" x2="480" y2="260" stroke="#30261f" strokeWidth="16" strokeLinecap="round" />
                    <line x1="280" y1="260" x2="480" y2="260" stroke="#1c1611" strokeWidth="12" strokeLinecap="round" />
                    <text x="310" y="264" fill="#7d7062" fontSize="8" fontFamily="monospace">ROASTERY MEWS</text>

                    {/* Metro Station Indicator (Upper Right) */}
                    <g transform="translate(605, 140)">
                      <circle cx="15" cy="15" r="14" fill="#17241f" stroke="#253e32" strokeWidth="1.5" />
                      <circle cx="15" cy="15" r="6" fill="#35a16b" />
                      <text x="-40" y="38" fill="#4ade80" fontSize="9" fontFamily="monospace" fontWeight="bold">
                        METRO EXIT 2
                      </text>
                    </g>

                    {/* COPPER & CREMA BUILDING FOOTPRINT */}
                    <g transform="translate(320, 200)">
                      {/* Glow halo */}
                      <rect x="-8" y="-8" width="136" height="76" rx="10" fill="#b3541e" opacity="0.14" />
                      {/* Building roof */}
                      <rect x="0" y="0" width="120" height="60" rx="8" fill="#322217" stroke="#b3541e" strokeWidth="1.8" />
                      <text x="12" y="26" fill="#ffcca3" fontSize="11" fontFamily="serif" fontWeight="bold">Copper & Crema</text>
                      <text x="12" y="42" fill="#d49265" fontSize="8.5" fontFamily="monospace">CAFE & BAKERY</text>
                    </g>

                    {/* Interactive Animated Pin on Copper & Crema */}
                    <g transform="translate(305, 205)">
                      <circle cx="15" cy="15" r="22" fill="#b3541e" opacity="0.25">
                        <animate attributeName="r" values="12;28;12" dur="3s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="15" cy="15" r="10" fill="#b3541e" stroke="#ffffff" strokeWidth="2.5" />
                      <circle cx="15" cy="15" r="4" fill="#ffffff" />
                    </g>

                    {/* Street Name Label */}
                    <text 
                      x="-140" 
                      y="273" 
                      transform="rotate(-90)" 
                      fill="#a49685" 
                      fontSize="9" 
                      fontFamily="monospace" 
                      letterSpacing="2"
                    >
                      12 LANE ROAD
                    </text>
                  </svg>

                  {/* Floating Map Status Overlay */}
                  <div className="absolute top-3 left-3 bg-[#191410]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#3e3226] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="font-mono text-[10px] uppercase text-[#ded6ca] tracking-wider font-semibold">
                      Open Now • 07:30 to 22:00
                    </span>
                  </div>

                  {/* Compass Rose */}
                  <div className="absolute bottom-3 right-3 bg-[#191410]/85 backdrop-blur-sm px-2.5 py-1 rounded border border-[#382d22] text-[10px] font-mono text-[#8a7c6c]">
                    N ↑
                  </div>
                </div>
              ) : (
                /* Transit & Parking Details Tab */
                <div className="w-full h-full p-6 bg-[#1a1410] flex flex-col justify-between">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-[14px] bg-[#221b15] border border-[#382d22]">
                      <div className="w-8 h-8 rounded-full bg-[#16231d] text-emerald-400 flex items-center justify-center mb-2.5">
                        <Train className="w-4 h-4" />
                      </div>
                      <h4 className="font-display text-[16px] text-[#fbf8f3]">By Metro</h4>
                      <p className="text-[12px] text-[#a49685] mt-1 leading-relaxed">
                        Heritage Quarter Station (Purple Line). Take Gate 2; we are a 4-minute shaded walk down 12 Lane Road.
                      </p>
                    </div>

                    <div className="p-4 rounded-[14px] bg-[#221b15] border border-[#382d22]">
                      <div className="w-8 h-8 rounded-full bg-brand-accent/20 text-brand-accent flex items-center justify-center mb-2.5">
                        <Car className="w-4 h-4" />
                      </div>
                      <h4 className="font-display text-[16px] text-[#fbf8f3]">Valet Parking</h4>
                      <p className="text-[12px] text-[#a49685] mt-1 leading-relaxed">
                        Complimentary valet attendants stationed at the main archway from 08:00 AM to close daily.
                      </p>
                    </div>

                    <div className="p-4 rounded-[14px] bg-[#221b15] border border-[#382d22]">
                      <div className="w-8 h-8 rounded-full bg-[#302318] text-[#ff9c5a] flex items-center justify-center mb-2.5">
                        <Bike className="w-4 h-4" />
                      </div>
                      <h4 className="font-display text-[16px] text-[#fbf8f3]">Bicycles</h4>
                      <p className="text-[12px] text-[#a49685] mt-1 leading-relaxed">
                        Dedicated sheltered brass bike racks in the front courtyard with air pump & lock anchors.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#31261d] flex items-center justify-between text-[12px] text-[#8e8071]">
                    <span>Coordinates: 12.9716° N, 77.5946° E</span>
                    <span className="text-brand-accent">Boutique Heritage Zone</span>
                  </div>
                </div>
              )}

            </div>

            {/* Map Action Buttons Footer */}
            <div className="mt-4 pt-3 border-t border-[#382e25] flex flex-wrap items-center justify-between gap-3 text-[13px]">
              <div className="flex items-center gap-2 text-[#a89a8a] text-[12.5px]">
                <MapPin className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                <span className="truncate max-w-[280px] sm:max-w-none">{fullAddress}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  type="button"
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1c1510] hover:bg-[#31251c] border border-[#3e3226] text-[11.5px] font-mono text-[#dcd2c5] transition-all cursor-pointer"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Address Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#9a8d7d]" />
                      <span>Copy Address</span>
                    </>
                  )}
                </motion.button>

                <motion.a
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  href={`https://maps.google.com/?q=${encodeURIComponent("12 Lane Road, Heritage Quarter, Bangalore")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-accent hover:bg-brand-accent-deep text-white text-[11.5px] font-mono tracking-wide transition-all shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                </motion.a>
              </div>
            </div>
          </div>

          {/* Direct "Call Us" & "Contact Us" Cards (Col 8-12) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* CALL US MODULE with hover lift */}
            <motion.div 
              whileHover={{ y: -3 }}
              className="bg-[#231c16]/80 hover:bg-[#271f19] rounded-[22px] p-6 border border-[#3e3226] hover:border-[#b3541e]/50 shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-brand-accent-soft/30 text-brand-accent flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] tracking-[1.5px] uppercase text-[#e0956a] font-semibold block">
                      Direct Voice Lines
                    </span>
                    <h3 className="font-display text-[20px] text-[#fcf9f5]">Call Us Anytime</h3>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#18261e] text-emerald-400 border border-[#254231] font-mono text-[10px] tracking-wider uppercase">
                  Staff on duty
                </span>
              </div>

              <div className="space-y-3 mb-4">
                {/* Primary Counter Line */}
                <motion.a
                  whileHover={{ x: 4 }}
                  href="tel:+918041238890"
                  className="flex items-center justify-between p-3.5 rounded-[14px] bg-[#1a1410] hover:bg-[#201913] border border-[#362b21] transition-all group"
                >
                  <div>
                    <span className="text-[11px] font-mono text-[#9c8e7e] block">Cafe Counter & Table Enquiries</span>
                    <span className="font-mono text-[16px] font-semibold text-[#fcf9f5] group-hover:text-brand-accent transition-colors">
                      +91 (0) 80 4123 8890
                    </span>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-brand-accent text-white flex items-center justify-center text-[12px] group-hover:scale-105 transition-transform shadow-sm">
                    <Phone className="w-3.5 h-3.5" />
                  </span>
                </motion.a>

                {/* Bakery & Pre-order WhatsApp / Mobile */}
                <motion.a
                  whileHover={{ x: 4 }}
                  href="tel:+919845012890"
                  className="flex items-center justify-between p-3.5 rounded-[14px] bg-[#1a1410] hover:bg-[#201913] border border-[#362b21] transition-all group"
                >
                  <div>
                    <span className="text-[11px] font-mono text-[#9c8e7e] block">Bakery Pre-Orders & Whole Bean Grind</span>
                    <span className="font-mono text-[16px] font-semibold text-[#fcf9f5] group-hover:text-brand-accent transition-colors">
                      +91 98450 12890
                    </span>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-[#281f18] text-[#d6c7b4] group-hover:bg-brand-accent group-hover:text-white flex items-center justify-center text-[12px] transition-all">
                    <Phone className="w-3.5 h-3.5" />
                  </span>
                </motion.a>
              </div>

              <p className="text-[12.5px] text-[#a49685] leading-relaxed">
                Call our barista counter for quick takeaway packaging, dietary requests, or to hold hot loaves straight from the bake deck.
              </p>
            </motion.div>

            {/* CONTACT US / SEND A NOTE MODULE with hover lift */}
            <motion.div 
              whileHover={{ y: -3 }}
              className="bg-[#231c16]/80 hover:bg-[#271f19] rounded-[22px] p-6 border border-[#3e3226] hover:border-[#b3541e]/50 shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-full bg-brand-accent-soft/30 text-brand-accent flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[10px] tracking-[1.5px] uppercase text-[#e0956a] font-semibold block">
                    Concierge & Enquiries
                  </span>
                  <h3 className="font-display text-[20px] text-[#fcf9f5]">Contact Us</h3>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {messageSent ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-5 rounded-[14px] bg-[#1a251e] border border-[#264431] text-center"
                  >
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                      <Check className="w-5 h-5" />
                    </div>
                    <h4 className="font-display text-[17px] text-white">Message Received</h4>
                    <p className="text-[12.5px] text-[#a8b8aa] mt-1">
                      Our cafe concierge has your note. We will reply to your inbox within a few hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-2.5">
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#19130f] border border-[#382c20] text-[13px] text-[#e8dfd3] placeholder-[#7d7061] focus:outline-none focus:border-brand-accent transition-colors"
                      />
                      <input
                        type="text"
                        required
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                        placeholder="Email or Phone"
                        className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#19130f] border border-[#382c20] text-[13px] text-[#e8dfd3] placeholder-[#7d7061] focus:outline-none focus:border-brand-accent transition-colors"
                      />
                    </div>

                    <textarea
                      rows={2}
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Your note, question, private event idea, or feedback..."
                      className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#19130f] border border-[#382c20] text-[13px] text-[#e8dfd3] placeholder-[#7d7061] focus:outline-none focus:border-brand-accent transition-colors resize-none"
                    />

                    <div className="flex items-center justify-between gap-3 pt-1">
                      <a
                        href="mailto:hello@copperandcrema.example"
                        className="text-[11.5px] font-mono text-[#a49685] hover:text-brand-accent transition-colors truncate"
                      >
                        hello@copperandcrema.example
                      </a>

                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        type="submit"
                        disabled={isSending}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-accent hover:bg-brand-accent-deep text-white font-mono text-[11px] tracking-wider uppercase transition-all shrink-0 cursor-pointer shadow-sm"
                      >
                        {isSending ? (
                          <span>Sending...</span>
                        ) : (
                          <>
                            <span>Send Note</span>
                            <Send className="w-3 h-3" />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                )}
              </AnimatePresence>

            </motion.div>

          </div>

        </motion.div>

        {/* Directory Columns & Operating Hours with scroll entrance */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-[#352f29] text-[14px]"
        >
          
          {/* Col 1: Quick Navigation with "The Counter Menu" */}
          <div>
            <span className="font-mono text-[10.5px] tracking-[1.5px] uppercase text-[#e0956a] font-semibold block mb-4">
              Explore The Cafe
            </span>
            <ul className="space-y-2.5 text-[#b5a999]">
              <li>
                <a href="#signature-cafe" className="hover:text-[#ffffff] transition-colors flex items-center gap-1.5 font-medium text-[#ded4c5] hover:translate-x-1 duration-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
                  Signature Bestsellers
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#ffffff] transition-colors flex items-center gap-1.5 font-medium text-[#ded4c5] hover:translate-x-1 duration-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
                  The Counter Menu
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#ffffff] transition-colors hover:translate-x-1 duration-200 block">Visual Atelier & Mood</a>
              </li>
              <li>
                <a href="#concept" className="hover:text-[#ffffff] transition-colors hover:translate-x-1 duration-200 block">About the Space</a>
              </li>
              <li>
                <a href="#highlights" className="hover:text-[#ffffff] transition-colors hover:translate-x-1 duration-200 block">Highlights & Heritage</a>
              </li>
              <li>
                <a href="#why-visit" className="hover:text-[#ffffff] transition-colors hover:translate-x-1 duration-200 block">The Experience</a>
              </li>
              {onReserve && (
                <>
                  <li className="pt-2 border-t border-[#31281e]">
                    <button 
                      onClick={() => onReserve('tasting')}
                      className="hover:text-brand-accent text-brand-accent font-mono text-[11.5px] tracking-wider uppercase cursor-pointer flex items-center gap-1.5 hover:translate-x-1 duration-200"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Book Tasting Table →</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => onReserve('table')}
                      className="hover:text-white text-[#d6c7b4] font-mono text-[11.5px] tracking-wider uppercase cursor-pointer hover:translate-x-1 duration-200 block"
                    >
                      Reserve Cafe Table →
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Col 2: Operating Hours */}
          <div>
            <span className="font-mono text-[10.5px] tracking-[1.5px] uppercase text-[#e0956a] font-semibold block mb-4">
              Cafe & Bake Hours
            </span>
            <div className="space-y-3 text-[#b5a999] text-[13px]">
              <div>
                <span className="text-[#f4efe8] font-medium block">Monday — Friday</span>
                <span>07:30 AM — 10:00 PM</span>
              </div>
              <div className="pt-1.5 border-t border-[#2e241b]">
                <span className="text-[#f4efe8] font-medium block">Saturday & Sunday</span>
                <span>08:00 AM — 10:30 PM</span>
              </div>
              <div className="pt-1.5 border-t border-[#2e241b]">
                <span className="text-[#f4efe8] font-medium block">Fresh Oven Pulls</span>
                <span className="text-[#a4917e] text-[12px]">Daily at 08:00 AM & 02:30 PM</span>
              </div>
            </div>
          </div>

          {/* Col 3: Direct Lines & Inquiries */}
          <div>
            <span className="font-mono text-[10.5px] tracking-[1.5px] uppercase text-[#e0956a] font-semibold block mb-4">
              Get in Touch
            </span>
            <div className="space-y-2 text-[#b5a999] text-[13px]">
              <div>
                <span className="text-[#968777] text-[11px] font-mono uppercase block">Telephone</span>
                <a href="tel:+918041238890" className="text-[#f4efe8] hover:text-brand-accent transition-colors font-mono">
                  +91 (0) 80 4123 8890
                </a>
              </div>
              <div className="pt-1">
                <span className="text-[#968777] text-[11px] font-mono uppercase block">Direct Inquiries</span>
                <a href="mailto:hello@copperandcrema.example" className="text-[#f4efe8] hover:text-brand-accent transition-colors">
                  hello@copperandcrema.example
                </a>
              </div>
              <div className="pt-1">
                <span className="text-[#968777] text-[11px] font-mono uppercase block">Events & Private Tastings</span>
                <a href="mailto:events@copperandcrema.example" className="text-[#f4efe8] hover:text-brand-accent transition-colors">
                  events@copperandcrema.example
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Neighborhood Note */}
          <div>
            <span className="font-mono text-[10.5px] tracking-[1.5px] uppercase text-[#e0956a] font-semibold block mb-4">
              Heritage District
            </span>
            <p className="text-[13px] text-[#a49685] leading-relaxed mb-3">
              12 Lane Road, Heritage Quarter, Bangalore 560001. Walking distance from the Old Botanical Gardens.
            </p>
            <div className="flex items-center gap-1.5 text-[12px] text-[#ff9c5a]">
              <Coffee className="w-4 h-4" />
              <span>Roasted locally in small batches.</span>
            </div>
          </div>

        </motion.div>

        {/* Bottom Bar: Copyright & Back to Top with hover animation */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12.5px] text-[#8e8071]">
          <div className="flex items-center gap-2">
            <span>© 2026 Copper & Crema Specialty Roasters & Bakery.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">All rights reserved.</span>
          </div>

          <motion.button
            whileHover={{ y: -3 }}
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-[#b5a999] hover:text-brand-accent transition-colors cursor-pointer group"
          >
            <span className="font-mono text-[11px] tracking-wider uppercase">Back to Top</span>
            <div className="w-7 h-7 rounded-full bg-[#241c16] border border-[#3b2e23] flex items-center justify-center group-hover:bg-brand-accent group-hover:text-white transition-all shadow-sm">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </motion.button>
        </div>

      </div>
    </footer>
  );
}
