import Link from "next/link";
export default function NotFound() {
  return (
    <html lang="en">
      <body
        style={{
          background: "#171819",
          color: "#efefeb",
          padding: "10%",
          fontFamily: "Arial,sans-serif",
        }}
      >
        <p>404 / CISCO</p>
        <h1>A small detour.</h1>
        <p>This page isn’t here.</p>
        <Link href="/en" style={{ color: "#8ba7ff" }}>
          Back to portfolio ↗
        </Link>
      </body>
    </html>
  );
}
