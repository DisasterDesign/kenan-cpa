import type { Metadata } from "next";
import { FileDown, ExternalLink } from "lucide-react";
import { siteContent } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import FadeIn from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "שאלות נפוצות וטפסים | קינן ושות׳, רואי חשבון",
  description:
    "שאלות ותשובות בנושאי מס, פתיחת עסק, הנהלת חשבונות, הצהרות הון ועוד. טפסי מס הכנסה להורדה.",
};

export default function FAQPage() {
  const { faq } = siteContent;

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
          <SectionHeading badge={faq.badge} title={faq.title} light />
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 md:px-8 lg:px-12">
          <div>
            {faq.items.map((item, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <Accordion
                  question={item.question}
                  answer={item.answer}
                  light
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Forms */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
          <SectionHeading
            badge="טפסים"
            title={faq.forms.title}
            light
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto">
            {faq.forms.taxForms.map((form, i) => (
              <FadeIn key={i} delay={i * 0.03}>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/15 transition-all duration-300">
                  <FileDown className="w-4 h-4 text-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <span
                      className="text-xs text-primary/50 block"
                      style={{ fontFamily: "var(--font-grotesk), sans-serif" }}
                    >
                      {form.code}
                    </span>
                    <span className="text-sm text-primary/80 block truncate">
                      {form.name}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Government Links */}
          <div className="mt-12 max-w-2xl mx-auto">
            <h3 className="text-lg font-bold text-primary text-center mb-6">
              קישורים לאתרים ממשלתיים
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {faq.forms.govLinks.map((link, i) => (
                <FadeIn key={i} delay={0.1}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl bg-white shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/15 text-primary/80 hover:text-white transition-all duration-300"
                  >
                    <ExternalLink className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">{link.name}</span>
                  </a>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
