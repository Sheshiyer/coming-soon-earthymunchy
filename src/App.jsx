import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';

import Footer from './components/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <main>
        <Hero />
        <Marquee />
      </main>
      <Footer />
    </div>
  );
}

export default App;
