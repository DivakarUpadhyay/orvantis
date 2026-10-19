import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: custom software, IoT & embedded development`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #0b1a4d 0%, #2f5bea 60%, #06b6d4 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 40, fontWeight: 700 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              border: "6px solid white",
              display: "flex",
            }}
          />
          {site.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05 }}>Custom Software, IoT &amp; Embedded Engineering</div>
          <div style={{ fontSize: 32, marginTop: 24, opacity: 0.9 }}>
            Web · Mobile · Cloud · Firmware · MES · Industry 4.0 — serving India and Taiwan
          </div>
        </div>
      </div>
    ),
    size,
  );
}
