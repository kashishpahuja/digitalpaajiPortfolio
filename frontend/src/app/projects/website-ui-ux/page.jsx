"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Maximize2, StepBack, StepForward, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
        coverImage: '/Images/portfolio/website/cover.webp',
        gallery: [
            { thumb: "/Images/portfolio/website/m.webp", full: "/Images/digimagnifiko.pdf", type: "pdf", title: "Digimagnifiko UI/UX Presentation" },
            { thumb: "/Images/portfolio/website/sr.webp", full: "/Images/sr.pdf", type: "pdf", title: "SR Platform Design" },
            { thumb: "/Images/portfolio/website/dp.webp", full: "/Images/dp.pdf", type: "pdf", title: "Digital Paaji Showcase" },
            { thumb: "/Images/portfolio/website/begum.webp", full: "/Images/begum.pdf", type: "pdf", title: "Begum Brand Experience" },
            { thumb: "/Images/portfolio/website/dpa.webp", full: "/Images/dpa.pdf", type: "pdf", title: "DPA Platform Flow" },
            { thumb: "/Images/portfolio/website/rp.webp", full: "/Images/rp.pdf", type: "pdf", title: "RP Real Estate Portal" },
            { thumb: "/Images/portfolio/website/f.webp", full: "/Images/fleet.pdf", type: "pdf", title: "Fleet Management Dashboard" },
            { thumb: "/Images/portfolio/website/sms.webp", full: "/Images/sms.pdf", type: "pdf", title: "SMS System Architecture" },
            { thumb: "/Images/portfolio/website/p.webp", full: "/Images/p.pdf", type: "pdf", title: "Portfolio Concept UI" },
            { thumb: "/Images/portfolio/website/c.webp", full: "/Images/c.pdf", type: "pdf", title: "Corporate Web Portal" },
            { thumb: "/Images/portfolio/website/hammer.webp", full: "/Images/hammer.pdf", type: "pdf", title: "Hammer Security Platform" },
            { thumb: "/Images/portfolio/website/k.webp", full: "/Images/k.pdf", type: "pdf", title: "K-Suite Experience" }
        ]
    }
};

export default function ProjectDetail() {
    const params = useParams();
    const slug = params?.slug;
    const project = projectDataMap[slug] || projectDataMap['website-ui-ux'];

    const [darkTheme, setDarkTheme] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const coverContainerRef = useRef(null);

    // Manage body scroll overflow on modal open/close
    useEffect(() => {
        document.body.style.overflow = selectedImage !== null ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedImage]);

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

    const handleNext = (e) => {
        e.stopPropagation();
        setSelectedImage((prev) => (prev + 1) % project.gallery.length);
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        setSelectedImage((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <div className={`min-h-screen transition-colors duration-500 ${darkTheme ? 'bg-black text-white' : 'bg-white text-neutral-900'}`}>

            {/* Top Navigation Bar */}
            {/* Top Navigation Bar */}
            <header className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40 2xl:px-52 flex items-center justify-between w-full  py-8 z-20">
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
            <main className=" py-16 lg:py-24">
<div className='px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40 2xl:px-52'>
                {/* Category & Year */}
                <div className="flex items-center space-x-4 text-sm uppercase tracking-widest opacity-60 mb-6">
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
                <p className="text-xl sm:text-2xl font-light opacity-80 max-w-3xl leading-relaxed mb-16">
                    {project.subtitle}
                </p>

                {/* Project Meta Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-8 border-y border-neutral-800 mb-16">
                    <div>
                        <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Client</p>
                        <p className="text-lg font-medium">{project.client}</p>
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Role / Scope</p>
                        <p className="text-lg font-medium">{project.role}</p>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Year</p>
                        <p className="text-lg font-medium">{project.year}</p>
                    </div>
                </div>

                {/* Project Description */}
                <div className="mb-20 max-w-4xl">
                    <h3 className="text-2xl font-semibold mb-6">Overview</h3>
                    <p className="text-lg opacity-80 leading-relaxed">{project.description}</p>
                </div>
</div>
                {/* Expanding Cover Image Preview */}
                <div className="w-full flex justify-center overflow-hidden mb-24">
                    <div
                        ref={coverContainerRef}
                        className="overflow-hidden shadow-2xl aspect-[16/9]"
                    >
                        <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* Interactive Gallery Grid Section */}
                <div className="w-full px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40 2xl:px-52">
                    <div className="mb-12">
                        <h3 className="text-3xl font-bold tracking-tight mb-2">Project Gallery & Screens</h3>
                        <p className="text-sm opacity-60">Click any asset to inspect full screenshots and PDF documents interactively.</p>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                    >
                        {project.gallery.map((asset, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="group relative overflow-hidden rounded-xl cursor-pointer bg-black/20 border border-white/10 shadow-lg"
                                onClick={() => setSelectedImage(index)}
                            >
                                <img
                                    src={asset.thumb}
                                    className="w-full h-64 object-cover md:grayscale group-hover:grayscale-0 transition-all duration-700"
                                    alt={asset.title || `Gallery Item ${index + 1}`}
                                    loading="lazy"
                                />

                                {/* Hover overlay with asset title & maximize icon */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-6">
                                    <div className="self-end bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
                                        <Maximize2 strokeWidth={2} className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <span className="text-xs uppercase tracking-widest text-white/60 mb-1 block">View Asset</span>
                                        <h4 className="text-white font-medium text-lg">{asset.title || `Slide ${index + 1}`}</h4>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </main>

            {/* FULL SCREEN MODAL VIEWER */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] w-full h-screen flex items-center justify-center bg-black/95 backdrop-blur-xl p-2 sm:p-4"
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
                                    src={project.gallery[selectedImage].full || project.gallery[selectedImage].url}
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