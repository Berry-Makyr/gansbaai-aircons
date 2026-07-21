"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, MessageCircle, Phone } from "lucide-react";
import { getWhatsAppUrl } from "@/data/business";
import type { SiteSettingsContent } from "@/lib/cms/types";

type FloatingActionsProps = {
  siteSettings: SiteSettingsContent;
};

export default function FloatingActions({ siteSettings }: FloatingActionsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const quotePill =
    "inline-flex size-11 sm:size-12 items-center justify-center rounded-full bg-sky-500/20 text-sky-100 border border-sky-400/30 backdrop-blur-sm transition-colors hover:bg-sky-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60";
  const whatsappPill =
    "inline-flex size-11 sm:size-12 items-center justify-center rounded-full bg-[#25D366]/20 text-green-100 border border-[#25D366]/30 backdrop-blur-sm transition-colors hover:bg-[#25D366]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300/60";
  const emergencyPill =
    "inline-flex size-11 sm:size-12 items-center justify-center rounded-full bg-red-600/20 text-red-100 border border-red-400/30 backdrop-blur-sm transition-colors hover:bg-red-600/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/60";

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(
        window.innerWidth >= 640 || window.scrollY > window.innerHeight * 0.55
      );
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <div
      className={`fixed right-3 sm:right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex flex-col items-end gap-2 transition-all duration-300 ${
        isVisible
          ? "translate-x-0 opacity-100"
          : "translate-x-16 opacity-0 pointer-events-none"
      }`}
      aria-label="Quick contact actions"
      aria-hidden={!isVisible}
    >
      <a
        href={getWhatsAppUrl(
          siteSettings.whatsapp.number,
          undefined,
          siteSettings.whatsapp.defaultMessage
        )}
        target="_blank"
        rel="noopener noreferrer"
        className={whatsappPill}
        aria-label="Chat on WhatsApp"
        tabIndex={isVisible ? 0 : -1}
      >
        <MessageCircle className="size-5 text-green-300" aria-hidden="true" />
      </a>

      <a
        href={`tel:${siteSettings.phone.tel}`}
        className={quotePill}
        aria-label={`Call now: ${siteSettings.phone.display}`}
        tabIndex={isVisible ? 0 : -1}
      >
        <Phone className="size-5 text-sky-300" aria-hidden="true" />
      </a>

      <a
        href={`tel:${siteSettings.emergencyPhone.tel}`}
        className={emergencyPill}
        aria-label={`24-hour emergency breakdown call: ${siteSettings.emergencyPhone.display}`}
        tabIndex={isVisible ? 0 : -1}
      >
        <AlertTriangle className="size-5 text-red-300" aria-hidden="true" />
      </a>
    </div>
  );
}
