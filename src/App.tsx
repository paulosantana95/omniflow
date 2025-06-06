import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { messages } from "./i18n/messages";
import { PlanCard } from "./components/PlanCard";
import { SignupForm } from "./components/SignupForm";
import { ContactCard } from "./components/ContactCard";
import { LogIn, Menu, X } from "lucide-react";
import "aos/dist/aos.css";
import AOS from "aos";
import { Button } from "./components/ui/button";
import { useTheme } from "./providers/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import useEmblaCarousel from 'embla-carousel-react';
import { useRef } from 'react';


// Hook para detectar o modo do sistema
function useSystemTheme() {
  const [isDark, setIsDark] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isDark;
}

export default function App() {
  const [locale] = useState("pt-BR");
  const [openForm, setOpenForm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const isSystemDark = useSystemTheme();
  const t = messages[locale as keyof typeof messages];

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const planPrices = ["R$-/mês", "R$-/mês", "R$-/mês"];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Carousel Embla
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const slides = [
    {
      icon: (
        <img src="/bot.png" alt="AI Assistant" className="w-24 h-24 object-contain" />
      ),
      text: t.intro1,
    },
    {
      icon: (
        <img src="/bar-graph.png" alt="AI Assistant" className="w-24 h-24 object-contain" />

      ),
      text: t.intro2,
    },
    {
      icon: (
        <img src="/phone-message.png" alt="AI Assistant" className="w-24 h-24 object-contain" />
      ),
      text: t.intro3,
    },
    {
      icon: (
        <img src="/ai-assistant.png" alt="AI Assistant" className="w-24 h-24 object-contain" />
      ),
      text: "Plataforma que Integra com diversas IA's para tornar seu atendimento mais inteligente.",
    },
  ];

  // Autoplay effect
  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = () => {
      if (!emblaApi) return;
      emblaApi.scrollNext();
    };
    autoplayRef.current = setInterval(autoplay, 4000);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [emblaApi]);

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
    <div className="font-sans text-primary min-h-screen w-full relative">
      <nav className="fixed top-0 left-0 w-full z-50 bg-background flex items-center justify-between shadow-md">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          <div className="text-2xl font-bold cursor-pointer px-4" onClick={scrollToTop}>
            <a href="#start" className="flex items-center gap-2">
              <img
                className="w-56"
                src={
                  theme === 'dark' || (theme === 'system' && isSystemDark)
                    ? '/logo-dark.png'
                    : '/logo.png'
                }
                alt="Logo da Omniflow - Atendimento Inteligente"
              />
            </a>
          </div>
          <div className="md:hidden px-4">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          <div className={`md:flex flex-wrap items-center gap-4 text-primary px-4 ${mobileMenuOpen ? "block absolute top-full left-0 w-full bg-background py-4 shadow-lg z-50" : "hidden md:flex"}`}>
            <a href="#start" className="block cursor-pointer font-semibold text-md hover:text-muted-foreground text-shadow-2xs py-2 md:py-0 text-center">{t.home ?? "Início"}</a>
            <a href="#plans" className="block cursor-pointer font-semibold text-md hover:text-muted-foreground text-shadow-2xs py-2 md:py-0 text-center">{t.plans}</a>
            <a href="#faq" className="block cursor-pointer font-semibold text-md hover:text-muted-foreground text-shadow-2xs py-2 md:py-0 text-center">{t.faq}</a>
            <a href="#contact" className="block cursor-pointer font-semibold text-md hover:text-muted-foreground text-shadow-2xs py-2 md:py-0 text-center">Contato</a>
            <Button variant="outline" className="ml-0 md:ml-8 shadow-md w-full md:w-auto mt-2 md:mt-0">Registrar-se</Button>
            <Button variant="default" asChild className="shadow-md w-full md:w-auto mt-2 md:mt-0">
              <a href="https://app.omniflow.chat">
                <LogIn className="w-4 h-4 mr-2" />
                Entrar
              </a>
            </Button>
            <div className="flex justify-center md:justify-start w-full md:w-auto mt-2 md:mt-0">
              <ModeToggle />
            </div>
          </div>
        </div>
      </nav >

      <div className="pt-6 shadow-md">
        <header id="start" className="bg-background text-center py-16 px-4 md:py-24 text-primary" data-aos="fade-up">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-shadow-lg">
              {t.headline}
            </h1>
            <p className="text-base text-shadow-lg sm:text-lg md:text-xl mb-6">{t.sub}</p>

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
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${selectedIndex === idx ? 'bg-gradient-to-br from-green-500 to-blue-5000 scale-125' : 'bg-muted-foreground/40'}`}
                    onClick={() => emblaApi && emblaApi.scrollTo(idx)}
                    aria-label={`Ir para slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </header>

        <section id="plans" className="bg-muted text-primary py-16 px-4 sm:px-6 text-center shadow-md" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-shadow-2xs">{t.plans}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {t.planTitle.map((title, index) => (
              <PlanCard
                key={index}
                title={title}
                benefits={t.benefits}
                highlight={index === 1 ? t.bestValue : null}
                tryFree={t.tryFree}
                price={planPrices[index]}
                onTry={() => setOpenForm(true)}
                animate={index === 1}
              />
            ))}
          </div>
        </section>

        <section id="integrations" className="bg-background text-primary py-16 px-4 text-center shadow-md sm:px-6" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl font-bold mb-16 text-shadow-2xs">Principais Integrações</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-4 md:gap-8 xl:gap-16 place-items-center max-w-6xl mx-auto">
            <img src="/whatsapp.png" alt="WhatsApp" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain dark:invert" />
            <img src="/telegram.png" alt="Telegram" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain dark:invert" />
            <img src="/email.png" alt="E-mail" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain dark:invert" />
            <img src="/sms.png" alt="SMS" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain dark:invert" />
            <img src="/facebook.png" alt="Facebook" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain dark:invert" />
            <img src="/linkedin.png" alt="LinkedIn" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain dark:invert" />
            <img src="/chatgpt.png" alt="ChatGPT" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain dark:invert" />
            <img src="/google.png" alt="Google" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain dark:invert" />
            <img src="/tik-tok.png" alt="TikTok" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain dark:invert" />
          </div>
        </section>

        <section id="faq" className="bg-muted text-primary py-16 px-4 shadow-md sm:px-6" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-shadow-2xs">{t.faq}</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <details className="bg-background p-4 rounded shadow">
              <summary className="cursor-pointer font-semibold">{t.faq1}</summary>
              <p className="mt-2">{t.faq1desc}</p>
            </details>
            <details className="bg-background p-4 rounded shadow">
              <summary className="cursor-pointer font-semibold">{t.faq2}</summary>
              <p className="mt-2">{t.faq2desc}</p>
            </details>
          </div>
        </section>

        <section id="contact" className=" bg-background text-primary py-16 px-4 shadow-md sm:px-6" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-shadow-2xs">
            Ficou interessado e quer sabre o Omni
            <span className="bg-gradient-to-br from-green-500 to-blue-500 bg-clip-text text-transparent">flow</span> ?
          </h2>
          <div className="max-w-3xl mx-auto">
            <ContactCard />
          </div>
        </section>

        {/* <section id="tutorials" className="bg-muted text-primary py-16 px-4 shadow-md sm:px-6" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">{t.tutorials}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <iframe
              className="w-full aspect-video rounded shadow"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Tutorial 1"
              allowFullScreen
            ></iframe>
            <iframe
              className="w-full aspect-video rounded shadow"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Tutorial 2"
              allowFullScreen
            ></iframe>
          </div>
        </section> */}
        <div className="w-full h-1 rounded-full bg-gradient-to-br from-green-500 to-blue-500" />
        <footer className="bg-primary-foreground text-primary py-10 text-center text-sm shadow-md">
          <p>© {new Date().getFullYear()} <span className="font-bold">Omniflow</span> – Todos os direitos reservados.</p>
          <p className="mt-2">Feito com ❤️ para empresas que valorizam atendimento de qualidade.</p>
        </footer>

        <Dialog open={openForm} onOpenChange={setOpenForm}>
          <DialogContent className="bg-white text-black max-w-md">
            <DialogHeader>
              <DialogTitle>{t.tryFree}</DialogTitle>
            </DialogHeader>
            <SignupForm onCancel={() => setOpenForm(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 bg-purple-700 text-white rounded-full shadow-lg hover:bg-purple-600 transition"
        aria-label="Voltar ao topo"
      >
        ↑
      </button> */}
    </div >
  );
}