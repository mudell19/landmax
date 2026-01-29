import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Rocket, DollarSign, Headphones, Palette, Search, Smartphone } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";

const benefits = [
  {
    icon: DollarSign,
    title: "Risco Zero",
    description: "Você só paga quando receber o site.",
  },
  {
    icon: Rocket,
    title: "Entrega em 24 Horas",
    description: "Velocidade incomparável no mercado.",
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
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const lastCardRef = useRef<HTMLDivElement>(null);
  const isLastCardVisibleRef = useRef(false);
  const [snapEnabled, setSnapEnabled] = useState(false);

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

  // Scroll-position based snap control
  useEffect(() => {
    const section = sectionRef.current;
    const lastCard = lastCardRef.current;
    if (!section || !lastCard) return;

    // Observer for section visibility - only enable snap when section is in view
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio < 0.05) {
            // Section is out of view - disable snap completely
            setSnapEnabled(false);
            isLastCardVisibleRef.current = false;
          }
        });
      },
      { threshold: [0.05] }
    );

    // Observer for last card - disable snap when reaching the bottom
    const lastCardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isLastCardVisibleRef.current = entry.isIntersecting && entry.intersectionRatio > 0.5;
          if (isLastCardVisibleRef.current) {
            setSnapEnabled(false);
          }
        });
      },
      { threshold: [0.5] }
    );

    // Scroll handler for position-based snap control
    const handleScroll = () => {
      if (!section) return;
      
      const sectionRect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how much we've scrolled into the section
      // When section top is at viewport top, scrollIntoSection = 0
      // As we scroll down, scrollIntoSection increases
      const scrollIntoSection = -sectionRect.top;
      
      // Release zone at top (first 5px of scroll into section)
      // This allows smooth exit upward to Hero while activating snap almost immediately
      if (scrollIntoSection < 5) {
        setSnapEnabled(false);
        return;
      }
      
      // If last card is visible, keep snap disabled (handled by observer)
      if (isLastCardVisibleRef.current) {
        return;
      }
      
      // Activation zone - enable snap when scrolled past the release threshold
      // and we're still within the section
      if (scrollIntoSection >= 5 && sectionRect.bottom > viewportHeight) {
        setSnapEnabled(true);
      }
    };

    sectionObserver.observe(section);
    lastCardObserver.observe(lastCard);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      sectionObserver.disconnect();
      lastCardObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Apply snap class to html element based on state
  useEffect(() => {
    if (snapEnabled) {
      document.documentElement.classList.add('snap-benefits-active');
    } else {
      document.documentElement.classList.remove('snap-benefits-active');
    }
    
    return () => {
      document.documentElement.classList.remove('snap-benefits-active');
    };
  }, [snapEnabled]);

  return (
    <section id="benefits-section" ref={sectionRef} className="relative bg-black">
      {/* Sticky "stage" - stays fixed while cards scroll behind it */}
      <div className="sticky top-0 h-screen overflow-hidden pointer-events-none z-10">
        {/* Starry background */}
        <div className="absolute inset-0">
          {stars.map((star) => (
            <Star key={star.id} style={star.style} />
          ))}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, hsl(270 80% 60% / 0.3) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Fixed header */}
        <div className="absolute top-0 left-0 right-0 pt-12 pb-12 text-center">
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-black/80 to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
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

        {/* Fixed WhatsApp button - needs pointer-events */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-auto">
          <WhatsAppButton />
        </div>
      </div>

      {/* Cards scroll with page - snap is controlled via html.snap-benefits-active */}
      <div ref={cardsContainerRef} className="relative z-0">
        {benefits.map((benefit, index) => (
          <div
            key={benefit.title}
            ref={index === benefits.length - 1 ? lastCardRef : undefined}
            className={`min-h-screen h-[100dvh] w-full flex flex-col justify-center items-center px-6 snap-center snap-always ${index === 0 ? 'scroll-mt-12' : ''}`}
            style={{ marginTop: index === 0 ? '-100dvh' : '0' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-2xl mx-auto text-center pt-32 pb-20"
            >
              {/* Glowing Icon */}
              <div
                className="w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 rounded-2xl xs:rounded-3xl flex items-center justify-center mx-auto mb-6 xs:mb-8"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0.1) 100%)",
                  boxShadow:
                    "0 0 40px rgba(139, 92, 246, 0.5), 0 0 80px rgba(139, 92, 246, 0.3), 0 0 120px rgba(139, 92, 246, 0.1)",
                  border: "1px solid rgba(139, 92, 246, 0.4)",
                }}
              >
                <benefit.icon
                  className="h-10 w-10 xs:h-12 xs:w-12 sm:h-14 sm:w-14"
                  style={{
                    color: "#a78bfa",
                    filter: "drop-shadow(0 0 15px rgba(167, 139, 250, 0.9))",
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
    </section>
  );
};

export default Benefits;
