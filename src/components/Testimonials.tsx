import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

// Google-style reviews with authentic, technical testimonials
const testimonials = [
  {
    name: "Dr. Marcelo Ribeiro",
    role: "Cirurgião-Dentista • Odontologia Estética",
    content: "Solicitei na segunda-feira e na quarta já estava no ar. O botão de agendamento via WhatsApp foi um divisor de águas — minha agenda de primeira consulta aumentou 40% no primeiro mês. Profissionalismo impecável.",
    rating: 5,
    date: "há 2 semanas"
  },
  {
    name: "Arq. Carolina Vasconcellos",
    role: "Arquiteta • Vasconcellos Arquitetura",
    content: "Precisava de um portfólio sério para apresentar em reuniões com incorporadoras. O resultado ficou à altura dos projetos que entrego. Design limpo, carregamento rápido e responsivo em qualquer dispositivo. Recebi elogios de clientes corporativos.",
    rating: 5,
    date: "há 1 mês"
  },
  {
    name: "Dr. Felipe Andrade",
    role: "Advogado • Direito Empresarial",
    content: "Zero dor de cabeça. Eles cuidaram de tudo: domínio, hospedagem, e-mail profissional e SSL. Eu só precisei aprovar o layout e fornecer os textos. Suporte rápido e disponível. Para quem não entende de tecnologia, é a solução perfeita.",
    rating: 5,
    date: "há 3 semanas"
  }
];

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding section-divider">
      <div className="container-premium">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 xs:mb-14 sm:mb-16 md:mb-20"
        >
          <h2 className="mb-4 xs:mb-5 sm:mb-6">
            Avaliações de<br />
            <span className="text-gradient">quem contratou</span>
          </h2>
          <p className="text-base xs:text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Feedback real de profissionais que confiaram em nosso trabalho.
          </p>
        </motion.div>

        {/* Google-Style Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 xs:gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="p-6 xs:p-7 sm:p-8 rounded-xl xs:rounded-2xl bg-[hsl(var(--review-bg))] border border-[hsl(var(--review-border))] shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Header: Google Icon + Date */}
              <div className="flex items-center justify-between mb-4">
                <GoogleIcon />
                <span className="text-xs text-[hsl(var(--review-text-muted))]">{testimonial.date}</span>
              </div>
              
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 xs:h-5 xs:w-5 fill-[hsl(var(--review-star))] text-[hsl(var(--review-star))]" />
                ))}
              </div>

              {/* Content */}
              <p className="text-[hsl(var(--review-text))] text-sm xs:text-base leading-relaxed mb-5">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="pt-4 border-t border-[hsl(var(--review-border))]">
                <p className="font-semibold text-[hsl(var(--review-text))] text-sm xs:text-base">{testimonial.name}</p>
                <p className="text-[hsl(var(--review-text-muted))] text-xs xs:text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-2 mt-10 xs:mt-12"
        >
          <div className="flex -space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-[hsl(var(--review-star))] text-[hsl(var(--review-star))]" />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            4.9 de média • 200+ avaliações
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
