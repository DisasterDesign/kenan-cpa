import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { siteContent } from "@/lib/content";

export default function Footer() {
  const { footer, business, faq } = siteContent;

  return (
    <footer className="text-primary/80 border-t border-white/20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        {/* Main Footer */}
        <div className="py-12 md:py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo.svg"
                alt="קינן ושות׳, רואי חשבון"
                width={280}
                height={70}
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-sm text-primary/60 leading-relaxed">
              {footer.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-primary text-base mb-4">
              קישורים מהירים
            </h3>
            <ul className="space-y-2.5">
              {footer.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Government Links */}
          <div>
            <h3 className="font-bold text-primary text-base mb-4">
              קישורים שימושיים
            </h3>
            <ul className="space-y-2.5">
              {faq.forms.govLinks.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary/60 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-primary text-base mb-4">
              צרו קשר
            </h3>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <a
                  href={`tel:${business.phone}`}
                  className="text-sm text-primary/60 hover:text-white transition-colors"
                  style={{ fontFamily: "var(--font-grotesk), sans-serif" }}
                >
                  {business.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <a
                  href={`mailto:${business.email}`}
                  className="text-sm text-primary/60 hover:text-white transition-colors"
                  style={{ fontFamily: "var(--font-grotesk), sans-serif", direction: "ltr" }}
                >
                  {business.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-primary/60">
                  {business.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/20">
          <p className="text-center text-sm text-primary/50">
            {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
