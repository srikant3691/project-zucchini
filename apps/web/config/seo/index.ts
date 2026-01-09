import type { Metadata } from "next";

export const SITE_CONFIG = {
  name: "Nitrutsav 2026",
  tagline: "Carnival of Colors",
  fullTitle: "Nitrutsav 2026 | Literary and Cultural Fest - NIT Rourkela",
  description:
    "NITRUTSAV 2026 - The premier Literary and Cultural Fest of NIT Rourkela. Experience the Carnival of Colors with electrifying performances, dance battles, music nights, drama, fashion shows, and creative exhibitions. Join Eastern India's most awaited college cultural extravaganza!",
  shortDescription:
    "The Literary and Cultural Fest of NIT Rourkela - Experience the Carnival of Colors!",
  url: "https://nitrutsav.in",
  locale: "en_IN",
  themeColor: "#1A0D51",
  instituteName: "National Institute of Technology, Rourkela",
  location: "NIT Rourkela, Odisha, India",
  year: 2026,
} as const;

// =============================================================================
// KEYWORDS
// =============================================================================

export const KEYWORDS = {
  primary: [
    "Nitrutsav",
    "Nitrutsav 2026",
    "NIT Rourkela",
    "Cultural Fest",
    "Literary Fest",
    "College Fest",
    "Carnival of Colors",
  ],
  secondary: [
    "NITR",
    "NIT Rourkela fest",
    "Eastern India cultural fest",
    "Odisha college fest",
    "technical institute fest",
    "student cultural festival",
  ],
  events: [
    "dance competition",
    "singing competition",
    "battle of bands",
    "fashion show",
    "EDM night",
    "celebrity night",
    "drama",
    "theatre",
    "poetry slam",
    "art exhibition",
    "short film festival",
    "quiz competition",
    "street play",
    "nukkad natak",
    "classical night",
  ],
  related: [
    "college events 2026",
    "cultural festival India",
    "music concert NIT",
    "dance fest Odisha",
    "pro shows college",
    "live performances",
  ],
} as const;

export const ALL_KEYWORDS = [
  ...KEYWORDS.primary,
  ...KEYWORDS.secondary,
  ...KEYWORDS.events,
  ...KEYWORDS.related,
];

// =============================================================================
// PAGE-SPECIFIC METADATA
// =============================================================================

export const PAGE_METADATA = {
  home: {
    title: SITE_CONFIG.fullTitle,
    description: SITE_CONFIG.description,
    keywords: [...KEYWORDS.primary, ...KEYWORDS.secondary],
  },
  about: {
    title: "About Nitrutsav 2026 | Our Story & Legacy - NIT Rourkela",
    description:
      "Learn about Nitrutsav - The annual Literary and Cultural Fest of NIT Rourkela. Discover our rich heritage, the vision behind the Carnival of Colors, and meet the team organizing Eastern India's grandest cultural celebration.",
    keywords: [
      "about Nitrutsav",
      "NIT Rourkela history",
      "cultural fest legacy",
      "Nitrutsav story",
      "NIT Rourkela cultural society",
    ],
  },
  events: {
    title: "Events at Nitrutsav 2026 | Dance, Music, Drama & More",
    description:
      "Explore the exciting lineup of events at Nitrutsav 2026. From Dance Competitions and Battle of Bands to Fashion Shows and EDM Nights - discover all the cultural, literary, and fun events awaiting you!",
    keywords: [...KEYWORDS.events, "Nitrutsav events", "cultural events NIT Rourkela"],
  },
  register: {
    title: "Register for Nitrutsav 2026 | Book Your Pass Now",
    description:
      "Register now for Nitrutsav 2026 - NIT Rourkela's Literary and Cultural Fest. Secure your pass for an unforgettable experience of music, dance, drama, and more. Limited seats available!",
    keywords: [
      "Nitrutsav registration",
      "register for Nitrutsav",
      "Nitrutsav 2026 pass",
      "cultural fest tickets",
      "NIT Rourkela fest registration",
    ],
  },
  contact: {
    title: "Contact Us | Nitrutsav 2026 - NIT Rourkela",
    description:
      "Get in touch with the Nitrutsav 2026 organizing team. Have questions about events, registration, or participation? Reach out to us for all your queries.",
    keywords: [
      "contact Nitrutsav",
      "Nitrutsav team",
      "reach Nitrutsav organizers",
      "NIT Rourkela fest contact",
    ],
  },
  faqs: {
    title: "FAQs | Nitrutsav 2026 - Frequently Asked Questions",
    description:
      "Find answers to frequently asked questions about Nitrutsav 2026. Learn about registration, events, accommodation, and everything you need to know before attending.",
    keywords: [
      "Nitrutsav FAQs",
      "Nitrutsav questions",
      "fest information",
      "event queries",
      "registration help",
    ],
  },
  sponsors: {
    title: "Our Sponsors | Nitrutsav 2026 - NIT Rourkela",
    description:
      "Meet the sponsors and partners supporting Nitrutsav 2026. We're grateful to our sponsors for making the Carnival of Colors possible.",
    keywords: [
      "Nitrutsav sponsors",
      "fest partners",
      "cultural fest sponsors",
      "NIT Rourkela sponsors",
    ],
  },
  mun: {
    title: "Model United Nations | Nitrutsav 2026 - NIT Rourkela",
    description:
      "Join the Model United Nations (MUN) at Nitrutsav 2026. Experience diplomatic debates, committee sessions, and enhance your public speaking skills at NIT Rourkela's premier MUN conference.",
    keywords: [
      "Nitrutsav MUN",
      "Model United Nations",
      "NIT Rourkela MUN",
      "MUN conference 2026",
      "college MUN India",
      "diplomatic simulation",
    ],
  },
} as const;

// =============================================================================
// OPEN GRAPH & SOCIAL MEDIA
// =============================================================================

export const OPEN_GRAPH = {
  type: "website",
  siteName: SITE_CONFIG.name,
  locale: SITE_CONFIG.locale,
  images: [
    {
      url: "https://res.cloudinary.com/domaovjhf/image/upload/v1767961236/Screenshot_2026-01-06_171418_nu1ktk.png",
      width: 1200,
      height: 630,
      alt: "Nitrutsav 2026 - Carnival of Colors | NIT Rourkela",
    },
  ],
};

// =============================================================================
// STRUCTURED DATA (JSON-LD)
// =============================================================================

export const STRUCTURED_DATA = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: "",
    sameAs: ["https://www.instagram.com/nitrutsav_nitr/"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Organizing Team",
      availableLanguage: ["English", "Hindi"],
    },
  },
  event: {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Nitrutsav 2026 - Carnival of Colors",
    description: SITE_CONFIG.description,
    startDate: "2026-01-15",
    endDate: "2026-01-18",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: SITE_CONFIG.instituteName,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Rourkela",
        addressRegion: "Odisha",
        addressCountry: "IN",
      },
    },
    organizer: {
      "@type": "Organization",
      url: SITE_CONFIG.url,
    },
    performer: {
      "@type": "PerformingGroup",
      name: "Various Artists and Student Performers",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
      validFrom: "2025-12-01",
    },
  },
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.shortDescription,
    publisher: {
      "@type": "Organization",
    },
  },
} as const;

// =============================================================================
// ROBOTS & CRAWLERS
// =============================================================================

export const ROBOTS = {
  index: true,
  follow: true,
  nocache: false,
  googleBot: {
    index: true,
    follow: true,
    noimageindex: false,
    "max-video-preview": -1,
    "max-image-preview": "large" as const,
    "max-snippet": -1,
  },
} as const;

// =============================================================================
// METADATA GENERATORS
// =============================================================================

/**
 * Generate metadata for a specific page
 */
export function generatePageMetadata(
  page: keyof typeof PAGE_METADATA,
  overrides?: Partial<Metadata>
): Metadata {
  const pageData = PAGE_METADATA[page];

  return {
    title: pageData.title,
    description: pageData.description,
    keywords: [...pageData.keywords],
    authors: [{ name: "NIT Rourkela" }],
    creator: "NIT Rourkela",
    publisher: "NIT Rourkela",
    metadataBase: new URL(SITE_CONFIG.url),
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      url: SITE_CONFIG.url,
      ...OPEN_GRAPH,
    },

    robots: ROBOTS,
    ...overrides,
  };
}

/**
 * Generate default site metadata
 */
export function generateDefaultMetadata(): Metadata {
  return {
    title: {
      default: SITE_CONFIG.fullTitle,
      template: `%s | ${SITE_CONFIG.name}`,
    },
    description: SITE_CONFIG.description,
    keywords: ALL_KEYWORDS,
    authors: [{ name: "DSC NIT Rourkela" }],
    creator: "DSC NIT Rourkela",
    publisher: "DSC NIT Rourkela",
    metadataBase: new URL(SITE_CONFIG.url),
    openGraph: {
      title: SITE_CONFIG.fullTitle,
      description: SITE_CONFIG.description,
      url: SITE_CONFIG.url,
      ...OPEN_GRAPH,
    },

    robots: ROBOTS,
    alternates: {
      canonical: SITE_CONFIG.url,
    },
    verification: {},
    category: "events",
    classification: "Cultural Festival",
  };
}

/**
 * Generate JSON-LD script for structured data
 */
export function generateJsonLd(type: keyof typeof STRUCTURED_DATA): string {
  return JSON.stringify(STRUCTURED_DATA[type]);
}

/**
 * Generate event-specific metadata for individual event pages
 */
export function generateEventMetadata(eventName: string, eventDescription: string): Metadata {
  return {
    title: `${eventName} | Nitrutsav 2026`,
    description: `${eventDescription} Register now for ${eventName} at Nitrutsav 2026 - NIT Rourkela's Literary and Cultural Fest.`,
    keywords: [
      eventName,
      "Nitrutsav event",
      "NIT Rourkela",
      "cultural fest event",
      ...KEYWORDS.primary,
    ],
    openGraph: {
      title: `${eventName} | Nitrutsav 2026`,
      description: eventDescription,
      ...OPEN_GRAPH,
    },
  };
}
