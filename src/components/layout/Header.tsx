"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, Phone } from "lucide-react";
import { siteContent } from "@/lib/content";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { nav, business } = siteContent;
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  // Escape key + focus trap for mobile menu
  useEffect(() => {
    if (!isMenuOpen) return;

    // Auto-focus first link
    const firstLink = menuRef.current?.querySelector<HTMLElement>("a");
    firstLink?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (e.key === "Tab" && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 nav-bar transition-all duration-300 ${
        scrolled ? "scrolled shadow-lg" : ""
      }`}
      style={{ borderBottom: scrolled ? "1px solid rgba(35,31,32,0.08)" : "none" }}
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" aria-label="קינן ושות׳ — דף הבית">
            <Image
              src="/logo.svg"
              alt="קינן ושות׳, רואי חשבון"
              width={280}
              height={70}
              className="h-12 md:h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-menu-link text-sm ${
                  pathname === link.href ? "active" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:gap-3">
            <a
              href={`tel:${business.phone}`}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-white/90 text-primary font-medium text-sm rounded-xl btn-interactive transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              {nav.cta}
            </a>

            {/* Mobile menu button */}
            <button
              ref={menuButtonRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors text-primary hover:bg-white/15"
              aria-label={isMenuOpen ? "סגור תפריט" : "פתח תפריט"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="lg:hidden fixed inset-0 top-16 z-40"
          style={{
            background: "rgba(35, 31, 32, 0.97)",
            backdropFilter: "blur(16px)",
            animation: "menuFadeIn 0.25s ease-out",
          }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-2 px-6">
            {nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-xl font-medium py-3 px-6 rounded-xl transition-colors ${
                  pathname === link.href
                    ? "text-accent bg-white/5"
                    : "text-white hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${business.phone}`}
              className="mt-4 inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-medium rounded-xl btn-interactive"
            >
              <Phone className="w-5 h-5" />
              {nav.cta}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
