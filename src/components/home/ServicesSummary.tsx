"use client";

import Link from "next/link";
import {
  Rocket,
  FileText,
  User,
  Landmark,
  Calculator,
  Shield,
  ArrowLeft,
} from "lucide-react";
import { siteContent } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMap: Record<string, any> = {
  Rocket,
  FileText,
  User,
  Landmark,
  Calculator,
  Shield,
};

export default function ServicesSummary() {
  const { servicesSummary } = siteContent;

  return (
    <section className="section-light py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <SectionHeading
          badge={servicesSummary.badge}
          title={servicesSummary.title}
          light
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {servicesSummary.items.map((item, i) => {
            const Icon = iconMap[item.icon] || FileText;
            return (
              <FadeIn key={i} delay={i * 0.08}>
                <Link
                  href={item.href}
                  className="block p-6 rounded-2xl bg-white shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/15 hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-button/10 flex items-center justify-center mb-4 group-hover:bg-button/15 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-primary/70 leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-button group-hover:gap-2 group-hover:text-primary transition-all">
                    למידע נוסף
                    <ArrowLeft className="w-4 h-4" />
                  </span>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
