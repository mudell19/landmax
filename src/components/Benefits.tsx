import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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
      ref={ref} 
      className="relative py-16 xs:py-20 sm:py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Animated Starfield Background */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <Star key={star.id} style={star.style} />
        ))}
        {/* Subtle purple glow in center */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(270 80% 60% / 0.3) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="container-premium relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 xs:mb-14 sm:mb-16 md:mb-20"
        >
          <h2 className="text-white mb-4 xs:mb-5 sm:mb-6">
            Por que escolher a<br />
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">
              nossa equipe?
            </span>
          </h2>
          <p className="text-base xs:text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Simplificamos todo o processo para que você<br className="hidden md:block" />
            tenha um site profissional sem dor de cabeça.
          </p>
        </motion.div>

        {/* Benefits Feed - Vertical Column */}
        <div className="max-w-xl mx-auto space-y-4 xs:space-y-5 sm:space-y-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Glassmorphism Card */}
              <div 
                className="relative p-6 xs:p-7 sm:p-8 rounded-2xl xs:rounded-3xl backdrop-blur-xl border transition-all duration-500 group-hover:scale-[1.02]"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  borderColor: 'rgba(139, 92, 246, 0.3)',
                  boxShadow: '0 0 30px rgba(139, 92, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                }}
              >
                {/* Glowing border effect on hover */}
                <div 
                  className="absolute inset-0 rounded-2xl xs:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, transparent 50%, rgba(139, 92, 246, 0.2) 100%)',
                    boxShadow: '0 0 40px rgba(139, 92, 246, 0.3)',
                  }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Glowing Icon */}
                  <div 
                    className="w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 rounded-xl xs:rounded-2xl flex items-center justify-center mb-4 xs:mb-5 sm:mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0.1) 100%)',
                      boxShadow: '0 0 30px rgba(139, 92, 246, 0.4), 0 0 60px rgba(139, 92, 246, 0.2)',
                      border: '1px solid rgba(139, 92, 246, 0.4)',
                    }}
                  >
                    <benefit.icon 
                      className="h-7 w-7 xs:h-8 xs:w-8 sm:h-10 sm:w-10"
                      style={{ 
                        color: '#a78bfa',
                        filter: 'drop-shadow(0 0 10px rgba(167, 139, 250, 0.8))',
                      }}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-2 xs:mb-3">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm xs:text-base sm:text-lg text-gray-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12 xs:mt-14 sm:mt-16 md:mt-20"
        >
          <WhatsAppButton showResponseTime />
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;
