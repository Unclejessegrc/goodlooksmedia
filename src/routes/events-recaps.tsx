import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { absoluteUrl, serviceJsonLd } from "@/data/seo";

export const Route = createFileRoute("/events-recaps")({
  head: () => ({
    meta: [
      { title: "Event Video Production Rhode Island | GLMG" },
      {
        name: "description",
        content:
          "Event video production in Rhode Island for corporate events, brand activations, nonprofit galas, private events, and live event recaps.",
      },
      { property: "og:title", content: "Event Video Production Rhode Island | GLMG" },
      {
        property: "og:description",
        content:
          "Event video production in Rhode Island for polished recaps and live coverage.",
      },
      { property: "og:url", content: absoluteUrl("/events-recaps") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/weddings") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          serviceJsonLd({
            name: "Event Videography in Rhode Island",
            description:
              "Event recap videography for conferences, fundraisers, parties, performances, and live moments in Rhode Island.",
            path: "/weddings",
          }),
        ),
      },
    ],
  }),
  component: EventsAliasPage,
});

function EventsAliasPage() {
  return (
    <SiteLayout>
      <section className="min-h-[60vh] flex items-center py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="timecode mb-4">EVENT FILMS</p>
          <h1 className="font-display text-5xl md:text-7xl uppercase leading-[0.95]">
            Event video is available by quote.
          </h1>
          <p className="mt-5 text-muted-foreground text-lg max-w-2xl">
            Corporate events, brand activations, nonprofit galas, private events, and live event
            recaps are still available by quote.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/weddings"
              hash="event-films"
              className="bg-primary text-primary-foreground px-7 py-4 rounded-md uppercase tracking-widest text-sm font-semibold red-glow"
              data-track-event="select_service_lane"
              data-service-lane="event"
            >
              View Weddings & Events
            </Link>
            <Link
              to="/contact"
              search={{ projectType: "Event Coverage" }}
              className="border border-foreground/30 px-7 py-4 rounded-md uppercase tracking-widest text-sm font-semibold"
              data-track-event="cta_click_quote"
              data-service-lane="event"
            >
              Request a Custom Quote
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
