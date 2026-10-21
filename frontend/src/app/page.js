'use client';

import { useState } from 'react';
import Hero from "../components/Hero";
import FeaturedProjects from '../components/FeaturedProjects';
import Footer from '@/components/Footer';
import Gallary from '@/components/Dome';
import CustomCursor from "../components/CustomCursor";

export default function Home() {
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <div
      className={`relative min-h-screen transition-colors duration-500 ${
        darkTheme
          ? 'bg-transparent text-white'
          : 'bg-transparent text-neutral-900'
      }`}
    >
      {/* Use this only if the page needs its own themed cursor */}
      <CustomCursor darkTheme={darkTheme} />

      <Hero
        darkTheme={darkTheme}
        setDarkTheme={setDarkTheme}
      />

      <FeaturedProjects darkTheme={darkTheme} />

      <Gallary />

      <Footer />
    </div>
  );
}




// 'use client';
// import { useState } from 'react';
// import Hero from "../components/Hero";
// import AboutSection from "../components/AboutSection";
// import CustomCursor from "../components/CustomCursor";
// import FeaturedProjects from '../components/FeaturedProjects'
// import Footer from '@/components/Footer';
// import Gallary from '@/components/Dome';


// export default function Home() {
//   const [darkTheme, setDarkTheme] = useState(false);

//   return (
//     <div className={`min-h-screen transition-colors duration-500 ${darkTheme ? 'bg-black text-white' : 'bg-white text-neutral-900'}`}>
//       {/* Global Custom Cursor tracking the current theme */}
//       <CustomCursor darkTheme={darkTheme} />

//       {/* Hero / Banner with toggle handler */}
//       <Hero darkTheme={darkTheme} setDarkTheme={setDarkTheme} />

//       {/* About Section sharing the exact same darkTheme state */}
//       {/* <AboutSection darkTheme={darkTheme} /> */}
//       <FeaturedProjects darkTheme={darkTheme} />
//      <Gallary/>

//       <Footer/>
//     </div>
//   );
// }