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
  infrastructureProviders,
  legalIdentitySummary,
  zapaTechnologiesLtd,
} from "@/lib/legal-data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How PackSendGo collects, uses and protects personal information submitted through the website and quotation form.",
  openGraph: {
    title: "Privacy Policy | PackSendGo",
    description:
      "Privacy information for PackSendGo, operated by Denzil Deals Ltd.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated={LEGAL_LAST_UPDATED}>
      <LegalIdentityBlock />

      <LegalSection title="1. Who is responsible for your information">
        <p>{legalIdentitySummary.operator}</p>
        <p>{legalIdentitySummary.technology}</p>
        <p>
          {denzilDealsLtd.legalName} is responsible for the personal information submitted to
          PackSendGo for quotation and fulfilment-service purposes.
        </p>
        <p>
          {zapaTechnologiesLtd.legalName} operates and manages the PackSendGo website and
          technology platform on behalf of {denzilDealsLtd.legalName} and may process information
          where necessary to provide technical operation, maintenance, support and security.
        </p>
        <p>
          {zapaTechnologiesLtd.relationship} {zapaTechnologiesLtd.legalName} is not the PackSendGo
          fulfilment-service provider.
        </p>
      </LegalSection>

      <LegalSection title="2. Contact">
        <p>
          For privacy enquiries, contact PackSendGo at <LegalContactLink />.
        </p>
        <p>
          {denzilDealsLtd.legalName}, company number {denzilDealsLtd.companyNumber}. Registered
          office: {denzilDealsLtd.registeredOffice}.
        </p>
        <p>
          {zapaTechnologiesLtd.legalName}, company number {zapaTechnologiesLtd.companyNumber}.
          Business address: {zapaTechnologiesLtd.businessAddress}.
        </p>
      </LegalSection>

      <LegalSection title="3. What personal information we collect">
        <p>We collect information that you choose to provide, including through the quotation form:</p>
        <ul>
          <li>Contact details: name, company name, email address, telephone number and country</li>
          <li>
            Business information: business stage, product category, current fulfilment approach,
            required start date, enquiry reason and sales channels
          </li>
          <li>
            Operational information: order volumes, SKU counts, stock volumes, storage types,
            product dimensions and weights, special handling needs, delivery regions, parcel
            details, tracking preferences, additional services, returns volumes and free-text notes
          </li>
          <li>Optional website URL and platform details where provided</li>
          <li>
            Consent records: privacy consent, optional marketing consent, accuracy confirmation and
            the time those confirmations were given
          </li>
        </ul>
        <p>
          When you use the website, standard technical information may be processed by our hosting
          infrastructure, such as IP address, browser type, device information and request logs.
          This information is used to deliver the website, maintain security and diagnose technical
          issues.
        </p>
      </LegalSection>

      <LegalSection title="4. How we use your information">
        <p>We use personal information to:</p>
        <ul>
          <li>Review and respond to quotation requests</li>
          <li>Prepare pre-contract proposals and communicate about fulfilment services</li>
          <li>Manage customer relationships if you proceed with PackSendGo</li>
          <li>Operate, maintain and secure the website and quotation system</li>
          <li>Meet legal, regulatory and record-keeping obligations</li>
          <li>Prevent misuse, abuse or duplicate submissions</li>
        </ul>
        <p>
          Privacy consent on the quotation form is required to submit an enquiry. It is not
          marketing consent. Optional marketing consent is collected separately and only used if you
          choose to opt in.
        </p>
      </LegalSection>

      <LegalSection title="5. Legal bases">
        <p>Depending on the activity, we rely on one or more of the following legal bases:</p>
        <ul>
          <li>
            <strong className="text-on-surface">Consent</strong> — for example, where you opt in to
            marketing communications or confirm acceptance of this Privacy Policy before submitting
            a quotation request
          </li>
          <li>
            <strong className="text-on-surface">Pre-contract steps</strong> — to review your enquiry
            and prepare a quotation or proposal at your request
          </li>
          <li>
            <strong className="text-on-surface">Legitimate interests</strong> — to operate, secure
            and improve the website, prevent abuse and manage business enquiries proportionately
          </li>
          <li>
            <strong className="text-on-surface">Legal obligation</strong> — where we must retain or
            disclose information to comply with applicable law
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="6. Automated decision-making">
        <p>
          The PackSendGo website does not use automated decision-making or profiling to determine
          whether a quotation request is accepted. Enquiries are reviewed by people.
        </p>
      </LegalSection>

      <LegalSection title="7. Who we share information with">
        <p>We may share personal information with:</p>
        <ul>
          <li>
            {infrastructureProviders.hosting} — to host the website and store quotation records in a
            MySQL database
          </li>
          <li>
            {infrastructureProviders.email} — to send transactional email notifications relating to
            quotation submissions
          </li>
          <li>
            {zapaTechnologiesLtd.legalName} — to provide website and technology operation,
            maintenance, support and security on behalf of {denzilDealsLtd.legalName}
          </li>
          <li>
            Professional advisers or regulators where required by law or to protect legal rights
          </li>
        </ul>
        <p>
          These suppliers process information under their service arrangements and applicable
          data-protection requirements. We do not sell personal information.
        </p>
      </LegalSection>

      <LegalSection title="8. International processing">
        <p>
          Some service providers may process information in the United Kingdom or in other countries
          as part of their services. Where information is processed outside the United Kingdom,
          appropriate safeguards required by applicable data-protection law will be considered. We do
          not represent that information never leaves the United Kingdom.
        </p>
      </LegalSection>

      <LegalSection title="9. Data retention">
        <p>
          We keep personal information only for as long as reasonably necessary to respond to
          quotation requests, manage customer relationships, provide agreed services, meet legal,
          accounting and record-keeping duties, resolve disputes, and prevent abuse or protect the
          service. Retention periods depend on the nature of the information and our legal and
          operational requirements. We do not apply a single fixed retention period to all data.
        </p>
      </LegalSection>

      <LegalSection title="10. Data security">
        <p>
          We use reasonable technical and organisational measures designed to protect personal
          information, including access controls, hosting security features and secure transmission
          where supported by our providers. No method of transmission or storage is completely
          secure, and we cannot guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection title="11. Your rights">
        <p>
          Under UK data-protection law, you may have rights including access, rectification,
          erasure, restriction, objection and data portability, subject to applicable conditions
          and exemptions. You may withdraw consent where processing is based on consent, without
          affecting processing already carried out.
        </p>
        <p>
          To exercise your rights, contact <LegalContactLink />. We may need to verify your identity
          before responding.
        </p>
        <p>
          You also have the right to complain to the Information Commissioner&apos;s Office (ICO) at{" "}
          <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">
            ico.org.uk
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="12. Browser storage">
        <p>
          The website uses browser storage for essential convenience features. See our{" "}
          <Link href="/cookie-policy">Cookie Policy</Link> for details. We do not currently use
          analytics or advertising cookies.
        </p>
      </LegalSection>

      <LegalSection title="13. Changes to this policy">
        <p>
          We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at
          the top of this page shows when it was last revised. Material changes will be reflected on
          this page.
        </p>
      </LegalSection>

      <LegalSection title="14. Related policies">
        <p>
          See also our <Link href="/terms-and-conditions">Terms and Conditions</Link> and{" "}
          <Link href="/cookie-policy">Cookie Policy</Link>.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
