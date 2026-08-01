"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const WarehouseHeroScene = dynamic(
  () =>
    import("@/components/three/WarehouseHeroScene").then(
      (mod) => mod.WarehouseHeroScene,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-midnight-graphite" aria-hidden />
    ),
  },
);

type WarehouseHeroBoundaryProps = {
  className?: string;
};

export function WarehouseHeroBoundary({
  className,
}: WarehouseHeroBoundaryProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateVisibility = () => {
      setIsVisible(!media.matches);
    };

    updateVisibility();
    media.addEventListener("change", updateVisibility);

    return () => media.removeEventListener("change", updateVisibility);
  }, []);

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden", className)}
      data-three-boundary="warehouse-hero"
    >
      <div
        className="absolute inset-0 bg-midnight-graphite"
        aria-hidden
      />
      {isVisible ? (
        <WarehouseHeroScene className="absolute inset-0 h-full w-full" />
      ) : null}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-midnight-graphite/30 via-midnight-graphite/55 to-background"
        aria-hidden
      />
    </div>
  );
}
