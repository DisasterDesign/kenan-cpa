import HeroSection from "@/components/home/HeroSection";
import WhyUsCards from "@/components/home/WhyUsCards";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ServicesSummary from "@/components/home/ServicesSummary";
import HomeCTA from "@/components/home/HomeCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyUsCards />
      <TestimonialsSection />
      <ServicesSummary />
      <HomeCTA />
    </>
  );
}
