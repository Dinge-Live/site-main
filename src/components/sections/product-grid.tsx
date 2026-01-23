"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import CategoryMenu, { Category } from "./category-menu";

interface Product {
  id: string;
  title: string;
  price: string;
  href: string;
  images: string[];
  category: string;
  subcategory: string;
}

const categories: Category[] = [
  {
    id: "tshirts",
    name: "T-SHIRTS",
    subcategories: [
      { id: "all-over", name: "All Over" },
      { id: "bw", name: "B&W" },
      { id: "cars", name: "Cars" },
      { id: "limited", name: "Limited Edition" },
    ],
  },
  {
    id: "headwear",
    name: "HEADWEAR",
    subcategories: [
      { id: "caps", name: "Caps" },
      { id: "beanies", name: "Beanies" },
    ],
  },
  {
    id: "outerwear",
    name: "OUTERWEAR",
    subcategories: [
      { id: "bombers", name: "Bombers" },
      { id: "jackets", name: "Jackets" },
    ],
  },
];

const products: Product[] = [
  {
    id: "eyes-photo-t-shirt-blackhaine",
    title: "EYES PHOTO T-SHIRT [BLACKHAINE]",
    price: "£100.00",
    href: "/product/eyes-photo-t-shirt-blackhaine",
    category: "tshirts",
    subcategory: "graphic",
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category")
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    searchParams.get("subcategory")
  );

  const handleCategoryChange = (categoryId: string | null, subcategoryId: string | null) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(subcategoryId);

    // Update URL params
    const params = new URLSearchParams();
    if (categoryId) params.set("category", categoryId);
    if (subcategoryId) params.set("subcategory", subcategoryId);
    router.push(`/shop${params.toString() ? `?${params.toString()}` : ""}`);
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    if (!selectedCategory) return true;
    if (selectedCategory === product.category) {
      if (!selectedSubcategory) return true;
      return selectedSubcategory === product.subcategory;
    }
    return false;
  });

  return (
    <div className="relative bg-black text-white font-mono uppercase antialiased">
      <div className="grid grid-cols-2 border-t border-l border-white md:grid-cols-4 relative">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {[...Array(Math.max(0, 4 - (filteredProducts.length % 4)))].map((_, i) => (
          <div 
            key={`filler-${i}`} 
            className={`hidden md:block border-b border-r border-white aspect-[1/1.2]`} 
          />
        ))}
        {[...Array(Math.max(0, 2 - (filteredProducts.length % 2)))].map((_, i) => (
          <div 
            key={`filler-mob-${i}`} 
            className="md:hidden border-b border-r border-white aspect-[1/1.2]" 
          />
        ))}
      </div>
      
      {/* Overlay category menu */}
      <div className="fixed top-14 left-0 right-0 z-40 bg-black border-b border-white pointer-events-auto">
        <CategoryMenu
          categories={categories}
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>
    </div>
  );
}