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
      className="relative overflow-hidden lg:min-h-screen"
      style={{ background: "linear-gradient(180deg, #B48A34 0%, #D4C5A9 50%, #B48A34 100%)" }}
    >
      {/* 3D Tetris — absolute background on desktop only */}
      <div className="hidden lg:block absolute inset-0" aria-hidden="true">
        <TetrisCanvas />
      </div>

      {/* Text content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 lg:min-h-screen flex flex-col">
        <div className="flex-1 flex items-center pt-24 md:pt-28 pb-8">
          <div className="lg:w-1/2 flex flex-col text-center lg:text-right py-8 lg:py-0">
            <FadeIn delay={0.3}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary mb-5 leading-tight">
                {hero.title}
              </h1>
            </FadeIn>

            <FadeIn delay={0.6}>
              <p className="text-base md:text-lg lg:text-xl text-primary/80 max-w-xl leading-relaxed whitespace-pre-line mb-8 lg:max-w-none">
                {hero.subtitle}
              </p>
            </FadeIn>

            <FadeIn delay={0.9}>
              <div>
                <a
                  href={`tel:${business.phone}`}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary font-bold text-lg rounded-xl btn-interactive transition-all duration-300 shadow-lg shadow-primary/15"
                >
                  <Phone className="w-5 h-5" />
                  {hero.cta}
                </a>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* 3D Tetris — inline on mobile, below text */}
        <div className="lg:hidden relative w-full h-[450px] -mb-4" aria-hidden="true">
          <TetrisCanvas />
        </div>

        {/* Stats Bar */}
        <div className="relative w-full pb-4">
          <FadeIn delay={1.2}>
            <div className="mx-auto flex items-center justify-center gap-8 md:gap-12 py-4 px-6 rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg shadow-primary/10">
              {hero.stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div
                    className="text-2xl md:text-3xl font-bold text-primary"
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
        <div className="pb-6 hidden md:flex flex-col items-center gap-2 text-white/60 text-sm">
          <span>גלו עוד</span>
          <ChevronDown className="w-5 h-5" style={{ animation: "bounceDown 1.5s ease-in-out infinite" }} />
        </div>
      </div>
    </section>
  );
}
