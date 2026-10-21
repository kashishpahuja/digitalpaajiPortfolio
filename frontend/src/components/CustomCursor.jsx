'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor({ darkTheme = false }) {
  const cursorRef = useRef(null);

  const mouse = useRef({
    x: -100,
    y: -100,
  });

  const current = useRef({
    x: -100,
    y: -100,
  });

  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;

    if (!cursor) return;

    let raf;

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      const target = e.target;

      const clickable =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsPointer((prev) => {
        const next = Boolean(clickable);
        return prev === next ? prev : next;
      });
    };

    const animate = () => {
      // Higher = faster cursor response
      const ease = 0.32;

      current.current.x +=
        (mouse.current.x - current.current.x) * ease;

      current.current.y +=
        (mouse.current.y - current.current.y) * ease;

      cursor.style.transform = `
        translate3d(
          ${current.current.x}px,
          ${current.current.y}px,
          0
        )
        translate3d(-50%, -50%, 0)
      `;

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, {
      passive: true,
    });

    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`
        fixed
        left-0
        top-0
        pointer-events-none
        z-9999
        rounded-full
        will-change-transform
        ${
          darkTheme
            ? 'bg-white'
            : 'bg-black/70'
        }
        ${
          isPointer
            ? 'w-10 h-10 opacity-50'
            : 'w-3 h-3 opacity-100'
        }
      `}
    />
  );
}


// 'use client';
// import { useEffect, useState } from 'react';

// export default function CustomCursor({ darkTheme = false }) {
//   const [position, setPosition] = useState({ x: -100, y: -100 });
//   const [isPointer, setIsPointer] = useState(false);

//   useEffect(() => {
//     const onMouseMove = (e) => {
//       setPosition({ x: e.clientX, y: e.clientY });
      
//       const target = e.target;
//       const computedStyle = window.getComputedStyle(target);
//       setIsPointer(
//         computedStyle.cursor === 'pointer' ||
//         target.tagName.toLowerCase() === 'a' ||
//         target.tagName.toLowerCase() === 'button' ||
//         target.closest('button') ||
//         target.closest('a')
//       );
//     };

//     window.addEventListener('mousemove', onMouseMove);
//     return () => window.removeEventListener('mousemove', onMouseMove);
//   }, []);

//   return (
//     <div
//       className={`fixed pointer-events-none z-50 rounded-full transition-transform duration-100 ease-out ${
//         darkTheme ? 'bg-white' : 'bg-black/70'
//       } ${
//         isPointer ? 'w-10 h-10 -translate-x-3 -translate-y-3 opacity-30 backdrop-blur-xl transition-all duration-500' : 'transition-all duration-500 w-3 h-3 -translate-x-1.5 -translate-y-1.5 opacity-100'
//       }`}
//       style={{
//         left: `${position.x}px`,
//         top: `${position.y}px`,
//       }}
//     />
//   );
// }