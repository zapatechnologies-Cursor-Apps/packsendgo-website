import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalContactLink,
  LegalIdentityBlock,
  LegalPageLayout,
  LegalSection,
} from "@/components/legal/LegalPageLayout";
import {
  LEGAL_LAST_UPDATED,
  denzilDealsLtd,
  legalIdentitySummary,
  zapaTechnologiesLtd,
} from "@/lib/legal-data";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Website terms for PackSendGo, including quotation requests, acceptable use and governing law.",
  openGraph: {
    title: "Terms and Conditions | PackSendGo",
    description: "Website and quotation-request terms for PackSendGo.",
  },
};

export default function TermsAndConditionsPage() {
  return (
    <LegalPageLayout title="Terms and Conditions" lastUpdated={LEGAL_LAST_UPDATED}>
      <LegalIdentityBlock />

      <LegalSection title="1. About PackSendGo">
        <p>
          PackSendGo provides ecommerce fulfilment, warehousing, pick and pack, parcel dispatch and
          related services for growing brands. These Terms and Conditions apply to your use of the
          PackSendGo website and to quotation requests submitted through it.
        </p>
        <p>{legalIdentitySummary.operator}</p>
        <p>{legalIdentitySummary.technology}</p>
      </LegalSection>

      <LegalSection title="2. Legal identity">
        <p>
          {denzilDealsLtd.legalName}, company number {denzilDealsLtd.companyNumber}. Registered
          office: {denzilDealsLtd.registeredOffice}.
        </p>
        <p>
          {zapaTechnologiesLtd.legalName}, company number {zapaTechnologiesLtd.companyNumber},
          operates and manages the website and technology platform on behalf of{" "}
          {denzilDealsLtd.legalName}. {zapaTechnologiesLtd.legalName} is not the PackSendGo
          fulfilment-service provider.
        </p>
      </LegalSection>

      <LegalSection title="3. Acceptance">
        <p>
          By accessing or using this website, you agree to these Terms and Conditions. If you do
          not agree, please do not use the website. Submitting a quotation request also confirms
          that you accept our <Link href="/privacy-policy">Privacy Policy</Link> as stated on the
          form.
        </p>
      </LegalSection>

      <LegalSection title="4. Website purpose">
        <p>
          This website provides information about PackSendGo services and allows you to submit a
          quotation enquiry. It is a marketing and lead-generation website. It is not a customer
          fulfilment portal, inventory dashboard or live order-tracking platform unless explicitly
          stated otherwise in a separate agreement.
        </p>
      </LegalSection>

      <LegalSection title="5. Quotation requests">
        <p>
          Submitting the quotation form is an enquiry only. It does not create a binding contract,
          guarantee acceptance, or provide instant or final pricing. PackSendGo will review your
          submission and may contact you with follow-up questions or a tailored proposal.
        </p>
        <p>
          Any fulfilment work is subject to a separate quotation, service agreement or written
          acceptance agreed with you. If there is any inconsistency between these website terms and
          a separately agreed quotation or service agreement, the separately agreed document
          controls the fulfilment work.
        </p>
      </LegalSection>

      <LegalSection title="6. Information you provide">
        <p>
          You must provide accurate and complete information in quotation requests and update us if
          material details change before a service agreement is concluded. You must not submit false,
          misleading or unlawful information.
        </p>
      </LegalSection>

      <LegalSection title="7. Acceptable use">
        <p>You must use the website lawfully and must not:</p>
        <ul>
          <li>Attempt to disrupt, damage or interfere with the website or its security</li>
          <li>Submit malicious code, automated abuse or excessive repeated requests</li>
          <li>Use the website for unlawful, fraudulent or harmful purposes</li>
          <li>Infringe intellectual property or other third-party rights</li>
        </ul>
      </LegalSection>

      <LegalSection title="8. Website content and availability">
        <p>
          We aim to keep website content accurate and available, but we do not guarantee that the
          website will be uninterrupted, error-free or free from vulnerabilities. Content may change
          without notice. Service descriptions are general and final scope is agreed separately
          during onboarding.
        </p>
      </LegalSection>

      <LegalSection title="9. Intellectual property">
        <p>
          The PackSendGo name, branding, website content, design and underlying technology are
          protected by intellectual property laws. You may view and print pages for personal
          business use related to evaluating PackSendGo services. You must not copy, modify,
          distribute or exploit website content without prior written permission except as permitted
          by law.
        </p>
      </LegalSection>

      <LegalSection title="10. Third-party links">
        <p>
          The website may link to third-party websites or services. We are not responsible for
          third-party content, policies or availability. External links are provided for convenience
          only.
        </p>
      </LegalSection>

      <LegalSection title="11. Limitation of liability">
        <p>
          To the fullest extent permitted by law, neither {denzilDealsLtd.legalName} nor{" "}
          {zapaTechnologiesLtd.legalName} will be liable for loss of profits, revenue, business,
          anticipated savings, data or indirect or consequential loss arising from your use of the
          website.
        </p>
        <p>
          Nothing in these terms excludes or limits liability for death or personal injury caused
          by negligence, fraud or fraudulent misrepresentation, or any other liability that cannot
          legally be excluded or limited.
        </p>
        <p>
          Website use is at your own risk. These terms do not limit liabilities that may arise under
          a separately agreed fulfilment contract.
        </p>
      </LegalSection>

      <LegalSection title="12. Changes">
        <p>
          We may update the website or these Terms and Conditions from time to time. Continued use
          after changes are posted constitutes acceptance of the revised terms, except where
          mandatory law provides otherwise.
        </p>
      </LegalSection>

      <LegalSection title="13. Governing law">
        <p>
          These terms are governed by the laws of England and Wales. The courts of England and Wales
          have exclusive jurisdiction, subject to any mandatory rights you may have as a consumer
          or under applicable law.
        </p>
      </LegalSection>

      <LegalSection title="14. Contact">
        <p>
          For questions about these terms, contact PackSendGo at <LegalContactLink />.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
