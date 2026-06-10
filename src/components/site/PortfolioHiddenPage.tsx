import { Link } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";
import { SiteLayout } from "./SiteLayout";

export function PortfolioHiddenPage() {
  return (
    <SiteLayout>
      <section className="pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="timecode mb-3">PORTFOLIO</p>
          <h1 className="font-display text-5xl md:text-7xl uppercase leading-[0.95] max-w-4xl">
            Our full portfolio is being <span className="text-primary">curated.</span>
          </h1>
          <p className="mt-6 text-muted-foreground text-lg max-w-3xl leading-relaxed">
            We are updating this section with approved portfolio samples that better match
            the current service lanes. In the meantime, you can watch the director reel, compare
            pricing, or request a project quote.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="/#recent-work"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-4 rounded-md uppercase tracking-widest text-sm font-semibold hover:opacity-90 red-glow"
            >
              <Play className="w-4 h-4 fill-current" /> Watch the Director Reel
            </a>
            <Link
              to="/music-videos"
              className="inline-flex items-center gap-2 border border-foreground/30 px-7 py-4 rounded-md uppercase tracking-widest text-sm font-semibold hover:bg-foreground/10"
            >
              Artist Visuals <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 border border-foreground/30 px-7 py-4 rounded-md uppercase tracking-widest text-sm font-semibold hover:bg-foreground/10"
            >
              View Pricing <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-foreground/30 px-7 py-4 rounded-md uppercase tracking-widest text-sm font-semibold hover:bg-foreground/10"
              data-track-event="cta_click_quote"
              data-service-lane="general"
            >
              Request a Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
