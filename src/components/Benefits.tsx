import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
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
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isLastCardActiveRef = useRef(false);
  const isFirstCardActiveRef = useRef(false);
  const isTouchDeviceRef = useRef(false);
  const isInsideSectionRef = useRef(false);
  
  // Scroll-end magnetic snap refs (touch only)
  const lastScrollYRef = useRef(0);
  const lastDirectionRef = useRef<'up' | 'down'>('down');
  const scrollEndTimerRef = useRef<number | null>(null);
  const isSnappingRef = useRef(false);
  const enteredAtRef = useRef(0);

  useEffect(() => {
    // Detect touch device
    isTouchDeviceRef.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
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

  // Toggle scroll-snap on html when Benefits section is in view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Observer for the section - enables snap when entering (only for non-touch)
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0.1) {
            isInsideSectionRef.current = true;
            // Initialize scroll position when entering
            lastScrollYRef.current = window.scrollY;
            enteredAtRef.current = Date.now();
            // Only enable native snap for non-touch devices
            if (!isTouchDeviceRef.current) {
              document.documentElement.classList.add('snap-benefits-active');
            }
          } else if (entry.intersectionRatio < 0.05) {
            isInsideSectionRef.current = false;
            document.documentElement.classList.remove('snap-benefits-active');
            isLastCardActiveRef.current = false;
            isFirstCardActiveRef.current = false;
            // Cancel any pending snap when leaving section
            if (scrollEndTimerRef.current) {
              clearTimeout(scrollEndTimerRef.current);
              scrollEndTimerRef.current = null;
            }
            isSnappingRef.current = false;
          }
        });
      },
      { threshold: [0.05, 0.1, 0.5] }
    );

    // Observer for the last card - tracks when it's active
    const lastCardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isLastCardActiveRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0 }
    );

    // Observer for the first card - tracks when it's active
    const firstCardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isFirstCardActiveRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0 }
    );

    // Desktop: Release snap when user tries to scroll out of bounds
    const handleWheel = (e: WheelEvent) => {
      if (isLastCardActiveRef.current && e.deltaY > 0) {
        document.documentElement.classList.remove('snap-benefits-active');
      }
      if (isFirstCardActiveRef.current && e.deltaY < 0) {
        document.documentElement.classList.remove('snap-benefits-active');
      }
    };

    // Touch: Magnetic snap via scroll-end detection
    const snapToCard = (direction: 'up' | 'down') => {
      if (isSnappingRef.current || !section) return;
      
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      // Robust bounds check - only snap if truly inside the section
      const activeTop = sectionTop - viewportHeight * 0.5;
      const activeBottom = sectionBottom - viewportHeight * 0.5;
      
      if (scrollY < activeTop || scrollY > activeBottom) {
        // Outside the active zone - don't snap
        return;
      }
      
      // Find current card (most visible) and calculate visibility
      let currentCard = -1;
      let maxVisibility = 0;
      
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const cardTop = card.offsetTop + sectionTop;
        const cardBottom = cardTop + viewportHeight;
        const visibleTop = Math.max(scrollY, cardTop - viewportHeight);
        const visibleBottom = Math.min(scrollY + viewportHeight, cardBottom);
        const visibility = Math.max(0, visibleBottom - visibleTop);
        
        if (visibility > maxVisibility) {
          maxVisibility = visibility;
          currentCard = index;
        }
      });
      
      // If no card is sufficiently visible, abort snap (prevents teleport bug)
      if (currentCard === -1 || maxVisibility < viewportHeight * 0.15) {
        return;
      }
      
      // Determine target based on direction
      let targetIndex = currentCard;
      if (direction === 'down' && currentCard < benefits.length - 1) {
        targetIndex = currentCard + 1;
      } else if (direction === 'up' && currentCard > 0) {
        targetIndex = currentCard - 1;
      }
      
      // Check boundaries for exit - don't trap user at edges
      if (isFirstCardActiveRef.current && direction === 'up') return;
      if (isLastCardActiveRef.current && direction === 'down') return;
      
      const targetCard = cardRefs.current[targetIndex];
      if (!targetCard) return;
      
      const targetY = targetCard.offsetTop + sectionTop - viewportHeight;
      
      // Skip if already very close (prevents jitter)
      if (Math.abs(scrollY - targetY) < 15) return;
      
      isSnappingRef.current = true;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
      
      // Reset snapping flag after animation
      setTimeout(() => {
        isSnappingRef.current = false;
      }, 350);
    };

    // Touch: Scroll listener for magnetic snap
    const handleScroll = () => {
      if (!isTouchDeviceRef.current || !isInsideSectionRef.current || isSnappingRef.current) return;
      
      // Warmup period - don't snap immediately after entering section
      if (Date.now() - enteredAtRef.current < 200) {
        lastScrollYRef.current = window.scrollY;
        return;
      }
      
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYRef.current;
      
      // Update direction if significant movement
      if (Math.abs(delta) > 8) {
        lastDirectionRef.current = delta > 0 ? 'down' : 'up';
      }
      
      lastScrollYRef.current = currentScrollY;
      
      // Debounce: snap when scrolling stops (faster = more magnetic)
      if (scrollEndTimerRef.current) {
        clearTimeout(scrollEndTimerRef.current);
      }
      
      scrollEndTimerRef.current = window.setTimeout(() => {
        snapToCard(lastDirectionRef.current);
      }, 80);
    };

    sectionObserver.observe(section);
    
    // Observe first and last cards
    const firstCard = cardRefs.current[0];
    const lastCard = cardRefs.current[benefits.length - 1];
    if (firstCard) firstCardObserver.observe(firstCard);
    if (lastCard) lastCardObserver.observe(lastCard);
    
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      sectionObserver.disconnect();
      lastCardObserver.disconnect();
      firstCardObserver.disconnect();
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      if (scrollEndTimerRef.current) {
        clearTimeout(scrollEndTimerRef.current);
      }
      document.documentElement.classList.remove('snap-benefits-active');
    };
  }, []);

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

      {/* Cards in normal document flow - scroll with the page */}
      <div className="relative z-0">
        {benefits.map((benefit, index) => (
          <div
            key={benefit.title}
            ref={(el) => { cardRefs.current[index] = el; }}
            className="h-screen w-full flex flex-col justify-center items-center px-6 snap-start"
            style={{ marginTop: index === 0 ? '-100vh' : '0' }}
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
