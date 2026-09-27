import React, { useEffect, useRef } from 'react';
import { useCursor } from '../context/CursorContext';

export const CustomCursor = () => {
  const { cursorText, isHovered } = useCursor();
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationFrameId;
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const render = () => {
      // Smooth spring follow for outer ring
      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.16);
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.16);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
      <div 
        ref={ringRef} 
        className={`custom-cursor-ring ${isHovered ? 'cursor-hover' : ''}`} 
        aria-hidden="true"
      >
        <span className="custom-cursor-label">{cursorText}</span>
      </div>
    </>
  );
};
