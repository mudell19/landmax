import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Clock, RefreshCw, CheckCircle2 } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";

const guarantees = [
  {
    icon: Shield,
    title: "Risco Zero",
    description: "Você só paga após aprovar o projeto. Se não gostar, não paga nada."
  },
  {
    icon: Clock,
    title: "Entrega em 2 Dias",
    description: "Prazo garantido ou seu projeto ganha desconto proporcional."
  },
  {
    icon: RefreshCw,
    title: "Ajustes Ilimitados",
    description: "Até 3 rodadas de revisões inclusas para deixar tudo perfeito."
  },
  {
    icon: CheckCircle2,
    title: "Suporte 30 Dias",
    description: "Acompanhamento completo após a entrega para qualquer dúvida."
  }
];

const Guarantee = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      
      <div className="container-premium relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 xs:mb-12 sm:mb-16 md:mb-20"
          >
            <h2 className="mb-4 xs:mb-5 sm:mb-6">
              Sua satisfação<br />
              <span className="text-gradient">100% garantida</span>
            </h2>
            <p className="text-base xs:text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Trabalhamos com transparência total.<br className="hidden md:block" />
              Você tem controle absoluto do processo.
            </p>
          </motion.div>

          {/* Guarantees Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-6 sm:gap-8 mb-10 xs:mb-12 sm:mb-16 md:mb-20">
            {guarantees.map((guarantee, index) => (
              <motion.div
                key={guarantee.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-4 xs:gap-5 sm:gap-6 p-5 xs:p-6 sm:p-8 rounded-xl xs:rounded-2xl bg-card/50 border border-border backdrop-blur-sm"
              >
                <div className="flex-shrink-0 w-11 h-11 xs:w-12 xs:h-12 sm:w-14 sm:h-14 rounded-lg xs:rounded-xl bg-primary/10 flex items-center justify-center">
                  <guarantee.icon className="h-5 w-5 xs:h-6 xs:w-6 sm:h-7 sm:w-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg xs:text-xl font-bold mb-2 xs:mb-3">{guarantee.title}</h3>
                  <p className="text-muted-foreground text-sm xs:text-base sm:text-lg">{guarantee.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Card - Improved styling */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative p-8 md:p-14 rounded-3xl bg-gradient-to-br from-primary/10 via-card to-card border border-primary/20 text-center shadow-2xl shadow-primary/10"
          >
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-50" />
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-4xl font-bold mb-6">
                Pronto para ter seu<br />
                <span className="text-gradient">site profissional?</span>
              </h3>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed">
                Clique no botão abaixo e fale<br className="hidden md:block" />
                diretamente conosco no WhatsApp.<br />
                <span className="text-foreground font-medium">Em 2 dias seu site estará no ar.</span>
              </p>
              
              <div className="flex justify-center">
                <WhatsAppButton showResponseTime />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Guarantee;
