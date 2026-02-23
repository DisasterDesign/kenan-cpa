import HeroSection from "@/components/home/HeroSection";
import WhyUsCards from "@/components/home/WhyUsCards";
import TaxRightsSection from "@/components/home/TaxRightsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ServicesSummary from "@/components/home/ServicesSummary";
import SelectedClientsSection from "@/components/home/SelectedClientsSection";
import HomeCTA from "@/components/home/HomeCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyUsCards />
      <TaxRightsSection />
      <TestimonialsSection />
      <ServicesSummary />
      <SelectedClientsSection />
      <HomeCTA />
    </>
  );
}
