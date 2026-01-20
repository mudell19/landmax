import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Rocket, DollarSign, Headphones, Palette, Search, Smartphone } from "lucide-react";

const benefits = [
  {
    icon: Rocket,
    title: "Entrega Expressa",
    description: "Seu site pronto em até 7 dias úteis. Sem enrolação, sem atrasos."
  },
  {
    icon: DollarSign,
    title: "Pagamento Após Entrega",
    description: "Você só paga quando aprovar o projeto. Risco zero para você."
  },
  {
    icon: Headphones,
    title: "Suporte Dedicado",
    description: "30 dias de suporte gratuito para ajustes e dúvidas após a entrega."
  },
  {
    icon: Palette,
    title: "Design Exclusivo",
    description: "Cada projeto é único, criado especialmente para o seu negócio."
  },
  {
    icon: Search,
    title: "Otimizado para SEO",
    description: "Estrutura otimizada para aparecer nas buscas do Google."
  },
  {
    icon: Smartphone,
    title: "100% Responsivo",
    description: "Perfeito em qualquer dispositivo: celular, tablet ou desktop."
  }
];

const Benefits = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-gradient-dark">
      <div className="container-premium">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">
            Por que escolher a <span className="text-gradient">nossa equipe?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simplificamos todo o processo para que você tenha um site profissional sem dor de cabeça.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="feature-grid">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 rounded-2xl bg-card border border-border card-hover"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
