import { useState, useEffect, useRef, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { AnimatedTestimonials } from './ui/animated-testimonials';

interface HeroCarouselProps {
  headline: string;
  subtitle: string;
}

export default function HeroCarousel({ headline, subtitle }: HeroCarouselProps) {
  // Carousel Embla
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 20 // Duração da transição em frames (mais suave)
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const slides = [
    {
      icon: (
        <img src="/group.png" alt="Gestão de Leads" className="w-24 h-24 object-contain" />
      ),
      text: "Gerencie seus leads de forma inteligente com CRM integrado, funil de vendas e controle completo do processo comercial.",
    },
    {
      icon: (
        <img src="/chat.png" alt="Campanhas e Marketing" className="w-24 h-24 object-contain" />
      ),
      text: "Crie campanhas de marketing automatizadas e envie mensagens em massa segmentadas para ampliar seu alcance.",
    },
    {
      icon: (
        <img src="/bot.png" alt="AI Assistant" className="w-24 h-24 object-contain" />
      ),
      text: "Nosso sistema multicanal conecta seus clientes com múltiplos atendentes pelo mesmo canal, com fluxo de bots operando 24h. Agilize o suporte, aumente a satisfação e converta mais!",
    },
    {
      icon: (
        <img src="/bar-graph.png" alt="Relatórios e Métricas" className="w-24 h-24 object-contain" />
      ),
      text: "Com nossa plataforma você centraliza seus atendimentos com métricas e relatórios completos, além de possibilitar integrações para automação de processos.",
    },
    {
      icon: (
        <img src="/phone-message.png" alt="Multicanal" className="w-24 h-24 object-contain" />
      ),
      text: "Ideal para qualquer tipo de empresa que busca qualidade e rastreabilidade no atendimento, seja por WhatsApp, Telegram, Instagram ou outros canais.",
    },
    {
      icon: (
        <img src="/ai-assistant.png" alt="AI Assistant" className="w-24 h-24 object-contain" />
      ),
      text: "Plataforma que Integra com diversas IA's para tornar seu atendimento mais inteligente.",
    },
  ];

  // Função para resetar o timer
  const resetAutoplay = useCallback(() => {
    // Limpar qualquer timer existente
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }

    if (!emblaApi) return;

    const autoplay = () => {
      if (!emblaApi) return;
      emblaApi.scrollNext();
    };

    // Configurar para 8 segundos - tempo adequado para leitura
    autoplayRef.current = setInterval(autoplay, 8000);
  }, [emblaApi]);

  // Autoplay effect
  useEffect(() => {
    if (!emblaApi) return;
    resetAutoplay();

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [emblaApi, resetAutoplay]);

  // Update selected index for dots
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <header id="start" className="bg-background text-center py-16 px-4 md:py-24 text-primary" data-aos="fade-up">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-shadow-lg">
          {headline}
        </h1>
        <p className="text-base text-shadow-lg sm:text-lg md:text-xl mb-6">{subtitle}</p>

        {/* Carousel de anúncios com Embla */}
        <div className="max-w-2xl mx-auto mt-12">
          <div className="overflow-hidden pb-2" ref={emblaRef}>
            <div className="flex">
              {slides.map((slide, idx) => (
                <div
                  className="min-w-0 flex-[0_0_100%] flex justify-center"
                  key={idx}
                >
                  <div className="bg-muted rounded-2xl p-12 shadow-lg flex flex-col items-center max-w-md w-full border-1 gap-4">
                    <span className="text-primary">{slide.icon}</span>
                    <div className="w-32 h-0.5 rounded-full bg-gradient-to-br from-green-500 to-blue-500 my-4" />
                    <span className="text-center text-lg font-medium text-primary">{slide.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Bolinhas de paginação */}
          <div className="flex justify-center gap-2 mt-4">
            {slides.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${selectedIndex === idx ? 'bg-green-500 scale-125' : 'bg-muted-foreground/30'} cursor-pointer`}
                onClick={() => {
                  if (emblaApi) {
                    emblaApi.scrollTo(idx);
                    // Resetar o timer quando houver seleção manual
                    resetAutoplay();
                  }
                }}
                aria-label={`Ir para slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
