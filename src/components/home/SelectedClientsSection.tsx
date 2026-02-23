"use client";

import Link from "next/link";
import {
  Utensils,
  Clapperboard,
  Mic2,
  Globe,
  Tv,
  Scale,
  HardHat,
  TrendingUp,
  Droplets,
  Drama,
  ArrowLeft,
} from "lucide-react";
import { siteContent } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMap: Record<string, any> = {
  Utensils,
  Clapperboard,
  Mic2,
  Globe,
  Tv,
  Scale,
  HardHat,
  TrendingUp,
  Droplets,
  Drama,
};

export default function SelectedClientsSection() {
  const { selectedClients } = siteContent;

  return (
    <section className="section-light py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <SectionHeading
          badge={selectedClients.badge}
          title={selectedClients.title}
          light
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {selectedClients.items.map((item, i) => {
            const Icon = iconMap[item.icon] || Globe;
            return (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="flex flex-col items-center gap-3 p-5 rounded-xl bg-white shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/15 hover:-translate-y-1 transition-all duration-300 text-center">
                  <div className="w-10 h-10 rounded-xl bg-button/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs md:text-sm text-primary/80 font-medium leading-snug">
                    {item.text}
                  </span>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.6}>
          <div className="text-center mt-10">
            <Link
              href="/clients"
              className="inline-flex items-center gap-2 text-white font-medium hover:gap-3 transition-all duration-300"
            >
              לכל הלקוחות
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
