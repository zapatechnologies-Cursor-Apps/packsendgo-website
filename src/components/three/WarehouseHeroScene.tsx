"use client";

import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "@/components/three/use-reduced-motion";

/**
 * Placeholder Three.js scene boundary for Phase 2.
 * Full warehouse hero implementation follows in Phase 3 using Stitch asset
 * projects/4066494508265032545/screens/d7229de0d31345ecb11e475ae8a1020b
 */
function PlaceholderWarehouse() {
  return (
    <mesh rotation={[0.2, 0.4, 0]}>
      <boxGeometry args={[1.2, 0.8, 1.2]} />
      <meshStandardMaterial color="#d1ff26" wireframe />
    </mesh>
  );
}

type WarehouseHeroSceneProps = {
  className?: string;
};

export function WarehouseHeroScene({ className }: WarehouseHeroSceneProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className={className} aria-hidden>
      <Canvas
        camera={{ position: [2.5, 2, 2.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#121417"]} />
        <ambientLight intensity={0.45} />
        <directionalLight position={[4, 6, 2]} intensity={0.8} />
        <PlaceholderWarehouse />
      </Canvas>
    </div>
  );
}
