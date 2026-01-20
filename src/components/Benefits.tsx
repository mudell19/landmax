import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Rocket, DollarSign, Headphones, Palette, Search, Smartphone } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";

const benefits = [
  {
    icon: DollarSign,
    title: "Pagamento Após Entrega",
    description: "Você só paga quando aprovar o projeto. Risco zero para você.",
    highlighted: true
  },
  {
    icon: Rocket,
    title: "Entrega em 2 Dias",
    description: "Seu site pronto em até 2 dias úteis. Velocidade incomparável no mercado.",
    highlighted: false
  },
  {
    icon: Headphones,
    title: "Suporte Dedicado",
    description: "30 dias de suporte gratuito para ajustes e dúvidas após a entrega.",
    highlighted: false
  },
  {
    icon: Palette,
    title: "Design Exclusivo",
    description: "Cada projeto é único, criado especialmente para o seu negócio.",
    highlighted: false
  },
  {
    icon: Search,
    title: "Otimizado para SEO",
    description: "Estrutura otimizada para aparecer nas buscas do Google.",
    highlighted: false
  },
  {
    icon: Smartphone,
    title: "100% Responsivo",
    description: "Perfeito em qualquer dispositivo: celular, tablet ou desktop.",
    highlighted: false
  }
];

const Benefits = () => {
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
          className="text-center mb-20"
        >
          <h2 className="mb-6">
            Por que escolher a <span className="text-gradient">nossa equipe?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
              className={`group p-8 rounded-2xl border card-hover ${
                benefit.highlighted 
                  ? 'bg-white border-2 border-primary shadow-2xl shadow-primary/20' 
                  : 'bg-card border-border'
              }`}
            >
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${
                benefit.highlighted 
                  ? 'bg-gradient-primary' 
                  : 'bg-gradient-primary'
              }`}>
                <benefit.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className={`text-2xl font-bold mb-3 ${
                benefit.highlighted ? 'text-primary' : 'text-foreground'
              }`}>
                {benefit.title}
              </h3>
              <p className={`text-lg leading-relaxed ${
                benefit.highlighted ? 'text-gray-600' : 'text-muted-foreground'
              }`}>
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <WhatsAppButton />
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;
