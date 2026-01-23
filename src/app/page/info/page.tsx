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
            <h2 className="text-sm font-bold mb-4 border-b border-white pb-2">ABOUT US</h2>
            <p className="text-[11px] leading-relaxed">
              DINGE.LIVE IS A TECH AND FASHION HOBBY BRAND(NOT OFFICIAL/PERMANENT COMPANY/BRAND)!
              WE CREATE PRODUCTS THAT ARE MADE WITH TOP DESIGNS AND TOP MATERIALS SO 
              THAT WE COULD PROVIDE YOU TOP PRODUCTS AT THE BEST PRICES.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-sm font-bold mb-4 border-b border-white pb-2">SUPPORT</h2>
            <p className="text-[11px] leading-relaxed">
              At Dinge we give 80% of our profits to tech individuals and to tech charities!
              (Remaining 20% goes to dinge.live employes and to marketing and development)
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-sm font-bold mb-4 border-b border-white pb-2">CONTACT</h2>
            <div className="text-[11px] leading-relaxed space-y-1">
              <p>GENERAL INQUIRIES: INFO@DINGE.LIVE</p>
              <p>PRESS: PRESS@DINGE.LIVE</p>
              <p>WHOLESALE: SALES@DINGE.LIVE</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-sm font-bold mb-4 border-b border-white pb-2">SHIPPING</h2>
            <p className="text-[11px] leading-relaxed">
              WE SHIP WORLDWIDE. ORDERS ARE PROCESSED AFTER EVERY MONTH ON THE 1ST AS BATCHES. 
              SHIPPING TIMES VARY BY LOCATION. ALL ORDERS ARE SHIPPED WITH TRACKING. YOU WILL RECEIVE THE TRACKING LINK ON YOUR EMAIL.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-sm font-bold mb-4 border-b border-white pb-2">RETURN POLICY</h2>
            <p className="text-[11px] leading-relaxed">
              WE DO NOT ACCEPT RETURNS. ITEMS MUST BE REVIEWED BEFORE PURCHASE. NO REFUNDS WILL BE GIVEN IN ANY CASE.
              AFTER PURCHASE, WE ARE NOT RESPONSIBLE FOR ANY INCONVENIENCE DURING SHIPPING, DELIVERY, PRODUCT QUALITY
              PLEASE EMAIL US FOR ANY SPECIAL CASES OR QUESTIONS.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold mb-4 border-b border-white pb-2">SOCIAL</h2>
            <div className="flex gap-4 text-[11px]">
              <a href="" className="hover:opacity-60 transition-opacity">INSTAGRAM</a>
              <a href="#" className="hover:opacity-60 transition-opacity">TWITTER</a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
