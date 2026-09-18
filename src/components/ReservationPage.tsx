import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Calendar as CalendarIcon, Clock, Users, MapPin, 
  CheckCircle2, Sparkles, Coffee, Phone, Mail, User, 
  MessageSquare, ShieldCheck, HeartHandshake, ChevronRight,
  CreditCard, Wallet, Copy, Check, RefreshCw, QrCode, Award
} from 'lucide-react';

export type BookingType = 'sensory-flight' | 'tasting' | 'table';
export type PaymentMethod = 'online' | 'pay-at-cafe';
export type OnlineMode = 'upi' | 'card' | 'quick-demo';

interface ReservationPageProps {
  onBack: () => void;
  initialType?: 'tasting' | 'table' | 'sensory-flight';
}

const SEATING_AREAS = [
  {
    id: 'espresso-bar',
    name: 'Craft Barista Counter',
    desc: 'Up-close front-row seats watching manual pour-overs, siphon brewing, and single-origin dialed extractions.',
    atmosphere: 'Interactive • Aromatic Brews',
    img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=75'
  },
  {
    id: 'sunlit-bench',
    name: 'Sunlit Oak Banquette',
    desc: 'Soft morning light, acoustic linen cushioning, ideal for slow reading and coffee rituals.',
    atmosphere: 'Natural Light • Quiet Rhythm',
    img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=75'
  },
  {
    id: 'garden-patio',
    name: 'Olive Tree Courtyard',
    desc: 'Open-air sheltered terrace with potted olive trees, terracotta stones, and gentle breeze.',
    atmosphere: 'Al Fresco • Lush Greenery',
    img: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=600&q=75'
  },
  {
    id: 'quiet-nook',
    name: 'Library Corner Table',
    desc: 'Tucked away corner lined with architectural journals, warm lamp glow, and soft music.',
    atmosphere: 'Secluded • Peaceful Conversation',
    img: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=75'
  }
];

const TIME_SLOTS = [
  { period: 'Morning Brews & Bakes', times: ['08:00 AM', '08:45 AM', '09:30 AM', '10:15 AM', '11:00 AM'] },
  { period: 'Midday Sourdough & Tartines', times: ['12:00 PM', '12:45 PM', '01:30 PM', '02:15 PM', '03:00 PM'] },
  { period: 'Golden Hour & Slower Plates', times: ['04:30 PM', '05:30 PM', '06:30 PM', '07:30 PM', '08:30 PM'] }
];

export default function ReservationPage({ onBack, initialType = 'tasting' }: ReservationPageProps) {
  const [bookingType, setBookingType] = useState<BookingType>(
    initialType === 'sensory-flight' ? 'sensory-flight' : initialType === 'table' ? 'table' : 'tasting'
  );

  // Dates calculation for next 7 days
  const today = new Date();
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return {
      dayOfWeek: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' }),
      dateNum: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
      fullDateStr: d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    };
  });

  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState('09:30 AM');
  const [guests, setGuests] = useState(2);
  const [selectedArea, setSelectedArea] = useState(
    initialType === 'sensory-flight' || initialType === 'tasting' ? 'espresso-bar' : 'sunlit-bench'
  );
  const [occasion, setOccasion] = useState(
    initialType === 'sensory-flight' 
      ? 'Signature Sensory Flight Session' 
      : initialType === 'tasting' 
        ? 'Specialty Tasting Session' 
        : 'Coffee & Slow Conversation'
  );

  // Payment States
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('online');
  const [onlineMode, setOnlineMode] = useState<OnlineMode>('upi');
  const [demoPaymentId, setDemoPaymentId] = useState(() => `DEMO-PAY-CC${Math.floor(10000 + Math.random() * 90000)}`);
  const [copiedPaymentId, setCopiedPaymentId] = useState(false);
  
  // Guest form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    code: string;
    type: BookingType;
    date: string;
    time: string;
    guests: number;
    area: string;
    paymentMethod: PaymentMethod;
    demoPaymentId: string;
    amount: number;
    paymentStatus: string;
  } | null>(null);

  const selectedDate = availableDates[selectedDateIndex];
  const activeAreaObj = SEATING_AREAS.find(a => a.id === selectedArea) || SEATING_AREAS[0];

  // Pricing calculations
  const unitPrice = bookingType === 'sensory-flight' ? 650 : bookingType === 'tasting' ? 450 : 0;
  const totalAmount = unitPrice * guests;

  const handleRegenerateDemoId = () => {
    const newId = `DEMO-PAY-CC${Math.floor(10000 + Math.random() * 90000)}`;
    setDemoPaymentId(newId);
  };

  const handleCopyPaymentId = () => {
    navigator.clipboard.writeText(demoPaymentId);
    setCopiedPaymentId(true);
    setTimeout(() => setCopiedPaymentId(false), 2000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Please provide your name and contact phone number.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const prefix = bookingType === 'sensory-flight' ? 'SSF-' : bookingType === 'tasting' ? 'TT-' : 'CC-';
      const generatedCode = prefix + Math.floor(1000 + Math.random() * 9000);
      
      const paymentStatusText = paymentMethod === 'online'
        ? (totalAmount > 0 ? `Paid Online • Verified Demo ID` : 'Complimentary Table Hold')
        : (totalAmount > 0 ? `Pay at Cafe • Due on Arrival (₹${totalAmount})` : 'Complimentary Table Hold');

      setConfirmedBooking({
        code: generatedCode,
        type: bookingType,
        date: selectedDate.fullDateStr,
        time: selectedTime,
        guests: guests,
        area: activeAreaObj.name,
        paymentMethod: paymentMethod,
        demoPaymentId: demoPaymentId,
        amount: totalAmount,
        paymentStatus: paymentStatusText
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 750);
  };

  return (
    <div className="min-h-screen bg-[#f6f1e7]/70 backdrop-blur-[2px] text-brand-text flex flex-col selection:bg-brand-accent selection:text-white">
      {/* Top Boutique Navigation */}
      <header className="sticky top-0 z-40 bg-[#f6f1e7]/90 backdrop-blur-md border-b border-brand-line-soft">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[13.5px] font-medium text-brand-text-mid hover:text-brand-accent transition-colors group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-brand-surface border border-brand-line-soft flex items-center justify-center group-hover:bg-brand-accent group-hover:text-white transition-all">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span>Back to Cafe</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-accent"></span>
            <span className="font-display text-[21px] tracking-[0.2px]">Copper & Crema</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-brand-text-dim">
            <ShieldCheck className="w-4 h-4 text-brand-sage" />
            <span>Secure Roastery Reservation</span>
          </div>
        </div>
      </header>

      {/* Main Reservation Content */}
      <main className="flex-1 py-10 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          
          <AnimatePresence mode="wait">
            {confirmedBooking ? (
              /* Confirmation Screen */
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5 }}
                className="max-w-[780px] mx-auto bg-brand-surface rounded-[24px] p-8 md:p-14 border border-brand-line shadow-xl text-center relative overflow-hidden"
              >
                {/* Decorative background glow */}
                <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-accent/10 rounded-full blur-[90px] pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-brand-sage/10 rounded-full blur-[90px] pointer-events-none" />

                <div className="w-16 h-16 rounded-full bg-brand-accent-soft text-brand-accent flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <span className="font-mono text-[11.5px] tracking-[2px] uppercase text-brand-accent font-semibold block mb-2">
                  {confirmedBooking.type === 'sensory-flight' 
                    ? 'Signature Sensory Flight Booked' 
                    : confirmedBooking.type === 'tasting' 
                      ? 'Tasting Table Booked' 
                      : 'Table Reserved Successfully'}
                </span>

                <h1 className="font-display font-normal text-[38px] md:text-[46px] leading-[1.1] mb-4 text-brand-text">
                  {confirmedBooking.type === 'sensory-flight' 
                    ? 'Your Sensory Flight is Reserved.' 
                    : confirmedBooking.type === 'tasting' 
                      ? 'Your Tasting Table is Booked.' 
                      : 'We are preparing your table.'}
                </h1>

                <p className="text-brand-text-mid text-[15.5px] max-w-[560px] mx-auto mb-8 leading-relaxed">
                  {confirmedBooking.type === 'sensory-flight' ? (
                    <>Your 4-course flagship sensory flight is confirmed under <span className="font-semibold text-brand-text">{name}</span>. Our head barista has prepared the micro-lot dials for your party of {confirmedBooking.guests}.</>
                  ) : confirmedBooking.type === 'tasting' ? (
                    <>Your guided 3-origin tasting table is reserved under <span className="font-semibold text-brand-text">{name}</span>. Our head barista is curating your sensory flight notes.</>
                  ) : (
                    <>Your table is saved under <span className="font-semibold text-brand-text">{name}</span>. A confirmation SMS has been prepared for <span className="font-semibold text-brand-text">{phone}</span>.</>
                  )}
                </p>

                {/* Booking Pass Card */}
                <div className="bg-brand-bg rounded-[20px] p-6 md:p-8 border border-brand-line text-left mb-8 max-w-[600px] mx-auto relative shadow-sm">
                  <div className="flex items-center justify-between border-b border-brand-line pb-4 mb-5">
                    <div>
                      <span className="font-mono text-[10px] tracking-[1.5px] uppercase text-brand-text-dim block">
                        {confirmedBooking.type === 'sensory-flight' 
                          ? 'Sensory Pass Code' 
                          : confirmedBooking.type === 'tasting' 
                            ? 'Tasting Pass Code' 
                            : 'Booking Code'}
                      </span>
                      <span className="font-mono text-[24px] font-bold tracking-wider text-brand-accent">{confirmedBooking.code}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-[10px] tracking-[1.5px] uppercase text-brand-text-dim block">Experience</span>
                      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-brand-accent font-semibold uppercase">
                        <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
                        {confirmedBooking.type === 'sensory-flight' 
                          ? 'Signature Sensory Flight' 
                          : confirmedBooking.type === 'tasting' 
                            ? 'Tasting Flight' 
                            : 'Table Reserved'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-[14px] mb-4">
                    <div>
                      <span className="font-mono text-[11px] text-brand-text-dim uppercase tracking-wider block mb-1">Date & Time</span>
                      <span className="font-semibold text-brand-text block">{confirmedBooking.date}</span>
                      <span className="text-brand-text-mid text-[13px]">{confirmedBooking.time}</span>
                    </div>
                    <div>
                      <span className="font-mono text-[11px] text-brand-text-dim uppercase tracking-wider block mb-1">Party & Seating</span>
                      <span className="font-semibold text-brand-text block">{confirmedBooking.guests} {confirmedBooking.guests === 1 ? 'Guest' : 'Guests'}</span>
                      <span className="text-brand-text-mid text-[13px]">{confirmedBooking.area}</span>
                    </div>
                  </div>

                  {/* Payment Receipt / Status */}
                  <div className="pt-4 border-t border-brand-line-soft bg-brand-surface/70 rounded-[12px] p-4 mb-3 border border-brand-line-soft">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {confirmedBooking.paymentMethod === 'online' ? (
                          <CreditCard className="w-4 h-4 text-brand-accent" />
                        ) : (
                          <Wallet className="w-4 h-4 text-brand-sage" />
                        )}
                        <span className="font-mono text-[11.5px] uppercase tracking-wider text-brand-text font-semibold">
                          {confirmedBooking.paymentMethod === 'online' ? 'Online Payment Verified' : 'Pay at Cafe'}
                        </span>
                      </div>
                      <span className="font-display text-[17px] font-semibold text-brand-text">
                        {confirmedBooking.amount > 0 ? `₹${confirmedBooking.amount}` : 'Complimentary'}
                      </span>
                    </div>

                    {confirmedBooking.paymentMethod === 'online' && confirmedBooking.amount > 0 ? (
                      <div className="flex flex-wrap items-center justify-between gap-2 text-[12px] text-brand-text-mid pt-2 border-t border-dashed border-brand-line-soft font-mono">
                        <span>Demo Payment ID:</span>
                        <span className="font-semibold text-brand-accent bg-brand-accent-soft/60 px-2 py-0.5 rounded">
                          {confirmedBooking.demoPaymentId}
                        </span>
                      </div>
                    ) : confirmedBooking.amount > 0 ? (
                      <div className="text-[12px] text-brand-text-mid pt-2 border-t border-dashed border-brand-line-soft">
                        * Please settle ₹{confirmedBooking.amount} at the roastery counter upon arrival via Cash, UPI, or Card.
                      </div>
                    ) : (
                      <div className="text-[12px] text-brand-text-mid pt-2 border-t border-dashed border-brand-line-soft">
                        * Table held for 15 minutes. Food and drinks can be ordered freely at the cafe.
                      </div>
                    )}
                  </div>

                  {/* Inclusions breakdown */}
                  {confirmedBooking.type === 'sensory-flight' && (
                    <div className="mt-4 pt-3 border-t border-brand-line-soft text-[12.5px] text-brand-text-mid flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                      <span>Includes 4 progressive extractions (Cold Drip, Aeropress, Pour-over & Burnt Honey Crema), warm Canelés & Cardamom pastry pairing.</span>
                    </div>
                  )}

                  {confirmedBooking.type === 'tasting' && (
                    <div className="mt-4 pt-3 border-t border-brand-line-soft text-[12.5px] text-brand-text-mid flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                      <span>Includes 3 single-origin extractions, barista sensory notes, and warm Viennoiserie pairing.</span>
                    </div>
                  )}

                  <div className="mt-3 pt-3 border-t border-brand-line-soft text-[12.5px] text-brand-text-dim flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-accent shrink-0" />
                    <span>12 Lane Road, Heritage Quarter • Valet & bicycle racks on arrival</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={onBack}
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-text text-brand-surface font-mono text-[11.5px] tracking-[1.2px] uppercase hover:bg-brand-accent transition-all cursor-pointer shadow-md"
                  >
                    Return to Cafe Website
                  </button>

                  <button
                    onClick={() => {
                      setConfirmedBooking(null);
                      setName('');
                      setPhone('');
                      setEmail('');
                      setNotes('');
                      handleRegenerateDemoId();
                    }}
                    className="w-full sm:w-auto px-6 py-4 rounded-full border border-brand-line text-brand-text-mid font-mono text-[11.5px] tracking-[1.2px] uppercase hover:border-brand-accent hover:text-brand-accent transition-all cursor-pointer"
                  >
                    Reserve Another Experience
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Reservation Booking Form */
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_390px] gap-12 items-start">
                
                {/* Left Form Area */}
                <div>
                  {/* Hero Intro */}
                  <div className="mb-8">
                    <span className="eyebrow">
                      {bookingType === 'sensory-flight' 
                        ? 'Master Tasting Flight' 
                        : bookingType === 'tasting' 
                          ? 'Sensory Roastery Experience' 
                          : 'Cafe Table Reservations'}
                    </span>
                    <h1 className="font-display font-normal text-[clamp(34px,4.8vw,52px)] leading-[1.08] tracking-[-0.5px] mt-3 mb-4">
                      {bookingType === 'sensory-flight' 
                        ? 'Signature Sensory Flight.' 
                        : bookingType === 'tasting' 
                          ? 'Book a Tasting Table.' 
                          : 'Reserve your cafe table.'}
                    </h1>
                    <p className="text-brand-text-mid text-[16px] max-w-[640px] leading-relaxed">
                      {bookingType === 'sensory-flight'
                        ? 'Our hallmark coffee journey: 4 progressive brewing extractions guided by the head barista, paired with warm Tahitian canelés and cardamom brioche.'
                        : bookingType === 'tasting' 
                          ? 'Sit down with our head barista for a guided three-origin single-lot coffee flight, cupping flavor notes, and warm artisan Viennoiserie.'
                          : 'Whether joining us for morning espresso, avocado toast, afternoon bakery selections, or quiet reading, we hold each table with care.'}
                    </p>
                  </div>

                  {/* Experience Selector: 3 Options (Sensory Flight, Tasting Table, Cafe Table) */}
                  <div className="bg-brand-surface rounded-[24px] p-2.5 border border-brand-line-soft shadow-sm mb-8 grid grid-cols-1 md:grid-cols-3 gap-2.5">
                    
                    {/* Option 1: Signature Sensory Flight */}
                    <button
                      type="button"
                      onClick={() => {
                        setBookingType('sensory-flight');
                        setSelectedArea('espresso-bar');
                        setOccasion('Signature Sensory Flight Session');
                      }}
                      className={`p-4 rounded-[18px] text-left transition-all cursor-pointer border relative overflow-hidden flex flex-col justify-between ${
                        bookingType === 'sensory-flight'
                          ? 'bg-[#261d17] text-[#fcf9f5] border-[#b3541e] shadow-lg ring-1 ring-[#b3541e]'
                          : 'bg-transparent hover:bg-brand-bg/60 border-transparent text-brand-text'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <div className="flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
                            <span className="font-mono text-[10px] tracking-[1.2px] uppercase font-bold text-brand-accent">
                              Flagship 4-Course
                            </span>
                          </div>
                          <span className={`font-mono text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                            bookingType === 'sensory-flight' ? 'bg-[#b3541e] text-white' : 'bg-brand-accent-soft text-brand-accent'
                          }`}>
                            ₹650/guest
                          </span>
                        </div>
                        <div className="font-display text-[18px] font-normal leading-tight mb-1.5">
                          Signature Sensory Flight
                        </div>
                        <p className={`text-[12px] leading-relaxed ${bookingType === 'sensory-flight' ? 'text-[#cdbeaf]' : 'text-brand-text-mid'}`}>
                          4 progressive brews (Geisha cold drip, Aeropress, Pour-over & Crema espresso) + French pastries.
                        </p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-white/10 font-mono text-[10px] text-brand-accent flex items-center gap-1">
                        <Award className="w-3 h-3" /> 75-min Barista Masterclass
                      </div>
                    </button>

                    {/* Option 2: Guided Tasting Table */}
                    <button
                      type="button"
                      onClick={() => {
                        setBookingType('tasting');
                        setSelectedArea('espresso-bar');
                        setOccasion('Specialty Tasting Session');
                      }}
                      className={`p-4 rounded-[18px] text-left transition-all cursor-pointer border relative flex flex-col justify-between ${
                        bookingType === 'tasting'
                          ? 'bg-[#261d17] text-[#fcf9f5] border-[#b3541e] shadow-lg ring-1 ring-[#b3541e]'
                          : 'bg-transparent hover:bg-brand-bg/60 border-transparent text-brand-text'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <div className="flex items-center gap-1.5">
                            <Coffee className="w-3.5 h-3.5 text-brand-accent" />
                            <span className="font-mono text-[10px] tracking-[1.2px] uppercase font-bold text-brand-accent">
                              Guided Cupping
                            </span>
                          </div>
                          <span className={`font-mono text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                            bookingType === 'tasting' ? 'bg-[#b3541e] text-white' : 'bg-brand-accent-soft text-brand-accent'
                          }`}>
                            ₹450/guest
                          </span>
                        </div>
                        <div className="font-display text-[18px] font-normal leading-tight mb-1.5">
                          Guided Tasting Table
                        </div>
                        <p className={`text-[12px] leading-relaxed ${bookingType === 'tasting' ? 'text-[#cdbeaf]' : 'text-brand-text-mid'}`}>
                          3 micro-lot extractions, aroma cupping notes, and warm Viennoiserie pairing.
                        </p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-white/10 font-mono text-[10px] text-brand-text-dim flex items-center gap-1">
                        <Clock className="w-3 h-3" /> 60-min Guided Flight
                      </div>
                    </button>

                    {/* Option 3: Reserve Cafe Table */}
                    <button
                      type="button"
                      onClick={() => {
                        setBookingType('table');
                        setSelectedArea('sunlit-bench');
                        setOccasion('Coffee & Slow Conversation');
                      }}
                      className={`p-4 rounded-[18px] text-left transition-all cursor-pointer border relative flex flex-col justify-between ${
                        bookingType === 'table'
                          ? 'bg-[#261d17] text-[#fcf9f5] border-[#b3541e] shadow-lg ring-1 ring-[#b3541e]'
                          : 'bg-transparent hover:bg-brand-bg/60 border-transparent text-brand-text'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <div className="flex items-center gap-1.5">
                            <Coffee className="w-3.5 h-3.5 text-brand-sage" />
                            <span className="font-mono text-[10px] tracking-[1.2px] uppercase font-bold text-brand-sage">
                              All-Day Dining
                            </span>
                          </div>
                          <span className={`font-mono text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                            bookingType === 'table' ? 'bg-brand-sage text-white' : 'bg-brand-sage/10 text-brand-sage'
                          }`}>
                            Complimentary
                          </span>
                        </div>
                        <div className="font-display text-[18px] font-normal leading-tight mb-1.5">
                          Reserve Cafe Table
                        </div>
                        <p className={`text-[12px] leading-relaxed ${bookingType === 'table' ? 'text-[#cdbeaf]' : 'text-brand-text-mid'}`}>
                          Open table for bakes, sourdough breakfast, toasts, and slow conversation.
                        </p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-white/10 font-mono text-[10px] text-brand-text-dim flex items-center gap-1">
                        <Users className="w-3 h-3" /> 90-min Standard Table
                      </div>
                    </button>

                  </div>

                  {/* Inclusions Banner for Signature Sensory Flight */}
                  {bookingType === 'sensory-flight' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 rounded-[20px] bg-[#291f18] text-[#fbf7f2] border border-[#b3541e]/50 flex items-start gap-4 mb-8 shadow-md"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#b3541e] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-display text-[18px] font-normal text-white">Signature Sensory Flight Inclusions</h4>
                          <span className="font-mono text-[11px] text-brand-accent font-semibold uppercase">4 Courses + Bakery</span>
                        </div>
                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12.5px] text-[#d6c7b9]">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0"></span>
                            <span>Course 1: 14-Hour Panama Geisha Slow Cold Drip</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0"></span>
                            <span>Course 2: Aeropress Inverted Single Estate Lot</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0"></span>
                            <span>Course 3: Ceramic Origami Filter Pink Bourbon</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0"></span>
                            <span>Course 4: Burnt Honey Crema Ristretto Float</span>
                          </div>
                          <div className="flex items-center gap-2 sm:col-span-2 pt-1 border-t border-white/10 text-brand-accent">
                            <Award className="w-3.5 h-3.5" />
                            <span>Paired with Tahitian Vanilla Canelé & Pistachio Cardamom Croissant flake</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Inclusions Banner for Tasting Table */}
                  {bookingType === 'tasting' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 rounded-[18px] bg-brand-accent-soft/40 border border-brand-accent/30 flex items-start gap-3.5 mb-8"
                    >
                      <div className="w-9 h-9 rounded-full bg-brand-accent text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-display text-[17px] text-brand-text font-normal">Tasting Table Inclusions</h4>
                        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12.5px] text-brand-text-mid">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0"></span>
                            <span>3 single-origin flight (Geisha, Bourbon, Washed)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0"></span>
                            <span>Guided aroma & palate cupping notes</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0"></span>
                            <span>Warm cardamom croissant or almond brioche</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0"></span>
                            <span>Tactile cupping souvenir notes card</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-10">
                    
                    {/* Step 1: Select Date */}
                    <div className="bg-brand-surface rounded-[20px] p-7 border border-brand-line-soft shadow-sm">
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-brand-accent text-white font-mono text-[11px] flex items-center justify-center">1</span>
                          <h2 className="font-display text-[22px] text-brand-text">Select Date</h2>
                        </div>
                        <span className="font-mono text-[12px] text-brand-accent font-medium">{selectedDate.fullDateStr}</span>
                      </div>

                      <div className="grid grid-cols-3 sm:grid-cols-7 gap-2.5">
                        {availableDates.map((item, idx) => {
                          const isSelected = selectedDateIndex === idx;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setSelectedDateIndex(idx)}
                              className={`p-3 rounded-[12px] text-center transition-all cursor-pointer border ${
                                isSelected 
                                  ? 'bg-brand-accent text-white border-brand-accent shadow-md scale-[1.02]' 
                                  : 'bg-brand-bg hover:bg-white border-brand-line-soft text-brand-text'
                              }`}
                            >
                              <span className={`block font-mono text-[10px] uppercase tracking-wider mb-1 ${isSelected ? 'text-white/80' : 'text-brand-text-dim'}`}>
                                {item.dayOfWeek}
                              </span>
                              <span className="block font-display text-[22px] font-medium leading-none mb-1">
                                {item.dateNum}
                              </span>
                              <span className={`block text-[11px] ${isSelected ? 'text-white/90' : 'text-brand-text-mid'}`}>
                                {item.month}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step 2: Party Size */}
                    <div className="bg-brand-surface rounded-[20px] p-7 border border-brand-line-soft shadow-sm">
                      <div className="flex items-center gap-2.5 mb-5">
                        <span className="w-6 h-6 rounded-full bg-brand-accent text-white font-mono text-[11px] flex items-center justify-center">2</span>
                        <h2 className="font-display text-[22px] text-brand-text">Party Size</h2>
                      </div>

                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setGuests(num)}
                            className={`py-3.5 px-4 rounded-[12px] text-center transition-all cursor-pointer border flex flex-col items-center justify-center gap-1 ${
                              guests === num 
                                ? 'bg-brand-text text-brand-surface border-brand-text shadow-sm' 
                                : 'bg-brand-bg hover:bg-white border-brand-line-soft text-brand-text'
                            }`}
                          >
                            <span className="font-display text-[22px] font-medium leading-none">{num}</span>
                            <span className="font-mono text-[10px] tracking-wider uppercase opacity-80">
                              {num === 1 ? 'Solo' : num === 2 ? 'Pair' : 'Guests'}
                            </span>
                          </button>
                        ))}
                      </div>
                      <p className="font-mono text-[11px] text-brand-text-dim mt-3.5">
                        * For private gatherings of 7+ guests, our master roasters arrange customized salon sessions.
                      </p>
                    </div>

                    {/* Step 3: Time Slot */}
                    <div className="bg-brand-surface rounded-[20px] p-7 border border-brand-line-soft shadow-sm">
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-brand-accent text-white font-mono text-[11px] flex items-center justify-center">3</span>
                          <h2 className="font-display text-[22px] text-brand-text">Select Time</h2>
                        </div>
                        <span className="font-mono text-[12px] text-brand-text-dim">
                          {bookingType === 'sensory-flight' ? '75-min Master Session' : bookingType === 'tasting' ? '60-min Guided Flight' : '90-min Seating'}
                        </span>
                      </div>

                      <div className="space-y-5">
                        {TIME_SLOTS.map((group, gIdx) => (
                          <div key={gIdx}>
                            <span className="font-mono text-[11px] uppercase tracking-wider text-brand-accent font-semibold block mb-2.5">
                              {group.period}
                            </span>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                              {group.times.map((slot, sIdx) => {
                                const isSelected = selectedTime === slot;
                                return (
                                  <button
                                    key={sIdx}
                                    type="button"
                                    onClick={() => setSelectedTime(slot)}
                                    className={`py-2.5 px-3 rounded-[10px] text-[13px] font-mono transition-all cursor-pointer border text-center ${
                                      isSelected 
                                        ? 'bg-brand-text text-brand-surface border-brand-text font-semibold shadow-sm' 
                                        : 'bg-brand-bg hover:bg-white border-brand-line-soft text-brand-text'
                                    }`}
                                  >
                                    {slot}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Step 4: Seating Atmosphere */}
                    <div className="bg-brand-surface rounded-[20px] p-7 border border-brand-line-soft shadow-sm">
                      <div className="flex items-center gap-2.5 mb-5">
                        <span className="w-6 h-6 rounded-full bg-brand-accent text-white font-mono text-[11px] flex items-center justify-center">4</span>
                        <div>
                          <h2 className="font-display text-[22px] text-brand-text">Preferred Seating Area</h2>
                          <p className="text-[13px] text-brand-text-dim">Choose your preferred architectural corner of the roastery.</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {SEATING_AREAS.map((area) => {
                          const isSelected = selectedArea === area.id;
                          return (
                            <div
                              key={area.id}
                              onClick={() => setSelectedArea(area.id)}
                              className={`p-4 rounded-[16px] border transition-all cursor-pointer flex flex-col justify-between ${
                                isSelected 
                                  ? 'bg-brand-bg border-brand-accent shadow-sm ring-1 ring-brand-accent' 
                                  : 'bg-brand-surface hover:bg-brand-bg/50 border-brand-line-soft'
                              }`}
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 rounded-[10px] overflow-hidden shrink-0 bg-brand-bg-deep">
                                  <img src={area.img} alt={area.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                  <h4 className="font-display text-[16px] text-brand-text leading-tight">{area.name}</h4>
                                  <span className="font-mono text-[10px] uppercase text-brand-text-dim tracking-wider">{area.atmosphere}</span>
                                </div>
                              </div>
                              <p className="text-[12.5px] text-brand-text-mid leading-relaxed">{area.desc}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step 5: Contact Details */}
                    <div className="bg-brand-surface rounded-[20px] p-7 border border-brand-line-soft shadow-sm">
                      <div className="flex items-center gap-2.5 mb-6">
                        <span className="w-6 h-6 rounded-full bg-brand-accent text-white font-mono text-[11px] flex items-center justify-center">5</span>
                        <div>
                          <h2 className="font-display text-[22px] text-brand-text">Guest Details</h2>
                          <p className="text-[13px] text-brand-text-dim">We send confirmation pass and table updates via SMS.</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                        <div>
                          <label className="font-mono text-[11px] tracking-wider uppercase text-brand-text-dim block mb-1.5">
                            Full Name *
                          </label>
                          <div className="relative">
                            <User className="w-4 h-4 text-brand-text-dim absolute left-3.5 top-3.5" />
                            <input
                              type="text"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="e.g. Maya Sen"
                              className="w-full pl-10 pr-4 py-3 rounded-[12px] bg-brand-bg border border-brand-line-soft text-[14.5px] focus:outline-none focus:border-brand-accent transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="font-mono text-[11px] tracking-wider uppercase text-brand-text-dim block mb-1.5">
                            Phone Number *
                          </label>
                          <div className="relative">
                            <Phone className="w-4 h-4 text-brand-text-dim absolute left-3.5 top-3.5" />
                            <input
                              type="tel"
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="+91 98xxx xxxxx"
                              className="w-full pl-10 pr-4 py-3 rounded-[12px] bg-brand-bg border border-brand-line-soft text-[14.5px] focus:outline-none focus:border-brand-accent transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="font-mono text-[11px] tracking-wider uppercase text-brand-text-dim block mb-1.5">
                            Email Address (Optional)
                          </label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-brand-text-dim absolute left-3.5 top-3.5" />
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="maya@example.com"
                              className="w-full pl-10 pr-4 py-3 rounded-[12px] bg-brand-bg border border-brand-line-soft text-[14.5px] focus:outline-none focus:border-brand-accent transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="font-mono text-[11px] tracking-wider uppercase text-brand-text-dim block mb-1.5">
                            Occasion
                          </label>
                          <select
                            value={occasion}
                            onChange={(e) => setOccasion(e.target.value)}
                            className="w-full px-4 py-3 rounded-[12px] bg-brand-bg border border-brand-line-soft text-[14.5px] focus:outline-none focus:border-brand-accent transition-colors cursor-pointer"
                          >
                            <option>Signature Sensory Flight Session</option>
                            <option>Specialty Tasting Session</option>
                            <option>Coffee & Slow Conversation</option>
                            <option>Quiet Reading / Notebook</option>
                            <option>Birthday / Celebration</option>
                            <option>Informal Work Catchup</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="font-mono text-[11px] tracking-wider uppercase text-brand-text-dim block mb-1.5">
                          Special Requests or Dietary Notes
                        </label>
                        <textarea
                          rows={2}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="e.g. Prefer oat milk alternative, celebrating anniversary, quiet corner appreciated..."
                          className="w-full px-4 py-3 rounded-[12px] bg-brand-bg border border-brand-line-soft text-[14px] focus:outline-none focus:border-brand-accent transition-colors"
                        />
                      </div>
                    </div>

                    {/* Step 6: Payment Options (Pay at Cafe OR Online Payment with Demo ID) */}
                    <div className="bg-brand-surface rounded-[20px] p-7 border border-brand-line-soft shadow-sm">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-brand-accent text-white font-mono text-[11px] flex items-center justify-center">6</span>
                          <div>
                            <h2 className="font-display text-[22px] text-brand-text">Payment Options</h2>
                            <p className="text-[13px] text-brand-text-dim">
                              {totalAmount > 0 
                                ? `Total for ${guests} ${guests === 1 ? 'guest' : 'guests'}: ₹${totalAmount}`
                                : 'Complimentary reservation (No charge)'}
                            </p>
                          </div>
                        </div>

                        {totalAmount > 0 && (
                          <span className="font-display text-[22px] font-semibold text-brand-accent">
                            ₹{totalAmount}
                          </span>
                        )}
                      </div>

                      {/* Payment Method Selector Tabs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                        
                        {/* Option 1: Online Payment (Demo) */}
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('online')}
                          className={`p-4 rounded-[16px] text-left transition-all cursor-pointer border flex flex-col justify-between ${
                            paymentMethod === 'online'
                              ? 'bg-brand-bg border-brand-accent shadow-sm ring-1 ring-brand-accent'
                              : 'bg-brand-surface hover:bg-brand-bg/50 border-brand-line-soft'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <CreditCard className="w-4 h-4 text-brand-accent" />
                              <span className="font-display text-[17px] text-brand-text">Online Payment</span>
                            </div>
                            <span className="font-mono text-[9.5px] uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 font-semibold">
                              Instant Demo
                            </span>
                          </div>
                          <p className="text-[12px] text-brand-text-mid leading-relaxed">
                            Simulated digital payment. Generates an instant, verified Demo Payment ID automatically.
                          </p>
                        </button>

                        {/* Option 2: Pay at Cafe */}
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('pay-at-cafe')}
                          className={`p-4 rounded-[16px] text-left transition-all cursor-pointer border flex flex-col justify-between ${
                            paymentMethod === 'pay-at-cafe'
                              ? 'bg-brand-bg border-brand-accent shadow-sm ring-1 ring-brand-accent'
                              : 'bg-brand-surface hover:bg-brand-bg/50 border-brand-line-soft'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Wallet className="w-4 h-4 text-brand-sage" />
                              <span className="font-display text-[17px] text-brand-text">Pay at Cafe</span>
                            </div>
                            <span className="font-mono text-[9.5px] uppercase tracking-wider bg-brand-accent-soft text-brand-accent px-2 py-0.5 rounded-full font-semibold">
                              On Arrival
                            </span>
                          </div>
                          <p className="text-[12px] text-brand-text-mid leading-relaxed">
                            {totalAmount > 0 
                              ? `Pay ₹${totalAmount} upon arrival at the roastery counter via cash, UPI, or card.` 
                              : 'No payment required. Settle any cafe orders at the counter.'}
                          </p>
                        </button>

                      </div>

                      {/* Online Payment Interactive Demo Box */}
                      {paymentMethod === 'online' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="bg-[#241c16] text-[#fbf7f2] rounded-[18px] p-5 md:p-6 border border-[#b3541e]/40 shadow-inner"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
                            <div>
                              <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                <span className="font-mono text-[11px] uppercase tracking-[1.5px] font-bold text-emerald-400">
                                  Demo Payment Gateway Simulator
                                </span>
                              </div>
                              <p className="text-[12.5px] text-[#cdbeaf] mt-0.5">
                                Verified demo transaction engine — no real charges made.
                              </p>
                            </div>

                            {/* Demo Payment ID Display with Copy and Refresh */}
                            <div className="flex items-center gap-2 bg-black/40 rounded-[12px] px-3 py-2 border border-white/10 shrink-0">
                              <div className="text-right font-mono">
                                <span className="text-[9.5px] text-[#9c8d7e] block uppercase">Demo Payment ID</span>
                                <span className="text-[13px] font-bold text-[#ffecd1] tracking-wider">{demoPaymentId}</span>
                              </div>
                              <button
                                type="button"
                                onClick={handleCopyPaymentId}
                                title="Copy Demo Payment ID"
                                className="p-1.5 rounded-md hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
                              >
                                {copiedPaymentId ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                              </button>
                              <button
                                type="button"
                                onClick={handleRegenerateDemoId}
                                title="Generate New Demo Payment ID"
                                className="p-1.5 rounded-md hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
                              >
                                <RefreshCw className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Online Demo Methods (UPI / Card / 1-Click) */}
                          <div className="space-y-4">
                            <div className="flex gap-2 font-mono text-[11px]">
                              <button
                                type="button"
                                onClick={() => setOnlineMode('upi')}
                                className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                                  onlineMode === 'upi'
                                    ? 'bg-[#b3541e] text-white border-[#b3541e]'
                                    : 'bg-white/5 border-white/10 text-[#cdbeaf] hover:text-white'
                                }`}
                              >
                                Demo UPI / QR
                              </button>
                              <button
                                type="button"
                                onClick={() => setOnlineMode('card')}
                                className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                                  onlineMode === 'card'
                                    ? 'bg-[#b3541e] text-white border-[#b3541e]'
                                    : 'bg-white/5 border-white/10 text-[#cdbeaf] hover:text-white'
                                }`}
                              >
                                Demo Card (•••• 4242)
                              </button>
                              <button
                                type="button"
                                onClick={() => setOnlineMode('quick-demo')}
                                className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                                  onlineMode === 'quick-demo'
                                    ? 'bg-[#b3541e] text-white border-[#b3541e]'
                                    : 'bg-white/5 border-white/10 text-[#cdbeaf] hover:text-white'
                                }`}
                              >
                                1-Click Instant Pay
                              </button>
                            </div>

                            {/* Demo UPI details */}
                            {onlineMode === 'upi' && (
                              <div className="p-3.5 rounded-[12px] bg-black/30 border border-white/10 text-[12.5px] flex items-center justify-between gap-4">
                                <div>
                                  <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px] mb-0.5">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>Simulated UPI Ready</span>
                                  </div>
                                  <span className="font-mono text-[#ffecd1]">coppercrema@demo-hdfc</span>
                                  <span className="text-[#a49688] block text-[11.5px]">UPI Ref: UPI-TXN-CC{Math.floor(100000 + Math.random() * 900000)}</span>
                                </div>
                                <div className="w-12 h-12 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                                  <QrCode className="w-7 h-7 text-[#ffecd1]" />
                                </div>
                              </div>
                            )}

                            {/* Demo Card details */}
                            {onlineMode === 'card' && (
                              <div className="p-3.5 rounded-[12px] bg-black/30 border border-white/10 text-[12.5px] flex items-center justify-between gap-4 font-mono">
                                <div>
                                  <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] mb-0.5">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>Simulated Visa Sandbox Approved</span>
                                  </div>
                                  <span className="text-[#ffecd1]">•••• •••• •••• 4242</span>
                                  <span className="text-[#a49688] block text-[11.5px]">Exp: 12/28 • CVV: 842</span>
                                </div>
                                <CreditCard className="w-7 h-7 text-[#b3541e] shrink-0" />
                              </div>
                            )}

                            {/* 1-Click Instant */}
                            {onlineMode === 'quick-demo' && (
                              <div className="p-3.5 rounded-[12px] bg-black/30 border border-white/10 text-[12.5px] flex items-center justify-between gap-4">
                                <div>
                                  <span className="text-emerald-400 font-semibold block">Instant Demo Approval</span>
                                  <span className="text-[#cdbeaf] text-[12px]">Submitting the form will immediately verify and lock in your reservation with demo payment ID {demoPaymentId}.</span>
                                </div>
                              </div>
                            )}

                            {/* Total bill calculation banner */}
                            <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[12px]">
                              <span className="text-[#cdbeaf]">
                                {bookingType === 'sensory-flight' ? 'Signature Sensory Flight' : bookingType === 'tasting' ? 'Guided Tasting Table' : 'Cafe Table'} (×{guests}):
                              </span>
                              <span className="text-[#ffecd1] font-semibold text-[14px]">
                                {totalAmount > 0 ? `₹${unitPrice} × ${guests} = ₹${totalAmount}` : 'Complimentary'}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Submit Button (Mobile Primary) */}
                    <div className="lg:hidden">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-full bg-brand-accent hover:bg-brand-accent-deep text-white font-mono text-[12px] tracking-[1.4px] uppercase font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <span>Verifying Reservation & Payment...</span>
                        ) : (
                          <>
                            <span>
                              {paymentMethod === 'online' && totalAmount > 0 
                                ? `Pay ₹${totalAmount} Online & Confirm` 
                                : bookingType === 'sensory-flight' 
                                  ? 'Confirm Sensory Flight' 
                                  : bookingType === 'tasting' 
                                    ? 'Confirm Tasting Table' 
                                    : 'Confirm Table Reservation'}
                            </span>
                            <ChevronRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>

                  </form>
                </div>

                {/* Right Sticky Summary Card */}
                <div className="sticky top-24 hidden lg:block">
                  <div className="bg-brand-surface rounded-[24px] p-7 border border-brand-line shadow-brand">
                    <div className="flex items-center gap-2 border-b border-brand-line pb-4 mb-5">
                      <Sparkles className="w-4 h-4 text-brand-accent" />
                      <h3 className="font-display text-[20px] text-brand-text">Reservation Summary</h3>
                    </div>

                    {/* Active Seating Image Preview */}
                    <div className="relative rounded-[16px] overflow-hidden aspect-[16/9] mb-5 bg-brand-bg-deep">
                      <img 
                        src={activeAreaObj.img} 
                        alt={activeAreaObj.name} 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-2.5 left-3 text-white">
                        <span className="font-display text-[16px] block">{activeAreaObj.name}</span>
                        <span className="font-mono text-[9.5px] uppercase tracking-wider opacity-90">{activeAreaObj.atmosphere}</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6 text-[13.5px]">
                      <div className="flex items-center justify-between py-1.5 border-b border-dashed border-brand-line-soft">
                        <span className="text-brand-text-dim flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-brand-accent" /> Experience
                        </span>
                        <span className="font-semibold text-brand-accent text-right">
                          {bookingType === 'sensory-flight' 
                            ? 'Sensory Flight (4-Course)' 
                            : bookingType === 'tasting' 
                              ? 'Tasting Table Flight' 
                              : 'Cafe Table'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-1.5 border-b border-dashed border-brand-line-soft">
                        <span className="text-brand-text-dim flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4 text-brand-accent" /> Date
                        </span>
                        <span className="font-semibold text-brand-text">{selectedDate.dayOfWeek}, {selectedDate.month} {selectedDate.dateNum}</span>
                      </div>

                      <div className="flex items-center justify-between py-1.5 border-b border-dashed border-brand-line-soft">
                        <span className="text-brand-text-dim flex items-center gap-2">
                          <Clock className="w-4 h-4 text-brand-accent" /> Time Slot
                        </span>
                        <span className="font-semibold text-brand-text">{selectedTime}</span>
                      </div>

                      <div className="flex items-center justify-between py-1.5 border-b border-dashed border-brand-line-soft">
                        <span className="text-brand-text-dim flex items-center gap-2">
                          <Users className="w-4 h-4 text-brand-accent" /> Guests
                        </span>
                        <span className="font-semibold text-brand-text">{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                      </div>

                      <div className="flex items-center justify-between py-1.5 border-b border-dashed border-brand-line-soft">
                        <span className="text-brand-text-dim flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-brand-accent" /> Payment
                        </span>
                        <span className="font-semibold text-brand-text">
                          {paymentMethod === 'online' ? 'Online (Demo ID)' : 'Pay at Cafe'}
                        </span>
                      </div>

                      {totalAmount > 0 && (
                        <div className="flex items-center justify-between py-2 border-t border-brand-line font-mono">
                          <span className="font-semibold text-brand-text">Total Price:</span>
                          <span className="font-display text-[20px] font-semibold text-brand-accent">₹{totalAmount}</span>
                        </div>
                      )}
                    </div>

                    <div className="bg-brand-bg-deep rounded-[14px] p-3.5 text-[12px] text-brand-text-mid mb-6 space-y-1.5">
                      <div className="flex items-center gap-1.5 font-semibold text-brand-text">
                        <HeartHandshake className="w-3.5 h-3.5 text-brand-sage" />
                        <span>Cafe Hospitality Guarantee</span>
                      </div>
                      <p>
                        {bookingType === 'sensory-flight'
                          ? 'Flagship 4-course sensory journeys begin on the hour. Free cancellation up to 2 hours prior.'
                          : bookingType === 'tasting'
                            ? 'Tasting sessions begin promptly with hot cupping flights. Complimentary cancellation up to 2 hours prior.'
                            : 'Tables held for 15 minutes past reservation. Free cancellation anytime before arrival.'}
                      </p>
                    </div>

                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                      className="w-full py-4 rounded-full bg-brand-accent hover:bg-brand-accent-deep text-white font-mono text-[11.5px] tracking-[1.4px] uppercase font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Verifying Booking & Payment...</span>
                      ) : (
                        <>
                          <span>
                            {paymentMethod === 'online' && totalAmount > 0 
                              ? `Pay ₹${totalAmount} Online & Confirm` 
                              : bookingType === 'sensory-flight' 
                                ? 'Confirm Sensory Flight' 
                                : bookingType === 'tasting' 
                                  ? 'Confirm Tasting Table' 
                                  : 'Confirm Table Reservation'}
                          </span>
                          <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            )}
          </AnimatePresence>

        </div>
      </main>

      {/* Boutique Footer note */}
      <footer className="py-8 border-t border-brand-line-soft bg-brand-surface text-center text-[12.5px] text-brand-text-dim">
        <p>Copper & Crema • 12 Lane Road • Daily 07:30 — 22:00</p>
      </footer>
    </div>
  );
}
