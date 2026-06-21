import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { absoluteUrl, serviceJsonLd } from "@/data/seo";

export const Route = createFileRoute("/for-businesses")({
  head: () => ({
    meta: [
      { title: "Commercial Video Production Rhode Island | GLMG" },
      {
        name: "description",
        content:
          "Commercial video production in Rhode Island for websites, social media, ads, testimonials, and brand visibility.",
      },
      { property: "og:title", content: "Commercial Video Production Rhode Island | GLMG" },
      {
        property: "og:description",
        content:
          "Business video production in Rhode Island for websites, social media, ads, testimonials, and brand visibility.",
      },
      { property: "og:url", content: absoluteUrl("/for-businesses") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/business-video") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          serviceJsonLd({
            name: "Business Video Production in Rhode Island",
            description:
              "Business video, brand films, testimonials, service explainers, and campaign cutdowns for Rhode Island businesses.",
            path: "/business-video",
          }),
        ),
      },
    ],
  }),
  component: BusinessVideoAliasPage,
});

function BusinessVideoAliasPage() {
  return (
    <SiteLayout>
      <section className="min-h-[60vh] flex items-center py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="timecode mb-4">BUSINESS VIDEO</p>
          <h1 className="font-display text-5xl md:text-7xl uppercase leading-[0.95]">
            Business video now lives on the updated Business Video page.
          </h1>
          <p className="mt-5 text-muted-foreground text-lg max-w-2xl">
            We consolidated the commercial lane so packages, quote language, and service details
            live in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/business-video"
              className="bg-primary text-primary-foreground px-7 py-4 rounded-md uppercase tracking-widest text-sm font-semibold red-glow"
              data-track-event="select_service_lane"
              data-service-lane="business"
            >
              View Business Video
            </Link>
            <Link
              to="/contact"
              search={{ projectType: "Business & Brand Video" }}
              className="border border-foreground/30 px-7 py-4 rounded-md uppercase tracking-widest text-sm font-semibold"
              data-track-event="cta_click_quote"
              data-service-lane="business"
            >
          Get a Project Quote
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
