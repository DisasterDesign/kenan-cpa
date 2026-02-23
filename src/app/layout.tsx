import type { Metadata } from "next";
import { Heebo, Space_Grotesk } from "next/font/google";
import { Phone } from "lucide-react";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingSquares from "@/components/ui/FloatingSquares";
import { BUSINESS } from "@/lib/constants";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["latin", "hebrew"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "קינן ושות׳ | רואי חשבון — משרד בוטיק מקצועי",
  description:
    "משרד רואי חשבון בוטיק ומקצועי. כל השירותים לעסק שלך תחת קורת גג אחת — הקמת חברות, דוחות כספיים, מיסוי, הנהלת חשבונות וייעוץ עסקי.",
  keywords: [
    "רואה חשבון",
    "רואי חשבון רמת גן",
    "הנהלת חשבונות",
    "פתיחת עסק",
    "דוחות כספיים",
    "מיסוי בינלאומי",
    "קינן רואי חשבון",
  ],
  icons: {
    icon: "/fabivon.svg",
    apple: "/fabivon.svg",
  },
  openGraph: {
    title: "קינן ושות׳ | רואי חשבון — חושבים מחוץ לקופסא",
    description:
      "משרד בוטיק מקצועי. כל השירותים לעסק שלך תחת קורת גג אחת.",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body
        className={`${heebo.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <FloatingSquares />
        <Header />
        <main id="main-content">{children}</main>
        <a
          href={`tel:${BUSINESS.phone}`}
          className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/30 hover:scale-110 transition-transform duration-300 floating-cta flex items-center justify-center"
          aria-label="התקשר אלינו"
        >
          <Phone className="w-6 h-6" />
        </a>
        <Footer />
      </body>
    </html>
  );
}
