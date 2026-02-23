"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { siteContent } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";

export default function TestimonialsSection() {
  const { testimonials } = siteContent;
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.items.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-play every 6 seconds
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const item = testimonials.items[current];

  return (
    <section className="section-light py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <SectionHeading
          badge={testimonials.badge}
          title={testimonials.title}
          subtitle={testimonials.subtitle}
          light
        />

        {/* Slider */}
        <div
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Arrow buttons */}
          <button
            onClick={prev}
            className="hidden md:flex absolute -right-14 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md shadow-primary/10 items-center justify-center text-primary/60 hover:text-primary transition-colors"
            aria-label="הבא"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="hidden md:flex absolute -left-14 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md shadow-primary/10 items-center justify-center text-primary/60 hover:text-primary transition-colors"
            aria-label="הקודם"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Card */}
          <div className="overflow-hidden rounded-2xl">
            <div
              key={current}
              className="p-8 md:p-12 bg-white shadow-md shadow-primary/10 rounded-2xl text-center animate-fadeSlide"
            >
              <span
                className="text-6xl leading-none text-primary/15 font-serif select-none block mb-4"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <p className="text-base md:text-lg text-primary/70 leading-relaxed mb-8 max-w-2xl mx-auto">
                {item.text}
              </p>
              <p className="text-lg font-bold text-primary">
                {item.label}
              </p>
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.items.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-primary scale-110"
                    : "bg-primary/25 hover:bg-primary/40"
                }`}
                aria-label={`חוות דעת ${i + 1}`}
              />
            ))}
          </div>

          {/* Mobile swipe arrows */}
          <div className="flex md:hidden items-center justify-center gap-4 mt-4">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white shadow-md shadow-primary/10 flex items-center justify-center text-primary/60"
              aria-label="הבא"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white shadow-md shadow-primary/10 flex items-center justify-center text-primary/60"
              aria-label="הקודם"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CTA link */}
        <FadeIn delay={0.6}>
          <div className="text-center mt-10">
            <Link
              href="/clients"
              className="inline-flex items-center gap-2 text-white font-medium hover:gap-3 transition-all duration-300"
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
