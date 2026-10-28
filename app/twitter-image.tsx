import { ImageResponse } from "next/og";
import { SITE_NAME } from "./lib/seo";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function TwitterImage() {
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
        <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: 4, opacity: 0.55 }}>
          {SITE_NAME}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 54,
            fontWeight: 700,
            letterSpacing: -1.2,
            maxWidth: 900,
            lineHeight: 1.1,
          }}
        >
          Trade with clarity across global markets
        </div>
        <div style={{ marginTop: 40, width: 72, height: 4, background: "#e11d48" }} />
      </div>
    ),
    { ...size }
  );
}
