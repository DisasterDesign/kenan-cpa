"use client";

import {
  Gem,
  Building2,
  Award,
  ShieldCheck,
  Users,
  Heart,
  Monitor,
  Clock,
} from "lucide-react";
import { siteContent } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMap: Record<string, any> = {
  Gem,
  Building2,
  Award,
  ShieldCheck,
  Users,
  Heart,
  Monitor,
  Clock,
};

export default function WhyUsCards() {
  const { whyUs } = siteContent;

  return (
    <section className="section-light py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <SectionHeading badge={whyUs.badge} title={whyUs.title} subtitle={whyUs.subtitle} light />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {whyUs.items.map((item, i) => {
            const Icon = iconMap[item.icon] || Gem;
            return (
              <FadeIn key={i} delay={i * 0.08} className="h-full">
                <div className="h-full p-6 rounded-2xl bg-white shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/15 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-10 h-10 rounded-xl bg-button/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-primary/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.7}>
          <p className="text-center text-xl md:text-2xl font-bold text-white mt-12">
            {whyUs.closing}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
