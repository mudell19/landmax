import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import { Rocket, DollarSign, Headphones, Palette, Search, Smartphone } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";

const benefits = [
  {
    icon: DollarSign,
    title: "Pagamento Após Entrega",
    description: "Você só paga quando receber o site. Risco zero para você.",
    gradient: "from-emerald-500 via-green-400 to-teal-500",
    bgGradient: "radial-gradient(ellipse at 50% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 70%)",
    accentColor: "rgb(16, 185, 129)",
  },
  {
    icon: Rocket,
    title: "Entrega em 2 Dias",
    description: "Seu site pronto em até 2 dias úteis. Velocidade incomparável no mercado.",
    gradient: "from-orange-500 via-amber-400 to-yellow-500",
    bgGradient: "radial-gradient(ellipse at 50% 50%, rgba(249, 115, 22, 0.15) 0%, transparent 70%)",
    accentColor: "rgb(249, 115, 22)",
  },
  {
    icon: Headphones,
    title: "Suporte Dedicado",
    description: "30 dias de suporte gratuito para ajustes e dúvidas após a entrega.",
    gradient: "from-blue-500 via-cyan-400 to-sky-500",
    bgGradient: "radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
    accentColor: "rgb(59, 130, 246)",
  },
  {
    icon: Palette,
    title: "Design Exclusivo",
    description: "Cada projeto é único, criado especialmente para o seu negócio.",
    gradient: "from-fuchsia-500 via-pink-400 to-rose-500",
    bgGradient: "radial-gradient(ellipse at 50% 50%, rgba(217, 70, 239, 0.15) 0%, transparent 70%)",
    accentColor: "rgb(217, 70, 239)",
  },
  {
    icon: Search,
    title: "Otimizado para SEO",
    description: "Estrutura otimizada para aparecer nas buscas do Google.",
    gradient: "from-violet-500 via-purple-400 to-indigo-500",
    bgGradient: "radial-gradient(ellipse at 50% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
    accentColor: "rgb(139, 92, 246)",
  },
  {
    icon: Smartphone,
    title: "100% Responsivo",
    description: "Perfeito em qualquer dispositivo: celular, tablet ou desktop.",
    gradient: "from-cyan-500 via-teal-400 to-emerald-500",
    bgGradient: "radial-gradient(ellipse at 50% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 70%)",
    accentColor: "rgb(6, 182, 212)",
  }
];

// Morphing blob background
const MorphingBlob = ({ color, delay = 0, size = 600 }: { color: string; delay?: number; size?: number }) => (
  <motion.div
    className="absolute rounded-full blur-3xl opacity-30"
    style={{
      width: size,
      height: size,
      background: color,
    }}
    animate={{
      x: [0, 100, -50, 80, 0],
      y: [0, -80, 60, -40, 0],
      scale: [1, 1.2, 0.9, 1.1, 1],
      rotate: [0, 90, 180, 270, 360],
    }}
    transition={{
      duration: 20,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Floating particles that respond to scroll
const FloatingParticle = ({ index }: { index: number }) => {
  const randomX = Math.random() * 100;
  const randomDelay = Math.random() * 5;
  const randomDuration = 15 + Math.random() * 10;
  const size = 2 + Math.random() * 4;
  
  return (
    <motion.div
      className="absolute rounded-full bg-white/20"
      style={{
        left: `${randomX}%`,
        width: size,
        height: size,
      }}
      animate={{
        y: [window.innerHeight, -100],
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0],
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

// 3D Tilt Card Component
const TiltCard = ({ 
  children, 
  className,
  glowColor,
}: { 
  children: React.ReactNode; 
  className?: string;
  glowColor: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 });
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={className}
    >
      {/* Glow effect that follows cursor */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-50 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${glowColor}33 0%, transparent 50%)`,
        }}
      />
      {children}
    </motion.div>
  );
};

// Animated Icon with micro-interactions
const AnimatedBenefitIcon = ({ 
  Icon, 
  isActive, 
  gradient,
  index,
}: { 
  Icon: React.ElementType; 
  isActive: boolean;
  gradient: string;
  index: number;
}) => {
  return (
    <motion.div
      className="relative"
      animate={isActive ? {
        scale: [1, 1.05, 1],
      } : {}}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Orbital rings */}
      <motion.div
        className="absolute inset-[-20px] rounded-full border border-white/10"
        animate={isActive ? { rotate: 360, scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-[-35px] rounded-full border border-white/5"
        animate={isActive ? { rotate: -360 } : {}}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Main icon container */}
      <motion.div
        className={`relative w-24 h-24 sm:w-32 sm:h-32 rounded-3xl flex items-center justify-center overflow-hidden`}
        style={{
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
        animate={isActive ? {
          boxShadow: [
            "0 0 30px rgba(255,255,255,0.1)",
            "0 0 60px rgba(255,255,255,0.2)",
            "0 0 30px rgba(255,255,255,0.1)",
          ],
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Gradient background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20`}
          animate={isActive ? { opacity: [0.2, 0.4, 0.2] } : { opacity: 0.1 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Icon */}
        <motion.div
          animate={isActive ? { 
            y: [0, -5, 0],
            rotate: index === 1 ? [0, 5, -5, 0] : 0,
          } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon 
            className="w-10 h-10 sm:w-14 sm:h-14 text-white" 
            strokeWidth={1.5}
          />
        </motion.div>
        
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: "-100%" }}
          animate={isActive ? { x: "100%" } : {}}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
        />
      </motion.div>
      
      {/* Floating particles around icon */}
      {isActive && Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/40"
          style={{
            left: "50%",
            top: "50%",
          }}
          animate={{
            x: [0, Math.cos(i * 60 * Math.PI / 180) * 60],
            y: [0, Math.sin(i * 60 * Math.PI / 180) * 60],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </motion.div>
  );
};

// Text reveal animation with wave effect
const WaveText = ({ text, isActive, className }: { text: string; isActive: boolean; className?: string }) => {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          animate={isActive ? { 
            opacity: 1, 
            y: 0, 
            rotateX: 0,
          } : { 
            opacity: 0, 
            y: 40, 
            rotateX: -90 
          }}
          transition={{
            duration: 0.5,
            delay: i * 0.02,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          style={{ 
            transformOrigin: "bottom",
            whiteSpace: char === ' ' ? 'pre' : 'normal',
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

// Fluid description with word-by-word reveal
const FluidDescription = ({ text, isActive }: { text: string; isActive: boolean }) => {
  const words = text.split(' ');
  
  return (
    <span className="inline">
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={isActive ? { 
            opacity: 1, 
            y: 0, 
            filter: "blur(0px)",
          } : { 
            opacity: 0, 
            y: 20, 
            filter: "blur(10px)" 
          }}
          transition={{
            duration: 0.6,
            delay: 0.3 + i * 0.05,
            ease: [0.215, 0.61, 0.355, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

// Progress indicator - constellation style
const ConstellationProgress = ({ 
  current, 
  total, 
  colors,
  onDotClick,
}: { 
  current: number; 
  total: number;
  colors: string[];
  onDotClick: (index: number) => void;
}) => {
  return (
    <div className="fixed right-6 sm:right-10 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-center gap-0">
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === current;
        const isPast = i < current;
        
        return (
          <div key={i} className="flex flex-col items-center">
            {/* Connection line */}
            {i > 0 && (
              <motion.div
                className="w-[1px] h-8"
                initial={{ background: "rgba(255,255,255,0.1)" }}
                animate={{
                  background: isPast || isActive 
                    ? `linear-gradient(to bottom, ${colors[i-1]}, ${colors[i]})`
                    : "rgba(255,255,255,0.1)",
                }}
                transition={{ duration: 0.5 }}
              />
            )}
            
            {/* Star/dot */}
            <motion.button
              onClick={() => onDotClick(i)}
              className="relative flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className="w-3 h-3 rounded-full"
                animate={{
                  backgroundColor: isActive ? colors[i] : isPast ? colors[i] : "rgba(255,255,255,0.2)",
                  scale: isActive ? 1.2 : 1,
                  boxShadow: isActive 
                    ? `0 0 20px ${colors[i]}, 0 0 40px ${colors[i]}50`
                    : "none",
                }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Pulse ring for active */}
              {isActive && (
                <motion.div
                  className="absolute w-6 h-6 rounded-full border"
                  style={{ borderColor: colors[i] }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              
              {/* Number label on hover */}
              <motion.span
                className="absolute right-8 text-xs font-medium text-white/60 whitespace-nowrap"
                initial={{ opacity: 0, x: 10 }}
                whileHover={{ opacity: 1, x: 0 }}
              >
                {i + 1}/{total}
              </motion.span>
            </motion.button>
          </div>
        );
      })}
    </div>
  );
};

// Mobile progress dots
const MobileProgress = ({ current, total, colors }: { current: number; total: number; colors: string[] }) => (
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex sm:hidden gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-xl border border-white/10">
    {Array.from({ length: total }).map((_, i) => (
      <motion.div
        key={i}
        className="w-2 h-2 rounded-full"
        animate={{
          backgroundColor: i === current ? colors[i] : i < current ? colors[i] + "80" : "rgba(255,255,255,0.2)",
          scale: i === current ? 1.3 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
    ))}
  </div>
);

// Scroll hint
const ScrollHint = ({ visible }: { visible: boolean }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-28 sm:bottom-24 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/40 tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-white/50"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Benefits = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isLastCardActiveRef = useRef(false);
  const isFirstCardActiveRef = useRef(false);
  const lastTouchYRef = useRef(0);

  const colors = benefits.map(b => b.accentColor);
  
  const handleDotClick = useCallback((index: number) => {
    const card = cardRefs.current[index];
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  // Track active card
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

  // Scroll-snap logic
  useEffect(() => {
    const section = sectionRef.current;
    const firstCard = cardRefs.current[0];
    const lastCard = cardRefs.current[benefits.length - 1];
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
          isLastCardActiveRef.current = entry.isIntersecting && entry.intersectionRatio > 0.3;
        });
      },
      { threshold: [0.3] }
    );

    const firstCardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isFirstCardActiveRef.current = entry.isIntersecting && entry.intersectionRatio > 0.3;
        });
      },
      { threshold: [0.3] }
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
      const deltaY = lastTouchYRef.current - e.changedTouches[0].clientY;
      if (isLastCardActiveRef.current && deltaY > 20) {
        document.documentElement.classList.remove('snap-benefits-active');
      }
      if (isFirstCardActiveRef.current && deltaY < -20) {
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

  const currentBenefit = benefits[activeIndex];

  return (
    <section id="benefits-section" ref={sectionRef} className="relative bg-black overflow-hidden">
      {/* Fixed Stage */}
      <div className="sticky top-0 h-screen overflow-hidden pointer-events-none z-10">
        {/* Dynamic Background that morphs with each benefit */}
        <motion.div
          className="absolute inset-0"
          animate={{ background: currentBenefit.bgGradient }}
          transition={{ duration: 1 }}
        />
        
        {/* Morphing blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <MorphingBlob 
            color={`radial-gradient(circle, ${currentBenefit.accentColor}40 0%, transparent 70%)`} 
            size={800}
          />
          <MorphingBlob 
            color={`radial-gradient(circle, ${benefits[(activeIndex + 1) % benefits.length].accentColor}30 0%, transparent 70%)`}
            delay={5}
            size={600}
          />
          <MorphingBlob 
            color={`radial-gradient(circle, ${benefits[(activeIndex + 2) % benefits.length].accentColor}20 0%, transparent 70%)`}
            delay={10}
            size={500}
          />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <FloatingParticle key={i} index={i} />
          ))}
        </div>

        {/* Noise texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 pt-10 sm:pt-12 text-center z-20">
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black via-black/80 to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.p 
              className="text-xs sm:text-sm tracking-[0.3em] uppercase mb-3 sm:mb-4"
              style={{ color: currentBenefit.accentColor }}
              animate={{ color: currentBenefit.accentColor }}
              transition={{ duration: 0.5 }}
            >
              Vantagens Exclusivas
            </motion.p>
            <h2 className="text-white mb-3 sm:mb-4">
              Por que escolher a<br />
              <span className={`bg-gradient-to-r ${currentBenefit.gradient} bg-clip-text text-transparent`}>
                nossa equipe?
              </span>
            </h2>
            <p className="text-sm sm:text-lg text-white/50 max-w-xl mx-auto px-6">
              Simplificamos todo o processo para que você
              <br className="hidden sm:block" />
              tenha um site profissional sem dor de cabeça.
            </p>
          </motion.div>
        </div>

        {/* WhatsApp button */}
        <div className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 pointer-events-auto z-20">
          <WhatsAppButton />
        </div>

        {/* Scroll hint */}
        <ScrollHint visible={!hasScrolled && activeIndex === 0} />
      </div>

      {/* Progress indicators */}
      <ConstellationProgress 
        current={activeIndex} 
        total={benefits.length} 
        colors={colors}
        onDotClick={handleDotClick}
      />
      <MobileProgress current={activeIndex} total={benefits.length} colors={colors} />

      {/* Cards */}
      <div className="relative z-0">
        {benefits.map((benefit, index) => {
          const isActive = activeIndex === index;
          
          return (
            <div
              key={benefit.title}
              ref={(el) => { cardRefs.current[index] = el; }}
              className="h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 snap-start"
              style={{ marginTop: index === 0 ? '-100vh' : '0' }}
            >
              <TiltCard 
                className="w-full max-w-lg mx-auto"
                glowColor={benefit.accentColor}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
                  className="relative p-8 sm:p-12 rounded-3xl text-center"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    backdropFilter: "blur(40px)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  {/* Gradient border effect */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0"
                    style={{
                      background: `linear-gradient(135deg, ${benefit.accentColor}20 0%, transparent 50%, ${benefit.accentColor}10 100%)`,
                    }}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center">
                    {/* Icon */}
                    <div className="mb-8 sm:mb-10">
                      <AnimatedBenefitIcon 
                        Icon={benefit.icon}
                        isActive={isActive}
                        gradient={benefit.gradient}
                        index={index}
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
                      <WaveText text={benefit.title} isActive={isActive} />
                    </h3>

                    {/* Description */}
                    <p className="text-base sm:text-xl text-white/60 leading-relaxed max-w-sm">
                      <FluidDescription text={benefit.description} isActive={isActive} />
                    </p>

                    {/* Benefit number badge */}
                    <motion.div
                      className="mt-8 sm:mt-10 px-4 py-2 rounded-full text-xs sm:text-sm font-medium"
                      style={{
                        background: `${benefit.accentColor}15`,
                        color: benefit.accentColor,
                        border: `1px solid ${benefit.accentColor}30`,
                      }}
                      animate={isActive ? {
                        boxShadow: [
                          `0 0 0 0 ${benefit.accentColor}00`,
                          `0 0 0 8px ${benefit.accentColor}00`,
                        ],
                      } : {}}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      {index + 1} de {benefits.length}
                    </motion.div>
                  </div>
                </motion.div>
              </TiltCard>
            </div>
          );
        })}
      </div>

      {/* Edge gradients */}
      <div className="fixed top-0 left-0 right-0 h-40 bg-gradient-to-b from-black to-transparent pointer-events-none z-20" />
      <div className="fixed bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default Benefits;
