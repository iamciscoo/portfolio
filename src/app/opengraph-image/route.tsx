import { ImageResponse } from "next/og";
const size = { width: 1200, height: 630 };
export const dynamic = "force-static";
export function GET() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#171819",
        color: "#efefeb",
        padding: "70px 85px",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 21,
        }}
      >
        <span>cisco*</span>
        <span>TANZANIA → RUSSIA</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 83,
          fontWeight: 500,
          lineHeight: 1.08,
          letterSpacing: "-5px",
        }}
      >
        <span>Thoughtful code.</span>
        <span>Meaningful experiences.</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 19 }}>FRANCIS JACOB MWAMBENE</span>
        <span
          style={{
            background: "#537dff",
            width: 65,
            height: 65,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 34,
          }}
        >
          ↗
        </span>
      </div>
    </div>,
    size,
  );
}
