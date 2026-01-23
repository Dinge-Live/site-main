"use client";

import React, { useState } from "react";

export interface Category {
  id: string;
  name: string;
  subcategories: {
    id: string;
    name: string;
  }[];
}

interface CategoryMenuProps {
  categories: Category[];
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  onCategoryChange: (categoryId: string | null, subcategoryId: string | null) => void;
}

export default function CategoryMenu({
  categories,
  selectedCategory,
  selectedSubcategory,
  onCategoryChange,
}: CategoryMenuProps) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  const handleSubcategoryClick = (categoryId: string, subcategoryId: string) => {
    onCategoryChange(categoryId, subcategoryId);
    setOpenCategory(null);
  };

  return (
    <div className="bg-black border-white py-3 px-6">
      <div className="flex flex-wrap gap-2 justify-center items-center">
        {/* ALL option */}
        <button
          onClick={() => {
            onCategoryChange(null, null);
            setOpenCategory(null);
          }}
          className={`text-[11px] font-bold uppercase px-3 py-2 border border-white transition-colors ${
            selectedCategory === null
              ? "bg-white text-black"
              : "bg-black text-white hover:bg-neutral-900"
          }`}
        >
          ALL
        </button>

        {/* Categories with click dropdowns */}
        {categories.map((category) => (
          <div key={category.id} className="relative">
            <button
              onClick={() => handleCategoryClick(category.id)}
              className={`text-[11px] font-bold uppercase px-3 py-2 border border-white transition-colors ${
                selectedCategory === category.id
                  ? "bg-white text-black"
                  : "bg-black text-white hover:bg-neutral-900"
              }`}
            >
              {category.name} {openCategory === category.id ? "▼" : "▶"}
            </button>

            {/* Dropdown */}
            {openCategory === category.id && (
              <div className="absolute left-0 top-full mt-0 bg-black border border-white border-t-0 z-50 min-w-max">
                {category.subcategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => handleSubcategoryClick(category.id, sub.id)}
                    className={`block w-full text-left px-4 py-2 text-[10px] font-bold uppercase transition-colors border-b border-gray-700 last:border-b-0 ${
                      selectedSubcategory === sub.id && selectedCategory === category.id
                        ? "bg-white text-black"
                        : "bg-black text-white hover:bg-neutral-900"
                    }`}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
