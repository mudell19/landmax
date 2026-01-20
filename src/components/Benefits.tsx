import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Rocket, DollarSign, Headphones, Palette, Search, Smartphone } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";

const benefits = [
  {
    icon: DollarSign,
    title: "Pagamento Após Entrega",
    description: "Você só paga quando receber o site. Risco zero para você.",
  },
  {
    icon: Rocket,
    title: "Entrega em 2 Dias",
    description: "Seu site pronto em até 2 dias úteis. Velocidade incomparável no mercado.",
  },
  {
    icon: Headphones,
    title: "Suporte Dedicado",
    description: "30 dias de suporte gratuito para ajustes e dúvidas após a entrega.",
  },
  {
    icon: Palette,
    title: "Design Exclusivo",
    description: "Cada projeto é único, criado especialmente para o seu negócio.",
  },
  {
    icon: Search,
    title: "Otimizado para SEO",
    description: "Estrutura otimizada para aparecer nas buscas do Google.",
  },
  {
    icon: Smartphone,
    title: "100% Responsivo",
    description: "Perfeito em qualquer dispositivo: celular, tablet ou desktop.",
  }
];

// Star component for the animated background
const Star = ({ style }: { style: React.CSSProperties }) => (
  <motion.div
    className="absolute rounded-full bg-white"
    style={style}
    animate={{
      opacity: [0.2, 1, 0.2],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: Math.random() * 3 + 2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const Benefits = () => {
  const [stars, setStars] = useState<Array<{ id: number; style: React.CSSProperties }>>([]);

  useEffect(() => {
    // Generate random stars
    const generatedStars = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${Math.random() * 2 + 1}px`,
        height: `${Math.random() * 2 + 1}px`,
        animationDelay: `${Math.random() * 5}s`,
      },
    }));
    setStars(generatedStars);
  }, []);

  return (
    <section 
      id="benefits-section"
      className="relative h-screen overflow-hidden" 
      style={{ backgroundColor: '#000000' }}
    >
      {/* Starfield Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {stars.map((star) => (
          <Star key={star.id} style={star.style} />
        ))}
        {/* Subtle purple glow in center */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(270 80% 60% / 0.3) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Header - Absolute positioned */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="absolute top-16 left-0 right-0 text-center z-10 px-4"
      >
        <h2 className="text-white mb-3 xs:mb-4 sm:mb-5">
          Por que escolher a<br />
          <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">
            nossa equipe?
          </span>
        </h2>
        <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          Simplificamos todo o processo para que você<br className="hidden md:block" />
          tenha um site profissional sem dor de cabeça.
        </p>
      </motion.div>

      {/* Scrollable Cards Area - Absolute inset with snap */}
      <div 
        className="absolute inset-0 pt-48 pb-32 overflow-y-auto snap-y snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="max-w-4xl mx-auto">
        </div>
      </div>

      {/* Fixed CTA with Fade Mask - Absolute at bottom, above scroll */}
      <div 
        className="absolute bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black via-black/80 to-transparent pt-16 pb-6 pointer-events-none"
      >
        <div className="pointer-events-auto flex justify-center">
          <WhatsAppButton showResponseTime />
        </div>
      </div>

      {/* Hide scrollbar styles */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Benefits;
