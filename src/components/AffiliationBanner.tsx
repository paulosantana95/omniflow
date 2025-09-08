export default function AffiliationBanner({ scrollToSection }: { scrollToSection: (section: string) => void }) {
  return (
    <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-2 px-4 text-center shadow-lg mt-20 md:mt-20 relative overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes glow-pulse {
            0%, 100% {
              filter: drop-shadow(0 0 3px rgba(255,255,255,0.3)) drop-shadow(0 0 6px rgba(255,255,255,0.1));
              transform: scale(1);
            }
            50% {
              filter: drop-shadow(0 0 12px rgba(255,255,255,0.9)) drop-shadow(0 0 20px rgba(255,255,255,0.6)) drop-shadow(0 0 30px rgba(255,255,255,0.3));
              transform: scale(1.05);
            }
          }
          
          @keyframes title-glow-pulse {
            0%, 100% {
              filter: drop-shadow(0 0 4px rgba(255,255,255,0.4)) drop-shadow(0 0 8px rgba(255,255,255,0.2)) drop-shadow(0 0 12px rgba(34,197,94,0.2));
              opacity: 0.9;
            }
            50% {
              filter: drop-shadow(0 0 15px rgba(255,255,255,1)) drop-shadow(0 0 25px rgba(255,255,255,0.7)) drop-shadow(0 0 35px rgba(34,197,94,0.8));
              opacity: 1;
            }
          }
          
          @keyframes text-glow-pulse {
            0%, 100% {
              filter: drop-shadow(0 0 2px rgba(255,255,255,0.3)) drop-shadow(0 0 4px rgba(255,255,255,0.1));
              opacity: 0.95;
            }
            50% {
              filter: drop-shadow(0 0 10px rgba(255,255,255,0.8)) drop-shadow(0 0 18px rgba(255,255,255,0.5));
              opacity: 1;
            }
          }
          
          .glow-pulse {
            animation: glow-pulse 2s ease-in-out infinite;
          }
          
          .title-glow-pulse {
            animation: title-glow-pulse 2s ease-in-out infinite;
          }
          
          .text-glow-pulse {
            animation: text-glow-pulse 2s ease-in-out infinite;
          }
        `
      }} />

      {/* Efeito de brilho de fundo */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 blur-lg animate-pulse"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl glow-pulse">
              🎁
            </span>
            <span className="font-bold text-lg title-glow-pulse">
              PROGRAMA DE INDICAÇÕES
            </span>
          </div>
          <div className="text-sm sm:text-base">
            <span className="font-medium text-glow-pulse">
              Indique e escolha: valor integral ou 10% recorrente!
            </span>
            <span
              className="hidden sm:inline ml-2 opacity-90"
              style={{ filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.3))' }}
            >
              • Duas modalidades de recompensa
            </span>
          </div>
          <button
            onClick={() => scrollToSection('faq')}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border border-white/30 hover:border-white/50 hover:scale-105 shadow-[0_0_8px_rgba(255,255,255,0.2),inset_0_0_8px_rgba(255,255,255,0.05)]"
            style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.4))' }}
          >
            Saiba mais
          </button>
        </div>
      </div>
    </div>
  );
}