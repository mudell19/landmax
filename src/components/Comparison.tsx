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
    <section ref={ref} className="py-20 bg-card/30">
      <div className="container-premium">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="mb-4 xs:mb-5 sm:mb-6">
            Por que somos<br />
            <span className="text-gradient">diferentes?</span>
          </h2>
          <p className="text-base xs:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Veja como nos comparamos<br className="hidden md:block" />
            com agências tradicionais
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Table Header */}
          <div className="grid grid-cols-3 gap-1.5 xs:gap-2 md:gap-4 mb-3 xs:mb-4">
            <div></div>
            <div className="text-center">
              <div className="inline-block px-2 py-1.5 xs:px-3 xs:py-2 md:px-6 md:py-3 rounded-lg xs:rounded-xl bg-gradient-primary">
                <span className="text-xs xs:text-sm md:text-lg font-bold text-primary-foreground">SitePro</span>
              </div>
            </div>
            <div className="text-center">
              <div className="inline-block px-2 py-1.5 xs:px-3 xs:py-2 md:px-6 md:py-3 rounded-lg xs:rounded-xl bg-muted/50 border border-border">
                <span className="text-xs xs:text-sm md:text-lg font-bold text-muted-foreground">Agências</span>
              </div>
            </div>
          </div>

          {/* Comparison Rows */}
          <div className="space-y-1.5 xs:space-y-2">
            {comparisonData.map((item, index) => (
              <motion.div
                key={item.feature}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                className="grid grid-cols-3 gap-1.5 xs:gap-2 md:gap-4 items-center p-2 xs:p-3 md:p-4 rounded-lg xs:rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <div className="text-xs xs:text-sm md:text-base font-medium text-foreground">
                  {item.feature}
                </div>
                <div className="flex items-center justify-center gap-0.5 xs:gap-1 md:gap-2 text-center">
                  <Check className="h-3 w-3 xs:h-4 xs:w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                  <span className="text-[10px] xs:text-xs md:text-sm text-foreground font-medium">{item.us}</span>
                </div>
                <div className="flex items-center justify-center gap-0.5 xs:gap-1 md:gap-2 text-center">
                  <X className="h-3 w-3 xs:h-4 xs:w-4 md:h-5 md:w-5 text-destructive/60 flex-shrink-0" />
                  <span className="text-[10px] xs:text-xs md:text-sm text-muted-foreground">{item.others}</span>
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
          className="text-center mt-8 xs:mt-10 sm:mt-12 md:mt-16"
        >
          <WhatsAppButton showResponseTime />
        </motion.div>
      </div>
    </section>
  );
};

export default Comparison;
