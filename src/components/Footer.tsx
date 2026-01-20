import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Building2 } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="section-padding border-t border-border">
      <div className="container-premium">
        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="mb-6">
            Comece agora e tenha seu site em <span className="text-gradient">7 dias</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
            Não perca mais clientes por não ter presença online. 
            Fale conosco agora mesmo.
          </p>
          <WhatsAppButton />
        </motion.div>

        {/* Footer Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-border">
          {/* Brand */}
          <div>
            <p className="text-3xl font-bold text-gradient mb-4">SitePro</p>
            <p className="text-muted-foreground text-lg mb-6">
              Sites profissionais que convertem visitantes em clientes.
            </p>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="h-4 w-4 text-primary" />
              <span className="text-sm">CNPJ: 27.374.139/0001-51</span>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6">Contato</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Av. Paulista, 1374<br />
                  São Paulo, SP - Brasil
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">(11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">contato@sitepro.com.br</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-xl font-bold mb-6">Horário de Atendimento</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div className="text-muted-foreground">
                  <p>Segunda a Sexta</p>
                  <p className="font-semibold text-foreground">9h às 18h</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Respondemos mensagens de WhatsApp em até 2 horas durante o horário comercial.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-12 mt-12 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © {currentYear} SitePro. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-primary transition-colors">Política de Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
