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
    <footer className="relative overflow-hidden">
      {/* Final CTA Section */}
      <section className="py-20 xs:py-24 md:py-32 px-4 xs:px-6 sm:px-8 bg-black">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="mb-6">
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

      {/* Main Footer - Premium Redesign */}
      <div className="relative bg-gradient-to-b from-black via-[#0a0a0f] to-[#050508]">
        {/* Top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        {/* Subtle glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-[120px] pointer-events-none" />

        <div className="container-premium relative">
          {/* Logo Feature Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="pt-16 xs:pt-20 md:pt-24 pb-12 xs:pb-16 md:pb-20 text-center"
          >
            {/* Large Logo with Glow */}
            <div className="relative inline-block mb-8">
              {/* Glow effect behind logo */}
              <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-primary/30 via-purple-500/20 to-emerald-500/20 scale-150" />
              <img 
                src={logoLandmax} 
                alt="LandMax - Pro Landing Pages" 
                className="relative h-24 xs:h-28 md:h-36 w-auto mx-auto drop-shadow-2xl"
              />
            </div>
            
            <p className="text-lg xs:text-xl text-neutral-400 max-w-md mx-auto">
              Sites profissionais que convertem<br className="hidden xs:block" /> visitantes em clientes.
            </p>
          </motion.div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pb-12 xs:pb-16 md:pb-20 border-t border-white/5 pt-12 xs:pt-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center md:text-left"
            >
              <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-6">
                Contato
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3 justify-center md:justify-start">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-neutral-400">
                    Av. Paulista, 1374<br />
                    São Paulo, SP - Brasil
                  </span>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-neutral-400">(11) 99999-9999</span>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-neutral-400">contato@landmax.com.br</span>
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
              <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-6">
                Horário de Atendimento
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3 justify-center md:justify-start">
                  <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-neutral-400">
                    <p>Segunda a Sexta</p>
                    <p className="font-semibold text-white">9h às 18h</p>
                  </div>
                </div>
                <p className="text-sm text-neutral-500">
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
              <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-6">
                Empresa
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <Building2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-neutral-400">CNPJ: 27.374.139/0001-51</span>
                </div>
                <div className="flex flex-col gap-2">
                  <a href="#" className="text-neutral-400 hover:text-primary transition-colors text-sm">
                    Termos de Uso
                  </a>
                  <a href="#" className="text-neutral-400 hover:text-primary transition-colors text-sm">
                    Política de Privacidade
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-t border-white/5">
            <p className="text-sm text-neutral-500 text-center sm:text-left">
              © {currentYear} LandMax. Todos os direitos reservados.
            </p>
            
            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-sm text-neutral-500 hover:text-primary transition-colors"
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
