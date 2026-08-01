/**
 * Dark Industrial Elegance design tokens.
 * Authority: assets/de64b70122504dc6b5c12ce0795dddb6
 */
export const designTokens = {
  colours: {
    midnightGraphite: "#121417",
    deepCharcoal: "#1c1f24",
    background: "#101418",
    surfaceContainer: "#1d2025",
    surfaceContainerHigh: "#272a2f",
    warmIvory: "#e1e2e9",
    mutedSteel: "#c6c6ca",
    electricCobalt: "#2e5bff",
    signalLime: "#d1ff26",
    signalLimeBright: "#c6f311",
    cobaltContainer: "#0043eb",
  },
  spacing: {
    containerMax: "1280px",
    gutter: "32px",
    marginDesktop: "80px",
    marginMobile: "24px",
    sectionGap: "160px",
    sectionGapMobile: "80px",
    stackSm: "8px",
    stackMd: "16px",
    stackLg: "24px",
  },
  typography: {
    headlineXl: { size: "72px", lineHeight: "84px", letterSpacing: "-0.02em" },
    headlineXlMobile: {
      size: "40px",
      lineHeight: "48px",
      letterSpacing: "-0.01em",
    },
    bodyLg: { size: "18px", lineHeight: "32px" },
    bodyMd: { size: "16px", lineHeight: "28px" },
  },
} as const;
