import { CoreCapabilities } from "@/components/sections/CoreCapabilities";
import { CustomerCategories } from "@/components/sections/CustomerCategories";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { OperationalCommitments } from "@/components/sections/OperationalCommitments";
import { QuoteCallToAction } from "@/components/sections/QuoteCallToAction";
import { SalesChannels } from "@/components/sections/SalesChannels";
import { WarehouseTour } from "@/components/sections/WarehouseTour";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CoreCapabilities />
      <HowItWorks />
      <WarehouseTour />
      <SalesChannels />
      <CustomerCategories />
      <OperationalCommitments />
      <QuoteCallToAction />
    </>
  );
}
