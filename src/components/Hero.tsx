import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";
import { useEffect, useState, useRef } from "react";
import heroVideo from "@/assets/hero-video.mp4";
import heroPoster from "@/assets/hero-poster.webp";
import heroMobileBg from "@/assets/hero-mobile-bg.webp";

// Animated counter hook
const useCounter = (end: number, duration: number = 2000, startCounting: boolean = true) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;
    
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, startCounting]);

  return count;
};

const Hero = () => {
  const projectCount = useCounter(600, 2000);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay foi impedido (Low Power Mode).
          // O vídeo ficará pausado no 'poster'.
          console.log('Autoplay bloqueado pelo modo de economia de energia.');
        });
      }
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden section-padding pt-20 xs:pt-24 pb-20">
      {/* Mobile Background Image */}
      <img
        src={heroMobileBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover sm:hidden"
        style={{ objectPosition: 'center 10%' }}
      />
      
      {/* Desktop Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={heroPoster}
        className="absolute inset-0 w-full h-full object-cover hidden sm:block"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      
      {/* Subtle dark overlay - desktop only */}
      <div className="absolute inset-0 bg-black/15 hidden sm:block" />
      

      <div className="container-premium relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge with animated counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md mb-6 xs:mb-8 shadow-lg"
          >
            <Zap className="h-3.5 w-3.5 xs:h-4 xs:w-4 text-primary" />
            <span className="text-xs xs:text-sm font-medium text-white/90">
              +{projectCount} projetos entregues com sucesso
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4 xs:mb-5 sm:mb-6"
          >
            <span className="hero-text-shadow">Seu site profissional</span><br />
            <span className="text-gradient-hero">pronto em 24 horas</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base xs:text-lg sm:text-xl md:text-2xl text-white/80 mb-6 xs:mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed hero-text-shadow-lg"
          >
            Landing pages de alta conversão que transformam visitantes em clientes. <span className="text-white font-semibold">Pague somente na entrega.</span>
          </motion.p>

          {/* Price Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6 xs:mb-8"
          >
            <div className="inline-flex flex-col items-center gap-2 xs:gap-3 p-5 xs:p-6 sm:p-8 rounded-2xl xs:rounded-3xl bg-black/70 border border-white/10 backdrop-blur-xl shadow-2xl">
              <span className="text-xs xs:text-sm text-white/70 uppercase tracking-wider">Investimento único</span>
              <div className="flex items-baseline gap-0.5 xs:gap-1">
                <span className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold text-gradient">R$ 490</span>
                <span className="text-lg xs:text-xl sm:text-2xl text-white/60">,00</span>
              </div>
              <div className="text-sm xs:text-base text-white/70 mt-1 text-center leading-relaxed">
                + 1 ano de Domínio e Hospedagem<br />
                <span className="text-primary font-semibold">Grátis</span>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center gap-3"
          >
            <WhatsAppButton />
            <span className="text-sm xs:text-base font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Resposta em até 5 minutos
            </span>
          </motion.div>

        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
