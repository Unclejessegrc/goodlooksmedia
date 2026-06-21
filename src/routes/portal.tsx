import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";

import InvoiceGenerator from "@/components/InvoiceGenerator";
import { SiteLayout } from "@/components/site/SiteLayout";
import { absoluteUrl } from "@/data/seo";

const STORAGE_KEY = "glmg_portal";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Business Login | Good Looks Media Group" },
      { name: "description", content: "Private business portal for Good Looks Media Group." },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/portal") }],
  }),
  component: PortalPage,
});

function PortalPage() {
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setAuthenticated(window.sessionStorage.getItem(STORAGE_KEY) === "1");
    setReady(true);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/.netlify/functions/portal-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = response.ok ? await response.json() : { ok: false };

      if (!response.ok || result.ok !== true) {
        throw new Error("Invalid credentials");
      }

      window.sessionStorage.setItem(STORAGE_KEY, "1");
      setAuthenticated(true);
      setPassword("");
    } catch {
      setError("Login failed. Check the email and password.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem(STORAGE_KEY);
    setAuthenticated(false);
    setPassword("");
  };

  if (!ready) {
    return (
      <SiteLayout>
        <section className="min-h-[calc(100vh-10rem)] bg-background" />
      </SiteLayout>
    );
  }

  if (authenticated) {
    return (
      <SiteLayout>
        <div className="bg-slate-100 text-slate-900">
          <div className="mx-auto flex max-w-6xl justify-end px-4 pt-4 md:px-6">
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Log Out
            </button>
          </div>
          <InvoiceGenerator />
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-16">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-card"
        >
          <h1 className="font-display text-4xl uppercase leading-none">Business Login</h1>

          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="portal-email" className="mb-1 block text-sm text-muted-foreground">
                Email
              </label>
              <input
                id="portal-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
                required
              />
            </div>

            <div>
              <label htmlFor="portal-password" className="mb-1 block text-sm text-muted-foreground">
                Password
              </label>
              <input
                id="portal-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
                required
              />
            </div>
          </div>

          {error ? <p className="mt-4 text-sm text-primary">{error}</p> : null}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full rounded-md bg-primary px-4 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Signing In" : "Sign In"}
          </button>
        </form>
      </section>
    </SiteLayout>
  );
}
