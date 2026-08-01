export const siteConfig = {
  name: "PackSendGo",
  description:
    "Flexible ecommerce fulfilment, warehousing, pick and pack, and dispatch for growing brands.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  proposition: "From shelf to doorstep, handled.",
  brandLine: "Store. Pack. Send. Grow.",
  primaryCta: "Get a tailored quote",
  secondaryCta: "Tour our warehouse",
} as const;

export const mainNavigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Our Warehouse", href: "/warehouse" },
  { label: "About", href: "/about" },
  { label: "Get a Quote", href: "/get-a-quote" },
] as const;

export const footerNavigation = {
  company: [
    { label: "Services", href: "/services" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Our Warehouse", href: "/warehouse" },
    { label: "About PackSendGo", href: "/about" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Website Terms", href: "/terms" },
  ],
} as const;
