import { motion } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
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
  const [isLocked, setIsLocked] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const isScrolling = useRef(false);

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

  // Scroll to specific card
  const scrollToCard = useCallback((index: number) => {
    if (isScrolling.current || !scrollContainerRef.current) return;
    
    isScrolling.current = true;
    const container = scrollContainerRef.current;
    const targetScroll = index * container.clientHeight;
    
    container.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
    
    setTimeout(() => {
      isScrolling.current = false;
    }, 500);
  }, []);

  // Handle navigation between cards
  const navigate = useCallback((direction: 'up' | 'down') => {
    if (isScrolling.current) return;

    if (direction === 'down') {
      if (currentIndex < benefits.length - 1) {
        const newIndex = currentIndex + 1;
        setCurrentIndex(newIndex);
        scrollToCard(newIndex);
      } else {
        // At last card, release and scroll to next section
        setIsLocked(false);
        document.body.style.overflow = '';
        const nextSection = sectionRef.current?.nextElementSibling as HTMLElement;
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      if (currentIndex > 0) {
        const newIndex = currentIndex - 1;
        setCurrentIndex(newIndex);
        scrollToCard(newIndex);
      } else {
        // At first card, release and scroll to previous section
        setIsLocked(false);
        document.body.style.overflow = '';
        const prevSection = sectionRef.current?.previousElementSibling as HTMLElement;
        if (prevSection) {
          prevSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [currentIndex, scrollToCard]);

  // IntersectionObserver to detect when section is in view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
          setIsLocked(true);
          document.body.style.overflow = 'hidden';
          // Reset to first card when entering from top
          if (currentIndex === 0) {
            scrollToCard(0);
          }
        }
      },
      { threshold: 0.7 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [currentIndex, scrollToCard]);

  // Handle wheel events when locked
  useEffect(() => {
    if (!isLocked) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 30) return; // Ignore small movements
      
      navigate(e.deltaY > 0 ? 'down' : 'up');
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isLocked, navigate]);

  // Handle touch events for mobile
  useEffect(() => {
    if (!isLocked) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) < 50) return; // Ignore small swipes
      
      navigate(deltaY > 0 ? 'down' : 'up');
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isLocked, navigate]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <section ref={sectionRef} id="benefits-section" className="w-full">
      {/* PALCO FIXO: 3 CAMADAS (fundo + UI + conteúdo) */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* CAMADA 1: FUNDO (fixo, nunca se mexe) */}
        <div className="absolute inset-0 z-0 bg-black pointer-events-none">
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

        {/* CAMADA 2: INTERFACE (fixa no palco) */}
        <div className="absolute top-0 left-0 w-full z-20 pt-12 pb-12 text-center pointer-events-none">
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

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
          <WhatsAppButton />
        </div>

        {/* CAMADA 3: CONTEÚDO (única camada que rola) */}
        <div 
          ref={scrollContainerRef}
          className="absolute inset-0 z-10 w-full h-full overflow-hidden no-scrollbar"
        >
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="w-full h-full flex flex-col justify-center items-center snap-center px-6"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg mx-auto text-center pt-48 pb-20"
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
      </div>
    </section>
  );
};

export default Benefits;
