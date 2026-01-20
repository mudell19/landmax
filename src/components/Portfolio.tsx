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
    clientName: "Ribeiro & Associados",
    category: "ADVOCACIA",
    title: "Presença Digital Premium"
  },
  {
    image: clinicaImg,
    clientName: "Clínica VidaSaúde",
    category: "CLÍNICA MÉDICA",
    title: "Cuidado & Confiança"
  },
  {
    image: dentistaImg,
    clientName: "Sorriso Perfeito",
    category: "ODONTOLOGIA",
    title: "Sorrisos Transformados"
  },
  {
    image: arquiteturaImg,
    clientName: "Studio Arqdesign",
    category: "ARQUITETURA",
    title: "Projetos que Inspiram"
  },
  {
    image: imobiliariaImg,
    clientName: "Prime Imóveis",
    category: "IMOBILIÁRIA",
    title: "Venda com Elegância"
  },
  {
    image: infoprodutoImg,
    clientName: "Método Acelerador",
    category: "INFOPRODUTO",
    title: "Conversão Máxima"
  },
  {
    image: suplementoImg,
    clientName: "NutriFit Pro",
    category: "SUPLEMENTOS",
    title: "Resultados Reais"
  },
  {
    image: energiaSolarImg,
    clientName: "SolarTech Brasil",
    category: "ENERGIA SOLAR",
    title: "Futuro Sustentável"
  },
  {
    image: segurancaImg,
    clientName: "ProtegMax",
    category: "SEGURANÇA",
    title: "Proteção Total"
  },
  {
    image: esteticaImg,
    clientName: "Beleza Sublime",
    category: "ESTÉTICA",
    title: "Beleza Transformadora"
  }
];

const Portfolio = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section ref={ref} id="portfolio" className="section-padding bg-black">
      <div className="container-premium">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
            Nosso Portfólio
          </p>
          <h2 className="text-white mb-6">
            Projetos que<br />
            <span className="text-gradient">geram resultados</span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto">
            Landing pages profissionais para<br className="hidden md:block" />
            diversos segmentos de mercado.
          </p>
        </motion.div>

        {/* Portfolio Grid - Premium Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.clientName}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative cursor-pointer"
            >
              {/* Card Container - Full Bleed Image */}
              <div className="relative aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden">
                {/* Full Bleed Background Image */}
                <img
                  src={project.image}
                  alt={`${project.clientName} - ${project.category}`}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Dark gradient overlays for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />
                
                {/* Subtle vignette effect */}
                <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.4)]" />
                
                {/* Hover glow effect */}
                <motion.div 
                  className="absolute inset-0 bg-primary/10 pointer-events-none"
                  initial={false}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Top Left Content - Category & Client Name */}
                <div className="absolute top-4 left-4 md:top-5 md:left-5">
                  <motion.p 
                    className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-white/80 mb-1"
                    initial={false}
                    animate={{ 
                      y: hoveredIndex === index ? 0 : -5,
                      opacity: hoveredIndex === index ? 1 : 0.7
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.category}
                  </motion.p>
                  <motion.p 
                    className="text-xs md:text-sm font-medium text-white"
                    initial={false}
                    animate={{ 
                      y: hoveredIndex === index ? 0 : -3,
                      opacity: hoveredIndex === index ? 1 : 0.9
                    }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                  >
                    {project.clientName}
                  </motion.p>
                </div>

                {/* Bottom Content - Pill Tag & Title */}
                <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-5 md:right-5 text-center">
                  {/* Category Pill */}
                  <motion.span 
                    className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[9px] md:text-[10px] font-semibold tracking-wider mb-2 md:mb-3"
                    initial={false}
                    animate={{ 
                      scale: hoveredIndex === index ? 1.05 : 1,
                      y: hoveredIndex === index ? -3 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.category}
                  </motion.span>
                  
                  {/* Serif Title */}
                  <motion.h3 
                    className="text-white font-serif text-base md:text-lg lg:text-xl font-medium leading-tight italic"
                    style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                    initial={false}
                    animate={{ 
                      y: hoveredIndex === index ? -2 : 0
                    }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                  >
                    {project.title}
                  </motion.h3>
                </div>

                {/* Corner accent on hover */}
                <motion.div 
                  className="absolute top-0 right-0 w-20 h-20 md:w-24 md:h-24 pointer-events-none"
                  initial={false}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary/30 to-transparent" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mt-16 md:mt-20 py-8 border-y border-white/10"
        >
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-gradient">200+</p>
            <p className="text-sm text-neutral-500 mt-1">Projetos entregues</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-gradient">50+</p>
            <p className="text-sm text-neutral-500 mt-1">Segmentos atendidos</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-gradient">98%</p>
            <p className="text-sm text-neutral-500 mt-1">Clientes satisfeitos</p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-12 md:mt-16"
        >
          <p className="text-lg md:text-xl text-neutral-400 mb-6">
            Quer um site como esses<br className="md:hidden" /> para o seu negócio?
          </p>
          <WhatsAppButton showResponseTime />
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
