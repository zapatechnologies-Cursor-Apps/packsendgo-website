"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { WarehouseSceneContent } from "@/components/three/WarehouseSceneContent";
import { useReducedMotion } from "@/components/three/use-reduced-motion";
import { cn } from "@/lib/utils";

type WarehouseHeroSceneProps = {
  className?: string;
};

export function WarehouseHeroScene({ className }: WarehouseHeroSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setPaused(!entry.isIntersecting || document.hidden);
      },
      { threshold: 0.08 },
    );

    observer.observe(node);

    const handleVisibility = () => {
      setPaused(document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  if (prefersReducedMotion) {
    return (
      <div
        className={cn("hero-scene-fallback", className)}
        aria-hidden
      />
    );
  }

  return (
    <div ref={containerRef} className={cn("h-full w-full", className)} aria-hidden>
      <Suspense fallback={<div className="hero-scene-fallback h-full w-full" aria-hidden />}>
        <Canvas
          camera={{ position: [10, 8, 12], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.12;
          }}
        >
          <WarehouseSceneContent paused={paused} />
        </Canvas>
      </Suspense>
    </div>
  );
}
