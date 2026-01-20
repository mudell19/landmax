import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Ricardo Mendes",
    role: "Advogado Trabalhista",
    content: "Incrível! Em menos de uma semana eu já tinha meu site funcionando e captando clientes. O investimento se pagou no primeiro mês.",
    rating: 5
  },
  {
    name: "Dra. Camila Santos",
    role: "Ortodontista",
    content: "Atendimento impecável e resultado além das expectativas. Meus agendamentos triplicaram depois do novo site.",
    rating: 5
  },
  {
    name: "Fernando Costa",
    role: "CEO - Imobiliária Costa",
    content: "Profissionalismo do início ao fim. Entregaram antes do prazo e o suporte é excelente. Super recomendo!",
    rating: 5
  },
  {
    name: "Juliana Oliveira",
    role: "Personal Trainer",
    content: "Minha página de vendas converteu 3x mais que a anterior. Valeu cada centavo investido!",
    rating: 5
  },
  {
    name: "Marcos Almeida",
    role: "Arquiteto",
    content: "Finalmente um portfólio que mostra meu trabalho do jeito que eu sempre quis. Design impecável.",
    rating: 5
  },
  {
    name: "Patricia Lima",
    role: "Esteticista",
    content: "O site ficou lindo e super fácil de usar. Minhas clientes adoraram a praticidade de ver os procedimentos.",
    rating: 5
  }
];

const Testimonials = () => {
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
            O que nossos <span className="text-gradient">clientes dizem</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Mais de 200 projetos entregues com avaliação média de 4.9 estrelas.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-card border border-border relative"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/20" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground text-lg mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div>
                <p className="font-bold text-lg">{testimonial.name}</p>
                <p className="text-muted-foreground">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "200+", label: "Projetos entregues" },
            { value: "4.9", label: "Avaliação média" },
            { value: "98%", label: "Clientes satisfeitos" },
            { value: "7 dias", label: "Tempo médio de entrega" }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient mb-3">{stat.value}</p>
              <p className="text-muted-foreground text-lg">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
