import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import WhatsAppButton from "./WhatsAppButton";

// Portfolio images
import advocaciaImg from "@/assets/portfolio/advocacia.jpg";
import clinicaImg from "@/assets/portfolio/clinica.jpg";
import dentistaImg from "@/assets/portfolio/dentista.jpg";
import arquiteturaImg from "@/assets/portfolio/arquitetura.jpg";
import imobiliariaImg from "@/assets/portfolio/imobiliaria.jpg";
import infoprodutoImg from "@/assets/portfolio/infoproduto.jpg";
import suplementoImg from "@/assets/portfolio/suplemento.jpg";
import energiaSolarImg from "@/assets/portfolio/energia-solar.jpg";
import segurancaImg from "@/assets/portfolio/seguranca.jpg";
import esteticaImg from "@/assets/portfolio/estetica.jpg";

const projects = [
  {
    image: advocaciaImg,
    name: "Ribeiro & Associados",
    niche: "Advocacia",
    color: "from-amber-500/20 to-amber-600/5"
  },
  {
    image: clinicaImg,
    name: "Clínica VidaSaúde",
    niche: "Clínica Médica",
    color: "from-emerald-500/20 to-emerald-600/5"
  },
  {
    image: dentistaImg,
    name: "Sorriso Perfeito",
    niche: "Odontologia",
    color: "from-sky-500/20 to-sky-600/5"
  },
  {
    image: arquiteturaImg,
    name: "Studio Arqdesign",
    niche: "Arquitetura",
    color: "from-orange-500/20 to-orange-600/5"
  },
  {
    image: imobiliariaImg,
    name: "Prime Imóveis",
    niche: "Imobiliária",
    color: "from-violet-500/20 to-violet-600/5"
  },
  {
    image: infoprodutoImg,
    name: "Método Acelerador",
    niche: "Infoproduto",
    color: "from-rose-500/20 to-rose-600/5"
  },
  {
    image: suplementoImg,
    name: "NutriFit Pro",
    niche: "Suplementos",
    color: "from-lime-500/20 to-lime-600/5"
  },
  {
    image: energiaSolarImg,
    name: "SolarTech Brasil",
    niche: "Energia Solar",
    color: "from-yellow-500/20 to-yellow-600/5"
  },
  {
    image: segurancaImg,
    name: "ProtegMax",
    niche: "Segurança",
    color: "from-slate-500/20 to-slate-600/5"
  },
  {
    image: esteticaImg,
    name: "Beleza Sublime",
    niche: "Estética",
    color: "from-pink-500/20 to-pink-600/5"
  }
];

const Portfolio = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section ref={ref} id="portfolio" className="section-padding bg-background">
      <div className="container-premium">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="mb-6">
            Projetos que<br />
            <span className="text-gradient">geram resultados</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Landing pages profissionais para<br className="hidden md:block" />
            diversos segmentos de mercado.
          </p>
        </motion.div>

        {/* Portfolio Grid - Mobile Screenshots */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative"
            >
              {/* Mobile Screenshot Container */}
              <div className="relative aspect-[9/16] rounded-xl md:rounded-2xl overflow-hidden bg-neutral-900 shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                {/* Screenshot Image */}
                <img
                  src={project.image}
                  alt={`${project.name} - ${project.niche}`}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Bottom Gradient for text readability */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                
                {/* Colored accent overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                  {/* Niche Badge */}
                  <motion.span 
                    className="inline-block px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[9px] md:text-[10px] font-semibold uppercase tracking-wider mb-1.5 md:mb-2"
                    initial={false}
                    animate={{ 
                      y: hoveredIndex === index ? 0 : 3,
                      opacity: hoveredIndex === index ? 1 : 0.9
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.niche}
                  </motion.span>
                  
                  {/* Name */}
                  <motion.h3 
                    className="text-white font-semibold text-xs md:text-sm leading-tight"
                    initial={false}
                    animate={{ 
                      y: hoveredIndex === index ? 0 : 3
                    }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                  >
                    {project.name}
                  </motion.h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mt-12 md:mt-16 py-8 border-y border-border/50"
        >
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-gradient">200+</p>
            <p className="text-sm text-muted-foreground mt-1">Projetos entregues</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-gradient">50+</p>
            <p className="text-sm text-muted-foreground mt-1">Segmentos atendidos</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-gradient">98%</p>
            <p className="text-sm text-muted-foreground mt-1">Clientes satisfeitos</p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-12"
        >
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            Quer um site como esses<br className="md:hidden" /> para o seu negócio?
          </p>
          <WhatsAppButton showResponseTime />
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
