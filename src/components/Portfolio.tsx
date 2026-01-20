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
    <section ref={ref} id="portfolio" className="py-20 bg-black">
      <div className="container-premium">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-20"
        >
          <p className="text-primary font-medium tracking-widest uppercase text-xs xs:text-sm mb-3 xs:mb-4">
            Nosso Portfólio
          </p>
          <h2 className="text-white mb-4 xs:mb-5 sm:mb-6">
            Projetos que<br />
            <span className="text-gradient">geram resultados</span>
          </h2>
          <p className="text-base xs:text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto">
            Landing pages profissionais para<br className="hidden md:block" />
            diversos segmentos de mercado.
          </p>
        </motion.div>

        {/* Portfolio Grid - Premium Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 md:gap-6">
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
              <div className="relative aspect-[9/16] md:aspect-[3/4] rounded-xl xs:rounded-2xl md:rounded-3xl overflow-hidden">
                {/* Full Bleed Background Image */}
                <img
                  src={project.image}
                  alt={`${project.clientName} - ${project.category}`}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Bottom gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Hover glow effect */}
                <motion.div 
                  className="absolute inset-0 bg-primary/10 pointer-events-none"
                  initial={false}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Bottom Content - Category Pill Only */}
                <div className="absolute bottom-3 left-3 right-3 xs:bottom-4 xs:left-4 xs:right-4 md:bottom-6 md:left-5 md:right-5 text-center">
                  {/* Category Pill */}
                  <motion.span 
                    className="inline-block px-2 py-1 xs:px-3 xs:py-1.5 md:px-4 md:py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[9px] xs:text-[10px] md:text-xs font-semibold tracking-wider"
                    initial={false}
                    animate={{ 
                      scale: hoveredIndex === index ? 1.05 : 1,
                      y: hoveredIndex === index ? -3 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.category}
                  </motion.span>
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
          className="flex flex-wrap items-center justify-center gap-6 xs:gap-8 md:gap-16 mt-10 xs:mt-12 sm:mt-16 md:mt-20 py-6 xs:py-8 border-y border-white/10"
        >
          <div className="text-center">
            <p className="text-2xl xs:text-3xl md:text-4xl font-bold text-gradient">200+</p>
            <p className="text-xs xs:text-sm text-neutral-500 mt-1">Projetos entregues</p>
          </div>
          <div className="text-center">
            <p className="text-2xl xs:text-3xl md:text-4xl font-bold text-gradient">50+</p>
            <p className="text-xs xs:text-sm text-neutral-500 mt-1">Segmentos atendidos</p>
          </div>
          <div className="text-center">
            <p className="text-2xl xs:text-3xl md:text-4xl font-bold text-gradient">98%</p>
            <p className="text-xs xs:text-sm text-neutral-500 mt-1">Clientes satisfeitos</p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-8 xs:mt-10 sm:mt-12 md:mt-16"
        >
          <p className="text-base xs:text-lg md:text-xl text-neutral-400 mb-4 xs:mb-5 sm:mb-6">
            Quer um site como esses<br className="md:hidden" /> para o seu negócio?
          </p>
          <WhatsAppButton showResponseTime />
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
