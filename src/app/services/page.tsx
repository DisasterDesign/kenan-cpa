import type { Metadata } from "next";
import {
  Rocket,
  FileText,
  User,
  Landmark,
  Calculator,
  Globe,
  CheckCircle2,
} from "lucide-react";
import { siteContent } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "שירותי המשרד | קינן ושות׳, רואי חשבון",
  description:
    "יעוץ לפתיחת עסק, דוחות כספיים, מיסוי בינלאומי, הנהלת חשבונות ושכר, הצהרות הון ועוד.",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMap: Record<string, any> = {
  Rocket,
  FileText,
  User,
  Landmark,
  Calculator,
  Globe,
};

export default function ServicesPage() {
  const { services } = siteContent;

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
          <SectionHeading badge={services.badge} title={services.title} light />
        </div>
      </section>

      {/* Services */}
      <section className="section-light py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="space-y-12 md:space-y-16">
            {services.categories.map((category, i) => {
              const Icon = iconMap[category.icon] || FileText;
              return (
                <FadeIn key={category.id} delay={0.1}>
                  <div
                    id={category.id}
                    className="scroll-mt-24 p-6 md:p-8 rounded-2xl bg-white shadow-md shadow-button/8"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-button/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-button" />
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-primary pt-2">
                        {category.title}
                      </h2>
                    </div>
                    <ul className="space-y-3">
                      {category.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-primary/70"
                        >
                          <CheckCircle2 className="w-5 h-5 text-button mt-0.5 flex-shrink-0" />
                          <span className="text-sm md:text-base leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
