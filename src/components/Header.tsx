import React from 'react';
import { Volume2, VolumeX, BookOpen, Compass, RefreshCw, Shield, Briefcase } from 'lucide-react';
import { StudentPair, ScreenMode } from '../types';
import { sound } from '../utils/audio';

interface HeaderProps {
  pair: StudentPair;
  onSwapRoles: () => void;
  onOpenNotebook: () => void;
  onOpenInventory: () => void;
  onOpenCycle: () => void;
  onGoToHub: () => void;
  currentScreen: ScreenMode;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  pair,
  onSwapRoles,
  onOpenNotebook,
  onOpenInventory,
  onOpenCycle,
  onGoToHub,
  currentScreen,
  isMuted,
  onToggleMute,
}) => {
  return (
    <header className="w-full bg-[#10151f] border-b border-[#2d3748] text-slate-200 px-4 py-3 flex items-center justify-between shadow-md relative z-40 select-none">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3">
        <button
          onClick={onGoToHub}
          className="flex items-center gap-2 hover:opacity-90 transition-opacity text-left cursor-pointer"
          title="Ir para a Central da Agência"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 font-bold text-lg">
            🕵️
          </div>
          <div>
            <span className="font-serif font-bold text-lg text-amber-200 tracking-wide block leading-none">
              Agência WIT
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase block">
              Investigação Tecnológica
            </span>
          </div>
        </button>
      </div>

      {/* Zone 2: Navigation & Pair Roles */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* Hub link */}
        {currentScreen !== 'hub' && currentScreen !== 'intro' && (
          <button
            onClick={onGoToHub}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-md border border-slate-700 transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Quadro de Casos</span>
          </button>
        )}

        {/* Inventário */}
        <button
          onClick={onOpenInventory}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-200 hover:text-white bg-gradient-to-r from-amber-950/70 to-[#3d2714]/80 hover:from-amber-900 hover:to-[#4e321a] rounded-md border border-amber-600/60 shadow-sm transition-all cursor-pointer"
          title="Abrir a Maleta de Inventário do Detetive (Itens, Ferramentas e Códigos)"
        >
          <Briefcase className="w-3.5 h-3.5 text-amber-400" />
          <span>Inventário</span>
        </button>

        {/* Notebook */}
        <button
          onClick={onOpenNotebook}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-200 hover:text-white bg-amber-950/40 hover:bg-amber-900/60 rounded-md border border-amber-800/60 transition-colors cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Caderno de</span> Pistas
        </button>

        {/* Pedagogical Cycle */}
        <button
          onClick={onOpenCycle}
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-sky-200 hover:text-white bg-sky-950/40 hover:bg-sky-900/60 rounded-md border border-sky-800/50 transition-colors cursor-pointer"
          title="Ver o Ciclo de Investigação: Observar, Pensar, Testar..."
        >
          <Shield className="w-3.5 h-3.5 text-sky-400" />
          <span>Método do Detetive</span>
        </button>

        {/* Pair Role Tag & Swap */}
        <div className="flex items-center bg-[#18202f] border border-[#2d3b52] rounded-lg px-2.5 py-1 gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[11px] hidden lg:inline">Dupla:</span>
            <div className="flex items-center gap-1">
              <span className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${pair.activeRole === 'detective' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-400'}`}>
                🔎 {pair.detectiveName}
              </span>
              <span className="text-slate-500 text-[10px]">&</span>
              <span className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${pair.activeRole === 'analista' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' : 'text-slate-400'}`}>
                🧩 {pair.analystName}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onSwapRoles();
            }}
            title="Trocar papéis: Detetive ⇄ Analista"
            className="p-1 hover:bg-slate-700/60 rounded text-slate-300 hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1 text-[10px]"
          >
            <RefreshCw className="w-3 h-3" />
            <span className="hidden xl:inline">Trocar Papel</span>
          </button>
        </div>
      </div>

      {/* Zone 3: Actions (Sound toggle) */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleMute}
          className={`p-2 rounded-lg border transition-colors cursor-pointer ${
            isMuted 
              ? 'bg-red-950/30 border-red-800/50 text-red-300 hover:bg-red-900/40' 
              : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
          }`}
          title={isMuted ? 'Ativar sons e narração' : 'Silenciar áudio'}
          aria-label="Controle de Áudio"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
        </button>
      </div>
    </header>
  );
};
