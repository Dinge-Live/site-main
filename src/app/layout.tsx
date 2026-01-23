import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { CartProvider } from "@/lib/cart-context";

export const metadata: Metadata = {
  title: "Dinge.Live - Shop",
  description: "Dinge.Live official shop",
  openGraph: {
    title: "Dinge.Live - Shop",
      description: "Dinge.Live official shop",
      url: "https://dinge.live",
    siteName: "Dinge.Live",
    images: [
      {
        url: "/Slice",
        width: 1200,
        height: 630,
        alt: "Dinge.Live Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dinge.Live - Shop",
    description: "Dinge.Live official shop",
    images: [
      "/Slice",
    ],
  },
  icons: {
    icon: "/Slice",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CartProvider>
          {children}
        </CartProvider>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
