"use client";

import Navbar from "@/components/sections/navbar";
import BackgroundCanvas from "@/components/sections/background-canvas";

export default function InfoPage() {
  return (
    <main className="min-h-screen bg-black">
      <BackgroundCanvas />
      <Navbar />
      <div className="pt-20 px-6 md:px-12 max-w-4xl mx-auto ">
        <div className="border border-white p-8 md:p-12 text-white">
          <h1 className="text-2xl md:text-3xl font-bold mb-8 tracking-tight">INFO</h1>
          
          <section className="mb-10">
            <h2 className="text-sm font-bold mb-4 border-b border-white pb-2">ABOUT</h2>
            <p className="text-[11px] leading-relaxed">
              NO FEAR IS A CREATIVE COLLECTIVE AND FASHION LABEL FOUNDED IN LONDON. 
              WE CREATE GARMENTS AND EXPERIENCES THAT CHALLENGE CONVENTIONAL AESTHETICS 
              AND EMBRACE THE RAW, UNFILTERED NATURE OF CONTEMPORARY CULTURE.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-sm font-bold mb-4 border-b border-white pb-2">CONTACT</h2>
            <div className="text-[11px] leading-relaxed space-y-1">
              <p>GENERAL INQUIRIES: INFO@NOFEAR.COM</p>
              <p>PRESS: PRESS@NOFEAR.COM</p>
              <p>WHOLESALE: SALES@NOFEAR.COM</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-sm font-bold mb-4 border-b border-white pb-2">SHIPPING</h2>
            <p className="text-[11px] leading-relaxed">
              WE SHIP WORLDWIDE. ORDERS ARE PROCESSED WITHIN 2-3 BUSINESS DAYS. 
              DELIVERY TIMES VARY BY LOCATION. ALL ORDERS ARE SHIPPED WITH TRACKING.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-sm font-bold mb-4 border-b border-white pb-2">RETURNS</h2>
            <p className="text-[11px] leading-relaxed">
              RETURNS ACCEPTED WITHIN 14 DAYS OF DELIVERY. ITEMS MUST BE UNWORN WITH 
              ORIGINAL TAGS ATTACHED. PLEASE EMAIL US FOR RETURN AUTHORIZATION.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold mb-4 border-b border-white pb-2">SOCIAL</h2>
            <div className="flex gap-4 text-[11px]">
              <a href="#" className="hover:opacity-60 transition-opacity">INSTAGRAM</a>
              <a href="#" className="hover:opacity-60 transition-opacity">TWITTER</a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
