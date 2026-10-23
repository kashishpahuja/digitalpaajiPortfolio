'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor({ darkTheme = false }) {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Avoid custom cursors on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let raf = null;
    let isPointer = false;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target;
      const clickable = target instanceof Element && (
        target.closest('a, button, [role="button"], input[type="submit"]') ||
        window.getComputedStyle(target).cursor === 'pointer'
      );

      const next = Boolean(clickable);

      if (next !== isPointer) {
        isPointer = next;
        cursor.classList.toggle('cursor-pointer', isPointer);
      }

      if (raf === null) {
        raf = requestAnimationFrame(animate);
      }
    };

    const animate = () => {
      const ease = 0.32;

      currentX += (mouseX - currentX) * ease;
      currentY += (mouseY - currentY) * ease;

      cursor.style.transform =
        `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;

      if (
        Math.abs(mouseX - currentX) > 0.1 ||
        Math.abs(mouseY - currentY) > 0.1
      ) {
        raf = requestAnimationFrame(animate);
      } else {
        currentX = mouseX;
        currentY = mouseY;
        cursor.style.transform =
          `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
        raf = null;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor fixed left-0 top-0 pointer-events-none z-9999 rounded-full will-change-transform ${
        darkTheme ? 'bg-white' : 'bg-black/70'
      }`}
    />
  );
}


// 'use client';

// import { useEffect, useRef, useState } from 'react';

// export default function CustomCursor({ darkTheme = false }) {
//   const cursorRef = useRef(null);

//   const mouse = useRef({
//     x: -100,
//     y: -100,
//   });

//   const current = useRef({
//     x: -100,
//     y: -100,
//   });

//   const [isPointer, setIsPointer] = useState(false);

//   useEffect(() => {
//     const cursor = cursorRef.current;

//     if (!cursor) return;

//     let raf;

//     const handleMouseMove = (e) => {
//       mouse.current.x = e.clientX;
//       mouse.current.y = e.clientY;

//       const target = e.target;

//       const clickable =
//         target.closest('a') ||
//         target.closest('button') ||
//         target.closest('[role="button"]') ||
//         window.getComputedStyle(target).cursor === 'pointer';

//       setIsPointer((prev) => {
//         const next = Boolean(clickable);
//         return prev === next ? prev : next;
//       });
//     };

//     const animate = () => {
//       // Higher = faster cursor response
//       const ease = 0.32;

//       current.current.x +=
//         (mouse.current.x - current.current.x) * ease;

//       current.current.y +=
//         (mouse.current.y - current.current.y) * ease;

//       cursor.style.transform = `
//         translate3d(
//           ${current.current.x}px,
//           ${current.current.y}px,
//           0
//         )
//         translate3d(-50%, -50%, 0)
//       `;

//       raf = requestAnimationFrame(animate);
//     };

//     window.addEventListener('mousemove', handleMouseMove, {
//       passive: true,
//     });

//     raf = requestAnimationFrame(animate);

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       cancelAnimationFrame(raf);
//     };
//   }, []);

//   return (
//     <div
//       ref={cursorRef}
//       className={`
//         fixed
//         left-0
//         top-0
//         pointer-events-none
//         z-9999
//         rounded-full
//         will-change-transform
//         ${
//           darkTheme
//             ? 'bg-white'
//             : 'bg-black/70'
//         }
//         ${
//           isPointer
//             ? 'w-10 h-10 opacity-50'
//             : 'w-3 h-3 opacity-100'
//         }
//       `}
//     />
//   );
// }
