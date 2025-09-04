export default function AffiliationBanner({ scrollToSection }: { scrollToSection: (section: string) => void }) {
  return (
    <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-2 px-4 text-center shadow-lg mt-16 md:mt-20 relative overflow-hidden">
      {/* Efeito de brilho de fundo */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 blur-lg"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
          <div className="flex items-center gap-2">
            <span
              className="text-2xl"
              style={{ filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.4)) drop-shadow(0 0 10px rgba(255,255,255,0.2))' }}
            >
              🎁
            </span>
            <span
              className="font-bold text-lg"
              style={{ filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.5)) drop-shadow(0 0 10px rgba(255,255,255,0.3)) drop-shadow(0 0 15px rgba(34,197,94,0.3))' }}
            >
              PROGRAMA DE INDICAÇÕES
            </span>
          </div>
          <div className="text-sm sm:text-base">
            <span
              className="font-medium"
              style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.4)) drop-shadow(0 0 8px rgba(255,255,255,0.2))' }}
            >
              Indique e ganhe o valor da primeira mensalidade!
            </span>
            <span
              className="hidden sm:inline ml-2 opacity-90"
              style={{ filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.3))' }}
            >
              • Mínimo 3 meses de permanência
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
  )
}