import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { messages } from "@/i18n/messages";
import { PlanCard } from "@/components/PlanCard";
import { SignupForm } from "@/components/SignupForm";
import { ContactCard } from "@/components/ContactCard";
import "aos/dist/aos.css";
import AOS from "aos";
import AffiliationBanner from "@/components/AffiliationBanner";
import Navigation from "@/components/Navigation";
import HeroCarousel from "@/components/HeroCarousel";
import Footer from "@/components/Footer";
import { InfiniteMovingLogos } from "@/components/ui/infinite-moving-logos";
import { useTheme } from "@/providers/theme-provider";

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

export default function LandingPage() {
  const [locale] = useState("pt-BR");
  const [openForm, setOpenForm] = useState(false);
  const isSystemDark = useSystemTheme();
  const { theme } = useTheme();
  const t = messages[locale as keyof typeof messages];

  const isDark = theme === 'dark' || (theme === 'system' && isSystemDark);

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const plans = [
    {
      title: 'Start',
      benefits: [
        '2 Usuários',
        '1 Canal de Atendimento',
        'Armazenamento de 2GB de Dados (10R$ por GB adicional)',
        'Gerenciamento de Grupos (Whatsapp)',
        'Chat bot integrado com IA (Custo da IA não incluso)',
        'Chat Entre Usuários',
        'Relatórios Avançados',
        'Equipes',
        'CRM Integrado com Kanban, Funil de Vendas e Checklist de Tarefas',
        'Campanhas de Marketing ilimitadas',
        'Disparos em massa ilimitados',
      ],
      price: "R$79,90/mês",
      highlight: null,
      tryFree: t.tryFree,
    },
    {
      title: 'Connect',
      benefits: [
        '6 Usuários',
        '3 Canais de Atendimento',
        'Armazenamento de 3GB de Dados (10R$ por GB adicional)',
        'Gerenciamento de Grupos (Whatsapp)',
        'Chat bot integrado com IA (Custo da IA não incluso)',
        'Chat Entre Usuários',
        'Relatórios Avançados',
        'Equipes',
        'CRM Integrado com Kanban, Funil de Vendas e Checklist de Tarefas',
        'Integração com API',
        'Campanhas de Marketing ilimitadas',
        'Disparos em massa ilimitados',
      ],
      price: "R$159,90/mês",
      highlight: null,
      tryFree: t.tryFree,
    },
    {
      title: 'Boost',
      benefits: [
        '12 Usuários',
        '6 Canais de Atendimento',
        'Armazenamento de 5GB de Dados (10R$ por GB adicional)',
        'Gerenciamento de Grupos (Whatsapp)',
        'Chat bot integrado com IA (Custo da IA não incluso)',
        'Chat Entre Usuários',
        'Relatórios Avançados',
        'Equipes',
        'CRM Integrado com Kanban, Funil de Vendas e Checklist de Tarefas',
        'Integração com API',
        'Campanhas de Marketing ilimitadas',
        'Disparos em massa ilimitados',
      ],
      price: "R$299,90/mês",
      highlight: true,
      tryFree: t.tryFree,
    },
  ];

  // Logos dos clientes para o carrossel infinito
  const clientLogos = [
    {
      src: "/clients/neofin-logo.png",
      alt: "Neofin Tecnologia",
      width: 220,
      height: 120,
    },
    {
      src: "/clients/organizee-logo.png",
      alt: "Organizee",
      width: 180,
      height: 140,
    },
    {
      src: isDark ? "/clients/santlabs-logo.svg" : "/clients/santlabs-darklogo.svg",
      alt: "Santlabs",
      width: 220,
      height: 140,
    },
    {
      src: "/clients/neofin-logo.png",
      alt: "Neofin Tecnologia",
      width: 220,
      height: 120,
    },
    {
      src: "/clients/organizee-logo.png",
      alt: "Organizee",
      width: 180,
      height: 140,
    },
    {
      src: isDark ? "/clients/santlabs-logo.svg" : "/clients/santlabs-darklogo.svg",
      alt: "Santlabs",
      width: 220,
      height: 140,
    },
    {
      src: "/clients/neofin-logo.png",
      alt: "Neofin Tecnologia",
      width: 220,
      height: 120,
    },
    {
      src: "/clients/organizee-logo.png",
      alt: "Organizee",
      width: 180,
      height: 140,
    },
    {
      src: isDark ? "/clients/santlabs-logo.svg" : "/clients/santlabs-darklogo.svg",
      alt: "Santlabs",
      width: 220,
      height: 140,
    },
  ];

  // Função para navegar para seções com âncoras
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="font-sans text-primary min-h-screen w-full relative">
      <Navigation
        scrollToSection={scrollToSection}
        isSystemDark={isDark}
      />

      {/* Faixa do Programa de Indicações */}
      <AffiliationBanner scrollToSection={scrollToSection} />

      <div className="pt-6 shadow-md">
      </div>

      <HeroCarousel
        headline={t.headline}
        subtitle={t.sub}
      />

      <section id="discovery" className="bg-muted text-primary py-16 px-4 sm:px-6 shadow-md" data-aos="fade-up">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-8 lg:gap-16 max-w-7xl mx-auto">
          <div className="w-full my-auto lg:w-xl">
            <div>
              <h3 className="text-lg sm:text-xl mb-6 lg:mb-8 text-shadow-2xs underline decoration-green-500 underline-offset-6 decoration-3">
                Conheça
              </h3>
              <h1 className="text-primary font-bold text-shadow-xs mb-4 text-2xl sm:text-3xl">O que é o Omni<span className="bg-gradient-to-br from-green-500 to-blue-500 bg-clip-text text-transparent">flow</span> ?</h1>
              <h2 className="text-base text-shadow-2xs sm:text-lg lg:text-xl">Um sistema completo de chatbots, I.As, automações e gestão de atendimento com multiusuários para WhatsApp e vários outros canais de conversa.</h2>
            </div>
            <div className="mt-8">
              <h3 className="text-sm sm:text-md mb-4 lg:mb-2 text-shadow-xs">
                Concentre todas as suas mensagens
              </h3>
              <h1 className="text-primary text-shadow-2xs font-bold mb-4 text-2xl sm:text-3xl underline decoration-blue-500 underline-offset-2 decoration-5">Múltiplos Canais
                de atendimento</h1>
              <h2 className="text-base text-shadow-2xs sm:text-lg lg:text-xl">API WhatsApp Oficial (WABA), APIs WhatsApp não oficiais (bailyes, webjs, meow, evolution), Hub Notificame (Facebook Messenger, Instagram, Webchat, Email), Telegram.</h2>
            </div>
          </div>
          <div className="w-full my-auto lg:w-xl hidden lg:block">
            <img src="/whatsapp-interface.svg" alt="Omniflow Logo" className="w-150 h-100 mx-auto mb-8" />
          </div>
        </div>


      </section>

      <section id="about" className="bg-background text-primary py-16 px-4 sm:px-6 shadow-md" data-aos="fade-up">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-8 lg:gap-16 max-w-7xl mx-auto">
          <div className="w-full my-auto lg:w-xl hidden lg:block">
            <img src="/omni-arts.svg" alt="Omniflow Logo" className="w-150 h-100 mx-auto mb-8" />
          </div>
          <div>
            <div className="w-full lg:w-xl">
              <div className="my-auto">
                <h3 className="text-lg sm:text-xl mb-4 lg:mb-8 text-shadow-2xs relative inline-block underline decoration-blue-500 underline-offset-6 decoration-3">
                  Solução para seu atendimento
                </h3>
                <h1 className="text-primary font-bold mb-4 text-2xl text-shadow-xs sm:text-3xl">Conquiste e Retenha Mais Clientes</h1>
                <h2 className="text-base sm:text-lg lg:text-xl">O Omni<span className="bg-gradient-to-br from-green-500 to-blue-500 bg-clip-text text-transparent">flow</span> é um sistema avançado que une a gestão de multi-atendimentos com um construtor de chatbots nativo e diversas integrações com ferramentas de automação e I.As.</h2>
              </div>
              <div className="mt-8">
                <h3 className="text-sm sm:text-md mb-4 lg:mb-2 text-shadow-2xs relative inline-block">
                  Integrações Nativas
                </h3>
                <h1 className="text-primary font-bold mb-4 text-2xl sm:text-3xl relative inline-block  underline decoration-green-500 underline-offset-2 decoration-5">Chatbots, Ferramentas de Automação e APIs</h1>
                <h2 className="text-base sm:text-lg lg:text-xl">Integre-se facilmente com aplicativos externos usando nossas APIs e Webhooks, ou aproveite nossas integrações nativas com Typebot, Dify.ai, Chat GPT, LM Studio, Wavoip e vários outros canais de atendimento através do Hub Notificame</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="plans" className="bg-muted text-primary py-16 px-4 sm:px-6 text-center shadow-md" data-aos="fade-up">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-shadow-2xs">{t.plans}</h2>
        <div className="max-w-7xl mx-auto">
          {/* Grid responsivo que se adapta automaticamente */}
          <div className="grid gap-8 min-h-[568px]" style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            justifyItems: 'center'
          }}>
            {plans.map((plan, index) => (
              <div key={index} className="flex justify-center max-w-sm w-full">
                <PlanCard
                  title={plan.title}
                  benefits={plan.benefits}
                  highlight={plan.highlight}
                  buttonTitle={plan.tryFree}
                  price={plan.price}
                  onTry={() => window.open('https://app.omniflow.chat', '_blank')}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Nota sobre período de teste */}
        <div className="mt-12 max-w-[90rem] mx-auto px-4">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800 rounded-lg p-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-left flex-1">
                <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-3">
                  🎯 Período de Teste Gratuito
                </h3>
                <p className="text-base text-green-700 dark:text-green-300 leading-relaxed mb-4">
                  Durante o período de teste, você terá acesso limitado às funcionalidades para avaliar a plataforma:
                  <br />• <strong>7 dias para teste</strong>
                  <br />• Todas as outras funcionalidades disponíveis conforme o plano escolhido
                </p>
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md mb-4">
                  <p className="text-base text-amber-800 dark:text-amber-200">
                    <strong>⚠️ Importante:</strong> Ao exceder o período de teste, será cobrado automaticamente o valor integral da mensalidade do plano escolhido.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                  <p className="text-base text-blue-800 dark:text-blue-200">
                    <strong>📋 Responsabilidade:</strong> A responsabilidade pelo uso do canal é do cliente. O cliente é responsável por garantir o uso adequado e em conformidade com as políticas dos provedores de canal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Clientes */}
      <section id="clients" className="bg-background text-primary py-16 px-4 text-center shadow-md sm:px-6" data-aos="fade-up">
        <h2 className="text-2xl sm:text-3xl font-bold mb-12 text-shadow-2xs">Clientes que confiam na Omni<span className="bg-gradient-to-br from-green-500 to-blue-500 bg-clip-text text-transparent">flow</span></h2>

        <InfiniteMovingLogos
          items={clientLogos}
          direction="left"
          speed="normal"
          pauseOnHover={true}
          className="py-4 mx-auto max-w-[70%]"
        />

        <p className="mt-8 text-base text-muted-foreground">Empresas de diferentes segmentos já utilizam a Omni<span className="bg-gradient-to-br from-green-500 to-blue-500 bg-clip-text text-transparent">flow</span> para potencializar seu atendimento e automação.</p>
      </section>

      <section id="integrations" className="bg-muted text-primary py-16 px-4 text-center shadow-md sm:px-6" data-aos="fade-up">
        <h2 className="text-2xl sm:text-3xl font-bold mb-16 text-shadow-2xs">Principais Integrações</h2>

        {/* Integrações Nativas */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-4 md:gap-8 xl:gap-16 place-items-center">
            {/* Integrações Nativas */}
            <div className="flex flex-col items-center">
              <img src="/whatsapp.png" alt="WhatsApp" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain dark:invert mb-2" />
              <span className="text-sm font-medium">WhatsApp</span>
              <span className="text-xs text-transparent">.</span>
            </div>

            <div className="flex flex-col items-center">
              <img src="/telegram.png" alt="Telegram" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain dark:invert mb-2" />
              <span className="text-sm font-medium">Telegram</span>
              <span className="text-xs text-transparent">.</span>
            </div>

            <div className="flex flex-col items-center">
              <img src="/email.png" alt="E-mail" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain dark:invert mb-2" />
              <span className="text-sm font-medium">E-mail</span>
              <span className="text-xs text-transparent">.</span>
            </div>            {/* Integrações com custos de terceiros */}
            <div className="flex flex-col items-center">
              <img src="/instagram.png" alt="Instagram" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain dark:invert mb-2" />
              <span className="text-sm font-medium">Instagram</span>
              <span className="text-xs text-muted-foreground">*</span>
            </div>

            <div className="flex flex-col items-center">
              <img src="/facebook.png" alt="Facebook" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain dark:invert mb-2" />
              <span className="text-sm font-medium">Messenger</span>
              <span className="text-xs text-muted-foreground">*</span>
            </div>

            <div className="flex flex-col items-center">
              <img src="/linkedin.png" alt="LinkedIn" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain dark:invert mb-2" />
              <span className="text-sm font-medium">LinkedIn</span>
              <span className="text-xs text-muted-foreground">*</span>
            </div>

            <div className="flex flex-col items-center">
              <img src="/chatgpt.png" alt="ChatGPT" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain dark:invert mb-2" />
              <span className="text-sm font-medium">ChatGPT</span>
              <span className="text-xs text-muted-foreground">*</span>
            </div>

            <div className="flex flex-col items-center">
              <img src="/google.png" alt="Google" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain dark:invert mb-2" />
              <span className="text-sm font-medium">Google</span>
              <span className="text-xs text-transparent">.</span>
            </div>
          </div>

          {/* Nota discreta */}
          <p className="text-sm text-muted-foreground mt-8 max-w-2xl mx-auto">
            * Algumas integrações podem ter custos adicionais de plataformas terceiras
          </p>
        </div>
      </section>

      <section id="faq" className="bg-background text-primary py-16 px-4 shadow-md sm:px-6" data-aos="fade-up">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-shadow-2xs">{t.faq}</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <details className="bg-background p-4 rounded shadow hover:bg-muted/50 hover:shadow-lg transition-shadow">
            <summary className="cursor-pointer font-semibold">{t.faq1}</summary>
            <p className="mt-2">{t.faq1desc}</p>
          </details>
          <details className="bg-background p-4 rounded shadow hover:bg-muted/50 hover:shadow-lg transition-shadow">
            <summary className="cursor-pointer font-semibold">{t.faq2}</summary>
            <p className="mt-2">{t.faq2desc}</p>
          </details>
          <details className="bg-background p-4 rounded shadow hover:bg-muted/50 hover:shadow-lg transition-shadow">
            <summary className="cursor-pointer font-semibold">🎯 Como funciona o período de teste gratuito?</summary>
            <p className="mt-2">
              Durante o período de teste de 7 dias, você terá acesso a todas as funcionalidades disponíveis conforme o plano escolhido.
              <strong>⚠️ Importante:</strong> Ao exceder o período de teste, será cobrado automaticamente o valor integral da mensalidade do plano escolhido.
            </p>
          </details>
          <details className="bg-background p-4 rounded shadow hover:bg-muted/50 hover:shadow-lg transition-shadow">
            <summary className="cursor-pointer font-semibold">📋 Quem é responsável pelo uso dos canais?</summary>
            <p className="mt-2">
              A responsabilidade pelo uso do canal é do cliente. O cliente é responsável por garantir o uso adequado e em conformidade com as políticas dos provedores de canal (WhatsApp, Telegram, Instagram, etc.).
            </p>
          </details>
          <details className="bg-background p-4 rounded shadow hover:bg-muted/50 hover:shadow-lg transition-shadow">
            <summary className="cursor-pointer font-semibold">🎁 Como funciona o programa de indicações?</summary>
            <p className="mt-2">
              Nosso programa de indicações é uma forma de recompensar nossos clientes que ajudam a divulgar a Omniflow.
              <br /><br />
              <strong>Como funciona:</strong>
              <br />Quando você indica um novo cliente e ele contrata qualquer um de nossos planos, você pode escolher entre duas opções de recompensa:
              <br /><br />
              <strong>📋 Opção 1 - Valor Integral:</strong>
              <br />• Receba o valor equivalente à primeira mensalidade escolhida pelo cliente indicado
              <br />• O bônus será pago após a empresa indicada completar 3 meses de permanência ativa na plataforma
              <br /><br />
              <strong>💰 Opção 2 - Comissão Recorrente:</strong>
              <br />• Receba 10% da mensalidade do cliente indicado enquanto ele permanecer ativo
              <br />• O pagamento da comissão inicia já no primeiro mês de permanência
              <br />• Continue recebendo mensalmente enquanto o cliente permanecer na plataforma
              <br /><br />
              <strong>✨ Benefícios Gerais:</strong>
              <br />• Não há limite de indicações - quanto mais você indicar, mais você pode ganhar
              <br />• Você escolhe qual modalidade de recompensa prefere para cada indicação
              <br />• Acompanhe seus ganhos através do painel de indicações
              <br /><br />
              <strong>📊 Exemplos:</strong>
              <br />• <strong>Opção 1:</strong> Cliente contrata plano Boost (R$ 299,90/mês) → Você recebe R$ 299,90 após 3 meses
              <br />• <strong>Opção 2:</strong> Cliente contrata plano Boost (R$ 299,90/mês) → Você recebe R$ 29,99 mensalmente enquanto ele permanecer
              <br /><br />
              Entre em contato conosco para mais detalhes sobre como participar do programa de indicações e escolher sua modalidade preferida!
            </p>
          </details>
        </div>
      </section>

      <section id="contact" className="bg-muted text-primary py-12 sm:py-16 px-4 shadow-md sm:px-6" data-aos="fade-up">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-shadow-2xs mb-6 sm:mb-8">
          Ficou interessado e quer saber mais sobre o Omni
          <span className="bg-gradient-to-br from-green-500 to-blue-500 bg-clip-text text-transparent">flow</span> ?
        </h2>
        <div className="max-w-3xl mx-auto">
          <ContactCard />
        </div>
      </section>

      <Footer
        scrollToSection={scrollToSection}
        isSystemDark={isDark}
      />

      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent className="bg-background text-primary max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Cadastre-se e teste grátis!</DialogTitle>
          </DialogHeader>
          <SignupForm onCancel={() => setOpenForm(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
