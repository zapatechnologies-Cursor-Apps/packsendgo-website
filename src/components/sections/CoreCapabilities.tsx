"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { capabilities } from "@/lib/homepage-data";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const AUTO_INTERVAL_MS = 7000;

export function CoreCapabilities() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  const selectIndex = useCallback((index: number) => {
    setActiveIndex(index);
    setPaused(true);
  }, []);

  useEffect(() => {
    if (paused) return undefined;

    timerRef.current = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % capabilities.length);
    }, AUTO_INTERVAL_MS);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [paused]);

  const active = capabilities[activeIndex];

  return (
    <section
      id="core-capabilities"
      className="border-t border-outline/10 bg-background py-section-gap-mobile md:py-24"
      aria-labelledby="core-capabilities-heading"
    >
      <Container>
        <SectionHeading title="Core Capabilities" />

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="relative w-full min-w-0 overflow-hidden lg:col-span-4">
            <div
              role="tablist"
              aria-label="Core capabilities"
              className={cn(
                "flex w-full max-w-full snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [scrollbar-width:thin]",
                "lg:flex-col lg:gap-2 lg:overflow-visible lg:snap-none lg:pb-0",
                "-mx-margin-mobile px-margin-mobile lg:mx-0 lg:px-0",
              )}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setPaused(false);
                }
              }}
            >
              {capabilities.map((item, index) => {
                const selected = index === activeIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    id={`capability-tab-${item.id}`}
                    aria-selected={selected}
                    aria-controls={`capability-panel-${item.id}`}
                    onClick={() => selectIndex(index)}
                    className={cn(
                      "min-h-11 shrink-0 text-left text-sm transition-colors",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt",
                      "min-w-[10.5rem] max-w-[12rem] snap-start border px-4 py-3 lg:min-w-0 lg:max-w-none lg:snap-align-none lg:border-l-2 lg:border-transparent lg:px-4 lg:py-3",
                      selected
                        ? "border-signal-lime bg-signal-lime font-semibold text-on-lime ring-2 ring-signal-lime/35 lg:border-transparent lg:border-l-signal-lime lg:bg-surface-container/40 lg:font-normal lg:text-on-surface lg:ring-0"
                        : "border-outline/30 bg-surface-panel font-medium text-on-surface hover:border-outline/50 lg:border-transparent lg:bg-transparent lg:font-normal lg:text-on-surface-variant lg:hover:bg-surface-container/20 lg:hover:text-on-surface",
                    )}
                  >
                    {item.title}
                  </button>
                );
              })}
            </div>
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent lg:hidden"
              aria-hidden
            />
          </div>

          <div
            id={`capability-panel-${active.id}`}
            role="tabpanel"
            aria-labelledby={`capability-tab-${active.id}`}
            className="lg:col-span-8"
          >
            <div className="grid overflow-hidden border border-outline/20 bg-surface-panel shadow-elevated md:grid-cols-2">
              <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
                <div className="mb-3 h-px w-16 bg-cobalt md:mb-4" aria-hidden />
                <h3 className="font-display text-2xl font-semibold text-on-surface md:text-3xl">
                  {active.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-on-surface-variant md:mt-4">
                  {active.description}
                </p>
                <div className="mt-4 border border-outline/15 bg-surface-container/50 p-3 md:mt-6 md:p-4">
                  <p className="text-xs font-semibold tracking-[0.14em] text-cobalt uppercase">
                    Customer benefit
                  </p>
                  <p className="mt-2 text-sm text-on-surface">{active.benefit}</p>
                </div>
                <Link
                  href={active.href}
                  className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-signal-lime hover:underline md:mt-6"
                >
                  Explore this service
                </Link>
              </div>
              <div className="relative min-h-48 overflow-hidden border-t border-outline/10 md:min-h-[22rem] md:border-t-0 md:border-l">
                {capabilities.map((item, index) => (
                  <Image
                    key={item.id}
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={cn(
                      "object-cover transition-opacity duration-500 motion-reduce:transition-none",
                      index === activeIndex ? "opacity-100" : "opacity-0",
                    )}
                    style={{ objectPosition: item.objectPosition }}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                ))}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-overlay/35 via-transparent to-transparent"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
