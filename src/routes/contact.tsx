import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { CheckCircle2, Instagram, Mail, MessageSquare, Phone, Youtube } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CONTACT } from "@/data/contact";
import { absoluteUrl, pageJsonLd } from "@/data/seo";
import { trackEvent } from "@/lib/analytics";

type ContactSearch = {
  service?: string;
  projectType?: string;
  package?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): ContactSearch => ({
    service: readSearchString(search.service),
    projectType: readSearchString(search.projectType),
    package: readSearchString(search.package),
    utm_source: readSearchString(search.utm_source),
    utm_medium: readSearchString(search.utm_medium),
    utm_campaign: readSearchString(search.utm_campaign),
  }),
  head: () => ({
    meta: [
      { title: "Request a Quote | Good Looks Media Group" },
      {
        name: "description",
        content:
          "Request a quote for business video, real estate media, wedding films, event coverage, artist visuals, or editing in Rhode Island.",
      },
      { property: "og:title", content: "Request a Quote | Good Looks Media Group" },
      {
        property: "og:description",
        content:
          "Request a quote for business video, real estate media, wedding films, event coverage, artist visuals, or editing in Rhode Island.",
      },
      { property: "og:url", content: absoluteUrl("/contact") },
      { name: "twitter:title", content: "Request a Quote | Good Looks Media Group" },
      {
        name: "twitter:description",
        content:
          "Request a quote for business video, real estate media, wedding films, event coverage, artist visuals, or editing in Rhode Island.",
      },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/contact") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          pageJsonLd({
            name: "Request a Quote",
            description:
              "Request a quote for business video, real estate media, wedding films, event coverage, artist visuals, or editing in Rhode Island.",
            path: "/contact",
          }),
        ),
      },
    ],
  }),
  component: ContactPage,
});

const PROJECT_TYPES = [
  "Business & Brand Video",
  "Real Estate Media",
  "Wedding Film",
  "Event Coverage",
  "Artist Visuals",
  "Editing Only",
  "Custom Project",
] as const;

const BUDGETS = [
  "Under $500",
  "$500 to $1,500",
  "$1,500 to $3,500",
  "$3,500 to $6,000",
  "$6,000+",
  "Not sure yet",
] as const;

const YES_NO_MAYBE = ["Yes", "No", "Not sure"] as const;

function readSearchString(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

function presetFromSearch(search: ContactSearch) {
  return {
    projectType: search.service === "editing" ? "Editing Only" : normalizeProjectType(search.projectType),
    pkg: search.package,
    utm: {
      utm_source: search.utm_source || "",
      utm_medium: search.utm_medium || "",
      utm_campaign: search.utm_campaign || "",
    },
  };
}

function ContactPage() {
  const search = Route.useSearch();
  const searchPreset = presetFromSearch(search);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [preset, setPreset] = useState<{ projectType?: string; pkg?: string; utm: Record<string, string> }>(
    searchPreset,
  );
  const [projectTypeValue, setProjectTypeValue] = useState(() => searchPreset.projectType ?? "");
  const hasTrackedFormStart = useRef(false);

  useEffect(() => {
    setPreset(searchPreset);
    setProjectTypeValue(searchPreset.projectType ?? "");
    hasTrackedFormStart.current = false;
  }, [
    search.package,
    search.projectType,
    search.service,
    search.utm_campaign,
    search.utm_medium,
    search.utm_source,
  ]);

  const trackFormStartOnce = () => {
    if (hasTrackedFormStart.current || typeof window === "undefined") return;
    hasTrackedFormStart.current = true;

    trackEvent("form_start", {
      service_lane: serviceLaneFromProject(projectTypeValue || preset.projectType),
      package_name: preset.pkg,
      page_path: window.location.pathname,
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    trackFormStartOnce();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const body = new URLSearchParams();

    formData.forEach((value, key) => {
      body.append(key, value.toString());
    });

    setStatus("submitting");

    try {
      const response = await fetch("/forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      const projectType = formData.get("project_type")?.toString();
      const serviceLane = serviceLaneFromProject(projectType);
      const packageName = formData.get("package_name")?.toString();

      trackEvent("form_submit", {
        service_lane: serviceLane,
        package_name: packageName,
        page_path: window.location.pathname,
      });
      trackEvent("generate_lead", {
        service_lane: serviceLane,
        package_name: packageName,
        page_path: window.location.pathname,
      });

      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (status === "success") {
    return (
      <SiteLayout>
        <section className="min-h-[60vh] flex items-center justify-center text-center px-4 py-24">
          <div className="max-w-xl">
            <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="font-display text-4xl md:text-5xl uppercase">Quote request received.</h1>
            <p className="mt-4 text-muted-foreground text-lg">
              We have the details and will review the project before we reply. If the timing is
              urgent, call or text us directly.
            </p>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <a
                href={CONTACT.telHref}
                className="border border-foreground/30 px-5 py-3 rounded-md uppercase tracking-widest text-sm font-semibold"
                data-track-event="click_call"
              >
                Call {CONTACT.phoneDisplay}
              </a>
              <a
                href={CONTACT.smsHref}
                className="border border-foreground/30 px-5 py-3 rounded-md uppercase tracking-widest text-sm font-semibold"
                data-track-event="click_text"
              >
                Text us
              </a>
            </div>
          </div>
        </section>
      </SiteLayout>
    );
  }

  if (status === "error") {
    return (
      <SiteLayout>
        <section className="min-h-[60vh] flex items-center justify-center text-center px-4 py-24">
          <div className="max-w-xl">
            <h1 className="font-display text-4xl md:text-5xl uppercase">Message not sent.</h1>
            <p className="mt-4 text-muted-foreground text-lg">
              Something went wrong, so it is safest to contact us directly by phone, text, or
              email.
            </p>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <a
                href={CONTACT.emailHref}
                className="border border-foreground/30 px-5 py-3 rounded-md uppercase tracking-widest text-sm font-semibold"
                data-track-event="click_email"
              >
                Email
              </a>
              <a
                href={CONTACT.telHref}
                className="border border-foreground/30 px-5 py-3 rounded-md uppercase tracking-widest text-sm font-semibold"
                data-track-event="click_call"
              >
                Call
              </a>
            </div>
          </div>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="timecode mb-3">QUOTE REQUEST</p>
          <h1 className="font-display text-5xl md:text-7xl uppercase leading-[0.95] max-w-4xl">
            Tell us the project. <span className="text-primary">We&apos;ll shape the quote.</span>
          </h1>
          <p className="mt-5 text-muted-foreground text-lg max-w-3xl">
            This form is for business video, real estate media, wedding films, event coverage,
            artist visuals, and editing-only projects. Start with the service lane, timing, city,
            and budget range so we can recommend the right scope.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 grid md:grid-cols-3 gap-4">
            <a
              href={CONTACT.telHref}
              className="flex items-center gap-4 bg-card border border-border rounded-xl p-5 hover:border-primary transition"
              data-track-event="click_call"
            >
              <Phone className="w-6 h-6 text-primary" />
              <div>
                <p className="font-medium">Call</p>
                <p className="text-sm text-muted-foreground">{CONTACT.phoneDisplay}</p>
              </div>
            </a>
            <a
              href={CONTACT.smsHref}
              className="flex items-center gap-4 bg-card border border-border rounded-xl p-5 hover:border-primary transition"
              data-track-event="click_text"
            >
              <MessageSquare className="w-6 h-6 text-primary" />
              <div>
                <p className="font-medium">Text us</p>
                <p className="text-sm text-muted-foreground">{CONTACT.textResponseNote}</p>
              </div>
            </a>
            <a
              href={CONTACT.emailHref}
              className="flex items-center gap-4 bg-card border border-border rounded-xl p-5 hover:border-primary transition"
              data-track-event="click_email"
            >
              <Mail className="w-6 h-6 text-primary" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{CONTACT.email}</p>
              </div>
            </a>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            <form
              name="good-looks-inquiry"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onFocusCapture={trackFormStartOnce}
              onSubmit={onSubmit}
              className="order-2 lg:order-1 lg:col-span-2 bg-card border border-border rounded-2xl p-6 md:p-10 grid gap-5"
            >
              <input type="hidden" name="form-name" value="good-looks-inquiry" />
              <input
                type="hidden"
                name="subject"
                value="New Good Looks Media Group inquiry from %{formName} (%{submissionId})"
              />
              <input type="hidden" name="package_name" value={preset.pkg ?? ""} readOnly />
              <input
                type="hidden"
                name="page_path"
                value={typeof window === "undefined" ? "/contact" : window.location.pathname}
                readOnly
              />
              <input type="hidden" name="inquiry_source" value="website_quote_form" readOnly />
              <input type="hidden" name="utm_source" value={preset.utm.utm_source ?? ""} readOnly />
              <input type="hidden" name="utm_medium" value={preset.utm.utm_medium ?? ""} readOnly />
              <input type="hidden" name="utm_campaign" value={preset.utm.utm_campaign ?? ""} readOnly />
              <p style={{ display: "none" }}>
                <label>
                  Do not fill this out:
                  <input name="bot-field" />
                </label>
              </p>

              {preset.pkg && (
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 text-sm">
                  Quote request for <strong className="text-primary">{preset.pkg}</strong>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-5">
                <Select
                  label="Service lane"
                  name="project_type"
                  options={PROJECT_TYPES}
                  value={projectTypeValue}
                  onChange={(value) => {
                    setProjectTypeValue(value);
                    trackEvent("select_service_lane", {
                      service_lane: serviceLaneFromProject(value),
                      page_path: window.location.pathname,
                    });
                  }}
                  required
                />
                <Field label="Target shoot date" name="event_or_shoot_date" required />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="City or location" name="location_city" required />
                <Select label="Budget range" name="budget_range" options={BUDGETS} required />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Name" name="name" required />
                <Field label="Email or phone" name="email_or_phone" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Project details</label>
                <textarea
                  name="project_details"
                  rows={5}
                  className="w-full bg-background border border-input rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Tell us what needs to be filmed, what the video needs to do, and any deliverables or timing that matter."
                />
              </div>
              <div className="border-t border-border pt-5 grid gap-5">
                <div>
                  <p className="timecode mb-2">Editing-only details</p>
                  <p className="text-sm text-muted-foreground">
                    If you already have footage, these optional fields help us quote the edit more
                    accurately.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="What kind of footage do you have?" name="footage_type" />
                  <Field label="Rough amount of footage" name="footage_amount" />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Desired finished video length" name="finished_video_length" />
                  <Field label="Desired deadline" name="desired_deadline" />
                </div>
                <div className="grid md:grid-cols-3 gap-5">
                  <Select label="Need captions?" name="needs_captions" options={YES_NO_MAYBE} />
                  <Select label="Need music?" name="needs_music" options={YES_NO_MAYBE} />
                  <Select
                    label="Need color correction?"
                    name="needs_color_correction"
                    options={YES_NO_MAYBE}
                  />
                </div>
                <Field label="Google Drive, Dropbox, or WeTransfer link" name="footage_link" />
              </div>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="bg-primary text-primary-foreground px-7 py-4 rounded-md uppercase tracking-widest text-sm font-semibold hover:opacity-90 red-glow"
              >
                {status === "submitting" ? "Sending..." : "Request a Quote"}
              </button>
            </form>

            <aside className="order-1 lg:order-2 space-y-4">
              <SectionHeading eyebrow="Best results" title="What helps us quote quickly." />
              <div className="bg-card border border-border rounded-2xl p-6 grid gap-3 text-sm text-muted-foreground">
                <p>The clearest quotes start with one service lane, one city, one timeline, and one budget range.</p>
                <p>
                  Weddings and events should include the date. Business and real estate projects
                  should include the usage goal. Editing-only projects should include footage volume
                  and deadline.
                </p>
              </div>
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-card border border-border rounded-xl p-5 hover:border-primary transition"
              >
                <Instagram className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-medium">Instagram</p>
                  <p className="text-sm text-muted-foreground">{CONTACT.instagramLabel}</p>
                </div>
              </a>
              <a
                href={CONTACT.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-card border border-border rounded-xl p-5 hover:border-primary transition"
              >
                <Youtube className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-medium">YouTube</p>
                  <p className="text-sm text-muted-foreground">{CONTACT.youtubeLabel}</p>
                </div>
              </a>
            </aside>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function serviceLaneFromProject(projectType?: string) {
  if (!projectType) return "custom";
  if (projectType.includes("Business")) return "business";
  if (projectType.includes("Real Estate")) return "realEstate";
  if (projectType.includes("Wedding")) return "wedding";
  if (projectType.includes("Event")) return "event";
  if (projectType.includes("Artist")) return "artist";
  if (projectType.includes("Editing")) return "editing";
  return "custom";
}

function normalizeProjectType(projectType?: string) {
  if (!projectType) return undefined;
  if (projectType === "Business" || projectType === "B2B/Commercial" || projectType === "Business Video") {
    return "Business & Brand Video";
  }
  if (projectType === "Business & Brand Video") return "Business & Brand Video";
  if (projectType === "Real Estate" || projectType === "Real Estate Media") return "Real Estate Media";
  if (projectType === "Wedding" || projectType === "Weddings" || projectType === "Wedding Film") {
    return "Wedding Film";
  }
  if (projectType === "Events" || projectType === "Event Recap" || projectType === "Event Coverage") {
    return "Event Coverage";
  }
  if (
    projectType === "Artist Video" ||
    projectType === "Music" ||
    projectType === "Music/Artist Video" ||
    projectType === "Artist Visuals"
  ) {
    return "Artist Visuals";
  }
  if (projectType === "Editing" || projectType === "editing" || projectType === "Editing Only") {
    return "Editing Only";
  }
  if (projectType === "Custom" || projectType === "Custom Project") return "Custom Project";
  return PROJECT_TYPES.find((option) => option === projectType);
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
        {required && <span className="text-primary"> *</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full bg-background border border-input rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}

function Select({
  label,
  name,
  options,
  value,
  defaultValue,
  onChange,
  required,
}: {
  label: string;
  name: string;
  options: readonly string[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
        {required && <span className="text-primary"> *</span>}
      </label>
      <select
        key={value ?? defaultValue ?? "empty"}
        name={name}
        value={value}
        defaultValue={value === undefined ? defaultValue : undefined}
        required={required}
        onChange={(event) => onChange?.(event.currentTarget.value)}
        className="w-full bg-background border border-input rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
