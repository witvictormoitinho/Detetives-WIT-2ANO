import React, { useState } from 'react';
import { CaseHeader } from '../CaseHeader';
import { CaseCompletedModal } from '../CaseCompletedModal';
import { CASES_META, DETECTIVE_QUOTES } from '../../data/casesData';
import { StudentPair } from '../../types';
import { sound } from '../../utils/audio';
import { Folder, FileText, ArrowRight, RotateCcw } from 'lucide-react';

interface Case3Props {
  pair: StudentPair;
  onCompleteCase: (caseId: number) => void;
  onSwapRoles: () => void;
  onGoToHub: () => void;
  onNextCase: () => void;
  onOpenNotebook: () => void;
  onOpenInventory?: () => void;
}

export const Case3MessyDesk: React.FC<Case3Props> = ({
  pair,
  onCompleteCase,
  onSwapRoles,
  onGoToHub,
  onNextCase,
  onOpenNotebook,
  onOpenInventory,
}) => {
  const meta = CASES_META[2];
  const [subStep, setSubStep] = useState<1 | 2 | 3 | 4>(1);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // Sub-challenge 1: Ascending order: [7, 2, 9, 4] -> [2, 4, 7, 9]
  const [orderNumbers, setOrderNumbers] = useState<number[]>([]);

  // Sub-challenge 2: Image chronology (computer power-up)
  // Target order: 'desligado' -> 'conectar' -> 'ligado'
  const [chronoOrder, setChronoOrder] = useState<string[]>([]);

  // Sub-challenge 3: Primeiro / Depois / Por Último
  // 'cracha' -> 'pasta' -> 'anotar'
  const [routineOrder, setRoutineOrder] = useState<string[]>([]);

  // Sub-challenge 4: Find the odd one out
  // Options: Lupa, Lanterna, Bloco, Melancia (Melancia is odd)
  const [selectedOdd, setSelectedOdd] = useState<string | null>(null);

  const hints = [
    "Dica 1: Na ordem crescente, comece sempre pelo menor número de todos.",
    "Dica 2: Pense no que acontece primeiro no tempo antes do próximo passo.",
    "Dica 3: Qual destes objetos NÃO serve para investigar mistérios na agência?"
  ];

  // SUB 1: Ascending numbers
  const handleSelectNumber = (num: number) => {
    sound.playClick();
    if (orderNumbers.includes(num)) {
      setOrderNumbers(orderNumbers.filter(n => n !== num));
    } else {
      setOrderNumbers([...orderNumbers, num]);
    }
  };

  const handleVerifyStep1 = () => {
    sound.playClick();
    if (orderNumbers.length !== 4) {
      sound.playTryAgain();
      setFeedback("Selecione os 4 documentos na mesa para ordenar.");
      return;
    }

    if (orderNumbers[0] === 2 && orderNumbers[1] === 4 && orderNumbers[2] === 7 && orderNumbers[3] === 9) {
      sound.playSuccess();
      setFeedback(null);
      setSubStep(2);
    } else {
      sound.playTryAgain();
      setFeedback("A pista não parece correta. Do menor para o maior: qual é o menor número da mesa?");
      setOrderNumbers([]);
    }
  };

  // SUB 2: Chronology
  const handleSelectChrono = (id: string) => {
    sound.playClick();
    if (chronoOrder.includes(id)) {
      setChronoOrder(chronoOrder.filter(item => item !== id));
    } else {
      setChronoOrder([...chronoOrder, id]);
    }
  };

  const handleVerifyStep2 = () => {
    sound.playClick();
    if (chronoOrder.length !== 3) {
      sound.playTryAgain();
      setFeedback("Selecione os 3 momentos da investigação na ordem correta.");
      return;
    }

    if (chronoOrder[0] === 'desligado' && chronoOrder[1] === 'conectar' && chronoOrder[2] === 'ligado') {
      sound.playSuccess();
      setFeedback(null);
      setSubStep(3);
    } else {
      sound.playTryAgain();
      setFeedback("A pista não parece correta. Primeiro percebemos o problema, depois conectamos o cabo, e por fim o computador liga!");
      setChronoOrder([]);
    }
  };

  // SUB 3: Primeiro / Depois / Por Último
  const handleSelectRoutine = (id: string) => {
    sound.playClick();
    if (routineOrder.includes(id)) {
      setRoutineOrder(routineOrder.filter(item => item !== id));
    } else {
      setRoutineOrder([...routineOrder, id]);
    }
  };

  const handleVerifyStep3 = () => {
    sound.playClick();
    if (routineOrder.length !== 3) {
      sound.playTryAgain();
      setFeedback("Escolha o que é feito: Primeiro, Depois e Por Último!");
      return;
    }

    if (routineOrder[0] === 'cracha' && routineOrder[1] === 'pasta' && routineOrder[2] === 'anotar') {
      sound.playSuccess();
      setFeedback(null);
      setSubStep(4);
    } else {
      sound.playTryAgain();
      setFeedback("A pista não parece correta. Primeiro o detetive coloca o crachá ao chegar, depois lê a pasta, e anota suas pistas.");
      setRoutineOrder([]);
    }
  };

  // SUB 4: Odd item out
  const handleVerifyStep4 = (item: string) => {
    sound.playClick();
    setSelectedOdd(item);
    if (item === 'melancia') {
      sound.playSuccess();
      setFeedback(null);
      onCompleteCase(3);
      setIsCompleted(true);
    } else {
      sound.playTryAgain();
      setFeedback("A pista não parece correta. Esse objeto é uma ferramenta de trabalho do detetive. Procure o que NÃO pertence à agência!");
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
        detectiveTip={DETECTIVE_QUOTES.importantClue}
      />

      <div className="max-w-4xl mx-auto px-4">
        {/* Step indicator */}
        <div className="flex items-center justify-between mb-6 bg-[#162030] p-3 rounded-xl border border-[#2b3a50]">
          <span className="text-xs uppercase font-typewriter font-bold text-amber-400">
            Desafio {subStep} de 4 · Organização de Informações
          </span>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-7 h-2 rounded-full transition-all ${
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

        {feedback && (
          <div className="mb-5 p-3.5 rounded-xl bg-amber-950/40 border border-amber-600/60 text-amber-200 text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🧐</span>
              <p>{feedback}</p>
            </div>
            <button
              onClick={() => setFeedback(null)}
              className="text-xs px-2 py-1 bg-amber-800 rounded text-white"
            >
              OK
            </button>
          </div>
        )}

        {/* SUB 1: ORDEM CRESCENTE */}
        {subStep === 1 && (
          <div className="bg-[#182335] rounded-2xl p-6 border-2 border-[#caa455]/40 shadow-xl">
            <span className="text-xs font-typewriter text-amber-400 font-bold">DESAFIO 3.1 · ORDEM CRESCENTE</span>
            <h3 className="font-serif font-black text-xl text-amber-100 mt-1">
              Organize os relatórios do MENOR para o MAIOR
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              A mesa da agência tem documentos numerados fora de ordem. Clique neles na ordem crescente:
            </p>

            {/* Scattered number cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
              {[7, 2, 9, 4].map((num) => {
                const idx = orderNumbers.indexOf(num);
                const isSelected = idx !== -1;
                return (
                  <button
                    key={num}
                    onClick={() => handleSelectNumber(num)}
                    className={`p-6 rounded-xl border-2 transition-all relative flex flex-col items-center justify-center cursor-pointer ${
                      isSelected
                        ? 'bg-amber-950/60 border-amber-400 ring-2 ring-amber-400/30'
                        : 'bg-[#101724] border-[#2c3c52] hover:border-slate-400'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center font-typewriter">
                        {idx + 1}º
                      </span>
                    )}
                    <span className="text-xs text-slate-400 font-typewriter uppercase">Doc #</span>
                    <span className="text-4xl font-serif font-black text-amber-200 mt-1">
                      {num}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="bg-[#101724] p-3 rounded-xl border border-[#27364d] flex items-center justify-between mb-4">
              <div className="text-xs text-slate-300 flex items-center gap-2">
                <span>Ordem escolhida:</span>
                {orderNumbers.length === 0 ? (
                  <span className="text-slate-500 italic">Clique nos cartões</span>
                ) : (
                  orderNumbers.map((n, i) => (
                    <span key={i} className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold font-serif text-sm">
                      {n}
                    </span>
                  ))
                )}
              </div>
              {orderNumbers.length > 0 && (
                <button
                  onClick={() => setOrderNumbers([])}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Reiniciar
                </button>
              )}
            </div>

            <button
              onClick={handleVerifyStep1}
              disabled={orderNumbers.length !== 4}
              className={`w-full py-3 rounded-xl font-bold font-serif text-sm transition-all cursor-pointer ${
                orderNumbers.length === 4
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              ▶️ Verificar Ordem Crescente
            </button>
          </div>
        )}

        {/* SUB 2: SEQUÊNCIA DE IMAGENS */}
        {subStep === 2 && (
          <div className="bg-[#182335] rounded-2xl p-6 border-2 border-[#caa455]/40 shadow-xl">
            <span className="text-xs font-typewriter text-amber-400 font-bold">DESAFIO 3.2 · SEQUÊNCIA TEMPORAL</span>
            <h3 className="font-serif font-black text-xl text-amber-100 mt-1">
              Como consertar a energia do computador?
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Clique nos 3 momentos na <strong>ordem cronológica correta</strong>:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              {[
                { id: 'ligado', icon: '💻⚡', title: 'Computador Ligado', desc: 'A tela acende e o led verde brilha!' },
                { id: 'desligado', icon: '🔌❓', title: 'Cabo Desconectado', desc: 'O detetive nota o fio solto perto do chão.' },
                { id: 'conectar', icon: '🛠️🔌', title: 'Conectar na Tomada', desc: 'O analista pluga o cabo firmemente.' },
              ].map((card) => {
                const idx = chronoOrder.indexOf(card.id);
                const isSelected = idx !== -1;
                return (
                  <button
                    key={card.id}
                    onClick={() => handleSelectChrono(card.id)}
                    className={`p-5 rounded-xl border-2 text-left relative transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-950/60 border-amber-400 ring-2 ring-amber-400/30'
                        : 'bg-[#101724] border-[#2c3c52] hover:border-slate-400'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center font-typewriter">
                        {idx + 1}º
                      </span>
                    )}
                    <div className="text-3xl mb-2">{card.icon}</div>
                    <h4 className="font-bold text-sm text-slate-100">{card.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{card.desc}</p>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleVerifyStep2}
              disabled={chronoOrder.length !== 3}
              className={`w-full py-3 rounded-xl font-bold font-serif text-sm transition-all cursor-pointer ${
                chronoOrder.length === 3
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              ▶️ Verificar Sequência de Ações
            </button>
          </div>
        )}

        {/* SUB 3: PRIMEIRO / DEPOIS / POR ÚLTIMO */}
        {subStep === 3 && (
          <div className="bg-[#182335] rounded-2xl p-6 border-2 border-[#caa455]/40 shadow-xl">
            <span className="text-xs font-typewriter text-amber-400 font-bold">DESAFIO 3.3 · ROTINA DA AGÊNCIA</span>
            <h3 className="font-serif font-black text-xl text-amber-100 mt-1">
              Primeiro, Depois e Por Último
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Como um detetive organiza seu dia de investigação?
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              {[
                { id: 'anotar', icon: '📝', title: 'Anotar as Conclusões', desc: 'Registrar todas as provas encontradas no caderno.' },
                { id: 'cracha', icon: '🪪', title: 'Colocar o Crachá Oficial', desc: 'Identificar-se na portaria de segurança da agência.' },
                { id: 'pasta', icon: '📂', title: 'Ler o Dossiê do Caso', desc: 'Analisar as primeiras pistas deixadas na mesa.' },
              ].map((card) => {
                const idx = routineOrder.indexOf(card.id);
                const isSelected = idx !== -1;
                return (
                  <button
                    key={card.id}
                    onClick={() => handleSelectRoutine(card.id)}
                    className={`p-5 rounded-xl border-2 text-left relative transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-950/60 border-amber-400 ring-2 ring-amber-400/30'
                        : 'bg-[#101724] border-[#2c3c52] hover:border-slate-400'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center font-typewriter">
                        {idx === 0 ? '1º (Primeiro)' : idx === 1 ? '2º (Depois)' : '3º (Por Último)'}
                      </span>
                    )}
                    <div className="text-3xl mb-2">{card.icon}</div>
                    <h4 className="font-bold text-sm text-slate-100">{card.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{card.desc}</p>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleVerifyStep3}
              disabled={routineOrder.length !== 3}
              className={`w-full py-3 rounded-xl font-bold font-serif text-sm transition-all cursor-pointer ${
                routineOrder.length === 3
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              ▶️ Confirmar Rotina de Investigação
            </button>
          </div>
        )}

        {/* SUB 4: O INTRUSO */}
        {subStep === 4 && (
          <div className="bg-[#182335] rounded-2xl p-6 border-2 border-[#caa455]/40 shadow-xl">
            <span className="text-xs font-typewriter text-amber-400 font-bold">DESAFIO 3.4 · ENCONTRAR O INTRUSO</span>
            <h3 className="font-serif font-black text-xl text-amber-100 mt-1">
              Qual objeto NÃO pertence ao grupo de investigação?
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Alguém deixou cair algo que não faz parte das ferramentas de um detetive. Clique no intruso:
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
              {[
                { id: 'lupa', icon: '🔍', title: 'Lupa Óptica', desc: 'Para ver detalhes mínimos' },
                { id: 'lanterna', icon: '🔦', title: 'Lanterna Tática', desc: 'Para iluminar cantos escuros' },
                { id: 'bloco', icon: '📓', title: 'Caderno de Notas', desc: 'Para anotar as evidências' },
                { id: 'melancia', icon: '🍉', title: 'Fatia de Melancia', desc: 'Um lanche esquecido na mesa!' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleVerifyStep4(item.id)}
                  className="p-5 rounded-xl bg-[#101724] border-2 border-[#2b3c54] hover:border-amber-400 hover:bg-amber-950/20 transition-all flex flex-col items-center text-center gap-2 cursor-pointer"
                >
                  <span className="text-4xl">{item.icon}</span>
                  <h4 className="font-bold text-sm text-slate-100">{item.title}</h4>
                  <p className="text-[11px] text-slate-400">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {isCompleted && (
        <CaseCompletedModal
          caseNumber={3}
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
