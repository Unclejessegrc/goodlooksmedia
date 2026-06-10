import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Check, Heart, PartyPopper, Play, ShieldCheck } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { PackageCard } from "@/components/site/PackageCard";
import { WEDDING_PACKAGES } from "@/data/packages";
import {
  absoluteUrl,
  businessJsonLd,
  faqJsonLd,
  pageJsonLd,
  serviceJsonLd,
  websiteJsonLd,
} from "@/data/seo";

const heroPoster = "/AdobeStock_2007799559.jpeg";

const FAQ = [
  {
    q: "Do you film weddings outside Rhode Island?",
    a: "Yes. Good Looks Media Group is based in Warwick, Rhode Island and films weddings across Rhode Island and nearby New England by quote.",
  },
  {
    q: "Can this page also cover event recap films?",
    a: "Yes. This lane is built wedding-first, but we still quote event recap coverage for fundraisers, conferences, parties, performances, and other live moments when the fit is right.",
  },
  {
    q: "What do clients usually receive?",
    a: "That depends on the package, but typical deliverables include a highlight film, audio moments when possible, online delivery, and social-ready cutdowns when scoped into the project.",
  },
  {
    q: "How do we start?",
    a: "The first step is availability. Send the date, city, and what kind of film you are hoping to keep, and we will shape the right coverage from there.",
  },
];

const WEDDING_POINTS = [
  "A film built around voices, movement, and atmosphere",
  "Coverage planned for the emotional arc, not just a recap",
  "Online delivery with social-ready moments available by quote",
  "Rhode Island first, nearby New England by quote",
];

const EVENT_TYPES = [
  "Event recaps",
  "Conferences and fundraisers",
  "Private parties and milestone celebrations",
  "Performances and live moments",
];

export const Route = createFileRoute("/weddings")({
  head: () => ({
    meta: [
      { title: "Wedding & Event Videography in Rhode Island and New England | Good Looks Media Group" },
      {
        name: "description",
        content:
          "Wedding videography in Rhode Island and New England, with event recap coverage available as a secondary quote path for conferences, fundraisers, parties, and performances.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Wedding & Event Videography in Rhode Island and New England | Good Looks Media Group" },
      {
        property: "og:description",
        content:
          "Wedding films first, with event recap coverage available as a secondary quote path.",
      },
      { property: "og:url", content: absoluteUrl("/weddings") },
      { name: "twitter:title", content: "Wedding & Event Videography in Rhode Island and New England | Good Looks Media Group" },
      {
        name: "twitter:description",
        content:
          "Wedding films first, with event recap coverage available as a secondary quote path.",
      },
    ],
    links: [
      { rel: "canonical", href: absoluteUrl("/weddings") },
      { rel: "preload", as: "image", href: heroPoster },
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
              name: "Wedding & Event Videography in Rhode Island and New England",
              description:
                "Wedding films and event recap videography for Rhode Island and nearby New England clients.",
              path: "/weddings",
            }),
            serviceJsonLd({
              name: "Wedding & Event Videography in Rhode Island and New England",
              description:
                "Wedding films, event recaps, highlight films, and live-moment coverage for Rhode Island and nearby New England.",
              path: "/weddings",
              serviceType: "Wedding and event videography",
            }),
            faqJsonLd(FAQ),
          ],
        }),
      },
    ],
  }),
  component: WeddingsPage,
});

function WeddingsPage() {
  return (
    <SiteLayout>
      <section className="relative min-h-[84vh] overflow-hidden flex items-center">
        <img
          src={heroPoster}
          alt="Rhode Island wedding and event videography"
          className="absolute inset-0 h-full w-full object-cover object-center"
          width={1600}
          height={1067}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/78 via-background/56 to-background" />
        <div className="absolute inset-0 film-grain" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <p className="timecode mb-5">WEDDINGS & EVENTS - RHODE ISLAND AND NEW ENGLAND</p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.9] max-w-5xl text-balance">
            Wedding & Event Videography in Rhode Island and New England
          </h1>
          <p className="mt-6 max-w-3xl text-lg md:text-xl leading-relaxed text-muted-foreground">
            This page is built wedding-first for couples who want a film worth keeping. Event
            recap coverage still lives here, but as a secondary quote path for conferences,
            fundraisers, parties, performances, and other live moments.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/contact"
              search={{ projectType: "Wedding Film" }}
              className="bg-primary text-primary-foreground px-7 py-4 rounded-md uppercase text-sm font-semibold hover:opacity-90 red-glow"
              data-track-event="cta_click_quote"
              data-service-lane="wedding"
            >
              Check Wedding Availability
            </Link>
            <Link
              to="/contact"
              search={{ projectType: "Event Coverage" }}
              className="border border-foreground/30 text-foreground px-7 py-4 rounded-md uppercase text-sm font-semibold hover:bg-foreground/10"
              data-track-event="cta_click_quote"
              data-service-lane="event"
            >
              Ask About Event Coverage
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bento-grid">
          <article className="bento-tile glass-strong p-7 md:p-9 col-span-12 lg:col-span-6">
            <Heart className="h-8 w-8 text-primary" />
            <p className="timecode mt-6 mb-3">Wedding films</p>
            <h2 className="font-display text-4xl md:text-5xl uppercase leading-none">
              The weekend goes fast. The film has to outlast it.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              The goal is not just a recap. It is a film you can return to for voices, movement,
              atmosphere, and the details that grow more valuable with time.
            </p>
          </article>
          <article className="bento-tile glass-panel p-7 md:p-9 col-span-12 md:col-span-6 lg:col-span-3">
            <CalendarDays className="h-8 w-8 text-primary" />
            <p className="timecode mt-6 mb-3">Availability</p>
            <h3 className="font-display text-3xl uppercase leading-none">Dates matter first.</h3>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Wedding dates and event dates both need availability checked before the right scope
              can be shaped.
            </p>
          </article>
          <article className="bento-tile glass-panel p-7 md:p-9 col-span-12 md:col-span-6 lg:col-span-3">
            <PartyPopper className="h-8 w-8 text-primary" />
            <p className="timecode mt-6 mb-3">Event coverage</p>
            <h3 className="font-display text-3xl uppercase leading-none">Live moments stay welcome.</h3>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Event recap work remains part of this lane for clients who need a sharper post-event
              asset than phone footage can give them.
            </p>
          </article>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-border bg-black red-glow">
            <img
              src={heroPoster}
              alt="Rhode Island wedding film coverage still"
              className="h-full w-full object-cover"
              width={1600}
              height={900}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3">
              <Play className="h-9 w-9 text-primary" />
              <p className="font-display text-2xl sm:text-3xl uppercase leading-none">
                Preserve the feeling.
              </p>
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="What clients receive"
              title="Coverage is shaped around the version of the story you want to keep."
              subtitle="Wedding packages stay wedding-first. Event films are quoted by scope based on timing, coverage, and deliverables."
            />
            <ul className="grid sm:grid-cols-2 gap-3">
              {WEDDING_POINTS.map((item) => (
                <li key={item} className="glass-panel rounded-xl p-4 flex gap-3">
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="wedding-packages" className="scroll-mt-32 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Wedding pricing"
            title="Wedding coverage starts here."
            subtitle="Final quotes depend on date, venue, coverage time, audio needs, travel, and the kind of film you want to keep."
          />
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {WEDDING_PACKAGES.map((pkg) => (
              <PackageCard key={pkg.name} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      <section id="event-films" className="scroll-mt-32 py-16 md:py-24 bg-card/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          <div>
            <SectionHeading
              eyebrow="Events beyond weddings"
              title="Event recap coverage stays available, just lower in the hierarchy."
              subtitle="If you need a fundraiser film, conference recap, party coverage, or a performance edit, we still quote that work inside this lane."
            />
            <ul className="grid sm:grid-cols-2 gap-3">
              {EVENT_TYPES.map((item) => (
                <li key={item} className="bg-card border border-border rounded-xl p-4 flex gap-3">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-strong rounded-2xl p-7 md:p-9">
            <p className="timecode mb-3">PLANNING PROCESS</p>
            <h2 className="font-display text-4xl uppercase leading-none">
              Start with the date, the city, and the kind of recap you need.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Event film scope depends on coverage time, crowd energy, audio needs, and how many
              usable clips the recap needs to produce afterward.
            </p>
            <Link
              to="/contact"
              search={{ projectType: "Event Coverage" }}
              className="mt-7 inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-4 rounded-md uppercase text-sm font-semibold red-glow"
              data-track-event="cta_click_quote"
              data-service-lane="event"
            >
              Ask About Event Coverage <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="FAQ" title="Wedding and event questions." />
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
          <p className="timecode mb-4">READY WHEN THE DATE IS REAL</p>
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.95] text-balance">
            Start with availability. Build the film from there.
          </h2>
          <p className="mt-6 text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Wedding weekends stay at the center of this lane. If you need event recap coverage,
            start with the date, city, and the kind of after-the-fact asset you want to keep.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              search={{ projectType: "Wedding Film" }}
              className="inline-flex bg-primary text-primary-foreground px-7 py-4 rounded-md uppercase text-sm font-semibold red-glow"
              data-track-event="cta_click_quote"
              data-service-lane="wedding"
            >
              Check Wedding Availability
            </Link>
            <Link
              to="/contact"
              search={{ projectType: "Event Coverage" }}
              className="inline-flex border border-foreground/30 px-7 py-4 rounded-md uppercase text-sm font-semibold"
              data-track-event="cta_click_quote"
              data-service-lane="event"
            >
              Ask About Event Coverage
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
