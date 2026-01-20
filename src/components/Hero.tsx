import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";
import { useEffect, useState } from "react";

// Animated counter hook
const useCounter = (end: number, duration: number = 2000, startCounting: boolean = true) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;
    
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, startCounting]);

  return count;
};

const Hero = () => {
  const projectCount = useCounter(200, 2000);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden section-padding">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container-premium relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge with animated counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-muted/50 border border-border mb-8"
          >
            <Zap className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              +{projectCount} projetos entregues com sucesso
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            Seu site profissional
            <span className="block text-gradient">pronto em 2 dias</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Landing pages de alta conversão que transformam visitantes em clientes. <span className="text-foreground font-semibold">Pague somente na entrega.</span>
          </motion.p>

          {/* Price Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            <div className="inline-flex flex-col items-center gap-2 p-8 rounded-3xl bg-card/50 border border-border backdrop-blur-sm">
              <span className="text-sm text-muted-foreground uppercase tracking-wider">Investimento único</span>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl md:text-7xl font-bold text-gradient">R$ 490</span>
                <span className="text-2xl text-muted-foreground">,00</span>
              </div>
              <span className="text-base text-muted-foreground mt-1">
                + 1 ano de Domínio e Hospedagem <span className="text-primary font-semibold">Grátis</span>
              </span>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <WhatsAppButton showResponseTime />
          </motion.div>

        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
