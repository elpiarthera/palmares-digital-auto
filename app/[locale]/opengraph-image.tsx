import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Palmares Digital Auto France 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isFr = locale === "fr";

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        {/* Bar chart logo icon */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "6px",
            marginBottom: "20px",
            height: "48px",
          }}
        >
          <div style={{ width: "10px", height: "20px", background: "#666", borderRadius: "2px" }} />
          <div style={{ width: "10px", height: "28px", background: "#888", borderRadius: "2px" }} />
          <div style={{ width: "10px", height: "36px", background: "#aaa", borderRadius: "2px" }} />
          <div style={{ width: "10px", height: "44px", background: "#fff", borderRadius: "2px" }} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
            color: "#888",
            fontSize: "20px",
          }}
        >
          Q1 2026 — 87 {isFr ? "critères" : "criteria"} · 16 {isFr ? "groupes" : "groups"} · 4 dimensions
        </div>
        <div
          style={{
            fontSize: "56px",
            fontWeight: 700,
            color: "#fff",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: "16px",
          }}
        >
          {isFr
            ? "Palmarès Digital Auto"
            : "Digital Auto Rankings"}
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "#aaa",
            textAlign: "center",
          }}
        >
          France 2026
        </div>
        <div
          style={{
            display: "flex",
            gap: "40px",
            marginTop: "48px",
          }}
        >
          {[
            { label: "SEO Tech", color: "#60a5fa" },
            { label: "SEO Content", color: "#818cf8" },
            { label: "Email", color: "#a78bfa" },
            { label: "AI Citation", color: "#c084fc" },
          ].map((dim) => (
            <div
              key={dim.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: dim.color,
                }}
              />
              <span style={{ color: "#888", fontSize: "16px" }}>
                {dim.label}
              </span>
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            color: "#555",
            fontSize: "16px",
          }}
        >
          ElPi Corp / Perello Consulting
        </div>
      </div>
    ),
    { ...size }
  );
}
