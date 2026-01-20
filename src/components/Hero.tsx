import { motion } from "framer-motion";
import { ArrowRight, Check, Zap, Shield, Clock, CreditCard } from "lucide-react";
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

          {/* Payment Highlight Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary/20 to-primary/5 border-2 border-primary/50">
              <CreditCard className="h-8 w-8 text-primary" />
              <div className="text-left">
                <p className="text-2xl md:text-3xl font-black text-foreground">PAGUE SOMENTE APÓS A ENTREGA</p>
                <p className="text-muted-foreground">Risco zero para você. Satisfação garantida.</p>
              </div>
            </div>
          </motion.div>

          {/* Price */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            <div className="inline-flex flex-col items-center gap-2 p-6 rounded-2xl bg-card/50 border border-border backdrop-blur-sm">
              <span className="text-sm text-muted-foreground uppercase tracking-wider">Investimento único</span>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl md:text-6xl font-bold text-gradient">R$ 490</span>
                <span className="text-muted-foreground">,00</span>
              </div>
              <span className="text-sm text-muted-foreground">Inclui 1 ano de hospedagem grátis</span>
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
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span>Entrega expressa em 2 dias</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>Zero risco para você</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>Suporte por 30 dias</span>
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
