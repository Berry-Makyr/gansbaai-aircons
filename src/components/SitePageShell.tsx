import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import type { ServiceContent, SiteSettingsContent } from "@/lib/cms/types";

type SitePageShellProps = {
  siteSettings: SiteSettingsContent;
  services: ServiceContent[];
  children: ReactNode;
};

/** Shared chrome for inner marketing pages (solid nav, footer, floating CTAs). */
export default function SitePageShell({
  siteSettings,
  services,
  children,
}: SitePageShellProps) {
  return (
    <>
      <Navbar siteSettings={siteSettings} variant="solid" />
      <main className="pt-24 sm:pt-28">{children}</main>
      <Footer siteSettings={siteSettings} services={services} />
      <FloatingActions siteSettings={siteSettings} />
    </>
  );
}
