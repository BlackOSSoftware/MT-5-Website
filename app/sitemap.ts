import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/seo";

const ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/why-choose-us", changeFrequency: "monthly", priority: 0.8 },
  { path: "/reviews", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/economic-calendar", changeFrequency: "weekly", priority: 0.75 },
  { path: "/accounts", changeFrequency: "monthly", priority: 0.7 },
  { path: "/partners", changeFrequency: "monthly", priority: 0.65 },
  { path: "/become-a-partner", changeFrequency: "monthly", priority: 0.7 },
  { path: "/open-account", changeFrequency: "monthly", priority: 0.7 },
  { path: "/login", changeFrequency: "monthly", priority: 0.4 },
  { path: "/markets/forex", changeFrequency: "weekly", priority: 0.85 },
  { path: "/markets/crypto", changeFrequency: "weekly", priority: 0.85 },
  { path: "/markets/indices", changeFrequency: "weekly", priority: 0.85 },
  { path: "/markets/metal", changeFrequency: "weekly", priority: 0.85 },
  { path: "/trading/account", changeFrequency: "monthly", priority: 0.75 },
  { path: "/trading/platform", changeFrequency: "monthly", priority: 0.75 },
  { path: "/trading/condition", changeFrequency: "monthly", priority: 0.75 },
  { path: "/trading/market-time", changeFrequency: "weekly", priority: 0.75 },
  { path: "/trading/deposit-withdrawal", changeFrequency: "monthly", priority: 0.75 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

