import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Como funciona o processo de criação?",
    answer: "É simples: você entra em contato pelo WhatsApp, conversamos sobre seu negócio e objetivos, desenvolvemos seu site em até 7 dias e você só paga após aprovar o resultado final."
  },
  {
    question: "Por que o preço é tão acessível?",
    answer: "Otimizamos nosso processo de criação para entregar qualidade com eficiência. Trabalhamos com templates premium personalizados que permitem entregar resultados profissionais em menos tempo."
  },
  {
    question: "O que está incluso no valor de R$ 490?",
    answer: "Design exclusivo e responsivo, até 5 páginas, otimização SEO básica, integração com WhatsApp, formulário de contato, hospedagem do primeiro ano gratuita e 30 dias de suporte."
  },
  {
    question: "E se eu não gostar do resultado?",
    answer: "Você não paga! Oferecemos até 3 rodadas de ajustes para garantir sua satisfação. Se mesmo assim não aprovar, cancelamos sem custo algum."
  },
  {
    question: "Preciso fornecer as imagens e textos?",
    answer: "Não necessariamente. Podemos trabalhar com bancos de imagens profissionais e criar textos persuasivos para seu negócio. Caso tenha material próprio, é ainda melhor!"
  },
  {
    question: "Como é feito o pagamento?",
    answer: "Somente após a entrega e aprovação do projeto. Aceitamos PIX, cartão de crédito (até 3x sem juros) ou boleto bancário."
  },
  {
    question: "Vocês fazem manutenção do site depois?",
    answer: "Sim! Oferecemos planos mensais de manutenção a partir de R$ 97/mês, que incluem atualizações, backups e suporte técnico contínuo."
  },
  {
    question: "O site é meu ou preciso pagar mensalidade?",
    answer: "O site é 100% seu! Após a entrega, você tem propriedade total. A única mensalidade é a hospedagem (a partir de R$ 29/mês após o primeiro ano gratuito)."
  }
];

const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-gradient-dark">
      <div className="container-premium">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="mb-4">
              Perguntas <span className="text-gradient">frequentes</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Tire suas dúvidas sobre nosso serviço de criação de sites.
            </p>
          </motion.div>

          {/* FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/50"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-5">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
