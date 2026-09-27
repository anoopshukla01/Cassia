import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Procedural Rising Coffee Steam Particle Column
const SteamColumn = ({ count = 45 }) => {
  const points = useRef();

  const [initialData] = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        x: (Math.random() - 0.5) * 0.35,
        y: Math.random() * 2.2,
        z: (Math.random() - 0.5) * 0.35,
        speed: 0.35 + Math.random() * 0.45,
        swirl: Math.random() * Math.PI * 2,
        radius: 0.1 + Math.random() * 0.3
      });
    }
    return [data];
  }, [count]);

  const posArray = useMemo(() => new Float32Array(count * 3), [count]);

  useFrame((state, delta) => {
    if (!points.current) return;
    const time = state.clock.elapsedTime;

    initialData.forEach((p, i) => {
      p.y += delta * p.speed;
      if (p.y > 2.4) {
        p.y = 0.05;
      }
      const currentRadius = p.radius * (1 + p.y * 0.8);
      const angle = p.swirl + time * 0.8 + p.y * 1.5;

      posArray[i * 3] = Math.cos(angle) * currentRadius;
      posArray[i * 3 + 1] = p.y + 0.3; // start from cup rim
      posArray[i * 3 + 2] = Math.sin(angle) * currentRadius;
    });

    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={posArray}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        color="#FFF2DC"
        transparent
        opacity={0.25}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// 3D Floating Coffee Beans
const CoffeeBean = ({ position, rotation, scale = 1 }) => {
  const beanRef = useRef();

  useFrame((state, delta) => {
    if (beanRef.current) {
      beanRef.current.rotation.x += delta * 0.3;
      beanRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={beanRef} position={position} rotation={rotation} scale={scale}>
      <mesh castShadow>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color="#2B1A11" roughness={0.7} metalness={0.05} />
      </mesh>
      {/* Center fissure */}
      <mesh position={[0, 0, 0.12]}>
        <boxGeometry args={[0.02, 0.22, 0.05]} />
        <meshStandardMaterial color="#110A07" roughness={0.9} />
      </mesh>
    </group>
  );
};

const EspressoCupModel = ({ mouse }) => {
  const cupGroup = useRef();

  useFrame(() => {
    if (!cupGroup.current) return;
    const targetY = mouse.current.x * 0.25;
    const targetX = mouse.current.y * 0.15;
    cupGroup.current.rotation.y = THREE.MathUtils.lerp(cupGroup.current.rotation.y, targetY, 0.05);
    cupGroup.current.rotation.x = THREE.MathUtils.lerp(cupGroup.current.rotation.x, targetX, 0.05);
  });

  return (
    <group ref={cupGroup} position={[0, -0.4, 0]}>
      {/* Dark Marble Counter Base */}
      <mesh position={[0, -0.55, 0]} receiveShadow>
        <cylinderGeometry args={[2.5, 2.5, 0.1, 48]} />
        <meshStandardMaterial
          color="#0c0907"
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      {/* Ceramic Saucer */}
      <mesh position={[0, -0.45, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[1.3, 0.85, 0.08, 40]} />
        <meshStandardMaterial
          color="#161311"
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {/* Espresso Cup Body */}
      <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.62, 0.42, 0.75, 36]} />
        <meshStandardMaterial
          color="#14110f"
          roughness={0.35}
          metalness={0.12}
        />
      </mesh>

      {/* Cup Rim Chamfer */}
      <mesh position={[0, 0.39, 0]}>
        <torusGeometry args={[0.61, 0.03, 16, 36]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#221c17" roughness={0.3} />
      </mesh>

      {/* Gold Trim Line on Cup */}
      <mesh position={[0, 0.2, 0]}>
        <torusGeometry args={[0.56, 0.008, 12, 36]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Cup Handle */}
      <mesh position={[0.68, 0.05, 0]} rotation={[0, 0, Math.PI * 0.1]} castShadow>
        <torusGeometry args={[0.26, 0.06, 16, 24, Math.PI * 1.3]} />
        <meshStandardMaterial color="#161311" roughness={0.4} />
      </mesh>

      {/* Espresso Liquid Crema Surface */}
      <mesh position={[0, 0.32, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.58, 32]} />
        <meshStandardMaterial
          color="#8A5A2B"
          roughness={0.15}
          metalness={0.2}
        />
      </mesh>

      {/* Crema Swirl Core */}
      <mesh position={[0.08, 0.325, 0.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.05, 0.35, 32]} />
        <meshStandardMaterial
          color="#C98B4B"
          roughness={0.25}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Steam rising */}
      <SteamColumn count={50} />

      {/* Scattered Coffee Beans on Table */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.2}>
        <CoffeeBean position={[-0.95, -0.42, 0.6]} rotation={[0.4, 0.8, 0.2]} scale={0.9} />
        <CoffeeBean position={[1.1, -0.44, 0.4]} rotation={[0.2, -0.5, 0.6]} scale={1.05} />
        <CoffeeBean position={[-0.8, -0.43, -0.6]} rotation={[-0.3, 0.4, 0.1]} scale={0.85} />
      </Float>
    </group>
  );
};

export const CoffeeCup3D = () => {
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
  };

  return (
    <div 
      className="w-full h-[450px] md:h-[550px] relative cursor-grab active:cursor-grabbing"
      onPointerMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 1.2, 2.8], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <spotLight
          position={[2.5, 4, 3]}
          angle={0.5}
          penumbra={0.7}
          intensity={2.2}
          color="#FFE7C2"
          castShadow
        />
        <pointLight position={[-2, 1, 1]} intensity={0.6} color="#8A5A2B" />
        <pointLight position={[0, -1, 2]} intensity={0.3} color="#D4AF37" />

        <EspressoCupModel mouse={mouse} />
      </Canvas>
    </div>
  );
};
