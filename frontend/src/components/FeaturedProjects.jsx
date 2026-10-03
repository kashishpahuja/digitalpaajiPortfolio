import React from 'react';

// Exact projects dataset with high quality image/GIF media from Unsplash
const projects = [
  {
    title: 'AI Videos',
    media: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    type: 'image',
  },
  {
    title: 'Video Presentations',
    media: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
    type: 'image',
  },
  {
    title: 'Animation',
    media: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    type: 'image',
  },
  {
    title: 'Product Shoot',
    media: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
    type: 'image',
  },
  {
    title: 'Website UI/UX',
    media: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    type: 'image',
  },
  {
    title: 'BNI',
    media: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    type: 'image',
  },
];

export default function FeaturedProjects({ darkTheme }) {
  return (
    <section
      className={`
        transition-colors
        duration-500
        ${darkTheme ? 'text-white bg-[#0A0A0A]' : 'text-neutral-900 bg-white'}
      `}
    >
      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-20 lg:gap-y-24 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {projects.map((project) => (
          <div
            key={project.title}
            className="group w-full cursor-pointer"
          >
            {/* Media Container - Scale transition removed as requested */}
            <div
              className={`
                relative
                w-full
                aspect-[16/9]
                overflow-hidden
                rounded-[28px]
                transition-all
                duration-500
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
                "
              />
            </div>

            {/* Project Info */}
            <div className="flex flex-col items-center pt-6">
              <h3
                className="
                  text-xl
                  sm:text-2xl
                  lg:text-[24px]
                  font-semibold
                  tracking-[-0.03em]
                  text-center
                "
              >
                {project.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}