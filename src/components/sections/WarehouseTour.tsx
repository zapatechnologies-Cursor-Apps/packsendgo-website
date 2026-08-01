"use client";

import { useState } from "react";
import { warehouseTourChapters } from "@/lib/homepage-data";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

function WarehouseTourPlaceholder() {
  return (
    <div className="relative min-h-64 md:min-h-[28rem]">
      <svg
        viewBox="0 0 960 480"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id="tour-sky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1f2630" />
            <stop offset="100%" stopColor="#121417" />
          </linearGradient>
          <linearGradient id="tour-floor" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1a2028" />
            <stop offset="100%" stopColor="#252d38" />
          </linearGradient>
        </defs>
        <rect width="960" height="480" fill="url(#tour-sky)" />
        <polygon points="0,300 960,300 960,480 0,480" fill="url(#tour-floor)" />
        <path
          d="M0 300 L480 180 L960 300"
          fill="none"
          stroke="#2e5bff"
          strokeWidth="1.5"
          opacity="0.35"
        />
        {[
          [120, 220, 80, 140],
          [280, 200, 90, 160],
          [420, 185, 95, 170],
          [560, 200, 90, 160],
          [720, 220, 80, 140],
        ].map(([x, y, w, h], index) => (
          <g key={index} opacity="0.7">
            <rect x={x} y={y} width={w} height={h} fill="#2a313b" stroke="#475569" />
            {[0, 1, 2].map((level) => (
              <line
                key={level}
                x1={x + 6}
                y1={y + 24 + level * 34}
                x2={x + w - 6}
                y2={y + 24 + level * 34}
                stroke="#475569"
                strokeWidth="1"
              />
            ))}
          </g>
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
          <line
            key={`grid-${index}`}
            x1={120 + index * 90}
            y1="300"
            x2={240 + index * 75}
            y2="480"
            stroke="#343b46"
            strokeWidth="1"
            opacity="0.55"
          />
        ))}
        <path
          d="M300 360 H660"
          stroke="#d1ff26"
          strokeWidth="2.5"
          opacity="0.75"
          fill="none"
        />
        <circle cx="300" cy="360" r="5" fill="#d1ff26" />
        <circle cx="480" cy="360" r="5" fill="#d1ff26" />
        <circle cx="660" cy="360" r="5" fill="#d1ff26" />
      </svg>

      <div className="relative z-10 flex min-h-64 flex-col items-center justify-center px-6 py-10 text-center md:min-h-[28rem]">
        <div className="absolute top-4 right-4 rounded-sm border border-outline/25 bg-surface-container/50 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-on-surface-variant uppercase backdrop-blur-sm">
          Placeholder media
        </div>
        <div
          className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-outline/30 bg-surface-container/60 backdrop-blur-sm"
          aria-hidden
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-on-surface" aria-hidden>
            <path
              d="M8 5v14l11-7L8 5Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <p className="text-xs font-semibold tracking-[0.16em] text-cobalt uppercase">
          360° experience
        </p>
        <p className="mt-3 max-w-md font-display text-xl font-semibold text-on-surface md:text-2xl">
          Real PackSendGo warehouse media will be added here.
        </p>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-on-surface-variant">
          This frame is reserved for future real warehouse photography, guided
          video, Matterport or 360-degree walkthrough content. Generated imagery
          is not presented as PackSendGo&apos;s real facility.
        </p>
      </div>
    </div>
  );
}

export function WarehouseTour() {
  const [activeChapter, setActiveChapter] = useState<
    (typeof warehouseTourChapters)[number]
  >(warehouseTourChapters[0]);

  return (
    <section
      id="warehouse-tour"
      className="border-t border-outline/10 bg-background py-section-gap-mobile md:py-24"
      aria-labelledby="warehouse-tour-heading"
    >
      <Container>
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            title="Tour our warehouse"
            description="See where your products will live."
          />
          <button
            type="button"
            disabled
            aria-disabled="true"
            className={cn(
              "inline-flex min-h-11 items-center justify-center bg-signal-lime px-5 text-sm font-semibold",
              "text-midnight-graphite opacity-90 md:mb-2",
            )}
          >
            Enter the virtual tour
          </button>
        </div>

        <div className="overflow-hidden border border-outline/20 bg-deep-charcoal">
          <div
            role="img"
            aria-label="Deliberate warehouse tour placeholder. Real PackSendGo warehouse media will be added here."
          >
            <WarehouseTourPlaceholder />
          </div>

          <div className="flex flex-wrap gap-2 border-t border-outline/15 p-4">
            <span className="mr-2 self-center text-xs font-semibold tracking-[0.12em] text-cobalt uppercase">
              360° experience
            </span>
            {warehouseTourChapters.map((chapter) => (
              <button
                key={chapter}
                type="button"
                onClick={() => setActiveChapter(chapter)}
                aria-pressed={activeChapter === chapter}
                className={cn(
                  "min-h-11 px-3 py-2 text-xs font-semibold tracking-[0.08em] uppercase",
                  activeChapter === chapter
                    ? "bg-signal-lime text-midnight-graphite"
                    : "border border-outline/20 text-on-surface-variant hover:text-on-surface",
                )}
              >
                {chapter}
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
