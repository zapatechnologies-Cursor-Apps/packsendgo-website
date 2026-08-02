import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import {
  denzilDealsLtd,
  packSendGoContact,
  zapaTechnologiesLtd,
} from "@/lib/legal-data";

type LegalPageLayoutProps = {
  title: string;
  lastUpdated: string;
  children: ReactNode;
};

export function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <>
      <section className="border-b border-outline/10 bg-surface-container">
        <Container className="py-section-gap-mobile md:py-16">
          <div className="max-w-3xl space-y-3">
            <h1 className="font-display text-3xl font-semibold text-on-surface md:text-4xl">
              {title}
            </h1>
            <p className="text-sm text-on-surface-variant">Last updated: {lastUpdated}</p>
          </div>
        </Container>
      </section>
      <Container className="py-section-gap-mobile md:py-20">
        <div className="mx-auto max-w-3xl space-y-10">{children}</div>
      </Container>
    </>
  );
}

export function LegalSection({
  title,
  children,
  id,
}: {
  title: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="space-y-3">
      <h2 className="font-display text-xl font-semibold text-on-surface md:text-2xl">
        {title}
      </h2>
      <div className="space-y-3 text-sm leading-relaxed text-on-surface-variant md:text-base [&_a]:text-signal-lime [&_a]:underline [&_a]:underline-offset-2 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}

export function LegalIdentityBlock() {
  return (
    <aside className="space-y-3 border border-outline/20 bg-surface-panel p-5 text-sm leading-relaxed text-on-surface-variant md:p-6">
      <p className="font-medium text-on-surface">Legal identity</p>
      <p>
        PackSendGo is operated by {denzilDealsLtd.legalName}, company number{" "}
        {denzilDealsLtd.companyNumber}. Registered office: {denzilDealsLtd.registeredOffice}.
      </p>
      <p>
        Customer and privacy contact:{" "}
        <a href={packSendGoContact.mailto}>{packSendGoContact.email}</a>
      </p>
      <p>
        Website technology operated and managed by {zapaTechnologiesLtd.legalName}, company number{" "}
        {zapaTechnologiesLtd.companyNumber}.
      </p>
    </aside>
  );
}

export function LegalContactLink() {
  return (
    <a href={packSendGoContact.mailto} className="break-all">
      {packSendGoContact.email}
    </a>
  );
}
