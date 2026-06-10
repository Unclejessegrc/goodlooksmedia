import { CONTACT } from "./contact";

export const SITE_URL = "https://www.goodlooksmedia.com";
export const SITE_NAME = "Good Looks Media Group";
export const OG_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/73fa5981-b0b2-4bb4-bbf0-0217ea63b5d4/id-preview-dee7a45a--c960d588-e9bd-406c-bb13-7d348a108e08.lovable.app-1778958773703.png";

export const SERVICE_AREAS = [
  "Warwick, RI",
  "Rhode Island",
  "Providence, RI",
  "Cranston, RI",
  "Pawtucket, RI",
  "Newport, RI",
  "Bristol, RI",
  "East Greenwich, RI",
  "Narragansett, RI",
  "South County, RI",
  "Massachusetts by quote",
  "Connecticut by quote",
  "New England by quote",
];

export const SEO_SERVICES = [
  "Rhode Island video production",
  "Rhode Island video marketing",
  "Rhode Island strategic video production",
  "Rhode Island business video",
  "Rhode Island commercial video production",
  "Rhode Island real estate video",
  "Rhode Island real estate media",
  "Agent branding video Rhode Island",
  "Rhode Island wedding videographer",
  "Rhode Island event videography",
  "Rhode Island music video production",
  "Business video production Rhode Island",
  "New England video production",
];

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    url: SITE_URL,
    image: OG_IMAGE,
    logo: OG_IMAGE,
    description:
      "Good Looks Media Group is a Warwick, Rhode Island video marketing and production company serving Rhode Island and nearby New England with business video, real estate media, wedding films, event recaps, and artist visuals.",
    telephone: "+1-401-465-1529",
    email: CONTACT.email,
    priceRange: "$$",
    foundingDate: "2018",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Warwick",
      addressRegion: "RI",
      addressCountry: "US",
    },
    areaServed: SERVICE_AREAS.map((name) => ({ "@type": "Place", name })),
    sameAs: [CONTACT.instagramUrl, CONTACT.youtubeUrl],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-401-465-1529",
      email: CONTACT.email,
      contactType: "customer service",
      areaServed: ["US-RI", "US-CT", "US-MA"],
      availableLanguage: "English",
    },
    makesOffer: SEO_SERVICES.map((name) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name,
        areaServed: SERVICE_AREAS.map((area) => ({ "@type": "Place", name: area })),
        provider: { "@id": `${SITE_URL}/#business` },
      },
    })),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#business` },
    inLanguage: "en-US",
  };
}

export function serviceJsonLd({
  name,
  description,
  path,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name,
    description,
    url: absoluteUrl(path),
    provider: { "@id": `${SITE_URL}/#business`, name: SITE_NAME },
    areaServed: SERVICE_AREAS.map((area) => ({ "@type": "Place", name: area })),
    serviceType: serviceType ?? name,
  };
}

export function videoObjectJsonLd({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  embedUrl,
  contentUrl,
}: {
  name: string;
  description: string;
  thumbnailUrl?: string;
  uploadDate?: string;
  duration?: string;
  embedUrl?: string;
  contentUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    ...(thumbnailUrl ? { thumbnailUrl: [thumbnailUrl] } : {}),
    ...(uploadDate ? { uploadDate } : {}),
    ...(duration ? { duration } : {}),
    ...(embedUrl ? { embedUrl } : {}),
    ...(contentUrl ? { contentUrl } : {}),
    publisher: { "@id": `${SITE_URL}/#business`, name: SITE_NAME },
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function pageJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#business` },
    inLanguage: "en-US",
  };
}
