import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { soundEngine } from '../../utils/soundEngine';

const Page = ({ angle, pageIndex, isFlipping, textureColor = "#F7F3EB" }) => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      angle,
      0.1
    );
  });

  return (
    <group position={[-0.8, 0, pageIndex * 0.008]}>
      <mesh
        ref={meshRef}
        position={[0.8, 0, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1.6, 2.2, 0.012]} />
        <meshStandardMaterial
          color={textureColor}
          roughness={0.88}
          metalness={0.02}
        />
        {/* Subtle printed hairline border on page */}
        <mesh position={[0, 0, 0.007]}>
          <planeGeometry args={[1.4, 2.0]} />
          <meshBasicMaterial
            color="#2B2118"
            wireframe
            transparent
            opacity={0.06}
          />
        </mesh>
      </mesh>
    </group>
  );
};

const PhysicalMenuBook = ({ activeCategoryIndex, onOpenFullMenu, mouse }) => {
  const bookGroup = useRef();

  useFrame(() => {
    if (!bookGroup.current) return;
    const targetY = mouse.current.x * 0.25;
    const targetX = -0.35 + mouse.current.y * 0.15;
    bookGroup.current.rotation.y = THREE.MathUtils.lerp(bookGroup.current.rotation.y, targetY, 0.05);
    bookGroup.current.rotation.x = THREE.MathUtils.lerp(bookGroup.current.rotation.x, targetX, 0.05);
  });

  // Calculate page angles based on active category
  const pageAngles = useMemo(() => {
    return [
      activeCategoryIndex > 0 ? -Math.PI * 0.88 : -Math.PI * 0.05,
      activeCategoryIndex > 1 ? -Math.PI * 0.82 : -Math.PI * 0.04,
      activeCategoryIndex > 2 ? -Math.PI * 0.76 : -Math.PI * 0.03,
      activeCategoryIndex > 3 ? -Math.PI * 0.70 : -Math.PI * 0.02,
    ];
  }, [activeCategoryIndex]);

  return (
    <group ref={bookGroup} position={[0, -0.2, 0]}>
      {/* Polished Black Marble Table Top */}
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <cylinderGeometry args={[2.8, 2.8, 0.1, 48]} />
        <meshStandardMaterial
          color="#0b0907"
          roughness={0.2}
          metalness={0.2}
        />
      </mesh>

      {/* Book Back Cover (Dark Leather) */}
      <mesh position={[0.02, -0.04, -0.03]} receiveShadow castShadow>
        <boxGeometry args={[1.75, 2.35, 0.05]} />
        <meshStandardMaterial
          color="#120e0b"
          roughness={0.65}
          metalness={0.15}
        />
      </mesh>

      {/* Leather Spine */}
      <mesh position={[-0.88, 0.02, 0]} rotation={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 2.35, 24, 1, false, -Math.PI / 2, Math.PI]} />
        <meshStandardMaterial
          color="#16110d"
          roughness={0.6}
          metalness={0.15}
        />
      </mesh>

      {/* Front Leather Cover (Swings open) */}
      <group position={[-0.88, 0, 0.04]}>
        <mesh
          position={[0.88, 0, 0]}
          rotation={[0, -Math.PI * 0.92, 0]}
          castShadow
        >
          <boxGeometry args={[1.75, 2.35, 0.04]} />
          <meshStandardMaterial
            color="#140f0c"
            roughness={0.6}
            metalness={0.15}
          />
          {/* Embossed Gold Foil CASSIA Crest */}
          <mesh position={[0, 0.25, 0.025]}>
            <circleGeometry args={[0.22, 32]} />
            <meshStandardMaterial
              color="#D4AF37"
              roughness={0.3}
              metalness={0.85}
            />
          </mesh>
        </mesh>
      </group>

      {/* 3D Paper Pages */}
      {pageAngles.map((angle, idx) => (
        <Page
          key={idx}
          angle={angle}
          pageIndex={idx}
          textureColor={idx % 2 === 0 ? '#F7F3EB' : '#F2EDE4'}
        />
      ))}

      {/* Golden Silk Bookmark Ribbon hanging over edge */}
      <mesh position={[0.2, -0.65, 0.08]} rotation={[0.2, 0.1, -0.1]} castShadow>
        <boxGeometry args={[0.12, 1.2, 0.008]} />
        <meshStandardMaterial
          color="#D4AF37"
          roughness={0.35}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
};

export const MenuBook3D = ({ onOpenFullMenu, activeCategory, onSelectCategory }) => {
  const mouse = useRef({ x: 0, y: 0 });
  const [currentIdx, setCurrentIdx] = useState(0);

  const categories = [
    { id: 'coffee', label: 'Coffee' },
    { id: 'bar', label: 'The Bar' },
    { id: 'food', label: 'Cuisine' },
    { id: 'desserts', label: 'Desserts' }
  ];

  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
  };

  const handleNextPage = () => {
    soundEngine.playPageTurn();
    const next = (currentIdx + 1) % categories.length;
    setCurrentIdx(next);
    if (onSelectCategory) onSelectCategory(categories[next].id);
  };

  const handlePrevPage = () => {
    soundEngine.playPageTurn();
    const prev = (currentIdx - 1 + categories.length) % categories.length;
    setCurrentIdx(prev);
    if (onSelectCategory) onSelectCategory(categories[prev].id);
  };

  return (
    <div className="w-full relative flex flex-col items-center">
      {/* 3D Canvas Container */}
      <div 
        className="w-full h-[460px] md:h-[580px] relative cursor-pointer"
        onPointerMove={handlePointerMove}
        onClick={handleNextPage}
        title="Click to turn page"
      >
        <Canvas
          camera={{ position: [0, 1.8, 2.5], fov: 44 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.45} />
          <spotLight
            position={[1.5, 4.5, 3]}
            angle={0.48}
            penumbra={0.7}
            intensity={2.3}
            color="#FFF4DC"
            castShadow
          />
          <pointLight position={[-2, 1, 1]} intensity={0.4} color="#D4AF37" />
          <pointLight position={[2, -0.5, 2]} intensity={0.3} color="#C49746" />

          <PhysicalMenuBook
            activeCategoryIndex={currentIdx}
            onOpenFullMenu={onOpenFullMenu}
            mouse={mouse}
          />
        </Canvas>

        {/* Ambient Prompt Pill */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#0d0a08]/85 border border-[#D4AF37]/30 text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase backdrop-blur-md pointer-events-none">
          Click To Turn Page (3D)
        </div>
      </div>

      {/* Category Tabs and Open Action Controls */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 md:gap-4 z-20">
        {categories.map((cat, idx) => (
          <button
            key={cat.id}
            onClick={() => {
              soundEngine.playPageTurn();
              setCurrentIdx(idx);
              if (onSelectCategory) onSelectCategory(cat.id);
            }}
            className={`px-4 py-2 rounded-full text-[11px] font-display tracking-[0.2em] uppercase transition-all duration-300 ${
              currentIdx === idx
                ? 'bg-[#D4AF37] text-[#080605] font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                : 'bg-[#14100d] text-[#A3998D] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:text-[#F8F5EE]'
            }`}
          >
            {cat.label}
          </button>
        ))}

        <button
          onClick={() => {
            soundEngine.playClick();
            onOpenFullMenu(categories[currentIdx].id);
          }}
          className="ml-2 px-6 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFF0D4] to-[#D4AF37] text-[#080605] text-[11px] font-display font-bold tracking-[0.2em] uppercase hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all duration-300"
        >
          Expand Full Menu
        </button>
      </div>
    </div>
  );
};
