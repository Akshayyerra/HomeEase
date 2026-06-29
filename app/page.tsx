import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import TopPros from "@/components/TopPros";
import Stats from "@/components/Stats";
import Reviews from "@/components/Reviews";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
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