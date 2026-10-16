import React, { useState } from 'react';
import { HelpCircle, ChevronRight, Volume2, ArrowLeft, RefreshCw, Lightbulb, X, Briefcase } from 'lucide-react';
import { StudentPair } from '../types';
import { sound } from '../utils/audio';

interface CaseHeaderProps {
  code: string;
  title: string;
  difficulty: number;
  pair: StudentPair;
  hints: string[];
  onSwapRoles: () => void;
  onGoToHub: () => void;
  onOpenInventory?: () => void;
  detectiveTip?: string;
}

export const CaseHeader: React.FC<CaseHeaderProps> = ({
  code,
  title,
  difficulty,
  pair,
  hints,
  onSwapRoles,
  onGoToHub,
  onOpenInventory,
  detectiveTip,
}) => {
  const [hintLevel, setHintLevel] = useState<number>(0);
  const [showHintModal, setShowHintModal] = useState<boolean>(false);

  const handleRequestHint = () => {
    sound.playHint();
    if (hintLevel < hints.length) {
      setHintLevel(prev => prev + 1);
    }
    setShowHintModal(true);
  };

  const handleSpeakTip = (text: string) => {
    sound.playClick();
    sound.speak(text);
  };

  return (
    <div className="w-full bg-[#131b27] border-b border-[#2a384e] p-3 md:p-4 mb-4 select-none">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Case Info & Back Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onGoToHub();
            }}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer border border-slate-700"
            title="Voltar para a Central de Casos"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Central</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-typewriter text-xs text-amber-400 font-bold uppercase tracking-wider">
                {code}
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-amber-300/80">
                {'⭐'.repeat(difficulty)}
              </span>
            </div>
            <h2 className="font-serif font-bold text-lg md:text-xl text-slate-100 leading-tight">
              {title}
            </h2>
          </div>
        </div>

        {/* Center: Active Role Banner */}
        <div className="flex items-center gap-2 bg-[#1b2536] px-3 py-1.5 rounded-lg border border-[#2d3e58]">
          <div className="text-xs flex items-center gap-2">
            <span className="text-slate-400 text-[11px]">Nesta fase:</span>
            {pair.activeRole === 'detective' ? (
              <span className="font-bold text-amber-300 flex items-center gap-1">
                <span>🔎</span>
                <span>{pair.detectiveName}</span>
                <span className="text-[10px] text-amber-400/80 font-normal hidden lg:inline">(Observando pistas)</span>
              </span>
            ) : (
              <span className="font-bold text-sky-300 flex items-center gap-1">
                <span>🧩</span>
                <span>{pair.analystName}</span>
                <span className="text-[10px] text-sky-400/80 font-normal hidden lg:inline">(Organizando comandos)</span>
              </span>
            )}
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onSwapRoles();
            }}
            className="ml-1 p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
            title="Trocar quem está no comando agora"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Hint Request Button & Inventory Button */}
        <div className="flex items-center gap-2">
          {onOpenInventory && (
            <button
              onClick={() => {
                sound.playClick();
                onOpenInventory();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-950/70 to-[#3e2713] hover:from-amber-900 text-amber-200 border border-amber-600/50 text-xs font-semibold transition-all cursor-pointer shadow-sm"
              title="Abrir a Maleta de Inventário (Atalho: Tecla I)"
            >
              <Briefcase className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Maleta</span>
            </button>
          )}

          <button
            onClick={handleRequestHint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all cursor-pointer shadow-sm hover:border-amber-400"
          >
            <Lightbulb className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>PEDIR UMA DICA 🔎</span>
            {hintLevel > 0 && (
              <span className="bg-amber-400 text-amber-950 px-1.5 py-0.2 rounded-full text-[10px]">
                {hintLevel}/{hints.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Floating Detective WIT quote if provided */}
      {detectiveTip && (
        <div className="max-w-6xl mx-auto mt-2 pt-2 border-t border-[#223046] flex items-center justify-between text-xs text-amber-200/90 font-serif italic">
          <div className="flex items-center gap-2">
            <span className="text-base">🕵️‍♂️</span>
            <span>Detetive WIT diz: &ldquo;{detectiveTip}&rdquo;</span>
          </div>
          <button
            onClick={() => handleSpeakTip(detectiveTip)}
            className="p-1 text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
            title="Ouvir a fala do Detetive WIT"
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Progressive Hint Modal */}
      {showHintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-parchment text-slate-800 rounded-xl p-5 max-w-lg w-full border-4 border-[#8c6747] shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#caa455]">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💡</span>
                <div>
                  <h3 className="font-serif font-black text-lg text-[#5c3e21]">
                    Dica do Detetive WIT
                  </h3>
                  <span className="text-xs font-typewriter text-[#8c6747]">
                    Dica {hintLevel} de {hints.length}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  setShowHintModal(false);
                }}
                className="p-1 rounded bg-black/10 hover:bg-black/20 text-[#5c3e21] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 font-sans">
              {hints.slice(0, hintLevel).map((h, idx) => (
                <div 
                  key={idx} 
                  className={`p-3 rounded-lg border flex items-start gap-2.5 ${
                    idx === hintLevel - 1 
                      ? 'bg-amber-100/80 border-amber-400 text-amber-950 font-medium' 
                      : 'bg-[#ede3cf] border-[#cbb999] text-slate-700 text-xs'
                  }`}
                >
                  <span className="font-bold text-xs bg-amber-800 text-white rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed">{h}</p>
                  </div>
                  <button
                    onClick={() => handleSpeakTip(h)}
                    className="p-1 text-amber-800 hover:text-amber-950"
                    title="Ouvir esta dica"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#caa455] flex items-center justify-between">
              {hintLevel < hints.length ? (
                <button
                  onClick={() => {
                    sound.playHint();
                    setHintLevel(prev => prev + 1);
                  }}
                  className="px-3 py-1.5 bg-[#8c6747] hover:bg-[#6e4e33] text-white text-xs font-bold rounded cursor-pointer transition-colors"
                >
                  Ver Próxima Dica ({hintLevel + 1}/{hints.length})
                </button>
              ) : (
                <span className="text-xs text-slate-600 italic">
                  Todas as dicas foram reveladas. Vocês conseguem!
                </span>
              )}

              <button
                onClick={() => {
                  sound.playClick();
                  setShowHintModal(false);
                }}
                className="px-4 py-1.5 bg-[#5c3e21] hover:bg-[#432b14] text-white text-xs font-bold rounded cursor-pointer transition-colors"
              >
                Continuar Investigando
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
