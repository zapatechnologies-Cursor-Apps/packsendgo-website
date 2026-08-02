import { capabilities, operationalCommitments, warehouseTourChapters } from "@/lib/homepage-data";

export const servicePageIntro =
  "PackSendGo provides structured ecommerce fulfilment services that can be combined to match your products, order volumes and sales channels. Each capability below is agreed during onboarding rather than sold as a fixed package.";

export const serviceDetails = capabilities.map((item) => ({
  ...item,
  detail:
    item.id === "ecommerce-fulfilment"
      ? "We handle inbound stock, order processing, picking, packing and dispatch as one coordinated operation. Channel requirements and growth plans are reviewed during setup so the workflow fits how you sell."
      : item.id === "warehousing-storage"
        ? "Products are received, checked and stored in agreed locations with indexing suited to your catalogue. Storage arrangements are confirmed after reviewing your stock profile."
        : item.id === "pick-and-pack"
          ? "Orders are picked against agreed procedures and packed to your packaging standards. Checking steps are documented as part of your operational proposal."
          : item.id === "parcel-dispatch"
            ? "Parcels are prepared for dispatch through your agreed carrier setup. Cut-off times and delivery coverage are confirmed during onboarding, not assumed in advance."
            : "Returned items are processed using workflows agreed for your operation, including inspection, restocking or disposal routes where applicable.",
  suitedTo:
    item.id === "ecommerce-fulfilment"
      ? "Growing online brands that need end-to-end order handling without building in-house warehouse capacity."
      : item.id === "warehousing-storage"
        ? "Businesses that need structured storage and stock organisation alongside or ahead of dispatch volumes."
        : item.id === "pick-and-pack"
          ? "Brands with consistent order flow that require reliable picking and careful presentation at dispatch."
          : item.id === "parcel-dispatch"
            ? "Sellers who need a clear dispatch rhythm with UK delivery as the primary service."
            : "Multichannel and direct-to-consumer brands that need returns handled without disrupting fulfilment.",
}));

export const servicesTogetherCopy =
  "Most clients combine storage, pick and pack, dispatch and returns into one fulfilment plan. We review your products, channels and volumes first, then agree which services apply and how they connect in practice.";

export const customerJourneyStages = [
  {
    id: "tell-us",
    step: 1,
    title: "Tell us what you need",
    summary: "Share your products, order volumes, sales channels and operational requirements.",
    detail:
      "Complete the quotation form with as much detail as you can. There is no account to create and no instant or binding pricing. We use your answers to understand whether PackSendGo is a practical fit.",
    customerProvides: "Product profile, channel mix, estimated volumes and any specific handling needs.",
    packSendGoHandles: "Initial review of requirements and clarification of next steps.",
  },
  {
    id: "quotation",
    step: 2,
    title: "Receive and approve the quotation",
    summary: "We review your requirements and respond with a tailored proposal.",
    detail:
      "Our team assesses your enquiry and prepares a proposal covering the services, storage approach and dispatch setup that suit your business. You approve the plan before stock is sent.",
    customerProvides: "Follow-up information if we need clarification on products or channels.",
    packSendGoHandles: "Tailored proposal preparation and agreement of operational scope.",
  },
  {
    id: "send-stock",
    step: 3,
    title: "Send stock to the warehouse",
    summary: "Your inventory arrives ready for receiving and indexing.",
    detail:
      "Once the plan is agreed, you send stock according to the receiving instructions provided during onboarding. Goods-in procedures are confirmed before your first delivery.",
    customerProvides: "Stock deliveries aligned to agreed receiving arrangements.",
    packSendGoHandles: "Receiving preparation and goods-in coordination.",
  },
  {
    id: "store-pick-pack",
    step: 4,
    title: "Stock is stored, picked and packed",
    summary: "Goods are checked, stored and prepared for dispatch to your standards.",
    detail:
      "Inbound stock is checked and indexed, then stored in agreed locations. Orders are picked and packed using documented procedures suited to your products and packaging requirements.",
    customerProvides: "Order data through agreed channels and any packaging materials where applicable.",
    packSendGoHandles: "Storage, picking, packing and accuracy controls.",
  },
  {
    id: "dispatch-returns",
    step: 5,
    title: "Parcels are dispatched and returns handled",
    summary: "Orders leave through your agreed delivery setup; returns follow agreed workflows.",
    detail:
      "Parcels are dispatched through carriers and cut-offs agreed during onboarding. Returns are processed using workflows confirmed for your operation, including inspection and restocking routes where applicable.",
    customerProvides: "Channel updates and returns instructions aligned to your customer policy.",
    packSendGoHandles: "Dispatch preparation, carrier handover and structured returns processing.",
  },
] as const;

export const warehouseAreas = [
  {
    id: "storage",
    title: "Storage and stock organisation",
    description:
      "Products are received, checked and stored in agreed locations with indexing suited to your catalogue. Storage plans are confirmed after reviewing your stock profile rather than assumed in advance.",
    chapter: warehouseTourChapters[1],
  },
  {
    id: "picking-packing",
    title: "Picking and packing environment",
    description:
      "Orders are picked against documented procedures and packed to your packaging standards. Checking steps are agreed during onboarding to support consistent presentation at dispatch.",
    chapter: warehouseTourChapters[2],
  },
  {
    id: "parcel-prep",
    title: "Parcel preparation",
    description:
      "Packed orders are prepared for carrier collection with labelling and documentation aligned to your dispatch setup. Procedures are confirmed before service begins.",
    chapter: warehouseTourChapters[3],
  },
  {
    id: "dispatch",
    title: "Dispatch operations",
    description:
      "Parcels leave through carriers and cut-off times agreed during onboarding. UK delivery is the primary service; European delivery is available by arrangement.",
    chapter: warehouseTourChapters[4],
  },
  {
    id: "returns",
    title: "Returns handling",
    description:
      "Returned items are processed using workflows agreed for your operation, including inspection, restocking or disposal routes where applicable.",
    chapter: warehouseTourChapters[5],
  },
] as const;

export const warehouseStandards = [
  "Receiving and indexing procedures agreed before first stock delivery",
  "Documented picking and packing checks",
  "Dispatch cut-offs confirmed in your operational proposal",
  "Returns workflows defined during onboarding",
  "Security and handling procedures confirmed before service begins",
] as const;

export const aboutIntro =
  "PackSendGo is a fulfilment partner focused on practical ecommerce operations for growing brands. We combine warehousing, pick and pack, dispatch and returns into clear service plans agreed during onboarding.";

export const aboutThemes = [
  {
    title: "Ecommerce fulfilment focus",
    description:
      "Our work centres on storing products, processing orders, picking and packing, and dispatching parcels for online sellers. The website explains the operation; the quotation form starts the conversation.",
  },
  {
    title: "Support for growing brands",
    description:
      "We work with launching brands, marketplace sellers, subscription businesses and established retailers who need structured fulfilment without building in-house warehouse teams.",
  },
  {
    title: "Clear and straightforward operations",
    description:
      "Services, cut-offs, storage plans and delivery coverage are agreed in writing before stock arrives. We avoid vague promises and confirm what applies to your business.",
  },
  {
    title: "Flexible service combination",
    description:
      "Capabilities can be combined into one fulfilment plan or scoped individually where that suits your operation. The right setup is agreed after reviewing your products and channels.",
  },
  {
    title: "Human-operated fulfilment",
    description:
      "Orders are handled by warehouse teams using documented procedures. There is no customer self-service portal or live inventory dashboard in the current website release.",
  },
] as const;

export const aboutPrinciples = operationalCommitments;
