"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { capabilities } from "@/lib/homepage-data";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const AUTO_INTERVAL_MS = 7000;

type CapabilityId = (typeof capabilities)[number]["id"];

function CapabilityDiagram({ id }: { id: CapabilityId }) {
  const shared = "transition-opacity duration-500 motion-reduce:transition-none";

  return (
    <svg
      viewBox="0 0 420 320"
      className="h-full w-full"
      role="img"
      aria-hidden
    >
      <defs>
        <linearGradient id="cap-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(46,91,255,0.14)" />
          <stop offset="100%" stopColor="rgba(18,20,23,0.92)" />
        </linearGradient>
      </defs>
      <rect width="420" height="320" fill="url(#cap-bg)" />

      {id === "ecommerce-fulfilment" && (
        <g className={shared}>
          <rect x="36" y="58" width="88" height="52" rx="2" fill="#2a313b" stroke="#475569" />
          <text x="80" y="90" fill="#94a3b8" fontSize="11" textAnchor="middle">
            Channel
          </text>
          <path d="M124 84 H176" stroke="#2e5bff" strokeWidth="2" />
          <rect x="176" y="58" width="88" height="52" rx="2" fill="#2a313b" stroke="#475569" />
          <text x="220" y="90" fill="#94a3b8" fontSize="11" textAnchor="middle">
            Shelf
          </text>
          <path d="M264 84 H316" stroke="#2e5bff" strokeWidth="2" />
          <rect x="316" y="68" width="56" height="36" rx="2" fill="#d1ff26" fillOpacity="0.85" />
          <path d="M80 130 V170" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M220 130 V170" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M344 130 V170" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 4" />
          <path
            d="M80 190 H344"
            stroke="#d1ff26"
            strokeWidth="2.5"
            fill="none"
            opacity="0.9"
          />
          <circle cx="80" cy="190" r="4" fill="#d1ff26" />
          <circle cx="220" cy="190" r="4" fill="#d1ff26" />
          <circle cx="344" cy="190" r="4" fill="#d1ff26" />
        </g>
      )}

      {id === "warehousing-storage" && (
        <g className={shared}>
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2, 3].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={48 + col * 78}
                y={52 + row * 58}
                width="62"
                height="42"
                rx="1"
                fill="#2a313b"
                stroke="#475569"
                strokeWidth="1"
              />
            )),
          )}
          {[
            [86, 92],
            [164, 92],
            [242, 150],
            [320, 150],
            [86, 208],
            [242, 208],
          ].map(([x, y], index) => (
            <rect
              key={`carton-${index}`}
              x={x}
              y={y}
              width="28"
              height="20"
              rx="1"
              fill="#5c6775"
              stroke="#94a3b8"
              strokeWidth="0.75"
            />
          ))}
          <path
            d="M48 268 H372"
            stroke="#2e5bff"
            strokeWidth="2"
            opacity="0.75"
          />
        </g>
      )}

      {id === "pick-and-pack" && (
        <g className={shared}>
          <rect x="40" y="48" width="120" height="180" rx="2" fill="#2a313b" stroke="#475569" />
          {[0, 1, 2, 3, 4].map((level) => (
            <line
              key={level}
              x1="48"
              y1={72 + level * 32}
              x2="152"
              y2={72 + level * 32}
              stroke="#475569"
            />
          ))}
          <rect x="68" y="88" width="36" height="24" fill="#5c6775" />
          <rect x="68" y="152" width="36" height="24" fill="#5c6775" />
          <path
            d="M160 140 H220"
            stroke="#d1ff26"
            strokeWidth="2.5"
            fill="none"
          />
          <circle cx="160" cy="140" r="4" fill="#d1ff26" />
          <rect x="220" y="96" width="150" height="88" rx="2" fill="#343b46" stroke="#64748b" />
          <line x1="230" y1="118" x2="360" y2="118" stroke="#475569" />
          <rect x="268" y="132" width="52" height="36" fill="#d1ff26" fillOpacity="0.85" />
          <text x="295" y="156" fill="#121417" fontSize="10" textAnchor="middle" fontWeight="600">
            Pack
          </text>
        </g>
      )}

      {id === "parcel-dispatch" && (
        <g className={shared}>
          <rect x="48" y="120" width="72" height="52" rx="2" fill="#d1ff26" fillOpacity="0.85" />
          <path
            d="M120 146 H280"
            stroke="#d1ff26"
            strokeWidth="3"
            fill="none"
          />
          <rect x="280" y="108" width="92" height="76" rx="2" fill="#2a313b" stroke="#2e5bff" />
          <text x="326" y="152" fill="#94a3b8" fontSize="11" textAnchor="middle">
            Dispatch
          </text>
          <path
            d="M280 186 H360"
            stroke="#64748b"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
          <polygon points="360,186 352,182 352,190" fill="#64748b" />
        </g>
      )}

      {id === "returns-processing" && (
        <g className={shared}>
          <rect x="48" y="120" width="56" height="44" rx="2" fill="#5c6775" stroke="#94a3b8" />
          <path
            d="M104 142 H180"
            stroke="#d1ff26"
            strokeWidth="2.5"
            fill="none"
          />
          <rect x="180" y="96" width="96" height="92" rx="2" fill="#343b46" stroke="#64748b" />
          <text x="228" y="148" fill="#94a3b8" fontSize="11" textAnchor="middle">
            Inspect
          </text>
          <path
            d="M276 142 H332"
            stroke="#2e5bff"
            strokeWidth="2"
            fill="none"
          />
          <rect x="332" y="48" width="48" height="180" rx="2" fill="#2a313b" stroke="#475569" />
          {[0, 1, 2, 3].map((level) => (
            <rect
              key={level}
              x="342"
              y={68 + level * 38}
              width="28"
              height="22"
              fill="#5c6775"
            />
          ))}
          <path
            d="M180 220 Q210 250 140 250"
            stroke="#64748b"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="4 4"
          />
        </g>
      )}
    </svg>
  );
}

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
              <div
                className="relative min-h-56 overflow-hidden border-t border-outline/10 md:min-h-full md:border-t-0 md:border-l"
                aria-hidden
              >
                <CapabilityDiagram id={active.id} />
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
