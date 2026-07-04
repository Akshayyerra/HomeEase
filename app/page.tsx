import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import TopPros from "@/components/TopPros";
import Stats from "@/components/Stats";
import Reviews from "@/components/Reviews";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import PayButton from "@/components/PayButton";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <div className="flex justify-center py-8">
      <PayButton />
</div>
      <Services />
      <HowItWorks />
      <Stats />
      <TopPros />
      <Reviews />
      <CTA />
      <Footer />
    </main>
  );
}