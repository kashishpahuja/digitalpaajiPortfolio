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
      <main className=" px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40 2xl:px-52 py-16 lg:py-24">
        <div className="flex items-center space-x-4 text-sm uppercase tracking-widest opacity-60 mb-6">
          <span>{project?.category}</span>
          <span>•</span>
          <span>{project?.year}</span>
        </div>
        <div className="mb-8 w-fit text-wrap ">
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
      <main className=" px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40 2xl:px-52 mb-24">
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
        <div className="flex flex-col md:flex-row md:items-center justify-center mb-12 pb-6 border-b border-neutral-800 gap-6">
          {/* <div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">Creative Gallery</h3>
            <p className="text-sm opacity-60 mt-1">Explore visual assets and high-res deliverables</p>
          </div> */}

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => setSelectedImage(item)}
              className="group relative h- rounded-2xl overflow-hidden cursor-pointer bg-neutral-900 border border-neutral-800"
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
