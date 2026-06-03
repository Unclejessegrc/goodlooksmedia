import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";

import appCss from "../styles.css?url";
import { OG_IMAGE, SITE_NAME } from "@/data/seo";
import { trackEvent } from "@/lib/analytics";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#231f20" },
      { title: "Good Looks Media Group | Rhode Island Video Production" },
      {
        name: "description",
        content:
          "Event recap, music video, wedding films, commercial video, and editing for Rhode Island. Real production experience. Clear pricing. Request a quote today.",
      },
      { name: "author", content: SITE_NAME },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        property: "og:title",
        content: "Good Looks Media Group | Rhode Island Video Production",
      },
      {
        name: "twitter:title",
        content: "Good Looks Media Group | Rhode Island Video Production",
      },
      {
        property: "og:description",
        content:
          "Event recap, music video, wedding films, commercial video, and editing for Rhode Island. Real production experience. Clear pricing. Request a quote today.",
      },
      {
        name: "twitter:description",
        content:
          "Event recap, music video, wedding films, commercial video, and editing for Rhode Island. Real production experience. Clear pricing. Request a quote today.",
      },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", sizes: "48x48", href: "/favicon-48x48.png" },
      { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon-96x96.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-NDY5GXH4MJ"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-NDY5GXH4MJ');
`,
          }}
        />
      </head>
      <body>
        {/* Hidden static fallback so Netlify detects the React inquiry form at build time. */}
        <form
          name="good-looks-inquiry"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          hidden
        >
          <input type="hidden" name="form-name" value="good-looks-inquiry" />
          <input
            type="hidden"
            name="subject"
            value="New Good Looks Media Group inquiry from %{formName} (%{submissionId})"
          />
          <input type="text" name="project_type" />
          <input type="text" name="event_or_shoot_date" />
          <input type="text" name="location_city" />
          <input type="text" name="budget_range" />
          <input type="text" name="name" />
          <input type="text" name="email_or_phone" />
          <textarea name="project_details"></textarea>
          <input type="text" name="footage_type" />
          <input type="text" name="footage_amount" />
          <input type="text" name="finished_video_length" />
          <input type="text" name="desired_deadline" />
          <input type="text" name="needs_captions" />
          <input type="text" name="needs_music" />
          <input type="text" name="needs_color_correction" />
          <input type="text" name="footage_link" />
          <input type="text" name="package_name" />
          <input type="text" name="page_path" />
          <input type="text" name="inquiry_source" />
          <input type="text" name="utm_source" />
          <input type="text" name="utm_medium" />
          <input type="text" name="utm_campaign" />
          <input type="text" name="bot-field" />
        </form>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const tracked = target?.closest<HTMLElement>("[data-track-event]");
      const link = target?.closest<HTMLAnchorElement>("a[href]");
      const linkUrl = link?.getAttribute("href");
      const contactEvent = getContactLinkEvent(linkUrl);
      const source = tracked ?? link;
      const eventName =
        contactEvent ??
        normalizeTrackedEvent(tracked?.dataset.trackEvent, source, linkUrl) ??
        getLinkIntentEvent(linkUrl, source);
      if (!eventName) return;

      trackEvent(eventName, {
        button_text: getElementText(source),
        link_url: link?.href,
        service_lane: source?.dataset.serviceLane,
        package_name: source?.dataset.packageName,
        video_title: source?.dataset.videoTitle,
        video_id: source?.dataset.videoId,
        portfolio_category: source?.dataset.portfolioCategory,
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}

function getContactLinkEvent(linkUrl?: string | null) {
  if (!linkUrl) return undefined;
  const normalizedUrl = linkUrl.trim().toLowerCase();
  if (normalizedUrl.startsWith("tel:")) return "phone_click";
  if (normalizedUrl.startsWith("mailto:")) return "email_click";
  return undefined;
}

function normalizeTrackedEvent(
  eventName?: string,
  element?: HTMLElement | null,
  linkUrl?: string | null,
) {
  if (!eventName) return undefined;
  if (eventName === "click_editing_quote") return "quote_cta_click";
  if (eventName === "click_editing_packages_box") return "package_button_click";
  if (eventName === "quote_cta_click" && isPackageLink(linkUrl, element)) {
    return "package_button_click";
  }
  return eventName;
}

function getLinkIntentEvent(linkUrl?: string | null, element?: HTMLElement | null) {
  if (isPackageLink(linkUrl, element)) return "package_button_click";
  if (isQuoteLink(linkUrl, element)) return "quote_cta_click";
  return undefined;
}

function isPackageLink(linkUrl?: string | null, element?: HTMLElement | null) {
  if (!linkUrl) return false;
  const normalizedUrl = linkUrl.trim().toLowerCase();
  const text = getElementText(element)?.toLowerCase() ?? "";
  const looksLikePackageButton =
    text.includes("view") ||
    text.includes("see") ||
    text.includes("match") ||
    text.includes("package");

  return (
    looksLikePackageButton &&
    text !== "packages" &&
    (normalizedUrl.includes("/packages") || normalizedUrl.includes("/editing"))
  );
}

function isQuoteLink(linkUrl?: string | null, element?: HTMLElement | null) {
  if (!linkUrl) return false;
  const normalizedUrl = linkUrl.trim().toLowerCase();
  const text = getElementText(element)?.toLowerCase() ?? "";
  if (!normalizedUrl.startsWith("/contact") && !normalizedUrl.includes("/contact?")) return false;
  if (text === "contact") return false;

  return /quote|request|availability|project|filmed|edited|need/.test(text);
}

function getElementText(element?: HTMLElement | null) {
  const label = element?.getAttribute("aria-label") || element?.textContent || "";
  const normalizedLabel = label.replace(/\s+/g, " ").trim();
  return normalizedLabel || undefined;
}
