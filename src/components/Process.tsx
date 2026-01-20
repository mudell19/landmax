import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Palette, Rocket, CheckCircle } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";

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
    description: "Nossa equipe desenvolve seu site exclusivo em até 2 dias."
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
    <section ref={ref} id="como-funciona" className="section-padding section-light">
      <div className="container-premium">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 xs:mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="mb-4 xs:mb-5 sm:mb-6">
            Como<br />
            <span className="text-gradient">funciona?</span>
          </h2>
          <p className="text-base xs:text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Um processo simples e transparente<br className="hidden md:block" />
            do início ao fim.
          </p>
        </motion.div>

        {/* Steps with connecting lines */}
        <div className="relative max-w-5xl mx-auto">
          {/* Desktop: Horizontal layout with connecting line */}
          <div className="hidden md:block">
            {/* Connection Line */}
            <div className="absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/60 to-primary/20">
              {/* Animated dots on line */}
              <motion.div
                initial={{ left: "0%" }}
                animate={isInView ? { left: "100%" } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50"
              />
            </div>

            <div className="grid grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative text-center"
                >
                  {/* Step Icon */}
                  <div className="relative z-10 w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-xl">
                    <step.icon className="h-10 w-10 text-primary-foreground" />
                  </div>

                  {/* Step Label */}
                  <span className="text-sm font-bold text-primary mb-3 block uppercase tracking-wider">{step.step}</span>
                  
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile: Vertical layout with connecting line */}
          <div className="md:hidden relative">
            {/* Vertical Connection Line */}
            <div className="absolute left-6 xs:left-8 top-10 xs:top-12 bottom-10 xs:bottom-12 w-0.5 bg-gradient-to-b from-primary via-primary/60 to-primary" />

            <div className="space-y-6 xs:space-y-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative flex gap-4 xs:gap-6"
                >
                  {/* Step Icon */}
                  <div className="relative z-10 w-12 h-12 xs:w-16 xs:h-16 rounded-lg xs:rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg flex-shrink-0">
                    <step.icon className="h-5 w-5 xs:h-7 xs:w-7 text-primary-foreground" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-0.5 xs:pt-1">
                    <span className="text-[10px] xs:text-xs font-bold text-primary mb-0.5 xs:mb-1 block uppercase tracking-wider">{step.step}</span>
                    <h3 className="text-lg xs:text-xl font-bold mb-1.5 xs:mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-xs xs:text-sm">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-8 xs:mt-10 sm:mt-12 md:mt-16"
        >
          <WhatsAppButton showResponseTime />
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
