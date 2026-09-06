"use client";
export default function ErrorBoundary({ error }: { error: Error }) {
  return <div style={{ color: "red", padding: 20 }}>
    <h1>MARKETING ERROR BOUNDARY</h1>
    <pre>{error.message}</pre>
    <pre>{error.stack}</pre>
  </div>
}
