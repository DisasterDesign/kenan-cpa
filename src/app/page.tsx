import HeroSection from "@/components/home/HeroSection";
import WhyUsCards from "@/components/home/WhyUsCards";
import ServicesSummary from "@/components/home/ServicesSummary";
import HomeCTA from "@/components/home/HomeCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyUsCards />
      <ServicesSummary />
      <HomeCTA />
    </>
  );
}
