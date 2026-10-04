'use client';
import { useState } from 'react';
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import CustomCursor from "../components/CustomCursor";
import FeaturedProjects from '../components/FeaturedProjects'
import Footer from '@/components/Footer';
import Gallary from '@/components/Gallary';


export default function Home() {
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkTheme ? 'bg-black text-white' : 'bg-white text-neutral-900'}`}>
      {/* Global Custom Cursor tracking the current theme */}
      <CustomCursor darkTheme={darkTheme} />

      {/* Hero / Banner with toggle handler */}
      <Hero darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
     <Gallary/>

      {/* About Section sharing the exact same darkTheme state */}
      <AboutSection darkTheme={darkTheme} />
      <FeaturedProjects darkTheme={darkTheme} />
      <Footer/>
    </div>
  );
}