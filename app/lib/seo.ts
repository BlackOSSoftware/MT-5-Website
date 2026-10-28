import type { Metadata } from "next";

export const SITE_URL = "https://www.oceanaprofx.com";
export const SITE_NAME = "oceanaprofx";
export const SITE_LOGO_PATH = "/logo.png";
export const SITE_FAVICON_PATH = "/logo.png";
export const SITE_FAVICON_32_PATH = "/logo.png";
export const SITE_FAVICON_16_PATH = "/logo.png";
export const SITE_APPLE_ICON_PATH = "/logo.png";
export const DEFAULT_OG_IMAGE_PATH = "/opengraph-image";
export const DEFAULT_TWITTER_IMAGE_PATH = "/twitter-image";

const BASE_KEYWORDS = [
  "oceanaprofx",
  "oceanaprofx trading",
  "forex trading",
  "crypto trading",
  "index trading",
  "metal trading",
  "online trading platform",
  "multi asset broker",
] as const;

function normalizeKeywords(keywords: readonly string[]): string[] {
  const seen = new Set<string>();
  const normalized: string[] = [];

  for (const raw of keywords) {
    const keyword = raw.trim().toLowerCase().replace(/\s+/g, " ");
    if (!keyword || seen.has(keyword)) continue;
    seen.add(keyword);
    normalized.push(keyword);
  }

  return normalized;
}

/** Clean oceanaprofx keywords only — no spam/keyword-stuffing generator. */
export function buildKeywordSet(pageKeywords: readonly string[] = []): string[] {
  return normalizeKeywords([...BASE_KEYWORDS, ...pageKeywords]).slice(0, 24);
}

export function buildPageMetadata({
  title,
  description,
  path,
  pageKeywords = [],
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  pageKeywords?: readonly string[];
  noindex?: boolean;
}): Metadata {
  const canonical = `${SITE_URL}${path}`;
  const keywords = buildKeywordSet(pageKeywords);
  const defaultImages = [
    {
      url: DEFAULT_OG_IMAGE_PATH,
      alt: `${title} | ${SITE_NAME}`,
    },
  ];

  return {
    title,
    description,
    keywords,
    applicationName: SITE_NAME,
    creator: SITE_NAME,
    publisher: SITE_NAME,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: defaultImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_TWITTER_IMAGE_PATH],
    },
    icons: {
      icon: [
        { url: SITE_FAVICON_PATH, sizes: "any" },
        { url: SITE_FAVICON_32_PATH, type: "image/png", sizes: "32x32" },
        { url: SITE_FAVICON_16_PATH, type: "image/png", sizes: "16x16" },
      ],
      apple: [{ url: SITE_APPLE_ICON_PATH, sizes: "180x180", type: "image/png" }],
      shortcut: [SITE_FAVICON_PATH],
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
          },
        },
  };
}
