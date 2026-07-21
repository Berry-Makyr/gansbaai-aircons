import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { navLinks } from "@/data/navigation";
import { isPlaceholder } from "@/data/business";
import type { ServiceContent, SiteSettingsContent } from "@/lib/cms/types";
import Logo from "@/components/Logo";

type FooterProps = {
  siteSettings: SiteSettingsContent;
  services: ServiceContent[];
};

export default function Footer({ siteSettings, services }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const email = siteSettings.email;

  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-10 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Logo variant="footer" />
            </Link>
            <p className="text-slate-400 mb-6 leading-relaxed">
              {siteSettings.tagline}. Professional air conditioning and
              refrigeration services in the {siteSettings.serviceArea} areas.
            </p>
            <div className="flex items-center gap-4">
              <a
                href={siteSettings.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-sky-500 hover:text-white transition-all"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-sky-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.slice(0, 6).map((service) => (
                <li key={service.id} className="text-slate-400">
                  {service.title}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin
                  className="w-5 h-5 text-sky-500 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>
                  {siteSettings.address.line1}
                  <br />
                  {siteSettings.address.line2}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone
                  className="w-5 h-5 text-sky-500 shrink-0"
                  aria-hidden="true"
                />
                <a
                  href={`tel:${siteSettings.phone.tel}`}
                  className="hover:text-sky-400 transition-colors"
                >
                  {siteSettings.phone.display}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail
                  className="w-5 h-5 text-sky-500 shrink-0"
                  aria-hidden="true"
                />
                {isPlaceholder(email) ? (
                  <span className="placeholder-marker text-sm">{email}</span>
                ) : (
                  <a
                    href={`mailto:${email}`}
                    className="hover:text-sky-400 transition-colors"
                  >
                    {email}
                  </a>
                )}
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>
            &copy; {currentYear} {siteSettings.shortName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
