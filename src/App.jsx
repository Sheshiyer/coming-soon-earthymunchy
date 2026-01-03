import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import SocialProof from './components/SocialProof';
import Footer from './components/Footer';
import HeroOption2 from './components/HeroOption2'; // Import Option 2
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <div className="app-wrapper">
      {/* Option 2 View */}
      <HeroOption2 />

      {/* Original View (Commented out) */}
      {/* 
      <Header />
      <main>
        <Hero />
        <Marquee />
        <SocialProof />
      </main>
      <Footer />
      */}
    </div>
  );
}

export default App;
