'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Play, StepBack, StepForward, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollFloat from '@/components/ScrollFloat';
import Footer from '@/components/Footer';

// Register ScrollTrigger outside the component
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Static database mapping matching the projects list
  const projectDataMap = {

  'animation': {
    title: 'Reel Creation',
    subtitle: 'Conceptual Videos and Reel Creations for different brands.',
    category: '3D Motion Graphics',
    client: 'Kinetix Studio',
    year: '2025',
    role: '3D Simulation & Shaders',
    description: 'An experimental study in fluid dynamics and ferrofluid behavior. We created custom procedural shaders in WebGL and rendered photorealistic 3D compositions for digital installations.',
    coverImage:"/Images/portfolio/reels/cover.gif",
      gallery: [


       
      {type:"video",url:"https://www.youtube.com/embed/H-tSTgWOYiY", thumb:"mc1.webp"},
            {type:"video",url:"https://www.youtube.com/embed/xYAO_W4Y1BI",thumb:"ibnta8.webp"},    
      // {type:"video",url:"https://www.youtube.com/embed/oxwJNsLFvls",thumb:"ptiala.webp"},      
     
      {type:"video",url:"https://www.youtube.com/embed/6vqO1z3BOcg", thumb:"ibnta.webp"},
      // {type:"video",url:"https://www.youtube.com/embed/QzXLG6FpSh0",thumb:".webp"},    
      

{type:"video",url:"https://www.youtube.com/embed/nEGVw70Lkis",thumb:"jaggi.webp"},
      {type:"video",url:"https://www.youtube.com/embed/3ioY4o-LJ4g",thumb:"mc.webp"},  
      {type:"video",url:"https://www.youtube.com/embed/UuRVpBeND_U", thumb:"jaggisweets.webp"},
      {type:"video",url:"https://www.youtube.com/embed/pyZyuFjdcNg",thumb:"jaggirainyday.webp"},    
      {type:"video",url:"https://www.youtube.com/embed/ml95WNPezWI",thumb:"ptiala.webp"},      
      {type:"video",url:"https://www.youtube.com/embed/5mmXiAtO3IU",thumb:"paneer.webp"},    
      {type:"video",url:"https://www.youtube.com/embed/f86TzvA_mm4", thumb:"jaggiwedding.webp"},
      


       {type:"video",url:"https://www.youtube.com/embed/nYAJt1d3c5o",thumb:"ibanta.webp"},
      {type:"video",url:"https://www.youtube.com/embed/bsfo-w8SMMI",thumb:"gr.webp"},  
//       {type:"video",url:"https://www.youtube.com/embed/v2uIoeTJ7ho", thumb:"invite1.webp"},
//       {type:"video",url:"https://www.youtube.com/embed/qS6ln_Z3PPA",thumb:"invite2.webp"},
//       {type:"video",url:"https://www.youtube.com/embed/ZEu6TWNDZFE",thumb:"invite3.webp"},
//       {type:"video",url:"https://www.youtube.com/embed/ElMco97s7QA",thumb:"invite4.webp"},    
//       {type:"video",url:"https://www.youtube.com/embed/EUvXb7a6en8", thumb:"oasis.webp"},
//       {type:"video",url:"https://www.youtube.com/embed/JUKXs1v7Y7E",thumb:"clarion1.webp"},
//       {type:"video",url:"https://www.youtube.com/embed/t1Cb5dSz8-s",thumb:"oasis1.webp"},
//       {type:"video",url:"https://www.youtube.com/embed/zzl9yiB2qqQ",thumb:"ibnta5.webp"},
//       {type:"video",url:"https://www.youtube.com/embed/3iuLOyu6SFk",thumb:"shangz1.webp"},
//       {type:"video",url:"https://www.youtube.com/embed/wrENWvcGpLM",thumb:"wedding1.webp"},
//       {type:"video",url:"https://www.youtube.com/embed/MwY68_ujkPM",thumb:"education5.webp"},
//       {type:"video",url:"https://www.youtube.com/embed/WHcWzNiP40o",thumb:"ibnta6.webp"},
//       {type:"video",url:"https://www.youtube.com/embed/CbKtunhurCg",thumb:"oasis2.webp"},
//       {type:"video",url:"https://www.youtube.com/embed/L9a9YsVXJho",thumb:"electronic1.webp"},
//       {type:"video",url:"https://www.youtube.com/embed/v23XZlcVXvI",thumb:"electronic2.webp"}, 
]
   },

  };

export default function ProjectDetail() {
  const params = useParams();
  const slug = params?.slug;
  const project = projectDataMap[slug] || projectDataMap['animation'];
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
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.includes('v=') ? url.split('v=')[1]?.split('&')[0] : url.split('/').pop();
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=1&modestbranding=1`;
    }
    if (url.includes("instagram.com")) {
      return `${url}embed/`;
    }
    return url;
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedAsset((prev) => (prev + 1) % project.gallery.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedAsset((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
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
          <span>{project.category}</span>
          <span>•</span>
          <span>{project.year}</span>
        </div>

        {/* Title with ScrollFloat Animation */}
          <div className="mb-8 w-fit ">
          <ScrollFloat
text={project.title}
    reveal="letter"
    dashLength={4}
    dashGap={2}
    specks={10}
color={darkTheme ? "#ffffff" : "#171717"}
    accentColor={darkTheme ? "#ffffff" : "#171717"}
    letterSpacing={0.03}
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
            {project.title}
          </ScrollFloat>
        </div>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl font-light opacity-80 max-w-3xl leading-relaxed mb-16 animate-slide-up opacity-0 [animation-fill-mode:forwards] [animation-delay:300ms]">
          {project.subtitle}
        </p>

        {/* Project Meta Info Grid */}
        {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-8 border-y border-neutral-800 mb-16 animate-slide-up opacity-0 [animation-fill-mode:forwards] [animation-delay:400ms]">
          <div>
            <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Client</p>
            <p className="text-lg font-medium">{project.client}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Role / Scope</p>
            <p className="text-lg font-medium">{project.role}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Year</p>
            <p className="text-lg font-medium">{project.year}</p>
          </div>
        </div> */}

      </main>

      {/* --- GSAP Scroll Expand Cover Media Section --- */}
      {/* <div className="w-full flex justify-center overflow-hidden mb-24">
        <div
          ref={coverContainerRef}
          className="overflow-hidden shadow-2xl aspect-[16/9]"
        >
          <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
        </div>
      </div> */}

      <main className=" px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40 2xl:px-52">
        {/* Overview & Description Section */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          <div className="lg:col-span-5">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">The Challenge &amp; Solution</h2>
          </div>
          <div className="lg:col-span-7 space-y-6 text-lg font-light opacity-90 leading-relaxed">
            <p>{project.description}</p>
            <p>Every interaction was meticulously engineered to provide frictionless engagement while maintaining an unmistakable air of exclusivity and high-end agency execution.</p>
          </div>
        </div> */}

        {/* Gallery Section with Grid Layout (2 columns on large screens) and Motion Animation */}
        <div className="space-y-12 mb-24">
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {project.gallery.map((asset, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04, duration: 0.4 }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="group relative overflow-hidden rounded-[28px] cursor-pointer bg-black/20 border border-white/10 shadow-2xl aspect-[9/16]"
                onClick={() => setSelectedAsset(index)}
              >
                {asset.type === 'image' || typeof asset === 'string' ? (
                  <img
                    src={typeof asset === 'string' ? asset : asset.url}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    alt={`${project.title} gallery item ${index + 1}`}
                  />
                ) : (
                  <div className="w-full h-full relative">
                    {(asset.url.includes("youtube.com") || asset.url.includes("instagram.com")) ? (
                      asset.thumb ? (
                        <>
                          <img 
                            src={`/Images/thumbnail/${asset.thumb}`} 
                            alt="Video thumbnail" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:opacity-80"
                          />
                          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                            <div className="bg-black/70 p-4 rounded-full backdrop-blur-sm shadow-xl transition-transform duration-300 group-hover:bg-[#e1dbd732]">
                              <Play strokeWidth={2.5} className="w-8 h-8 text-white pl-1" />
                            </div>
                          </div>
                        </>
                      ) : (
                        <iframe
                          src={`${asset.url.replace("watch?v=", "embed/")}?modestbranding=1&rel=0&controls=0&showinfo=0`}
                          className="w-full h-full pointer-events-none"
                          tabIndex="-1"
                          title="Video preview"
                        />
                      )
                    ) : (
                      <video
                        src={asset.url}
                        className="w-full h-full object-cover transition-transform duration-700"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Lightbox / Fullscreen Modal Preview */}
        <AnimatePresence>
          {selectedAsset !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[9999] w-full h-screen flex items-center justify-center bg-black/95 backdrop-xl"
            >
              <button 
                className="absolute top-6 right-6 md:top-10 md:right-10 text-white/60 hover:text-white z-50 bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110"
                onClick={() => setSelectedAsset(null)}
              >
                <X size={32} strokeWidth={2} />
              </button>

              <button 
                className="absolute top-1/2 right-6 md:right-10 text-white/60 hover:text-white z-50 bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110"
                onClick={handleNext}
              >
                <StepForward size={25} strokeWidth={2} />
              </button>

              <button 
                className="absolute top-1/2 left-6 md:left-10 text-white/60 hover:text-white z-50 bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110"
                onClick={handlePrev}
              >
                <StepBack size={25} strokeWidth={2} />
              </button>

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full h-full max-w-7xl max-h-screen p-4 md:p-12 flex justify-center items-center"
                onClick={(e) => e.stopPropagation()} 
              >
                {typeof project.gallery[selectedAsset] === 'string' || project.gallery[selectedAsset].type === 'image' ? (
                  <img
                    src={typeof project.gallery[selectedAsset] === 'string' ? project.gallery[selectedAsset] : project.gallery[selectedAsset].url}
                    className="w-full h-full object-contain"
                    alt="Full screen content"
                  />
                ) : (
                  <div className="h-screen flex justify-center items-center bg-black rounded-lg overflow-hidden shadow-2xl">
                    {(project.gallery[selectedAsset].url.includes("youtube.com") || project.gallery[selectedAsset].url.includes("instagram.com")) ? (
                      <iframe
                        src={getModalVideoUrl(project.gallery[selectedAsset].url)}
                        className="w-full h-full aspect-square"
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        src={project.gallery[selectedAsset].url}
                        controls
                        autoPlay
                        loop
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                )}
              </motion.div>
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


<Footer/>
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
