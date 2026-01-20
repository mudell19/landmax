import { motion } from "framer-motion";
import { Check, Zap, Shield, Clock } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";

const Hero = () => {
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
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8"
          >
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              +200 projetos entregues com sucesso
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
            Landing pages de alta conversão que transformam visitantes em clientes.
          </motion.p>

          {/* Price Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            <div className="inline-flex flex-col items-center gap-3 p-8 rounded-3xl bg-card/50 border border-border backdrop-blur-sm">
              <span className="text-sm text-muted-foreground uppercase tracking-wider">Investimento único</span>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl md:text-7xl font-bold text-gradient">R$ 490</span>
                <span className="text-2xl text-muted-foreground">,00</span>
              </div>
              <div className="flex items-center gap-2 mt-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
                <span className="text-primary font-semibold">+ 1 ano de Domínio e Hospedagem Grátis</span>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <WhatsAppButton />
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-8"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card/50 border border-border">
              <Check className="h-5 w-5 text-primary" />
              <span className="text-foreground font-medium">Entrega em 2 dias</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card/50 border border-border">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-foreground font-medium">Pague só após aprovar</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card/50 border border-border">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-foreground font-medium">30 dias de suporte</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
