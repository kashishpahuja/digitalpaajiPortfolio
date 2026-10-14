'use client';
import React from 'react';
import Link from 'next/link';

// Updated dataset with slugs for dynamic routing
const projects = [
  {
    title: 'AI Videos',
    slug: 'ai-videos',
    media: "/Images/portfolio/ai/1.gif",
    category: 'Generative Media & Motion',
    client: 'OpenLabs Global',
    year: '2026',
  },
  {
    title: 'Video Presentations',
    slug: 'video-presentations',
    media: '/Images/video.webp',
    category: 'Pitch & Brand Films',
    client: 'Nexus Ventures',
    year: '2026',
  },
  {
    title: 'Reel Creation',
    slug: 'reels',
    media: '/Images/portfolio/reels/1.webp',
    category: '3D Motion Animation + Reel Creation',
    client: 'Kinetix Studio',
    year: '2025',
  },
  {
    title: 'Animation',
    slug: 'animation',
    media: '/Images/animation/2.gif',
    category: '3D Motion Animation + Reel Creation',
    client: 'Kinetix Studio',
    year: '2025',
  },
  {
    title: 'Product Shoot',
    slug: 'product-shoot',
    media: '/Images/product.webp',
    category: 'Commercial Direction',
    client: 'Aura Lifestyle',
    year: '2025',
  },
  {
    title: 'Website UI/UX',
    slug: 'website-ui-ux',
    media: '/Images/website.webp',
    category: 'Digital Experience',
    client: 'Vanguard Tech',
    year: '2026',
  },
  {
    title: 'BNI',
    slug: 'bni',
    media: '/Images/bni.webp',
    category: 'Global Convention Campaign',
    client: 'BNI Enterprise',
    year: '2025',
  },
];

export default function FeaturedProjects({ darkTheme }) {
  return (
    <section
      id="work"
      className={`
        transition-colors
        duration-500
        ${darkTheme ? 'text-white bg-black' : 'text-neutral-900 bg-[#F6F6F6]'}
      `}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-20 lg:gap-y-24 w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40 2xl:px-52 py-16 lg:py-24">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group w-full cursor-pointer block"
          >
            {/* Media Container with smooth hover zoom */}
            <div
              className={`
                relative
                w-full
                aspect-[16/9]
                overflow-hidden
                rounded-[28px]
                transition-all
                duration-700
                ${
                  darkTheme
                    ? 'bg-[#0A0A0A] ring-1 ring-white/10'
                    : 'bg-neutral-100 '
                }
              `}
            >
              <img
                src={project.media}
                alt={project.title}
                className="
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-cover object-top
                  "
              />
            </div>

            {/* Project Info */}
            <div className="flex flex-col items-center pt-6 space-y-1">
              <h3
                className="
                  text-xl
                  sm:text-2xl
                  lg:text-[24px]
                  font-semibold
                  tracking-[-0.03em]
                  text-center
                  transition-opacity
                  duration-300
                  group-hover:opacity-70
                "
              >
                {project.title}
              </h3>
              <p className="text-sm font-light opacity-50 uppercase tracking-widest">
                {project.category}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
