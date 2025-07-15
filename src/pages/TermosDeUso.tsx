import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/theme-provider";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

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

import { useState, useEffect } from "react";
import { ModeToggle } from "@/components/mode-toggle";

export default function TermosDeUso() {
  const { theme } = useTheme();
  const isSystemDark = useSystemTheme();

  return (
    <div className="font-sans text-primary min-h-screen w-full relative bg-background">
      {/* Header */}
      <nav className="w-full bg-background flex items-center justify-between shadow-md py-4 px-4">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="flex items-center gap-2 cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </Link>
          <img
            className="w-40"
            src={
              theme === 'dark' || (theme === 'system' && isSystemDark)
                ? '/logo-dark.png'
                : '/logo.png'
            }
            alt="Logo da Omniflow"
          />
        </div>
        <div className="flex justify-center md:justify-start w-full md:w-auto mt-2 md:mt-0">
          <ModeToggle />
        </div>
      </nav>

      {/* Conteúdo */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Termos e Condições de Uso
        </h1>

        <div className="prose prose-lg max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. ACEITAÇÃO DOS TERMOS</h2>
            <p>
              Ao acessar ou usar os serviços da Omniflow, você concorda com estes Termos e Condições de Uso ("Termos").
              Se você não concordar com qualquer parte destes Termos, não deve acessar ou usar os serviços.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. DEFINIÇÕES</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>"Serviços"</strong> refere-se às plataformas, aplicações, funcionalidades e ferramentas oferecidas pela Omniflow.</li>
              <li><strong>"Usuário"</strong> refere-se a qualquer pessoa que acesse ou use os Serviços.</li>
              <li><strong>"Dados"</strong> refere-se às informações fornecidas, coletadas ou processadas através dos Serviços.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. DESCRIÇÃO DOS SERVIÇOS</h2>
            <p>
              A Omniflow oferece uma plataforma de comunicação omnichannel que integra diversos canais de comunicação em um ambiente unificado,
              incluindo chatbots, atendimento humano, automações e outras funcionalidades relacionadas ao atendimento ao cliente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. CADASTRO E CONTA</h2>
            <div className="space-y-4">
              <p><strong>4.1.</strong> Para usar os Serviços, você deve criar uma conta fornecendo informações precisas, completas e atualizadas.</p>
              <p><strong>4.2.</strong> Você é responsável por manter a confidencialidade das credenciais de sua conta e por todas as atividades realizadas através dela.</p>
              <p><strong>4.3.</strong> Você deve notificar imediatamente a Omniflow sobre qualquer uso não autorizado de sua conta.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. USO PERMITIDO</h2>
            <div className="space-y-4">
              <p><strong>5.1.</strong> Você pode usar os Serviços para fins comerciais legítimos, em conformidade com estes Termos e todas as leis aplicáveis.</p>
              <p><strong>5.2.</strong> Você concorda em não:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Usar os Serviços para fins ilegais ou não autorizados;</li>
                <li>Interferir ou interromper os Serviços ou servidores conectados;</li>
                <li>Tentar obter acesso não autorizado a qualquer parte dos Serviços;</li>
                <li>Transmitir vírus, malware ou outros códigos maliciosos;</li>
                <li>Enviar spam ou mensagens não solicitadas;</li>
                <li>Violar direitos de propriedade intelectual de terceiros.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. PLANOS E PAGAMENTOS</h2>
            <div className="space-y-4">
              <p><strong>6.1.</strong> Os Serviços são oferecidos através de diferentes planos de assinatura, conforme detalhado em nosso site.</p>
              <p><strong>6.2.</strong> As taxas são cobradas conforme o plano escolhido e devem ser pagas antecipadamente.</p>
              <p><strong>6.3.</strong> Todas as taxas são não reembolsáveis, exceto quando expressamente previsto em lei.</p>
              <p><strong>6.4.</strong> A Omniflow pode alterar os preços mediante aviso prévio de 30 dias.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. CANCELAMENTO E SUSPENSÃO</h2>
            <div className="space-y-4">
              <p><strong>7.1.</strong> Você pode cancelar sua assinatura a qualquer momento através de sua conta.</p>
              <p><strong>7.2.</strong> A Omniflow pode suspender ou encerrar sua conta em caso de violação destes Termos.</p>
              <p><strong>7.3.</strong> Após o cancelamento, você perderá o acesso aos Serviços, mas os dados poderão ser mantidos conforme nossa Política de Privacidade.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. PROPRIEDADE INTELECTUAL</h2>
            <div className="space-y-4">
              <p><strong>8.1.</strong> Os Serviços e todo o conteúdo relacionado são propriedade da Omniflow ou de seus licenciadores.</p>
              <p><strong>8.2.</strong> Você mantém a propriedade de seus dados e conteúdo fornecido através dos Serviços.</p>
              <p><strong>8.3.</strong> Ao usar os Serviços, você concede à Omniflow uma licença limitada para processar seus dados conforme necessário para fornecer os Serviços.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. PRIVACIDADE E DADOS</h2>
            <p>
              O tratamento de dados pessoais é regido por nossa Política de Privacidade, que faz parte integrante destes Termos.
              Ao usar os Serviços, você concorda com as práticas descritas na Política de Privacidade.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. LIMITAÇÃO DE RESPONSABILIDADE</h2>
            <div className="space-y-4">
              <p><strong>10.1.</strong> Os Serviços são fornecidos "como estão", sem garantias de qualquer tipo.</p>
              <p><strong>10.2.</strong> A Omniflow não será responsável por danos indiretos, incidentais, especiais ou consequenciais.</p>
              <p><strong>10.3.</strong> Nossa responsabilidade total não excederá o valor pago pelos Serviços nos últimos 12 meses.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. INDENIZAÇÃO</h2>
            <p>
              Você concorda em indenizar e isentar a Omniflow de qualquer reclamação, dano ou despesa decorrente de seu uso dos Serviços
              ou violação destes Termos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. MODIFICAÇÕES DOS TERMOS</h2>
            <p>
              A Omniflow pode modificar estes Termos a qualquer momento. As modificações entrarão em vigor após a publicação.
              O uso continuado dos Serviços após as modificações constitui aceitação dos novos Termos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">13. LEI APLICÁVEL E JURISDIÇÃO</h2>
            <p>
              Estes Termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida nos tribunais competentes do Brasil.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">14. DISPOSIÇÕES GERAIS</h2>
            <div className="space-y-4">
              <p><strong>14.1.</strong> Se qualquer disposição destes Termos for considerada inválida, as demais permanecerão em vigor.</p>
              <p><strong>14.2.</strong> Estes Termos constituem o acordo completo entre as partes.</p>
              <p><strong>14.3.</strong> A falha em exercer qualquer direito não constitui renúncia.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">15. CONTATO</h2>
            <p>
              Para dúvidas sobre estes Termos e Condições de Uso, entre em contato conosco:
            </p>
            <div className="bg-muted p-4 rounded-lg mt-2">
              <p><strong>WhatsApp:</strong> <a href="https://wa.me/558597095694" className="text-green-600 hover:underline">+55 85 9709-5694</a></p>
              <p><strong>Email:</strong> contato@omniflow.chat</p>
            </div>
          </section>

          <div className="text-sm text-muted-foreground mt-8 pt-8 border-t">
            <p><strong>Data de vigência:</strong> 01 de Junho de 2025</p>
            <p><strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
          </div>
        </div>
      </div>

      {/* Footer simples */}
      <footer className="bg-muted text-center py-6 text-sm text-muted-foreground border-t">
        © {new Date().getFullYear()} Omniflow – Todos os direitos reservados.
      </footer>
    </div>
  );
}
