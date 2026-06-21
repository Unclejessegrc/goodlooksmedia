import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Camera, Check, Home, Sparkles, Video } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { PackageCard } from "@/components/site/PackageCard";
import { REAL_ESTATE_PACKAGES } from "@/data/packages";
import {
  absoluteUrl,
  businessJsonLd,
  faqJsonLd,
  pageJsonLd,
  serviceJsonLd,
  websiteJsonLd,
} from "@/data/seo";
import heroImage from "@/assets/hero.jpg";

const FAQ = [
  {
    q: "What kind of real estate content can you create?",
    a: "Listing videos, property walkthroughs, agent branding clips, short social reels, and broader content for builders, rental hosts, and property owners.",
  },
  {
    q: "Can this include aerial-style footage?",
    a: "Aerial-style or drone footage can be incorporated when it is available and legally approved for the project.",
  },
  {
    q: "Do you work only with agents?",
    a: "No. We also quote property media for builders, rental properties, and owner-led projects when the content need is clear.",
  },
  {
    q: "How is turnaround handled?",
    a: "Turnaround depends on the scope, number of deliverables, and whether the project needs a faster social-first rollout or a fuller branded edit. We confirm timing before booking.",
  },
];

const USE_CASES = [
  ["Listing Videos", Video],
  ["Property Walkthroughs", Home],
  ["Agent Branding Clips", Building2],
  ["Social Reels", Sparkles],
] as const;

const DELIVERABLES = [
  "Listing walkthrough video",
  "Agent-branded intro or outro",
  "Vertical social cutdowns",
  "Neighborhood and lifestyle context",
  "Online delivery link",
  "Platform-ready exports",
];

export const Route = createFileRoute("/real-estate-media")({
  head: () => ({
    meta: [
      { title: "Real Estate Video Rhode Island | Property Listing Media" },
      {
        name: "description",
        content:
          "Real estate video and property listing media in Rhode Island for agents, builders, and property owners. Listing videos, walkthrough footage, exterior coverage, social-ready edits, and fast turnaround.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Real Estate Video Rhode Island | Property Listing Media" },
      {
        property: "og:description",
        content:
          "Real estate video and property listing media in Rhode Island for agents, builders, and property owners.",
      },
      { property: "og:url", content: absoluteUrl("/real-estate-media") },
      { name: "twitter:title", content: "Real Estate Video Rhode Island | Property Listing Media" },
      {
        name: "twitter:description",
        content:
          "Real estate video and property listing media in Rhode Island for agents, builders, and property owners.",
      },
    ],
    links: [
      { rel: "canonical", href: absoluteUrl("/real-estate-media") },
      { rel: "preload", as: "image", href: heroImage },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            businessJsonLd(),
            websiteJsonLd(),
            pageJsonLd({
              name: "Real Estate Video & Property Media in Rhode Island",
              description:
                "Real estate listing films, walkthroughs, agent branding clips, and social-ready property media for Rhode Island professionals.",
              path: "/real-estate-media",
            }),
            serviceJsonLd({
              name: "Real Estate Video & Property Media in Rhode Island",
              description:
                "Listing videos, property walkthroughs, agent branding clips, and social-ready reels for Rhode Island real estate marketing.",
              path: "/real-estate-media",
              serviceType: "Real estate media production",
            }),
            faqJsonLd(FAQ),
          ],
        }),
      },
    ],
  }),
  component: RealEstateMediaPage,
});

function RealEstateMediaPage() {
  return (
    <SiteLayout>
      <section className="relative min-h-[82vh] overflow-hidden flex items-center">
        <img
          src={heroImage}
          alt="Good Looks Media Group real estate media production in Rhode Island"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/72 via-background/58 to-background" />
        <div className="absolute inset-0 film-grain" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <p className="timecode mb-5">REAL ESTATE MEDIA - RHODE ISLAND</p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.9] max-w-5xl text-balance">
            Real Estate Video & Property Media in Rhode Island
          </h1>
          <p className="mt-6 max-w-3xl text-lg md:text-xl leading-relaxed text-muted-foreground">
            We create listing videos, walkthroughs, agent-branding clips, and social-ready reels
            for Rhode Island agents, builders, property owners, and rental hosts who need more than
            a generic walkthrough.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/contact"
              search={{ projectType: "Real Estate Media" }}
              className="bg-primary text-primary-foreground px-7 py-4 rounded-md uppercase text-sm font-semibold hover:opacity-90 red-glow"
              data-track-event="cta_click_quote"
              data-service-lane="realEstate"
            >
              Book a Listing Shoot
            </Link>
            <a
              href="#real-estate-pricing"
              className="border border-foreground/30 text-foreground px-7 py-4 rounded-md uppercase text-sm font-semibold hover:bg-foreground/10"
              data-track-event="cta_click_pricing"
              data-service-lane="realEstate"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What we create"
            title="Built for listings, feeds, and the agent brand."
            subtitle="The deliverable has to work in more than one place, so the shoot is planned for both property clarity and marketing reuse."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {USE_CASES.map(([title, Icon]) => (
              <article key={title} className="glass-panel rounded-2xl p-6">
                <Icon className="w-7 h-7 text-primary" />
                <h2 className="font-display text-2xl uppercase mt-4">{title}</h2>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionHeading
              eyebrow="Why this lane feels different"
              title="The goal is not just to show the property. It is to make the agent easier to remember."
            />
            <p className="text-muted-foreground leading-relaxed">
              Good Looks brings stronger rhythm, pacing, and social-first instincts to real estate
              media without turning the final result into a music video. The visual edge helps the
              listing feel sharper, while the deliverable stays built for actual agent use.
            </p>
          </div>
          <div className="glass-strong rounded-2xl p-7 md:p-9">
            <p className="timecode mb-3">SAMPLE DELIVERABLES</p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {DELIVERABLES.map((item) => (
                <li key={item} className="glass-panel rounded-xl p-4 flex gap-3">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="real-estate-pricing" className="scroll-mt-32 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Pricing"
            title="Three tiers built around launch speed, agent branding, and content reuse."
            subtitle="Use the anchor tier as the likely fit. Final scope depends on the property, the agent presence, and how many usable cutdowns the project needs."
          />
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {REAL_ESTATE_PACKAGES.map((pkg) => (
              <PackageCard key={pkg.name} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card/40 border-y border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="FAQ" title="Real estate media questions." />
          <div className="grid gap-4">
            {FAQ.map((item) => (
              <article key={item.q} className="bg-card border border-border rounded-2xl p-6">
                <h2 className="font-medium">{item.q}</h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="timecode mb-4">READY TO LIST?</p>
          <Camera className="mx-auto mb-6 h-10 w-10 text-primary" />
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.95] text-balance">
            Build property media that helps the next listing and the next pitch.
          </h2>
          <p className="mt-6 text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Send the area, target timing, and the kind of content you need. We will shape the
            right tier and quote from there.
          </p>
          <Link
            to="/contact"
            search={{ projectType: "Real Estate Media" }}
            className="mt-10 inline-flex bg-primary text-primary-foreground px-7 py-4 rounded-md uppercase text-sm font-semibold red-glow"
            data-track-event="cta_click_quote"
            data-service-lane="realEstate"
          >
            Book a Listing Shoot
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
