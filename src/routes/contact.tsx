import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
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
      { title: "Contact & Quote Request | Good Looks Media Group" },
      {
        name: "description",
        content:
          "Request a quote for event, wedding, music video, editing, or commercial video in Rhode Island. Send the details and Good Looks will respond.",
      },
      { property: "og:title", content: "Contact & Quote Request | Good Looks Media Group" },
      {
        property: "og:description",
        content:
          "Request a quote for event, wedding, music video, editing, or commercial video in Rhode Island.",
      },
      { property: "og:url", content: absoluteUrl("/contact") },
      { name: "twitter:title", content: "Contact & Quote Request | Good Looks Media Group" },
      {
        name: "twitter:description",
        content:
          "Request a quote for event, wedding, music video, editing, or commercial video in Rhode Island.",
      },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/contact") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          pageJsonLd({
            name: "Contact & Quote Request",
            description:
              "Request a quote for event, wedding, music video, editing, or commercial video in Rhode Island.",
            path: "/contact",
          }),
        ),
      },
    ],
  }),
  component: ContactPage,
});

const PROJECT_TYPES = [
  "Event Recap",
  "Music/Artist Video",
  "Wedding",
  "B2B/Commercial",
  "Editing Only",
  "Custom Project",
] as const;

const BUDGETS = [
  "Under $250",
  "$250 to $600",
  "$600 to $1,200",
  "$1,200 to $2,500",
  "$2,500+",
  "Not sure yet",
] as const;

const YES_NO_MAYBE = ["Yes", "No", "Not sure"] as const;

function readSearchString(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

function presetFromSearch(search: ContactSearch) {
  return {
    projectType: search.service === "editing" ? "Editing Only" : search.projectType,
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
  const {
    service,
    projectType,
    package: packageName,
    utm_campaign: utmCampaign,
    utm_medium: utmMedium,
    utm_source: utmSource,
  } = search;
  const searchPreset = useMemo(
    () =>
      presetFromSearch({
        service,
        projectType,
        package: packageName,
        utm_campaign: utmCampaign,
        utm_medium: utmMedium,
        utm_source: utmSource,
      }),
    [packageName, projectType, service, utmCampaign, utmMedium, utmSource],
  );
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [preset, setPreset] = useState<{
    projectType?: string;
    pkg?: string;
    utm: Record<string, string>;
  }>(searchPreset);
  const [projectTypeValue, setProjectTypeValue] = useState(() => {
    return normalizeProjectType(searchPreset.projectType) ?? "";
  });

  useEffect(() => {
    setPreset(searchPreset);
    setProjectTypeValue(normalizeProjectType(searchPreset.projectType) ?? "");
  }, [searchPreset]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

      trackEvent("contact_form_submit", {
        form_name: "good-looks-inquiry",
        service_lane: serviceLane,
        package_name: formData.get("package_name")?.toString(),
        project_type: projectType,
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
            <h1 className="font-display text-4xl md:text-5xl uppercase">Thanks.</h1>
            <p className="mt-4 text-muted-foreground text-lg">
              Thanks. We got your request. Good Looks will review the details and get back to you as
              soon as possible.
            </p>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <a
                href={CONTACT.telHref}
                className="border border-foreground/30 px-5 py-3 rounded-md uppercase tracking-widest text-sm font-semibold"
                data-track-event="phone_click"
              >
                Call {CONTACT.phoneDisplay}
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
              Something went wrong and your message may not have gone through. Please call or email
              us directly.
            </p>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <a
                href={CONTACT.emailHref}
                className="border border-foreground/30 px-5 py-3 rounded-md uppercase tracking-widest text-sm font-semibold"
                data-track-event="email_click"
              >
                Email
              </a>
              <a
                href={CONTACT.telHref}
                className="border border-foreground/30 px-5 py-3 rounded-md uppercase tracking-widest text-sm font-semibold"
                data-track-event="phone_click"
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
            Request a <span className="text-primary">Quote.</span>
          </h1>
          <p className="mt-5 text-muted-foreground text-lg max-w-2xl">
            Tell us the date, city, project type, and budget range. We will help shape the right
            coverage and send a custom quote.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 grid md:grid-cols-3 gap-4">
            <a
              href={CONTACT.telHref}
              className="flex items-center gap-4 bg-card border border-border rounded-xl p-5 hover:border-primary transition"
              data-track-event="phone_click"
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
              data-track-event="email_click"
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
              <input
                type="hidden"
                name="utm_campaign"
                value={preset.utm.utm_campaign ?? ""}
                readOnly
              />
              <p style={{ display: "none" }}>
                <label>
                  Do not fill this out:
                  <input name="bot-field" />
                </label>
              </p>

              {preset.pkg && (
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 text-sm">
                  Requesting: <strong className="text-primary">{preset.pkg}</strong>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-5">
                <Select
                  label="Project type"
                  name="project_type"
                  options={PROJECT_TYPES}
                  value={projectTypeValue}
                  onChange={(value) => {
                    setProjectTypeValue(value);
                    if (value === "Editing Only") {
                      trackEvent("select_service_editing", {
                        service_lane: "editing",
                        page_path: window.location.pathname,
                      });
                    }
                  }}
                  required
                />
                <Field label="Event or shoot date" name="event_or_shoot_date" required />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Location / city" name="location_city" required />
                <Select label="Budget range" name="budget_range" options={BUDGETS} required />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Name" name="name" required />
                <Field label="Email or phone" name="email_or_phone" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tell us about your project</label>
                <textarea
                  name="project_details"
                  rows={5}
                  className="w-full bg-background border border-input rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Type of event, vibe, deliverables, timing, or anything else we should know."
                />
              </div>
              <div className="border-t border-border pt-5 grid gap-5">
                <div>
                  <p className="timecode mb-2">Editing details</p>
                  <p className="text-sm text-muted-foreground">
                    If you already have footage, these details help us quote the edit cleanly.
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
                  <Select
                    label="Do you need captions?"
                    name="needs_captions"
                    options={YES_NO_MAYBE}
                  />
                  <Select label="Do you need music?" name="needs_music" options={YES_NO_MAYBE} />
                  <Select
                    label="Do you need color correction?"
                    name="needs_color_correction"
                    options={YES_NO_MAYBE}
                  />
                </div>
                <Field label="Paste Google Drive / Dropbox / WeTransfer link" name="footage_link" />
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
              <SectionHeading eyebrow="Recent work" title="See the feel." />
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
  if (projectType.includes("Event")) return "event";
  if (projectType.includes("Music")) return "artist";
  if (projectType.includes("Wedding")) return "wedding";
  if (projectType.includes("B2B")) return "business";
  if (projectType.includes("Editing")) return "editing";
  return "custom";
}

function normalizeProjectType(projectType?: string) {
  if (!projectType) return undefined;
  if (projectType === "Events") return "Event Recap";
  if (projectType === "Artist Video" || projectType === "Music") return "Music/Artist Video";
  if (projectType === "Business") return "B2B/Commercial";
  if (projectType === "Editing" || projectType === "editing") {
    return "Editing Only";
  }
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
