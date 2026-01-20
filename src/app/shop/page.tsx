import Navbar from "@/components/sections/navbar";
import HeaderLogo from "@/components/sections/header-logo";
import ProductGrid from "@/components/sections/product-grid";
import BackgroundCanvas from "@/components/sections/background-canvas";

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-black">
      <BackgroundCanvas />
      <Navbar />
      <div className="pt-14">
        <ProductGrid />
      </div>
    </main>
  );
}
