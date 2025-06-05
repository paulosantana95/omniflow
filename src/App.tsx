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

export default function App() {
  const [locale, setLocale] = useState("pt-BR");
  const [openForm, setOpenForm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme()
  const t = messages[locale as keyof typeof messages];

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const planPrices = ["R$-/mês", "R$-/mês", "R$-/mês"];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="font-sans text-primary min-h-screen w-full relative">
      <nav className="fixed top-0 left-0 w-full z-50 bg-background flex items-center justify-between shadow-md">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          <div className="text-2xl font-bold cursor-pointer px-4" onClick={scrollToTop}>
            <a href="#start" className="flex items-center gap-2">
              <img className="w-56" src={theme !== 'light' ? '/logo-dark.png' : '/logo.png'} alt="Logo da Omniflow - Atendimento Inteligente" />
            </a>
          </div>
          <div className="md:hidden px-4">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          <div className={`md:flex flex-wrap items-center gap-4 text-primary px-4 ${mobileMenuOpen ? "block mt-4" : "hidden md:flex"}`}>
            <a href="#start" className="block cursor-pointer font-semibold text-md hover:text-muted-foreground text-shadow-2xs">{t.home ?? "Início"}</a>
            <a href="#plans" className="block cursor-pointer font-semibold text-md hover:text-muted-foreground text-shadow-2xs">{t.plans}</a>
            <a href="#faq" className="block cursor-pointer font-semibold text-md hover:text-muted-foreground text-shadow-2xs">{t.faq}</a>
            <a href="#contact" className="block cursor-pointer font-semibold text-md hover:text-muted-foreground text-shadow-2xs">Contato</a>
            <a href="#tutorials" className="block cursor-pointer font-semibold text-md hover:text-muted-foreground text-shadow-2xs">{t.tutorials}</a>
            <Button variant="outline" className="ml-8 shadow-md">Registrar-se</Button>
            <Button variant="default" asChild className="shadow-md">
              <a href="https://app.omniflow.chat">
                <LogIn className="w-4 h-4 mr-2" />
                Entrar
              </a>
            </Button>
            <ModeToggle />
            {/* <select
              onChange={(e) => setLocale(e.target.value)}
              className=" text-primary pl-2 font-semibold text-md rounded p-1 cursor-pointer"
              defaultValue={locale}
            >
              <option value="pt-BR">🇧🇷</option>
              <option value="en-US">🇺🇸</option>
              <option value="es-ES">🇪🇸</option>
            </select> */}
          </div>
        </div>
      </nav >

      <div className="pt-6 shadow-md">
        <header id="start" className="bg-muted text-center py-16 px-4 md:py-24 text-primary" data-aos="fade-up">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-shadow-2xs">
              {t.headline}
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6">{t.sub}</p>
            <div className="space-y-10 text-base sm:text-lg">
              <p>{t.intro1}</p>
              <p>{t.intro2}</p>
              <p>{t.intro3}</p>
              <Button variant="default" size="lg" className="mt-8 cursor-pointer bg-gradient-to-br from-green-500 to-blue-500 text-base shadow-md">Registre-se e teste grátis</Button>
            </div>
          </div>
        </header>

        <section id="plans" className="bg-background text-primary py-16 px-4 sm:px-6 text-center shadow-md" data-aos="fade-up">
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
            Ficou interessado e quer testar o Omni
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

        <footer className="bg-foreground text-muted py-10 text-center text-sm shadow-md">
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