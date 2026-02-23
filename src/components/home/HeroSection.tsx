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
      className="relative overflow-hidden bg-white lg:min-h-screen"
    >
      {/* 3D Tetris — absolute background on desktop only */}
      <div className="hidden lg:block absolute inset-0" aria-hidden="true">
        <TetrisCanvas />
      </div>

      {/* Text content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 lg:min-h-screen flex flex-col">
        <div className="flex-1 flex items-center pt-24 md:pt-28 pb-8">
          <div className="lg:w-1/2 flex flex-col text-center lg:text-right py-8 lg:py-0">
            <FadeIn delay={0.2}>
              <span className="inline-block text-xs md:text-sm font-medium px-4 py-1.5 rounded-full bg-button/10 text-button mb-4">
                {hero.badge}
              </span>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-sm md:text-base font-semibold text-button mb-4">
                יו״ר לשכת רואי החשבון
              </p>
            </FadeIn>

            <FadeIn delay={0.5}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary mb-5 leading-tight">
                {hero.title}{" "}
                <span className="text-button">{hero.titleBold}</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.7}>
              <p className="text-base md:text-lg lg:text-xl text-primary/70 max-w-xl leading-relaxed whitespace-pre-line mb-4 lg:max-w-none">
                {hero.subtitle}
              </p>
            </FadeIn>

            <FadeIn delay={0.9}>
              <p className="text-sm md:text-base text-primary/50 mb-8">
                {hero.services}
              </p>
            </FadeIn>

            <FadeIn delay={1.1}>
              <div>
                <a
                  href={`tel:${business.phone}`}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white font-bold text-lg rounded-xl btn-interactive transition-all duration-300 shadow-lg shadow-primary/30"
                >
                  <Phone className="w-5 h-5" />
                  {hero.cta}
                </a>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* 3D Tetris — inline on mobile, below text */}
        <div className="lg:hidden relative w-full h-[300px] -mb-4" aria-hidden="true">
          <TetrisCanvas />
        </div>

        {/* Stats Bar */}
        <div className="relative w-full pb-4">
          <FadeIn delay={1.2}>
            <div className="max-w-xl mx-auto lg:mx-0 flex items-center justify-center lg:justify-start gap-8 md:gap-12 py-4 px-6 rounded-2xl bg-white shadow-md shadow-button/8">
              {hero.stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div
                    className="text-2xl md:text-3xl font-bold text-button"
                    style={{ fontFamily: "var(--font-grotesk), sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-primary/60 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Scroll indicator */}
        <div className="pb-6 hidden md:flex flex-col items-center gap-2 text-primary/40 text-sm">
          <span>גלו עוד</span>
          <ChevronDown className="w-5 h-5" style={{ animation: "bounceDown 1.5s ease-in-out infinite" }} />
        </div>
      </div>
    </section>
  );
}
