'use client';
import React from 'react';
import Ferrofluid from './Ferrofluid';

export default function AboutSection({ darkTheme = false }) {
  return (
    <section 
      id="about" 
      className={`relative min-h-screen flex flex-col items-center justify-center text-center w-full py-24 px-6 sm:px-12 md:px-20 transition-colors duration-500 overflow-hidden ${
        darkTheme ? 'bg-[#0A0A0A] text-white' : 'bg-white text-neutral-900'
      }`}
    >
      {/* Ferrofluid WebGL Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-auto opacity-70">
        <Ferrofluid
          colors={darkTheme ? ["#ffffff", "#a855f7", "#3b82f6"] : ["#171717", "#7c3aed", "#2563eb"]}
          speed={0.4}
          scale={2.6}
          turbulence={0.5}
          fluidity={0.1}
          rimWidth={0.2}
          sharpness={2.5}
          shimmer={1.5}
          glow={2}
          flowDirection="down"
          opacity={darkTheme ? 0.8 : 0.15}
          mouseInteraction
          mouseStrength={1.6}
          mouseRadius={0.35}
        />
      </div>

      {/* Foreground Content Layer */}
      <div className="relative z-10 max-w-3xl mx-auto space-y-16">
        
        {/* Headline & Subtitle */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
            Designed to move brands &amp; businesses forward.
          </h2>
          <p className="text-2xl font-light opacity-90 leading-relaxed">
            A full-service digital marketing, design, and web development agency built to turn creative ideas into real-world momentum.
          </p>
        </div>

        {/* Detailed Studio Bio & Values */}
        <div className="flex flex-col space-y-6">
          <p className={`text-2xl leading-relaxed ${darkTheme ? 'text-neutral-200' : 'text-neutral-800'}`}>
            <strong className={`${darkTheme ? 'text-white' : 'text-black'} font-semibold`}>Digital Paaji</strong> is a powerhouse digital agency crafting results-driven creative strategies, high-performance websites, expressive motion, and thoughtful digital interactions. 
          </p>
          <p className={`text-xl leading-relaxed ${darkTheme ? 'text-neutral-300' : 'text-neutral-700'}`}>
            Whether through advanced SEO, cutting-edge web design, or impactful social media campaigns, we build digital assets that let your work speak for itself without getting in the way.
          </p>

     <a
  href="https://digitalpaaji.com/contact"
  className={`cursor-pointer font-medium group inline-flex items-center justify-center px-8 py-4 rounded-full transition-all duration-300 shadow-lg w-fit mx-auto ${
    darkTheme
      ? 'bg-white text-black hover:bg-neutral-200'
      : 'bg-black text-white hover:bg-neutral-800'
  }`}
>
  <div className="relative overflow-hidden h-6 leading-6">
    <p className="group-hover:-translate-y-6 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
      Start a Project
    </p>
    <p className="absolute top-6 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
      Start a Project
    </p>
  </div>
</a>
        </div>

      </div>
    </section>
  );
}