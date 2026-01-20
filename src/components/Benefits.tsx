import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import { Rocket, DollarSign, Headphones, Palette, Search, Smartphone, ChevronDown } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";

const benefits = [
  {
    icon: DollarSign,
    title: "Pagamento Após Entrega",
    description: "Você só paga quando receber o site. Risco zero para você.",
    iconAnimation: "coin",
  },
  {
    icon: Rocket,
    title: "Entrega em 2 Dias",
    description: "Seu site pronto em até 2 dias úteis. Velocidade incomparável no mercado.",
    iconAnimation: "rocket",
  },
  {
    icon: Headphones,
    title: "Suporte Dedicado",
    description: "30 dias de suporte gratuito para ajustes e dúvidas após a entrega.",
    iconAnimation: "pulse",
  },
  {
    icon: Palette,
    title: "Design Exclusivo",
    description: "Cada projeto é único, criado especialmente para o seu negócio.",
    iconAnimation: "rotate",
  },
  {
    icon: Search,
    title: "Otimizado para SEO",
    description: "Estrutura otimizada para aparecer nas buscas do Google.",
    iconAnimation: "scan",
  },
  {
    icon: Smartphone,
    title: "100% Responsivo",
    description: "Perfeito em qualquer dispositivo: celular, tablet ou desktop.",
    iconAnimation: "morph",
  }
];

// Orbital Particle component with elliptical movement
const OrbitalParticle = ({ 
  layer, 
  index, 
  total 
}: { 
  layer: number; 
  index: number; 
  total: number;
}) => {
  const angle = (index / total) * 360;
  const radiusX = 300 + layer * 150;
  const radiusY = 200 + layer * 100;
  const duration = 30 + layer * 15;
  const size = 1 + layer * 0.5;
  const opacity = 0.2 + layer * 0.15;
  
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: '50%',
        top: '50%',
        background: `radial-gradient(circle, rgba(167, 139, 250, ${opacity}) 0%, rgba(139, 92, 246, ${opacity * 0.5}) 100%)`,
        boxShadow: `0 0 ${size * 3}px rgba(139, 92, 246, ${opacity})`,
      }}
      animate={{
        x: [
          Math.cos((angle * Math.PI) / 180) * radiusX,
          Math.cos(((angle + 120) * Math.PI) / 180) * radiusX,
          Math.cos(((angle + 240) * Math.PI) / 180) * radiusX,
          Math.cos((angle * Math.PI) / 180) * radiusX,
        ],
        y: [
          Math.sin((angle * Math.PI) / 180) * radiusY,
          Math.sin(((angle + 120) * Math.PI) / 180) * radiusY,
          Math.sin(((angle + 240) * Math.PI) / 180) * radiusY,
          Math.sin((angle * Math.PI) / 180) * radiusY,
        ],
        opacity: [opacity, opacity * 1.5, opacity, opacity * 1.5, opacity],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

// Nebula background with animated gradient
const NebulaBackground = ({ activeIndex }: { activeIndex: number }) => {
  const hueShift = activeIndex * 10;
  
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      animate={{
        background: [
          `radial-gradient(ellipse at 30% 20%, hsla(${265 + hueShift}, 70%, 30%, 0.15) 0%, transparent 50%),
           radial-gradient(ellipse at 70% 80%, hsla(${280 + hueShift}, 80%, 25%, 0.12) 0%, transparent 45%),
           radial-gradient(ellipse at 50% 50%, hsla(${300 + hueShift}, 60%, 20%, 0.08) 0%, transparent 60%)`,
        ],
      }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    />
  );
};

// Aurora effect
const Aurora = () => (
  <>
    <motion.div
      className="absolute top-0 left-0 right-0 h-40 opacity-30"
      style={{
        background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.2) 0%, transparent 100%)',
        filter: 'blur(40px)',
      }}
      animate={{
        opacity: [0.2, 0.35, 0.2],
        scaleX: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="absolute bottom-0 left-0 right-0 h-40 opacity-20"
      style={{
        background: 'linear-gradient(0deg, rgba(167, 139, 250, 0.15) 0%, transparent 100%)',
        filter: 'blur(40px)',
      }}
      animate={{
        opacity: [0.15, 0.25, 0.15],
        scaleX: [1.1, 1, 1.1],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </>
);

// Progress Ring Component
const ProgressRing = ({ 
  current, 
  total, 
  onDotClick 
}: { 
  current: number; 
  total: number;
  onDotClick: (index: number) => void;
}) => {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const progress = ((current + 1) / total) * circumference;
  const offset = circumference - progress;

  return (
    <div className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-center gap-3">
      {/* Main ring with number */}
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16 -rotate-90">
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(265, 89%, 62%)" />
              <stop offset="50%" stopColor="hsl(280, 100%, 70%)" />
              <stop offset="100%" stopColor="hsl(300, 90%, 65%)" />
            </linearGradient>
          </defs>
          {/* Background circle */}
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            stroke="rgba(139, 92, 246, 0.15)"
            strokeWidth="3"
          />
          {/* Progress circle */}
          <motion.circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </svg>
        {/* Center number */}
        <AnimatePresence mode="wait">
          <motion.span
            key={current}
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white"
          >
            {current + 1}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div className="flex flex-col gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <motion.button
            key={i}
            onClick={() => onDotClick(i)}
            className="w-2 h-2 rounded-full cursor-pointer transition-all"
            animate={{
              scale: i === current ? 1.3 : 1,
              backgroundColor: i === current 
                ? "hsl(265, 89%, 62%)" 
                : i < current 
                  ? "rgba(139, 92, 246, 0.5)" 
                  : "rgba(139, 92, 246, 0.2)",
            }}
            whileHover={{ scale: 1.5 }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </div>
    </div>
  );
};

// Animated Icon wrapper with unique animations per type
const AnimatedIcon = ({ 
  Icon, 
  animationType, 
  isActive 
}: { 
  Icon: React.ElementType; 
  animationType: string;
  isActive: boolean;
}) => {
  const iconVariants = {
    coin: {
      animate: {
        rotateY: [0, 180, 360],
        scale: [1, 1.1, 1],
      },
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const }
    },
    rocket: {
      animate: {
        y: [0, -8, 0],
        rotate: [0, 3, -3, 0],
      },
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }
    },
    pulse: {
      animate: {
        scale: [1, 1.15, 1],
      },
      transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" as const }
    },
    rotate: {
      animate: {
        rotate: [0, 360],
      },
      transition: { duration: 8, repeat: Infinity, ease: "linear" as const }
    },
    scan: {
      animate: {
        x: [-2, 2, -2],
        scale: [1, 1.05, 1],
      },
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }
    },
    morph: {
      animate: {
        rotateZ: [0, 5, -5, 0],
        scale: [1, 1.08, 1],
      },
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const }
    },
  };

  const variant = iconVariants[animationType as keyof typeof iconVariants] || iconVariants.pulse;

  return (
    <motion.div
      className="relative"
      animate={isActive ? variant.animate : {}}
      transition={variant.transition}
    >
      <Icon
        className="h-10 w-10 xs:h-12 xs:w-12 sm:h-14 sm:w-14"
        style={{
          color: "#a78bfa",
          filter: "drop-shadow(0 0 15px rgba(167, 139, 250, 0.9))",
        }}
      />
      {/* Rocket trail effect */}
      {animationType === "rocket" && isActive && (
        <motion.div
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3 h-6 rounded-full"
          style={{
            background: "linear-gradient(to top, rgba(251, 146, 60, 0.8), transparent)",
            filter: "blur(2px)",
          }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
            scaleY: [0.8, 1.2, 0.8],
          }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

// Typewriter text effect
const TypewriterText = ({ text, isActive }: { text: string; isActive: boolean }) => {
  return (
    <span className="inline-block">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ 
            delay: i * 0.025,
            duration: 0.3,
            ease: "easeOut"
          }}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

// Staggered description animation
const StaggeredDescription = ({ text, isActive }: { text: string; isActive: boolean }) => {
  const words = text.split(' ');
  
  return (
    <span className="inline-block">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
          animate={isActive ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 15, filter: "blur(4px)" }}
          transition={{ 
            delay: 0.4 + i * 0.04,
            duration: 0.4,
            ease: "easeOut"
          }}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

// Scroll indicator for first card
const ScrollIndicator = ({ visible }: { visible: boolean }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: visible ? 1 : 0 }}
    transition={{ duration: 0.5 }}
    className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
  >
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <ChevronDown className="w-6 h-6 text-purple-400/60" />
    </motion.div>
    <span className="text-xs text-gray-500 tracking-wider uppercase">Role para explorar</span>
  </motion.div>
);

const Benefits = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const lastCardRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isLastCardActiveRef = useRef(false);
  const isFirstCardActiveRef = useRef(false);
  const lastTouchYRef = useRef(0);

  // Generate orbital particles for different layers
  const particleLayers = [
    { count: 8, layer: 0 },
    { count: 6, layer: 1 },
    { count: 4, layer: 2 },
  ];

  // Handle dot click navigation
  const handleDotClick = useCallback((index: number) => {
    const card = cardRefs.current[index];
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  // Track which card is active
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              setActiveIndex(index);
              if (index > 0) setHasScrolled(true);
            }
          });
        },
        { threshold: [0.5] }
      );
      
      observer.observe(card);
      observers.push(observer);
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  // Toggle scroll-snap on html when Benefits section is in view
  useEffect(() => {
    const section = sectionRef.current;
    const lastCard = lastCardRef.current;
    const firstCard = firstCardRef.current;
    if (!section || !lastCard || !firstCard) return;

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0.1) {
            document.documentElement.classList.add('snap-benefits-active');
          } else if (entry.intersectionRatio < 0.05) {
            document.documentElement.classList.remove('snap-benefits-active');
            isLastCardActiveRef.current = false;
            isFirstCardActiveRef.current = false;
          }
        });
      },
      { threshold: [0.05, 0.1, 0.5] }
    );

    const lastCardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            isLastCardActiveRef.current = true;
          } else {
            isLastCardActiveRef.current = false;
          }
        });
      },
      { threshold: [0.1, 0.2, 0.3, 0.5] }
    );

    const firstCardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isFirstCardActiveRef.current = entry.isIntersecting && entry.intersectionRatio > 0.3;
        });
      },
      { threshold: [0.1, 0.2, 0.3, 0.5] }
    );

    const handleWheel = (e: WheelEvent) => {
      if (isLastCardActiveRef.current && e.deltaY > 0) {
        document.documentElement.classList.remove('snap-benefits-active');
      }
      if (isFirstCardActiveRef.current && e.deltaY < 0) {
        document.documentElement.classList.remove('snap-benefits-active');
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      lastTouchYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const endY = e.changedTouches[0].clientY;
      const deltaY = lastTouchYRef.current - endY;
      const isScrollingDown = deltaY > 20;
      const isScrollingUp = deltaY < -20;
      
      if (isLastCardActiveRef.current && isScrollingDown) {
        document.documentElement.classList.remove('snap-benefits-active');
      }
      if (isFirstCardActiveRef.current && isScrollingUp) {
        document.documentElement.classList.remove('snap-benefits-active');
      }
    };

    sectionObserver.observe(section);
    lastCardObserver.observe(lastCard);
    firstCardObserver.observe(firstCard);
    
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      sectionObserver.disconnect();
      lastCardObserver.disconnect();
      firstCardObserver.disconnect();
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      document.documentElement.classList.remove('snap-benefits-active');
    };
  }, []);

  return (
    <section id="benefits-section" ref={sectionRef} className="relative bg-black">
      {/* Sticky "stage" - stays fixed while cards scroll behind it */}
      <div className="sticky top-0 h-screen overflow-hidden pointer-events-none z-10">
        {/* Dynamic Nebula Background */}
        <NebulaBackground activeIndex={activeIndex} />
        
        {/* Aurora Effects */}
        <Aurora />

        {/* Orbital Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {particleLayers.map(({ count, layer }) =>
            Array.from({ length: count }).map((_, i) => (
              <OrbitalParticle key={`${layer}-${i}`} layer={layer} index={i} total={count} />
            ))
          )}
        </div>

        {/* Central glow that pulses with active index */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-25"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: "radial-gradient(circle, hsl(270 80% 60% / 0.4) 0%, transparent 60%)",
            filter: "blur(40px)",
          }}
        />

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

        {/* Fixed WhatsApp button */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-auto">
          <WhatsAppButton />
        </div>

        {/* Scroll indicator - only on first card */}
        <ScrollIndicator visible={!hasScrolled && activeIndex === 0} />
      </div>

      {/* Progress Ring - fixed on right side */}
      <ProgressRing 
        current={activeIndex} 
        total={benefits.length} 
        onDotClick={handleDotClick}
      />

      {/* Cards in normal document flow - scroll with the page */}
      <div className="relative z-0">
        {benefits.map((benefit, index) => {
          const isActive = activeIndex === index;
          
          return (
            <div
              key={benefit.title}
              ref={(el) => {
                cardRefs.current[index] = el;
                if (index === 0) firstCardRef.current = el;
                if (index === benefits.length - 1) lastCardRef.current = el;
              }}
              className="h-screen w-full flex flex-col justify-center items-center px-6 snap-start"
              style={{ marginTop: index === 0 ? '-100vh' : '0' }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ 
                  duration: 0.7,
                  type: "spring",
                  damping: 20,
                  stiffness: 100
                }}
                className="w-full max-w-2xl mx-auto text-center pt-32 pb-20"
              >
                {/* 3D Glowing Icon Container */}
                <motion.div
                  className="w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 rounded-2xl xs:rounded-3xl flex items-center justify-center mx-auto mb-6 xs:mb-8 relative"
                  animate={{
                    boxShadow: isActive 
                      ? [
                          "0 0 30px rgba(139, 92, 246, 0.4), 0 0 60px rgba(139, 92, 246, 0.2)",
                          "0 0 50px rgba(139, 92, 246, 0.6), 0 0 100px rgba(139, 92, 246, 0.3)",
                          "0 0 30px rgba(139, 92, 246, 0.4), 0 0 60px rgba(139, 92, 246, 0.2)",
                        ]
                      : "0 0 30px rgba(139, 92, 246, 0.3), 0 0 60px rgba(139, 92, 246, 0.1)",
                  }}
                  transition={{ duration: 2, repeat: isActive ? Infinity : 0, ease: "easeInOut" as const }}
                  style={{
                    background: "linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(139, 92, 246, 0.08) 100%)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(139, 92, 246, 0.35)",
                  }}
                >
                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl xs:rounded-3xl opacity-0"
                    animate={{
                      opacity: isActive ? [0, 0.5, 0] : 0,
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                      background: "linear-gradient(135deg, rgba(167, 139, 250, 0.3), rgba(139, 92, 246, 0.1))",
                    }}
                  />
                  
                  <AnimatedIcon 
                    Icon={benefit.icon} 
                    animationType={benefit.iconAnimation}
                    isActive={isActive}
                  />
                </motion.div>

                {/* Title with typewriter effect */}
                <h3 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white mb-4 xs:mb-5">
                  <TypewriterText text={benefit.title} isActive={isActive} />
                </h3>

                {/* Description with staggered word animation */}
                <p className="text-base xs:text-lg sm:text-xl text-gray-400 leading-relaxed max-w-md mx-auto">
                  <StaggeredDescription text={benefit.description} isActive={isActive} />
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Transition blur overlay at edges */}
      <div className="fixed top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none z-20" />
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default Benefits;
