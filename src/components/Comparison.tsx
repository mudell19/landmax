import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, X } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";

const comparisonData = [
  {
    feature: "Tempo de entrega",
    us: "2 dias úteis",
    others: "30-60 dias"
  },
  {
    feature: "Pagamento",
    us: "Somente após aprovação",
    others: "50% antecipado"
  },
  {
    feature: "Domínio e hospedagem",
    us: "1 ano grátis incluso",
    others: "Custo adicional"
  },
  {
    feature: "Suporte pós-entrega",
    us: "30 dias gratuito",
    others: "Pago à parte"
  },
  {
    feature: "Ajustes e revisões",
    us: "Até 3 rodadas inclusas",
    others: "Cobrado por hora"
  },
  {
    feature: "Investimento total",
    us: "R$ 490 fixo",
    others: "R$ 2.000+"
  }
];

const Comparison = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding">
      <div className="container-premium">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="mb-6">
            Por que somos <span className="text-gradient">diferentes?</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Compare nosso serviço com agências tradicionais.
          </p>
        </motion.div>

        {/* Comparison Cards - Mobile optimized */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Desktop Table Header */}
          <div className="hidden md:grid grid-cols-3 gap-4 mb-6">
            <div className="text-lg font-bold text-muted-foreground">Recurso</div>
            <div className="text-center">
              <div className="inline-flex flex-col items-center px-6 py-3 rounded-xl bg-gradient-primary">
                <span className="text-lg font-bold text-primary-foreground">SitePro</span>
              </div>
            </div>
            <div className="text-center">
              <div className="inline-flex flex-col items-center px-6 py-3 rounded-xl bg-card border border-border">
                <span className="text-lg font-bold text-muted-foreground">Agências</span>
              </div>
            </div>
          </div>

          {/* Mobile: Two column cards */}
          <div className="md:hidden grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-gradient-primary text-center">
              <span className="text-lg font-bold text-primary-foreground">SitePro</span>
            </div>
            <div className="p-4 rounded-2xl bg-card border border-border text-center">
              <span className="text-lg font-bold text-muted-foreground">Agências</span>
            </div>
          </div>

          {/* Comparison Rows */}
          <div className="space-y-3">
            {comparisonData.map((item, index) => (
              <motion.div
                key={item.feature}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                className="rounded-xl bg-card/50 border border-border hover:border-primary/30 transition-colors overflow-hidden"
              >
                {/* Mobile Layout */}
                <div className="md:hidden">
                  <div className="px-4 py-3 bg-card/80 border-b border-border">
                    <span className="font-semibold text-foreground">{item.feature}</span>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-border">
                    <div className="p-4 flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground font-medium">{item.us}</span>
                    </div>
                    <div className="p-4 flex items-center gap-2">
                      <X className="h-4 w-4 text-destructive/70 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{item.others}</span>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:grid grid-cols-3 gap-4 p-4">
                  <div className="flex items-center font-medium">{item.feature}</div>
                  <div className="flex items-center justify-center gap-2 text-center">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground font-medium">{item.us}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-center">
                    <X className="h-5 w-5 text-destructive/70 flex-shrink-0" />
                    <span className="text-muted-foreground">{item.others}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12 md:mt-16"
        >
          <WhatsAppButton showResponseTime />
        </motion.div>
      </div>
    </section>
  );
};

export default Comparison;
