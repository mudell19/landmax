import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

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
    description: "Landing page para captação de clientes em direito trabalhista e previdenciário."
  },
  {
    image: clinicaImg,
    name: "Clínica VidaSaúde",
    niche: "Clínica Médica",
    description: "Site institucional com agendamento online para clínica multidisciplinar."
  },
  {
    image: dentistaImg,
    name: "Sorriso Perfeito",
    niche: "Odontologia",
    description: "Landing page focada em tratamentos estéticos e implantes dentários."
  },
  {
    image: arquiteturaImg,
    name: "Studio Arqdesign",
    niche: "Arquitetura",
    description: "Portfólio digital para escritório de arquitetura e design de interiores."
  },
  {
    image: imobiliariaImg,
    name: "Prime Imóveis",
    niche: "Imobiliária",
    description: "Catálogo de imóveis com filtros avançados e integração WhatsApp."
  },
  {
    image: infoprodutoImg,
    name: "Método Acelerador",
    niche: "Infoproduto",
    description: "Página de vendas de alta conversão para curso de marketing digital."
  },
  {
    image: suplementoImg,
    name: "NutriFit Pro",
    niche: "Suplementos",
    description: "E-commerce de suplementos com checkout otimizado e upsells."
  },
  {
    image: energiaSolarImg,
    name: "SolarTech Brasil",
    niche: "Energia Solar",
    description: "Landing page com calculadora de economia para instalação fotovoltaica."
  },
  {
    image: segurancaImg,
    name: "ProtegMax",
    niche: "Segurança Eletrônica",
    description: "Site para empresa de CFTV, alarmes e monitoramento 24h."
  },
  {
    image: esteticaImg,
    name: "Beleza Sublime",
    niche: "Estética",
    description: "Landing page para clínica de estética com foco em harmonização facial."
  }
];

const Portfolio = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section ref={ref} id="portfolio" className="section-padding">
      <div className="container-premium">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">
            Projetos que <span className="text-gradient">geram resultados</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça alguns dos sites e landing pages que criamos para nossos clientes em diversos segmentos.
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative rounded-2xl overflow-hidden bg-card border border-border card-hover cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-90' : 'opacity-0'}`} />
                
                {/* Hover Content */}
                <motion.div
                  initial={false}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0, y: hoveredIndex === index ? 0 : 20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-end p-6"
                >
                  <div>
                    <p className="text-sm font-medium text-primary mb-2">{project.niche}</p>
                    <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </div>
                </motion.div>
              </div>

              {/* Badge */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-border text-xs font-medium">
                {project.niche}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
