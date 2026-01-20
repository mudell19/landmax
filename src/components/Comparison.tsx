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
    feature: "Design responsivo",
    us: "100% mobile-first",
    others: "Nem sempre incluso"
  },
  {
    feature: "Otimização SEO",
    us: "Incluso no projeto",
    others: "Serviço adicional"
  },
  {
    feature: "Integração WhatsApp",
    us: "Configurado e pronto",
    others: "Custo extra"
  },
  {
    feature: "Equipe de design",
    us: "Designers profissionais",
    others: "Freelancers variados"
  },
  {
    feature: "Investimento total",
    us: "R$ 490 fixo",
    others: "R$ 2.000 - R$ 10.000+"
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
          className="text-center mb-16"
        >
          <h2 className="mb-6">
            Por que somos <span className="text-gradient">diferentes?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Compare nosso serviço com agências tradicionais e veja a diferença.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          {/* Table Header */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-lg font-bold text-muted-foreground">Recurso</div>
            <div className="text-center">
              <div className="inline-flex flex-col items-center px-6 py-3 rounded-xl bg-gradient-primary">
                <span className="text-lg font-bold text-primary-foreground">Nós</span>
              </div>
            </div>
            <div className="text-center">
              <div className="inline-flex flex-col items-center px-6 py-3 rounded-xl bg-card border border-border">
                <span className="text-lg font-bold text-muted-foreground">Agências</span>
              </div>
            </div>
          </div>

          {/* Table Rows */}
          <div className="space-y-3">
            {comparisonData.map((item, index) => (
              <motion.div
                key={item.feature}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-card/50 border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center font-medium">{item.feature}</div>
                <div className="flex items-center justify-center gap-2 text-center">
                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">{item.us}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-center">
                  <X className="h-5 w-5 text-destructive/70 flex-shrink-0" />
                  <span className="text-muted-foreground">{item.others}</span>
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
          className="text-center mt-16"
        >
          <p className="text-xl text-muted-foreground mb-6">
            Economize tempo e dinheiro com a escolha certa.
          </p>
          <WhatsAppButton />
        </motion.div>
      </div>
    </section>
  );
};

export default Comparison;
