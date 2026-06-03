import { Check } from "lucide-react";

export interface PackageData {
  name: string;
  price: string;
  priceLabel?: string;
  bestFor: string;
  includes: string[];
  category: string;
  serviceLane?: "event" | "artist" | "wedding" | "business" | "editing" | "custom";
  featured?: boolean;
}

export function PackageCard({ pkg }: { pkg: PackageData }) {
  const params = new URLSearchParams({ projectType: pkg.category, package: pkg.name });
  const href =
    pkg.serviceLane === "editing" ? "/contact?service=editing" : `/contact?${params.toString()}`;

  return (
    <div
      className={`relative flex flex-col bg-card border rounded-2xl p-6 md:p-8 transition hover:-translate-y-1 hover:shadow-card ${
        pkg.featured ? "border-primary red-glow" : "border-border"
      }`}
    >
      {pkg.featured && (
        <span className="absolute -top-3 left-6 bg-primary text-primary-foreground text-xs uppercase tracking-widest px-3 py-1 rounded-full">
          Best fit
        </span>
      )}
      <p className="timecode">{pkg.category}</p>
      <h3 className="font-display text-2xl md:text-3xl uppercase mt-1">{pkg.name}</h3>
      <p className="mt-2 text-3xl md:text-4xl font-display text-primary">{pkg.price}</p>
      <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
        {pkg.priceLabel ?? "Introductory range"}
      </p>
      <p className="mt-4 text-sm text-muted-foreground">{pkg.bestFor}</p>
      <ul className="mt-5 space-y-2.5 text-sm flex-1">
        {pkg.includes.map((i) => (
          <li key={i} className="flex gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <span>{i}</span>
          </li>
        ))}
      </ul>
      <a
        href={href}
        className="mt-6 inline-flex justify-center items-center bg-primary text-primary-foreground px-5 py-3 rounded-md uppercase tracking-wider text-sm font-medium hover:opacity-90"
        data-track-event="package_button_click"
        data-service-lane={pkg.serviceLane ?? pkg.category.toLowerCase()}
        data-package-name={pkg.name}
      >
        Request a Quote
      </a>
    </div>
  );
}
