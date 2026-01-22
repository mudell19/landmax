import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

// Testimonial avatars
import pedroAvatar from "@/assets/testimonials/pedro.jpg";
import fernandaAvatar from "@/assets/testimonials/fernanda.jpg";
import carlosAvatar from "@/assets/testimonials/carlos.jpg";

const testimonials = [
  {
    name: "Pedro Henrique",
    role: "Infoprodutos",
    content: "Sinceramente? Eu duvidei que entregariam em 24 horas. Mas cumpriram. Eu precisava do site urgente pra rodar tráfego pago e não podia esperar 30 dias com agência tradicional. O site tá voando de rápido e a conversão dos anúncios melhorou na hora. Recomendo pra quem quer resultado e não enrolação.",
    date: "há 2 dias",
    avatar: pedroAvatar
  },
  {
    name: "Dra. Fernanda S.",
    role: "Harmonização Facial",
    content: "Meu Instagram era lindo, mas meu site antigo era uma vergonha. Eu perdia clientes high-ticket por isso. A equipe reformulou tudo. Ficou clean, chique e muito fácil de usar no celular. Hoje quando mando o link no WhatsApp, o cliente já sente firmeza. O investimento se pagou na primeira semana.",
    date: "há 5 dias",
    avatar: fernandaAvatar
  },
  {
    name: "Carlos Eduardo",
    role: "Engenharia e Reformas",
    content: "Eu não entendo nada de programação e nem quero entender. Só queria um portfólio pra mostrar minhas obras. O pessoal da LandMax resolveu tudo: domínio, hospedagem, e-mail. Eu só mandei as fotos pelo Zap e aprovei. Serviço de primeira, sem tecniquês.",
    date: "há 1 semana",
    avatar: carlosAvatar
  }
];

// Google 'G' Logo Component
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 xs:w-6 xs:h-6">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      ref={ref} 
      className="py-20 px-4 xs:px-6 sm:px-8"
      style={{ backgroundColor: '#F9FAFB' }}
    >
      <div className="container-premium">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 xs:mb-12 sm:mb-16"
        >
          <h2 className="text-gray-900 mb-4 xs:mb-5 sm:mb-6">
            Avaliações de quem<br />
            <span className="text-gradient">contratou</span>
          </h2>
          <p className="text-base xs:text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Veja o que nossos clientes dizem<br className="hidden md:block" />
            sobre a experiência com a LandMax.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl xs:rounded-2xl p-5 xs:p-6 sm:p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {/* Header: Google Icon + Date */}
              <div className="flex items-start justify-between mb-3 xs:mb-4">
                <GoogleIcon />
                <span className="text-xs xs:text-sm text-gray-400">{testimonial.date}</span>
              </div>
              
              {/* Stars */}
              <div className="flex gap-0.5 xs:gap-1 mb-4 xs:mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="h-4 w-4 xs:h-5 xs:w-5 fill-amber-400 text-amber-400" 
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 text-sm xs:text-base leading-relaxed mb-5 xs:mb-6">
                "{testimonial.content}"
              </p>

              {/* Author with Avatar */}
              <div className="flex items-center gap-3">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-10 h-10 xs:w-12 xs:h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-gray-900 text-sm xs:text-base">{testimonial.name}</p>
                  <p className="text-gray-500 text-xs xs:text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
