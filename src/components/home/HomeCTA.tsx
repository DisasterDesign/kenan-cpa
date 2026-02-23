"use client";

import { Phone } from "lucide-react";
import { siteContent } from "@/lib/content";
import FadeIn from "@/components/ui/FadeIn";

export default function HomeCTA() {
  const { homeCta, business } = siteContent;

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            {homeCta.title}
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="text-lg md:text-xl text-primary/70 mb-8 leading-relaxed">
            {homeCta.subtitle}
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <a
            href={`tel:${business.phone}`}
            className="inline-flex items-center gap-2 px-10 py-4 bg-white text-primary font-bold text-lg rounded-xl btn-interactive transition-all duration-300 shadow-lg shadow-primary/15"
          >
            <Phone className="w-5 h-5" />
            {homeCta.button}
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
