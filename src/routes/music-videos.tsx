import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Clapperboard, Music2, Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { PackageCard } from "@/components/site/PackageCard";
import { PortfolioCard } from "@/components/site/PortfolioCard";
import { PORTFOLIO } from "@/data/portfolio";
import { MUSIC_PACKAGES } from "@/data/packages";
import { absoluteUrl, pageJsonLd, serviceJsonLd, videoObjectJsonLd } from "@/data/seo";

export const Route = createFileRoute("/music-videos")({
  head: () => ({
    meta: [
      { title: "Artist Visuals & Music Video Production | Good Looks Media Group" },
      {
        name: "description",
        content:
          "Artist visuals and music video production in Rhode Island for music videos, performance visuals, promo clips, and release-ready campaign assets.",
      },
      { property: "og:title", content: "Artist Visuals & Music Video Production | Good Looks Media Group" },
      {
        property: "og:description",
        content:
          "Artist visuals and music video production in Rhode Island for music videos, performance visuals, promo clips, and release-ready campaign assets.",
      },
      { property: "og:url", content: absoluteUrl("/music-videos") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/music-videos") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            pageJsonLd({
              name: "Artist Visuals & Music Video Production",
              description:
                "Artist visuals, music videos, performance edits, and release-ready promo clips in Rhode Island.",
              path: "/music-videos",
            }),
            serviceJsonLd({
              name: "Artist Visuals & Music Video Production",
              description:
                "Music videos, performance visuals, promo clips, and creative direction for Rhode Island artists.",
              path: "/music-videos",
            }),
            ...PORTFOLIO.filter((item) => item.category === "Artist Visuals").map((item) =>
              videoObjectJsonLd({
                name: item.title,
                description: item.description,
                thumbnailUrl: item.thumbnailUrl,
                uploadDate: item.uploadDate,
                embedUrl: item.embedUrl,
                contentUrl: item.contentUrl ?? item.youtubeUrl,
              }),
            ),
          ],
        }),
      },
    ],
  }),
  component: MusicPage,
});

const OFFERINGS = [
  "Music videos",
  "Performance visuals",
  "Promo clips",
  "Creative direction",
  "Location or studio planning",
  "Release-ready social cutdowns",
];

const BOOKING = [
  "Song or concept ready to discuss",
  "Approximate date window",
  "City or location plan",
  "Budget range or scope target",
];

function MusicPage() {
  const samples = PORTFOLIO.filter((item) => item.category === "Artist Visuals");

  return (
    <SiteLayout>
      <section className="pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="timecode mb-3">ARTIST VISUALS</p>
          <h1 className="font-display text-5xl md:text-7xl uppercase leading-[0.95] max-w-5xl">
            Artist Visuals & Music Video Production
          </h1>
          <p className="mt-5 text-muted-foreground text-lg max-w-3xl leading-relaxed">
            Good Looks Media Group creates music videos, performance visuals, promo clips, and
            release-ready creative assets for artists who want stronger visuals around the song, not
            just more footage.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              search={{ projectType: "Artist Visuals" }}
              className="bg-primary text-primary-foreground px-7 py-4 rounded-md uppercase tracking-widest text-sm font-semibold hover:opacity-90 red-glow"
              data-track-event="cta_click_quote"
              data-service-lane="artist"
            >
              Start a Creative Project
            </Link>
            <a
              href="#artist-pricing"
              className="border border-foreground/30 text-foreground px-7 py-4 rounded-md uppercase tracking-widest text-sm font-semibold hover:bg-foreground/10"
              data-track-event="cta_click_pricing"
              data-service-lane="artist"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.85fr_1.15fr] gap-10 items-start">
          <SectionHeading eyebrow="What this lane covers" title="Creative visuals for release, performance, and identity." />
          <div className="grid sm:grid-cols-2 gap-3">
            {OFFERINGS.map((item) => (
              <div key={item} className="bg-card border border-border rounded-xl p-4 flex gap-3">
                <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          <div>
            <SectionHeading
              eyebrow="Creative direction"
              title="The visual plan matters as much as the shoot."
            />
            <p className="text-muted-foreground leading-relaxed">
              Some songs need a clean performance-led visual. Others need concept, pacing, and a
              stronger atmosphere. We shape the approach around the song, the release window, and
              how many usable promo assets the campaign needs.
            </p>
          </div>
          <div className="glass-strong rounded-2xl p-7 md:p-9">
            <div className="flex items-center gap-3">
              <Music2 className="w-8 h-8 text-primary" />
              <Clapperboard className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display text-4xl uppercase leading-none mt-4">
              Location or studio, one visual or full rollout.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              We can plan around one location, a tighter performance setup, or a broader creative
              build depending on the project and the budget.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Selected proof"
            title="Approved artist visuals and public samples."
            subtitle="These public examples are anonymized on purpose so the work can stay descriptive without turning into placeholder filler."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {samples.map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section id="artist-pricing" className="scroll-mt-32 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Pricing"
            title="Artist visuals start here."
            subtitle="Use the anchor package as the likely fit. Final quotes depend on concept, locations, performance setup, and how many promotional edits the release needs."
          />
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {MUSIC_PACKAGES.map((pkg) => (
              <PackageCard key={pkg.name} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          <div>
            <SectionHeading eyebrow="Booking requirements" title="What helps the project move faster." />
            <ul className="grid sm:grid-cols-2 gap-3">
              {BOOKING.map((item) => (
                <li key={item} className="bg-card border border-border rounded-xl p-4 flex gap-3">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-panel rounded-2xl p-7 md:p-9">
            <p className="timecode mb-3">CREATIVE START</p>
            <h2 className="font-display text-4xl uppercase leading-none">
              Start with the song, the concept, and the release target.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Once we know what the release needs to look like, we can quote the right scope,
              choose the right setup, and keep the visual tied to the campaign instead of guessing.
            </p>
            <Link
              to="/contact"
              search={{ projectType: "Artist Visuals" }}
              className="mt-7 inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-4 rounded-md uppercase text-sm font-semibold red-glow"
              data-track-event="cta_click_quote"
              data-service-lane="artist"
            >
              Start a Creative Project <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
