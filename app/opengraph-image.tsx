import { ImageResponse } from "next/og";
import { SITE_NAME } from "./lib/seo";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "84px",
          background:
            "linear-gradient(135deg, #0b1220 0%, #121a2e 55%, #0b1220 100%)",
          color: "white",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: "uppercase",
            opacity: 0.55,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 58,
            fontWeight: 700,
            letterSpacing: -1.4,
            maxWidth: 920,
            lineHeight: 1.1,
          }}
        >
          Multi-asset trading, built for clarity
        </div>
        <div
          style={{
            marginTop: 22,
            fontSize: 24,
            opacity: 0.75,
            maxWidth: 820,
            lineHeight: 1.4,
          }}
        >
          Forex, crypto, indexes, and metals — clear pricing and steady
          execution.
        </div>
        <div
          style={{
            marginTop: 40,
            width: 72,
            height: 4,
            background: "#1b4dff",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
