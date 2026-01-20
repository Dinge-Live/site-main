"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Product {
  id: string;
  title: string;
  price: string;
  href: string;
  images: string[];
}

const products: Product[] = [
  {
    id: "band-t-shirt-black",
    title: "BAND T-SHIRT",
    price: "£50.00",
    href: "/product/band-t-shirt-black",
    images: [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c6ac1c5-1c7c-4284-bf23-5e189c7e3f9e-nofear-com/assets/images/NF-49_23b89356-fd9d-4e99-ad99-9e60c0f1fd4e-1.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c6ac1c5-1c7c-4284-bf23-5e189c7e3f9e-nofear-com/assets/images/NF-50_7a6ca7e8-3ed2-4dc1-a6df-8b60ed601d28-2.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c6ac1c5-1c7c-4284-bf23-5e189c7e3f9e-nofear-com/assets/images/BAND-TEE-BLACK-FRONT-3.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c6ac1c5-1c7c-4284-bf23-5e189c7e3f9e-nofear-com/assets/images/BAND-TEE-BLACK-BACK-4.jpg",
    ],
  },
  {
    id: "band-t-shirt-grey",
    title: "BAND T-SHIRT",
    price: "£50.00",
    href: "/product/band-t-shirt-grey",
    images: [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c6ac1c5-1c7c-4284-bf23-5e189c7e3f9e-nofear-com/assets/images/NF-47_62ab66f8-cf0a-4fb8-bdd5-a2133f9c5350-5.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c6ac1c5-1c7c-4284-bf23-5e189c7e3f9e-nofear-com/assets/images/NF-48_9fd908bb-d881-4cc6-bb13-65425bbaac63-6.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c6ac1c5-1c7c-4284-bf23-5e189c7e3f9e-nofear-com/assets/images/BAND-TEE-GREY-FRONT-7.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c6ac1c5-1c7c-4284-bf23-5e189c7e3f9e-nofear-com/assets/images/BAND-TEE-GREY-BACK-8.jpg",
    ],
  },
  {
    id: "band-cap",
    title: "BAND CAP",
    price: "£60.00",
    href: "/product/band-cap",
    images: [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c6ac1c5-1c7c-4284-bf23-5e189c7e3f9e-nofear-com/assets/images/NE01-9.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c6ac1c5-1c7c-4284-bf23-5e189c7e3f9e-nofear-com/assets/images/NE02-10.jpg",
    ],
  },
  {
    id: "nylon-patch-bomber",
    title: "NYLON PATCH BOMBER",
    price: "£425.00",
    href: "/product/nylon-patch-bomber",
    images: [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c6ac1c5-1c7c-4284-bf23-5e189c7e3f9e-nofear-com/assets/images/NF-4_1f2a622c-4149-4346-b95b-1bbc3e07501a-11.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c6ac1c5-1c7c-4284-bf23-5e189c7e3f9e-nofear-com/assets/images/NF-5_dcb27df6-0668-4ef9-a29d-f8837856d74a-12.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c6ac1c5-1c7c-4284-bf23-5e189c7e3f9e-nofear-com/assets/images/BOMBER-BLACK-FRONT_cbeb5574-9e12-4c3b-95e1-18afeec-16.jpg",
    ],
  },
  {
    id: "rib-beanie-white",
    title: "RIB BEANIE",
    price: "£50.00",
    href: "/product/rib-beanie-white",
    images: [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c6ac1c5-1c7c-4284-bf23-5e189c7e3f9e-nofear-com/assets/images/NF-1-18.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c6ac1c5-1c7c-4284-bf23-5e189c7e3f9e-nofear-com/assets/images/NF-50_7a6ca7e8-3ed2-4dc1-a6df-8b60ed601d28-2.jpg",
    ],
  },
  {
    id: "rib-beanie-black",
    title: "RIB BEANIE",
    price: "£50.00",
    href: "/product/rib-beanie-black",
    images: [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c6ac1c5-1c7c-4284-bf23-5e189c7e3f9e-nofear-com/assets/images/NF-50_7a6ca7e8-3ed2-4dc1-a6df-8b60ed601d28-2.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c6ac1c5-1c7c-4284-bf23-5e189c7e3f9e-nofear-com/assets/images/NF-1-18.jpg",
    ],
  },
  {
    id: "eyes-photo-t-shirt-arca",
    title: "EYES PHOTO T-SHIRT [ARCA]",
    price: "£100.00",
    href: "/product/eyes-photo-t-shirt-arca",
    images: [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c6ac1c5-1c7c-4284-bf23-5e189c7e3f9e-nofear-com/assets/images/NF-64-23.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c6ac1c5-1c7c-4284-bf23-5e189c7e3f9e-nofear-com/assets/images/BAND-TEE-BLACK-FRONT-3.jpg",
    ],
  },
  {
    id: "eyes-photo-t-shirt-blackhaine",
    title: "EYES PHOTO T-SHIRT [BLACKHAINE]",
    price: "£100.00",
    href: "/product/eyes-photo-t-shirt-blackhaine",
    images: [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c6ac1c5-1c7c-4284-bf23-5e189c7e3f9e-nofear-com/assets/images/BLACKHAINE-TEE-BLACK-FRONT-29.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c6ac1c5-1c7c-4284-bf23-5e189c7e3f9e-nofear-com/assets/images/BAND-TEE-BLACK-FRONT-3.jpg",
    ],
  },
];

const ProductCard = ({ product }: { product: Product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <a
      href={product.href}
      className="group relative border-b border-r border-white"
      onMouseEnter={() => product.images.length > 1 && setCurrentImageIndex(1)}
      onMouseLeave={() => setCurrentImageIndex(0)}
    >
      <div className="relative aspect-[1/1.2] w-full overflow-hidden">
        <div className="absolute inset-x-0 bottom-12 top-0 flex items-center justify-center p-4">
          {product.images.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
                idx === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={img}
                alt={product.title}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 50vw, 25vw"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>
        
        <div className="absolute inset-x-0 bottom-0 p-3 bg-black border-t border-white">
          <h2 className="text-[10px] leading-tight font-normal truncate text-white">
            {product.title}
          </h2>
          <div className="text-[10px] mt-[2px] font-normal text-white">
            {product.price}
          </div>
        </div>
      </div>
    </a>
  );
};

export default function ProductGrid() {
  return (
    <div className="relative z-10 bg-black text-white font-mono uppercase antialiased">
      <div className="grid grid-cols-2 border-t border-l border-white md:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {[...Array(4 - (products.length % 4))].map((_, i) => (
          <div 
            key={`filler-${i}`} 
            className={`hidden md:block border-b border-r border-white aspect-[1/1.2] ${i === (4 - (products.length % 4)) - 1 ? '' : ''}`} 
          />
        ))}
        {[...Array(2 - (products.length % 2))].map((_, i) => (
          <div 
            key={`filler-mob-${i}`} 
            className="md:hidden border-b border-r border-white aspect-[1/1.2]" 
          />
        ))}
      </div>
    </div>
  );
}