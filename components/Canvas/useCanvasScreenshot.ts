import { useCallback } from 'react';
import html2canvas from 'html2canvas';

/**
 * Custom hook to take a screenshot of the canvas area and return a data URL.
 * @returns takeScreenshot - async function that returns a dataUrl of the screenshot
 */
export function useCanvasScreenshot() {
  // selector: [data-canvas="true"]
  return useCallback(async (): Promise<string | undefined> => {
    const canvasDiv = document.querySelector('[data-canvas="true"]') as HTMLElement | null;
    if (!canvasDiv) return undefined;
    const canvas = await html2canvas(canvasDiv, {
      useCORS: true,
      backgroundColor: null,
      scale: 1,
      logging: false,
      scrollY: -window.scrollY,
    });
    return canvas.toDataURL('image/png');
  }, []);
}
