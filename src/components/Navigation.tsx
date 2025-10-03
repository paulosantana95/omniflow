import { useState } from "react";
import { LogIn, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { messages } from "@/i18n/messages";
import { Link } from "react-router-dom";

interface NavigationProps {
  scrollToSection: (sectionId: string) => void;
  setOpenForm: (open: boolean) => void;
  isSystemDark: boolean;
}

export default function Navigation({ scrollToSection, setOpenForm, isSystemDark }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const [locale] = useState("pt-BR");
  const t = messages[locale as keyof typeof messages];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigation = (sectionId: string) => {
    scrollToSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background flex items-center justify-between shadow-md">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <div className="text-2xl font-bold cursor-pointer px-4" onClick={scrollToTop}>
          <button onClick={() => scrollToSection('start')} className="flex items-center gap-2">
            <img
              className="w-56"
              src={
                theme === 'dark' || (theme === 'system' && isSystemDark)
                  ? '/logo-dark.png'
                  : '/logo.png'
              }
              alt="Logo da Omniflow - Atendimento Inteligente"
            />
          </button>
        </div>

        <div className="md:hidden px-4">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div className={`md:flex flex-wrap items-center gap-4 text-primary px-4 ${mobileMenuOpen ? "block absolute top-full left-0 w-full bg-background py-4 shadow-lg z-50" : "hidden md:flex"}`}>
          <button onClick={() => handleNavigation('start')} className="block cursor-pointer font-semibold text-md hover:text-muted-foreground text-shadow-2xs py-2 md:py-0 text-center">
            {t.home ?? "Início"}
          </button>
          <button onClick={() => handleNavigation('plans')} className="block cursor-pointer font-semibold text-md hover:text-muted-foreground text-shadow-2xs py-2 md:py-0 text-center">
            {t.plans}
          </button>
          <button onClick={() => handleNavigation('faq')} className="block cursor-pointer font-semibold text-md hover:text-muted-foreground text-shadow-2xs py-2 md:py-0 text-center">
            FAQ
          </button>
          <button onClick={() => handleNavigation('contact')} className="block cursor-pointer font-semibold text-md hover:text-muted-foreground text-shadow-2xs py-2 md:py-0 text-center">
            Contato
          </button>
          <Link to="/changelog" className="block cursor-pointer font-semibold text-md hover:text-muted-foreground text-shadow-2xs py-2 md:py-0 text-center">
            Changelog
          </Link>
          <Button variant="outline" className="ml-0 md:ml-8 shadow-md w-full md:w-auto mt-2 md:mt-0 cursor-pointer" onClick={() => setOpenForm(true)}>
            Registrar-se
          </Button>
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
    </nav>
  );
}
