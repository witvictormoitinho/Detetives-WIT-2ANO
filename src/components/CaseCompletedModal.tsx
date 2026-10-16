import React, { useEffect } from 'react';
import { Award, ArrowRight, BookOpen, RefreshCw, Sparkles, Folder, Briefcase } from 'lucide-react';
import { sound } from '../utils/audio';
import { StudentPair } from '../types';

interface CaseCompletedModalProps {
  caseNumber: number;
  caseTitle: string;
  clueTitle: string;
  clueSymbol?: string;
  clueDescription: string;
  pair: StudentPair;
  onNextCase: () => void;
  onGoToHub: () => void;
  onOpenNotebook: () => void;
  onOpenInventory?: () => void;
}

export const CaseCompletedModal: React.FC<CaseCompletedModalProps> = ({
  caseNumber,
  caseTitle,
  clueTitle,
  clueSymbol,
  clueDescription,
  pair,
  onNextCase,
  onGoToHub,
  onOpenNotebook,
  onOpenInventory,
}) => {
  useEffect(() => {
    sound.playSuccess();
    const timer = setTimeout(() => {
      sound.playStamp();
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const nextCaseNum = caseNumber + 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none animate-fadeIn">
      <div className="relative w-full max-w-xl bg-parchment rounded-2xl shadow-2xl border-4 border-[#8c6747] p-6 md:p-8 text-slate-800 flex flex-col items-center">
        
        {/* Rubber Stamp Header */}
        <div className="mb-4">
          <div className="stamp-resolved text-lg md:text-xl py-2 px-6 animate-bounce">
            ✓ CASO RESOLVIDO
          </div>
        </div>

        <h3 className="font-serif font-black text-2xl text-[#4a2e12] text-center mb-1">
          Arquivo 0{caseNumber} Desbloqueado!
        </h3>
        <p className="text-xs font-typewriter text-[#8c6747] text-center mb-5">
          {caseTitle} · Agência WIT
        </p>

        {/* Revealed Clue Parchment Card */}
        <div className="w-full bg-[#fcf9f0] border-2 border-[#caa455] rounded-xl p-5 mb-5 shadow-inner">
          <div className="flex items-center justify-between border-b border-[#caa455]/40 pb-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 font-typewriter flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Nova Pista Registrada no Caderno
            </span>
            <span className="text-xs font-typewriter text-amber-800 font-bold">
              CASO #{caseNumber}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {clueSymbol && (
              <div className="w-16 h-16 rounded-xl bg-amber-100 border-2 border-amber-400 flex items-center justify-center text-3xl font-black shadow-sm shrink-0">
                {clueSymbol}
              </div>
            )}
            <div>
              <h4 className="font-serif font-bold text-base text-[#4a2e12]">
                {clueTitle}
              </h4>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                {clueDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Role Rotation Prompt */}
        <div className="w-full bg-[#ebe3d0] border border-[#d2c3aa] rounded-xl p-4 mb-6 text-xs text-[#4a2e12]">
          <div className="flex items-center gap-2 font-bold mb-1.5 text-sm text-[#5c3e21]">
            <RefreshCw className="w-4 h-4 text-amber-700 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Momento da Dupla: Trocar de Papéis!</span>
          </div>
          <p className="leading-relaxed">
            Excelente cooperação entre <strong>{pair.detectiveName}</strong> e <strong>{pair.analystName}</strong>! Agora, quem estava observando assume os comandos, e quem comandava observa as pistas com a lupa.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full">
          {onOpenInventory && (
            <button
              onClick={() => {
                sound.playClick();
                onOpenInventory();
              }}
              className="w-full sm:w-auto px-3.5 py-3 bg-[#f5ecdc] hover:bg-[#ebdcc0] text-[#5c3e21] font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 border border-[#cca97f] transition-colors cursor-pointer"
              title="Ver itens e pistas na Maleta de Inventário"
            >
              <Briefcase className="w-3.5 h-3.5 text-amber-700" />
              <span>Ver na Maleta 💼</span>
            </button>
          )}

          <button
            onClick={() => {
              sound.playClick();
              onOpenNotebook();
            }}
            className="w-full sm:w-auto px-3.5 py-3 bg-[#e8dac0] hover:bg-[#decbae] text-[#4a2e12] font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 border border-[#cbb898] transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Caderno</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onGoToHub();
            }}
            className="w-full sm:w-auto px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Folder className="w-4 h-4 text-amber-400" />
            <span>Central de Casos</span>
          </button>

          {caseNumber < 8 ? (
            <button
              onClick={() => {
                sound.playClick();
                onNextCase();
              }}
              className="w-full sm:flex-1 py-3 px-5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-serif font-black rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <span>Caso 0{nextCaseNum} ➔</span>
            </button>
          ) : (
            <button
              onClick={() => {
                sound.playClick();
                onNextCase();
              }}
              className="w-full sm:flex-1 py-3 px-5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-serif font-black rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer animate-pulse"
            >
              <span>🏆 Ir Para a Missão Final!</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
