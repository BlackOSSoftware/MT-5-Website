import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import NavbarFooterWrapper from "./layout/NavbarFooterWrapper";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import GlobalStructuredData from "./components/seo/GlobalStructuredData";
import {
  DEFAULT_OG_IMAGE_PATH,
  SITE_APPLE_ICON_PATH,
  SITE_FAVICON_16_PATH,
  SITE_FAVICON_32_PATH,
  SITE_FAVICON_PATH,
  SITE_NAME,
  SITE_URL,
  buildKeywordSet,
} from "./lib/seo";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Source Sans 3 is loaded via a stylesheet <link>: next/font/google under Turbopack
// (Next 16.0.x) fails on its "/l/font?kit=…&skey=…" file URLs. --font-source-sans is set in globals.css.
const SOURCE_SANS_HREF =
  "https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700&display=swap";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "oceanaprofx | Multi-asset trading, built for clarity",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "oceanaprofx gives traders focused access to forex, crypto, indexes, and metals — with clear pricing and disciplined execution.",
  applicationName: SITE_NAME,
  keywords: buildKeywordSet([
    "oceanaprofx",
    "forex trading platform",
    "crypto trading",
    "metals trading",
  ]),
  icons: {
    icon: [
      { url: SITE_FAVICON_PATH, sizes: "any" },
      { url: SITE_FAVICON_32_PATH, type: "image/png", sizes: "32x32" },
      { url: SITE_FAVICON_16_PATH, type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: SITE_APPLE_ICON_PATH, sizes: "180x180", type: "image/png" }],
    shortcut: [SITE_FAVICON_PATH],
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "oceanaprofx | Multi-asset trading, built for clarity",
    description:
      "Forex, crypto, indexes, and metals — clear pricing, steady execution.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE_PATH,
        alt: `${SITE_NAME} trading platform`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "oceanaprofx | Multi-asset trading, built for clarity",
    description:
      "Forex, crypto, indexes, and metals — clear pricing, steady execution.",
    images: [DEFAULT_OG_IMAGE_PATH],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={SOURCE_SANS_HREF} />
      </head>
      <body className={`${spaceGrotesk.variable} antialiased site-shell`}>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.theme;if(t==='dark'){document.documentElement.classList.add('dark');}else if(t==='light'){document.documentElement.classList.remove('dark');}}catch(e){}})();",
          }}
        />
        <GlobalStructuredData />
        <ReactQueryProvider>
          <NavbarFooterWrapper>{children}</NavbarFooterWrapper>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
