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
  browserStorageAudit,
  denzilDealsLtd,
} from "@/lib/legal-data";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How PackSendGo uses browser storage, including theme preferences and quotation draft storage.",
  openGraph: {
    title: "Cookie Policy | PackSendGo",
    description: "Cookie and browser storage information for the PackSendGo website.",
  },
};

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout title="Cookie Policy" lastUpdated={LEGAL_LAST_UPDATED}>
      <LegalIdentityBlock />

      <LegalSection title="1. Introduction">
        <p>
          This policy explains how PackSendGo uses cookies and browser storage on{" "}
          {denzilDealsLtd.legalName}&apos;s website. It reflects the technologies currently
          implemented in the website code.
        </p>
      </LegalSection>

      <LegalSection title="2. What cookies are">
        <p>
          Cookies are small text files placed on your device by a website. They can be session
          cookies, which expire when you close your browser, or persistent cookies, which remain for
          a defined period.
        </p>
      </LegalSection>

      <LegalSection title="3. What browser storage is">
        <p>
          Modern browsers also provide storage mechanisms such as local storage and session
          storage. These are not cookies, although they store information in your browser for
          website functionality.
        </p>
      </LegalSection>

      <LegalSection title="4. What PackSendGo currently uses">
        <p>
          Based on the current website implementation, PackSendGo does not set application cookies
          through its own code. The site does use browser storage for essential convenience
          features described below.
        </p>
        <p>PackSendGo does not currently use analytics or advertising cookies.</p>
      </LegalSection>

      <LegalSection title="5. Theme preference storage">
        <p>
          When you choose Light, Dark or system theme in the website header, your preference may be
          stored in your browser&apos;s local storage so the site can remember your choice on return
          visits. Key used: <strong className="text-on-surface">theme</strong> (via the next-themes
          library).
        </p>
      </LegalSection>

      <LegalSection title="6. Quotation draft storage">
        <p>
          If you start a quotation request, your in-progress answers and current step may be stored
          in session storage until you submit the form or close the browser session:
        </p>
        <ul>
          {browserStorageAudit.sessionStorage.map((item) => (
            <li key={item.key}>
              <strong className="text-on-surface">{item.key}</strong> — {item.purpose}
            </li>
          ))}
        </ul>
      </LegalSection>

      <LegalSection title="7. Essential technical storage">
        <p>
          Session storage for quotation drafts and idempotency helps prevent accidental loss of
          in-progress enquiries and reduces duplicate submissions within the same browser session.
          This storage is functional rather than used for marketing or analytics.
        </p>
      </LegalSection>

      <LegalSection title="8. Analytics and advertising">
        <p>
          PackSendGo does not currently use analytics or advertising cookies. We have not installed
          Google Analytics, Meta Pixel or similar tracking technologies in the website codebase.
        </p>
      </LegalSection>

      <LegalSection title="9. How to control browser storage">
        <p>
          You can control or delete cookies and browser storage through your browser settings. Most
          browsers allow you to block storage entirely, clear stored data, or remove data for
          individual websites.
        </p>
      </LegalSection>

      <LegalSection title="10. Consequences of clearing storage">
        <p>
          If you clear theme storage, the website will revert to its default theme until you select
          a preference again. If you clear quotation draft storage, any in-progress quotation form
          answers in that browser session will be lost.
        </p>
      </LegalSection>

      <LegalSection title="11. Infrastructure cookies">
        <p>
          Our hosting provider or content delivery infrastructure may set technical cookies or
          process request data necessary to deliver the website securely. We have not identified
          separate non-essential marketing cookies set by the application itself.
        </p>
      </LegalSection>

      <LegalSection title="12. Cookie consent banner">
        <p>
          Because PackSendGo does not currently use non-essential analytics or advertising cookies
          in its application code, we do not display a cookie-consent banner at this time. If
          non-essential cookies or tracking technologies are introduced in future, this policy and
          the website consent approach will be updated accordingly.
        </p>
      </LegalSection>

      <LegalSection title="13. Changes">
        <p>
          We may update this Cookie Policy if our use of cookies or browser storage changes. The
          &quot;Last updated&quot; date shows when this page was last revised.
        </p>
      </LegalSection>

      <LegalSection title="14. Contact and related policies">
        <p>
          Questions about this policy: <LegalContactLink />. See also our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link> and{" "}
          <Link href="/terms-and-conditions">Terms and Conditions</Link>.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
