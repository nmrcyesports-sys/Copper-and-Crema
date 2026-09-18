import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface NavbarProps {
  onReserve: (type?: 'tasting' | 'table') => void;
}

export default function Navbar({ onReserve }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-[#f6f1e7]/85 backdrop-blur-md border-b transition-colors duration-300 ${scrolled ? 'border-brand-line-soft' : 'border-transparent'}`}>
      <div className="max-w-[1200px] mx-auto px-7 py-4 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-baseline gap-2.5 no-underline group">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-accent shadow-[0_0_0_3px_var(--color-brand-accent-soft)]"></span>
          <span className="font-display text-[22px] tracking-[0.2px] whitespace-nowrap">Copper & Crema</span>
        </a>
        
        <ul className="hidden lg:flex gap-6 list-none items-center m-0 p-0">
          <li><a href="#signature-cafe" className="text-[13.5px] font-medium text-brand-text-mid hover:text-brand-accent-deep transition-colors">Bestsellers</a></li>
          <li><a href="#menu" className="text-[13.5px] font-medium text-brand-text-mid hover:text-brand-accent-deep transition-colors">Counter Menu</a></li>
          <li><a href="#gallery" className="text-[13.5px] font-medium text-brand-text-mid hover:text-brand-accent-deep transition-colors">Gallery</a></li>
          <li><a href="#concept" className="text-[13.5px] font-medium text-brand-text-mid hover:text-brand-accent-deep transition-colors">About the Space</a></li>
          <li><a href="#highlights" className="text-[13.5px] font-medium text-brand-text-mid hover:text-brand-accent-deep transition-colors">Highlights</a></li>
          <li><a href="#why-visit" className="text-[13.5px] font-medium text-brand-text-mid hover:text-brand-accent-deep transition-colors">The Experience</a></li>
        </ul>

        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => onReserve('table')}
            className="hidden sm:inline-block font-mono text-[11px] tracking-[1px] uppercase text-brand-text-mid hover:text-brand-accent px-3 py-2 transition-colors cursor-pointer whitespace-nowrap"
          >
            Reserve Table
          </button>
          
          <button 
            onClick={() => onReserve('tasting')}
            className="inline-flex items-center gap-1.5 font-mono text-[11.5px] tracking-[1px] uppercase no-underline text-white bg-brand-accent px-4 py-2.5 rounded-full transition-all hover:bg-brand-accent-deep hover:-translate-y-[1px] whitespace-nowrap cursor-pointer shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Book Tasting Table</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
