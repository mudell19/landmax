import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Palette, Rocket, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    step: "01",
    title: "Contato",
    description: "Você entra em contato pelo WhatsApp e conversamos sobre seu projeto."
  },
  {
    icon: Palette,
    step: "02",
    title: "Criação",
    description: "Nossa equipe desenvolve seu site com design exclusivo em até 5 dias."
  },
  {
    icon: CheckCircle,
    step: "03",
    title: "Aprovação",
    description: "Você revisa o projeto e solicita ajustes até ficar 100% satisfeito."
  },
  {
    icon: Rocket,
    step: "04",
    title: "Lançamento",
    description: "Após aprovação, seu site vai ao ar e você efetua o pagamento."
  }
];

const Process = () => {
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
          <h2 className="mb-4">
            Como <span className="text-gradient">funciona?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Um processo simples e transparente do início ao fim.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative text-center"
              >
                {/* Step Number */}
                <div className="relative z-10 w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg">
                  <step.icon className="h-8 w-8 text-primary-foreground" />
                </div>

                {/* Step Label */}
                <span className="text-sm font-medium text-primary mb-2 block">{step.step}</span>
                
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
