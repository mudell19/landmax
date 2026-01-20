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
          className="text-center mb-20"
        >
          <h2 className="mb-6">
            Projetos que <span className="text-gradient">geram resultados</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conheça alguns dos sites e landing pages que criamos para nossos clientes em diversos segmentos.
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <div className="px-4 py-2 rounded-full bg-primary/90 backdrop-blur-sm border border-primary-foreground/20">
                    <span className="text-xs font-bold text-primary-foreground uppercase tracking-wider">
                      {project.niche}
                    </span>
                  </div>
                </div>
                
                {/* Company Name */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white">{project.name}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-xl text-muted-foreground mb-6">
            Quer um site como esses para o seu negócio?
          </p>
          <WhatsAppButton />
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
