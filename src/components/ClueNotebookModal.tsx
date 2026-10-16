import React from 'react';
import { X, BookOpen, Key, CheckCircle, ShieldAlert, Sparkles } from 'lucide-react';
import { CASES_META } from '../data/casesData';
import { sound } from '../utils/audio';

interface ClueNotebookModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedCases: number[];
}

export const ClueNotebookModal: React.FC<ClueNotebookModalProps> = ({
  isOpen,
  onClose,
  completedCases,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm select-none">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-parchment rounded-xl shadow-2xl border-4 border-[#8c6747] flex flex-col overflow-hidden text-slate-800">
        
        {/* Notebook Spiral / Top Header */}
        <div className="bg-[#5c3e21] text-amber-100 px-6 py-4 flex items-center justify-between border-b-4 border-[#3e2713]">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-amber-300" />
            <div>
              <h2 className="font-serif font-black text-xl text-amber-100 tracking-wide flex items-center gap-2">
                CADERNO DE PISTAS DO DETETIVE
              </h2>
              <span className="text-xs text-amber-200/80 font-typewriter">
                REGISTRO OFICIAL DE EVIDÊNCIAS · AGÊNCIA WIT
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-black/20 hover:bg-black/40 text-amber-200 transition-colors cursor-pointer"
            title="Fechar Caderno"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clue Summary Banner */}
        <div className="bg-[#f0e6cf] px-6 py-3 border-b border-[#d8c7a6] flex items-center justify-between text-xs font-semibold text-amber-950">
          <div className="flex items-center gap-2">
            <span>🔍 Progresso da Investigação:</span>
            <span className="px-2 py-0.5 rounded bg-amber-800 text-amber-100 font-typewriter font-bold text-xs">
              {completedCases.length} de 8 Casos Concluídos
            </span>
          </div>

          {completedCases.length >= 7 && (
            <div className="flex items-center gap-1.5 text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Senha Mestra Pronta: 8351</span>
            </div>
          )}
        </div>

        {/* Clues Content List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CASES_META.map((c) => {
              const isResolved = completedCases.includes(c.id);
              return (
                <div
                  key={c.id}
                  className={`p-4 rounded-lg border-2 transition-all relative ${
                    isResolved 
                      ? 'bg-[#fffef7] border-[#8c6747] shadow-sm' 
                      : 'bg-[#ebe3d0]/60 border-[#c4b59b] opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold font-typewriter text-[#8c6747]">
                      {c.code} · {c.title}
                    </span>
                    {isResolved ? (
                      <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1 font-typewriter">
                        <CheckCircle className="w-3.5 h-3.5" />
                        DESBLOQUEADA
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-slate-500 font-typewriter flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3" />
                        ARQUIVO FECHADO
                      </span>
                    )}
                  </div>

                  {isResolved ? (
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {c.clueReward.symbol && (
                          <span className="text-2xl font-bold bg-amber-100 border border-amber-300 px-2 py-0.5 rounded text-amber-950 font-serif">
                            {c.clueReward.symbol}
                          </span>
                        )}
                        <h4 className="font-serif font-bold text-sm text-[#4a2e12]">
                          {c.clueReward.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed font-sans">
                        {c.clueReward.description}
                      </p>
                    </div>
                  ) : (
                    <div className="py-3 text-center text-xs text-slate-500 italic">
                      Resolva este caso para registrar esta pista no caderno.
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Decoder Sheet */}
          <div className="mt-4 p-4 bg-[#f4ebda] border-2 border-dashed border-[#8c6747] rounded-lg">
            <h4 className="font-serif font-bold text-sm text-[#4a2e12] mb-2 flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-800" />
              Tabela Rápida de Decodificação da Agência
            </h4>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-white p-2 rounded border border-[#caa455]">
                <div className="text-2xl">🟢</div>
                <div className="text-xs text-slate-600 font-bold">Verde</div>
                <div className="text-lg font-typewriter font-bold text-[#8c6747] mt-1">
                  {completedCases.includes(2) ? '= 8' : '?'}
                </div>
              </div>

              <div className="bg-white p-2 rounded border border-[#caa455]">
                <div className="text-2xl">⭐</div>
                <div className="text-xs text-slate-600 font-bold">Estrela</div>
                <div className="text-lg font-typewriter font-bold text-[#8c6747] mt-1">
                  {completedCases.includes(3) ? '= 3' : '?'}
                </div>
              </div>

              <div className="bg-white p-2 rounded border border-[#caa455]">
                <div className="text-2xl">🔵</div>
                <div className="text-xs text-slate-600 font-bold">Azul</div>
                <div className="text-lg font-typewriter font-bold text-[#8c6747] mt-1">
                  {completedCases.includes(5) ? '= 5' : '?'}
                </div>
              </div>

              <div className="bg-white p-2 rounded border border-[#caa455]">
                <div className="text-2xl">🟡</div>
                <div className="text-xs text-slate-600 font-bold">Amarelo</div>
                <div className="text-lg font-typewriter font-bold text-[#8c6747] mt-1">
                  {completedCases.includes(6) ? '= 1' : '?'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#e8dac0] px-6 py-3 border-t border-[#cbb898] flex items-center justify-between text-xs text-[#5c3e21]">
          <span>💡 Consulte este caderno sempre que tiver dúvidas na senha!</span>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-1.5 bg-[#5c3e21] text-amber-100 font-semibold rounded hover:bg-[#432b14] transition-colors cursor-pointer"
          >
            Voltar à Investigação
          </button>
        </div>
      </div>
    </div>
  );
};
