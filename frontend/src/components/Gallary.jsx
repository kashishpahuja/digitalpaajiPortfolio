'use client';
import React from 'react';
import FlexCarousel from './FlexCarousel';

// Mapping existing project entries for the interactive liquid bend carousel
const items = [
  { src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80', alt: 'AI Videos', title: 'AI Videos', subtitle: 'Generative Media & Motion' },
  { src: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80', alt: 'Video Presentations', title: 'Video Presentations', subtitle: 'Pitch & Brand Films' },
  { src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80', alt: 'Animation', title: 'Animation', subtitle: '3D Motion Graphics' },
  { src: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80', alt: 'Product Shoot', title: 'Product Shoot', subtitle: 'Commercial Direction' },
  { src: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80', alt: 'Website UI/UX', title: 'Website UI/UX', subtitle: 'Digital Experience' },
  { src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80', alt: 'BNI', title: 'BNI', subtitle: 'Global Convention Campaign' }
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
      <div className="w-full mx-auto py-16 lg:py-24">
        <div style={{ width: '100%', height: '560px', position: 'relative' }}>
          <FlexCarousel
            items={items}
            preset="liquid"
            intro="rise"
            cardHeight={0.5}
            gap={12}
            squeeze={0.2}
            focusOnClick
            captions
            fit="natural"
            radius={0}
            lensWidth={0.74}
            lensHeight={1.18}
            tilt={62}
            roundness={1}
            bend={0.34}
            reach={0.38}
            curl="twist"
            dispersion={0.45}
            liquid={0}
            followCursor={false}
            autoplay={false}
            interval={4}
            captureWheel
            onSelect={(index, item) => {
              const slugMap = ['ai-videos', 'video-presentations', 'animation', 'product-shoot', 'website-ui-ux', 'bni'];
              if (slugMap[index]) {
                window.location.href = `/projects/${slugMap[index]}`;
              }
            }}
          />
        </div>
      </div>
    </section>
  );
}
