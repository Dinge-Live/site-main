import { NextRequest, NextResponse } from "next/server";

interface CheckoutData {
  mobileNumber: string;
  email: string;
  addressType: string;
  title: string;
  name: string;
  addressLine1: string;
  addressLine2: string;
  locality: string;
  stateProvince: string;
  zipPin: string;
  country: string;
  items: Array<{
    id: string;
    title: string;
    price: string;
    size: string;
    image: string;
    quantity: number;
  }>;
  total: string;
  captchaToken: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as CheckoutData;
    const { 
      mobileNumber, 
      email, 
      addressType, 
      title, 
      name, 
      addressLine1, 
      addressLine2, 
      locality, 
      stateProvince, 
      zipPin, 
      country, 
      items, 
      total, 
      captchaToken 
    } = body;

    // Verify captcha
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

    // Prepare comprehensive webhook payload
    const webhookPayload = {
      event: "checkout.completed",
      timestamp: new Date().toISOString(),
      customer: {
        title,
        name,
        email,
        mobileNumber,
      },
      address: {
        type: addressType,
        line1: addressLine1,
        line2: addressLine2,
        locality,
        stateProvince,
        zipPin,
        country,
      },
      order: {
        items: items.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          size: item.size,
          quantity: item.quantity,
        })),
        total,
        currency: "GBP",
      },
    };

    // Send to webhook (async, don't block checkout)
    const webhookUrl = process.env.CHECKOUT_WEBHOOK_URL;
    if (webhookUrl) {
      // Send webhook in background without waiting
      (async () => {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

          const response = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(webhookPayload),
            signal: controller.signal,
          });

          clearTimeout(timeoutId);

          if (!response.ok) {
            console.error(`Webhook returned status ${response.status}`);
          } else {
            console.log("Webhook sent successfully");
          }
        } catch (webhookError) {
          if (webhookError instanceof Error && webhookError.name === "AbortError") {
            console.error("Webhook request timed out after 5 seconds");
          } else {
            console.error("Webhook send failed:", webhookError);
          }
        }
      })();
    }

    return NextResponse.json({ 
      success: true, 
      orderId: `ORD-${Date.now()}`,
      message: "Order received. You will receive a payment link shortly." 
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
