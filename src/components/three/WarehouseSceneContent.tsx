"use client";

import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { useEffect, useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/components/three/use-reduced-motion";

const ROUTE_Y = 0.14;

const ROUTE_POINTS: [number, number, number][] = [
  [-10, ROUTE_Y, 5],
  [-2, ROUTE_Y, 5],
  [-2, ROUTE_Y, 0],
  [2, ROUTE_Y, 0],
  [2, ROUTE_Y, -5],
  [10, ROUTE_Y, -5],
];

const rackPositions: [number, number][] = [];
for (let i = -2; i <= 2; i += 1) {
  for (let j = -2; j <= 2; j += 1) {
    if (Math.abs(i) + Math.abs(j) > 1) {
      rackPositions.push([i * 3.5, j * 2.5]);
    }
  }
}

function WarehouseRack({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {[
        [-0.95, 0.45],
        [0.95, 0.45],
        [-0.95, -0.45],
        [0.95, -0.45],
      ].map(([x, z], index) => (
        <mesh key={`pillar-${index}`} position={[x, 1.5, z]}>
          <boxGeometry args={[0.1, 3, 0.1]} />
          <meshStandardMaterial color="#4d5866" metalness={0.18} roughness={0.58} />
        </mesh>
      ))}
      {[0, 1, 2].map((level) => (
        <group key={`level-${level}`}>
          <mesh position={[0, level + 0.5, 0]}>
            <boxGeometry args={[2, 0.05, 1]} />
            <meshStandardMaterial color="#434c59" metalness={0.12} roughness={0.62} />
          </mesh>
          {[-1, 0, 1].map((offset) => (
            <mesh key={`box-${level}-${offset}`} position={[offset * 0.6, level + 0.7, 0]}>
              <boxGeometry args={[0.5, 0.4, 0.6]} />
              <meshStandardMaterial color="#6d7888" metalness={0.08} roughness={0.74} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function FloorGrid() {
  const lines = useMemo(() => {
    const gridLines: [number, number, number][][] = [];
    for (let x = -9; x <= 9; x += 2) {
      gridLines.push([
        [x, 0.02, -9],
        [x, 0.02, 9],
      ]);
    }
    for (let z = -9; z <= 9; z += 2) {
      gridLines.push([
        [-9, 0.02, z],
        [9, 0.02, z],
      ]);
    }
    return gridLines;
  }, []);

  return (
    <>
      {lines.map((points, index) => (
        <Line
          key={`grid-${index}`}
          points={points}
          color="#3d4856"
          lineWidth={1}
          transparent
          opacity={0.68}
        />
      ))}
      <Line
        points={[
          [-10, 0.03, 5],
          [10, 0.03, 5],
        ]}
        color="#4f5a68"
        lineWidth={1.5}
        transparent
        opacity={0.82}
      />
      <Line
        points={[
          [-2, 0.03, 5],
          [-2, 0.03, -5],
        ]}
        color="#4f5a68"
        lineWidth={1.5}
        transparent
        opacity={0.82}
      />
      <Line
        points={[
          [2, 0.03, 5],
          [2, 0.03, -5],
        ]}
        color="#4f5a68"
        lineWidth={1.5}
        transparent
        opacity={0.82}
      />
    </>
  );
}

function MovingParcel({ paused }: { paused: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const progressRef = useRef(0);
  const points = useMemo(
    () => ROUTE_POINTS.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
    [],
  );

  useFrame((_, delta) => {
    if (paused || !meshRef.current) return;

    progressRef.current += delta * 0.12;
    if (progressRef.current > 1) progressRef.current = 0;

    const scaled = progressRef.current * (points.length - 1);
    const segment = Math.floor(scaled);
    const t = scaled - segment;
    const start = points[segment];
    const end = points[Math.min(segment + 1, points.length - 1)];

    if (start && end) {
      meshRef.current.position.lerpVectors(start, end, t);
      meshRef.current.position.y = ROUTE_Y + 0.22;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[0.52, 0.36, 0.52]} />
      <meshStandardMaterial
        color="#d1ff26"
        emissive="#b8e622"
        emissiveIntensity={0.45}
        metalness={0.08}
        roughness={0.35}
      />
    </mesh>
  );
}

function SceneParallax({
  paused,
  children,
}: {
  paused: boolean;
  children: ReactNode;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 0.06;
      pointer.current.y = (event.clientY / window.innerHeight - 0.5) * 0.03;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(() => {
    if (paused || !groupRef.current) return;
    groupRef.current.rotation.y = pointer.current.x;
    groupRef.current.rotation.x = -pointer.current.y;
  });

  return <group ref={groupRef}>{children}</group>;
}

type WarehouseSceneContentProps = {
  paused: boolean;
};

export function WarehouseSceneContent({ paused }: WarehouseSceneContentProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <SceneParallax paused={paused}>
      <color attach="background" args={["#1a2028"]} />
      <ambientLight intensity={0.9} color="#9aa8ba" />
      <hemisphereLight args={["#5c7090", "#181c24", 0.68]} />
      <directionalLight
        position={[8, 14, 6]}
        intensity={1.35}
        color="#e8edf5"
      />
      <directionalLight
        position={[-6, 10, -4]}
        intensity={0.42}
        color="#8899aa"
      />
      <pointLight position={[6, 8, 4]} intensity={1.15} color="#3d6bff" />
      <pointLight position={[-4, 6, -2]} intensity={0.62} color="#98a8b8" />
      <spotLight
        position={[-8, 16, 8]}
        angle={Math.PI / 5}
        intensity={1.05}
        color="#ffffff"
        penumbra={0.45}
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[22, 22]} />
        <meshStandardMaterial color="#262e38" metalness={0.06} roughness={0.86} />
      </mesh>
      <FloorGrid />
      {rackPositions.map(([x, z]) => (
        <WarehouseRack key={`${x}-${z}`} position={[x, 0, z]} />
      ))}
      <Line
        points={ROUTE_POINTS}
        color="#d1ff26"
        lineWidth={5}
        transparent
        opacity={0.35}
      />
      <Line
        points={ROUTE_POINTS}
        color="#d1ff26"
        lineWidth={2.5}
        transparent
        opacity={1}
      />
      <MovingParcel paused={paused} />
    </SceneParallax>
  );
}
