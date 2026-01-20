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
            className="text-center mb-20"
          >
            <h2 className="mb-6">
              Sua satisfação <span className="text-gradient">100% garantida</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Trabalhamos com transparência total. Você tem controle absoluto do processo.
            </p>
          </motion.div>

          {/* Guarantees Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {guarantees.map((guarantee, index) => (
              <motion.div
                key={guarantee.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 p-8 rounded-2xl bg-card/50 border border-border backdrop-blur-sm"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <guarantee.icon className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">{guarantee.title}</h3>
                  <p className="text-muted-foreground text-lg">{guarantee.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative p-10 md:p-14 rounded-3xl gradient-border text-center"
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para ter seu site profissional?
            </h3>
            <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
              Clique no botão abaixo, fale diretamente conosco no WhatsApp e 
              em 2 dias seu site estará no ar.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <WhatsAppButton />
            </div>

            <p className="text-muted-foreground">
              💬 Resposta em até 2 horas · Atendimento humanizado
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Guarantee;
