import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

const PUBLIC_ROUTES: MetadataRoute.Sitemap = [
  { url: "/", changeFrequency: "weekly", priority: 1 },
  { url: "/services", changeFrequency: "monthly", priority: 0.9 },
  { url: "/how-it-works", changeFrequency: "monthly", priority: 0.8 },
  { url: "/our-warehouse", changeFrequency: "monthly", priority: 0.8 },
  { url: "/about", changeFrequency: "monthly", priority: 0.7 },
  { url: "/get-a-quote", changeFrequency: "monthly", priority: 0.9 },
  { url: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { url: "/terms-and-conditions", changeFrequency: "yearly", priority: 0.3 },
  { url: "/cookie-policy", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.replace(/\/$/, "");

  return PUBLIC_ROUTES.map((entry) => ({
    ...entry,
    url: `${baseUrl}${entry.url}`,
  }));
}
