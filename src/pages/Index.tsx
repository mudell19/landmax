import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Comparison from "@/components/Comparison";
import Process from "@/components/Process";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Guarantee from "@/components/Guarantee";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Hero />
        <Benefits />
        <Comparison />
        <Testimonials />
        <Portfolio />
        <Process />
        <Guarantee />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppButton floating />
    </div>
  );
};

export default Index;
