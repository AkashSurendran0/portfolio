"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float, PerformanceMonitor } from "@react-three/drei";
import { EffectComposer, ChromaticAberration, Bloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import Monolith from "./Monolith";
import { useState } from "react";
import * as THREE from "three";

export default function HeroScene() {
  const [dpr, setDpr] = useState(1);

  return (
    <div className="absolute inset-0 z-0 h-screen w-full pointer-events-auto">
      <Canvas 
        dpr={dpr} 
        camera={{ position: [0, 0, 6], fov: 50 }} 
      >
        <PerformanceMonitor onDecline={() => setDpr(0.5)} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#CCFF00" />
        <pointLight position={[-10, -10, -5]} intensity={1.5} color="#6D28D9" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <Monolith />
        </Float>
        
        <Environment preset="city" />
        
        <EffectComposer>
          <ChromaticAberration 
            blendFunction={BlendFunction.NORMAL} 
            offset={new THREE.Vector2(0.002, 0.002)} 
          />
          <Bloom 
            luminanceThreshold={0.2} 
            luminanceSmoothing={0.9} 
            height={300} 
            intensity={1.5}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
