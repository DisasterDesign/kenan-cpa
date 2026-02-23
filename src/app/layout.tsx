import type { Metadata } from "next";
import { Heebo, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingSquares from "@/components/ui/FloatingSquares";

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
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
