"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { siteContent } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";

export default function ContactPage() {
  const { contact, business } = siteContent;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parts = [];
    if (name) parts.push(`שם: ${name}`);
    if (email) parts.push(`אימייל: ${email}`);
    if (subject) parts.push(`נושא: ${subject}`);
    if (message) parts.push(`\n${message}`);

    const text =
      parts.length > 0
        ? parts.join("\n")
        : "שלום, אשמח לשמוע עוד על השירותים שלכם";

    const encoded = encodeURIComponent(text);
    window.open(
      `https://wa.me/${business.whatsapp}?text=${encoded}`,
      "_blank"
    );
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
          <SectionHeading badge={contact.badge} title={contact.title} light />
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-light py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Form */}
            <FadeIn>
              <form
                onSubmit={handleSubmit}
                className="p-6 md:p-8 rounded-2xl bg-white shadow-md shadow-button/8"
              >
                <h3 className="text-xl font-bold text-primary mb-6">
                  השאירו פרטים
                </h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={contact.form.namePlaceholder}
                    className="w-full px-4 py-3 bg-white border border-accent/30 rounded-xl text-primary placeholder-primary/40 focus:border-button focus:ring-1 focus:ring-button transition-all outline-none"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={contact.form.emailPlaceholder}
                    className="w-full px-4 py-3 bg-white border border-accent/30 rounded-xl text-primary placeholder-primary/40 focus:border-button focus:ring-1 focus:ring-button transition-all outline-none"
                    dir="ltr"
                  />
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={contact.form.subjectPlaceholder}
                    className="w-full px-4 py-3 bg-white border border-accent/30 rounded-xl text-primary placeholder-primary/40 focus:border-button focus:ring-1 focus:ring-button transition-all outline-none"
                  />
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={contact.form.messagePlaceholder}
                    rows={5}
                    className="w-full px-4 py-3 bg-white border border-accent/30 rounded-xl text-primary placeholder-primary/40 focus:border-button focus:ring-1 focus:ring-button transition-all resize-none outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white font-bold rounded-xl btn-interactive transition-all duration-300"
                  >
                    <Send className="w-5 h-5" />
                    {contact.form.button}
                  </button>
                </div>
              </form>
            </FadeIn>

            {/* Contact Details + Map */}
            <div className="space-y-6">
              <FadeIn delay={0.15}>
                <div className="p-6 md:p-8 rounded-2xl bg-white shadow-md shadow-button/8">
                  <h3 className="text-xl font-bold text-primary mb-6">
                    פרטי התקשרות
                  </h3>
                  <ul className="space-y-5">
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-button/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-button" />
                      </div>
                      <div>
                        <p className="text-sm text-primary/60 mb-1">טלפון</p>
                        <a
                          href={`tel:${business.phone}`}
                          className="text-primary font-medium hover:text-button transition-colors"
                          style={{ fontFamily: "var(--font-grotesk), sans-serif" }}
                        >
                          {business.phone}
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-button/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-button" />
                      </div>
                      <div>
                        <p className="text-sm text-primary/60 mb-1">
                          דואר אלקטרוני
                        </p>
                        <a
                          href={`mailto:${business.email}`}
                          className="text-primary font-medium hover:text-button transition-colors"
                          dir="ltr"
                          style={{ fontFamily: "var(--font-grotesk), sans-serif" }}
                        >
                          {business.email}
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-button/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-button" />
                      </div>
                      <div>
                        <p className="text-sm text-primary/60 mb-1">כתובת</p>
                        <p className="text-primary font-medium">
                          {business.address}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </FadeIn>

              {/* Google Maps */}
              <FadeIn delay={0.3}>
                <div className="rounded-2xl overflow-hidden shadow-md shadow-button/8 h-[300px]">
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&q=${encodeURIComponent(contact.mapQuery)}&language=he`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="מיקום המשרד"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
