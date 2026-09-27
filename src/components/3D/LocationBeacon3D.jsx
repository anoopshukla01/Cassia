import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const BeaconRings = () => {
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1.current) {
      ring1.current.scale.setScalar(1 + (t * 0.5 % 1) * 1.5);
      ring1.current.material.opacity = 1 - (t * 0.5 % 1);
    }
    if (ring2.current) {
      ring2.current.scale.setScalar(1 + ((t * 0.5 + 0.33) % 1) * 1.5);
      ring2.current.material.opacity = 1 - ((t * 0.5 + 0.33) % 1);
    }
    if (ring3.current) {
      ring3.current.scale.setScalar(1 + ((t * 0.5 + 0.66) % 1) * 1.5);
      ring3.current.material.opacity = 1 - ((t * 0.5 + 0.66) % 1);
    }
  });

  return (
    <group position={[0, -0.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh ref={ring1}>
        <ringGeometry args={[0.5, 0.55, 36]} />
        <meshBasicMaterial color="#D4AF37" transparent opacity={0.8} />
      </mesh>
      <mesh ref={ring2}>
        <ringGeometry args={[0.5, 0.55, 36]} />
        <meshBasicMaterial color="#D4AF37" transparent opacity={0.6} />
      </mesh>
      <mesh ref={ring3}>
        <ringGeometry args={[0.5, 0.55, 36]} />
        <meshBasicMaterial color="#D4AF37" transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

const LocationPinModel = () => {
  const pinRef = useRef();

  useFrame((state, delta) => {
    if (pinRef.current) {
      pinRef.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      {/* Dark Architectural Stone Pedestal */}
      <mesh position={[0, -0.45, 0]}>
        <cylinderGeometry args={[1.6, 1.8, 0.12, 32]} />
        <meshStandardMaterial color="#0c0a08" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Grid Pattern on Pedestal */}
      <mesh position={[0, -0.38, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.2, 1.5, 32, 4]} />
        <meshBasicMaterial color="#D4AF37" wireframe transparent opacity={0.12} />
      </mesh>

      {/* Animated Radar Rings */}
      <BeaconRings />

      {/* Vertical Golden Light Column */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.02, 0.18, 2.0, 16]} />
        <meshBasicMaterial color="#FFF0D4" transparent opacity={0.25} />
      </mesh>

      {/* Floating 3D Geometric Marker Pin */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
        <group ref={pinRef} position={[0, 0.35, 0]}>
          {/* Top Diamond / Sphere */}
          <mesh position={[0, 0.35, 0]}>
            <octahedronGeometry args={[0.28, 0]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Inner Glowing Core */}
          <mesh position={[0, 0.35, 0]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshBasicMaterial color="#FFF9E6" />
          </mesh>
          {/* Inverted Cone */}
          <mesh position={[0, 0, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.18, 0.45, 16]} />
            <meshStandardMaterial color="#B38E22" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>
      </Float>
    </group>
  );
};

export const LocationBeacon3D = () => {
  return (
    <div className="w-full h-[320px] md:h-[400px] relative">
      <Canvas
        camera={{ position: [0, 1.2, 2.8], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <spotLight
          position={[2, 4, 3]}
          angle={0.5}
          penumbra={0.8}
          intensity={2.0}
          color="#FFF0D4"
        />
        <pointLight position={[0, 0.5, 0]} intensity={1.5} color="#D4AF37" distance={4} />

        <LocationPinModel />
      </Canvas>
    </div>
  );
};
