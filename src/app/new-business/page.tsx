import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { siteContent } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "פתיחת עסק חדש | קינן ושות׳, רואי חשבון",
  description:
    "פותח עסק חדש? ליווי מלא — מבחירת צורת התאגדות, דרך פתיחת תיקים ועד ליווי צמוד בצעדים הראשונים.",
};

export default function NewBusinessPage() {
  const { newBusiness, business } = siteContent;

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
          <SectionHeading
            badge={newBusiness.badge}
            title={newBusiness.title}
            subtitle={newBusiness.subtitle}
            light
          />
        </div>
      </section>

      {/* Timeline */}
      <section className="section-light py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute right-[19px] md:right-[23px] top-0 bottom-0 w-0.5 bg-button/20" />

            <div className="space-y-8">
              {newBusiness.steps.map((step, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="flex items-start gap-4 md:gap-6 relative">
                    {/* Step number */}
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm md:text-base flex-shrink-0 relative z-10 shadow-md"
                      style={{ fontFamily: "var(--font-grotesk), sans-serif" }}
                    >
                      {i + 1}
                    </div>
                    {/* Content */}
                    <div className="pt-2 md:pt-2.5 pb-2">
                      <p className="text-sm md:text-base text-primary/70 leading-relaxed">
                        {step}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* CTA */}
          <FadeIn delay={0.5}>
            <div className="text-center mt-16">
              <a
                href={`tel:${business.phone}`}
                className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-white font-bold text-lg rounded-xl btn-interactive transition-all duration-300 shadow-lg shadow-primary/30"
              >
                <Phone className="w-5 h-5" />
                {newBusiness.cta}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
