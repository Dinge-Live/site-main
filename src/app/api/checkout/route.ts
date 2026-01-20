import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, items, total, captchaToken } = body;

    const hcaptchaResponse = await fetch("https://api.hcaptcha.com/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.HCAPTCHA_SECRET_KEY || "",
        response: captchaToken,
      }),
    });

    const hcaptchaData = await hcaptchaResponse.json();

    if (!hcaptchaData.success) {
      return NextResponse.json({ error: "Captcha verification failed" }, { status: 400 });
    }

    const webhookUrl = process.env.CHECKOUT_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          items,
          total,
          timestamp: new Date().toISOString(),
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
