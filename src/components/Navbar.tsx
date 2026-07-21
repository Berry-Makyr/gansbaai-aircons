"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { navLinks } from "@/data/navigation";
import type { SiteSettingsContent } from "@/lib/cms/types";

type NavbarProps = {
  siteSettings: SiteSettingsContent;
};

export default function Navbar({ siteSettings }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMobileMenuOpen(false);

  const textClass = isScrolled ? "text-slate-800" : "text-white";
  const linkClass = isScrolled
    ? "text-slate-700 hover:text-sky-600"
    : "text-slate-100 hover:text-sky-300";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="mr-4 min-w-0 max-w-[11.5rem] sm:max-w-[15rem] lg:max-w-[13.5rem] xl:max-w-[16rem] shrink"
            onClick={closeMenu}
          >
            <span
              className={`block text-sm sm:text-base font-bold tracking-tight leading-snug ${textClass}`}
            >
              {siteSettings.name}
            </span>
          </Link>

          <nav
            className="hidden lg:flex items-center gap-4 xl:gap-6 shrink-0"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${linkClass}`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href={`tel:${siteSettings.phone.tel}`}
              className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>Call Us</span>
            </a>
          </nav>

          <button
            onClick={toggleMenu}
            className={`lg:hidden p-2 rounded-md ${textClass}`}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen
            ? "max-h-[80vh] overflow-y-auto border-t border-slate-100"
            : "max-h-0"
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <nav
          className="px-4 py-4 space-y-3 flex flex-col"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={closeMenu}
              className="text-slate-800 font-medium hover:text-sky-600 transition-colors py-1"
            >
              {link.name}
            </Link>
          ))}
          <a
            href={`tel:${siteSettings.phone.tel}`}
            className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 rounded-md font-medium transition-colors mt-2"
          >
            <Phone className="w-5 h-5" aria-hidden="true" />
            <span>Call Us Now</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
