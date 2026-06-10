import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Clapperboard,
  Heart,
  House,
  Scissors,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { absoluteUrl, pageJsonLd } from "@/data/seo";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Service Directory | Good Looks Media Group" },
      {
        name: "description",
        content:
          "Quick directory of Good Looks Media Group service lanes: business video, real estate media, wedding films, artist visuals, and editing support.",
      },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: "Service Directory | Good Looks Media Group" },
      {
        property: "og:description",
        content:
          "Quick directory of Good Looks Media Group service lanes: business video, real estate media, wedding films, artist visuals, and editing support.",
      },
      { property: "og:url", content: absoluteUrl("/services") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/services") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          pageJsonLd({
            name: "Service Directory",
            description:
              "Directory page for business video, real estate media, wedding films, artist visuals, and editing support.",
            path: "/services",
          }),
        ),
      },
    ],
  }),
  component: ServicesPage,
});

const CORE_LANES = [
  {
    title: "Business Video",
    description:
      "The commercial lane for brand films, social campaigns, testimonials, launch videos, and trust-building content.",
    role: "Best for businesses that need clearer positioning and stronger buyer confidence.",
    anchor: "Starting at $900",
    href: "/business-video",
    packageHref: "/packages#business-video",
    quoteHref: "/contact?projectType=Business%20%26%20Brand%20Video",
    serviceLane: "business",
    Icon: Building2,
  },
  {
    title: "Real Estate",
    description:
      "The growth lane for listing videos, agent branding, cinematic property walkthroughs, and short-form distribution.",
    role: "Best for agents, teams, and brokerages that want more than a commodity walkthrough vendor.",
    anchor: "Starting at $350",
    href: "/real-estate-media",
    packageHref: "/packages#real-estate-media",
    quoteHref: "/contact?projectType=Real%20Estate%20Media",
    serviceLane: "realEstate",
    Icon: House,
  },
  {
    title: "Weddings & Events",
    description:
      "The premium emotional lane for wedding-first storytelling, with event recap coverage as a secondary offering.",
    role: "Best for couples first, then organizers who still want polished event coverage.",
    anchor: "Starting at $1,000",
    href: "/weddings",
    packageHref: "/packages#weddings-events",
    quoteHref: "/contact?projectType=Wedding%20Film",
    serviceLane: "wedding",
    Icon: Heart,
  },
  {
    title: "Artist Visuals",
    description:
      "A separate creative lane for music videos, release visuals, performance edits, and campaign-ready promo assets.",
    role: "Best for artists who need visuals tied to a release, not filler footage.",
    anchor: "Starting at $900",
    href: "/music-videos",
    packageHref: "/packages#artist-visuals",
    quoteHref: "/contact?projectType=Artist%20Visuals",
    serviceLane: "artist",
    Icon: Clapperboard,
  },
] as const;

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="timecode mb-3">SERVICE DIRECTORY</p>
          <h1 className="font-display text-5xl md:text-7xl uppercase leading-[0.95] max-w-5xl">
            Start with the <span className="text-primary">right lane.</span>
          </h1>
          <p className="mt-5 text-muted-foreground text-lg max-w-3xl">
            This page is a quick routing guide for older links and first-time visitors. The main
            site is intentionally centered on business video, real estate media, weddings and
            events, and artist visuals, with editing kept as a support service.
          </p>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-5">
          {CORE_LANES.map((lane) => (
            <article
              key={lane.title}
              className="bg-card border border-border rounded-2xl p-7 md:p-9 grid lg:grid-cols-[1.2fr_0.8fr] gap-8 hover:border-primary transition"
            >
              <div>
                <div className="flex items-center gap-3">
                  <lane.Icon className="w-6 h-6 text-primary" />
                  <p className="timecode">{lane.title.toUpperCase()}</p>
                </div>
                <h2 className="mt-4 font-display text-3xl md:text-4xl uppercase">{lane.title}</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">{lane.description}</p>
                <p className="mt-4 text-sm">{lane.role}</p>
              </div>
              <div className="glass-panel rounded-2xl p-6 md:p-7 flex flex-col justify-between gap-5">
                <div>
                  <p className="timecode">Anchor pricing</p>
                  <p className="font-display text-3xl text-primary">{lane.anchor}</p>
                </div>
                <div className="grid gap-3">
                  <a
                    href={lane.href}
                    className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md uppercase tracking-widest text-sm font-semibold hover:opacity-90"
                    data-track-event="select_service_lane"
                    data-service-lane={lane.serviceLane}
                  >
                    Visit this lane <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href={lane.packageHref}
                    className="inline-flex items-center justify-center border border-foreground/30 px-6 py-3 rounded-md uppercase tracking-widest text-sm font-semibold hover:bg-foreground/10"
                    data-track-event="cta_click_pricing"
                    data-service-lane={lane.serviceLane}
                  >
                    View pricing
                  </a>
                  <a
                    href={lane.quoteHref}
                    className="inline-flex items-center justify-center border border-foreground/30 px-6 py-3 rounded-md uppercase tracking-widest text-sm font-semibold hover:bg-foreground/10"
                    data-track-event="cta_click_quote"
                    data-service-lane={lane.serviceLane}
                  >
                    Request a quote
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border rounded-2xl p-7 md:p-9 grid lg:grid-cols-[1fr_0.85fr] gap-8 items-start">
            <div>
              <SectionHeading
                eyebrow="Secondary support"
                title="Editing stays available, but it is not the homepage engine."
              />
              <p className="text-muted-foreground leading-relaxed">
                If the footage is already captured, Good Looks can step in for editing-only work.
                That lane is still public, but the site now treats it as support for existing
                footage instead of a main positioning pillar.
              </p>
            </div>
            <div className="glass-strong rounded-2xl p-6 md:p-7">
              <div className="flex items-center gap-3">
                <Scissors className="w-6 h-6 text-primary" />
                <p className="timecode">EDITING ONLY</p>
              </div>
              <p className="mt-4 text-muted-foreground">
                Reels, promos, event recaps, wedding highlights, artist edits, and client-shot
                footage cleanup.
              </p>
              <div className="mt-6 grid gap-3">
                <a
                  href="/editing"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md uppercase tracking-widest text-sm font-semibold hover:opacity-90"
                  data-track-event="select_service_lane"
                  data-service-lane="editing"
                >
                  View editing <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/contact?service=editing"
                  className="inline-flex items-center justify-center border border-foreground/30 px-6 py-3 rounded-md uppercase tracking-widest text-sm font-semibold hover:bg-foreground/10"
                  data-track-event="cta_click_quote"
                  data-service-lane="editing"
                >
                  Request an editing quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <p className="timecode mb-4">NOT SURE YET?</p>
          <h2 className="font-display text-4xl md:text-6xl uppercase leading-none">
            We&apos;ll route the project with you.
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            If the project overlaps lanes, the quote request is the best starting point.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-4 rounded-md uppercase tracking-widest text-sm font-semibold red-glow"
            data-track-event="cta_click_quote"
            data-service-lane="general"
          >
            Start a quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
