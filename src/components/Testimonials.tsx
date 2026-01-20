import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote, Briefcase, ThumbsUp, Clock, Users } from "lucide-react";

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

const stats = [
  { 
    icon: Briefcase, 
    value: "200+", 
    label: "Projetos entregues",
    color: "from-violet-500 to-purple-600"
  },
  { 
    icon: Star, 
    value: "4.9", 
    label: "Avaliação média",
    color: "from-amber-500 to-orange-600"
  },
  { 
    icon: ThumbsUp, 
    value: "98%", 
    label: "Clientes satisfeitos",
    color: "from-emerald-500 to-green-600"
  },
  { 
    icon: Clock, 
    value: "2 dias", 
    label: "Tempo médio de entrega",
    color: "from-blue-500 to-cyan-600"
  }
];

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding">
      <div className="container-premium">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl" 
                style={{ background: `linear-gradient(135deg, var(--primary) 0%, transparent 100%)` }} 
              />
              <div className="relative p-6 md:p-8 rounded-2xl bg-card border border-border backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <stat.icon className="h-7 w-7 text-white" />
                </div>
                <p className="text-3xl md:text-4xl lg:text-5xl font-black text-gradient mb-2">{stat.value}</p>
                <p className="text-muted-foreground text-sm md:text-base">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
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
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
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
      </div>
    </section>
  );
};

export default Testimonials;
