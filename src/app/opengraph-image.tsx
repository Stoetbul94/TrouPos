import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "edge";
export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
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
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #1a1612 0%, #0f0e0c 50%, #2a241c 100%)",
          color: "#faf8f5",
          fontFamily: "Georgia, serif",
        }}
      >
        <p style={{ fontSize: 18, letterSpacing: 8, color: "#c9a962", margin: 0 }}>
          SOUTH AFRICA
        </p>
        <h1 style={{ fontSize: 72, fontWeight: 300, margin: "24px 0 0" }}>
          {siteConfig.name}
        </h1>
        <p style={{ fontSize: 22, color: "rgba(250,248,245,0.7)", marginTop: 16 }}>
          Premium digital wedding invitations
        </p>
      </div>
    ),
    { ...size },
  );
}
