'use client';
import React, { useEffect, useRef } from 'react';

export default function DomeGallery({
  items = [],
  fit = 0.8,
  minRadius = 600,
  maxVerticalRotationDeg = 0,
  segments = 34,
  dragDampening = 2,
  grayscale = false,
  onItemClick
}) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let rotX = 0;
    let rotY = 0;

    const onPointerDown = (e) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      root.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const dx = (e.clientX - startX) / dragDampening;
      const dy = (e.clientY - startY) / dragDampening;
      startX = e.clientX;
      startY = e.clientY;

      rotY += dx;
      rotX = Math.max(-maxVerticalRotationDeg, Math.min(maxVerticalRotationDeg, rotX - dy));

      const sphere = root.querySelector('.sphere');
      if (sphere) {
        sphere.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      }
    };

    const onPointerUp = (e) => {
      isDragging = false;
      try {
        root.releasePointerCapture(e.pointerId);
      } catch {}
    };

    root.addEventListener('pointerdown', onPointerDown);
    root.addEventListener('pointermove', onPointerMove);
    root.addEventListener('pointerup', onPointerUp);
    root.addEventListener('pointercancel', onPointerUp);

    return () => {
      root.removeEventListener('pointerdown', onPointerDown);
      root.removeEventListener('pointermove', onPointerMove);
      root.removeEventListener('pointerup', onPointerUp);
      root.removeEventListener('pointercancel', onPointerUp);
    };
  }, [maxVerticalRotationDeg, dragDampening]);

  // Flatten all items across all categories into a single array for the unified dome
  const flattenedItems = items.flatMap(cat => cat.items || [cat]);

  return (
    <div 
      ref={rootRef}
      className="sphere-root"
      style={{
        '--segments-x': segments,
        '--segments-y': Math.max(10, Math.floor(segments / 2)),
        filter: grayscale ? 'grayscale(100%)' : 'none'
      }}
    >
      <main className="sphere-main">
        <div className="edge-fade edge-fade--top" />
        <div className="stage">
          <div className="sphere">
            {flattenedItems.map((item, idx) => {
              const offsetX = (idx % segments) - Math.floor(segments / 2);
              const offsetY = Math.floor(idx / segments) - Math.floor(segments / 4);
              return (
                <div
                  key={idx}
                  className="item"
                  style={{
                    '--offset-x': offsetX,
                    '--offset-y': offsetY,
                    '--item-size-x': 1,
                    '--item-size-y': 1
                  }}
                >
                  <div 
                    className="item__image"
                    onClick={() => onItemClick?.(item, idx)}
                  >
                    <img src={item.src} alt={item.alt || ''} draggable={false} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="edge-fade edge-fade--bottom" />
      </main>
    </div>
  );
}