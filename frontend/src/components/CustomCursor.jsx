'use client';
import { useEffect, useState } from 'react';

export default function CustomCursor({ darkTheme = false }) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target;
      const computedStyle = window.getComputedStyle(target);
      setIsPointer(
        computedStyle.cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('button') ||
        target.closest('a')
      );
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div
      className={`fixed pointer-events-none z-50 rounded-full transition-transform duration-100 ease-out ${
        darkTheme ? 'bg-white' : 'bg-black'
      } ${
        isPointer ? 'w-6 h-6 -translate-x-3 -translate-y-3 opacity-60' : 'w-3 h-3 -translate-x-1.5 -translate-y-1.5 opacity-100'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
}