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
import Faq from "@/components/Faq";
import FaqJsonLd from "@/components/FaqJsonLd";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import LocalBusinessJsonLd from "@/components/LocalBusinessJsonLd";
import { getHomepageContent } from "@/lib/cms/fetch";
import { prepareGalleryForClient } from "@/lib/cms/prepare";
import { SITE_URL, absoluteUrl } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { siteSettings, hero } = await getHomepageContent();
  const ogImage =
    typeof hero.backgroundImage === "string"
      ? absoluteUrl(hero.backgroundImage)
      : hero.backgroundImage.url || absoluteUrl("/icon");

  return {
    title: siteSettings.seoTitle,
    description: siteSettings.seoDescription,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: SITE_URL,
    },
    keywords: [
      "Gansbaai Aircon",
      "Gansbaai Aircon and Refrigeration",
      "air conditioning Gansbaai",
      "refrigeration Gansbaai",
      "commercial refrigeration Overberg",
      "cold room repairs",
      "wine cellar refrigeration",
      "milk tank refrigeration",
      "car aircon re-gas Gansbaai",
      "24 hour refrigeration repairs",
      "HVAC Overstrand",
    ],
    openGraph: {
      title: siteSettings.seoTitle,
      description: siteSettings.seoDescription,
      url: SITE_URL,
      siteName: siteSettings.shortName,
      locale: "en_ZA",
      type: "website",
      images: [
        {
          url: ogImage,
          alt: hero.backgroundImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteSettings.seoTitle,
      description: siteSettings.seoDescription,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

type HomeProps = {
  searchParams?: Promise<{ service?: string }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = (await searchParams) ?? {};
  const content = await getHomepageContent();
  const galleryImages = prepareGalleryForClient(content.gallery);
  const serviceOptions = content.services.map((s) => s.title);

  return (
    <>
      <LocalBusinessJsonLd
        siteSettings={content.siteSettings}
        services={content.services}
      />
      <FaqJsonLd />
      <Navbar siteSettings={content.siteSettings} />
      <main>
        <Hero hero={content.hero} siteSettings={content.siteSettings} />
        <Services services={content.services} />
        <ApprovedDealers content={content.dealersSection} />
        <WhyChooseUs content={content.whyChooseUs} />
        <Faq />
        <ContactForm
          siteSettings={content.siteSettings}
          serviceOptions={serviceOptions}
          defaultService={params.service}
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
