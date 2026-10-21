'use client';
import React, { useState } from 'react';
import DepthText from './DepthText';
import Link from 'next/link';

export default function Hero({ darkTheme, setDarkTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className={`relative w-full h-[70vh] md:min-h-screen flex flex-col justify-between px-6 sm:px-12 py-6 transition-colors duration-500 overflow-hidden ${darkTheme ? 'bg-neutral-950 text-white' : 'bg-[#F6F6F6] text-neutral-900'}`}>
      
      {/* ========================================== */}
      {/* CRUSHED PAPER / CREASED TEXTURE OVERLAY */}
      {/* ========================================== */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle SVG & CSS displacement crease lines */}
        <div 
          className={`absolute inset-0 opacity-[0.10] transition-opacity duration-500 mix-blend-${darkTheme ? 'screen' : 'multiply'}`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.7'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}
        />
        {/* Organic Crumpled Crease Shadows / Highlights */}
        <div className={`absolute inset-0 opacity-[18] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ${darkTheme ? 'from-white via-transparent to-black' : 'from-black via-transparent to-white'}`} />
      </div>

      {/* Top Navbar */}
      <header className="flex items-center justify-between w-full max-w-7xl mx-auto z-20 animate-fade-in">
        {/* Brand Name */}
        <Link href="/" className="flex items-center cursor-pointer">
          <img 
            src={darkTheme ? "/logoWhite.webp" : "/logo2.webp"} 
            alt="Digital Paaji Logo" 
            className="h-12 md:h-[80px] w-auto object-cover transition-opacity duration-300" 
          />
        </Link>

        {/* Desktop Navigation & Actions */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-lg font-medium">
          {/* Theme / Mode Switch Toggle */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setDarkTheme(!darkTheme)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${darkTheme ? 'bg-[#F6F6F6]' : 'bg-neutral-900'}`}
              aria-label="Toggle Theme"
            >
              <div
                className={`bg-neutral-200 w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${darkTheme ? 'translate-x-6 bg-neutral-900' : 'translate-x-0'}`}
              />
            </button>
          </div>

          <a href="#work" className="cursor-pointer font-medium group inline-block">
            <div className="relative overflow-hidden h-6">
              <p className="group-hover:-translate-y-6 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                Our work
              </p>
              <p className="absolute top-6 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                Our work
              </p>
            </div>
          </a>
          
          {/* Uiverse Slide Hover Effect Button: Contact Us */}
          <a href="https://digitalpaaji.com/contact" className="cursor-pointer font-medium group inline-block">
            <div className="relative overflow-hidden h-6">
              <p className="group-hover:-translate-y-6 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                Contact Us
              </p>
              <p className="absolute top-6 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                Contact Us
              </p>
            </div>
          </a>

        </nav>

        {/* Mobile Menu Button & Theme Toggle */}
        <div className="flex items-center space-x-4 md:hidden">
          <button 
            onClick={() => setDarkTheme(!darkTheme)}
            className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-300 ${darkTheme ? 'bg-white' : 'bg-neutral-900'}`}
            aria-label="Toggle Theme"
          >
            <div
              className={`bg-neutral-200 w-3 h-3 rounded-full shadow-md transform transition-transform duration-300 ${darkTheme ? 'translate-x-5 bg-neutral-900' : 'translate-x-0'}`}
            />
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-sm font-medium focus:outline-none"
          >
            {mobileMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden absolute top-20 left-0 w-full z-30 p-6 shadow-xl border-b transition-colors ${darkTheme ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'}`}>
          <div className="flex flex-col space-y-4 text-lg font-medium">
            <a href="#work" onClick={() => setMobileMenuOpen(false)} className="hover:opacity-70">Our work</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:opacity-70">Contact Us</a>
          </div>
        </div>
      )}

      {/* Hero Section with DepthText & Slide-Up Load Animation */}
      <main className="flex flex-col items-center justify-center text-center my-auto z-10 py-12">
        <div className="animate-slide-up opacity-0 [animation-fill-mode:forwards] [animation-delay:200ms]">
        <DepthText
          text="We Mind Your"
          layers={10}
          depth={1.5}
          faceColor={darkTheme ? "#f8fafc" : "#111827"}
          depthColor={darkTheme ? "#7c3aed" : "#9ca3af"}
          tilt={5}
          pointerTracking
          smoothing={0.2}
          perspective={900}
          autoOrbit
          orbitSpeed={0.15}
          fontSize="clamp(3rem, 10vw, 10rem)"
          fontWeight={900}
          shadow
        />
        </div>

        <div className="animate-slide-up opacity-0 [animation-fill-mode:forwards] [animation-delay:400ms]">
        <DepthText
        text="Business"
        layers={10}
        depth={1.5}
        faceColor={darkTheme ? "#f8fafc" : "#111827"}
        depthColor={darkTheme ? "#7c3aed" : "#9ca3af"}
        tilt={5}
        pointerTracking
        smoothing={0.2}
        perspective={900}
        autoOrbit
        orbitSpeed={0.15}
        fontSize="clamp(3rem, 10vw, 10rem)"
        fontWeight={900}
        shadow
        />
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="flex items-center justify-center w-full max-w-9xl mx-auto z-20 pb-2 text-xl text-neutral-500 animate-fade-in">
        <span className="flex items-center gap-2">
          Scroll Down 
        </span>
      </footer>

      {/* Global Slide-Up & Fade Keyframe Styles */}
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
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slide-up {
          animation: slideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        body {
          cursor: none;
        }
      `}</style>
    </div>
  );
}
// 'use client';
// import React, { useState } from 'react';
// import DepthText from './DepthText';
// import Link from 'next/link';

// export default function Hero({ darkTheme, setDarkTheme }) {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <div className={`relative w-full h-[70vh] md:min-h-screen flex flex-col justify-between px-6 sm:px-12 py-6 transition-colors duration-500 ${darkTheme ? 'bg-neutral-950 text-white' : 'bg-[#F6F6F6] text-neutral-900'}`}>
      
//       {/* Top Navbar */}
//       <header className="flex items-center justify-between w-full max-w-7xl mx-auto z-20 animate-fade-in">
//         {/* Brand Name */}
//      <Link href="/" className="flex items-center cursor-pointer">
//   <img 
//     src={darkTheme ? "/logoWhite.webp" : "/logo2.webp"} 
//     alt="Digital Paaji Logo" 
//     className="h-12 md:h-[80px] w-auto object-cover transition-opacity duration-300" 
//   />
// </Link>

//         {/* Desktop Navigation & Actions */}
//         <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-lg font-medium">
//           {/* Theme / Mode Switch Toggle */}
//           <div className="flex items-center space-x-2">
//             <button 
//               onClick={() => setDarkTheme(!darkTheme)}
//               className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${darkTheme ? 'bg-[#F6F6F6]' : 'bg-neutral-900'}`}
//               aria-label="Toggle Theme"
//             >
//               <div
//                 className={`bg-neutral-200 w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${darkTheme ? 'translate-x-6 bg-neutral-900' : 'translate-x-0'}`}
//               />
//             </button>
//           </div>

//           <a href="#work" className="cursor-pointer font-medium group inline-block">
//             <div className="relative overflow-hidden h-6">
//               <p className="group-hover:-translate-y-6 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
//                 Our work
//               </p>
//               <p className="absolute top-6 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
//                 Our work
//               </p>
//             </div>
//           </a>
          
//           {/* Uiverse Slide Hover Effect Button: Contact Us */}
//           <a href="https://digitalpaaji.com/contact" className="cursor-pointer font-medium group inline-block">
//             <div className="relative overflow-hidden h-6">
//               <p className="group-hover:-translate-y-6 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
//                 Contact Us
//               </p>
//               <p className="absolute top-6 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
//                 Contact Us
//               </p>
//             </div>
//           </a>

//         </nav>

//         {/* Mobile Menu Button & Theme Toggle */}
//         <div className="flex items-center space-x-4 md:hidden">
//           <button 
//             onClick={() => setDarkTheme(!darkTheme)}
//             className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-300 ${darkTheme ? 'bg-white' : 'bg-neutral-900'}`}
//             aria-label="Toggle Theme"
//           >
//             <div
//               className={`bg-neutral-200 w-3 h-3 rounded-full shadow-md transform transition-transform duration-300 ${darkTheme ? 'translate-x-5 bg-neutral-900' : 'translate-x-0'}`}
//             />
//           </button>

//           <button 
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="text-sm font-medium focus:outline-none"
//           >
//             {mobileMenuOpen ? 'Close' : 'Menu'}
//           </button>
//         </div>
//       </header>

//       {/* Mobile Dropdown Menu */}
//       {mobileMenuOpen && (
//         <div className={`md:hidden absolute top-20 left-0 w-full z-30 p-6 shadow-xl border-b transition-colors ${darkTheme ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'}`}>
//           <div className="flex flex-col space-y-4 text-lg font-medium">
//             <a href="#work" onClick={() => setMobileMenuOpen(false)} className="hover:opacity-70">Our work</a>
//             <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:opacity-70">Contact Us</a>
//           </div>
//         </div>
//       )}

//       {/* Hero Section with DepthText & Slide-Up Load Animation */}
//       <main className="flex flex-col items-center justify-center text-center my-auto z-10 py-12">
//         <div className="animate-slide-up opacity-0 [animation-fill-mode:forwards] [animation-delay:200ms]">
//         <DepthText
//           text="We Mind Your"
//           layers={10}
//           depth={1.5}
//           faceColor={darkTheme ? "#f8fafc" : "#111827"}
//           depthColor={darkTheme ? "#7c3aed" : "#9ca3af"}
//           tilt={5}
//           pointerTracking
//           smoothing={0.2}
//           perspective={900}
//           autoOrbit
//           orbitSpeed={0.15}
//           fontSize="clamp(3rem, 10vw, 10rem)"
//           fontWeight={900}
//           shadow
//         />
//         </div>

//         <div className="animate-slide-up opacity-0 [animation-fill-mode:forwards] [animation-delay:400ms]">
//         <DepthText
//         text="Business"
//         layers={10}
//         depth={1.5}
//         faceColor={darkTheme ? "#f8fafc" : "#111827"}
//         depthColor={darkTheme ? "#7c3aed" : "#9ca3af"}
//         tilt={5}
//         pointerTracking
//         smoothing={0.2}
//         perspective={900}
//         autoOrbit
//         orbitSpeed={0.15}
//         fontSize="clamp(3rem, 10vw, 10rem)"
//         fontWeight={900}
//         shadow
//         />
//         </div>
//       </main>

//       {/* Footer Branding */}
//       <footer className="flex items-center justify-center w-full max-w-9xl mx-auto z-20 pb-2 text-xl text-neutral-500 animate-fade-in">
//         <span className="flex items-center gap-2">
//           Scroll Down 
//           {/* <strong className={`font-bold tracking-tight lg:text-3xl ${darkTheme ? 'text-white' : 'text-black'}`}>Digital Paaji</strong> */}
//         </span>
//       </footer>

//       {/* Global Slide-Up & Fade Keyframe Styles */}
//       <style jsx global>{`
//         @keyframes slideUp {
//           0% {
//             opacity: 0;
//             transform: translateY(40px);
//           }
//           100% {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         .animate-slide-up {
//           animation: slideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
//         }
//         .animate-fade-in {
//           animation: fadeIn 1s ease-out forwards;
//         }
//         body {
//           cursor: none;
//         }
//       `}</style>
//     </div>
//   );
// }