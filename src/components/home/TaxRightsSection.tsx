import { CheckCircle2 } from "lucide-react";
import { siteContent } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";

export default function TaxRightsSection() {
  const { taxRights } = siteContent;

  return (
    <section className="section-light py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <SectionHeading badge={taxRights.badge} title={taxRights.title} light />

        <FadeIn>
          <p className="text-base md:text-lg text-primary/70 leading-relaxed whitespace-pre-line text-center max-w-3xl mx-auto mb-12">
            {taxRights.intro}
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 max-w-3xl mx-auto">
          {taxRights.items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/15 hover:-translate-y-1 transition-all duration-300">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm md:text-base text-primary/80 leading-relaxed">
                  {item}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
