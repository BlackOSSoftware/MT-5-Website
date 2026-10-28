import type { MetadataRoute } from "next";
import {
  SITE_APPLE_ICON_PATH,
  SITE_FAVICON_32_PATH,
  SITE_LOGO_PATH,
  SITE_NAME,
} from "./lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description:
      "Multi-asset trading across forex, crypto, indexes, and metals.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b1220",
    theme_color: "#1b4dff",
    icons: [
      {
        src: SITE_LOGO_PATH,
        sizes: "1024x1024",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: SITE_APPLE_ICON_PATH,
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: SITE_FAVICON_32_PATH,
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}
