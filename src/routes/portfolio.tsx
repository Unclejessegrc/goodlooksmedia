import { createFileRoute } from "@tanstack/react-router";
import { PortfolioHiddenPage } from "@/components/site/PortfolioHiddenPage";
import { SHOW_PORTFOLIO } from "@/config/features";
import { absoluteUrl } from "@/data/seo";
import { WorkPage } from "./work";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: SHOW_PORTFOLIO
      ? [
          { title: "Portfolio | Selected Work | Good Looks Media Group" },
          {
            name: "description",
            content:
              "Portfolio alias for selected work, public samples, and the Good Looks Media Group director reel.",
          },
          { property: "og:title", content: "Portfolio | Selected Work | Good Looks Media Group" },
          {
            property: "og:description",
            content:
              "Portfolio alias for selected work, public samples, and the Good Looks Media Group director reel.",
          },
          { property: "og:url", content: absoluteUrl("/portfolio") },
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
          { property: "og:url", content: absoluteUrl("/portfolio") },
        ],
    links: [{ rel: "canonical", href: absoluteUrl("/work") }],
  }),
  component: SHOW_PORTFOLIO ? WorkPage : PortfolioHiddenPage,
});
