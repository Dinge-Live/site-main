"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import Navbar from "@/components/sections/navbar";
import BackgroundCanvas from "@/components/sections/background-canvas";
import { useCart } from "@/lib/cart-context";

const products: Record<string, { title: string; price: string; description: string; images: string[]; sizes: string[] }> = {
  "eyes-photo-t-shirt-blackhaine": {
    title: "EYES PHOTO T-SHIRT [BLACKHAINE]",
    price: "£100.00",
    description: "LIMITED EDITION PHOTO T-SHIRT FEATURING BLACKHAINE. 100% COTTON.",
    images: [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c6ac1c5-1c7c-4284-bf23-5e189c7e3f9e-nofear-com/assets/images/BLACKHAINE-TEE-BLACK-FRONT-29.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c6ac1c5-1c7c-4284-bf23-5e189c7e3f9e-nofear-com/assets/images/BAND-TEE-BLACK-FRONT-3.jpg",
    ],
    sizes: ["S", "M", "L", "XL"],
  },
};

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = products[slug];
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize || !product) return;
    addItem({
      id: slug,
      title: product.title,
      price: product.price,
      size: selectedSize,
      image: product.images[0],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) {
    return (
      <main className="min-h-screen bg-black text-white">
        <BackgroundCanvas />
        <Navbar />
        <div className="pt-20 flex items-center justify-center">
          <p className="text-sm">PRODUCT NOT FOUND</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <BackgroundCanvas />
      <Navbar />
      <div className="pt-14">
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-white">
          <div className="border-r border-white">
            <div className="relative aspect-square">
              <Image
                src={product.images[selectedImage]}
                alt={product.title}
                fill
                className="object-contain p-8"
                priority
              />
            </div>
            <div className="flex border-t border-white">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-1 aspect-square relative border-r border-white last:border-r-0 ${
                    selectedImage === idx ? "opacity-100" : "opacity-40"
                  } hover:opacity-100 transition-opacity`}
                >
                  <Image
                    src={img}
                    alt={`${product.title} view ${idx + 1}`}
                    fill
                    className="object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 md:p-10">
            <h1 className="text-lg font-bold mb-2">{product.title}</h1>
            <p className="text-sm mb-6">{product.price}</p>
            
            <div className="mb-6">
              <p className="text-[10px] mb-3">SIZE</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border border-white text-[10px] transition-colors ${
                      selectedSize === size
                        ? "bg-white text-black"
                        : "bg-black text-white hover:bg-white hover:text-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

              <button
                onClick={handleAddToCart}
                className="w-full py-3 bg-white text-black text-[11px] font-bold hover:bg-neutral-200 transition-colors mb-6 disabled:opacity-50"
                disabled={!selectedSize}
              >
                {added ? "ADDED!" : selectedSize ? "ADD TO CART" : "SELECT SIZE"}
              </button>

            <div className="border-t border-white pt-6">
              <p className="text-[10px] leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
