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
    const generatedStars = Array.from({ length: 150 }, (_, i) => ({
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
      className="relative bg-black snap-y snap-mandatory"
    >
      {/* Fixed Starfield Background - Scoped to this section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <Star key={star.id} style={star.style} />
        ))}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(270 80% 60% / 0.3) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Sticky Header - Immediately visible at section start */}
      <div 
        className="sticky top-0 z-20 pt-4 xs:pt-6 sm:pt-8 pb-4 px-4 xs:px-6 sm:px-8"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 70%, transparent 100%)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-white mb-2 xs:mb-3 sm:mb-4">
            Por que escolher a<br />
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">
              nossa equipe?
            </span>
          </h2>
          <p className="text-sm xs:text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Simplificamos todo o processo para que você<br className="hidden md:block" />
            tenha um site profissional sem dor de cabeça.
          </p>
        </motion.div>
      </div>

      {/* Benefits Cards - Snappy scroll with reduced height per card */}
      <div className="relative z-10">
        {benefits.map((benefit, index) => (
          <div 
            key={benefit.title}
            className="h-[60vh] flex items-center justify-center px-4 xs:px-6 sm:px-8 snap-start snap-always"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.4 }}
              className="text-center max-w-lg mx-auto"
            >
              {/* Glowing Icon */}
              <div 
                className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 rounded-2xl xs:rounded-3xl flex items-center justify-center mx-auto mb-4 xs:mb-6 sm:mb-8"
                style={{
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0.1) 100%)',
                  boxShadow: '0 0 40px rgba(139, 92, 246, 0.5), 0 0 80px rgba(139, 92, 246, 0.3), 0 0 120px rgba(139, 92, 246, 0.1)',
                  border: '1px solid rgba(139, 92, 246, 0.4)',
                }}
              >
                <benefit.icon 
                  className="h-8 w-8 xs:h-10 xs:w-10 sm:h-12 sm:w-12"
                  style={{ 
                    color: '#a78bfa',
                    filter: 'drop-shadow(0 0 15px rgba(167, 139, 250, 0.9))',
                  }}
                />
              </div>

              {/* Title */}
              <h3 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 xs:mb-4 sm:mb-5">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed max-w-md mx-auto">
                {benefit.description}
              </p>

              {/* Benefit number indicator */}
              <div className="mt-6 xs:mt-8 sm:mt-10 text-purple-500/50 text-sm font-medium">
                {String(index + 1).padStart(2, '0')} / {String(benefits.length).padStart(2, '0')}
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Fixed CTA at Bottom */}
      <div 
        className="sticky bottom-0 z-30 pb-4 xs:pb-5 sm:pb-6 pt-6 px-4 xs:px-6 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 50%, transparent 100%)',
        }}
      >
        <div className="pointer-events-auto flex justify-center">
          <WhatsAppButton showResponseTime />
        </div>
      </div>
    </section>
  );
};

export default Benefits;
