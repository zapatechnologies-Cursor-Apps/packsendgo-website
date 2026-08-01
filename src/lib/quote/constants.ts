export const QUOTE_ROUTE = "/get-a-quote";
export const PRIVACY_POLICY_PATH = "/privacy";
export const QUOTE_DRAFT_STORAGE_KEY = "packsendgo-quote-draft-v1";
export const QUOTE_IDEMPOTENCY_STORAGE_KEY = "packsendgo-quote-idempotency-v1";
export const MAX_QUOTE_PAYLOAD_BYTES = 65536;

export const QUOTE_STEPS = [
  { id: 1, title: "Contact and company" },
  { id: 2, title: "Business and sales channels" },
  { id: 3, title: "Orders and stock" },
  { id: 4, title: "Delivery and additional services" },
  { id: 5, title: "Review and consent" },
] as const;

export const PRODUCT_CATEGORIES = [
  { value: "apparel_and_accessories", label: "Apparel and accessories" },
  { value: "beauty_and_personal_care", label: "Beauty and personal care" },
  { value: "home_and_lifestyle", label: "Home and lifestyle" },
  { value: "electronics_and_accessories", label: "Electronics and accessories" },
  { value: "books_stationery_and_printed", label: "Books, stationery and printed products" },
  { value: "toys_games_and_hobbies", label: "Toys, games and hobbies" },
  { value: "sports_and_fitness", label: "Sports and fitness products" },
  { value: "pet_products", label: "Pet products" },
  { value: "subscription_boxes", label: "Subscription boxes" },
  { value: "general_merchandise", label: "General merchandise" },
  { value: "other", label: "Other" },
] as const;

export const REQUIRED_START_DATES = [
  { value: "asap", label: "As soon as possible" },
  { value: "within_2_weeks", label: "Within 2 weeks" },
  { value: "within_1_month", label: "Within 1 month" },
  { value: "within_1_3_months", label: "Within 1–3 months" },
  { value: "more_than_3_months", label: "More than 3 months" },
  { value: "exploring", label: "Just exploring" },
] as const;

export const PREFERRED_CONTACT_METHODS = [
  { value: "email", label: "Email" },
  { value: "telephone", label: "Telephone" },
  { value: "either", label: "Either" },
] as const;

export const BUSINESS_STAGES = [
  { value: "pre_launch", label: "Pre-launch" },
  { value: "early_stage", label: "Early stage" },
  { value: "growing", label: "Growing" },
  { value: "established", label: "Established" },
  { value: "switching_provider", label: "Switching provider" },
] as const;

export const CURRENT_FULFILMENT = [
  { value: "in_house", label: "In-house" },
  { value: "third_party", label: "Third-party provider" },
  { value: "mixed", label: "Mixed" },
  { value: "not_started", label: "Not yet fulfilment-ready" },
  { value: "not_sure", label: "Not sure" },
] as const;

export const ENQUIRY_REASONS = [
  { value: "cost", label: "Cost efficiency" },
  { value: "growth", label: "Supporting growth" },
  { value: "quality", label: "Service quality" },
  { value: "capacity", label: "Capacity constraints" },
  { value: "new_venture", label: "New venture" },
  { value: "other", label: "Other" },
] as const;

export const SALES_CHANNELS = [
  { value: "shopify", label: "Shopify" },
  { value: "woocommerce", label: "WooCommerce" },
  { value: "amazon", label: "Amazon" },
  { value: "ebay", label: "eBay" },
  { value: "tiktok_shop", label: "TikTok Shop" },
  { value: "etsy", label: "Etsy" },
  { value: "other_marketplace", label: "Other marketplace" },
  { value: "custom_platform", label: "Custom platform" },
] as const;

export const MONTHLY_ORDER_RANGES = [
  { value: "under_100", label: "Under 100" },
  { value: "100_500", label: "100 – 500" },
  { value: "500_2000", label: "500 – 2,000" },
  { value: "2000_10000", label: "2,000 – 10,000" },
  { value: "over_10000", label: "Over 10,000" },
  { value: "not_sure", label: "Not sure" },
] as const;

export const SKU_COUNTS = [
  { value: "under_10", label: "Under 10" },
  { value: "10_50", label: "10 – 50" },
  { value: "50_200", label: "50 – 200" },
  { value: "200_1000", label: "200 – 1,000" },
  { value: "over_1000", label: "Over 1,000" },
  { value: "not_sure", label: "Not sure" },
] as const;

export const ITEMS_PER_ORDER = [
  { value: "1", label: "1 item" },
  { value: "2_3", label: "2 – 3 items" },
  { value: "4_6", label: "4 – 6 items" },
  { value: "7_plus", label: "7 or more" },
  { value: "not_sure", label: "Not sure" },
] as const;

export const SEASONAL_PEAKS = [
  { value: "none", label: "None" },
  { value: "moderate", label: "Moderate" },
  { value: "significant", label: "Significant" },
  { value: "not_sure", label: "Not sure" },
] as const;

export const GROWTH_EXPECTATIONS = [
  { value: "stable", label: "Stable" },
  { value: "moderate_growth", label: "Moderate growth" },
  { value: "rapid_growth", label: "Rapid growth" },
  { value: "not_sure", label: "Not sure" },
] as const;

export const STOCK_VOLUMES = [
  { value: "under_10_pallets", label: "Under 10 pallets" },
  { value: "10_50_pallets", label: "10 – 50 pallets" },
  { value: "50_200_pallets", label: "50 – 200 pallets" },
  { value: "over_200_pallets", label: "Over 200 pallets" },
  { value: "not_sure", label: "Not sure" },
] as const;

export const STORAGE_TYPES = [
  { value: "pallet", label: "Pallet" },
  { value: "shelving", label: "Shelving" },
  { value: "bin", label: "Bin" },
  { value: "mixed", label: "Mixed" },
  { value: "not_sure", label: "Not sure" },
] as const;

export const PRODUCT_WEIGHTS = [
  { value: "light", label: "Light" },
  { value: "medium", label: "Medium" },
  { value: "heavy", label: "Heavy" },
  { value: "mixed", label: "Mixed" },
  { value: "not_sure", label: "Not sure" },
] as const;

export const SPECIAL_HANDLING = [
  { value: "fragile", label: "Fragile" },
  { value: "hazardous", label: "Hazardous (if applicable)" },
  { value: "temperature_sensitive", label: "Temperature-sensitive" },
  { value: "oversized", label: "Oversized" },
  { value: "none", label: "None" },
  { value: "not_sure", label: "Not sure" },
] as const;

export const DELIVERY_REGIONS = [
  { value: "uk", label: "UK" },
  { value: "europe", label: "Europe" },
  { value: "international", label: "International" },
] as const;

export const PARCEL_DIMENSIONS = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
  { value: "mixed", label: "Mixed" },
  { value: "not_sure", label: "Not sure" },
] as const;

export const TRACKING_REQUIRED = [
  { value: "always", label: "Always" },
  { value: "sometimes", label: "Sometimes" },
  { value: "not_required", label: "Not required" },
  { value: "not_sure", label: "Not sure" },
] as const;

export const SPECIAL_COURIER_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
] as const;

export const ADDITIONAL_SERVICES = [
  { value: "branded_packaging", label: "Branded packaging" },
  { value: "inserts", label: "Inserts" },
  { value: "labelling", label: "Labelling" },
  { value: "barcoding", label: "Barcoding" },
  { value: "bundling", label: "Bundling" },
  { value: "returns", label: "Returns" },
  { value: "rework", label: "Rework" },
  { value: "quality_checks", label: "Quality checks" },
  { value: "subscription_box_assembly", label: "Subscription-box assembly" },
  { value: "other", label: "Other" },
] as const;

export const RETURNS_VOLUMES = [
  { value: "under_5_pct", label: "Under 5% of orders" },
  { value: "5_15_pct", label: "5 – 15% of orders" },
  { value: "over_15_pct", label: "Over 15% of orders" },
  { value: "not_sure", label: "Not sure" },
] as const;

export const COUNTRIES = [
  { value: "GB", label: "United Kingdom" },
  { value: "IE", label: "Ireland" },
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "AU", label: "Australia" },
  { value: "NZ", label: "New Zealand" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "NL", label: "Netherlands" },
  { value: "BE", label: "Belgium" },
  { value: "ES", label: "Spain" },
  { value: "IT", label: "Italy" },
  { value: "SE", label: "Sweden" },
  { value: "NO", label: "Norway" },
  { value: "DK", label: "Denmark" },
  { value: "PL", label: "Poland" },
  { value: "CH", label: "Switzerland" },
  { value: "AT", label: "Austria" },
  { value: "PT", label: "Portugal" },
  { value: "AE", label: "United Arab Emirates" },
  { value: "SG", label: "Singapore" },
  { value: "HK", label: "Hong Kong" },
  { value: "OTHER", label: "Other" },
] as const;

export const SUCCESS_HEADLINE =
  "Thank you. Your quotation request has been received.";
export const SUCCESS_SUPPORTING =
  "Our team will review your requirements and contact you shortly.";

export function enumValues<T extends readonly { value: string }[]>(
  options: T,
): [T[number]["value"], ...T[number]["value"][]] {
  const values = options.map((option) => option.value) as Array<T[number]["value"]>;
  return [values[0], ...values.slice(1)];
}

export function labelForValue<T extends readonly { value: string; label: string }[]>(
  options: T,
  value: string | undefined,
): string {
  return options.find((option) => option.value === value)?.label ?? value ?? "";
}
