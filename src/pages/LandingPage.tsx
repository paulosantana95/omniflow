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
  const t = messages[locale as keyof typeof messages];

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const plans1 = [
    {
      title: 'Start',
      benefits: [
        '2 Usuários',
        '1 Canal de Atendimento',
        'Gerenciamento de Grupos (Whatsapp)',
        'Chat bot integrado com IA (Custo da IA não incluso)',
        'Chat Entre Usuários',
        '700 Atendimentos/mês(20R$ a cada 500 atendimentos adicionais)',
        'Armazenamento de 1GB de Dados(16R$ por GB adicional)',
      ],
      price: "R$49,90/mês",
      highlight: null,
      tryFree: t.tryFree,
    },
    {
      title: 'Connect',
      benefits: [
        'Tudo do plano Start',
        '6 Usuários',
        '2 Canais de Atendimento',
        'Relatórios Avançados',
        'Equipes',
        '1200 Atendimentos/mês(20R$ a cada 500 atendimentos adicionais)',
        'Armazenamento de 3GB de Dados(12R$ por GB adicional)',
      ],
      price: "R$79,90/mês",
      highlight: null,
      tryFree: t.tryFree,
    },
    {
      title: 'Boost',
      benefits: [
        'Tudo do plano Connect',
        '12 Usuários',
        '4 Canais de Atendimento',
        'CRM Integrado com Kanban, Funil de Vendas e Checklist de Tarefas',
        'Campanhas de Marketing automatizadas (até 5.000 mensagens/mês - excedente cobrado)',
        'Disparos em massa segmentados (até 5.000 envios/mês - excedente cobrado)',
        '2200 Atendimentos/mês(20R$ a cada 500 atendimentos adicionais)',
        'Armazenamento de 5GB de Dados(10R$ por GB adicional)',
      ],
      price: "R$149,90/mês",
      highlight: false,
      tryFree: t.tryFree,
    },
  ]

  const plans2 = [
    {
      title: 'Infinity',
      benefits: [
        'Tudo do plano Boost',
        'Usuários e Canais Ilimitados',
        'Atendimentos Ilimitados',
        'Suporte Prioritário',
        'Integração com API',
        'Campanhas de Marketing Ilimitadas',
        'Disparos em Massa Ilimitados',
        'Armazenamento de 8GB de Dados(10R$ por GB adicional)',
      ],
      price: "R$699,90/mês",
      highlight: true,
      tryFree: t.tryFree,
    },
    {
      title: 'Omni',
      benefits: [
        'Se encaixa no plano que sua empresa precisa',
        'Usuários e Canais a definir',
        'Atendimentos a definir',
        'Funcionalidades personalizadas',
        'Integração conforme a necessidade da empresa',
      ],
      price: "Solicite uma proposta",
      highlight: null,
      tryFree: "Solicite uma proposta",
    },
  ]

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
        setOpenForm={setOpenForm}
        isSystemDark={isSystemDark}
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
          {/* Primeira linha: 3 primeiros planos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 min-h-[568px]">
            {plans1.map((plan, index) => (
              <div key={index} className="flex justify-center">
                <PlanCard
                  title={plan.title}
                  benefits={plan.benefits}
                  highlight={plan.highlight}
                  buttonTitle={plan.tryFree}
                  price={plan.price}
                  onTry={() => setOpenForm(true)}
                />
              </div>
            ))}
          </div>
          {/* Segunda linha: 2 últimos planos */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[568px]">
            {plans2.map((plan, index) => (
              <PlanCard
                key={index}
                title={plan.title}
                benefits={plan.benefits}
                highlight={plan.highlight}
                buttonTitle={plan.tryFree}
                price={plan.price}
                onTry={() => setOpenForm(true)}
              />
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
                  <br />• <strong>Campanhas de Marketing:</strong> até 100 mensagens
                  <br />• <strong>Disparos em Massa:</strong> até 50 envios
                  <br />• <strong>Atendimentos:</strong> até 100 conversas
                  <br />• Todas as outras funcionalidades disponíveis conforme o plano escolhido
                </p>
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md">
                  <p className="text-base text-amber-800 dark:text-amber-200">
                    <strong>⚠️ Importante:</strong> Ao exceder os limites durante o teste ou período pago, será cobrado automaticamente o valor integral da mensalidade do plano escolhido.
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
        <div className="flex flex-wrap justify-center items-center gap-20 max-w-6xl mx-auto">
          <img src="/clients/neofin-logo.png" alt="Neofin Tecnologia" className="h-16 object-contain" />
          <img src="/clients/organizee-logo.png" alt="Organizee" className="h-45 object-contain" />
        </div>
        <p className="mt-8 text-base text-muted-foreground">Empresas de diferentes segmentos já utilizam a Omni<span className="bg-gradient-to-br from-green-500 to-blue-500 bg-clip-text text-transparent">flow</span> para potencializar seu atendimento e automação.</p>
      </section>

      <section id="integrations" className="bg-muted text-primary py-16 px-4 text-center shadow-md sm:px-6" data-aos="fade-up">
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
              <br />• <strong>Opção 1:</strong> Cliente contrata plano Infinity (R$ 699,90/mês) → Você recebe R$ 699,90 após 3 meses
              <br />• <strong>Opção 2:</strong> Cliente contrata plano Infinity (R$ 699,90/mês) → Você recebe R$ 69,99 mensalmente enquanto ele permanecer
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
        isSystemDark={isSystemDark}
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
