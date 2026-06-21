import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  Check,
  Clapperboard,
  Heart,
  Home,
  PartyPopper,
  Sparkles,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { PortfolioCard } from "@/components/site/PortfolioCard";
import { PORTFOLIO } from "@/data/portfolio";
import {
  BUSINESS_PACKAGES,
  MUSIC_PACKAGES,
  REAL_ESTATE_PACKAGES,
  WEDDING_PACKAGES,
} from "@/data/packages";
import {
  absoluteUrl,
  businessJsonLd,
  pageJsonLd,
  videoObjectJsonLd,
  websiteJsonLd,
} from "@/data/seo";
import heroImage from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Video Production Warwick, RI | Good Looks Media Group" },
      {
        name: "description",
        content:
          "Warwick, RI video production for Rhode Island businesses, agents, couples, and artists. Planning, filming, and editing for the platforms where audiences watch.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Video Production Warwick, RI | Good Looks Media Group" },
      {
        property: "og:description",
        content:
          "Warwick, RI video production for Rhode Island businesses, agents, couples, and artists.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl("/") },
      { name: "twitter:title", content: "Video Production Warwick, RI | Good Looks Media Group" },
      {
        name: "twitter:description",
        content:
          "Warwick, RI video production for Rhode Island businesses, agents, couples, and artists.",
      },
    ],
    links: [
      { rel: "canonical", href: absoluteUrl("/") },
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
              name: "Good Looks Media Group Rhode Island Video Production",
              description:
                "Warwick, RI video production for businesses, agents, couples, and artists.",
              path: "/",
            }),
            videoObjectJsonLd({
              name: PORTFOLIO[0].title,
              description: PORTFOLIO[0].description,
              thumbnailUrl: PORTFOLIO[0].thumbnailUrl,
              uploadDate: PORTFOLIO[0].uploadDate,
              embedUrl: PORTFOLIO[0].embedUrl,
              contentUrl: PORTFOLIO[0].contentUrl,
            }),
          ],
        }),
      },
    ],
  }),
  component: HomePage,
});

const SERVICE_CARDS = [
  {
    icon: Home,
    title: "Real Estate Media",
    copy:
      "Listing videos and property content for Rhode Island agents, builders, and property owners.",
    to: "/real-estate-media",
    cta: "Book a Listing Shoot",
    lane: "realEstate",
  },
  {
    icon: Briefcase,
    title: "Business & Brand Video",
    copy:
      "Story-driven videos for local businesses, nonprofits, and brands that need to explain what they do, build trust, and create content for websites, ads, and social media.",
    to: "/business-video",
    cta: "Get a Project Quote",
    lane: "business",
  },
  {
    icon: Heart,
    title: "Wedding Cinematography",
    copy:
      "Premium wedding films for Rhode Island and New England couples who want the weekend preserved as a legacy artifact.",
    to: "/weddings",
    cta: "Check Availability for Your Date",
    lane: "wedding",
  },
  {
    icon: PartyPopper,
    title: "Event Video",
    copy:
      "Corporate events, brand activations, nonprofit galas, private events, and live event recaps.",
    to: "/events-recaps",
    cta: "Request a Custom Quote",
    lane: "event",
  },
  {
    icon: Sparkles,
    title: "Artist Visuals",
    copy:
      "Music videos, release promos, performance films, and social clips for artists who need visuals that travel.",
    to: "/music-videos",
    cta: "Pitch Your Track",
    lane: "artist",
  },
] as const;

const TRUST_LINE =
  "Two-person team, Warwick based. Planning, filming, and editing under one roof. You talk to the people who shoot it. Clear starting investments and custom quotes.";

const PACKAGE_PREVIEW = [
  {
    title: "Real Estate Listing Video Package",
    price: REAL_ESTATE_PACKAGES[0].price,
    copy:
      "Listing videos and property content for Rhode Island agents, builders, and property owners. Designed to help listings stand out online with clean walkthrough footage, exterior coverage, social-ready edits, and fast turnaround.",
    href: "/contact?projectType=Real%20Estate%20Media",
    lane: "realEstate",
    cta: "Book a Listing Shoot",
  },
  {
    title: "Business & Brand Video",
    price: BUSINESS_PACKAGES[0].price,
    copy: "Short-form, website, testimonial, and campaign-ready brand content.",
    href: "/contact?projectType=Business%20%26%20Brand%20Video",
    lane: "business",
    cta: "Get a Project Quote",
  },
  {
    title: "Weddings & Events",
    price: WEDDING_PACKAGES[0].price,
    copy: "Wedding films first, with event recap coverage available by quote.",
    href: "/contact?projectType=Wedding%20Film",
    lane: "wedding",
    cta: "Check Availability for Your Date",
  },
  {
    title: "Artist Visuals",
    price: MUSIC_PACKAGES[0].price,
    copy: "Music videos, performance visuals, and release-ready creative cuts.",
    href: "/contact?projectType=Artist%20Visuals",
    lane: "artist",
    cta: "Pitch Your Track",
  },
] as const;

const PROCESS = [
  ["01", "Pick the lane", "Choose the service path that matches the project and where the video needs to perform."],
  ["02", "Plan the scope", "We shape the coverage, deliverables, timeline, and quote before cameras go up."],
  ["03", "Film with purpose", "Every shoot is built around real use: website trust, social rollout, ads, listings, or memories."],
  ["04", "Deliver the assets", "You get polished video, platform-ready exports, and a clearer next step for using the content."],
] as const;

function HomePage() {
  const artistProof = PORTFOLIO.filter((item) => item.category === "Artist Visuals").slice(0, 3);

  return (
    <SiteLayout>
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <img
          src={heroImage}
          alt="Good Looks Media Group filming cinematic Rhode Island video production"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/55 to-background" />
        <div className="absolute inset-0 film-grain" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <p className="timecode mb-5">WARWICK, RHODE ISLAND VIDEO PRODUCTION</p>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl uppercase leading-[0.95] max-w-5xl text-balance">
            Video Built With a Plan Behind It
          </h1>
          <p className="mt-6 text-base md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Good Looks Media Group plans, films, and edits video for Rhode Island businesses,
            agents, couples, and artists. Built for the platforms where your audience actually
            watches.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="bg-primary text-primary-foreground px-7 py-4 rounded-md uppercase tracking-widest text-sm font-semibold hover:opacity-90 red-glow"
              data-track-event="cta_click_quote"
              data-service-lane="general"
            >
              Get a Project Quote
            </Link>
            <a
              href="#process"
              className="border border-foreground/30 text-foreground px-7 py-4 rounded-md uppercase tracking-widest text-sm font-semibold hover:bg-foreground/10"
              data-track-event="cta_click_services"
            >
              See How We Work
            </a>
          </div>
        </div>
      </section>

      <section id="service-lanes" className="scroll-mt-32 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Main lanes"
            title="Choose the lane that fits the outcome."
            subtitle="The public site stays focused so each client type can find the right starting point quickly."
          />
          <div className="grid md:grid-cols-2 gap-5">
            {SERVICE_CARDS.map(({ icon: Icon, title, copy, to, cta, lane }) => (
              <Link
                key={title}
                to={to}
                className="group relative glass-panel bento-tile min-h-[300px] p-7 transition hover:-translate-y-1 hover:border-primary flex flex-col"
                data-track-event="select_service_lane"
                data-service-lane={lane}
              >
                <Icon className="w-8 h-8 text-primary" />
                <h2 className="font-display text-3xl uppercase mt-5">{title}</h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{copy}</p>
                <span className="mt-auto pt-6 inline-flex items-center gap-2 text-sm uppercase tracking-widest text-foreground">
                  {cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 border-y border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{TRUST_LINE}</p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          <div>
            <SectionHeading
              eyebrow="Strategy first"
              title="We do not start with cameras."
            />
            <p className="text-lg text-muted-foreground leading-relaxed">
              We start with the job the video needs to do. Business clients need trust. Agents need
              listing attention. Couples need a film worth keeping. Artists need visuals that
              travel. The plan changes with the goal.
            </p>
            <Link
              to="/business-video"
              className="mt-7 inline-flex items-center gap-2 text-primary uppercase tracking-widest text-sm hover:underline"
              data-track-event="select_service_lane"
              data-service-lane="business"
            >
              See how the business lane works <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              ["Plan", "Scope the message, audience, location, and final deliverables before the shoot."],
              ["Film", "Capture only what actually supports the listing, brand story, event recap, or film."],
              ["Edit", "Deliver platform-ready cuts that are easier to use in the real world, not just pretty to watch."],
            ].map(([title, copy]) => (
              <article key={title} className="glass-panel rounded-2xl p-6">
                <Sparkles className="w-7 h-7 text-primary" />
                <h3 className="font-display text-2xl uppercase mt-4">{title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="recent-work" className="scroll-mt-32 py-20 md:py-28 bg-card/40 border-y border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Curated proof"
            title="Watch the reel. It shows our range."
            subtitle="Want lane-specific examples? Ask us. We share proof by request so every sample matches the buyer who needs to see it."
            align="center"
          />
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-border bg-black red-glow">
            <iframe
              src="https://www.youtube.com/embed/0q_7tljwQHY?si=uum0jp0_yTGuWCrr&rel=0&modestbranding=1"
              className="w-full h-full"
              title="Good Looks Media Group Director Reel"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/business-video"
              className="inline-flex items-center gap-2 text-primary uppercase tracking-widest text-sm hover:underline"
              data-track-event="select_service_lane"
              data-service-lane="business"
            >
              Business Video <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/real-estate-media"
              className="inline-flex items-center gap-2 text-primary uppercase tracking-widest text-sm hover:underline"
              data-track-event="select_service_lane"
              data-service-lane="realEstate"
            >
              Real Estate Media <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/weddings"
              className="inline-flex items-center gap-2 text-primary uppercase tracking-widest text-sm hover:underline"
              data-track-event="select_service_lane"
              data-service-lane="wedding"
            >
              Weddings & Events <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Creative lane"
            title="Artist Visuals & Creative Projects"
            subtitle="Music videos, performance visuals, creative promos, and custom projects remain part of the Good Looks identity. This work shows our visual edge, but it lives in its own lane so business clients, couples, agents, and artists can each find the proof that fits them."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {artistProof.map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))}
          </div>
          <div className="mt-8">
            <Link
              to="/music-videos"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md uppercase tracking-widest text-sm font-semibold hover:opacity-90"
              data-track-event="select_service_lane"
              data-service-lane="artist"
            >
              Explore Artist Visuals <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-card/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Pricing preview"
            title="Clear starting investments. Custom quotes based on scope."
            subtitle="The homepage stays concise. The pricing page shows the four main lanes in more detail."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PACKAGE_PREVIEW.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="glass-panel rounded-2xl p-6 hover:border-primary transition"
                data-track-event="cta_click_pricing"
                data-service-lane={item.lane}
              >
                <p className="timecode">{item.title}</p>
                <p className="font-display text-3xl text-primary mt-3">{item.price}</p>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{item.copy}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground">
                  {item.cta} <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="scroll-mt-32 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Process"
            title="A calmer process from first message to final delivery."
          />
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
            {PROCESS.map(([step, title, copy]) => (
              <article key={step} className="bg-card border border-border rounded-2xl p-6">
                <p className="font-display text-5xl text-primary">{step}</p>
                <h3 className="font-display text-2xl uppercase mt-4">{title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="timecode mb-4">READY WHEN YOU ARE</p>
          <Clapperboard className="mx-auto mb-6 h-10 w-10 text-primary" />
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.95] text-balance">
            Tell us what you are building.
          </h2>
          <p className="mt-5 text-muted-foreground text-lg max-w-2xl mx-auto">
            Tell us the service lane, timing, location, and the result you need. We will shape the
            scope and send a custom quote.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="bg-primary text-primary-foreground px-7 py-4 rounded-md uppercase tracking-widest text-sm font-semibold red-glow"
              data-track-event="cta_click_quote"
              data-service-lane="general"
            >
              Get a Project Quote
            </Link>
            <Link
              to="/packages"
              className="border border-foreground/30 px-7 py-4 rounded-md uppercase tracking-widest text-sm font-semibold"
              data-track-event="cta_click_pricing"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
