"use client";

import { useState } from "react";
import { processStages } from "@/lib/homepage-data";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="how-it-works"
      className="border-t border-outline/10 bg-surface-container py-section-gap-mobile md:py-20"
      aria-labelledby="how-it-works-heading"
    >
      <Container>
        <SectionHeading
          title="How PackSendGo works"
          description="A clear path from stock arrival to customer delivery."
          align="center"
        />

        <div className="hidden md:block">
          <div className="relative mx-auto max-w-5xl">
            <div
              className="absolute top-5 right-0 left-0 h-px bg-cobalt/30"
              aria-hidden
            />
            <ol className="grid grid-cols-5 gap-4">
              {processStages.map((stage, index) => (
                <li key={stage.id} className="relative text-center">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border",
                      index === activeIndex
                        ? "border-signal-lime bg-signal-lime text-on-lime"
                        : "border-cobalt/40 bg-background text-on-surface",
                    )}
                    aria-current={index === activeIndex ? "step" : undefined}
                  >
                    <span className="sr-only">{stage.title}</span>
                    <span aria-hidden className="h-2 w-2 rounded-full bg-current" />
                  </button>
                  <h3 className="font-display text-lg font-semibold text-on-surface">
                    {stage.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                    {stage.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="space-y-3 md:hidden">
          {processStages.map((stage, index) => {
            const expanded = index === activeIndex;
            return (
              <div key={stage.id} className="border border-outline/20 bg-background">
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setActiveIndex(index)}
                  className="flex min-h-11 w-full items-center justify-between px-4 py-3 text-left"
                >
                  <span className="font-medium text-on-surface">{stage.title}</span>
                  <span aria-hidden className="text-on-surface-variant">
                    {expanded ? "−" : "+"}
                  </span>
                </button>
                {expanded ? (
                  <p className="border-t border-outline/15 px-4 py-3 text-sm text-on-surface-variant">
                    {stage.description}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
