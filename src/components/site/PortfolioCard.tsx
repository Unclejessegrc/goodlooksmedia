import { useState } from "react";
import { Play, X } from "lucide-react";
import type { PortfolioItem } from "@/data/portfolio";

export function PortfolioCard({ item }: { item: PortfolioItem }) {
  const [open, setOpen] = useState(false);
  const hasVideo = Boolean(item.youtubeId || item.embedUrl || item.autoplayEmbedUrl);
  const embedSrc = getAutoplayEmbedSrc(item);
  const ctaLabel = item.ctaLabel ?? "Watch case study";

  return (
    <>
      <div className="group relative overflow-hidden rounded-2xl border border-border bg-card aspect-[4/3] sm:aspect-video">
        {item.thumbnailUrl ? (
          <>
            <img
              src={item.thumbnailUrl}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition"
              width={1280}
              height={720}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/15" />
          </>
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${item.posterGradient} opacity-90 group-hover:opacity-100 transition`}
          />
        )}
        <div className="absolute inset-0 film-grain" />
        <button
          type="button"
          onClick={() => hasVideo && setOpen(true)}
          aria-label={hasVideo ? `Play ${item.title}` : item.title}
          className="absolute inset-0 flex flex-col justify-end p-5 text-left"
          data-track-event={hasVideo ? "portfolio_video_play" : undefined}
        >
          <div className="absolute top-4 right-4 timecode bg-black/60 px-2 py-1 rounded">
            {item.projectType}
          </div>
          {hasVideo && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="w-14 h-14 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center group-hover:scale-110 transition red-glow">
                <Play className="w-6 h-6 ml-0.5 fill-current" />
              </span>
            </div>
          )}
          <div className="relative rounded-xl bg-black/30 p-3 backdrop-blur-sm">
            <h3 className="font-display text-lg sm:text-xl md:text-2xl uppercase leading-none">
              {item.title}
            </h3>
            <p className="text-sm text-zinc-300/90 mt-1">Goal: {item.goal}</p>
            <p className="text-xs text-zinc-300/80 mt-2">Deliverables: {item.deliverables}</p>
            <p className="text-xs text-zinc-300/80 mt-1">Best use: {item.bestUse}</p>
            <span className="mt-3 inline-flex flex-wrap gap-x-4 gap-y-1 text-xs uppercase text-primary">
              <span>{ctaLabel}</span>
              {!item.ctaLabel && <span>Request a Quote</span>}
            </span>
          </div>
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <button className="absolute top-4 right-4 text-white p-2" aria-label="Close">
            <X className="w-6 h-6" />
          </button>
          <div
            className="w-full max-w-5xl aspect-video bg-black border border-border rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {hasVideo ? (
              <iframe
                src={embedSrc}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                title={item.iframeTitle ?? item.title}
                loading="lazy"
              />
            ) : (
              <div
                className={`w-full h-full bg-gradient-to-br ${item.posterGradient} flex items-center justify-center text-center p-8`}
              >
                <h3 className="font-display text-3xl uppercase">{item.title}</h3>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function getAutoplayEmbedSrc(item: PortfolioItem) {
  if (item.autoplayEmbedUrl) return item.autoplayEmbedUrl;
  if (item.embedUrl) {
    const joiner = item.embedUrl.includes("?") ? "&" : "?";
    return `${item.embedUrl}${joiner}autoplay=1&rel=0&modestbranding=1`;
  }
  return `https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&rel=0&modestbranding=1`;
}
