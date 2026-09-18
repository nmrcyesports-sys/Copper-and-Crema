/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import WhyPeopleVisit from './components/WhyPeopleVisit';
import Gallery from './components/Gallery';
import SignatureCafe from './components/SignatureCafe';
import Concept from './components/Concept';
import Highlights from './components/Highlights';
import Footer from './components/Footer';
import ReservationPage from './components/ReservationPage';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'reserve'>(() => {
    return window.location.hash === '#reserve' || window.location.hash === '#tasting' || window.location.hash === '#sensory-flight' ? 'reserve' : 'home';
  });
  const [reservationType, setReservationType] = useState<'tasting' | 'table' | 'sensory-flight'>(() => {
    if (window.location.hash === '#sensory-flight') return 'sensory-flight';
    if (window.location.hash === '#tasting') return 'tasting';
    return 'table';
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#reserve') {
        setReservationType('table');
        setCurrentView('reserve');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#tasting') {
        setReservationType('tasting');
        setCurrentView('reserve');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#sensory-flight') {
        setReservationType('sensory-flight');
        setCurrentView('reserve');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (currentView === 'reserve' && !window.location.hash.startsWith('#reserve') && !window.location.hash.startsWith('#tasting') && !window.location.hash.startsWith('#sensory-flight')) {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentView]);

  const goToReserve = (type: 'tasting' | 'table' | 'sensory-flight' = 'tasting') => {
    setReservationType(type);
    window.location.hash = type;
    setCurrentView('reserve');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToHome = () => {
    window.location.hash = '';
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative selection:bg-brand-accent selection:text-white">
      {/* Global Aesthetic Coffee Roastery Background Image Layer for the Whole Web */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Main atmospheric roastery image */}
        <img
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=2560&q=85"
          alt="Copper & Crema Artisanal Roastery Interior"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.98] contrast-[1.03]"
        />

        {/* Warm Crema & Roasted Amber Ambient Tone Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fbf8f2]/82 via-[#f6eee3]/80 to-[#f3eade]/84 mix-blend-normal" />
        
        {/* Soft Roasted Copper Radiant Tint */}
        <div className="absolute inset-0 bg-[#b3541e]/[0.06] mix-blend-multiply" />

        {/* Vintage Micro-Noise Texture for Handcrafted Film Aesthetic */}
        <div 
          className="absolute inset-0 opacity-[0.16] mix-blend-overlay" 
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />
      </div>

      <div className="relative z-10">
        {currentView === 'reserve' ? (
          <ReservationPage onBack={goToHome} initialType={reservationType} />
        ) : (
          <>
            <Navbar onReserve={goToReserve} />
            <Hero onReserve={goToReserve} />
            {/* 2nd Section: Signature Cafe Bestsellers */}
            <SignatureCafe onReserve={goToReserve} />
            <Menu />
            <Gallery />
            <Concept />
            <Highlights />
            {/* "The Experience" section */}
            <WhyPeopleVisit onReserve={goToReserve} />
            <Footer onReserve={goToReserve} />
          </>
        )}
      </div>
    </div>
  );
}

