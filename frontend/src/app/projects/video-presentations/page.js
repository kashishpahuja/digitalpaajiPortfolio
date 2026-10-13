'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Play, StepBack, StepForward, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollFloat from '@/components/ScrollFloat';
import Footer from '@/components/Footer';
import { useParams } from 'next/navigation';

// Register ScrollTrigger outside the component
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const presentationProjectData = {
  title: 'Video Presentation',
  
  subtitle: 'High-impact dynamic cinematic pitch reels designed to command attention.',
  category: 'Pitch & Brand Films',
  client: 'Nexus Ventures',
  year: '2026',
  role: 'Motion Design & Directing',
  description: 'Designed for high-stakes investor keynotes, this piece utilizes minimal typography styling, rhythm-driven editing, and depth-based camera choreography to turn technical data into a compelling brand journey.',
  coverImage:  "/Images/video.webp",
  gallery: [
    
    {
      type: "video",
      url: "https://www.youtube.com/embed/QzXLG6FpSh0",
      thumb: "bni.png",
    },{
      type: "video",
      url: "https://www.youtube.com/embed/J-xrMCtDCgU",
      thumb: "prodsol.webp",
    },
    {
      type: "video",
      url: "https://www.youtube.com/embed/XszgFnVc2uE",
      thumb: "electronica.webp",
    },
    {
      type: "video",
      url: "https://www.youtube.com/embed/c_Ejpxq2dwI",
      thumb: "army.webp",
    },
    {
      type: "video",
      url: "https://www.youtube.com/embed/sQB8aZIg2_k",
      thumb: "paaji1.webp",
    },
    {
      type: "video",
      url: "https://www.youtube.com/embed/aiYW0XayqZw",
      thumb: "mtat1.webp",
    },
    {
      type: "video",
      url: "https://www.youtube.com/embed/IuyyTybLSfI",
      thumb: "xyz.webp",
    },
  ]
};

export default function VideoPresentationsDetail() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const coverContainerRef = useRef(null);

  // Manage body scroll overflow on modal open/close
  useEffect(() => {
    document.body.style.overflow = selectedAsset !== null ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedAsset]);

  // Cover image container expand animation on scroll
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        coverContainerRef.current,
        {
          width: "60%",
          scale: 0.9,
          borderRadius: "48px",
          opacity: 0.5,
        },
        {
          width: "100%",
          scale: 1,
          borderRadius: "0px",
          opacity: 1,
          scrollTrigger: {
            trigger: coverContainerRef.current,
            start: "top 85%",
            end: "top 15%",
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const getModalVideoUrl = (url) => {
    const videoId = url.split("/embed/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0`;
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedAsset((prev) => (prev + 1) % presentationProjectData.gallery.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedAsset((prev) => (prev - 1 + presentationProjectData.gallery.length) % presentationProjectData.gallery.length);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkTheme ? 'bg-black text-white' : 'bg-white text-neutral-900'}`}>
      
      {/* Top Navigation Bar */}
     {/* Top Navigation Bar */}
<header className="flex items-center justify-between w-full px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40 2xl:px-52 py-8 z-20">
  <Link href="/" className="flex items-center cursor-pointer">
    <img 
      src={darkTheme ? "/logoWhite.webp" : "/logo2.webp"} 
      alt="Digital Paaji Logo" 
      className="h-12 md:h-[80px] w-auto object-contain transition-opacity duration-300" 
    />
  </Link>

  <div className="flex items-center space-x-6">
    <button 
      onClick={() => setDarkTheme(!darkTheme)}
      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${darkTheme ? 'bg-white' : 'bg-neutral-900'}`}
      aria-label="Toggle Theme"
    >
      <div className={`bg-neutral-200 w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${darkTheme ? 'translate-x-6 bg-neutral-900' : 'translate-x-0'}`} />
    </button>
    
    <Link href="/" className="text-sm font-medium hover:opacity-70 transition-opacity">
      ← Back Home
    </Link>
  </div>
</header>

      {/* Hero Header Section */}
      <main className=" px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40 2xl:px-52 py-16 lg:py-24">
        
        {/* Category & Year */}
        <div className="flex items-center space-x-4 text-sm uppercase tracking-widest opacity-60 mb-6 animate-slide-up opacity-0 [animation-fill-mode:forwards] [animation-delay:100ms]">
          <span>{presentationProjectData.category}</span>
          <span>•</span>
          <span>{presentationProjectData.year}</span>
        </div>

        {/* Title with ScrollFloat Animation */}
        <div className="mb-8 w-fit ">
          <ScrollFloat
    text={presentationProjectData.title}
    // text='Video Presentations'
    reveal="letter"
    
    dashLength={4}
    dashGap={2}
    specks={10}
color={darkTheme ? "#ffffff" : "#171717"}
    accentColor={darkTheme ? "#ffffff" : "#171717"}
    // letterSpacing={0.03}
    reach={150}
    softness={0.7}
    strokeWidth={1.5}
    speed={1}
    lineStyle="dashed"
    selection
    labels={false}
    draggable
    sweep
            textClassName={`text-5xl sm:text-7xl lg:text-9xl font-extrabold tracking-tight ${darkTheme ? 'text-white' : 'text-neutral-900'}`}
          >
           Video Presentation
          </ScrollFloat>
        </div>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl font-light opacity-80 max-w-3xl leading-relaxed mb-16 animate-slide-up opacity-0 [animation-fill-mode:forwards] [animation-delay:300ms]">
          {presentationProjectData.subtitle}
        </p>

        {/* Project Meta Info Grid */}
        {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-8 border-y border-neutral-800 mb-16 animate-slide-up opacity-0 [animation-fill-mode:forwards] [animation-delay:400ms]">
          <div>
            <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Client</p>
            <p className="text-lg font-medium">{presentationProjectData.client}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Role / Scope</p>
            <p className="text-lg font-medium">{presentationProjectData.role}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Year</p>
            <p className="text-lg font-medium">{presentationProjectData.year}</p>
          </div>
        </div> */}

      </main>

      {/* --- GSAP Scroll Expand Cover Media Section --- */}
      {/* <div className="w-full flex justify-center overflow-hidden mb-24">
        <div
          ref={coverContainerRef}
          className="overflow-hidden shadow-2xl aspect-[16/9]"
        >
          <img src={presentationProjectData.coverImage} alt={presentationProjectData.title} className="w-full h-full object-cover" />
        </div>
      </div> */}

      <main className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40 2xl:px-52">
        {/* Overview & Description Section */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          <div className="lg:col-span-5">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">The Challenge &amp; Solution</h2>
          </div>
          <div className="lg:col-span-7 space-y-6 text-lg font-light opacity-90 leading-relaxed">
            <p>{presentationProjectData.description}</p>
            <p>Every presentation video was crafted with custom visual pacing and professional sound design to keep audiences completely captivated.</p>
          </div>
        </div> */}

        {/* Gallery Section - Landscape Grid layout (1 col mobile, 2 cols on md+) */}
        <div className="space-y-12 mb-24">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            {presentationProjectData.gallery.map((asset, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.01 }}
                onClick={() => setSelectedAsset(index)}
                className="group relative rounded-xl overflow-hidden cursor-pointer bg-black/20 border border-white/10 shadow-2xl aspect-video"
              >
                <img
                  src={`/Images/thumbnail/${asset.thumb}`}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover group-hover:opacity-75 transition duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/70 p-4 rounded-full backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <Play className="text-white w-8 h-8 pl-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Modal Video Player */}
        <AnimatePresence>
          {selectedAsset !== null && (
            <motion.div
              className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Close Button */}
              <button
                className="absolute top-6 right-6 md:top-10 md:right-10 z-50 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110"
                onClick={() => setSelectedAsset(null)}
              >
                <X size={32} />
              </button>

              {/* Previous Button */}
              <button
                className="absolute left-6 top-1/2 z-50 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110"
                onClick={handlePrev}
              >
                <StepBack size={28} />
              </button>

              {/* Next Button */}
              <button
                className="absolute right-6 top-1/2 z-50 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110"
                onClick={handleNext}
              >
                <StepForward size={28} />
              </button>

              {/* Video Player Container */}
              <div className="w-full max-w-6xl px-4">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <iframe
                    src={getModalVideoUrl(presentationProjectData.gallery[selectedAsset].url)}
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next Project Footer Navigation */}
        <div className="border-t border-neutral-800 pt-16 pb-24 text-center">
          <p className="text-sm uppercase tracking-widest opacity-50 mb-4">Explore More</p>
          <Link href="/" className="text-3xl sm:text-5xl font-bold hover:opacity-70 transition-opacity">
            Back to All Works →
          </Link>
        </div>

      </main>

      <Footer />

      {/* Keyframe Animation Styles */}
      <style jsx global>{`
        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}