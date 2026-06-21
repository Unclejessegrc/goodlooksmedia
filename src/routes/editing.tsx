import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Film, Scissors, Upload } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { PackageCard } from "@/components/site/PackageCard";
import { EDITING_PACKAGES } from "@/data/packages";
import { absoluteUrl, pageJsonLd, serviceJsonLd } from "@/data/seo";

export const Route = createFileRoute("/editing")({
  head: () => ({
    meta: [
      { title: "Video Editing Service Rhode Island | GLMG" },
      {
        name: "description",
        content:
          "Video editing service in Rhode Island for client-shot footage, reels, promos, event recaps, artist visuals, business content, and wedding highlights.",
      },
      { property: "og:title", content: "Video Editing Service Rhode Island | GLMG" },
      {
        property: "og:description",
        content:
          "Video editing service in Rhode Island for client-shot footage, reels, promos, event recaps, artist visuals, business content, and wedding highlights.",
      },
      { property: "og:url", content: absoluteUrl("/editing") },
      { name: "twitter:title", content: "Video Editing Service Rhode Island | GLMG" },
      {
        name: "twitter:description",
        content:
          "Video editing service in Rhode Island for client-shot footage, reels, promos, event recaps, artist visuals, business content, and wedding highlights.",
      },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/editing") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            serviceJsonLd({
              name: "Video Editing & Post-Production",
              description:
                "Editing-only support for reels, promos, event recaps, artist visuals, business content, and wedding highlights in Rhode Island.",
              path: "/editing",
            }),
            pageJsonLd({
              name: "Video Editing & Post-Production",
              description:
                "Editing-only support for reels, promos, event recaps, artist visuals, business content, and wedding highlights in Rhode Island.",
              path: "/editing",
            }),
          ],
        }),
      },
    ],
  }),
  component: EditingPage,
});

const QUOTE_LINK = "/contact?service=editing";

const WHO_THIS_IS_FOR = [
  "Businesses with phone or camera footage",
  "Creators who need reels or short-form content",
  "Artists with music video footage",
  "Couples with wedding footage",
  "Event hosts with recap footage",
  "Families with personal footage they want cleaned up",
];

const WHAT_WE_EDIT = [
  "Social media reels and short-form videos",
  "Business promos and talking-head videos",
  "Event recap edits",
  "Music video editing",
  "Wedding highlight edits",
  "Ceremony and speech edits",
  "Long-form YouTube or interview-style videos",
  "Personal and family videos",
];

const INCLUDED = [
  "Footage review and organization",
  "Story structure and pacing",
  "Clean cuts and transitions",
  "Audio cleanup where possible",
  "Color correction",
  "Music placement",
  "Captions or text overlays when needed",
  "Basic motion graphics when appropriate",
  "Export for Instagram, TikTok, YouTube, websites, and ads",
];

const BEFORE_WE_START = [
  "50% deposit required before editing starts",
  "1 to 2 revision rounds included depending on package",
  "Extra revisions billed at $75/hour",
  "Rush edits may add 25% to 50%",
  "Client must provide footage using Google Drive, Dropbox, WeTransfer, or similar",
  "Poor audio, missing files, shaky footage, or disorganized footage may increase the quote",
  "Good Looks Media Group will be honest if the footage is not strong enough for the requested result",
];

function EditingPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden pt-20 pb-14 md:pt-28 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        <div className="absolute inset-0 film-grain" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="timecode mb-4">EDITING ONLY</p>
          <h1 className="font-display text-5xl md:text-7xl uppercase leading-[0.95] max-w-5xl">
            Video Editing & Post-Production
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Already have the footage? We can step in for the cut, pacing, sound, color, captions,
            and final exports without turning editing into a separate full-service production lane.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={QUOTE_LINK}
              className="bg-primary text-primary-foreground px-7 py-4 rounded-md uppercase tracking-widest text-sm font-semibold hover:opacity-90 red-glow"
              data-track-event="cta_click_quote"
              data-service-lane="editing"
            >
              Send Your Footage for a Quote
            </a>
            <a
              href={QUOTE_LINK}
              className="border border-foreground/30 text-foreground px-7 py-4 rounded-md uppercase tracking-widest text-sm font-semibold hover:bg-foreground/10"
              data-track-event="cta_click_quote"
              data-service-lane="editing"
            >
              Send Your Footage for a Quote
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Already shot"
            title="For footage that needs a finished shape."
            subtitle="Editing-only projects are for people who already captured the moment and need Good Looks to handle the story, pacing, sound, color, and final export."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHO_THIS_IS_FOR.map((item) => (
              <div key={item} className="bg-card border border-border rounded-xl p-5 flex gap-3">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
          <ListBlock icon={Scissors} eyebrow="What we edit" title="From reels to finished films." items={WHAT_WE_EDIT} />
          <ListBlock icon={Film} eyebrow="What's included" title="The edit work behind the polish." items={INCLUDED} />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Editing packages"
            title="Simple editing options."
            subtitle="Pricing depends on footage quantity, organization, audio quality, edit complexity, and final deliverables."
          />
          <div className="grid md:grid-cols-4 gap-6 mt-8">
            {EDITING_PACKAGES.map((pkg) => (
              <PackageCard key={pkg.name} pkg={pkg} />
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground max-w-4xl">
            Final pricing depends on raw footage length, file organization, audio quality, edit
            complexity, revision needs, turnaround time, and number of aspect ratios or
            deliverables requested.
          </p>
          <p className="mt-3 text-sm text-muted-foreground max-w-4xl">
            Rush delivery, raw footage, extra revisions, additional formats, extended coverage,
            drone add-ons, and travel outside the standard service area may affect the final quote.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card/40 border-y border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Before we start" title="Send the footage. We&apos;ll be straight with you." />
          <div className="grid sm:grid-cols-2 gap-4">
            {BEFORE_WE_START.map((item) => (
              <div key={item} className="bg-card border border-border rounded-xl p-5 flex gap-3">
                <Upload className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <p className="timecode mb-4">EDITING QUOTE</p>
          <h2 className="font-display text-4xl md:text-6xl uppercase leading-none">
            Ready to finish the video?
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            Send the footage details and we&apos;ll tell you what it would take to edit it right.
          </p>
          <a
            href={QUOTE_LINK}
            className="mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-4 rounded-md uppercase tracking-widest text-sm font-semibold red-glow"
            data-track-event="cta_click_quote"
            data-service-lane="editing"
          >
            Send Your Footage for a Quote <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}

function ListBlock({
  icon: Icon,
  eyebrow,
  title,
  items,
}: {
  icon: typeof Scissors;
  eyebrow: string;
  title: string;
  items: string[];
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-7 md:p-10">
      <Icon className="w-8 h-8 text-primary" />
      <p className="timecode mt-5 mb-2">{eyebrow}</p>
      <h2 className="font-display text-3xl md:text-4xl uppercase">{title}</h2>
      <ul className="mt-6 grid gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm text-muted-foreground">
            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
