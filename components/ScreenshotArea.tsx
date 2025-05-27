"use client";
import React, { useRef } from "react";
import html2canvas from "html2canvas";

export default function ScreenshotArea() {
  const captureRef = useRef<HTMLDivElement>(null);

  const handleScreenshot = async () => {
    if (!captureRef.current) return;

    try {
      // Render the node to a canvas
      const canvas = await html2canvas(captureRef.current, {
        useCORS: true,           // Enables cross-origin images if any
        scrollY: -window.scrollY // Ensure full node capture even if scrolled
      });

      // Convert canvas to blob, then download
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "screenshot.png";
        a.click();
        URL.revokeObjectURL(url);
      }, "image/png");
    } catch (err) {
      console.error("Screenshot failed:", err);
    }
  };

  return (
    <div>
      <div
        ref={captureRef}
        style={{
          padding: 20,
          border: "2px solid #333",
          borderRadius: 8,
          display: "inline-block",
          background: "#fafafa",
        }}
      >
        <h1>Hello, Screenshot!</h1>
        <p>
          This box will be captured. You can put any React components here—
          images, charts, whatever.
        </p>
      </div>

      <div style={{ marginTop: 16 }}>
        <button
          onClick={handleScreenshot}
          style={{
            padding: "8px 16px",
            background: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Take Screenshot
        </button>
      </div>
    </div>
  );
}
