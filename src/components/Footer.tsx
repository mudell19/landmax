import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Building2, ArrowUp } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";
import logoLandmax from "@/assets/logo-landmax.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-background">
      {/* Final CTA Section */}
      <section className="section-padding bg-background">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-foreground mb-6">
              Comece agora e tenha seu site em <span className="text-gradient">24 horas</span>
            </h2>
            <p className="text-lg xs:text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
              Não perca mais clientes por não ter presença online. 
              Fale conosco agora mesmo.
            </p>
            <WhatsAppButton />
          </motion.div>
        </div>
      </section>

      {/* Main Footer */}
      <div className="relative bg-background">
        {/* Top border with gradient glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        
        {/* Subtle radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[150px] pointer-events-none" />

        <div className="container-premium relative section-padding">
          {/* Logo Feature Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-20"
          >
            {/* Logo with glow effect */}
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 blur-3xl bg-primary/20 scale-150" />
              <img 
                src={logoLandmax} 
                alt="LandMax - Pro Landing Pages" 
                className="relative h-20 xs:h-24 md:h-32 w-auto mx-auto"
              />
            </div>
            
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Sites profissionais que convertem visitantes em clientes.
            </p>
          </motion.div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 pb-16 md:pb-20 border-t border-border pt-12 md:pt-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center md:text-left"
            >
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-6">
                Contato
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3 justify-center md:justify-start">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Av. Paulista, 1374<br />
                    São Paulo, SP - Brasil
                  </span>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">(11) 99999-9999</span>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">contato@landmax.com.br</span>
                </div>
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center md:text-left"
            >
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-6">
                Horário de Atendimento
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3 justify-center md:justify-start">
                  <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-muted-foreground">
                    <p>Segunda a Sexta</p>
                    <p className="font-semibold text-foreground">9h às 18h</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground/70">
                  Respondemos mensagens de WhatsApp em até 2 horas durante o horário comercial.
                </p>
              </div>
            </motion.div>

            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center md:text-left"
            >
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-6">
                Empresa
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <Building2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">CNPJ: 27.374.139/0001-51</span>
                </div>
                <div className="flex flex-col gap-2">
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    Termos de Uso
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    Política de Privacidade
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-t border-border">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              © {currentYear} LandMax. Todos os direitos reservados.
            </p>
            
            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <span>Voltar ao topo</span>
              <ArrowUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
