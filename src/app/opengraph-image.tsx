import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name}, ${siteConfig.role}, ${siteConfig.companyName}`;

const geist = await readFile(
  join(process.cwd(), "node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf"),
);

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#101112",
          padding: "72px 80px",
          color: "#ffffff",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "#ffffff",
              color: "#101112",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontFamily: "Geist",
            }}
          >
            AP
          </div>
          <div style={{ fontSize: "22px", color: "#a3a6aa", letterSpacing: "0.08em" }}>
            {siteConfig.companyName.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ fontSize: "82px", lineHeight: 1, letterSpacing: "-0.03em" }}>
            {siteConfig.name}
          </div>
          <div style={{ fontSize: "34px", color: "#35b862" }}>
            {siteConfig.role}
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "#a3a6aa",
              lineHeight: 1.4,
              maxWidth: "880px",
            }}
          >
            I build software systems that turn real-world problems into
            practical digital products.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "22px",
            color: "#85888c",
            borderTop: "1px solid #2a2d31",
            paddingTop: "28px",
          }}
        >
          <span>System Analyst · System Architect · Product Builder</span>
          <span>nepsof.com</span>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Geist", data: geist, style: "normal", weight: 400 }] },
  );
}
