import DemoInvoicePage from "@/components/demo-invoice";
import ScreenshotArea from "@/components/ScreenshotArea";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
       <h2>My Next.js Screenshot Demo</h2>
      <ScreenshotArea />
      <DemoInvoicePage />
    </div>
  );
}
