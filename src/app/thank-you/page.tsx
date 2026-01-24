import { Suspense } from "react";
import ThankYouContent from "./thank-you-content";

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}
