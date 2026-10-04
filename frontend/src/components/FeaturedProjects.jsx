'use client';
import React from 'react';
import Link from 'next/link';

// Updated dataset with slugs for dynamic routing
const projects = [
  {
    title: 'AI Videos',
    slug: 'ai-videos',
    media: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    category: 'Generative Media & Motion',
    client: 'OpenLabs Global',
    year: '2026',
  },
  {
    title: 'Video Presentations',
    slug: 'video-presentations',
    media: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
    category: 'Pitch & Brand Films',
    client: 'Nexus Ventures',
    year: '2026',
  },
  {
    title: 'Animation',
    slug: 'animation',
    media: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    category: '3D Motion Graphics',
    client: 'Kinetix Studio',
    year: '2025',
  },
  {
    title: 'Product Shoot',
    slug: 'product-shoot',
    media: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
    category: 'Commercial Direction',
    client: 'Aura Lifestyle',
    year: '2025',
  },
  {
    title: 'Website UI/UX',
    slug: 'website-ui-ux',
    media: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    category: 'Digital Experience',
    client: 'Vanguard Tech',
    year: '2026',
  },
  {
    title: 'BNI',
    slug: 'bni',
    media: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
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
        ${darkTheme ? 'text-white bg-black' : 'text-neutral-900 bg-white'}
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
                    : 'bg-neutral-100 ring-1 ring-black/5'
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
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-105
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
