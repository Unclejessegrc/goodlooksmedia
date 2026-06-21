import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PackageCard } from "@/components/site/PackageCard";
import {
  BUSINESS_PACKAGES,
  EDITING_PACKAGES,
  EVENT_PACKAGES,
  MUSIC_PACKAGES,
  REAL_ESTATE_PACKAGES,
  WEDDING_PACKAGES,
} from "@/data/packages";
import { absoluteUrl, pageJsonLd } from "@/data/seo";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Video Production Pricing Rhode Island | GLMG" },
      {
        name: "description",
        content:
          "Video production pricing in Rhode Island for real estate listing video, business video, weddings, events, artist visuals, and editing. Custom quotes by scope.",
      },
      { property: "og:title", content: "Video Production Pricing Rhode Island | GLMG" },
      {
        property: "og:description",
        content:
          "Starting investments and custom quotes for Rhode Island video production.",
      },
      { property: "og:url", content: absoluteUrl("/packages") },
      { name: "twitter:title", content: "Video Production Pricing Rhode Island | GLMG" },
      {
        name: "twitter:description",
        content:
          "Starting investments and custom quotes for Rhode Island video production.",
      },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/packages") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          pageJsonLd({
            name: "Video Production Pricing Rhode Island",
            description:
              "Video production pricing in Rhode Island for real estate, business, weddings, events, artist visuals, and editing.",
            path: "/packages",
          }),
        ),
      },
    ],
  }),
  component: PackagesPage,
});

const FAQ = [
  {
    q: "Are these fixed prices?",
    a: "No. These are starting investments and anchor tiers. Rush delivery, raw footage, extra revisions, additional formats, extended coverage, drone add-ons, and travel outside the standard service area may affect the final quote.",
  },
  {
    q: "Why are weddings and events grouped together here?",
    a: "They share one public lane, but weddings remain the primary premium offer. Event recap coverage is still available inside that lane by quote.",
  },
  {
    q: "Can we still request something custom?",
    a: "Yes. If the project falls outside the listed starting points, we quote it by scope.",
  },
  {
    q: "What if we already have footage?",
    a: "Use the editing-only route for that. It stays available, but it is intentionally secondary to the four main lanes on this page.",
  },
];

function PackagesPage() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      window.requestAnimationFrame(() => {
        try {
          document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
        } catch {
          // Expected hashes are internal lane IDs.
        }
      });
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return (
    <SiteLayout>
      <section className="pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="timecode mb-3">PRICING</p>
          <h1 className="font-display text-5xl md:text-7xl uppercase leading-[0.95] max-w-4xl">
            Clear starting investments. <span className="text-primary">Custom scope</span> when the
            project needs it.
          </h1>
          <p className="mt-5 text-muted-foreground text-lg max-w-3xl">
            The site is structured around four public lanes: business video, real estate media,
            weddings and events, and artist visuals. Editing-only work stays available, but it is
            intentionally secondary here.
          </p>
        </div>
      </section>

      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-5">
          <div className="bg-card border border-primary/40 rounded-2xl p-7 md:p-10 grid md:grid-cols-[1fr_auto] gap-6 items-center red-glow">
            <div>
              <p className="timecode mb-3">FEATURED OFFER</p>
              <h2 className="font-display text-4xl uppercase leading-none">
                Real Estate Listing Video Package
              </h2>
              <p className="mt-4 text-muted-foreground max-w-3xl">
                Listing videos and property content for Rhode Island agents, builders, and property
                owners. Designed to help listings stand out online with clean walkthrough footage,
                exterior coverage, social-ready edits, and fast turnaround.
              </p>
              <p className="mt-4 font-display text-3xl text-primary">Starting at $650</p>
            </div>
            <Link
              to="/contact"
              search={{ projectType: "Real Estate Media" }}
              className="inline-flex justify-center bg-primary text-primary-foreground px-7 py-4 rounded-md uppercase tracking-widest text-sm font-semibold"
              data-track-event="cta_click_quote"
              data-service-lane="realEstate"
            >
              Book a Listing Shoot
            </Link>
          </div>

          <div className="bg-card border border-border rounded-2xl p-7 md:p-10 grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <p className="timecode mb-3">EDITING ONLY</p>
              <h2 className="font-display text-4xl uppercase leading-none">Already have footage?</h2>
              <p className="mt-4 text-muted-foreground max-w-3xl">
                Editing packages still exist for client-shot footage, but they are separate from the
                main filmed service lanes.
              </p>
            </div>
            <Link
              to="/editing"
              className="inline-flex justify-center bg-primary text-primary-foreground px-6 py-3 rounded-md uppercase tracking-widest text-sm font-semibold"
            >
              Send Your Footage for a Quote
            </Link>
          </div>
        </div>
      </section>

      <section id="business-video" className="scroll-mt-32 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Business & Brand Video"
            subtitle="Built for website trust, testimonials, explainers, social campaigns, and repeatable brand content."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BUSINESS_PACKAGES.map((pkg) => (
              <PackageCard key={pkg.name} pkg={pkg} ctaLabel="Request a Custom Quote" />
            ))}
          </div>
        </div>
      </section>

      <section id="real-estate-media" className="scroll-mt-32 py-14 md:py-20 bg-card/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Real Estate Media"
            subtitle="Built for listing launches, short-form distribution, and stronger agent-branding assets."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REAL_ESTATE_PACKAGES.map((pkg) => (
              <PackageCard key={pkg.name} pkg={pkg} ctaLabel="Request a Custom Quote" />
            ))}
          </div>
        </div>
      </section>

      <section id="weddings-events" className="scroll-mt-32 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Weddings & Events"
            subtitle="Wedding films stay first. Event recap coverage stays available in the same public lane."
          />
          <div className="grid gap-10">
            <div>
              <p className="timecode mb-4">WEDDING FILMS</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {WEDDING_PACKAGES.map((pkg) => (
                  <PackageCard key={pkg.name} pkg={pkg} ctaLabel="Request a Custom Quote" />
                ))}
              </div>
            </div>
            <div>
              <p className="timecode mb-4">EVENT COVERAGE</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {EVENT_PACKAGES.map((pkg) => (
                  <PackageCard key={pkg.name} pkg={pkg} ctaLabel="Request a Custom Quote" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="artist-visuals" className="scroll-mt-32 py-14 md:py-20 bg-card/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Artist Visuals"
            subtitle="Music videos, performance visuals, promo clips, and release-ready campaign assets."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MUSIC_PACKAGES.map((pkg) => (
              <PackageCard key={pkg.name} pkg={pkg} ctaLabel="Request a Custom Quote" />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="FAQ" title="Pricing questions." />
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

      <section className="py-20 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-display text-4xl md:text-5xl uppercase">Need help choosing?</h2>
          <p className="mt-3 text-muted-foreground">
            Send the service lane, timing, city, and rough budget. We will point you toward the
            best starting scope or quote it custom.
          </p>
          <Link
            to="/contact"
            className="mt-7 inline-block bg-primary text-primary-foreground px-7 py-4 rounded-md uppercase tracking-widest text-sm font-semibold red-glow"
            data-track-event="cta_click_quote"
            data-service-lane="general"
          >
            Request a Custom Quote
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
