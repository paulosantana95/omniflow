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

export default function App() {
  const [locale, setLocale] = useState("pt-BR");
  const [openForm, setOpenForm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = messages[locale as keyof typeof messages];

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const planPrices = ["R$79/mês", "R$469/mês", "R$999/mês"];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="font-sans text-primary min-h-screen w-full relative bg-gray-100 shadow-xl">
      <nav className="p-4 flex items-center justify-between">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          <div className="text-2xl font-bold cursor-pointer px-4" onClick={scrollToTop}>
            <a href="#start" className="flex items-center gap-2">
              <img className="w-56" src="/logo.png" alt="" />
            </a>
          </div>
          <div className="md:hidden px-4">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          <div className={`md:flex flex-wrap items-center gap-4 text-primary px-4 ${mobileMenuOpen ? "block mt-4" : "hidden md:flex"}`}>
            <a href="#start" className="block cursor-pointer font-semibold text-md hover:text-muted-foreground">{t.home ?? "Início"}</a>
            <a href="#plans" className="block cursor-pointer font-semibold text-md hover:text-muted-foreground">{t.plans}</a>
            <a href="#faq" className="block cursor-pointer font-semibold text-md hover:text-muted-foreground">{t.faq}</a>
            <a href="#contact" className="block cursor-pointer font-semibold text-md hover:text-muted-foreground">Contato</a>
            <a href="#tutorials" className="block cursor-pointer font-semibold text-md hover:text-muted-foreground">{t.tutorials}</a>
            {/* <Button variant="default" className="bg-primary">Registrar-se</Button> */}
            <Button variant="default" asChild className="ml-8">
              <a href="https://app.omniflow.chat">
                <LogIn className="w-4 h-4 mr-2" />
                Entrar
              </a>
            </Button>
            <select
              onChange={(e) => setLocale(e.target.value)}
              className=" text-primary pl-2 font-semibold text-md rounded p-1 cursor-pointer"
              defaultValue={locale}
            >
              <option value="pt-BR">🇧🇷</option>
              <option value="en-US">🇺🇸</option>
              <option value="es-ES">🇪🇸</option>
            </select>
          </div>
        </div>
      </nav >

      <div className="pt-2">
        <header id="start" className="text-center py-16 px-4 md:py-24 bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-2xl" data-aos="fade-up">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              {t.headline}
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6">{t.sub}</p>
            <div className="space-y-4 text-base sm:text-lg">
              <p>{t.intro1}</p>
              <p>{t.intro2}</p>
              <p>{t.intro3}</p>
            </div>
          </div>
        </header>

        <section id="plans" className="bg-white text-black py-16 px-4 sm:px-6 text-center" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">{t.plans}</h2>
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

        <section id="faq" className="bg-gray-100 text-black py-16 px-4 sm:px-6" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">{t.faq}</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <details className="bg-white p-4 rounded shadow">
              <summary className="cursor-pointer font-semibold">{t.faq1}</summary>
              <p className="mt-2">{t.faq1desc}</p>
            </details>
            <details className="bg-white p-4 rounded shadow">
              <summary className="cursor-pointer font-semibold">{t.faq2}</summary>
              <p className="mt-2">{t.faq2desc}</p>
            </details>
          </div>
        </section>

        <section id="contact" className=" bg-white text-black py-16 px-4 sm:px-6" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Entre em Contato</h2>
          <div className="max-w-3xl mx-auto">
            <ContactCard />
          </div>
        </section>

        <section id="tutorials" className="bg-gray-100 text-black py-16 px-4 sm:px-6" data-aos="fade-up">
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
        </section>

        <footer className="bg-black text-white py-10 text-center text-sm">
          <p>© {new Date().getFullYear()} <span className="font-bold">OmniFlow</span> – Todos os direitos reservados.</p>
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