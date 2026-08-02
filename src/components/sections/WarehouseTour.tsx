"use client";

import Image from "next/image";
import { useState } from "react";
import { warehouseTourChapters, warehouseTourImage } from "@/lib/homepage-data";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

function WarehouseTourMedia() {
  return (
    <div className="relative min-h-52 md:min-h-[28rem]">
      <Image
        src={warehouseTourImage.src}
        alt={warehouseTourImage.alt}
        fill
        sizes="(max-width: 768px) 100vw, 1200px"
        className="object-cover"
        style={{ objectPosition: warehouseTourImage.objectPosition }}
        loading="lazy"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-overlay/88 via-surface-overlay/40 to-surface-overlay/15"
        aria-hidden
      />
      <div className="relative z-10 flex min-h-52 flex-col items-center justify-center px-5 py-8 text-center md:min-h-[28rem] md:px-6 md:py-10">
        <p className="text-xs font-semibold tracking-[0.16em] text-cobalt uppercase">
          Virtual tour
        </p>
        <p className="mt-3 max-w-md font-display text-xl font-semibold text-on-surface-promo md:text-2xl">
          Guided warehouse walkthrough coming soon
        </p>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-on-surface-promo-variant">
          This section is reserved for future guided video, Matterport or
          360-degree walkthrough content. Photography shown is licensed stock
          imagery representing a warehouse environment, not a specific
          facility.
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
        <div className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-end md:justify-between">
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
              "text-on-lime opacity-90 md:mb-2",
            )}
          >
            Enter the virtual tour
          </button>
        </div>

        <div className="overflow-hidden border border-outline/20 bg-surface-panel shadow-elevated">
          <WarehouseTourMedia />

          <div className="flex flex-wrap gap-2 border-t border-outline/15 p-3 md:p-4">
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
                    ? "bg-signal-lime text-on-lime"
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
