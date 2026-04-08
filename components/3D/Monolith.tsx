"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScroll } from "framer-motion";

export default function Monolith() {
  const groupRef = useRef<THREE.Group>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const { scrollY } = useScroll();

  useFrame((state, delta) => {
    if (!groupRef.current || !shellRef.current || !coreRef.current) return;
    
    // Mouse interaction - rotation based on pointer
    const targetX = (state.pointer.x * Math.PI) / 2;
    const targetY = (state.pointer.y * Math.PI) / 2;
    
    groupRef.current.rotation.y += 0.08 * (targetX - groupRef.current.rotation.y);
    groupRef.current.rotation.x += 0.08 * (-targetY - groupRef.current.rotation.x);
    
    // Core spin
    coreRef.current.rotation.y += delta * 0.8;
    coreRef.current.rotation.x += delta * 0.4;

    // Shell independent spin
    shellRef.current.rotation.y -= delta * 0.2;

    // Scroll-driven deconstruction
    const scrollVal = scrollY.get(); // Pixels scrolled
    const deconstructFactor = Math.min(scrollVal / 1000, 1); 

    // Move fragments out
    groupRef.current.children.forEach((child, i) => {
      // Ignore main elements (0 and 1)
      if (i > 1 && child instanceof THREE.Mesh) {
        // Pseudo-random expansion based on index
        const dir = new THREE.Vector3(
          Math.sin(i * 0.5),
          Math.cos(i * 0.7),
          Math.sin(i * 0.9)
        ).normalize();
        
        // Expand outward based on scroll
        const dist = 2 + deconstructFactor * 10;
        child.position.lerp(dir.multiplyScalar(dist), 0.1);
        child.rotation.x += delta * (i % 3);
        child.rotation.y += delta * (i % 5);
      }
    });

    // Expand shell wireframe scale slightly
    const shellScale = 1 + deconstructFactor * 0.5;
    shellRef.current.scale.lerp(new THREE.Vector3(shellScale, shellScale, shellScale), 0.1);
  });

  return (
    <group ref={groupRef}>
      {/* Outer Shell */}
      <mesh ref={shellRef}>
        <octahedronGeometry args={[2, 0]} />
        <meshStandardMaterial 
          color="#000000" 
          metalness={1} 
          roughness={0.2} 
          wireframe={true} 
          emissive="#6D28D9"
          emissiveIntensity={0.8}
        />
      </mesh>
      
      {/* Inner Energy Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshStandardMaterial 
          color="#CCFF00" 
          emissive="#CCFF00" 
          emissiveIntensity={1.5} 
          wireframe={false} 
          transparent={true}
          opacity={0.9}
        />
      </mesh>
      
      {/* Floating Fragments */}
      {Array.from({ length: 15 }).map((_, i) => (
        <mesh 
          key={i} 
          position={[0, 0, 0]}
        >
          <tetrahedronGeometry args={[0.15, 0]} />
          <meshBasicMaterial color={i % 2 === 0 ? "#CCFF00" : "#6D28D9"} />
        </mesh>
      ))}
    </group>
  );
}
