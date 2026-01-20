import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
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
    niche: "Advocacia"
  },
  {
    image: clinicaImg,
    name: "Clínica VidaSaúde",
    niche: "Clínica Médica"
  },
  {
    image: dentistaImg,
    name: "Sorriso Perfeito",
    niche: "Odontologia"
  },
  {
    image: arquiteturaImg,
    name: "Studio Arqdesign",
    niche: "Arquitetura"
  },
  {
    image: imobiliariaImg,
    name: "Prime Imóveis",
    niche: "Imobiliária"
  },
  {
    image: infoprodutoImg,
    name: "Método Acelerador",
    niche: "Infoproduto"
  },
  {
    image: suplementoImg,
    name: "NutriFit Pro",
    niche: "Suplementos"
  },
  {
    image: energiaSolarImg,
    name: "SolarTech Brasil",
    niche: "Energia Solar"
  },
  {
    image: segurancaImg,
    name: "ProtegMax",
    niche: "Segurança"
  },
  {
    image: esteticaImg,
    name: "Beleza Sublime",
    niche: "Estética"
  }
];

const Portfolio = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="portfolio" className="section-padding section-light">
      <div className="container-premium">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="mb-6">
            Projetos que<br />
            <span className="text-gradient">geram resultados</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Conheça alguns dos sites que<br className="hidden md:block" />
            criamos para nossos clientes.
          </p>
        </motion.div>

        {/* Portfolio Grid - Clean iPhone mockup style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="group flex flex-col items-center"
            >
              {/* iPhone Mockup - Clean floating design */}
              <div className="relative w-full max-w-[260px] mx-auto">
                {/* Phone Shadow */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-black/20 rounded-full blur-xl" />
                
                {/* Phone Frame */}
                <div className="relative bg-[#1a1a1a] rounded-[2.5rem] p-[10px] shadow-2xl">
                  {/* Dynamic Island */}
                  <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-20" />
                  
                  {/* Screen Container */}
                  <div className="relative rounded-[2rem] overflow-hidden bg-black">
                    {/* Screen Content - Mobile aspect ratio */}
                    <div className="relative aspect-[9/19.5]">
                      <img
                        src={project.image}
                        alt={`${project.name} - ${project.niche}`}
                        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  
                  {/* Home Indicator */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/30 rounded-full" />
                </div>
              </div>

              {/* Project Info - Clean minimal style below phone */}
              <div className="mt-6 text-center">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
                  {project.niche}
                </span>
                <h3 className="text-lg font-bold text-foreground">{project.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12 md:mt-16"
        >
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            Quer um site como esses para o seu negócio?
          </p>
          <WhatsAppButton showResponseTime />
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
