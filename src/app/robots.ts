import type { MetadataRoute } from "next";
import { getSiteMode } from "@/lib/site-mode";

export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  if (getSiteMode() === "preview") {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
  };
}
