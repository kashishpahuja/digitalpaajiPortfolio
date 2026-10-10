'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollFloat from '@/components/ScrollFloat';
import Footer from '@/components/Footer';

// Register ScrollTrigger outside the component
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- Static Database Mapping ---
const projectDataMap = {
  'product-shoot': {
    title: 'Product Shoot',
    subtitle: 'Meticulous commercial photography, food staging, and luxury jewelry visualization.',
    category: 'Commercial Direction',
    client: 'Multiple Global Brands',
    year: '2026',
    role: 'Art Direction & Photography',
    description: 'A comprehensive showcase exploring texture, form, lighting, and detail across culinary arts and fine jewelry collections.',
    coverImage: '/Images/product.webp',
    categories: [
      {
        name: 'All',
        items: [
          // Food Items
          { src: "/Images/portfolio/Food/1.webp", alt: "Food Item 1", title: "Gourmet Dish 1", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/2.webp", alt: "Food Item 2", title: "Gourmet Dish 2", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/3.webp", alt: "Food Item 3", title: "Gourmet Dish 3", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/4.webp", alt: "Food Item 4", title: "Gourmet Dish 4", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/5.webp", alt: "Food Item 5", title: "Gourmet Dish 5", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/6.webp", alt: "Food Item 6", title: "Gourmet Dish 6", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/7.webp", alt: "Food Item 7", title: "Gourmet Dish 7", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/8.webp", alt: "Food Item 8", title: "Gourmet Dish 8", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/9.webp", alt: "Food Item 9", title: "Gourmet Dish 9", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/10.webp", alt: "Food Item 10", title: "Gourmet Dish 10", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/11.webp", alt: "Food Item 11", title: "Gourmet Dish 11", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/12.webp", alt: "Food Item 12", title: "Gourmet Dish 12", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/13.webp", alt: "Food Item 13", title: "Gourmet Dish 13", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/14.webp", alt: "Food Item 14", title: "Gourmet Dish 14", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/15.webp", alt: "Food Item 15", title: "Gourmet Dish 15", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/16.webp", alt: "Food Item 16", title: "Gourmet Dish 16", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/17.webp", alt: "Food Item 17", title: "Gourmet Dish 17", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/18.webp", alt: "Food Item 18", title: "Gourmet Dish 18", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/19.webp", alt: "Food Item 19", title: "Gourmet Dish 19", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/20.webp", alt: "Food Item 20", title: "Gourmet Dish 20", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/21.webp", alt: "Food Item 21", title: "Gourmet Dish 21", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/22.webp", alt: "Food Item 22", title: "Gourmet Dish 22", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/23.webp", alt: "Food Item 23", title: "Gourmet Dish 23", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/24.webp", alt: "Food Item 24", title: "Gourmet Dish 24", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/25.webp", alt: "Food Item 25", title: "Gourmet Dish 25", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/26.webp", alt: "Food Item 26", title: "Gourmet Dish 26", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/27.webp", alt: "Food Item 27", title: "Gourmet Dish 27", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/28.webp", alt: "Food Item 28", title: "Gourmet Dish 28", subtitle: "Food Styling" },

          // Jewellery Items
          { src: "/Images/portfolio/Jewellery/1.webp", alt: "Jewellery 1", title: "Fine Jewelry 1", subtitle: "Luxury Collection" },
          { src: "/Images/portfolio/Jewellery/2.webp", alt: "Jewellery 2", title: "Fine Jewelry 2", subtitle: "Luxury Collection" },
          { src: "/Images/portfolio/Jewellery/3.webp", alt: "Jewellery 3", title: "Fine Jewelry 3", subtitle: "Luxury Collection" },
          { src: "/Images/portfolio/Jewellery/4.webp", alt: "Jewellery 4", title: "Fine Jewelry 4", subtitle: "Luxury Collection" },
          { src: "/Images/portfolio/Jewellery/5.webp", alt: "Jewellery 5", title: "Fine Jewelry 5", subtitle: "Luxury Collection" },
          { src: "/Images/portfolio/Jewellery/6.webp", alt: "Jewellery 6", title: "Fine Jewelry 6", subtitle: "Luxury Collection" },
          { src: "/Images/portfolio/Jewellery/7.webp", alt: "Jewellery 7", title: "Fine Jewelry 7", subtitle: "Luxury Collection" },
          { src: "/Images/portfolio/Jewellery/8.webp", alt: "Jewellery 8", title: "Fine Jewelry 8", subtitle: "Luxury Collection" },
          { src: "/Images/portfolio/Jewellery/9.webp", alt: "Jewellery 9", title: "Fine Jewelry 9", subtitle: "Luxury Collection" },
          { src: "/Images/portfolio/Jewellery/10.webp", alt: "Jewellery 10", title: "Fine Jewelry 10", subtitle: "Luxury Collection" },
          { src: "/Images/portfolio/Jewellery/11.webp", alt: "Jewellery 11", title: "Fine Jewelry 11", subtitle: "Luxury Collection" },
          { src: "/Images/portfolio/Jewellery/12.webp", alt: "Jewellery 12", title: "Fine Jewelry 12", subtitle: "Luxury Collection" },
          { src: "/Images/portfolio/Jewellery/13.webp", alt: "Jewellery 13", title: "Fine Jewelry 13", subtitle: "Luxury Collection" },
          { src: "/Images/portfolio/Jewellery/14.webp", alt: "Jewellery 14", title: "Fine Jewelry 14", subtitle: "Luxury Collection" },
          { src: "/Images/portfolio/Jewellery/15.webp", alt: "Jewellery 15", title: "Fine Jewelry 15", subtitle: "Luxury Collection" },
          { src: "/Images/portfolio/graphic/product/product5.webp", alt: "Product Shoot 5", title: "Product Item 5", subtitle: "Studio Shot" },
          { src: "/Images/portfolio/graphic/product/product4.webp", alt: "Product Shoot 4", title: "Product Item 4", subtitle: "Studio Shot" },
          { src: "/Images/portfolio/graphic/product/product6.webp", alt: "Product Shoot 6", title: "Product Item 6", subtitle: "Studio Shot" },
          { src: "/Images/portfolio/graphic/product/j1.webp", alt: "Jewellery Product j1", title: "Designer Piece J1", subtitle: "Gold & Gems" },
          { src: "/Images/portfolio/graphic/product/j3.webp", alt: "Jewellery Product j3", title: "Designer Piece J3", subtitle: "Gold & Gems" },
          { src: "/Images/portfolio/graphic/product/j7.webp", alt: "Jewellery Product j7", title: "Designer Piece J7", subtitle: "Gold & Gems" },
          { src: "/Images/portfolio/graphic/product/j4.webp", alt: "Jewellery Product j4", title: "Designer Piece J4", subtitle: "Gold & Gems" },
          { src: "/Images/portfolio/graphic/product/j8.webp", alt: "Jewellery Product j8", title: "Designer Piece J8", subtitle: "Gold & Gems" },
          { src: "/Images/portfolio/graphic/product/j5.webp", alt: "Jewellery Product j5", title: "Designer Piece J5", subtitle: "Gold & Gems" }
        ]
      },
      {
        name: 'Food',
        items: [
          { src: "/Images/portfolio/Food/1.webp", alt: "Food Item 1", title: "Gourmet Dish 1", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/2.webp", alt: "Food Item 2", title: "Gourmet Dish 2", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/3.webp", alt: "Food Item 3", title: "Gourmet Dish 3", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/4.webp", alt: "Food Item 4", title: "Gourmet Dish 4", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/5.webp", alt: "Food Item 5", title: "Gourmet Dish 5", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/6.webp", alt: "Food Item 6", title: "Gourmet Dish 6", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/7.webp", alt: "Food Item 7", title: "Gourmet Dish 7", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/8.webp", alt: "Food Item 8", title: "Gourmet Dish 8", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/9.webp", alt: "Food Item 9", title: "Gourmet Dish 9", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/10.webp", alt: "Food Item 10", title: "Gourmet Dish 10", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/11.webp", alt: "Food Item 11", title: "Gourmet Dish 11", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/12.webp", alt: "Food Item 12", title: "Gourmet Dish 12", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/13.webp", alt: "Food Item 13", title: "Gourmet Dish 13", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/14.webp", alt: "Food Item 14", title: "Gourmet Dish 14", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/15.webp", alt: "Food Item 15", title: "Gourmet Dish 15", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/16.webp", alt: "Food Item 16", title: "Gourmet Dish 16", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/17.webp", alt: "Food Item 17", title: "Gourmet Dish 17", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/18.webp", alt: "Food Item 18", title: "Gourmet Dish 18", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/19.webp", alt: "Food Item 19", title: "Gourmet Dish 19", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/20.webp", alt: "Food Item 20", title: "Gourmet Dish 20", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/21.webp", alt: "Food Item 21", title: "Gourmet Dish 21", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/22.webp", alt: "Food Item 22", title: "Gourmet Dish 22", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/23.webp", alt: "Food Item 23", title: "Gourmet Dish 23", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/24.webp", alt: "Food Item 24", title: "Gourmet Dish 24", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/25.webp", alt: "Food Item 25", title: "Gourmet Dish 25", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/26.webp", alt: "Food Item 26", title: "Gourmet Dish 26", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/27.webp", alt: "Food Item 27", title: "Gourmet Dish 27", subtitle: "Food Styling" },
          { src: "/Images/portfolio/Food/28.webp", alt: "Food Item 28", title: "Gourmet Dish 28", subtitle: "Food Styling" }
        ]
      },
      {
        name: 'Jewellery',
        items: [
          { src: "/Images/portfolio/Jewellery/1.webp", alt: "Jewellery 1", title: "Fine Jewelry 1", subtitle: "Luxury Collection" },
          { src: "/Images/portfolio/Jewellery/2.webp", alt: "Jewellery 2", title: "Fine Jewelry 2", subtitle: "Luxury Collection" },
          { src: "/Images/portfolio/Jewellery/3.webp", alt: "Jewellery 3", title: "Fine Jewelry 3", subtitle: "Luxury Collection" },
          { src: "/Images/portfolio/Jewellery/4.webp", alt: "Jewellery 4", title: "Fine Jewelry 4", subtitle: "Luxury Collection" },
          { src: "/Images/portfolio/Jewellery/5.webp", alt: "Jewellery 5", title: "Fine Jewelry 5", subtitle: "Luxury Collection" },
          { src: "/Images/portfolio/Jewellery/6.webp", alt: "Jewellery 6", title: "Fine Jewelry 6", subtitle: "Luxury Collection" },
          { src: "/Images/portfolio/Jewellery/7.webp", alt: "Jewellery 7", title: "Fine Jewelry 7", subtitle: "Luxury Collection" },
          { src: "/Images/portfolio/Jewellery/8.webp", alt: "Jewellery 8", title: "Fine Jewelry 8", subtitle: "Luxury Collection" },
          { src: "/Images/portfolio/Jewellery/9.webp", alt: "Jewellery 9", title: "Fine Jewelry 9", subtitle: "Luxury Collection" },
          { src: "/Images/portfolio/Jewellery/10.webp", alt: "Jewellery 10", title: "Fine Jewelry 10", subtitle: "Luxury Collection" },
          { src: "/Images/portfolio/Jewellery/11.webp", alt: "Jewellery 11", title: "Fine Jewelry 11", subtitle: "Luxury Collection" },
          { src: "/Images/portfolio/Jewellery/12.webp", alt: "Jewellery 12", title: "Fine Jewelry 12", subtitle: "Luxury Collection" },
          { src: "/Images/portfolio/Jewellery/13.webp", alt: "Jewellery 13", title: "Fine Jewelry 13", subtitle: "Luxury Collection" },
          { src: "/Images/portfolio/Jewellery/14.webp", alt: "Jewellery 14", title: "Fine Jewelry 14", subtitle: "Luxury Collection" },
          { src: "/Images/portfolio/Jewellery/15.webp", alt: "Jewellery 15", title: "Fine Jewelry 15", subtitle: "Luxury Collection" },
          { src: "/Images/portfolio/graphic/product/product5.webp", alt: "Product Shoot 5", title: "Product Item 5", subtitle: "Studio Shot" },
          { src: "/Images/portfolio/graphic/product/product4.webp", alt: "Product Shoot 4", title: "Product Item 4", subtitle: "Studio Shot" },
          { src: "/Images/portfolio/graphic/product/product6.webp", alt: "Product Shoot 6", title: "Product Item 6", subtitle: "Studio Shot" },
          { src: "/Images/portfolio/graphic/product/j1.webp", alt: "Jewellery Product j1", title: "Designer Piece J1", subtitle: "Gold & Gems" },
          { src: "/Images/portfolio/graphic/product/j3.webp", alt: "Jewellery Product j3", title: "Designer Piece J3", subtitle: "Gold & Gems" },
          { src: "/Images/portfolio/graphic/product/j7.webp", alt: "Jewellery Product j7", title: "Designer Piece J7", subtitle: "Gold & Gems" },
          { src: "/Images/portfolio/graphic/product/j4.webp", alt: "Jewellery Product j4", title: "Designer Piece J4", subtitle: "Gold & Gems" },
          { src: "/Images/portfolio/graphic/product/j8.webp", alt: "Jewellery Product j8", title: "Designer Piece J8", subtitle: "Gold & Gems" },
          { src: "/Images/portfolio/graphic/product/j5.webp", alt: "Jewellery Product j5", title: "Designer Piece J5", subtitle: "Gold & Gems" }
        ]
      }
    ],
    gallery: [
      { thumb: "/Images/work/1.gif", full: "/Images/portfolio/Food/1.webp", type: "image", title: "Food Art Direction 1" },
      { thumb: "/Images/work/ds2.jpeg", full: "/Images/portfolio/Jewellery/1.webp", type: "image", title: "Jewellery Showcase 1" }
    ]
  }
};

export default function ProjectDetail() {
  const params = useParams();
  const slug = params?.slug;
  const project = projectDataMap[slug] || projectDataMap['product-shoot'];
  const [darkTheme, setDarkTheme] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const coverContainerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        coverContainerRef.current,
        { width: "60%", scale: 0.9, borderRadius: "48px", opacity: 0.5 },
        {
          width: "100%", scale: 1, borderRadius: "0px", opacity: 1,
          scrollTrigger: { trigger: coverContainerRef.current, start: "top 85%", end: "top 15%", scrub: 1 }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  // Get active items based on selected category tab
  const displayedItems = useMemo(() => {
    if (!project?.categories) return project?.gallery || [];
    const cat = project.categories.find(c => c.name === activeCategory);
    return cat ? cat.items : project.categories[0].items;
  }, [project, activeCategory]);

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
      <main className="max-w-6xl mx-auto px-6 sm:px-12 py-16 lg:py-24">
        <div className="flex items-center space-x-4 text-sm uppercase tracking-widest opacity-60 mb-6">
          <span>{project?.category}</span>
          <span>•</span>
          <span>{project?.year}</span>
        </div>

        <div className="mb-8">
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="top 90%"
            scrollEnd="bottom 40%"
            stagger={0.03}
            textClassName={`text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight ${darkTheme ? 'text-white' : 'text-neutral-900'}`}
          >
            {project?.title}
          </ScrollFloat>
        </div>

        <p className="text-xl sm:text-2xl font-light opacity-80 max-w-3xl leading-relaxed mb-16">
          {project?.subtitle}
        </p>

        {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-8 border-y border-neutral-800 mb-16">
          <div>
            <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Client</p>
            <p className="text-lg font-medium">{project?.client}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Role / Scope</p>
            <p className="text-lg font-medium">{project?.role}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Year</p>
            <p className="text-lg font-medium">{project?.year}</p>
          </div>
        </div> */}
      </main>

      {/* Cover Image Section */}
      <div className="w-full flex justify-center overflow-hidden mb-24">
        <div ref={coverContainerRef} className="overflow-hidden shadow-2xl aspect-[16/9]">
          <img src={project?.coverImage} alt={project?.title} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Description & Details */}
      <main className="max-w-6xl mx-auto px-6 sm:px-12 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <h3 className="text-sm uppercase tracking-widest opacity-60 mb-4">Project Overview</h3>
            <p className="text-lg font-light leading-relaxed opacity-80">{project?.description}</p>
          </div>
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 border border-neutral-800 rounded-2xl bg-neutral-900/40">
              <h4 className="text-sm uppercase tracking-widest opacity-60 mb-2">Deliverables</h4>
              <p className="text-base font-medium opacity-90">Commercial photography sets, lighting setups, high-resolution branding assets & digital touchpoints.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Category Tabs & 4-Column Creative Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 mb-32">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 pb-6 border-b border-neutral-800 gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">Creative Gallery</h3>
            <p className="text-sm opacity-60 mt-1">Explore visual assets and high-res deliverables</p>
          </div>

          {/* Category Filter Tabs */}
          {project?.categories && (
            <div className="flex flex-wrap gap-2">
              {project.categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                    activeCategory === cat.name
                      ? (darkTheme ? 'bg-white text-black' : 'bg-neutral-900 text-white')
                      : (darkTheme ? 'bg-neutral-900 text-neutral-400 hover:text-white' : 'bg-neutral-100 text-neutral-600 hover:text-black')
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => setSelectedImage(item)}
              className="group relative h-[380px] rounded-2xl overflow-hidden cursor-pointer bg-neutral-900 border border-neutral-800"
            >
              <img
                src={item.src}
                alt={item.alt || item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />
              {/* <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300">
                <p className="text-xs uppercase tracking-widest text-neutral-400 mb-1">{item.subtitle || 'Visual Asset'}</p>
                <h4 className="text-lg font-semibold text-white tracking-tight">{item.title}</h4>
              </div> */}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal for Graphic Picture */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="relative w-full h-[65vh] bg-black">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt || selectedImage.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* <div className="p-6 sm:p-8 flex items-center justify-between bg-neutral-900 border-t border-neutral-800">
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-400 mb-1">{selectedImage.subtitle || 'High-Resolution Graphic'}</p>
                  <h3 className="text-2xl font-bold text-white tracking-tight">{selectedImage.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="px-6 py-2.5 rounded-full bg-white text-black font-medium text-sm hover:opacity-90 transition-opacity"
                >
                  Close Viewer
                </button>
              </div> */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}


// 'use client';
// import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
// import Link from 'next/link';
// import { useParams } from 'next/navigation';
// import { useGesture } from '@use-gesture/react';
// import { motion, AnimatePresence } from 'framer-motion';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import ScrollFloat from '@/components/ScrollFloat';
// import Footer from '@/components/Footer';

// // Register ScrollTrigger outside the component
// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// // --- Static Database Mapping ---
// const projectDataMap = {
//   'product-shoot': {
//     title: 'Product Shoot',
//     subtitle: 'Minimalist commercial photography and cinematic lighting for luxury items.',
//     category: 'Commercial Direction',
//     client: 'Aura Lifestyle',
//     year: '2025',
//     role: 'Art Direction & Cinematography',
//     description: 'A meticulous exploration of texture, form, and shadow. Using hard architectural lighting and organic props, we crafted a high-end visual identity that elevates everyday physical goods.',
//     coverImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1600&q=80',
//     categories: [
//       {
//         name: 'All',
//         items: [
//           { src: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1400&q=80", alt: "Gallery 1", title: "Item 1" },
//           { src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=80", alt: "Gallery 2", title: "Item 2" },
//           { src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=900&q=80", alt: 'Restaurant Interior', title: 'Restaurant', subtitle: 'Interior' },
//           { src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=80", alt: 'Gold Necklace', title: 'Jewellery', subtitle: 'Collection' },
//           { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80", alt: 'Club Vibe', title: 'Clubs', subtitle: 'Nightlife' },
//           { src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=900&q=80", alt: 'YouTube Thumbnail', title: 'YT Thumbnails', subtitle: 'Design' },
//           { src: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&q=80", alt: 'Visiting Card', title: 'Visiting Cards', subtitle: 'Branding' },
//           { src: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=80", alt: 'Packaging Box', title: 'Packaging Designs', subtitle: 'Commercial' },
//           { src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&q=80", alt: 'Logo & Brochure', title: 'Logo/Brochure/Catalogue', subtitle: 'Corporate' }
//         ]
//       },
//       {
//         name: 'Jewellery',
//         items: [
//           { src: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=80', alt: 'Gold Necklace', title: 'Aurelia', subtitle: 'Fine Jewelry' },
//           { src: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=80', alt: 'Diamond Ring', title: 'Solitaire', subtitle: 'Rings' },
//           { src: 'https://images.unsplash.com/photo-1611591475871-2ee8ab22209d?w=900&q=80', alt: 'Gold Earrings', title: 'Cascades', subtitle: 'Earrings' },
//           { src: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&q=80', alt: 'Luxury Bracelet', title: 'Bangle', subtitle: 'Accessories' }
//         ]
//       },
//       {
//         name: 'Clubs',
//         items: [
//           { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80', alt: 'Lounge Seating', title: 'Lounge Vibe', subtitle: 'Atmosphere' },
//           { src: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=900&q=80', alt: 'Bar Counter', title: 'Nightclub Bar', subtitle: 'Lighting' },
//           { src: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=900&q=80', alt: 'DJ Floor', title: 'Dance Floor', subtitle: 'Energy' }
//         ]
//       }
//     ],
//     gallery: [
//       { src: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1400&q=80", alt: "Gallery 1", title: "Item 1" }
//     ]
//   }
// };

// const DEFAULTS = {
//   maxVerticalRotationDeg: 5,
//   dragSensitivity: 20,
//   enlargeTransitionMs: 300,
//   segments: 35
// };

// const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
// const normalizeAngle = d => ((d % 360) + 360) % 360;
// const wrapAngleSigned = deg => {
//   const a = (((deg + 180) % 360) + 360) % 360;
//   return a - 180;
// };
// const getDataNumber = (el, name, fallback) => {
//   const attr = el.dataset[name] ?? el.getAttribute(`data-${name}`);
//   const n = attr == null ? NaN : parseFloat(attr);
//   return Number.isFinite(n) ? n : fallback;
// };

// function buildItems(pool, seg) {
//   const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
//   const evenYs = [-4, -2, 0, 2, 4];
//   const oddYs = [-3, -1, 1, 3, 5];

//   const coords = xCols.flatMap((x, c) => {
//     const ys = c % 2 === 0 ? evenYs : oddYs;
//     return ys.map(y => ({ x, y, sizeX: 2, sizeY: 2 }));
//   });

//   const totalSlots = coords.length;
//   if (pool.length === 0) {
//     return coords.map(c => ({ ...c, src: '', alt: '' }));
//   }

//   const normalizedImages = pool.map(image => {
//     if (typeof image === 'string') {
//       return { src: image, alt: '' };
//     }
//     return { src: image.src || image.url || '', alt: image.alt || '' };
//   });

//   const usedImages = Array.from({ length: totalSlots }, (_, i) => normalizedImages[i % normalizedImages.length]);

//   return coords.map((c, i) => ({
//     ...c,
//     src: usedImages[i].src,
//     alt: usedImages[i].alt
//   }));
// }

// function computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments) {
//   const unit = 360 / segments / 2;
//   const rotateY = unit * (offsetX + (sizeX - 1) / 2);
//   const rotateX = unit * (offsetY - (sizeY - 1) / 2);
//   return { rotateX, rotateY };
// }

// // --- DomeGallery Component ---
// function DomeGallery({
//   images = [],
//   fit = 0.5,
//   fitBasis = 'auto',
//   minRadius = 600,
//   maxRadius = Infinity,
//   padFactor = 0.25,
//   overlayBlurColor = '#120F17',
//   maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
//   dragSensitivity = DEFAULTS.dragSensitivity,
//   enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,
//   segments = DEFAULTS.segments,
//   dragDampening = 2,
//   openedImageWidth = '400px',
//   openedImageHeight = '400px',
//   imageBorderRadius = '30px',
//   openedImageBorderRadius = '30px',
//   grayscale = false
// }) {
//   const rootRef = useRef(null);
//   const mainRef = useRef(null);
//   const sphereRef = useRef(null);
//   const frameRef = useRef(null);
//   const viewerRef = useRef(null);
//   const scrimRef = useRef(null);
//   const focusedElRef = useRef(null);
//   const originalTilePositionRef = useRef(null);

//   const rotationRef = useRef({ x: 0, y: 0 });
//   const startRotRef = useRef({ x: 0, y: 0 });
//   const startPosRef = useRef(null);
//   const draggingRef = useRef(false);
//   const movedRef = useRef(false);
//   const inertiaRAF = useRef(null);
//   const openingRef = useRef(false);
//   const openStartedAtRef = useRef(0);
//   const lastDragEndAt = useRef(0);

//   const scrollLockedRef = useRef(false);
//   const lockScroll = useCallback(() => {
//     if (scrollLockedRef.current) return;
//     scrollLockedRef.current = true;
//     document.body.classList.add('dg-scroll-lock');
//   }, []);
//   const unlockScroll = useCallback(() => {
//     if (!scrollLockedRef.current) return;
//     if (rootRef.current?.getAttribute('data-enlarging') === 'true') return;
//     scrollLockedRef.current = false;
//     document.body.classList.remove('dg-scroll-lock');
//   }, []);

//   const items = useMemo(() => buildItems(images, segments), [images, segments]);

//   const applyTransform = (xDeg, yDeg) => {
//     const el = sphereRef.current;
//     if (el) {
//       el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
//     }
//   };

//   const lockedRadiusRef = useRef(null);

//   useEffect(() => {
//     const root = rootRef.current;
//     if (!root) return;
//     const ro = new ResizeObserver(entries => {
//       const cr = entries[0].contentRect;
//       const w = Math.max(1, cr.width),
//         h = Math.max(1, cr.height);
//       const minDim = Math.min(w, h),
//         maxDim = Math.max(w, h),
//         aspect = w / h;
//       let basis;
//       switch (fitBasis) {
//         case 'min': basis = minDim; break;
//         case 'max': basis = maxDim; break;
//         case 'width': basis = w; break;
//         case 'height': basis = h; break;
//         default: basis = aspect >= 1.3 ? w : minDim;
//       }
//       let radius = basis * fit;
//       const heightGuard = h * 1.35;
//       radius = Math.min(radius, heightGuard);
//       radius = clamp(radius, minRadius, maxRadius);
//       lockedRadiusRef.current = Math.round(radius);

//       const viewerPad = Math.max(8, Math.round(minDim * padFactor));
//       root.style.setProperty('--radius', `${lockedRadiusRef.current}px`);
//       root.style.setProperty('--viewer-pad', `${viewerPad}px`);
//       root.style.setProperty('--overlay-blur-color', overlayBlurColor);
//       root.style.setProperty('--tile-radius', imageBorderRadius);
//       root.style.setProperty('--enlarge-radius', openedImageBorderRadius);
//       root.style.setProperty('--image-filter', grayscale ? 'grayscale(1)' : 'none');
//       applyTransform(rotationRef.current.x, rotationRef.current.y);
//     });
//     ro.observe(root);
//     return () => ro.disconnect();
//   }, [fit, fitBasis, minRadius, maxRadius, padFactor, overlayBlurColor, grayscale, imageBorderRadius, openedImageBorderRadius]);

//   useEffect(() => {
//     applyTransform(rotationRef.current.x, rotationRef.current.y);
//   }, []);

//   const stopInertia = useCallback(() => {
//     if (inertiaRAF.current) {
//       cancelAnimationFrame(inertiaRAF.current);
//       inertiaRAF.current = null;
//     }
//   }, []);

//   const startInertia = useCallback(
//     (vx, vy) => {
//       const MAX_V = 1.4;
//       let vX = clamp(vx, -MAX_V, MAX_V) * 80;
//       let vY = clamp(vy, -MAX_V, MAX_V) * 80;
//       let frames = 0;
//       const d = clamp(dragDampening ?? 0.6, 0, 1);
//       const frictionMul = 0.94 + 0.055 * d;
//       const stopThreshold = 0.015 - 0.01 * d;
//       const maxFrames = Math.round(90 + 270 * d);
//       const step = () => {
//         vX *= frictionMul;
//         vY *= frictionMul;
//         if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
//           inertiaRAF.current = null;
//           return;
//         }
//         if (++frames > maxFrames) {
//           inertiaRAF.current = null;
//           return;
//         }
//         const nextX = clamp(rotationRef.current.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg);
//         const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
//         rotationRef.current = { x: nextX, y: nextY };
//         applyTransform(nextX, nextY);
//         inertiaRAF.current = requestAnimationFrame(step);
//       };
//       stopInertia();
//       inertiaRAF.current = requestAnimationFrame(step);
//     },
//     [dragDampening, maxVerticalRotationDeg, stopInertia]
//   );

//   useGesture(
//     {
//       onDragStart: ({ event }) => {
//         if (focusedElRef.current) return;
//         stopInertia();
//         const evt = event;
//         draggingRef.current = true;
//         movedRef.current = false;
//         startRotRef.current = { ...rotationRef.current };
//         startPosRef.current = { x: evt.clientX, y: evt.clientY };
//       },
//       onDrag: ({ event, last, velocity = [0, 0], direction = [0, 0], movement }) => {
//         if (focusedElRef.current || !draggingRef.current || !startPosRef.current) return;
//         const evt = event;
//         const dxTotal = evt.clientX - startPosRef.current.x;
//         const dyTotal = evt.clientY - startPosRef.current.y;
//         if (!movedRef.current) {
//           const dist2 = dxTotal * dxTotal + dyTotal * dyTotal;
//           if (dist2 > 16) movedRef.current = true;
//         }
//         const nextX = clamp(
//           startRotRef.current.x - dyTotal / dragSensitivity,
//           -maxVerticalRotationDeg,
//           maxVerticalRotationDeg
//         );
//         const nextY = wrapAngleSigned(startRotRef.current.y + dxTotal / dragSensitivity);
//         if (rotationRef.current.x !== nextX || rotationRef.current.y !== nextY) {
//           rotationRef.current = { x: nextX, y: nextY };
//           applyTransform(nextX, nextY);
//         }
//         if (last) {
//           draggingRef.current = false;
//           let [vMagX, vMagY] = velocity;
//           const [dirX, dirY] = direction;
//           let vx = vMagX * dirX;
//           let vy = vMagY * dirY;
//           if (Math.abs(vx) < 0.001 && Math.abs(vy) < 0.001 && Array.isArray(movement)) {
//             const [mx, my] = movement;
//             vx = clamp((mx / dragSensitivity) * 0.02, -1.2, 1.2);
//             vy = clamp((my / dragSensitivity) * 0.02, -1.2, 1.2);
//           }
//           if (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005) startInertia(vx, vy);
//           if (movedRef.current) lastDragEndAt.current = performance.now();
//           movedRef.current = false;
//         }
//       }
//     },
//     { target: mainRef, eventOptions: { passive: true } }
//   );

//   useEffect(() => {
//     const scrim = scrimRef.current;
//     if (!scrim) return;
//     const close = () => {
//       if (performance.now() - openStartedAtRef.current < 250) return;
//       const el = focusedElRef.current;
//       if (!el) return;
//       const parent = el.parentElement;
//       const overlay = viewerRef.current?.querySelector('.enlarge');
//       if (!overlay) return;
//       const refDiv = parent.querySelector('.item__image--reference');
//       const originalPos = originalTilePositionRef.current;
//       if (!originalPos) {
//         overlay.remove();
//         if (refDiv) refDiv.remove();
//         parent.style.setProperty('--rot-y-delta', '0deg');
//         parent.style.setProperty('--rot-x-delta', '0deg');
//         el.style.visibility = '';
//         el.style.zIndex = 0;
//         focusedElRef.current = null;
//         rootRef.current?.removeAttribute('data-enlarging');
//         openingRef.current = false;
//         unlockScroll();
//         return;
//       }
//       const currentRect = overlay.getBoundingClientRect();
//       const rootRect = rootRef.current.getBoundingClientRect();
//       const originalPosRelativeToRoot = {
//         left: originalPos.left - rootRect.left,
//         top: originalPos.top - rootRect.top,
//         width: originalPos.width,
//         height: originalPos.height
//       };
//       const overlayRelativeToRoot = {
//         left: currentRect.left - rootRect.left,
//         top: currentRect.top - rootRect.top,
//         width: currentRect.width,
//         height: currentRect.height
//       };
//       const animatingOverlay = document.createElement('div');
//       animatingOverlay.className = 'enlarge-closing';
//       animatingOverlay.style.cssText = `position:absolute;left:${overlayRelativeToRoot.left}px;top:${overlayRelativeToRoot.top}px;width:${overlayRelativeToRoot.width}px;height:${overlayRelativeToRoot.height}px;z-index:9999;border-radius: var(--enlarge-radius, 32px);overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.35);transition:all ${enlargeTransitionMs}ms ease-out;pointer-events:none;margin:0;transform:none;`;
//       const originalImg = overlay.querySelector('img');
//       if (originalImg) {
//         const img = originalImg.cloneNode();
//         img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
//         animatingOverlay.appendChild(img);
//       }
//       overlay.remove();
//       rootRef.current.appendChild(animatingOverlay);
//       void animatingOverlay.getBoundingClientRect();
//       requestAnimationFrame(() => {
//         animatingOverlay.style.left = originalPosRelativeToRoot.left + 'px';
//         animatingOverlay.style.top = originalPosRelativeToRoot.top + 'px';
//         animatingOverlay.style.width = originalPosRelativeToRoot.width + 'px';
//         animatingOverlay.style.height = originalPosRelativeToRoot.height + 'px';
//         animatingOverlay.style.opacity = '0';
//       });
//       const cleanup = () => {
//         animatingOverlay.remove();
//         originalTilePositionRef.current = null;
//         if (refDiv) refDiv.remove();
//         parent.style.transition = 'none';
//         el.style.transition = 'none';
//         parent.style.setProperty('--rot-y-delta', '0deg');
//         parent.style.setProperty('--rot-x-delta', '0deg');
//         requestAnimationFrame(() => {
//           el.style.visibility = '';
//           el.style.opacity = '0';
//           el.style.zIndex = 0;
//           focusedElRef.current = null;
//           rootRef.current?.removeAttribute('data-enlarging');
//           requestAnimationFrame(() => {
//             parent.style.transition = '';
//             el.style.transition = 'opacity 300ms ease-out';
//             requestAnimationFrame(() => {
//               el.style.opacity = '1';
//               setTimeout(() => {
//                 el.style.transition = '';
//                 el.style.opacity = '';
//                 openingRef.current = false;
//                 if (!draggingRef.current && rootRef.current?.getAttribute('data-enlarging') !== 'true')
//                   document.body.classList.remove('dg-scroll-lock');
//               }, 300);
//             });
//           });
//         });
//       };
//       animatingOverlay.addEventListener('transitionend', cleanup, { once: true });
//     };
//     scrim.addEventListener('click', close);
//     const onKey = e => {
//       if (e.key === 'Escape') close();
//     };
//     window.addEventListener('keydown', onKey);
//     return () => {
//       scrim.removeEventListener('click', close);
//       window.removeEventListener('keydown', onKey);
//     };
//   }, [enlargeTransitionMs, unlockScroll]);

//   const openItemFromElement = useCallback(
//     el => {
//       if (openingRef.current) return;
//       openingRef.current = true;
//       openStartedAtRef.current = performance.now();
//       lockScroll();
//       const parent = el.parentElement;
//       focusedElRef.current = el;
//       el.setAttribute('data-focused', 'true');
//       const offsetX = getDataNumber(parent, 'offsetX', 0);
//       const offsetY = getDataNumber(parent, 'offsetY', 0);
//       const sizeX = getDataNumber(parent, 'sizeX', 2);
//       const sizeY = getDataNumber(parent, 'sizeY', 2);
//       const parentRot = computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments);
//       const parentY = normalizeAngle(parentRot.rotateY);
//       const globalY = normalizeAngle(rotationRef.current.y);
//       let rotY = -(parentY + globalY) % 360;
//       if (rotY < -180) rotY += 360;
//       const rotX = -parentRot.rotateX - rotationRef.current.x;
//       parent.style.setProperty('--rot-y-delta', `${rotY}deg`);
//       parent.style.setProperty('--rot-x-delta', `${rotX}deg`);
//       const refDiv = document.createElement('div');
//       refDiv.className = 'item__image item__image--reference';
//       refDiv.style.opacity = '0';
//       refDiv.style.transform = `rotateX(${-parentRot.rotateX}deg) rotateY(${-parentRot.rotateY}deg)`;
//       parent.appendChild(refDiv);

//       void refDiv.offsetHeight;

//       const tileR = refDiv.getBoundingClientRect();
//       const mainR = mainRef.current?.getBoundingClientRect();
//       const frameR = frameRef.current?.getBoundingClientRect();

//       if (!mainR || !frameR || tileR.width <= 0 || tileR.height <= 0) {
//         openingRef.current = false;
//         focusedElRef.current = null;
//         parent.removeChild(refDiv);
//         unlockScroll();
//         return;
//       }

//       originalTilePositionRef.current = { left: tileR.left, top: tileR.top, width: tileR.width, height: tileR.height };
//       el.style.visibility = 'hidden';
//       el.style.zIndex = 0;
//       const overlay = document.createElement('div');
//       overlay.className = 'enlarge';
//       overlay.style.position = 'absolute';
//       overlay.style.left = frameR.left - mainR.left + 'px';
//       overlay.style.top = frameR.top - mainR.top + 'px';
//       overlay.style.width = frameR.width + 'px';
//       overlay.style.height = frameR.height + 'px';
//       overlay.style.opacity = '0';
//       overlay.style.zIndex = '30';
//       overlay.style.willChange = 'transform, opacity';
//       overlay.style.transformOrigin = 'top left';
//       overlay.style.transition = `transform ${enlargeTransitionMs}ms ease, opacity ${enlargeTransitionMs}ms ease`;
//       const rawSrc = parent.dataset.src || el.querySelector('img')?.src || '';
//       const img = document.createElement('img');
//       img.src = rawSrc;
//       overlay.appendChild(img);
//       viewerRef.current.appendChild(overlay);
//       const tx0 = tileR.left - frameR.left;
//       const ty0 = tileR.top - frameR.top;
//       const sx0 = tileR.width / frameR.width;
//       const sy0 = tileR.height / frameR.height;

//       const validSx0 = isFinite(sx0) && sx0 > 0 ? sx0 : 1;
//       const validSy0 = isFinite(sy0) && sy0 > 0 ? sy0 : 1;

//       overlay.style.transform = `translate(${tx0}px, ${ty0}px) scale(${validSx0}, ${validSy0})`;

//       setTimeout(() => {
//         if (!overlay.parentElement) return;
//         overlay.style.opacity = '1';
//         overlay.style.transform = 'translate(0px, 0px) scale(1, 1)';
//         rootRef.current?.setAttribute('data-enlarging', 'true');
//       }, 16);
//     },
//     [enlargeTransitionMs, lockScroll, segments, unlockScroll]
//   );

//   const onTileClick = useCallback(e => {
//     if (draggingRef.current || movedRef.current || performance.now() - lastDragEndAt.current < 80 || openingRef.current) return;
//     openItemFromElement(e.currentTarget);
//   }, [openItemFromElement]);

//   const onTilePointerUp = useCallback(e => {
//     if (e.pointerType !== 'touch' || draggingRef.current || movedRef.current || performance.now() - lastDragEndAt.current < 80 || openingRef.current) return;
//     openItemFromElement(e.currentTarget);
//   }, [openItemFromElement]);

//   return (
//     <div
//       ref={rootRef}
//       className="sphere-root"
//       style={{
//         ['--segments-x']: segments,
//         ['--segments-y']: segments,
//         ['--overlay-blur-color']: overlayBlurColor,
//         ['--tile-radius']: imageBorderRadius,
//         ['--enlarge-radius']: openedImageBorderRadius,
//         ['--image-filter']: grayscale ? 'grayscale(1)' : 'none'
//       }}
//     >
//       <main ref={mainRef} className="sphere-main">
//         <div className="stage">
//           <div ref={sphereRef} className="sphere">
//             {items.map((it, i) => (
//               <div
//                 key={`${it.x},${it.y},${i}`}
//                 className="item"
//                 data-src={it.src}
//                 data-offset-x={it.x}
//                 data-offset-y={it.y}
//                 data-size-x={it.sizeX}
//                 data-size-y={it.sizeY}
//                 style={{
//                   ['--offset-x']: it.x,
//                   ['--offset-y']: it.y,
//                   ['--item-size-x']: it.sizeX,
//                   ['--item-size-y']: it.sizeY
//                 }}
//               >
//                 <div
//                   className="item__image"
//                   role="button"
//                   tabIndex={0}
//                   aria-label={it.alt || 'Open image'}
//                   onClick={onTileClick}
//                   onPointerUp={onTilePointerUp}
//                 >
//                   <img src={it.src} draggable={false} alt={it.alt} />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="overlay" />
//         <div className="overlay overlay--blur" />
//         <div className="edge-fade edge-fade--top" />
//         <div className="edge-fade edge-fade--bottom" />

//         <div className="viewer" ref={viewerRef}>
//           <div ref={scrimRef} className="scrim" />
//           <div ref={frameRef} className="frame" />
//         </div>
//       </main>
//     </div>
//   );
// }

// // --- Main ProjectDetail Component ---
// export default function ProjectDetail() {
//   const params = useParams();
//   const slug = params?.slug;
//   const project = projectDataMap[slug] || projectDataMap['product-shoot'];
//   const [darkTheme, setDarkTheme] = useState(true);

//   const coverContainerRef = useRef(null);

//   useEffect(() => {
//     let ctx = gsap.context(() => {
//       gsap.fromTo(
//         coverContainerRef.current,
//         { width: "60%", scale: 0.9, borderRadius: "48px", opacity: 0.5 },
//         {
//           width: "100%", scale: 1, borderRadius: "0px", opacity: 1,
//           scrollTrigger: { trigger: coverContainerRef.current, start: "top 85%", end: "top 15%", scrub: 1 }
//         }
//       );
//     });
//     return () => ctx.revert();
//   }, []);

//   // Consolidate and flatten all images from every category and gallery together
//   const allImages = useMemo(() => {
//     if (project?.categories) {
//       return project.categories.flatMap(cat => cat.items || []);
//     }
//     return project?.gallery || [];
//   }, [project]);

//   return (
//     <div className={`min-h-screen transition-colors duration-500 ${darkTheme ? 'bg-black text-white' : 'bg-white text-neutral-900'}`}>
      
//       {/* Top Navigation Bar */}
//       <header className="flex items-center justify-between w-full px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40 2xl:px-52 py-8 z-20">
//         <Link href="/" className="font-bold text-2xl tracking-tighter cursor-pointer">
//           Digital Paaji
//         </Link>

//         <div className="flex items-center space-x-6">
//           <button 
//             onClick={() => setDarkTheme(!darkTheme)}
//             className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${darkTheme ? 'bg-white' : 'bg-neutral-900'}`}
//             aria-label="Toggle Theme"
//           >
//             <div className={`bg-neutral-200 w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${darkTheme ? 'translate-x-6 bg-neutral-900' : 'translate-x-0'}`} />
//           </button>
          
//           <Link href="/" className="text-sm font-medium hover:opacity-70 transition-opacity">
//             ← Back Home
//           </Link>
//         </div>
//       </header>

//       {/* Hero Header Section */}
//       <main className="max-w-6xl mx-auto px-6 sm:px-12 py-16 lg:py-24">
//         <div className="flex items-center space-x-4 text-sm uppercase tracking-widest opacity-60 mb-6 animate-slide-up [animation-fill-mode:forwards] [animation-delay:100ms]">
//           <span>{project?.category}</span>
//           <span>•</span>
//           <span>{project?.year}</span>
//         </div>

//         <div className="mb-8">
//           <ScrollFloat
//             animationDuration={1}
//             ease="back.inOut(2)"
//             scrollStart="top 90%"
//             scrollEnd="bottom 40%"
//             stagger={0.03}
//             textClassName={`text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight ${darkTheme ? 'text-white' : 'text-neutral-900'}`}
//           >
//             {project?.title}
//           </ScrollFloat>
//         </div>

//         <p className="text-xl sm:text-2xl font-light opacity-80 max-w-3xl leading-relaxed mb-16 animate-slide-up opacity-0 [animation-fill-mode:forwards] [animation-delay:300ms]">
//           {project?.subtitle}
//         </p>

//         <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-8 border-y border-neutral-800 mb-16 animate-slide-up opacity-0 [animation-fill-mode:forwards] [animation-delay:400ms]">
//           <div>
//             <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Client</p>
//             <p className="text-lg font-medium">{project?.client}</p>
//           </div>
//           <div>
//             <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Role / Scope</p>
//             <p className="text-lg font-medium">{project?.role}</p>
//           </div>
//           <div>
//             <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Year</p>
//             <p className="text-lg font-medium">{project?.year}</p>
//           </div>
//         </div>
//       </main>

//       {/* Cover Image Section */}
//       <div className="w-full flex justify-center overflow-hidden mb-24">
//         <div ref={coverContainerRef} className="overflow-hidden shadow-2xl aspect-[16/9]">
//           <img src={project?.coverImage} alt={project?.title} className="w-full h-full object-cover" />
//         </div>
//       </div>

//       <main className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40 2xl:px-52">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
//           <div className="lg:col-span-5">
//             <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">The Challenge &amp; Solution</h2>
//           </div>
//           <div className="lg:col-span-7 space-y-6 text-lg font-light opacity-90 leading-relaxed">
//             <p>{project?.description}</p>
//             <p>Every interaction was meticulously engineered to provide frictionless engagement while maintaining an unmistakable air of exclusivity and high-end agency execution.</p>
//           </div>
//         </div>

//         {/* Unified Dome Gallery View */}
//         <div className="mb-24" style={{ width: '100%', height: '650px', position: 'relative' }}>
//           <DomeGallery
//             images={allImages}
//             fit={0.8}
//             minRadius={600}
//             maxVerticalRotationDeg={5}
//             segments={35}
//             dragDampening={2}
//             grayscale={false}
//             overlayBlurColor={darkTheme ? "#000000" : "#ffffff"}
//           />
//         </div>

//         <div className="border-t border-neutral-800 pt-16 pb-24 text-center">
//           <p className="text-sm uppercase tracking-widest opacity-50 mb-4">Explore More</p>
//           <Link href="/" className="text-3xl sm:text-5xl font-bold hover:opacity-70 transition-opacity">
//             Back to All Works →
//           </Link>
//         </div>
//       </main>

//       <Footer />

//       <style jsx global>{`
//         @keyframes slideUp {
//           0% { opacity: 0; transform: translateY(40px); }
//           100% { opacity: 1; transform: translateY(0); }
//         }
//         .animate-slide-up { animation: slideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
//         .dg-scroll-lock { overflow: hidden; }
//       `}</style>
//     </div>
//   );
// }