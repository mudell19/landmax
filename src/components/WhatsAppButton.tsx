import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "./ui/button";

interface WhatsAppButtonProps {
  floating?: boolean;
  className?: string;
  text?: string;
}

const WhatsAppButton = ({ floating = false, className = "", text = "SOLICITAR SITE EM 2 DIAS" }: WhatsAppButtonProps) => {
  const whatsappNumber = "5511999999999"; // Replace with actual number
  const message = encodeURIComponent("Olá! Tenho interesse em criar um site profissional. Podemos conversar?");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  if (floating) {
    return (
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-whatsapp rounded-full animate-ping opacity-30" />
          <Button
            variant="whatsapp"
            size="xl"
            className="rounded-full h-16 w-16 p-0 shadow-2xl"
          >
            <MessageCircle className="h-7 w-7" />
          </Button>
        </div>
      </motion.a>
    );
  }

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button variant="whatsapp" size="xl" className="w-full sm:w-auto gap-3">
        <MessageCircle className="h-5 w-5" />
        {text}
      </Button>
    </motion.a>
  );
};

export default WhatsAppButton;
