"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "@/components/three/use-reduced-motion";
import { cn } from "@/lib/utils";

const WarehouseHeroScene = dynamic(
  () =>
    import("@/components/three/WarehouseHeroScene").then(
      (mod) => mod.WarehouseHeroScene,
    ),
  {
    ssr: false,
    loading: () => <div className="hero-scene-fallback absolute inset-0" aria-hidden />,
  },
);

type WarehouseHeroBoundaryProps = {
  className?: string;
};

export function WarehouseHeroBoundary({
  className,
}: WarehouseHeroBoundaryProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden", className)}
      data-three-boundary="warehouse-hero"
    >
      <div className="hero-scene-fallback absolute inset-0" aria-hidden />
      {!prefersReducedMotion ? (
        <WarehouseHeroScene className="absolute inset-0" />
      ) : null}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent dark:via-background/48"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/80 dark:from-background/20 dark:to-background/72"
        aria-hidden
      />
    </div>
  );
}
