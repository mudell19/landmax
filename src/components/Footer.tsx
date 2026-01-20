import { motion } from "framer-motion";
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
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comece agora e tenha seu site em <span className="text-gradient">7 dias</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Não perca mais clientes por não ter presença online. 
            Fale conosco agora mesmo.
          </p>
          <WhatsAppButton />
        </motion.div>

        {/* Footer Info */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-border">
          <div>
            <p className="text-2xl font-bold text-gradient mb-2">SitePro</p>
            <p className="text-sm text-muted-foreground">
              Sites profissionais que convertem visitantes em clientes.
            </p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground mb-1">
              Atendimento: Seg a Sex, 9h às 18h
            </p>
            <p className="text-sm text-muted-foreground">
              © {currentYear} SitePro. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
