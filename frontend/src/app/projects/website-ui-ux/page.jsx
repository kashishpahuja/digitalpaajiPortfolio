"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Maximize2, StepBack, StepForward, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollFloat from '@/components/ScrollFloat';
import Footer from '@/components/Footer';

// Register ScrollTrigger outside the component
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Static database mapping with complete templates/projects
const projectDataMap = {
    'website-ui-ux': {
        title: 'Website UI/UX',
        subtitle: 'Immersive web experiences driven by expressive interaction, comprehensive design systems, and bespoke typography.',
        category: 'Digital Experience & UI/UX',
        client: 'Multiple Global Brands',
        year: '2026',
        role: 'UI/UX Design & Full-Stack Architecture',
        description: 'Reimagining corporate digital presence and interactive workflows. Each project explores deep information architecture, fluid layout design, and user-centric flows that transform complex requirements into intuitive digital products.',
        coverImage: "/Images/website.webp",
        gallery: [
            { thumb: "/Images/portfolio/website/manjit.webp", full: "/Images/portfolio/website/m4c.pdf", type: "pdf", title: "Manjit4Caledon Portfolio Website", description: "Comprehensive campaign web presence featuring voter engagement flows, policy highlights, and responsive accessibility." },
            { thumb: "/Images/portfolio/website/shudyam3.webp", full: "/Images/shudyam.pdf", type: "pdf", title: "Brass Utensils Platform", description: "E-commerce catalog and heritage showcase highlighting artisan craftsmanship with clean editorial layouts." },
            { thumb: "/Images/portfolio/website/daf1.webp", full: "/Images/daf.pdf", type: "pdf", title: "Dr. Aulakh Foods Ecom Platform", description: "Robust product distribution platform showcasing healthy food alternatives with high-conversion landing pages." },
            { thumb: "/Images/portfolio/website/digi.webp", full: "/Images/digimagnifiko.pdf", type: "pdf", title: "Digimagnifiko UI/UX Presentation", description: "Agency brand presentation detailing comprehensive full-stack delivery and minimalist UI systems." },
            { thumb: "/Images/portfolio/website/sr1.webp", full: "/Images/sr.pdf", type: "pdf", title: "SR Platform Design", description: "Dynamic category sliders, coverflow carousels, and jewelry care instructions tailored for luxury retail." },
            { thumb: "/Images/portfolio/website/paaji.webp", full: "/Images/dp.pdf", type: "pdf", title: "Digital Paaji Showcase", description: "Agency portfolio hero sections and animated loaders crafted with modern web technologies." },
            { thumb: "/Images/portfolio/website/begum1.webp", full: "/Images/begum.pdf", type: "pdf", title: "Begum Brand Experience", description: "Bridal package menu, interactive booking, and luxury salon aesthetics for Kupwara J&K clientele." },
            { thumb: "/Images/portfolio/website/academy.webp", full: "/Images/dpa.pdf", type: "pdf", title: "DPA Platform Flow", description: "Streamlined data architecture and dashboard UI optimized for high-performance administrative control." },
            { thumb: "/Images/portfolio/website/royalpalm.webp", full: "/Images/rp.pdf", type: "pdf", title: "RP Real Estate Portal", description: "Property listing interface with immersive photo galleries, interactive filters, and inquiry modals." },
            { thumb: "/Images/portfolio/website/fleet.webp", full: "/Images/fleet.pdf", type: "pdf", title: "Fleet Management Dashboard", description: "Real-time tracking analytics and role-based administrative controls built for robust logistics." },
            { thumb: "/Images/portfolio/website/smsworld.webp", full: "/Images/sms.pdf", type: "pdf", title: "SMS System Architecture", description: "Secure messaging pipelines and notification dispatch systems engineered for high throughput." },
            { thumb: "/Images/portfolio/website/prodsol.webp", full: "/Images/p.pdf", type: "pdf", title: "Portfolio Concept UI", description: "Experimental typography and dark-mode glassmorphism explorations for creative directors." },
            { thumb: "/Images/portfolio/website/cogan.webp", full: "/Images/c.pdf", type: "pdf", title: "Corporate Web Portal", description: "Scalable enterprise architecture featuring modular components and multilingual support." },
            { thumb: "/Images/portfolio/website/hammer1.webp", full: "/Images/hammer.pdf", type: "pdf", title: "Hammer Security Platform", description: "CCTV surveillance product range display and industrial security solutions presentation." },
            { thumb: "/Images/portfolio/website/kaushalya.webp", full: "/Images/k.pdf", type: "pdf", title: "K-Suite Experience", description: "Unified business management tools with modular dashboard views and fluid state transitions." }
        ]
    }
};

export default function ProjectDetail() {
    const params = useParams();
    const slug = params?.slug;
    const project = projectDataMap[slug] || projectDataMap['website-ui-ux'];

    const [darkTheme, setDarkTheme] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const galleryContainerRef = useRef(null);

    // Manage body scroll overflow on modal open/close
    useEffect(() => {
        document.body.style.overflow = selectedImage !== null ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedImage]);

    const { scrollYProgress } = useScroll({
        target: galleryContainerRef,
        offset: ['start start', 'end end'],
    });

    const handleNext = (e) => {
        e.stopPropagation();
        setSelectedImage((prev) => (prev + 1) % project.gallery.length);
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        setSelectedImage((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
    };

    return (
        <div className={`min-h-screen transition-colors duration-500 ${darkTheme ? 'bg-black text-white' : 'bg-white text-neutral-900'}`}>

            {/* Top Navigation Bar */}
            <header className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40 2xl:px-52 flex items-center justify-between w-full py-8 z-20">
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
            <main className="py-16 lg:py-24">
                <div className='px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40 2xl:px-52'>
                    {/* Category & Year */}
                    <div className="flex items-center space-x-4 text-sm uppercase tracking-widest opacity-60 mb-6">
                        <span>{project.category}</span>
                        <span>•</span>
                        <span>{project.year}</span>
                    </div>

                    {/* Title with ScrollFloat Animation */}
                    <div className="mb-8 w-fit">
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
                    <p className="text-xl sm:text-2xl font-light opacity-80 max-w-3xl leading-relaxed mb-16">
                        {project.subtitle}
                    </p>

                    {/* Project Description */}
                    <div className="mb-20 max-w-4xl">
                        <h3 className="text-2xl font-semibold mb-6">Overview</h3>
                        <p className="text-lg opacity-80 leading-relaxed">{project.description}</p>
                    </div>
                </div>

                {/* Sticky Stacking Gallery Section */}
        {/* Sticky Stacking Gallery Section */}
<section
    ref={galleryContainerRef}
    className="

        pt-20
        sm:pt-24
        md:pt-32
        pb-20
        relative
        z-10
        px-5
        sm:px-8
        md:px-10
        text-[#F4F1E8]
    "
>
    <div className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40 2xl:px-52 ">
        {/* Sticky Stacking Cards */}
        <div className="flex flex-col gap-10 sm:gap-12">
            {project.gallery.map((asset, i) => {
                const targetScale = 1 - (project.gallery.length - 1 - i) * 0.035;

                const cardProgress = useTransform(
                    scrollYProgress,
                    [i / project.gallery.length, 1],
                    [0, 1]
                );

                const scale = useTransform(
                    cardProgress,
                    [0, 1],
                    [1, targetScale]
                );

                return (
                    <div
                        key={i}
                        className="sticky top-20 md:top-28 flex items-center cursor-pointer"
                        onClick={() => setSelectedImage(i)}
                    >
                        <motion.div
                            style={{ scale }}
                            className="
                                w-full
                              
                                flex
                                flex-col
                                justify-between
                                shadow-2xl
                                text-[#071B35]
                                overflow-hidden
                                group
                            "
                        >
                            {/* Image Container */}
                            <div className="relative w-full h-auto sm:h-[60vh] md:h-[68vh] overflow-hidden bg-black/5">
                                <img
                                    src={asset.thumb}
                                    alt={asset.title}
                                    className="w-full h-fit lg:h-full object-contain"
                                    loading="lazy"
                                />

                                {/* Right Top Side Icon Overlay */}
                                <div className="absolute top-4 right-4 z-10 bg-black/40 backdrop-blur-md p-3 rounded-full border border-white/20 text-white shadow-lg group-hover:bg-[#C62828] transition-colors">
                                    <Maximize2 strokeWidth={2} className="w-5 h-5" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                );
            })}
        </div>
    </div>
</section>
            </main>

            {/* FULL SCREEN MODAL VIEWER */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-9999 w-full h-screen flex items-center justify-center bg-black/95 backdrop-blur-xl p-2 sm:p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-6 right-6 text-white/60 hover:text-white z-[10000] bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
                            onClick={() => setSelectedImage(null)}
                            aria-label="Close modal"
                        >
                            <X size={24} className="sm:w-8 sm:h-8" />
                        </button>

                        {/* Navigation Buttons */}
                        <button
                            className="absolute left-4 sm:left-8 text-white/60 hover:text-white z-[10000] bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
                            onClick={handlePrev}
                            aria-label="Previous image"
                        >
                            <StepBack size={24} />
                        </button>

                        <button
                            className="absolute right-4 sm:right-8 text-white/60 hover:text-white z-[10000] bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
                            onClick={handleNext}
                            aria-label="Next image"
                        >
                            <StepForward size={24} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full h-full max-w-5xl max-h-[85vh] flex flex-col justify-center items-center p-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="absolute top-2 text-center text-white/80 font-medium text-sm">
                                {project.gallery[selectedImage].title || `Item ${selectedImage + 1} of ${project.gallery.length}`}
                            </div>

                            {project.gallery[selectedImage].type === "pdf" ? (
                                <div className="w-full h-full flex items-center justify-center mt-6">
                                    <iframe
                                        src={`${project.gallery[selectedImage].full}#view=FitH&toolbar=0&navpanes=0`}
                                        className="w-full h-[80vh] rounded-lg shadow-2xl bg-white"
                                        title="PDF Viewer"
                                    />
                                </div>
                            ) : (
                                <img
                                    src={project.gallery[selectedImage].full || project.gallery[selectedImage].thumb}
                                    className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl mt-6"
                                    alt="Full Resolution View"
                                />
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
}

