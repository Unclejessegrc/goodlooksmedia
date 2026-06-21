import type { PackageData } from "@/components/site/PackageCard";

export const EVENT_PACKAGES: PackageData[] = [
  {
    category: "Events",
    contactProjectType: "Event Coverage",
    serviceLane: "event",
    name: "Event Essentials",
    price: "$800 to $1,200",
    priceLabel: "Starting investment",
    bestFor:
      "Best for small parties, pop-ups, birthdays, baby showers, short events, and basic social recap needs.",
    includes: [
      "Short event coverage",
      "30 to 60 second social recap",
      "Clean edit",
      "Online delivery",
      "Vertical version available when requested",
    ],
  },
  {
    category: "Events",
    contactProjectType: "Event Coverage",
    serviceLane: "event",
    name: "Main Event",
    price: "$1,400 to $2,000",
    priceLabel: "Starting investment",
    featured: true,
    bestFor:
      "Best fit for most clients. Built for larger parties, live shows, community events, milestone events, and social-ready recaps.",
    includes: [
      "Up to 4 hours coverage",
      "1 videographer",
      "1 to 2 minute highlight recap",
      "2 vertical social clips",
      "Basic audio sync when possible",
      "Color grade",
      "Online delivery",
    ],
  },
  {
    category: "Events",
    contactProjectType: "Event Coverage",
    serviceLane: "event",
    name: "Full Story",
    price: "$2,200 to $3,200",
    priceLabel: "Starting investment",
    bestFor:
      "Best for bigger events, full live-show coverage, multi-camera needs, extended edits, festivals, and larger productions.",
    includes: [
      "Extended event coverage",
      "1 to 2 videographers depending on quote",
      "Extended highlight or story edit",
      "Multi-camera options",
      "Licensed music when required",
      "Vertical clips available",
      "Online delivery",
    ],
  },
];

export const MUSIC_PACKAGES: PackageData[] = [
  {
    category: "Artist Video",
    contactProjectType: "Artist Visuals",
    serviceLane: "artist",
    name: "Performance Film",
    price: "$900 to $1,400",
    priceLabel: "Starting investment",
    bestFor: "Best for one location, one song, clean performance video.",
    includes: [
      "One location",
      "One song",
      "Simple performance setup",
      "Clean edit",
      "Basic color correction",
      "Online delivery",
    ],
  },
  {
    category: "Artist Video",
    contactProjectType: "Artist Visuals",
    serviceLane: "artist",
    name: "Visual Story",
    price: "$1,600 to $2,400",
    priceLabel: "Starting investment",
    featured: true,
    bestFor:
      "Best for artists who want a stronger concept with multiple setups or simple narrative elements.",
    includes: [
      "Multiple setups",
      "Concept-driven edit",
      "Performance and story elements",
      "Basic lighting setup where possible",
      "One final video",
      "Social preview clip",
    ],
  },
  {
    category: "Artist Video",
    contactProjectType: "Artist Visuals",
    serviceLane: "artist",
    name: "Campaign Kit",
    price: "$2,400 to $3,800",
    priceLabel: "Starting investment",
    bestFor: "Best for artists preparing a release campaign.",
    includes: [
      "Full music video",
      "Vertical social cuts",
      "Promo clips",
      "Multiple setups",
      "Stronger edit direction",
      "Online delivery",
    ],
  },
];

export const WEDDING_PACKAGES: PackageData[] = [
  {
    category: "Weddings",
    contactProjectType: "Wedding Film",
    serviceLane: "wedding",
    name: "Teaser",
    price: "$1,200 to $1,800",
    priceLabel: "Starting investment",
    bestFor:
      "Best for small weddings, elopements, and couples who want a short cinematic keepsake.",
    includes: [
      "Filming coverage based on package",
      "Edited teaser film",
      "Audio moments when possible",
      "Color correction",
      "Online delivery",
      "Optional add-ons by quote",
    ],
  },
  {
    category: "Weddings",
    contactProjectType: "Wedding Film",
    serviceLane: "wedding",
    name: "Highlight",
    price: "$2,400 to $3,200",
    priceLabel: "Starting investment",
    featured: true,
    bestFor:
      "Best fit for most couples. A polished highlight film with the emotion and key moments of the day.",
    includes: [
      "Filming coverage based on package",
      "Edited highlight film",
      "Ceremony and speech audio when possible",
      "Color correction",
      "Online delivery",
      "Revisions based on package",
    ],
  },
  {
    category: "Weddings",
    contactProjectType: "Wedding Film",
    serviceLane: "wedding",
    name: "Full Story",
    price: "$3,800 to $5,000",
    priceLabel: "Starting investment",
    bestFor:
      "Best for larger weddings, fuller coverage, extended edits, and couples who want more of the day preserved.",
    includes: [
      "Extended filming coverage",
      "Edited highlight or full story film",
      "Ceremony and speech audio when possible",
      "Color correction",
      "Online delivery",
      "Custom add-ons by quote",
    ],
  },
];

export const BUSINESS_PACKAGES: PackageData[] = [
  {
    category: "Business",
    contactProjectType: "Business & Brand Video",
    serviceLane: "business",
    name: "Brand Foundation",
    price: "$1,200 to $1,800",
    priceLabel: "Starting investment",
    bestFor:
      "Best for small businesses that need short-form video, reels, or simple promo content.",
    includes: [
      "Filming",
      "Editing",
      "Short-form cutdowns",
      "Social-ready exports",
      "Revisions based on package",
      "Online delivery",
    ],
  },
  {
    category: "Business",
    contactProjectType: "Business & Brand Video",
    serviceLane: "business",
    name: "Brand Builder",
    price: "$1,200 to $2,200",
    priceLabel: "Starting investment",
    featured: true,
    bestFor:
      "Best fit for most businesses. Built around a core website video, testimonial, or brand story with short social cutdowns.",
    includes: [
      "Filming",
      "Editing",
      "Website-ready video",
      "Short-form cutdowns",
      "Social-ready exports",
      "Online delivery",
    ],
  },
  {
    category: "Business",
    contactProjectType: "Business & Brand Video",
    serviceLane: "business",
    name: "Campaign Kit",
    price: "$2,800 to $4,500",
    priceLabel: "Starting investment",
    bestFor:
      "Best for businesses that need a content library, campaign assets, multiple edits, or ongoing marketing use.",
    includes: [
      "Filming",
      "Editing",
      "Multiple campaign edits",
      "Website-ready video",
      "Social-ready exports",
      "Revisions based on package",
    ],
  },
];

export const REAL_ESTATE_PACKAGES: PackageData[] = [
  {
    category: "Real Estate Media",
    contactProjectType: "Real Estate Media",
    serviceLane: "realEstate",
    name: "Property Showcase",
    price: "Starting at $650",
    priceLabel: "Starting investment",
    bestFor:
      "Best for agents who need a fast property-first video package for Reels, listing pages, and a clean launch post.",
    includes: [
      "Property walkthrough coverage",
      "One vertical social edit",
      "Short horizontal listing cut",
      "Basic music sync",
      "Online delivery",
      "Usage for agent social channels",
    ],
  },
  {
    category: "Real Estate Media",
    contactProjectType: "Real Estate Media",
    serviceLane: "realEstate",
    name: "Cinematic Lifestyle",
    price: "Starting at $750",
    priceLabel: "Signature anchor",
    featured: true,
    bestFor:
      "Best fit for listings where the agent needs the neighborhood, lifestyle, and property story to work together in one branded asset.",
    includes: [
      "Property and lifestyle capture",
      "Agent-branded intro or outro",
      "One cinematic listing film",
      "Two vertical social cutdowns",
      "Color grade and music pacing",
      "Online delivery",
    ],
  },
  {
    category: "Real Estate Media",
    contactProjectType: "Real Estate Media",
    serviceLane: "realEstate",
    name: "Agent Brand Campaign",
    price: "Starting at $1,500",
    priceLabel: "Campaign anchor",
    bestFor:
      "Best for premium listings, agent brand campaigns, team launches, and high-energy edits built around attention and repeatable personal branding.",
    includes: [
      "Expanded creative planning",
      "Property, lifestyle, and agent coverage",
      "Campaign hero film",
      "Multiple vertical cutdowns",
      "Advanced pacing and sound design",
      "Custom rollout deliverables",
    ],
  },
];

export const EDITING_PACKAGES: PackageData[] = [
  {
    category: "Editing",
    contactProjectType: "Editing Only",
    serviceLane: "editing",
    name: "Quick Cut",
    price: "Quoted by scope",
    priceLabel: "Custom quote",
    bestFor: "Best for one simple short-form edit from footage you already have.",
    includes: [
      "One short edit up to 60 seconds",
      "Basic captions or text when needed",
      "Music sync",
      "Light color correction",
      "One revision",
      "One platform-ready export",
    ],
  },
  {
    category: "Editing",
    contactProjectType: "Editing Only",
    serviceLane: "editing",
    name: "Polished Edit",
    price: "Quoted by scope",
    priceLabel: "Custom quote",
    bestFor: "Best for one stronger promo, recap, talking-head video, or social-ready edit.",
    includes: [
      "One polished client-shot video",
      "Story structure and pacing",
      "Basic audio cleanup",
      "Color correction",
      "One to two revisions",
    ],
  },
  {
    category: "Editing",
    contactProjectType: "Editing Only",
    serviceLane: "editing",
    name: "Full Edit",
    price: "Quoted by scope",
    priceLabel: "Custom quote",
    bestFor: "Best for music videos, wedding highlights, longer recaps, YouTube, or interview-style edits.",
    includes: [
      "One fuller edit from organized footage",
      "Creative pacing and structure",
      "Audio and color polish where possible",
      "Up to two revisions",
    ],
  },
  {
    category: "Editing",
    contactProjectType: "Editing Only",
    serviceLane: "editing",
    name: "Custom Quote",
    price: "Quoted by scope",
    priceLabel: "Custom quote",
    bestFor: "Best for larger footage dumps, multiple deliverables, rush timelines, or unusual editing needs.",
    includes: [
      "Footage review",
      "Custom edit plan",
      "Quoted by volume and complexity",
      "Revisions based on scope",
    ],
  },
];

export const CUSTOM_PACKAGES: PackageData[] = [
  {
    category: "Custom",
    contactProjectType: "Custom Project",
    serviceLane: "custom",
    name: "Custom Projects",
    price: "Quoted by scope",
    priceLabel: "Custom quote",
    bestFor:
      "Best for documentaries, family stories, personal projects, reels, and unusual ideas that need a custom scope.",
    includes: [
      "Discovery call",
      "Custom scope and timeline",
      "Coverage plan based on story needs",
      "Edited final video",
      "Optional social cutdowns",
      "Online delivery",
    ],
  },
];

export const ALL_PACKAGES = [
  ...EVENT_PACKAGES,
  ...MUSIC_PACKAGES,
  ...WEDDING_PACKAGES,
  ...BUSINESS_PACKAGES,
  ...REAL_ESTATE_PACKAGES,
  ...EDITING_PACKAGES,
  ...CUSTOM_PACKAGES,
];
