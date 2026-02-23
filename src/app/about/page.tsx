import type { Metadata } from "next";
import { Briefcase, CheckCircle2 } from "lucide-react";
import { siteContent } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "אודות | קינן ושות׳, רואי חשבון",
  description:
    "משרד ותיק ובעל ניסיון רב שנוסד בשנת 1982. משרד בוטיק קטן ואיכותי המעניק שירותים במקצועיות הגבוהה ביותר.",
};

export default function AboutPage() {
  const { about } = siteContent;

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
          <SectionHeading
            badge={about.badge}
            title={about.title}
            light
          />
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12">
          {about.content.map((paragraph, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <p className="text-base md:text-lg text-primary/70 leading-relaxed mb-6">
                {paragraph}
              </p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Managers */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
          <SectionHeading
            badge="ההנהלה"
            title="מנהלי המשרד"
            light
          />

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {about.managers.map((manager, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="p-8 rounded-2xl bg-white shadow-md shadow-primary/10">
                  <div className="w-14 h-14 rounded-2xl bg-button/10 flex items-center justify-center mb-5">
                    <Briefcase className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-1">
                    {manager.name}
                  </h3>
                  <p className="text-sm text-white mb-5">{manager.title}</p>
                  <ul className="space-y-2.5">
                    {manager.bio.map((line, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-sm text-primary/70"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 flex-shrink-0" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Blocks */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {about.blocks.map((block, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="p-6 md:p-8 rounded-2xl bg-white shadow-md shadow-primary/10 h-full">
                  <h3 className="text-lg font-bold text-primary mb-3">
                    {block.title}
                  </h3>
                  <p className="text-sm text-primary/70 leading-relaxed">
                    {block.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Public Involvement */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
          <SectionHeading
            badge="מעורבות ציבורית"
            title={about.publicInvolvement.title}
            subtitle={about.publicInvolvement.subtitle}
            light
          />

          <div className="max-w-3xl mx-auto">
            <div className="p-6 md:p-8 rounded-2xl bg-white shadow-md shadow-primary/10">
              <ul className="space-y-4">
                {about.publicInvolvement.items.map((item, i) => (
                  <FadeIn key={i} delay={i * 0.06}>
                    <li className="flex items-start gap-3 text-primary/70">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base leading-relaxed">
                        {item}
                      </span>
                    </li>
                  </FadeIn>
                ))}
              </ul>
            </div>

            <FadeIn delay={0.5}>
              <p className="text-base md:text-lg font-bold text-primary text-center mt-8 leading-relaxed">
                {about.publicInvolvement.conclusion}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
