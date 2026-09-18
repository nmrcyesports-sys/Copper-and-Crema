import { useRef, useEffect, useState, type MouseEvent as ReactMouseEvent } from 'react';
import { motion } from 'motion/react';

const galleryImages = [
  { img: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=800&q=70", title: "The pour", tag: "Espresso bar" },
  { img: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=800&q=70", title: "The space", tag: "Window tables" },
  { img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=70", title: "The bake", tag: "Morning tray" },
  { img: "https://images.unsplash.com/photo-1493857671505-72967e2e2760?auto=format&fit=crop&w=800&q=70", title: "The light", tag: "Slow afternoons" },
  { img: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=800&q=70", title: "The counter", tag: "Rituals, daily" },
  { img: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=800&q=70", title: "The plate", tag: "Slower plates" }
];

export default function Gallery() {
  const stripRef = useRef<HTMLDivElement>(null);
  const [centerIndex, setCenterIndex] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const dragDistance = useRef(0);

  // Auto-advance logic
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCenterIndex((currentIndex) => {
        const nextIndex = (currentIndex + 1) % galleryImages.length;
        
        if (stripRef.current && stripRef.current.children[nextIndex]) {
          const strip = stripRef.current;
          const child = strip.children[nextIndex] as HTMLElement;
          const containerCenter = strip.clientWidth / 2;
          const childCenter = child.offsetLeft + (child.offsetWidth / 2);
          strip.scrollTo({
            left: childCenter - containerCenter,
            behavior: 'smooth'
          });
        }
        
        return nextIndex;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isHovered]);

  useEffect(() => {
    const updateGallery = () => {
      if (!stripRef.current) return;
      const strip = stripRef.current;
      const mid = strip.getBoundingClientRect().left + strip.clientWidth / 2;
      let best = -1;
      let bestDist = Infinity;
      
      Array.from(strip.children).forEach((childNode, index) => {
        const child = childNode as HTMLElement;
        const r = child.getBoundingClientRect();
        const cMid = r.left + r.width / 2;
        const d = Math.abs(cMid - mid);
        if (d < bestDist) {
          bestDist = d;
          best = index;
        }
      });
      
      if (best !== -1 && bestDist < strip.clientWidth * 0.35) {
        setCenterIndex(best);
      } else {
        setCenterIndex(-1);
      }
    };

    const strip = stripRef.current;
    if (strip) {
      strip.addEventListener('scroll', () => requestAnimationFrame(updateGallery), { passive: true });
      window.addEventListener('resize', updateGallery);
      
      // Initial scroll to center first item
      requestAnimationFrame(() => {
        if (strip.children[1]) {
          const child = strip.children[1] as HTMLElement;
          const containerCenter = strip.clientWidth / 2;
          const childCenter = child.offsetLeft + (child.offsetWidth / 2);
          strip.scrollTo({
            left: childCenter - containerCenter,
            behavior: 'smooth'
          });
        }
        setTimeout(updateGallery, 600);
      });
    }

    return () => {
      if (strip) {
        strip.removeEventListener('scroll', updateGallery);
      }
      window.removeEventListener('resize', updateGallery);
    };
  }, []);

    const handleCellClick = (index: number) => {
    if (dragDistance.current > 10) return; // Prevent click when dragging
    if (stripRef.current && stripRef.current.children[index]) {
      const strip = stripRef.current;
      const child = strip.children[index] as HTMLElement;
      const containerCenter = strip.clientWidth / 2;
      const childCenter = child.offsetLeft + (child.offsetWidth / 2);
      strip.scrollTo({
        left: childCenter - containerCenter,
        behavior: 'smooth'
      });
    }
  };

  const handleMouseDown = (e: ReactMouseEvent) => {
    setIsDragging(true);
    dragDistance.current = 0;
    if (!stripRef.current) return;
    setStartX(e.pageX - stripRef.current.offsetLeft);
    setScrollLeft(stripRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: ReactMouseEvent) => {
    if (!isDragging || !stripRef.current) return;
    e.preventDefault();
    const x = e.pageX - stripRef.current.offsetLeft;
    dragDistance.current = Math.abs(x - startX);
    const walk = (x - startX) * 2;
    stripRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section 
      id="gallery" 
      className="py-[105px] gallery-strip-container overflow-hidden bg-gradient-to-b from-[#f5eee3]/75 via-[#ecdfcc]/70 to-[#18130e]/92 backdrop-blur-[2px] relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      {/* Top subtle radiant copper accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#b3541e]/35 to-transparent pointer-events-none" />

      {/* Atmospheric radial ambient light diffusions */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#d98236]/[0.08] rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[400px] bg-[#b3541e]/[0.09] rounded-full blur-[160px] pointer-events-none" />

      {/* Roastery atelier watermark pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply overflow-hidden">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="galleryGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1.2" fill="#7e4620" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#galleryGrid)" />
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto px-7 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.7 }}
          className="mb-[52px]"
        >
          <p className="eyebrow">Gallery</p>
          <h2 className="font-display font-normal text-[clamp(34px,4.4vw,52px)] leading-[1.08] tracking-[-0.3px] mt-[18px] max-w-[22ch]">The space opens, then settles in.</h2>
          <p className="text-brand-text-mid max-w-[58ch] mt-[16px] text-[16px]">Scroll through the collection — the centre panel opens up as it passes through the middle, revealing the coffee, pastry, and interior details that make the experience feel complete.</p>
        </motion.div>
      </div>
      
      <div 
        ref={stripRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`gallery-strip flex gap-[16px] overflow-x-auto px-7 pb-[26px] scrollbar-thin scrollbar-thumb-brand-line scrollbar-track-transparent ${isDragging ? 'cursor-grabbing select-none' : 'snap-x snap-mandatory cursor-grab'}`}
      >
        {galleryImages.map((item, i) => {
          const isCenter = i === centerIndex;
          return (
            <motion.div 
              key={i}
              onClick={() => handleCellClick(i)}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 100px -10% 0px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex-none h-[380px] rounded-[14px] overflow-hidden snap-center bg-brand-bg-deep cursor-pointer transition-all duration-[0.45s] ease-[cubic-bezier(0.22,1,0.36,1)] ${isCenter ? 'w-[420px]' : 'w-[260px]'}`}
            >
              <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
              <div className={`absolute inset-0 bg-gradient-to-t from-[rgba(28,18,10,0.55)] to-transparent to-[45%] transition-opacity duration-[0.35s] ease-out ${isCenter ? 'opacity-100' : 'opacity-0'}`}></div>
              <figcaption className={`absolute left-[20px] right-[20px] bottom-[18px] text-white z-10 transition-all duration-[0.35s] ease-out delay-[0.08s] ${isCenter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                <h3 className="font-display font-normal text-[24px] leading-[1.1]">{item.title}</h3>
                <span className="font-mono text-[10px] tracking-[1.8px] uppercase opacity-85 block mt-[6px]">{item.tag}</span>
              </figcaption>
            </motion.div>
          );
        })}
      </div>
      <p className="text-center font-mono text-[11px] tracking-[1.6px] uppercase text-brand-text-dim mt-[8px]">
        ← drag or scroll the strip · panels open at the centre →
      </p>
    </section>
  );
}
