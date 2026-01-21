import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { DollarSign, Headphones, Palette, Rocket, Search, Smartphone } from "lucide-react";
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
  },
] as const;

type Direction = 1 | -1;

const BenefitsStage = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const lastTouchYRef = useRef(0);
  const wheelCooldownRef = useRef<number | null>(null);

  const stars = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 2 + 1}px`,
          height: `${Math.random() * 2 + 1}px`,
          animationDelay: `${Math.random() * 5}s`,
        } as React.CSSProperties,
      })),
    []
  );

  const go = (dir: Direction) => {
    setActive((prev) => {
      const next = prev + dir;
      if (next < 0 || next >= benefits.length) return prev;
      return next;
    });
  };

  const exitToSibling = (dir: Direction) => {
    const section = sectionRef.current;
    if (!section) return;

    const sibling = dir === 1 ? (section.nextElementSibling as HTMLElement | null) : (section.previousElementSibling as HTMLElement | null);
    setIsLocked(false);

    // Give the browser one frame to release the lock before scrolling out.
    requestAnimationFrame(() => {
      if (sibling) {
        sibling.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollBy({ top: dir * window.innerHeight * 0.9, behavior: "smooth" });
      }
    });
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        // lock only when mostly on screen (reduces jitter)
        setIsLocked(entry.isIntersecting && entry.intersectionRatio > 0.7);
      },
      { threshold: [0.2, 0.7, 0.9] }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isLocked) return;

    const onWheel = (e: WheelEvent) => {
      // strong lock: stop the page scroll and use wheel to change cards
      e.preventDefault();

      // Cooldown to avoid trackpad momentum flipping multiple cards
      if (wheelCooldownRef.current) return;
      wheelCooldownRef.current = window.setTimeout(() => {
        wheelCooldownRef.current = null;
      }, 350);

      if (e.deltaY > 5) {
        if (active === benefits.length - 1) return exitToSibling(1);
        go(1);
      } else if (e.deltaY < -5) {
        if (active === 0) return exitToSibling(-1);
        go(-1);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      lastTouchYRef.current = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      // strong lock: stop native scroll
      e.preventDefault();
    };

    const onTouchEnd = (e: TouchEvent) => {
      const endY = e.changedTouches[0].clientY;
      const deltaY = lastTouchYRef.current - endY;
      if (Math.abs(deltaY) < 18) return;

      if (deltaY > 0) {
        if (active === benefits.length - 1) return exitToSibling(1);
        go(1);
      } else {
        if (active === 0) return exitToSibling(-1);
        go(-1);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel as any);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove as any);
      window.removeEventListener("touchend", onTouchEnd);
      if (wheelCooldownRef.current) {
        clearTimeout(wheelCooldownRef.current);
        wheelCooldownRef.current = null;
      }
    };
  }, [isLocked, active]);

  const current = benefits[active];
  const Icon = current.icon;

  return (
    <section ref={sectionRef} className="relative bg-background">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* background */}
        <div className="absolute inset-0">
          {stars.map((s) => (
            <motion.div
              key={s.id}
              className="absolute rounded-full"
              style={{
                ...s.style,
                backgroundColor: "hsl(var(--foreground) / 0.9)",
              }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.2, 1] }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, hsl(var(--primary) / 0.25) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* fixed header */}
        <div className="absolute top-0 left-0 right-0 pt-12 pb-12 text-center">
          <div
            className="absolute inset-x-0 top-0 h-40"
            style={{
              background:
                "linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(var(--background) / 0.8) 50%, transparent 100%)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <h2 className="mb-3 xs:mb-4 sm:mb-5">
              Por que escolher a<br />
              <span className="text-gradient">nossa equipe?</span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Simplificamos todo o processo para que você
              <br className="hidden md:block" />
              tenha um site profissional sem dor de cabeça.
            </p>
          </motion.div>
        </div>

        {/* center card */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="w-full max-w-2xl mx-auto text-center pt-32 pb-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.title}
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -18, scale: 0.98 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <div
                  className="w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 rounded-2xl xs:rounded-3xl flex items-center justify-center mx-auto mb-6 xs:mb-8"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--primary) / 0.28) 0%, hsl(var(--primary) / 0.12) 100%)",
                    boxShadow:
                      "0 0 40px hsl(var(--primary) / 0.45), 0 0 80px hsl(var(--primary) / 0.25)",
                    border: "1px solid hsl(var(--primary) / 0.35)",
                  }}
                >
                  <Icon
                    className="h-10 w-10 xs:h-12 xs:w-12 sm:h-14 sm:w-14"
                    style={{
                      color: "hsl(var(--primary))",
                      filter: "drop-shadow(0 0 14px hsl(var(--primary) / 0.8))",
                    }}
                  />
                </div>

                <h3 className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-4 xs:mb-5">{current.title}</h3>
                <p className="text-base xs:text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-md mx-auto">
                  {current.description}
                </p>

                <p className="mt-8 text-xs xs:text-sm text-muted-foreground/80">
                  {active + 1}/{benefits.length} • deslize para navegar
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* fixed WhatsApp button */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <WhatsAppButton />
        </div>
      </div>

      {/* Spacer so page can continue after sticky stage */}
      <div style={{ height: `${benefits.length * 2}vh` }} />
    </section>
  );
};

export default BenefitsStage;
