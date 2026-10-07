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
 
  'bni': {
    title: 'BNI',
    subtitle: 'Global convention campaign graphics, stage design, and digital rollout.',
    category: 'Global Convention Campaign',
    client: 'BNI Enterprise',
    year: '2025',
    role: 'Brand Strategy & Multimedia',
    description: 'A massive visual identity system built for international audiences. We coordinated live stage graphics, motion packages, and print collateral that united over 10,000 global business leaders through high-impact visual storytelling.',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80',
    videos: [
      
      {
        type: "video",
        url: "https://youtube.com/shorts/sQB8aZIg2_k?si=4C7Ix-Q94MM_OUMf",
        thumb: "/Images/thumbnail/paaji1.webp",
        landscape: false,
      },
      {
        type: "video",
        url: "https://www.youtube.com/embed/H68ev8JVrIg",
        thumb: "/Images/thumbnail/bni1.webp",
        landscape: false,
      },
      
      {
        type: "video",
        url: "https://youtube.com/shorts/Ajr12pMU3II",
        thumb: "/Images/thumbnail/bni4.webp",
        landscape: false,
      },
     
      {
        type: "video",
        url: "https://youtube.com/shorts/CCA0UDawy2Q",
        thumb: "/Images/thumbnail/bni6.webp",
        landscape: false,
      },
      {
        type: "video",
        url: "https://www.youtube.com/embed/nMmyBwJs9a8",
        thumb: "/Images/thumbnail/bni3.webp",
        landscape: false,
      },
      {
        type: "video",
        url: "https://www.youtube.com/embed/r9KkepYxLPg",
        thumb: "/Images/thumbnail/bni7.webp",
        landscape: false,
      },
      {
        type: "video",
        url: "https://www.youtube.com/embed/Oogjo4gj3Xo",
        thumb: "/Images/thumbnail/bni8.webp",
        landscape: false,
      },
      {
        type: "video",
        url: "https://www.youtube.com/embed/e-H1nrWi710",
        thumb: "/Images/thumbnail/bni9.webp",
        landscape: false,
      },
      {
        type: "video",
        url: "https://www.youtube.com/embed/xQ7eOpuH02w",
        thumb: "/Images/thumbnail/bni10.webp",
        landscape: false,
      },
      {
        type: "video",
        url: "https://www.youtube.com/embed/qYwBFXYXLKA",
        thumb: "/Images/thumbnail/bni11.webp",
        landscape: false,
      },
      {
        type: "video",
        url: "https://www.youtube.com/embed/cv0Lb95nYIg",
        thumb: "/Images/thumbnail/bni12.webp",
        landscape: false,
      },
      {
        type: "video",
        url: "https://www.youtube.com/embed/JJayr0Z-KKc",
        thumb: "/Images/thumbnail/bni13.webp",
        landscape: false,
      },
      {
        type: "video",
        url: "https://www.youtube.com/embed/2dulYQaU1d0",
        thumb: "/Images/thumbnail/bni14.webp",
        landscape: false,
      },
      {
        type: "video",
        url: "https://www.youtube.com/embed/kJnkWgwdfXY",
        thumb: "/Images/thumbnail/bni15.webp",
        landscape: false,
      },
      {
        type: "video",
        url: "https://www.youtube.com/embed/49zZv33bH9Q",
        thumb: "/Images/thumbnail/bni16.webp",
        landscape: false,
      },
      {
        type: "video",
        url: "https://youtube.com/shorts/VvcVufOBtTE",
        thumb: "/Images/thumbnail/bni17.webp",
        landscape: false,
      },
       {
        type: "video",
        url: "https://www.youtube.com/embed/nMmyBwJs9a8",
        thumb: "/Images/thumbnail/bni1.webp",
        landscape: false,
      },
      {
        type: "video",
        url: "https://youtube.com/shorts/ANZCAujvJNE",
        thumb: "/Images/thumbnail/bni2.webp",
        landscape: false,
      },
      {
        type: "video",
        url: "https://youtube.com/shorts/jcHNyBL-aAE",
        thumb: "/Images/thumbnail/bni5.webp",
        landscape: false,
      },
      {
        type: "video",
        url: "https://youtube.com/shorts/nlW0WLhuJW8?si=4C7Ix-Q94MM_OUMf",
        thumb: "/Images/thumbnail/baadme1.webp",
        landscape: false,
      },
    ],
    graphics: [
      "/Images/portfolio/BNI/b7.webp",
      "/Images/portfolio/BNI/b8.webp",
      "/Images/portfolio/BNI/b9.webp",
      "/Images/portfolio/BNI/b10.webp",
      "/Images/portfolio/BNI/b11.webp",
      "/Images/portfolio/BNI/b1.webp",
      "/Images/portfolio/BNI/b2.webp",
      "/Images/portfolio/BNI/b3.webp",
      "/Images/portfolio/BNI/b4.webp",
      "/Images/portfolio/BNI/b5.webp",
      "/Images/portfolio/BNI/b6.webp",
      "/Images/portfolio/BNI/b12.webp",
      "/Images/portfolio/BNI/b13.webp",
    ]
  }
};

export default function ProjectDetail() {
  const params = useParams();
  const slug = params?.slug;
  const project = projectDataMap[slug] || projectDataMap['bni'];
  
  const [darkTheme, setDarkTheme] = useState(true);
  const [activeTab, setActiveTab] = useState('videos'); // 'videos' or 'graphics'
  const [selectedAsset, setSelectedAsset] = useState(null);

  const coverContainerRef = useRef(null);

  // Active gallery list depending on selected tab
  const currentGallery = activeTab === 'videos' ? (project.videos || []) : (project.graphics || []);

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
    if (!url) return "";
    if (url.includes("youtube.com/shorts/")) {
      const videoId = url.split("shorts/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=1&modestbranding=1`;
    }
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.includes('v=') ? url.split('v=')[1]?.split('&')[0] : url.split('/').pop().split('?')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=1&modestbranding=1`;
    }
    return url;
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedAsset((prev) => (prev + 1) % currentGallery.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedAsset((prev) => (prev - 1 + currentGallery.length) % currentGallery.length);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkTheme ? 'bg-black text-white' : 'bg-white text-neutral-900'}`}>
      
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
      <main className="max-w-6xl mx-auto px-6 sm:px-12 py-16 lg:py-24">
        
        {/* Category & Year */}
        <div className="flex items-center space-x-4 text-sm uppercase tracking-widest opacity-60 mb-6 animate-slide-up opacity-0 [animation-fill-mode:forwards] [animation-delay:100ms]">
          <span>{project.category}</span>
          <span>•</span>
          <span>{project.year}</span>
        </div>

        {/* Title with ScrollFloat Animation */}
        <div className="mb-8">
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="top 90%"
            scrollEnd="bottom 40%"
            stagger={0.03}
            textClassName={`text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight ${darkTheme ? 'text-white' : 'text-neutral-900'}`}
          >
            {project.title}
          </ScrollFloat>
        </div>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl font-light opacity-80 max-w-3xl leading-relaxed mb-16 animate-slide-up opacity-0 [animation-fill-mode:forwards] [animation-delay:300ms]">
          {project.subtitle}
        </p>

        {/* Project Meta Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-8 border-y border-neutral-800 mb-16 animate-slide-up opacity-0 [animation-fill-mode:forwards] [animation-delay:400ms]">
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
        </div>

      </main>

      {/* --- GSAP Scroll Expand Cover Media Section --- */}
      <div className="w-full flex justify-center overflow-hidden mb-24">
        <div
          ref={coverContainerRef}
          className="overflow-hidden shadow-2xl aspect-[16/9]"
        >
          <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
        </div>
      </div>

      <main className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40 2xl:px-52">
        {/* Overview & Description Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-5">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">The Challenge &amp; Solution</h2>
          </div>
          <div className="lg:col-span-7 space-y-6 text-lg font-light opacity-90 leading-relaxed">
            <p>{project.description}</p>
            <p>Every interaction was meticulously engineered to provide frictionless engagement while maintaining an unmistakable air of exclusivity and high-end global execution.</p>
          </div>
        </div>

        {/* --- Tab Navigation System --- */}
        <div className="flex items-center justify-end space-x-4 mb-16 border-b border-neutral-800 pb-6">
          <button
            onClick={() => { setActiveTab('videos'); setSelectedAsset(null); }}
            className={`px-8 py-3 rounded-full text-sm font-medium tracking-wider uppercase transition-all duration-300 ${
              activeTab === 'videos'
                ? (darkTheme ? 'bg-white text-black shadow-lg' : 'bg-neutral-900 text-white shadow-lg')
                : (darkTheme ? 'bg-neutral-900/60 text-white/60 hover:text-white' : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900')
            }`}
          >
            Videos ({project.videos?.length || 0})
          </button>
          
          <button
            onClick={() => { setActiveTab('graphics'); setSelectedAsset(null); }}
            className={`px-8 py-3 rounded-full text-sm font-medium tracking-wider uppercase transition-all duration-300 ${
              activeTab === 'graphics'
                ? (darkTheme ? 'bg-white text-black shadow-lg' : 'bg-neutral-900 text-white shadow-lg')
                : (darkTheme ? 'bg-neutral-900/60 text-white/60 hover:text-white' : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900')
            }`}
          >
            Graphics ({project.graphics?.length || 0})
          </button>
        </div>

        {/* Gallery Section with Grid Layout & Motion Animation */}
        <div className="space-y-12 mb-24">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start"
          >
            {currentGallery.map((asset, index) => {
              const isVideo = typeof asset === 'object' && asset.type === 'video';
              const aspectRatioClass = isVideo 
                ? (asset.landscape ? 'aspect-video' : 'aspect-[9/16]') 
                : 'aspect-auto';

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.4 }}
                  whileHover={{ y: -5, scale: 1.01 }}
                  className={`group relative overflow-hidden rounded-[28px] cursor-pointer bg-black/20 border border-white/10 shadow-2xl ${aspectRatioClass} flex items-center justify-center`}
                  onClick={() => setSelectedAsset(index)}
                >
                  {!isVideo ? (
                    <img
                      src={typeof asset === 'string' ? asset : asset.url}
                      className="w-full h-auto object-contain max-h-[600px] group-hover:scale-105 transition-transform duration-700"
                      alt={`${project.title} graphic item ${index + 1}`}
                    />
                  ) : (
                    <div className="w-full h-full relative">
                      {asset.thumb ? (
                        <>
                          <img 
                            src={asset.thumb} 
                            alt="Video thumbnail" 
                            className="w-full h-full object-contain transition-transform duration-700 group-hover:opacity-80"
                          />
                          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                            <div className="bg-black/70 p-4 rounded-full backdrop-blur-sm shadow-xl transition-transform duration-300 group-hover:scale-110">
                              <Play strokeWidth={2.5} className="w-8 h-8 text-white pl-1" />
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
                          <Play className="w-12 h-12 text-white/70" />
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
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
                className="relative w-full h-full max-w-5xl max-h-[90vh] p-4 md:p-12 flex justify-center items-center"
                onClick={(e) => e.stopPropagation()} 
              >
                {typeof currentGallery[selectedAsset] === 'string' || currentGallery[selectedAsset].type !== 'video' ? (
                  <img
                    src={typeof currentGallery[selectedAsset] === 'string' ? currentGallery[selectedAsset] : currentGallery[selectedAsset].url}
                    className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                    alt="Full screen content"
                  />
                ) : (
                  <div className={`w-full flex justify-center items-center rounded-2xl overflow-hidden shadow-2xl bg-black ${currentGallery[selectedAsset].landscape ? 'aspect-video max-w-4xl' : 'aspect-[9/16] max-h-[85vh]'}`}>
                    <iframe
                      src={getModalVideoUrl(currentGallery[selectedAsset].url)}
                      className="w-full h-full border-0"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                    />
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