"use client";

import dynamic from "next/dynamic";
import { Phone, ChevronDown } from "lucide-react";
import { siteContent } from "@/lib/content";
import FadeIn from "@/components/ui/FadeIn";

const TetrisCanvas = dynamic(
  () => import("@/components/tetris/TetrisCanvas"),
  { ssr: false, loading: () => null }
);

export default function HeroSection() {
  const { hero, business } = siteContent;

  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-screen"
      style={{ background: "linear-gradient(180deg, #B48A34 0%, #D4C5A9 50%, #B48A34 100%)" }}
    >
      {/* 3D Tetris — full-screen background */}
      <div className="absolute inset-0 opacity-50" aria-hidden="true">
        <TetrisCanvas />
      </div>

      {/* Text content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center pt-24 md:pt-28 pb-8">
          <div className="flex flex-col items-center text-center py-8 lg:py-0 max-w-3xl">
            <FadeIn delay={0.2}>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-primary mb-6 leading-tight whitespace-nowrap">
                {hero.title}
              </h1>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="text-lg md:text-xl lg:text-2xl text-primary font-medium leading-relaxed mb-3">
                {hero.tagline}
              </p>
            </FadeIn>

            <FadeIn delay={0.6}>
              <p className="text-base md:text-lg text-primary/70 leading-relaxed mb-6">
                {hero.description}
              </p>
            </FadeIn>

            <FadeIn delay={0.8}>
              <p className="text-xl md:text-2xl lg:text-3xl font-bold text-primary mb-8 leading-snug">
                {hero.slogan}
              </p>
            </FadeIn>

            <FadeIn delay={1.0}>
              <a
                href={`tel:${business.phone}`}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary font-bold text-lg rounded-xl btn-interactive transition-all duration-300 shadow-lg shadow-primary/15"
              >
                <Phone className="w-5 h-5" />
                {hero.cta}
              </a>
            </FadeIn>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="pb-6 hidden md:flex flex-col items-center gap-2 text-white/60 text-sm">
          <span>גלו עוד</span>
          <ChevronDown className="w-5 h-5" style={{ animation: "bounceDown 1.5s ease-in-out infinite" }} />
        </div>
      </div>
    </section>
  );
}
