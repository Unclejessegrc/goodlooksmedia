import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, Building2, House, Heart, Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { absoluteUrl, pageJsonLd } from "@/data/seo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Good Looks Media Group | Rhode Island Video Production Company" },
      {
        name: "description",
        content:
          "Good Looks Media Group is a Warwick, Rhode Island video production company focused on business video, real estate media, wedding films, and artist-led creative work.",
      },
      { property: "og:title", content: "About Good Looks Media Group" },
      {
        property: "og:description",
        content:
          "A Warwick-based production company pairing commercial clarity with cinematic style across Rhode Island and nearby New England markets.",
      },
      { property: "og:url", content: absoluteUrl("/about") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/about") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          pageJsonLd({
            name: "About Good Looks Media Group",
            description:
              "About the Warwick, Rhode Island production company behind Good Looks Media Group.",
            path: "/about",
          }),
        ),
      },
    ],
  }),
  component: AboutPage,
});

const PRINCIPLES = [
  {
    title: "Strategy before footage",
    copy:
      "We start with what the video needs to do, then build the shoot around the outcome instead of chasing random coverage.",
    Icon: Building2,
  },
  {
    title: "Small team, direct communication",
    copy:
      "Clients work with the same people who plan, film, and edit the project. That keeps decisions faster and the work more personal.",
    Icon: Camera,
  },
  {
    title: "Creative edge without audience confusion",
    copy:
      "Artist visuals stay in their own lane, but that creative discipline still sharpens how we approach real estate and commercial work.",
    Icon: Sparkles,
  },
] as const;

const FOCUS_AREAS = [
  {
    title: "Business Video",
    copy: "Brand stories, testimonials, launch assets, and social-ready commercial content.",
    Icon: Building2,
  },
  {
    title: "Real Estate Media",
    copy: "Property films, agent branding, cinematic walkthroughs, and short-form listing support.",
    Icon: House,
  },
  {
    title: "Weddings & Events",
    copy: "Wedding-first storytelling with event recap coverage available as a secondary service.",
    Icon: Heart,
  },
] as const;

function AboutPage() {
  return (
    <SiteLayout>
      <section className="pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="timecode mb-3">ABOUT</p>
          <h1 className="font-display text-5xl md:text-7xl uppercase leading-[0.95] max-w-5xl">
            Strategic Rhode Island production with a <span className="text-primary">cinematic backbone.</span>
          </h1>
          <p className="mt-5 text-muted-foreground text-lg max-w-3xl leading-relaxed">
            Good Looks Media Group is based in Warwick, Rhode Island and built for clients who need
            more than generic video coverage. We focus on clear positioning, stronger visuals, and
            practical deliverables that fit the real job the video has to do.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6 text-base md:text-lg leading-relaxed text-muted-foreground">
          <p>
            The business is intentionally structured around a few strong lanes: business video as a
            trust-builder, real estate as a scalable growth engine, weddings as the premium
            storytelling lane, and artist visuals as a separate public creative category.
          </p>
          <p>
            That focus helps the work stay sharper. Clients do not have to guess where they fit,
            and every quote starts with a clearer sense of purpose, audience, and deliverables.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="How we work" title="The operating principles behind the site and the shoots." />
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {PRINCIPLES.map((item) => (
              <article key={item.title} className="bg-card border border-border rounded-2xl p-6 md:p-7">
                <item.Icon className="w-7 h-7 text-primary" />
                <h2 className="mt-4 font-display text-3xl uppercase leading-none">{item.title}</h2>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
          <div>
            <SectionHeading eyebrow="Primary focus" title="The business is broad enough to be useful and focused enough to convert." />
            <p className="text-muted-foreground leading-relaxed">
              We are not trying to be everything at once on the public site. The homepage and core
              routes are built around the lanes that most clearly support business growth and client
              clarity.
            </p>
          </div>
          <div className="grid gap-4">
            {FOCUS_AREAS.map((item) => (
              <div key={item.title} className="glass-panel rounded-2xl p-6 md:p-7 flex gap-4">
                <item.Icon className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <h2 className="font-display text-2xl uppercase leading-none">{item.title}</h2>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card/40 border-y border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            align="center"
            eyebrow="Service area"
            title="Warwick and Rhode Island first. New England by quote."
          />
          <p className="text-muted-foreground">
            Warwick, Providence, Newport, Cranston, East Greenwich, and surrounding Rhode Island
            markets, with select New England travel quoted by scope.
          </p>
        </div>
      </section>

      <section className="py-20 text-center">
        <Link
          to="/contact"
          className="bg-primary text-primary-foreground px-7 py-4 rounded-md uppercase tracking-widest text-sm font-semibold red-glow"
          data-track-event="cta_click_quote"
          data-service-lane="general"
        >
          Start your project
        </Link>
      </section>
    </SiteLayout>
  );
}
