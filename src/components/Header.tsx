import { motion } from "framer-motion";
import WhatsAppButton from "./WhatsAppButton";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="container-premium">
        <div className="flex items-center justify-between h-16 md:h-20 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <a href="/" className="text-xl md:text-2xl font-bold text-gradient">
            SitePro
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#portfolio" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Portfólio
            </a>
            <a href="#como-funciona" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Como Funciona
            </a>
            <WhatsAppButton text="Falar no WhatsApp" />
          </nav>

          {/* Mobile - Only CTA button, no menu */}
          <div className="md:hidden">
            <WhatsAppButton text="WhatsApp" />
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
