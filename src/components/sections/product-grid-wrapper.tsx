import { Suspense } from "react";
import ProductGrid from "./product-grid";

export default function ProductGridWrapper() {
  return (
    <Suspense fallback={<div className="bg-black text-white p-8">Loading products...</div>}>
      <ProductGrid />
    </Suspense>
  );
}
