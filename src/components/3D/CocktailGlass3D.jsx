import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Torched Cassia Bark Smoke Particles
const CocktailSmoke = ({ count = 35 }) => {
  const points = useRef();

  const [smokeData] = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        x: 0,
        y: Math.random() * 2,
        z: 0,
        speed: 0.25 + Math.random() * 0.35,
        driftX: (Math.random() - 0.5) * 0.4,
        driftZ: (Math.random() - 0.5) * 0.4,
        life: Math.random()
      });
    }
    return [data];
  }, [count]);

  const posArray = useMemo(() => new Float32Array(count * 3), [count]);

  useFrame((state, delta) => {
    if (!points.current) return;
    const time = state.clock.elapsedTime;

    smokeData.forEach((p, i) => {
      p.y += delta * p.speed;
      if (p.y > 2.2) {
        p.y = 0;
      }
      const curl = Math.sin(time * 1.2 + p.y * 2) * 0.2;
      posArray[i * 3] = p.driftX * (p.y + 0.3) + curl;
      posArray[i * 3 + 1] = p.y + 0.75; // originates from the top of the cinnamon stick
      posArray[i * 3 + 2] = p.driftZ * (p.y + 0.3) + Math.cos(time * 0.9 + p.y) * 0.15;
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
        size={0.14}
        color="#D9C7B0"
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const CocktailGlassModel = ({ mouse }) => {
  const group = useRef();

  useFrame(() => {
    if (!group.current) return;
    const targetY = mouse.current.x * 0.3;
    const targetX = mouse.current.y * 0.18;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.05);
  });

  return (
    <group ref={group} position={[0, -0.3, 0]}>
      {/* Dark Granite/Bronze Bar Top */}
      <mesh position={[0, -0.65, 0]} receiveShadow>
        <cylinderGeometry args={[2.4, 2.4, 0.1, 48]} />
        <meshStandardMaterial
          color="#0f0c09"
          roughness={0.15}
          metalness={0.4}
        />
      </mesh>

      {/* Heavy Base of Crystal Rocks Glass */}
      <mesh position={[0, -0.45, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.72, 0.68, 0.3, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.92}
          opacity={1}
          transparent
          roughness={0.08}
          ior={1.52}
          thickness={1.5}
        />
      </mesh>

      {/* Glass Body */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.82, 0.72, 0.8, 32, 1, true]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.94}
          opacity={1}
          transparent
          roughness={0.06}
          ior={1.52}
          thickness={0.8}
        />
      </mesh>

      {/* Crystal Diamond Cut Grooves (Visual Facets) */}
      {[0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4].map((rot, i) => (
        <mesh key={i} position={[0, -0.15, 0]} rotation={[0, rot, 0]}>
          <cylinderGeometry args={[0.74, 0.74, 0.4, 8, 1, true]} />
          <meshStandardMaterial
            color="#D4AF37"
            wireframe
            transparent
            opacity={0.15}
          />
        </mesh>
      ))}

      {/* Rich Amber Bourbon Liquid Cylinder */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.73, 0.67, 0.58, 32]} />
        <meshPhysicalMaterial
          color="#B86E18"
          transmission={0.7}
          roughness={0.1}
          ior={1.38}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Clear Hand-Carved Ice Sphere */}
      <mesh position={[0, -0.05, 0]} castShadow>
        <sphereGeometry args={[0.42, 24, 24]} />
        <meshPhysicalMaterial
          color="#E6F2FF"
          transmission={0.96}
          roughness={0.05}
          ior={1.31}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Wild Cassia Cinnamon Bark Quill Balanced across glass */}
      <group position={[0, 0.55, 0]} rotation={[0.1, 0.4, 0.08]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.07, 0.08, 1.8, 16]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color="#3D2012"
            roughness={0.85}
            metalness={0.02}
          />
        </mesh>
        {/* Torched Charred Tip */}
        <mesh position={[0.85, 0, 0]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial
            color="#140A06"
            roughness={0.95}
          />
        </mesh>
        {/* Orange Peel Twist */}
        <mesh position={[-0.45, 0.05, 0.05]} rotation={[0.5, 0.2, 0.8]}>
          <torusGeometry args={[0.18, 0.04, 12, 18, Math.PI * 1.2]} />
          <meshStandardMaterial
            color="#E8740C"
            roughness={0.3}
          />
        </mesh>
      </group>

      {/* Rising Smoke from Torched Cassia Quill */}
      <CocktailSmoke count={40} />
    </group>
  );
};

export const CocktailGlass3D = () => {
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
        camera={{ position: [0, 1.1, 2.6], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        {/* Amber Backlight (Simulating speakeasy back-bar bottles) */}
        <spotLight
          position={[-3, 4, -2]}
          angle={0.6}
          penumbra={0.8}
          intensity={2.8}
          color="#FF9B26"
        />
        {/* Soft Key Spotlight */}
        <spotLight
          position={[2.5, 3.5, 3]}
          angle={0.4}
          penumbra={0.6}
          intensity={2.0}
          color="#FFF0D4"
          castShadow
        />
        <pointLight position={[0, -0.5, 1.5]} intensity={0.5} color="#D4AF37" />

        <CocktailGlassModel mouse={mouse} />
      </Canvas>
    </div>
  );
};
