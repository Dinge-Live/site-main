import Navbar from "@/components/sections/navbar";
import ProductGrid from "@/components/sections/product-grid";
import BackgroundCanvas from "@/components/sections/background-canvas";

export default function Home() {
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
