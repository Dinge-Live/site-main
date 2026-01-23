"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/sections/navbar";
import BackgroundCanvas from "@/components/sections/background-canvas";

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Check if user came from checkout (has success param)
    const success = searchParams.get("success");
    
    if (success !== "true") {
      // Redirect to home if not coming from checkout
      router.push("/");
      return;
    }
    
    setIsValid(true);
  }, [searchParams, router]);

  if (!isValid) {
    return null;
  }

  return (
    <main className="min-h-screen bg-black">
      <BackgroundCanvas />
      <Navbar />
      <div className="pt-20 px-6 md:px-12 max-w-2xl mx-auto">
        <div className="border border-white p-8 md:p-12 text-white text-center">
          <div className="text-6xl mb-6">✓</div>
          <h1 className="text-3xl font-bold mb-4">ORDER CONFIRMED</h1>
          <p className="text-sm mb-4">Thank you for your order!</p>
          <p className="text-xs text-gray-400 mb-6">
            You will receive an email shortly with a secure payment link to complete your order.
          </p>
          <p className="text-xs text-gray-400 mb-8">
            Order ID: {new Date().getTime()}
          </p>
          <a
            href="/shop"
            className="inline-block px-6 py-3 bg-white text-black text-sm font-bold uppercase hover:bg-gray-200"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    </main>
  );
}
