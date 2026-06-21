import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, Check, ClipboardList, Film, Users } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { PackageCard } from "@/components/site/PackageCard";
import { BUSINESS_PACKAGES } from "@/data/packages";
import { absoluteUrl, pageJsonLd, serviceJsonLd } from "@/data/seo";

export const Route = createFileRoute("/business-video")({
  head: () => ({
    meta: [
      { title: "Commercial Video Production Rhode Island | GLMG" },
      {
        name: "description",
        content:
          "Commercial video production in Rhode Island for business websites, social media, ads, testimonials, and brand visibility. Strategy, filming, and editing by GLMG.",
      },
      { property: "og:title", content: "Commercial Video Production Rhode Island | GLMG" },
      {
        property: "og:description",
        content:
          "Commercial video production in Rhode Island for websites, social media, ads, testimonials, and brand visibility.",
      },
      { property: "og:url", content: absoluteUrl("/business-video") },
      { name: "twitter:title", content: "Commercial Video Production Rhode Island | GLMG" },
      {
        name: "twitter:description",
        content:
          "Commercial video production in Rhode Island for websites, social media, ads, testimonials, and brand visibility.",
      },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/business-video") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            pageJsonLd({
              name: "Business Video Production in Rhode Island",
              description:
                "Business video production for Rhode Island companies that need clearer marketing content for websites, social, ads, and trust-building.",
              path: "/business-video",
            }),
            serviceJsonLd({
              name: "Business Video Production in Rhode Island",
              description:
                "Business video, brand films, testimonials, service explainers, and campaign cutdowns for Rhode Island businesses.",
              path: "/business-video",
              serviceType: "Business video production",
            }),
          ],
        }),
      },
    ],
  }),
  component: BusinessVideoPage,
});

const AUDIENCE = [
  "Local businesses that need a better website video",
  "Brands running paid ads or social campaigns",
  "Nonprofits that need clearer storytelling",
  "Founders who need trust-building content for launches",
  "Teams that want repeatable content instead of one-off shoots",
  "Companies with a service, space, team, or process worth showing",
];

const CREATION_TYPES = [
  ["Brand Story Films", Film],
  ["Testimonials & Interviews", Users],
  ["Service Explainers", ClipboardList],
  ["Campaign Cutdowns & Reels", Briefcase],
] as const;

const DELIVERABLES = [
  "Website-ready brand video",
  "Short-form cutdowns for social media",
  "Testimonial or founder interview edits",
  "Ad-ready exports when the campaign needs them",
  "Platform-ready horizontal and vertical versions",
  "Delivery guidance for real marketing use",
];

const PROCESS = [
  "Clarify the audience, offer, and where the video has to work",
  "Plan the shoot around message, location, people, and outputs",
  "Film only what supports the story and the conversion goal",
  "Edit the main asset first, then supporting cutdowns and exports",
];

function BusinessVideoPage() {
  return (
    <SiteLayout>
      <section className="pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="timecode mb-4">BUSINESS VIDEO - RHODE ISLAND</p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.9] max-w-5xl text-balance">
            Business Video Production in Rhode Island
          </h1>
          <p className="mt-6 text-muted-foreground text-lg md:text-xl max-w-3xl leading-relaxed">
            Good Looks Media Group helps local businesses turn their story, service, space, or
            team into clear video content for websites, social media, ads, and long-term brand
            visibility.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/contact"
              search={{ projectType: "Business & Brand Video" }}
              className="bg-primary text-primary-foreground px-7 py-4 rounded-md uppercase tracking-widest text-sm font-semibold hover:opacity-90 red-glow"
              data-track-event="cta_click_quote"
              data-service-lane="business"
            >
              Get a Project Quote
            </Link>
            <a
              href="#business-pricing"
              className="border border-foreground/30 text-foreground px-7 py-4 rounded-md uppercase tracking-widest text-sm font-semibold hover:bg-foreground/10"
              data-track-event="cta_click_pricing"
              data-service-lane="business"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.85fr_1.15fr] gap-10 items-start">
          <SectionHeading eyebrow="Who this is for" title="Built for businesses that need useful content, not filler." />
          <div className="grid sm:grid-cols-2 gap-3">
            {AUDIENCE.map((item) => (
              <div key={item} className="bg-card border border-border rounded-xl p-4 flex gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What we create"
            title="The deliverable changes with the channel."
            subtitle="Some businesses need one strong website asset. Others need a campaign kit. The scope follows the marketing job."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CREATION_TYPES.map(([title, Icon]) => (
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
              eyebrow="Strategy before filming"
              title="A better business video usually comes from better pre-production."
            />
            <p className="text-muted-foreground leading-relaxed">
              Before filming, we want to know who the viewer is, where the video will live, what
              action matters, and how many usable cutdowns the business actually needs. That keeps
              the shoot efficient and the final edit easier to use.
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

      <section id="business-pricing" className="scroll-mt-32 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Starting investment"
            title="Packages start here. Final scope follows the project."
            subtitle="Use these as starting points. Final quotes depend on filming time, interview needs, editing complexity, number of final assets, and rollout expectations."
          />
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {BUSINESS_PACKAGES.map((pkg) => (
              <PackageCard key={pkg.name} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Process" title="What the working rhythm looks like." />
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
            {PROCESS.map((item, index) => (
              <article key={item} className="bg-card border border-border rounded-2xl p-6">
                <p className="font-display text-5xl text-primary">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="timecode mb-4">READY FOR A QUOTE?</p>
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.95] text-balance">
            Need video for your business?
          </h2>
          <p className="mt-6 text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Tell us what the business does, where the video has to perform, and what kind of
            assets you need. We will shape the right scope from there.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              search={{ projectType: "Business & Brand Video" }}
              className="bg-primary text-primary-foreground px-7 py-4 rounded-md uppercase tracking-widest text-sm font-semibold red-glow"
              data-track-event="cta_click_quote"
              data-service-lane="business"
            >
              Get a Project Quote
            </Link>
            <Link
              to="/packages"
              hash="business-video"
              className="border border-foreground/30 px-7 py-4 rounded-md uppercase tracking-widest text-sm font-semibold inline-flex items-center gap-2"
              data-track-event="cta_click_pricing"
              data-service-lane="business"
            >
              View Pricing <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
