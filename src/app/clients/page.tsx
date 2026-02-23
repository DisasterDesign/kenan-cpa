import type { Metadata } from "next";
import { Building2 } from "lucide-react";
import { siteContent } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "לקוחות ממליצים | קינן ושות׳, רואי חשבון",
  description:
    "המשרד משרת מגוון רחב של לקוחות: חברות, עמותות, רשויות מקומיות, תאגידי מים, עצמאים ושכירים.",
};

export default function ClientsPage() {
  const { clients } = siteContent;

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
          <SectionHeading badge={clients.badge} title={clients.title} light />
        </div>
      </section>

      {/* Intro + Grid */}
      <section className="section-light py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
          <FadeIn>
            <p className="text-base md:text-lg text-primary/70 leading-relaxed text-center max-w-3xl mx-auto mb-12">
              {clients.intro}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {clients.list.map((client, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="flex items-center gap-4 p-5 rounded-xl bg-white shadow-md shadow-button/8 hover:shadow-lg hover:shadow-button/12 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 group-hover:bg-button/10 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Building2 className="w-5 h-5 text-primary/60 group-hover:text-button transition-colors" />
                  </div>
                  <span className="text-sm md:text-base text-primary font-medium">
                    {client}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
