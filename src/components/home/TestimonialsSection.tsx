"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { siteContent } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";

export default function TestimonialsSection() {
  const { testimonials } = siteContent;
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.querySelector<HTMLElement>("[data-card]");
    const cardWidth = card ? card.offsetWidth + 16 : 340;
    // RTL: scroll directions are inverted
    const amount = direction === "right" ? -cardWidth : cardWidth;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="section-light py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <SectionHeading
          badge={testimonials.badge}
          title={testimonials.title}
          subtitle={testimonials.subtitle}
          light
        />

        {/* Carousel wrapper */}
        <div className="relative">
          {/* Arrow buttons — desktop only */}
          <button
            onClick={() => scroll("right")}
            className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md shadow-button/8 items-center justify-center text-primary/60 hover:text-primary transition-colors"
            aria-label="הבא"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("left")}
            className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md shadow-button/8 items-center justify-center text-primary/60 hover:text-primary transition-colors"
            aria-label="הקודם"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Scrollable cards */}
          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-2"
            style={{ scrollPaddingInlineStart: "0px" }}
          >
            {testimonials.items.map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div
                  data-card
                  className="min-w-[85vw] sm:min-w-[55%] lg:min-w-[calc(33.333%-1rem)] snap-start p-6 md:p-8 rounded-2xl bg-white shadow-md shadow-button/8 flex flex-col"
                >
                  <span
                    className="text-5xl leading-none text-button/20 font-serif select-none"
                    aria-hidden="true"
                  >
                    &ldquo;
                  </span>
                  <p className="text-sm md:text-base text-primary/70 leading-relaxed mt-2 mb-6 flex-1">
                    {item.text}
                  </p>
                  <p className="text-base font-bold text-primary">
                    {item.label}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* CTA link */}
        <FadeIn delay={0.6}>
          <div className="text-center mt-10">
            <Link
              href="/clients"
              className="inline-flex items-center gap-2 text-button font-medium hover:gap-3 transition-all duration-300"
            >
              {testimonials.cta}
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
