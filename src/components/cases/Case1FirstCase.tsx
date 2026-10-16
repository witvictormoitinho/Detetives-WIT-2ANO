import React, { useState } from 'react';
import { CaseHeader } from '../CaseHeader';
import { CaseCompletedModal } from '../CaseCompletedModal';
import { CASES_META, DETECTIVE_QUOTES } from '../../data/casesData';
import { StudentPair } from '../../types';
import { sound } from '../../utils/audio';
import { Check, RotateCcw, Sparkles, Footprints, FolderSearch, FileText } from 'lucide-react';

interface Case1Props {
  pair: StudentPair;
  onCompleteCase: (caseId: number) => void;
  onSwapRoles: () => void;
  onGoToHub: () => void;
  onNextCase: () => void;
  onOpenNotebook: () => void;
  onOpenInventory?: () => void;
}

export const Case1FirstCase: React.FC<Case1Props> = ({
  pair,
  onCompleteCase,
  onSwapRoles,
  onGoToHub,
  onNextCase,
  onOpenNotebook,
  onOpenInventory,
}) => {
  const meta = CASES_META[0];
  const [subStep, setSubStep] = useState<1 | 2 | 3>(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Sub-challenge 1: Order 3 steps
  // Target order: 1: 'lupa' (Pegar a lupa e pasta), 2: 'pegadas' (Seguir as pegadas), 3: 'arquivo' (Abrir o arquivo)
  const initialCards = [
    { id: 'arquivo', text: '3. Abrir o arquivo confidencial', icon: '📁', tag: 'Abrir Arquivo' },
    { id: 'lupa', text: '1. Pegar a lupa e os equipamentos', icon: '🔎', tag: 'Pegar Equipamento' },
    { id: 'pegadas', text: '2. Seguir as pegadas no piso da agência', icon: '🐾', tag: 'Seguir Pegadas' },
  ];
  const [selectedOrder, setSelectedOrder] = useState<string[]>([]);

  // Sub-challenge 2: Pattern recognition
  // Pattern: 🔎 -> 📁 -> 🔎 -> 📁 -> ?
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);

  // Sub-challenge 3: Incremental count
  // Pattern: 1 pegada -> 2 pegadas -> 3 pegadas -> ?
  const [selectedCount, setSelectedCount] = useState<number | null>(null);

  const hints = [
    "Dica 1: Observe a ordem do tempo. O que um detetive precisa pegar antes de começar a andar?",
    "Dica 2: Na sequência de símbolos, note a repetição: Lupa, Pasta, Lupa, Pasta... Quem vem logo depois?",
    "Dica 3: Conte as pegadas de cada grupo: 1, depois 2, depois 3... Qual número vem a seguir?"
  ];

  // Handler for ordering cards
  const handleSelectCard = (id: string) => {
    sound.playClick();
    if (selectedOrder.includes(id)) {
      setSelectedOrder(selectedOrder.filter(item => item !== id));
    } else {
      setSelectedOrder([...selectedOrder, id]);
    }
  };

  const handleVerifyStep1 = () => {
    sound.playClick();
    if (selectedOrder.length !== 3) {
      sound.playTryAgain();
      setFeedbackMsg("Selecione os 3 passos na ordem do início ao fim!");
      return;
    }

    if (selectedOrder[0] === 'lupa' && selectedOrder[1] === 'pegadas' && selectedOrder[2] === 'arquivo') {
      sound.playSuccess();
      setFeedbackMsg(null);
      setSubStep(2);
    } else {
      sound.playTryAgain();
      setFeedbackMsg("A pista não parece correta. Volte ao arquivo e investigue novamente a ordem dos acontecimentos.");
      setSelectedOrder([]);
    }
  };

  const handleVerifyStep2 = (choice: string) => {
    sound.playClick();
    setSelectedPattern(choice);
    if (choice === '🔎') {
      sound.playSuccess();
      setFeedbackMsg(null);
      setSubStep(3);
    } else {
      sound.playTryAgain();
      setFeedbackMsg("A pista não parece correta. Observe o padrão: Lupa, Pasta, Lupa, Pasta... o que vem a seguir?");
    }
  };

  const handleVerifyStep3 = (choice: number) => {
    sound.playClick();
    setSelectedCount(choice);
    if (choice === 4) {
      sound.playSuccess();
      setFeedbackMsg(null);
      onCompleteCase(1);
      setIsCompleted(true);
    } else {
      sound.playTryAgain();
      setFeedbackMsg("A pista não parece correta. Conte com calma: 1, 2, 3... quantas pegadas vêm agora?");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1522] pb-16 text-slate-100 select-none">
      <CaseHeader
        code={meta.code}
        title={meta.title}
        difficulty={meta.difficulty}
        pair={pair}
        hints={hints}
        onSwapRoles={onSwapRoles}
        onGoToHub={onGoToHub}
        onOpenInventory={onOpenInventory}
        detectiveTip={DETECTIVE_QUOTES.payAttention}
      />

      <div className="max-w-4xl mx-auto px-4">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-6 bg-[#162030] p-3 rounded-xl border border-[#2b3a50]">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-typewriter font-bold text-amber-400">
              Desafio {subStep} de 3
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-8 h-2 rounded-full transition-all ${
                  subStep === step 
                    ? 'bg-amber-400' 
                    : subStep > step 
                    ? 'bg-emerald-500' 
                    : 'bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Error / Encouragement Feedback */}
        {feedbackMsg && (
          <div className="mb-6 p-4 rounded-xl bg-amber-950/40 border-2 border-amber-600/60 text-amber-200 text-sm flex items-center justify-between animate-shake">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🧐</span>
              <p>{feedbackMsg}</p>
            </div>
            <button
              onClick={() => setFeedbackMsg(null)}
              className="text-xs px-2 py-1 bg-amber-800 rounded text-white"
            >
              Tentar Novamente
            </button>
          </div>
        )}

        {/* SUB-CHALLENGE 1: ORDENAR IMAGENS */}
        {subStep === 1 && (
          <div className="bg-[#182335] rounded-2xl p-6 border-2 border-[#caa455]/40 shadow-xl">
            <div className="mb-4">
              <span className="text-xs font-typewriter text-amber-400 font-bold">MISSÃO 1.1 · ORDEM DOS FATOS</span>
              <h3 className="font-serif font-black text-xl text-amber-100 mt-1">
                Como começa a investigação?
              </h3>
              <p className="text-sm text-slate-300 mt-1">
                Clique nos 3 quadros na <strong>ordem correta</strong> em que as coisas acontecem (1º, 2º e 3º):
              </p>
            </div>

            {/* Cards selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              {initialCards.map((card) => {
                const orderIndex = selectedOrder.indexOf(card.id);
                const isSelected = orderIndex !== -1;
                return (
                  <button
                    key={card.id}
                    onClick={() => handleSelectCard(card.id)}
                    className={`p-5 rounded-xl border-2 text-left transition-all relative flex flex-col items-center justify-center gap-3 cursor-pointer ${
                      isSelected 
                        ? 'bg-amber-950/50 border-amber-400 ring-2 ring-amber-400/40' 
                        : 'bg-[#101724] border-[#2e3e56] hover:border-slate-500'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-bold text-sm flex items-center justify-center font-typewriter shadow">
                        {orderIndex + 1}º
                      </div>
                    )}
                    <span className="text-4xl">{card.icon}</span>
                    <span className="font-semibold text-center text-sm text-slate-200">
                      {card.tag}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Current chosen order summary */}
            <div className="bg-[#101724] p-4 rounded-xl border border-[#27364d] flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Sua ordem escolhida:</span>
                {selectedOrder.length === 0 ? (
                  <span className="text-slate-500 italic">Clique nos quadros acima</span>
                ) : (
                  <div className="flex items-center gap-2">
                    {selectedOrder.map((id, idx) => {
                      const item = initialCards.find(c => c.id === id);
                      return (
                        <span key={id} className="bg-amber-500/20 text-amber-300 px-2 py-1 rounded border border-amber-500/40 font-bold">
                          {idx + 1}º {item?.icon}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>

              {selectedOrder.length > 0 && (
                <button
                  onClick={() => setSelectedOrder([])}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Limpar
                </button>
              )}
            </div>

            <button
              onClick={handleVerifyStep1}
              disabled={selectedOrder.length !== 3}
              className={`w-full py-3 rounded-xl font-bold font-serif text-sm transition-all cursor-pointer ${
                selectedOrder.length === 3 
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg' 
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              ▶️ Testar Ordem da Investigação
            </button>
          </div>
        )}

        {/* SUB-CHALLENGE 2: IDENTIFICAR SEQUÊNCIA */}
        {subStep === 2 && (
          <div className="bg-[#182335] rounded-2xl p-6 border-2 border-[#caa455]/40 shadow-xl">
            <div className="mb-4">
              <span className="text-xs font-typewriter text-amber-400 font-bold">MISSÃO 1.2 · SEQUÊNCIA DE PISTAS</span>
              <h3 className="font-serif font-black text-xl text-amber-100 mt-1">
                Qual elemento completa a sequência?
              </h3>
              <p className="text-sm text-slate-300 mt-1">
                Observe o padrão repetido na mesa do detetive:
              </p>
            </div>

            {/* Visual Sequence */}
            <div className="bg-[#0f1724] p-6 rounded-xl border border-[#2e3e56] flex items-center justify-center gap-3 md:gap-6 my-6 overflow-x-auto">
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-600/40 flex flex-col items-center">
                <span className="text-4xl">🔎</span>
                <span className="text-[11px] text-amber-300 mt-1 font-typewriter">Lupa</span>
              </div>
              <span className="text-xl text-slate-500">➔</span>
              <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-600/40 flex flex-col items-center">
                <span className="text-4xl">📁</span>
                <span className="text-[11px] text-sky-300 mt-1 font-typewriter">Pasta</span>
              </div>
              <span className="text-xl text-slate-500">➔</span>
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-600/40 flex flex-col items-center">
                <span className="text-4xl">🔎</span>
                <span className="text-[11px] text-amber-300 mt-1 font-typewriter">Lupa</span>
              </div>
              <span className="text-xl text-slate-500">➔</span>
              <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-600/40 flex flex-col items-center">
                <span className="text-4xl">📁</span>
                <span className="text-[11px] text-sky-300 mt-1 font-typewriter">Pasta</span>
              </div>
              <span className="text-xl text-slate-500">➔</span>
              <div className="p-4 rounded-xl bg-amber-500/20 border-2 border-dashed border-amber-400 flex flex-col items-center animate-pulse">
                <span className="text-4xl text-amber-300">❓</span>
                <span className="text-[11px] text-amber-300 mt-1 font-typewriter">Quem vem?</span>
              </div>
            </div>

            <p className="text-center text-xs text-slate-400 mb-4 font-semibold">
              Clique na opção correta para continuar:
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: '🔎', label: 'Lupa' },
                { icon: '📁', label: 'Pasta' },
                { icon: '☕', label: 'Xícara de Café' },
                { icon: '🚗', label: 'Carro da Agência' },
              ].map((opt) => (
                <button
                  key={opt.icon}
                  onClick={() => handleVerifyStep2(opt.icon)}
                  className="p-4 rounded-xl bg-[#101724] border-2 border-[#2e3e56] hover:border-amber-400 hover:bg-amber-950/20 transition-all flex flex-col items-center gap-2 cursor-pointer"
                >
                  <span className="text-3xl">{opt.icon}</span>
                  <span className="text-xs font-semibold text-slate-200">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SUB-CHALLENGE 3: ELEMENTO SEGUINTE (INCREMENTAL) */}
        {subStep === 3 && (
          <div className="bg-[#182335] rounded-2xl p-6 border-2 border-[#caa455]/40 shadow-xl">
            <div className="mb-4">
              <span className="text-xs font-typewriter text-amber-400 font-bold">MISSÃO 1.3 · QUANTIDADE CRESCENTE</span>
              <h3 className="font-serif font-black text-xl text-amber-100 mt-1">
                Quantas pegadas vêm depois?
              </h3>
              <p className="text-sm text-slate-300 mt-1">
                Siga o rastro no chão da Agência WIT:
              </p>
            </div>

            {/* Visual footprints sequence */}
            <div className="bg-[#0f1724] p-6 rounded-xl border border-[#2e3e56] flex items-center justify-center gap-4 md:gap-6 my-6 overflow-x-auto">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 text-center min-w-[70px]">
                <div className="text-2xl">🐾</div>
                <div className="text-xs font-bold text-amber-400 mt-1">1 Pegada</div>
              </div>
              <span className="text-lg text-slate-500">➔</span>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 text-center min-w-[70px]">
                <div className="text-2xl">🐾 🐾</div>
                <div className="text-xs font-bold text-amber-400 mt-1">2 Pegadas</div>
              </div>
              <span className="text-lg text-slate-500">➔</span>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 text-center min-w-[70px]">
                <div className="text-2xl">🐾 🐾 🐾</div>
                <div className="text-xs font-bold text-amber-400 mt-1">3 Pegadas</div>
              </div>
              <span className="text-lg text-slate-500">➔</span>
              <div className="p-3 bg-amber-500/10 rounded-lg border-2 border-dashed border-amber-400 text-center min-w-[70px] animate-pulse">
                <div className="text-2xl text-amber-300">❓</div>
                <div className="text-xs font-bold text-amber-300 mt-1">Próximo?</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => handleVerifyStep3(4)}
                className="p-5 rounded-xl bg-[#101724] border-2 border-[#2e3e56] hover:border-emerald-400 hover:bg-emerald-950/20 transition-all flex flex-col items-center gap-2 cursor-pointer"
              >
                <div className="text-2xl">🐾 🐾 🐾 🐾</div>
                <span className="text-sm font-bold text-emerald-300">4 Pegadas</span>
              </button>

              <button
                onClick={() => handleVerifyStep3(1)}
                className="p-5 rounded-xl bg-[#101724] border-2 border-[#2e3e56] hover:border-amber-400 hover:bg-amber-950/20 transition-all flex flex-col items-center gap-2 cursor-pointer"
              >
                <div className="text-2xl">🐾</div>
                <span className="text-sm font-bold text-slate-300">1 Pegada</span>
              </button>

              <button
                onClick={() => handleVerifyStep3(6)}
                className="p-5 rounded-xl bg-[#101724] border-2 border-[#2e3e56] hover:border-amber-400 hover:bg-amber-950/20 transition-all flex flex-col items-center gap-2 cursor-pointer"
              >
                <div className="text-2xl">🐾 🐾 🐾 🐾 🐾 🐾</div>
                <span className="text-sm font-bold text-slate-300">6 Pegadas</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {isCompleted && (
        <CaseCompletedModal
          caseNumber={1}
          caseTitle={meta.title}
          clueTitle={meta.clueReward.title}
          clueSymbol={meta.clueReward.symbol}
          clueDescription={meta.clueReward.description}
          pair={pair}
          onNextCase={onNextCase}
          onGoToHub={onGoToHub}
          onOpenNotebook={onOpenNotebook}
          onOpenInventory={onOpenInventory}
        />
      )}
    </div>
  );
};
