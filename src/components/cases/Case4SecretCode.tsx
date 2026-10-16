import React, { useState } from 'react';
import { CaseHeader } from '../CaseHeader';
import { CaseCompletedModal } from '../CaseCompletedModal';
import { CASES_META, DETECTIVE_QUOTES } from '../../data/casesData';
import { StudentPair } from '../../types';
import { sound } from '../../utils/audio';
import { KeyRound, ShieldAlert, CheckCircle, ArrowRight } from 'lucide-react';

interface Case4Props {
  pair: StudentPair;
  onCompleteCase: (caseId: number) => void;
  onSwapRoles: () => void;
  onGoToHub: () => void;
  onNextCase: () => void;
  onOpenNotebook: () => void;
  onOpenInventory?: () => void;
}

export const Case4SecretCode: React.FC<Case4Props> = ({
  pair,
  onCompleteCase,
  onSwapRoles,
  onGoToHub,
  onNextCase,
  onOpenNotebook,
  onOpenInventory,
}) => {
  const meta = CASES_META[3];
  const [subStep, setSubStep] = useState<1 | 2 | 3>(1);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // Desafio 1: 🟢 → ⭐ → 🔵 → 🟡  => "2375"
  const [input1, setInput1] = useState<string[]>(['', '', '', '']);

  // Desafio 2: ⭐ → 🟡 → 🟢 → 🔵  => "3527"
  const [input2, setInput2] = useState<string[]>(['', '', '', '']);

  // Desafio 3: 🟡 → 🟢 → ⭐  => "523" (with distractor 🟣=9)
  const [input3, setInput3] = useState<string[]>(['', '', '']);

  const hints = [
    "Dica 1: Olhe cada símbolo no quadro e encontre o número correspondente na tabela.",
    "Dica 2: Faça um por um: primeiro o primeiro símbolo, depois o segundo...",
    "Dica 3: No último desafio, atenção: nem todas as informações da tabela são necessárias!"
  ];

  const handleDigitChange = (
    val: string,
    index: number,
    array: string[],
    setArray: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    sound.playClick();
    const clean = val.replace(/\D/g, '').slice(-1);
    const newArr = [...array];
    newArr[index] = clean;
    setArray(newArr);
  };

  const handleVerifyStep1 = () => {
    sound.playClick();
    const result = input1.join('');
    if (result === '2375') {
      sound.playSuccess();
      setFeedback(null);
      setSubStep(2);
    } else {
      sound.playTryAgain();
      setFeedback("A pista não parece correta. Veja a tabela: 🟢 vale 2, ⭐ vale 3, 🔵 vale 7, 🟡 vale 5. Tente novamente!");
    }
  };

  const handleVerifyStep2 = () => {
    sound.playClick();
    const result = input2.join('');
    if (result === '3527') {
      sound.playSuccess();
      setFeedback(null);
      setSubStep(3);
    } else {
      sound.playTryAgain();
      setFeedback("A pista não parece correta. Verifique a nova ordem: ⭐ primeiro (3), depois 🟡 (5)...");
    }
  };

  const handleVerifyStep3 = () => {
    sound.playClick();
    const result = input3.join('');
    if (result === '523') {
      sound.playSuccess();
      setFeedback(null);
      onCompleteCase(4);
      setIsCompleted(true);
    } else {
      sound.playTryAgain();
      setFeedback("A pista não parece correta. Lembre-se de ignorar a cor roxa (🟣)! Concentre-se apenas em 🟡, 🟢 e ⭐.");
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
        detectiveTip="Bons investigadores sabem filtrar as informações que realmente importam!"
      />

      <div className="max-w-4xl mx-auto px-4">
        {/* Step indicator */}
        <div className="flex items-center justify-between mb-6 bg-[#162030] p-3 rounded-xl border border-[#2b3a50]">
          <span className="text-xs uppercase font-typewriter font-bold text-amber-400">
            Desafio {subStep} de 3 · Criptografia e Decodificação
          </span>
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

        {/* Decoder Reference Board (Always visible on top of desk) */}
        <div className="bg-[#5c3e21] rounded-2xl p-5 border-4 border-[#3e2713] shadow-2xl mb-6 relative">
          <div className="flex items-center justify-between border-b border-[#7e5531] pb-2 mb-3">
            <span className="text-xs font-typewriter font-bold text-amber-200 tracking-wider flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-amber-300" />
              QUADRO DE DECODIFICAÇÃO OFICIAL
            </span>
            <span className="text-[11px] bg-black/30 px-2 py-0.5 rounded text-amber-100 font-typewriter">
              TABELA DE CONVERSÃO
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3 text-center">
            <div className="bg-parchment p-2.5 rounded-lg border-2 border-[#caa455] text-slate-900 shadow">
              <span className="text-2xl sm:text-3xl">⭐</span>
              <div className="text-xs text-slate-600 font-bold mt-1">Estrela</div>
              <div className="text-xl sm:text-2xl font-serif font-black text-amber-900 mt-1">= 3</div>
            </div>

            <div className="bg-parchment p-2.5 rounded-lg border-2 border-[#caa455] text-slate-900 shadow">
              <span className="text-2xl sm:text-3xl">🔵</span>
              <div className="text-xs text-slate-600 font-bold mt-1">Azul</div>
              <div className="text-xl sm:text-2xl font-serif font-black text-amber-900 mt-1">= 7</div>
            </div>

            <div className="bg-parchment p-2.5 rounded-lg border-2 border-[#caa455] text-slate-900 shadow">
              <span className="text-2xl sm:text-3xl">🟢</span>
              <div className="text-xs text-slate-600 font-bold mt-1">Verde</div>
              <div className="text-xl sm:text-2xl font-serif font-black text-amber-900 mt-1">= 2</div>
            </div>

            <div className="bg-parchment p-2.5 rounded-lg border-2 border-[#caa455] text-slate-900 shadow">
              <span className="text-2xl sm:text-3xl">🟡</span>
              <div className="text-xs text-slate-600 font-bold mt-1">Amarelo</div>
              <div className="text-xl sm:text-2xl font-serif font-black text-amber-900 mt-1">= 5</div>
            </div>

            {/* Distractor displayed in step 3 */}
            {subStep === 3 && (
              <div className="bg-[#f0e4d2] p-2.5 rounded-lg border-2 border-dashed border-red-500 text-slate-900 shadow relative">
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                  DISTRATOR
                </span>
                <span className="text-2xl sm:text-3xl opacity-75">🟣</span>
                <div className="text-xs text-slate-600 font-bold mt-1">Roxo</div>
                <div className="text-xl sm:text-2xl font-serif font-black text-slate-700 mt-1">= 9</div>
              </div>
            )}
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

        {/* SUB 1: 🟢 → ⭐ → 🔵 → 🟡 */}
        {subStep === 1 && (
          <div className="bg-[#182335] rounded-2xl p-6 border-2 border-[#caa455]/40 shadow-xl">
            <span className="text-xs font-typewriter text-amber-400 font-bold">CÓDIGO 1 DE 3 · COMBINAÇÃO PRIMÁRIA</span>
            <h3 className="font-serif font-black text-xl text-amber-100 mt-1">
              Decodifique a Sequência de Símbolos
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Consulte a tabela acima e digite o número correspondente a cada símbolo:
            </p>

            <div className="my-6 bg-[#0f1724] p-6 rounded-xl border border-[#2c3c52] flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
              {[
                { symbol: '🟢', name: 'Verde' },
                { symbol: '⭐', name: 'Estrela' },
                { symbol: '🔵', name: 'Azul' },
                { symbol: '🟡', name: 'Amarelo' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <span className="text-4xl mb-2">{item.symbol}</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={input1[index]}
                      onChange={(e) => handleDigitChange(e.target.value, index, input1, setInput1)}
                      placeholder="?"
                      className="w-14 h-14 text-center bg-[#182335] border-2 border-amber-400/80 rounded-xl text-2xl font-serif font-black text-amber-200 focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-400/30"
                      maxLength={1}
                    />
                  </div>
                  {index < 3 && <span className="text-xl text-slate-500 hidden md:block">➔</span>}
                </div>
              ))}
            </div>

            <button
              onClick={handleVerifyStep1}
              disabled={input1.some(d => d === '')}
              className={`w-full py-3.5 rounded-xl font-bold font-serif text-sm transition-all cursor-pointer ${
                input1.every(d => d !== '')
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              ▶️ Testar Código Decodificado
            </button>
          </div>
        )}

        {/* SUB 2: ⭐ → 🟡 → 🟢 → 🔵 */}
        {subStep === 2 && (
          <div className="bg-[#182335] rounded-2xl p-6 border-2 border-[#caa455]/40 shadow-xl">
            <span className="text-xs font-typewriter text-amber-400 font-bold">CÓDIGO 2 DE 3 · NOVA SEQUÊNCIA</span>
            <h3 className="font-serif font-black text-xl text-amber-100 mt-1">
              Decodifique a Segunda Sequência
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Os símbolos mudaram de lugar! Olhe a tabela com atenção:
            </p>

            <div className="my-6 bg-[#0f1724] p-6 rounded-xl border border-[#2c3c52] flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
              {[
                { symbol: '⭐', name: 'Estrela' },
                { symbol: '🟡', name: 'Amarelo' },
                { symbol: '🟢', name: 'Verde' },
                { symbol: '🔵', name: 'Azul' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <span className="text-4xl mb-2">{item.symbol}</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={input2[index]}
                      onChange={(e) => handleDigitChange(e.target.value, index, input2, setInput2)}
                      placeholder="?"
                      className="w-14 h-14 text-center bg-[#182335] border-2 border-amber-400/80 rounded-xl text-2xl font-serif font-black text-amber-200 focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-400/30"
                      maxLength={1}
                    />
                  </div>
                  {index < 3 && <span className="text-xl text-slate-500 hidden md:block">➔</span>}
                </div>
              ))}
            </div>

            <button
              onClick={handleVerifyStep2}
              disabled={input2.some(d => d === '')}
              className={`w-full py-3.5 rounded-xl font-bold font-serif text-sm transition-all cursor-pointer ${
                input2.every(d => d !== '')
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              ▶️ Testar Segunda Sequência
            </button>
          </div>
        )}

        {/* SUB 3: 🟡 → 🟢 → ⭐ (WITH DISTRACTOR) */}
        {subStep === 3 && (
          <div className="bg-[#182335] rounded-2xl p-6 border-2 border-[#caa455]/40 shadow-xl">
            <span className="text-xs font-typewriter text-amber-400 font-bold">CÓDIGO 3 DE 3 · FILTRAGEM DE INFORMAÇÕES</span>
            <h3 className="font-serif font-black text-xl text-amber-100 mt-1">
              Descubra apenas o que é importante!
            </h3>
            
            <div className="p-3 bg-red-950/30 border border-red-700/60 rounded-xl my-3 text-xs text-red-200 flex items-start gap-2">
              <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <strong>Atenção ao Ruído:</strong> O símbolo roxo <strong>(🟣 = 9)</strong> apareceu na tabela, mas a pista encontrada na cena pede apenas a senha dos 3 símbolos abaixo. Ignore o que não é necessário!
              </div>
            </div>

            <div className="my-6 bg-[#0f1724] p-6 rounded-xl border border-[#2c3c52] flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
              {[
                { symbol: '🟡', name: 'Amarelo' },
                { symbol: '🟢', name: 'Verde' },
                { symbol: '⭐', name: 'Estrela' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <span className="text-4xl mb-2">{item.symbol}</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={input3[index]}
                      onChange={(e) => handleDigitChange(e.target.value, index, input3, setInput3)}
                      placeholder="?"
                      className="w-14 h-14 text-center bg-[#182335] border-2 border-amber-400/80 rounded-xl text-2xl font-serif font-black text-amber-200 focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-400/30"
                      maxLength={1}
                    />
                  </div>
                  {index < 2 && <span className="text-xl text-slate-500 hidden md:block">➔</span>}
                </div>
              ))}
            </div>

            <button
              onClick={handleVerifyStep3}
              disabled={input3.some(d => d === '')}
              className={`w-full py-3.5 rounded-xl font-bold font-serif text-sm transition-all cursor-pointer ${
                input3.every(d => d !== '')
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              ▶️ Finalizar Decodificação
            </button>
          </div>
        )}
      </div>

      {isCompleted && (
        <CaseCompletedModal
          caseNumber={4}
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
