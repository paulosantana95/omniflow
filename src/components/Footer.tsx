import { useTheme } from "@/providers/theme-provider";
import { Link } from "react-router-dom";

interface FooterProps {
  scrollToSection: (sectionId: string) => void;
  isSystemDark: boolean;
}

export default function Footer({ scrollToSection, isSystemDark }: FooterProps) {
  const { theme } = useTheme();

  return (
    <>
      <div className="w-full h-1 rounded-full bg-gradient-to-br from-green-500 to-blue-500" />
      <footer className="bg-primary-foreground text-primary py-10 px-4 text-sm shadow-md border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <button onClick={() => scrollToSection('start')} className="flex items-center gap-2 cursor-pointer">
            <img
              src={
                theme === 'dark' || (theme === 'system' && isSystemDark)
                  ? '/logo-dark.png'
                  : '/logo.png'
              }
              alt="Omniflow"
              className="w-28 h-auto"
            />
            <span className="font-bold text-base hidden">Omniflow</span>
          </button>
          <nav className="flex flex-wrap gap-4 text-muted-foreground">
            <button onClick={() => scrollToSection('start')} className="hover:text-primary transition">
              Inicio
            </button>
            <button onClick={() => scrollToSection('plans')} className="hover:text-primary transition">
              Planos
            </button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-primary transition">
              FAQ
            </button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-primary transition">
              Contato
            </button>
            <a href="/privacidade" className="hover:text-primary transition">
              Privacidade
            </a>
            <Link to="/termos-de-uso" target="_blank" className="hover:text-primary transition">
              Termos
            </Link>
          </nav>
          <div className="flex gap-3">
            <a href="https://wa.me/558597095694" target="_blank" rel="noopener" aria-label="WhatsApp">
              <img src="/whatsapp.png" alt="WhatsApp" className="w-6 h-6 object-contain dark:invert" />
            </a>
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Omni<span className="bg-gradient-to-br from-green-500 to-blue-500 bg-clip-text text-transparent">flow</span> – Todos os direitos reservados.
        </div>
      </footer>
    </>
  );
}
