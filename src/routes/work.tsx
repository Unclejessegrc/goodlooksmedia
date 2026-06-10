import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PortfolioCard } from "@/components/site/PortfolioCard";
import { PortfolioHiddenPage } from "@/components/site/PortfolioHiddenPage";
import { PORTFOLIO, CATEGORIES } from "@/data/portfolio";
import { SHOW_PORTFOLIO } from "@/config/features";
import { absoluteUrl, videoObjectJsonLd } from "@/data/seo";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: SHOW_PORTFOLIO
      ? [
          { title: "Selected Work | Good Looks Media Group" },
          {
            name: "description",
            content:
              "Director reel and approved artist visual case-study examples from Good Looks Media Group in Rhode Island.",
          },
          { property: "og:title", content: "Selected Work | Good Looks Media Group" },
          {
            property: "og:description",
            content:
              "Director reel and approved artist visual case-study examples from Good Looks Media Group in Rhode Island.",
          },
          { property: "og:url", content: absoluteUrl("/work") },
        ]
      : [
          { title: "Work Examples Being Updated | Good Looks Media Group" },
          {
            name: "description",
            content:
              "Public proof is being refreshed. Watch the director reel, view pricing, or request a quote.",
          },
          { name: "robots", content: "noindex, nofollow" },
          { property: "og:title", content: "Work Examples Being Updated | Good Looks Media Group" },
          {
            property: "og:description",
            content:
              "Public proof is being refreshed. Watch the director reel, view pricing, or request a quote.",
          },
          { property: "og:url", content: absoluteUrl("/work") },
        ],
    links: [{ rel: "canonical", href: absoluteUrl("/work") }],
    scripts: SHOW_PORTFOLIO
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": PORTFOLIO.filter((item) => item.youtubeId || item.embedUrl).map((item) =>
                videoObjectJsonLd({
                  name: item.title,
                  description: item.description,
                  thumbnailUrl: item.thumbnailUrl,
                  uploadDate: item.uploadDate,
                  embedUrl: item.embedUrl,
                  contentUrl: item.contentUrl ?? item.youtubeUrl,
                }),
              ),
            }),
          },
        ]
      : undefined,
  }),
  component: SHOW_PORTFOLIO ? WorkPage : PortfolioHiddenPage,
});

export function WorkPage() {
  const [cat, setCat] = useState<string>("All");
  const filtered = cat === "All" ? PORTFOLIO : PORTFOLIO.filter((item) => item.category === cat);

  return (
    <SiteLayout>
      <section className="pt-24 pb-12 md:pt-28 md:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="timecode mb-3">SELECTED WORK</p>
          <h1 className="font-display text-5xl md:text-7xl uppercase leading-[0.95] max-w-5xl">
            Public proof, kept <span className="text-primary">tight on purpose.</span>
          </h1>
          <p className="mt-5 text-muted-foreground text-lg max-w-3xl leading-relaxed">
            This gallery stays intentionally selective. Public examples lean toward the director
            reel and approved artist visual case studies, while many client-facing commercial,
            real-estate, and wedding examples stay private or are shared directly during the quote
            process.
          </p>
        </div>
      </section>

      <section className="pb-8 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setCat(category)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest border transition ${
                  cat === category
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item, index) => (
              <div key={item.id} className="contents">
                <PortfolioCard item={item} />
                {(index + 1) % 4 === 0 && (
                  <div className="sm:col-span-2 lg:col-span-3 glass-strong rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <p className="timecode mb-2">NEED THE RIGHT FIT?</p>
                      <p className="font-display text-2xl md:text-3xl uppercase">
                        Start with pricing or tell us the project.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        to="/packages"
                        className="bg-primary text-primary-foreground px-6 py-3 rounded-md uppercase tracking-widest text-sm font-semibold"
                        data-track-event="cta_click_pricing"
                        data-service-lane="general"
                      >
                        View pricing
                      </Link>
                      <Link
                        to="/contact"
                        className="border border-foreground/30 px-6 py-3 rounded-md uppercase tracking-widest text-sm font-semibold hover:bg-foreground/10"
                        data-track-event="cta_click_quote"
                        data-service-lane="general"
                      >
                        Request a quote
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-20">
              No public examples live in this category right now.{" "}
              <Link to="/contact" className="text-primary underline" data-track-event="cta_click_quote" data-service-lane="general">
                Request a quote
              </Link>{" "}
              and we can talk through the right lane directly.
            </p>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
