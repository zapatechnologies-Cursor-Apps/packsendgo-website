export const LEGAL_LAST_UPDATED = "2 August 2026";

export const packSendGoContact = {
  email: "support@packsendgo.com",
  mailto: "mailto:support@packsendgo.com",
} as const;

export const denzilDealsLtd = {
  legalName: "Denzil Deals Ltd",
  companyNumber: "13240080",
  registeredOffice:
    "River Mill, Park Road, Dukinfield, Cheshire, United Kingdom, SK16 5LR",
  role:
    "PackSendGo customer relationships, quotation enquiries and fulfilment services",
  jurisdiction: "England and Wales",
} as const;

export const zapaTechnologiesLtd = {
  legalName: "Zapa Technologies Ltd",
  companyNumber: "14719144",
  businessAddress: "116–118 Bury New Road, Manchester, M8 8EB",
  role:
    "operates and manages the PackSendGo website and technology platform on behalf of Denzil Deals Ltd",
  relationship:
    "The PackSendGo website and technology platform are operated and managed by Zapa Technologies Ltd on behalf of Denzil Deals Ltd.",
} as const;

export const legalIdentitySummary = {
  operator:
    "PackSendGo is operated by Denzil Deals Ltd. Denzil Deals Ltd is responsible for PackSendGo customer relationships, quotations and fulfilment services.",
  technology:
    "The website and technology platform are operated and managed by Zapa Technologies Ltd on behalf of Denzil Deals Ltd.",
  enquiries: `Customer and privacy enquiries: ${packSendGoContact.email}`,
} as const;

export const infrastructureProviders = {
  hosting: "Hostinger (hosting and MySQL database infrastructure)",
  email: "Resend (transactional email delivery for quotation notifications)",
} as const;

export const browserStorageAudit = {
  sessionStorage: [
    {
      key: "packsendgo-quote-draft-v1",
      purpose:
        "Stores in-progress quotation form answers and step number until submission or browser session ends",
    },
    {
      key: "packsendgo-quote-idempotency-v1",
      purpose:
        "Stores a submission idempotency identifier to help prevent duplicate quotation submissions in the same browser session",
    },
  ],
  localStorage: [
    {
      key: "theme (via next-themes)",
      purpose:
        "Stores your selected Light, Dark or system theme preference for return visits",
    },
  ],
  cookies: {
    applicationSet: false,
    analytics: false,
    advertising: false,
  },
} as const;

export const legalReviewNotice =
  "Independent legal review is recommended before unrestricted public launch.";
