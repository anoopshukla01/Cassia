import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Ambient Floating Golden Dust Particles
const DustParticles = ({ count = 90 }) => {
  const points = useRef();

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
      sc[i] = Math.random() * 0.04 + 0.01;
    }
    return [pos, sc];
  }, [count]);

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.03;
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.05;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color="#F5E6CA"
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// 3D Architectural Cassia Signplate with Brushed Brass & Marble Base
const CassiaArchitecturalSign = ({ scrollProgress = 0, mouse }) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;

    // Smooth subtle mouse parallax
    const targetRotY = (mouse.current.x * 0.15);
    const targetRotX = (-mouse.current.y * 0.12);

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);

    // Scroll camera push effect: moves back and scales
    const zPush = -scrollProgress * 6;
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, zPush, 0.08);
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        {/* Nero Marquina Marble Slab Backing */}
        <mesh position={[0, 0, -0.1]} receiveShadow castShadow>
          <boxGeometry args={[4.8, 2.2, 0.18]} />
          <meshStandardMaterial
            color="#0d0a08"
            roughness={0.25}
            metalness={0.15}
          />
        </mesh>

        {/* Brushed Brass Frame Border */}
        <mesh position={[0, 0, -0.01]}>
          <boxGeometry args={[4.88, 2.28, 0.04]} />
          <meshStandardMaterial
            color="#D4AF37"
            roughness={0.35}
            metalness={0.88}
          />
        </mesh>

        {/* Inner Dark Matte Inset */}
        <mesh position={[0, 0, 0.01]}>
          <boxGeometry args={[4.64, 2.04, 0.04]} />
          <meshStandardMaterial
            color="#140f0c"
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>

        {/* Architectural Beveled Cassia Emblem / Plate */}
        <mesh position={[0, 0.45, 0.08]} castShadow>
          <cylinderGeometry args={[0.28, 0.28, 0.05, 32]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial
            color="#F5E6CA"
            roughness={0.25}
            metalness={0.85}
          />
        </mesh>

        {/* Simulated 3D Architectural Lettering Geometry (Beveled Bars) */}
        {/* C */}
        <mesh position={[-1.2, -0.12, 0.08]} castShadow>
          <torusGeometry args={[0.26, 0.05, 16, 32, Math.PI * 1.5]} rotation={[0, 0, Math.PI * 0.25]} />
          <meshStandardMaterial color="#D4AF37" roughness={0.3} metalness={0.85} />
        </mesh>
        {/* A */}
        <group position={[-0.6, -0.12, 0.08]}>
          <mesh position={[-0.1, 0, 0]} rotation={[0, 0, -0.2]}>
            <boxGeometry args={[0.07, 0.52, 0.05]} />
            <meshStandardMaterial color="#D4AF37" roughness={0.3} metalness={0.85} />
          </mesh>
          <mesh position={[0.1, 0, 0]} rotation={[0, 0, 0.2]}>
            <boxGeometry args={[0.07, 0.52, 0.05]} />
            <meshStandardMaterial color="#D4AF37" roughness={0.3} metalness={0.85} />
          </mesh>
          <mesh position={[0, -0.05, 0]}>
            <boxGeometry args={[0.22, 0.06, 0.05]} />
            <meshStandardMaterial color="#D4AF37" roughness={0.3} metalness={0.85} />
          </mesh>
        </group>
        {/* S */}
        <mesh position={[0, -0.12, 0.08]} castShadow>
          <torusGeometry args={[0.15, 0.045, 16, 32, Math.PI * 1.6]} rotation={[0, 0, 0.4]} />
          <meshStandardMaterial color="#D4AF37" roughness={0.3} metalness={0.85} />
        </mesh>
        {/* S */}
        <mesh position={[0.55, -0.12, 0.08]} castShadow>
          <torusGeometry args={[0.15, 0.045, 16, 32, Math.PI * 1.6]} rotation={[0, 0, 0.4]} />
          <meshStandardMaterial color="#D4AF37" roughness={0.3} metalness={0.85} />
        </mesh>
        {/* I */}
        <mesh position={[1.05, -0.12, 0.08]} castShadow>
          <boxGeometry args={[0.08, 0.52, 0.05]} />
          <meshStandardMaterial color="#D4AF37" roughness={0.3} metalness={0.85} />
        </mesh>
        {/* A */}
        <group position={[1.5, -0.12, 0.08]}>
          <mesh position={[-0.1, 0, 0]} rotation={[0, 0, -0.2]}>
            <boxGeometry args={[0.07, 0.52, 0.05]} />
            <meshStandardMaterial color="#D4AF37" roughness={0.3} metalness={0.85} />
          </mesh>
          <mesh position={[0.1, 0, 0]} rotation={[0, 0, 0.2]}>
            <boxGeometry args={[0.07, 0.52, 0.05]} />
            <meshStandardMaterial color="#D4AF37" roughness={0.3} metalness={0.85} />
          </mesh>
          <mesh position={[0, -0.05, 0]}>
            <boxGeometry args={[0.22, 0.06, 0.05]} />
            <meshStandardMaterial color="#D4AF37" roughness={0.3} metalness={0.85} />
          </mesh>
        </group>

        {/* Sub-sign Plate */}
        <mesh position={[0, -0.62, 0.05]}>
          <boxGeometry args={[3.2, 0.18, 0.02]} />
          <meshStandardMaterial color="#0a0806" roughness={0.6} />
        </mesh>
      </Float>
    </group>
  );
};

export const HeroCassiaCanvas = ({ scrollProgress = 0 }) => {
  const mouse = useRef({ x: 0, y: 0 });

  const handlePointerMove = (e) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
  };

  return (
    <div 
      className="absolute inset-0 w-full h-full pointer-events-auto"
      onPointerMove={handlePointerMove}
    >
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#060504']} />
        <fog attach="fog" args={['#060504', 3.5, 10]} />

        {/* Cinematic Studio Warm Lighting */}
        <ambientLight intensity={0.4} />
        <spotLight
          position={[3, 5, 4]}
          angle={0.4}
          penumbra={0.8}
          intensity={1.8}
          color="#FFE9C7"
          castShadow
        />
        <pointLight position={[-4, -2, 2]} intensity={0.6} color="#826312" />
        <pointLight position={[0, 3, -1]} intensity={0.5} color="#D4AF37" />

        {/* Dust motes floating in warm light */}
        <DustParticles count={75} />

        {/* Central Cassia 3D Architectural Sign */}
        <CassiaArchitecturalSign scrollProgress={scrollProgress} mouse={mouse} />
      </Canvas>
    </div>
  );
};
