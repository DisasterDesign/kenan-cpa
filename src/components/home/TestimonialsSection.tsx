"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { siteContent } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";

export default function TestimonialsSection() {
  const { testimonials } = siteContent;
  const items = testimonials.items;
  const total = items.length;
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(3);

  useEffect(() => {
    const update = () => {
      setVisible(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, total - visible);

  const next = useCallback(() => {
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [paused, next]);

  useEffect(() => {
    setCurrent((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  return (
    <section className="section-light py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <SectionHeading
          badge={testimonials.badge}
          title={testimonials.title}
          subtitle={testimonials.subtitle}
          light
        />

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Desktop arrows */}
          <button
            onClick={prev}
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md shadow-primary/10 items-center justify-center text-primary/60 hover:text-primary transition-colors"
            aria-label="הבא"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md shadow-primary/10 items-center justify-center text-primary/60 hover:text-primary transition-colors"
            aria-label="הקודם"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Track */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(${current * (100 / visible)}%)`,
              }}
            >
              {items.map((item, i) => (
                <div
                  key={i}
                  className="px-2 flex-shrink-0"
                  style={{ width: `${100 / visible}%` }}
                >
                  <div className="p-6 md:p-8 bg-white shadow-md shadow-primary/10 rounded-2xl h-full flex flex-col">
                    <span
                      className="text-4xl leading-none text-primary/15 font-serif select-none block mb-3"
                      aria-hidden="true"
                    >
                      &ldquo;
                    </span>
                    <p className="text-sm md:text-base text-primary/70 leading-relaxed mb-6 flex-1">
                      {item.text}
                    </p>
                    <p className="text-base font-bold text-primary">
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-primary scale-110"
                    : "bg-primary/25 hover:bg-primary/40"
                }`}
                aria-label={`עמוד ${i + 1}`}
              />
            ))}
          </div>

          {/* Mobile arrows */}
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
