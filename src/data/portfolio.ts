export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  projectType: string;
  goal: string;
  description: string;
  deliverables: string;
  bestUse: string;
  youtubeId?: string;
  youtubeUrl?: string;
  thumbnailUrl?: string;
  embedUrl?: string;
  autoplayEmbedUrl?: string;
  uploadDate?: string;
  duration?: string;
  contentUrl?: string;
  iframeTitle?: string;
  ctaLabel?: string;
  posterGradient: string;
}

export const CATEGORIES = ["All", "Director Reel", "Artist Visuals"] as const;

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: "director-reel",
    title: "Good Looks Director Reel",
    category: "Director Reel",
    projectType: "Director Reel",
    goal: "Preview the pacing, tone, and visual range behind future Good Looks commissions.",
    description: "A fast look at the Good Looks style, pacing, and visual direction.",
    deliverables: "Director reel, style preview, production range sample",
    bestUse: "Best for seeing the overall cinematic approach before requesting a quote.",
    youtubeId: "0q_7tljwQHY",
    youtubeUrl: "https://youtu.be/0q_7tljwQHY",
    thumbnailUrl: "https://img.youtube.com/vi/0q_7tljwQHY/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/0q_7tljwQHY?si=FmZMZDjSTBfAJCB5",
    autoplayEmbedUrl:
      "https://www.youtube.com/embed/0q_7tljwQHY?si=FmZMZDjSTBfAJCB5&autoplay=1&rel=0&modestbranding=1",
    contentUrl: "https://youtu.be/0q_7tljwQHY",
    uploadDate: "2024-01-01",
    iframeTitle: "Good Looks Media Group Director Reel",
    ctaLabel: "Watch the reel",
    posterGradient: "from-red-900 via-zinc-900 to-black",
  },
  {
    id: "artist-dwhjfxguif0",
    title: "Artist Performance Visual",
    category: "Artist Visuals",
    projectType: "Artist Visuals",
    goal: "Create a polished performance-led release asset for social, YouTube, and launch momentum.",
    description: "An anonymized artist visual focused on presence, pacing, and repeatable cutdowns.",
    deliverables: "Final music video, teaser cut, vertical promo clips",
    bestUse: "Best for a single release, performance rollout, or artist announcement.",
    youtubeId: "DwHJFxguIf0",
    youtubeUrl: "https://youtu.be/DwHJFxguIf0",
    thumbnailUrl: "https://img.youtube.com/vi/DwHJFxguIf0/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/DwHJFxguIf0",
    contentUrl: "https://youtu.be/DwHJFxguIf0",
    uploadDate: "2024-01-01",
    posterGradient: "from-red-900 via-zinc-900 to-black",
  },
  {
    id: "artist-bxzbr0gob9e",
    title: "Release Promo Visual",
    category: "Artist Visuals",
    projectType: "Artist Visuals",
    goal: "Build a cleaner release-facing visual that can live across YouTube, Instagram, and promo cycles.",
    description: "An anonymized release visual built for attention, replay value, and campaign cutdowns.",
    deliverables: "Lead visual, promo edit, social-ready exports",
    bestUse: "Best for artists who need one visual to anchor a song drop or rollout.",
    youtubeId: "BxzbR0Gob9E",
    youtubeUrl: "https://youtu.be/BxzbR0Gob9E",
    thumbnailUrl: "https://img.youtube.com/vi/BxzbR0Gob9E/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/BxzbR0Gob9E",
    posterGradient: "from-red-800 via-zinc-900 to-black",
  },
  {
    id: "artist-avzzb-heus0",
    title: "Concept Music Visual",
    category: "Artist Visuals",
    projectType: "Artist Visuals",
    goal: "Pair performance footage with stronger style cues so the visual feels more like a launch asset than a documentation clip.",
    description: "An anonymized concept visual built around atmosphere, performance, and sharper pacing.",
    deliverables: "Concept video, color-finished master, promo cutdown",
    bestUse: "Best for artists who want a more intentional visual identity around a song.",
    youtubeId: "aVzzB-HeUs0",
    youtubeUrl: "https://youtu.be/aVzzB-HeUs0",
    thumbnailUrl: "https://img.youtube.com/vi/aVzzB-HeUs0/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/aVzzB-HeUs0",
    posterGradient: "from-rose-800 via-zinc-900 to-black",
  },
  {
    id: "artist-s3klfozrsv0",
    title: "Studio-Led Artist Edit",
    category: "Artist Visuals",
    projectType: "Artist Visuals",
    goal: "Turn a controlled performance setup into something cinematic enough for a full release push.",
    description: "An anonymized studio-led visual focused on cleaner framing, rhythm, and polish.",
    deliverables: "Main visual, performance cut, promo exports",
    bestUse: "Best for artists who want a stronger look without a large-location production.",
    youtubeId: "S3KlFozRSv0",
    youtubeUrl: "https://youtu.be/S3KlFozRSv0",
    thumbnailUrl: "https://img.youtube.com/vi/S3KlFozRSv0/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/S3KlFozRSv0",
    posterGradient: "from-purple-900 via-zinc-900 to-black",
  },
  {
    id: "artist-qh3fwnlitnm",
    title: "Campaign Teaser Visual",
    category: "Artist Visuals",
    projectType: "Artist Visuals",
    goal: "Give an artist a sharper teaser asset that can support early campaign momentum and repeatable short-form content.",
    description: "An anonymized teaser-driven visual with quicker pacing and stronger social reuse.",
    deliverables: "Teaser visual, promo cutdowns, social-ready exports",
    bestUse: "Best for artists stacking content around a release window.",
    youtubeId: "QH3FwnLITnM",
    youtubeUrl: "https://youtu.be/QH3FwnLITnM",
    thumbnailUrl: "https://img.youtube.com/vi/QH3FwnLITnM/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/QH3FwnLITnM",
    posterGradient: "from-fuchsia-900 via-zinc-900 to-black",
  },
];
