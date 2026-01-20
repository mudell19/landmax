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
  
  // Touch tracking
  const touchStartY = useRef(0);
  
  // Animation state
  const isAnimating = useRef(false);
  
  // Wheel gesture tracking (1 card per gesture)
  const wheelAccumRef = useRef(0);
  const wheelGestureActiveRef = useRef(false);
  const wheelEndTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Lock gate (prevent immediate re-lock after exit)
  const lockEnabledRef = useRef(true);
  const relockCooldownTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Scrollbar width for preventing horizontal jitter
  const scrollbarWidthRef = useRef(0);

  const WHEEL_THRESHOLD = 50; // Accumulated deltaY needed to trigger navigation
  const WHEEL_IDLE_TIMEOUT = 150; // ms of no wheel events = gesture ended
  const RELOCK_COOLDOWN = 600; // ms before allowing re-lock after exit

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
    
    // Calculate scrollbar width once
    scrollbarWidthRef.current = window.innerWidth - document.documentElement.clientWidth;
  }, []);

  // Centralized lock function
  const lock = useCallback(() => {
    if (isLocked) return;
    
    setIsLocked(true);
    
    // Prevent horizontal jitter by compensating for scrollbar
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    
    // Reset wheel state to prevent inherited momentum
    wheelAccumRef.current = 0;
    wheelGestureActiveRef.current = false;
    if (wheelEndTimerRef.current) {
      clearTimeout(wheelEndTimerRef.current);
      wheelEndTimerRef.current = null;
    }
    
    // Position at current card instantly
    if (scrollContainerRef.current) {
      const targetScroll = currentIndex * scrollContainerRef.current.clientHeight;
      scrollContainerRef.current.scrollTo({
        top: targetScroll,
        behavior: 'auto'
      });
    }
  }, [isLocked, currentIndex]);

  // Centralized unlock function with nudge
  const unlockAndNudge = useCallback((direction: 'up' | 'down') => {
    setIsLocked(false);
    
    // Restore body styles
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    
    // Disable re-lock temporarily
    lockEnabledRef.current = false;
    if (relockCooldownTimerRef.current) {
      clearTimeout(relockCooldownTimerRef.current);
    }
    relockCooldownTimerRef.current = setTimeout(() => {
      lockEnabledRef.current = true;
    }, RELOCK_COOLDOWN);
    
    // Small nudge to continue natural scroll (no teleporting)
    requestAnimationFrame(() => {
      window.scrollBy({
        top: direction === 'down' ? 60 : -60,
        behavior: 'smooth'
      });
    });
  }, []);

  // Scroll to specific card - instant positioning
  const scrollToCard = useCallback((index: number) => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const targetScroll = index * container.clientHeight;
    
    container.scrollTo({
      top: targetScroll,
      behavior: 'auto'
    });
  }, []);

  // Animate to specific card
  const animateToCard = useCallback((index: number) => {
    if (isAnimating.current || !scrollContainerRef.current) return;
    
    isAnimating.current = true;
    const container = scrollContainerRef.current;
    const targetScroll = index * container.clientHeight;
    
    container.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
    
    setTimeout(() => {
      isAnimating.current = false;
    }, 400);
  }, []);

  // Handle navigation between cards
  const navigate = useCallback((direction: 'up' | 'down') => {
    if (isAnimating.current) return;

    if (direction === 'down') {
      if (currentIndex < benefits.length - 1) {
        const newIndex = currentIndex + 1;
        setCurrentIndex(newIndex);
        animateToCard(newIndex);
      } else {
        // At last card, release smoothly
        unlockAndNudge('down');
      }
    } else {
      if (currentIndex > 0) {
        const newIndex = currentIndex - 1;
        setCurrentIndex(newIndex);
        animateToCard(newIndex);
      } else {
        // At first card, release smoothly
        unlockAndNudge('up');
      }
    }
  }, [currentIndex, animateToCard, unlockAndNudge]);

  // IntersectionObserver to detect when section is in view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Lock when 95% visible AND lock is enabled (not in cooldown)
        if (entry.isIntersecting && entry.intersectionRatio >= 0.95) {
          if (!isLocked && lockEnabledRef.current) {
            lock();
          }
        }
        
        // Re-enable lock when section is mostly out of view
        if (!entry.isIntersecting || entry.intersectionRatio < 0.2) {
          // Allow re-lock next time we enter
          if (!lockEnabledRef.current && relockCooldownTimerRef.current === null) {
            lockEnabledRef.current = true;
          }
        }
      },
      { threshold: [0.2, 0.95] }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [lock, isLocked]);

  // Handle wheel events when locked - 1 card per gesture
  useEffect(() => {
    if (!isLocked) return;

    const container = scrollContainerRef.current;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Accumulate delta
      wheelAccumRef.current += e.deltaY;
      
      // Clear previous idle timer
      if (wheelEndTimerRef.current) {
        clearTimeout(wheelEndTimerRef.current);
      }
      
      // Set new idle timer (gesture end detection)
      wheelEndTimerRef.current = setTimeout(() => {
        wheelAccumRef.current = 0;
        wheelGestureActiveRef.current = false;
      }, WHEEL_IDLE_TIMEOUT);
      
      // If gesture already triggered navigation, ignore until gesture ends
      if (wheelGestureActiveRef.current) return;
      
      // Check if accumulated enough to trigger navigation
      if (Math.abs(wheelAccumRef.current) >= WHEEL_THRESHOLD) {
        wheelGestureActiveRef.current = true;
        navigate(wheelAccumRef.current > 0 ? 'down' : 'up');
        wheelAccumRef.current = 0;
      }
    };

    // Block direct scroll on the container element
    const preventContainerScroll = (e: Event) => {
      e.preventDefault();
    };

    window.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    container?.addEventListener('wheel', preventContainerScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel, { capture: true });
      container?.removeEventListener('wheel', preventContainerScroll);
    };
  }, [isLocked, navigate]);

  // Handle touch events for mobile
  useEffect(() => {
    if (!isLocked) return;

    const container = scrollContainerRef.current;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      // Require meaningful swipe
      if (Math.abs(deltaY) < 50) return;
      
      navigate(deltaY > 0 ? 'down' : 'up');
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true, capture: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true, capture: true });
    
    // Block direct scroll on container
    container?.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart, { capture: true });
      window.removeEventListener('touchmove', handleTouchMove, { capture: true });
      window.removeEventListener('touchend', handleTouchEnd, { capture: true });
      container?.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isLocked, navigate]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      if (wheelEndTimerRef.current) clearTimeout(wheelEndTimerRef.current);
      if (relockCooldownTimerRef.current) clearTimeout(relockCooldownTimerRef.current);
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
          className="absolute inset-0 z-10 w-full h-full overflow-y-auto no-scrollbar"
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
                className="w-full max-w-2xl mx-auto text-center pt-48 pb-20"
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
