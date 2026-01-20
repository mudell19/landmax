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
    title: "Entrega em 7 Dias",
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
            className="text-center mb-16"
          >
            <h2 className="mb-4">
              Sua satisfação <span className="text-gradient">100% garantida</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Trabalhamos com transparência total. Você tem controle absoluto do processo.
            </p>
          </motion.div>

          {/* Guarantees Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {guarantees.map((guarantee, index) => (
              <motion.div
                key={guarantee.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-5 p-6 rounded-2xl bg-card/50 border border-border backdrop-blur-sm"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <guarantee.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{guarantee.title}</h3>
                  <p className="text-muted-foreground">{guarantee.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative p-8 md:p-12 rounded-3xl gradient-border text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Pronto para ter seu site profissional?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Clique no botão abaixo, fale diretamente conosco no WhatsApp e 
              em 7 dias seu site estará no ar.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <WhatsAppButton />
            </div>

            <p className="text-sm text-muted-foreground">
              💬 Resposta em até 2 horas · Atendimento humanizado
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Guarantee;
