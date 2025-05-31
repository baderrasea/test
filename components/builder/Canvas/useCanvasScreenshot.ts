import { useCallback } from "react";
import html2canvas from "html2canvas";

/**
 * Custom hook to take a screenshot of the canvas area and return a data URL.
 * Ensures the background is white while capturing.
 */
export function useCanvasScreenshot() {
  return useCallback(async (): Promise<string | undefined> => {
    // Find the element with data-canvas="true"
    const canvasDiv = document.querySelector(
      '[data-canvas="true"]'
    ) as HTMLElement | null;
    if (!canvasDiv) return undefined;

    // 1) Save the original background color
    const originalBg = canvasDiv.style.backgroundColor;

    try {
      // 2) Force background to pure white
      canvasDiv.style.backgroundColor = "#ffffff";

      // 3) Capture with html2canvas, ensuring white background
      const canvas = await html2canvas(canvasDiv, {
        useCORS: true,
        backgroundColor: "#ffffff", // force white
        scale: 1,
        logging: false,
        scrollY: -window.scrollY,
      });

      // 4) Return the data URL
      return canvas.toDataURL("image/png");
    } finally {
      // 5) Restore the original background color
      canvasDiv.style.backgroundColor = originalBg;
    }
  }, []);
}
