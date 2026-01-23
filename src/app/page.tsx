import Navbar from "@/components/sections/navbar";
import ProductGridWrapper from "@/components/sections/product-grid-wrapper";
import BackgroundCanvas from "@/components/sections/background-canvas";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <BackgroundCanvas />
      <Navbar />
      <div className="pt-14">
        <ProductGridWrapper />
      </div>
    </main>
  );
}
