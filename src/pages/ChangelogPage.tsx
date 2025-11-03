import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Changelogs from "@/components/Changelogs";
import { useTheme } from "@/providers/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";

export default function ChangelogPage() {
  const [isSystemDark, setIsSystemDark] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const { theme } = useTheme();

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setIsSystemDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const isDark = theme === 'dark' || (theme === 'system' && isSystemDark);

  return (
    <div className="font-sans text-primary min-h-screen w-full relative bg-background flex flex-col">
      {/* Header da página */}
      <header className="bg-background border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </Button>
              </Link>
              <div className="h-6 w-px bg-border"></div>
              <Link to="/" className="flex items-center gap-2">
                <img
                  className="h-8 w-auto"
                  src={
                    isDark
                      ? '/logo-dark.png'
                      : '/logo.png'
                  }
                  alt="Logo da Omniflow - Atendimento Inteligente"
                />
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="outline" className="gap-2 h-10 px-4">
                  <Home className="w-4 h-4" />
                  Início
                </Button>
              </Link>
              <Button variant="default" asChild className="h-10 px-4">
                <a href="https://app.omniflow.chat">
                  Acessar App
                </a>
              </Button>
              <ModeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">
                Início
              </Link>
              <span>/</span>
              <span className="text-primary font-medium">Changelog</span>
            </div>
          </nav>

          {/* Título da página */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-shadow-2xs">
              📋 Changelog
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Acompanhe todas as novidades, melhorias e correções da Omni
              <span className="bg-gradient-to-br from-green-500 to-blue-500 bg-clip-text text-transparent font-semibold">flow</span>
            </p>
            <div className="mt-4 p-4 bg-muted/50 rounded-lg border">
              <p className="text-sm text-muted-foreground mb-3">
                💡 <strong>Dica:</strong> As versões são lançadas conforme necessário, não seguindo um padrão mensal fixo.
                Versões marcadas com badges coloridos indicam releases importantes.
                Clique em cada versão para ver os detalhes completos das mudanças.
              </p>

              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs font-semibold text-muted-foreground mb-2">🎨 Sistema de Cores por Tipo de Versão:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-gradient-to-r from-orange-500 to-red-500"></div>
                    <span className="text-muted-foreground">MAJOR (x.0.x) - Grandes mudanças</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                    <span className="text-muted-foreground">MINOR (3.2.x+) - Novas funcionalidades</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-gradient-to-r from-green-500 to-emerald-500"></div>
                    <span className="text-muted-foreground">PATCH (3.1.x) - Correções e melhorias</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-gradient-to-r from-purple-600 to-pink-600"></div>
                    <span className="text-muted-foreground">FUTURO (4.x.x+) - Versões futuras</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Componente de Changelog */}
          <Changelogs />
        </div>
      </main>

      {/* Footer da página */}
      <footer className="bg-muted/30 border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                className="h-8 w-auto"
                src={
                  isDark
                    ? '/logo-dark.png'
                    : '/logo.png'
                }
                alt="Logo da Omniflow"
              />
              <span className="text-sm text-muted-foreground">
                © 2025 Omniflow. Todos os direitos reservados.
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Início
              </Link>
              <Link to="/termos-de-uso" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Termos de Uso
              </Link>
              <a href="https://app.omniflow.chat" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                App
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
