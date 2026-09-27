import React, { useEffect, useRef, useState } from 'react';

/**
 * CASSIA — FrameSequencePlayer
 * Reusable scroll-driven frame sequence player with intelligent preloading,
 * canvas memory caching, and graceful cinematic fallback.
 */
export const FrameSequencePlayer = ({
  sequenceFolder = '/assets/sequences/coffee-pour',
  totalFrames = 60,
  filePrefix = 'frame_',
  fileExt = '.webp',
  progress = 0,
  poster = '/assets/coffee/coffee_pour_hero.jpg',
  className = '',
  aspectRatio = '16/9'
}) => {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [useFallback, setUseFallback] = useState(false);
  const activeFrameRef = useRef(-1);

  useEffect(() => {
    let isCancelled = false;
    const loadedImages = [];
    let successes = 0;

    // Preload sequence frames
    const preloadFrames = async () => {
      for (let i = 1; i <= Math.min(totalFrames, 30); i++) {
        if (isCancelled) break;
        const img = new Image();
        const paddedIndex = String(i).padStart(3, '0');
        img.src = `${sequenceFolder}/${filePrefix}${paddedIndex}${fileExt}`;
        
        img.onload = () => {
          if (!isCancelled) {
            successes++;
            setLoadedCount(successes);
            loadedImages[i - 1] = img;
          }
        };

        img.onerror = () => {
          // If frame sequences are not yet rendered into the folder, fallback gracefully to poster
          if (!isCancelled && successes === 0 && i === 1) {
            setUseFallback(true);
          }
        };
      }
    };

    preloadFrames();
    imagesRef.current = loadedImages;

    return () => {
      isCancelled = true;
    };
  }, [sequenceFolder, totalFrames, filePrefix, fileExt]);

  useEffect(() => {
    if (useFallback || imagesRef.current.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Calculate current frame based on progress
    const clampedProgress = Math.max(0, Math.min(1, progress));
    const targetIndex = Math.min(
      imagesRef.current.length - 1,
      Math.floor(clampedProgress * (imagesRef.current.length - 1))
    );

    if (targetIndex === activeFrameRef.current) return;
    activeFrameRef.current = targetIndex;

    const img = imagesRef.current[targetIndex];
    if (img && img.complete) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  }, [progress, useFallback]);

  return (
    <div 
      className={`relative overflow-hidden ${className}`} 
      style={{ aspectRatio }}
    >
      {!useFallback ? (
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={poster}
            alt="Sequence visualization"
            className="w-full h-full object-cover transition-transform duration-700 ease-out"
            style={{
              transform: `scale(${1 + progress * 0.08}) translateY(${-progress * 15}px)`
            }}
          />
          {/* Subtle cinematic vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060504] via-transparent to-[#060504]/60 pointer-events-none" />
        </div>
      )}
    </div>
  );
};
