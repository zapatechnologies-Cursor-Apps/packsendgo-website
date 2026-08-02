export const capabilities = [
  {
    id: "ecommerce-fulfilment",
    title: "Ecommerce fulfilment",
    description:
      "End-to-end order handling from inbound stock to customer delivery, aligned to your sales channels and growth plans.",
    benefit: "Clearer operational control as order volumes increase.",
    href: "/services#ecommerce-fulfilment",
    image: "/images/homepage/capability-ecommerce-fulfilment.jpg",
    imageAlt:
      "Warehouse team preparing boxed orders and pallets for fulfilment",
    objectPosition: "center 35%",
  },
  {
    id: "warehousing-storage",
    title: "Warehousing and storage",
    description:
      "Structured storage for your products with receiving, indexing and stock organisation suited to your catalogue.",
    benefit: "More predictable stock handling without fixed warehouse overheads.",
    href: "/services#warehousing-storage",
    image: "/images/homepage/capability-warehousing-storage.jpg",
    imageAlt: "Organised warehouse shelving holding boxed stock and pallets",
    objectPosition: "center center",
  },
  {
    id: "pick-and-pack",
    title: "Pick and pack",
    description:
      "Accurate picking and careful packing tailored to your products, packaging requirements and dispatch standards.",
    benefit: "Consistent presentation and fewer handling errors at dispatch.",
    href: "/services#pick-and-pack",
    image: "/images/homepage/capability-pick-and-pack.jpg",
    imageAlt:
      "Hands sorting and preparing inventory at a warehouse packing station",
    objectPosition: "center 40%",
  },
  {
    id: "parcel-dispatch",
    title: "Parcel dispatch",
    description:
      "Reliable parcel dispatch with agreed cut-offs, carrier selection and delivery coverage confirmed during onboarding.",
    benefit: "A clearer dispatch rhythm for your customer promise.",
    href: "/services#parcel-dispatch",
    image: "/images/homepage/capability-parcel-dispatch.jpg",
    imageAlt:
      "Delivery team loading boxed parcels into a dispatch vehicle",
    objectPosition: "center 45%",
  },
  {
    id: "returns-processing",
    title: "Returns processing",
    description:
      "Structured returns handling with inspection, restocking or disposal workflows agreed for your operation.",
    benefit: "More controlled returns without disrupting fulfilment flow.",
    href: "/services#returns-processing",
    image: "/images/homepage/capability-returns-processing.jpg",
    imageAlt:
      "Warehouse worker inspecting boxed parcels during stock processing",
    objectPosition: "center 40%",
  },
] as const;

export const warehouseTourImage = {
  src: "/images/homepage/warehouse-tour-placeholder.jpg",
  alt: "Wide warehouse aisle with tall shelving and organised stock",
  objectPosition: "center center",
} as const;

export const processStages = [
  {
    id: "plan",
    title: "Plan your setup",
    description: "We review your products, channels and operational requirements.",
  },
  {
    id: "send",
    title: "Send us your stock",
    description: "Your inventory arrives at our warehouse ready for processing.",
  },
  {
    id: "store",
    title: "We receive and store",
    description: "Goods are checked, indexed and stored in agreed locations.",
  },
  {
    id: "pick-pack",
    title: "We pick and pack",
    description: "Orders are picked, packed and prepared for dispatch.",
  },
  {
    id: "dispatch",
    title: "We dispatch",
    description: "Parcels leave our facility through your agreed delivery setup.",
  },
] as const;

export const salesChannels = [
  "Shopify",
  "WooCommerce",
  "Amazon",
  "eBay",
  "TikTok Shop",
  "Etsy",
] as const;

export const customerCategories = [
  {
    id: "launching",
    label: "Launching and growing ecommerce brands",
    description:
      "Structured fulfilment support as you move from early traction to sustained growth.",
  },
  {
    id: "marketplace",
    label: "Marketplace and multichannel sellers",
    description:
      "Operational handling for businesses selling across more than one channel.",
  },
  {
    id: "subscription",
    label: "Subscription and repeat-order businesses",
    description:
      "Repeatable pick, pack and dispatch workflows for recurring customer orders.",
  },
  {
    id: "wholesale",
    label: "Importers, wholesalers and established retailers",
    description:
      "Fulfilment planning for established product ranges and higher-volume operations.",
  },
] as const;

export const operationalCommitments = [
  {
    title: "Storage plan",
    description: "Confirmed after reviewing your products and stock profile.",
  },
  {
    title: "Dispatch cut-off",
    description: "Agreed as part of your operational proposal.",
  },
  {
    title: "Accuracy controls",
    description: "Documented checking and packing procedures.",
  },
  {
    title: "Delivery coverage",
    description: "UK delivery as the primary service. European delivery by arrangement.",
  },
  {
    title: "Security",
    description: "Warehouse and handling procedures confirmed during onboarding.",
  },
  {
    title: "Insurance",
    description: "Relevant cover and responsibilities clarified before service begins.",
  },
] as const;

export const warehouseTourChapters = [
  "Goods in",
  "Storage",
  "Picking",
  "Packing",
  "Dispatch",
  "Returns",
] as const;
