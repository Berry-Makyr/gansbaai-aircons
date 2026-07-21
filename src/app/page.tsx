import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import CommunityOutreach from "@/components/CommunityOutreach";
import Services from "@/components/Services";
import Legacy from "@/components/Legacy";
import ApprovedDealers from "@/components/ApprovedDealers";
import Reviews from "@/components/Reviews";
import Gallery from "@/components/Gallery";
import LocationMap from "@/components/LocationMap";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import LocalBusinessJsonLd from "@/components/LocalBusinessJsonLd";
import { getHomepageContent } from "@/lib/cms/fetch";
import { prepareGalleryForClient } from "@/lib/cms/prepare";

export async function generateMetadata(): Promise<Metadata> {
  const { siteSettings } = await getHomepageContent();
  return {
    title: siteSettings.seoTitle,
    description: siteSettings.seoDescription,
    alternates: {
      canonical: "https://gansbaaiaircon.co.za",
    },
    keywords: [
      "air conditioning Gansbaai",
      "commercial refrigeration Overberg",
      "cold room repairs",
      "wine cellar refrigeration",
      "milk tank refrigeration",
      "car aircon re-gas Gansbaai",
      "24 hour refrigeration repairs",
    ],
    openGraph: {
      title: siteSettings.seoTitle,
      description: siteSettings.seoDescription,
      url: "https://gansbaaiaircon.co.za",
      siteName: siteSettings.shortName,
      locale: "en_ZA",
      type: "website",
    },
  };
}

export default async function Home() {
  const content = await getHomepageContent();
  const galleryImages = prepareGalleryForClient(content.gallery);
  const serviceOptions = content.services.map((s) => s.title);

  return (
    <>
      <LocalBusinessJsonLd
        siteSettings={content.siteSettings}
        services={content.services}
      />
      <Navbar siteSettings={content.siteSettings} />
      <main>
        <Hero hero={content.hero} />
        <Services services={content.services} />
        <ApprovedDealers content={content.dealersSection} />
        <WhyChooseUs content={content.whyChooseUs} />
        <ContactForm
          siteSettings={content.siteSettings}
          serviceOptions={serviceOptions}
        />
        <LocationMap siteSettings={content.siteSettings} />
        <Gallery images={galleryImages} />
        <Legacy content={content.legacy} />
        <CommunityOutreach content={content.communityOutreach} />
        <Reviews
          content={content.reviewsSection}
          siteSettings={content.siteSettings}
        />
      </main>
      <Footer
        siteSettings={content.siteSettings}
        services={content.services}
      />
      <FloatingActions siteSettings={content.siteSettings} />
    </>
  );
}
