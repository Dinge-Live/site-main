"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import Image from "next/image";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&";

const ScrambleText = ({ text }: { text: string }) => {
  const [displayValue, setDisplayValue] = useState(text);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let iteration = 0;

    interval = setInterval(() => {
      setDisplayValue((prev) =>
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        iteration = 0;
      } else {
        iteration += 1 / 3;
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="relative inline-block select-none overflow-hidden font-bold h-full flex items-center">
      {/* Hidden reference for sizing */}
      <div className="invisible whitespace-nowrap px-1" aria-hidden="true">
        {text}
      </div>
      <div className="absolute inset-0 flex items-center justify-center whitespace-nowrap">
        {displayValue}
      </div>
    </div>
  );
};

export default function Navbar() {
  const router = useRouter();
  const { itemCount, isOpen, setIsOpen, items, removeItem, total, clearCart, updateQuantity } = useCart();
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);

  // Checkout form state
  const [formData, setFormData] = useState({
    mobileNumber: "",
    email: "",
    addressType: "Residential",
    title: "Mr",
    name: "",
    addressLine1: "",
    addressLine2: "",
    locality: "",
    stateProvince: "",
    zipPin: "",
    country: "USA",
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Mobile number validation
    const mobileRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    if (!formData.mobileNumber) {
      errors.mobileNumber = "Mobile number is required";
    } else if (!mobileRegex.test(formData.mobileNumber)) {
      errors.mobileNumber = "Invalid mobile number";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    // Name validation
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    // Address Line 1 validation
    if (!formData.addressLine1.trim()) {
      errors.addressLine1 = "Address is required";
    } else if (formData.addressLine1.length > 30) {
      errors.addressLine1 = "Max 30 characters";
    }

    // Locality validation
    if (!formData.locality.trim()) {
      errors.locality = "Locality is required";
    }

    // State/Province validation
    if (!formData.stateProvince.trim()) {
      errors.stateProvince = "State/Province is required";
    }

    // Zip/Pin validation
    const zipRegex = /^[A-Z0-9]{3,10}$/i;
    if (!formData.zipPin.trim()) {
      errors.zipPin = "Zip/Pin code is required";
    } else if (!zipRegex.test(formData.zipPin)) {
      errors.zipPin = "Invalid zip/pin code";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setError("Please fix the errors in the form");
      return;
    }

    if (!captchaToken) {
      setError("Please complete the captcha");
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          items,
          total,
          captchaToken,
        }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Checkout failed");
      }
      
      // Redirect to thank you page after successful order
      setTimeout(() => {
        clearCart();
        router.push("/thank-you?success=true");
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      captchaRef.current?.resetCaptcha();
      setCaptchaToken(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeCart = () => {
    setIsOpen(false);
    setCheckoutMode(false);
    setSubmitted(false);
    setFormData({
      mobileNumber: "",
      email: "",
      addressType: "Residential",
      title: "Mr",
      name: "",
      addressLine1: "",
      addressLine2: "",
      locality: "",
      stateProvince: "",
      zipPin: "",
      country: "USA",
    });
    setCaptchaToken(null);
    setError(null);
    setValidationErrors({});
  };

  return (
    <>
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 pointer-events-none p-3 flex items-center justify-between bg-black bg-opacity-90">
        {/* Left Navigation */}
        <div className="flex flex-row gap-x-[2px] pointer-events-auto h-[32px]">
          {/* Logo Button */}
          <a
            href="/"
            className="bg-black text-white flex items-center justify-center rounded-sm px-3 shadow-md border-none transition-transform active:scale-95"
            style={{ minWidth: "90px" }}
          >
            <ScrambleText text="DINGE.LIVE" />
          </a>

          {/* Shop Link */}
          <a
            href="/shop"
            className="bg-black text-white flex items-center justify-center rounded-sm px-4 shadow-md text-[12px] uppercase leading-none hover:bg-neutral-800 transition-colors"
          >
            Shop
          </a>

          {/* Info Link */}
          <a
            href="/page/info"
            className="bg-black text-white flex items-center justify-center rounded-sm px-4 shadow-md text-[12px] uppercase leading-none hover:bg-neutral-800 transition-colors"
          >
            Info
          </a>
        </div>

        {/* Center Logo - Hidden on mobile, shown on desktop */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 h-[32px] items-center pointer-events-none">
          <img 
            alt="Logo" 
            src="/Slice.png" 
            className="h-10 w-auto object-contai n"
          />
        </div>

        {/* Right Navigation (Cart) */}
        <div className="pointer-events-auto h-[32px] flex items-center">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-black text-white flex items-center justify-center rounded-sm px-4 shadow-md text-[12px] uppercase leading-none hover:bg-neutral-800 transition-colors h-full"
          >
            Cart {itemCount > 0 ? `(${itemCount})` : ""}
          </button>
        </div>
      </nav>

      {isOpen && (
         <div className="fixed inset-0 z-[100]">
           <div className="absolute inset-0 bg-black/50" onClick={closeCart} />
           <div className="absolute right-0 top-0 h-full w-full max-w-md bg-black text-white shadow-xl flex flex-col border-l border-white">
             <div className="flex items-center justify-between p-4 border-b border-white">
               <h2 className="text-sm font-bold uppercase">
                 {submitted ? "QUOTE PLACED" : checkoutMode ? "CHECKOUT" : "YOUR CART"}
               </h2>
               <button onClick={closeCart} className="text-xl font-bold hover:opacity-60">&times;</button>
             </div>
              
              {submitted ? (
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                  <div className="text-4xl mb-4">&#10003;</div>
                  <p className="text-sm mb-2">You have just placed a quote!</p>
                  <p className="text-xs text-gray-400">
                    You will receive an email at <strong>{formData.email}</strong> with a link to pay <strong>£{total}</strong>. And more details will be sent to your email.
                  </p>
                  <button
                    onClick={() => { clearCart(); closeCart(); }}
                    className="mt-6 px-6 py-2 bg-black text-white text-xs uppercase hover:bg-neutral-800"
                  >
                    CLOSE
                  </button>
                </div>
              ) : checkoutMode ? (
                <form onSubmit={handleCheckout} className="flex-1 flex flex-col p-4 overflow-y-auto">
                  <div className="flex-1 space-y-3">
                    {/* Mobile Number */}
                    <div>
                      <label className="text-[10px] uppercase block mb-1">Mobile Number*</label>
                      <input
                        type="tel"
                        value={formData.mobileNumber}
                        onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})}
                        placeholder="+1 (555) 123-4567"
                        className="w-full border border-white px-2 py-1 text-xs focus:outline-none bg-black text-white placeholder-gray-500"
                      />
                      {validationErrors.mobileNumber && <p className="text-[9px] text-red-500">{validationErrors.mobileNumber}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-[10px] uppercase block mb-1">Email*</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="your@email.com"
                        className="w-full border border-white px-2 py-1 text-xs focus:outline-none bg-black text-white placeholder-gray-500"
                      />
                      {validationErrors.email && <p className="text-[9px] text-red-500">{validationErrors.email}</p>}
                    </div>

                    {/* Title and Name */}
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-[10px] uppercase block mb-1">Title*</label>
                        <select value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full border border-white px-2 py-1 text-xs bg-black text-white focus:outline-none">
                          <option value="Mr">Mr</option>
                          <option value="Mrs">Mrs</option>
                          <option value="Ms">Ms</option>
                          <option value="Dr">Dr</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label className="text-[10px] uppercase block mb-1">Name*</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Full name"
                          className="w-full border border-white px-2 py-1 text-xs focus:outline-none bg-black text-white placeholder-gray-500"
                        />
                        {validationErrors.name && <p className="text-[9px] text-red-500">{validationErrors.name}</p>}
                      </div>
                    </div>

                    {/* Address Type */}
                    <div>
                      <label className="text-[10px] uppercase block mb-1">Address Type*</label>
                      <select value={formData.addressType} onChange={(e) => setFormData({...formData, addressType: e.target.value})} className="w-full border border-white px-2 py-1 text-xs bg-black text-white focus:outline-none">
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="P.O. Box">P.O. Box</option>
                      </select>
                    </div>

                    {/* Address Line 1 */}
                    <div>
                      <label className="text-[10px] uppercase block mb-1">Address Line 1* (Max 30 chars)</label>
                      <input
                        type="text"
                        maxLength={30}
                        value={formData.addressLine1}
                        onChange={(e) => setFormData({...formData, addressLine1: e.target.value})}
                        placeholder="Street address"
                        className="w-full border border-white px-2 py-1 text-xs focus:outline-none bg-black text-white placeholder-gray-500"
                      />
                      <p className="text-[9px] text-gray-500">{formData.addressLine1.length}/30</p>
                      {validationErrors.addressLine1 && <p className="text-[9px] text-red-500">{validationErrors.addressLine1}</p>}
                    </div>

                    {/* Address Line 2 */}
                    <div>
                      <label className="text-[10px] uppercase block mb-1">Address Line 2</label>
                      <input
                        type="text"
                        value={formData.addressLine2}
                        onChange={(e) => setFormData({...formData, addressLine2: e.target.value})}
                        placeholder="Apt, suite, building, etc. (optional)"
                        className="w-full border border-white px-2 py-1 text-xs focus:outline-none bg-black text-white placeholder-gray-500"
                      />
                    </div>

                    {/* Locality */}
                    <div>
                      <label className="text-[10px] uppercase block mb-1">Locality*</label>
                      <input
                        type="text"
                        value={formData.locality}
                        onChange={(e) => setFormData({...formData, locality: e.target.value})}
                        placeholder="City"
                        className="w-full border border-white px-2 py-1 text-xs focus:outline-none bg-black text-white placeholder-gray-500"
                      />
                      {validationErrors.locality && <p className="text-[9px] text-red-500">{validationErrors.locality}</p>}
                    </div>

                    {/* State/Province */}
                    <div>
                      <label className="text-[10px] uppercase block mb-1">State/Province*</label>
                      <input
                        type="text"
                        value={formData.stateProvince}
                        onChange={(e) => setFormData({...formData, stateProvince: e.target.value})}
                        placeholder="State or province"
                        className="w-full border border-white px-2 py-1 text-xs focus:outline-none bg-black text-white placeholder-gray-500"
                      />
                      {validationErrors.stateProvince && <p className="text-[9px] text-red-500">{validationErrors.stateProvince}</p>}
                    </div>

                    {/* Zip/Pin Code */}
                    <div>
                      <label className="text-[10px] uppercase block mb-1">Zip/Pin Code*</label>
                      <input
                        type="text"
                        value={formData.zipPin}
                        onChange={(e) => setFormData({...formData, zipPin: e.target.value.toUpperCase()})}
                        placeholder="12345"
                        className="w-full border border-white px-2 py-1 text-xs focus:outline-none bg-black text-white placeholder-gray-500"
                      />
                      {validationErrors.zipPin && <p className="text-[9px] text-red-500">{validationErrors.zipPin}</p>}
                    </div>

                    {/* Country */}
                    <div>
                      <label className="text-[10px] uppercase block mb-1">Country*</label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                        placeholder="Country"
                        className="w-full border border-white px-2 py-1 text-xs focus:outline-none bg-black text-white placeholder-gray-500"
                      />
                      {validationErrors.country && <p className="text-[9px] text-red-500">{validationErrors.country}</p>}
                    </div>

                    {/* Captcha */}
                    <div className="mt-2">
                      <HCaptcha
                        ref={captchaRef}
                        sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || "10000000-ffff-ffff-ffff-000000000001"}
                        onVerify={(token) => setCaptchaToken(token)}
                        onExpire={() => setCaptchaToken(null)}
                      />
                    </div>

                    {error && <p className="text-[10px] text-red-500">{error}</p>}

                    {/* Total */}
                    <div className="mt-2 border-t border-white pt-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span>TOTAL</span>
                        <span>£{total}</span>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 mt-4 pt-3 border-t border-white">
                    <button
                      type="button"
                      onClick={() => setCheckoutMode(false)}
                      className="flex-1 py-2 border border-white text-[10px] font-bold hover:bg-neutral-900"
                      disabled={isSubmitting}
                    >
                      BACK
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-white text-black text-[10px] font-bold hover:bg-neutral-200 disabled:opacity-50"
                      disabled={isSubmitting || !captchaToken}
                    >
                      {isSubmitting ? "SUBMITTING..." : "PLACE QUOTE"}
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex-1 overflow-auto p-4">
                    {items.length === 0 ? (
                      <p className="text-xs text-gray-400 text-center py-10">Your cart is empty</p>
                    ) : (
                      <div className="space-y-4">
                        {items.map((item) => (
                          <div key={`${item.id}-${item.size}`} className="flex gap-3 border-b border-neutral-700 pb-4">
                            <div className="relative w-16 h-16 bg-neutral-900 flex-shrink-0">
                              <Image src={item.image} alt={item.title} fill className="object-contain p-1" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold truncate">{item.title}</p>
                              <p className="text-[10px] text-gray-400">Size: {item.size}</p>
                              <p className="text-xs mt-1 font-semibold">{item.price}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <button
                                  onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                  className="w-5 h-5 border border-gray-500 text-gray-400 hover:text-white text-[10px] flex items-center justify-center"
                                >
                                  −
                                </button>
                                <span className="text-xs text-gray-300 w-4 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                  className="w-5 h-5 border border-gray-500 text-gray-400 hover:text-white text-[10px] flex items-center justify-center"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <button
                              onClick={() => removeItem(item.id, item.size)}
                              className="text-lg text-gray-500 hover:text-white self-start font-bold"
                              title="Remove item"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {items.length > 0 && (
                    <div className="border-t border-white p-4">
                      <div className="flex justify-between text-sm font-bold mb-4">
                        <span>TOTAL</span>
                        <span>£{total}</span>
                      </div>
                      <button
                        onClick={() => setCheckoutMode(true)}
                        className="w-full py-3 bg-white text-black text-[11px] font-bold hover:bg-neutral-200"
                      >
                        CHECKOUT
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

      {/* Mobile behavior: Original site sometimes puts nav at bottom on small screens. 
          The CSS class 'md:bottom-auto' in html_structure suggests it is on top for desktop.
          Keeping it at top for consistency as per user instruction 'fixed to top/bottom' */}
      
      <style jsx global>{`
        :root {
          --base-block-size: 32px;
        }
      `}</style>
    </>
  );
}