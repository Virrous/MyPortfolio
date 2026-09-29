import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/lib/site";
import { getProject } from "@/data/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Static export so the framework can emit og:image:alt in the page head.
export const alt = `Case study of a ${siteConfig.companyName} product, by ${siteConfig.name}`;

const geist = await readFile(
  join(
    process.cwd(),
    "node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf",
  ),
);

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Read the real project name from the content data rather than guessing it
  // from the slug, so the card stays correct if a name is ever revised.
  const project = getProject(slug);
  const name = project?.name ?? "Case Study";

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
        <div
          style={{
            fontSize: "22px",
            letterSpacing: "0.16em",
            color: "#35b862",
            textTransform: "uppercase",
          }}
        >
          Case Study
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ fontSize: "96px", lineHeight: 1, letterSpacing: "-0.03em" }}>
            {name}
          </div>
          <div style={{ fontSize: "30px", color: "#a3a6aa" }}>
            {siteConfig.companyName}
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
          <span>
            {siteConfig.name}, {siteConfig.role}
          </span>
          <span>nepsof.com</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Geist", data: geist, style: "normal", weight: 400 }],
    },
  );
}
