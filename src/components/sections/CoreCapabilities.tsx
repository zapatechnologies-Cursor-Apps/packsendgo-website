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

        <div className="grid gap-10 lg:grid-cols-12">
          <div
            className="flex flex-col gap-2 lg:col-span-4"
            role="tablist"
            aria-label="Core capabilities"
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
                    "min-h-11 border-l-2 px-4 py-3 text-left transition-colors",
                    selected
                      ? "border-signal-lime bg-surface-container/40 text-on-surface"
                      : "border-transparent text-on-surface-variant hover:bg-surface-container/20 hover:text-on-surface",
                  )}
                >
                  {item.title}
                </button>
              );
            })}
          </div>

          <div
            id={`capability-panel-${active.id}`}
            role="tabpanel"
            aria-labelledby={`capability-tab-${active.id}`}
            className="lg:col-span-8"
          >
            <div className="grid overflow-hidden border border-outline/20 bg-deep-charcoal md:grid-cols-2">
              <div className="flex flex-col justify-center p-8 md:p-10">
                <div className="mb-4 h-px w-16 bg-cobalt" aria-hidden />
                <h3 className="font-display text-2xl font-semibold text-on-surface md:text-3xl">
                  {active.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-on-surface-variant">
                  {active.description}
                </p>
                <div className="mt-6 border border-outline/15 bg-surface-container/50 p-4">
                  <p className="text-xs font-semibold tracking-[0.14em] text-cobalt uppercase">
                    Customer benefit
                  </p>
                  <p className="mt-2 text-sm text-on-surface">{active.benefit}</p>
                </div>
                <Link
                  href={active.href}
                  className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-signal-lime hover:underline"
                >
                  Explore this service
                </Link>
              </div>
              <div className="relative min-h-56 overflow-hidden border-t border-outline/10 md:min-h-[22rem] md:border-t-0 md:border-l">
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
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-deep-charcoal/35 via-transparent to-transparent"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 md:hidden">
          {capabilities.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Show ${item.title}`}
              aria-current={index === activeIndex}
              onClick={() => selectIndex(index)}
              className={cn(
                "h-2.5 w-2.5 rounded-full",
                index === activeIndex ? "bg-signal-lime" : "bg-outline/40",
              )}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
