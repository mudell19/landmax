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
      className="relative w-full h-[100dvh] bg-black overflow-hidden"
    >
      {/* Starfield Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {stars.map((star) => (
          <Star key={star.id} style={star.style} />
        ))}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(270 80% 60% / 0.3) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* HEADER FIXO */}
      <div className="absolute top-0 left-0 w-full z-30 pt-12 sm:pt-16 pb-8 sm:pb-12 text-center bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-white mb-3 xs:mb-4 sm:mb-5">
            Por que escolher a<br />
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">
              nossa equipe?
            </span>
          </h2>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Simplificamos todo o processo para que você<br className="hidden md:block" />
            tenha um site profissional sem dor de cabeça.
          </p>
        </motion.div>
      </div>

      {/* SCROLL CONTAINER - Snap Rigoroso */}
      <div className="absolute inset-0 w-full h-full overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar">
        {benefits.map((benefit) => (
          <div 
            key={benefit.title}
            className="h-[100dvh] w-full snap-start snap-always flex flex-col justify-center items-center px-4 bg-black"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-lg mx-auto"
            >
              {/* Glowing Icon */}
              <div 
                className="w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 rounded-2xl xs:rounded-3xl flex items-center justify-center mx-auto mb-6 xs:mb-8"
                style={{
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0.1) 100%)',
                  boxShadow: '0 0 40px rgba(139, 92, 246, 0.5), 0 0 80px rgba(139, 92, 246, 0.3), 0 0 120px rgba(139, 92, 246, 0.1)',
                  border: '1px solid rgba(139, 92, 246, 0.4)',
                }}
              >
                <benefit.icon 
                  className="h-10 w-10 xs:h-12 xs:w-12 sm:h-14 sm:w-14"
                  style={{ 
                    color: '#a78bfa',
                    filter: 'drop-shadow(0 0 15px rgba(167, 139, 250, 0.9))',
                  }}
                />
              </div>

              {/* Title */}
              <h3 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white mb-4 xs:mb-5">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-base xs:text-lg sm:text-xl text-gray-400 leading-relaxed max-w-md mx-auto">
                {benefit.description}
              </p>
            </motion.div>
          </div>
        ))}
      </div>

      {/* GRADIENT OVERLAY - Proteção do Botão */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none z-40" />

      {/* BOTÃO WHATSAPP Centralizado */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
        <WhatsAppButton />
      </div>
    </section>
  );
};

export default Benefits;
