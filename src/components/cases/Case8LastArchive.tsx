import React, { useState } from 'react';
import { CaseHeader } from '../CaseHeader';
import { CaseCompletedModal } from '../CaseCompletedModal';
import { CASES_META, DETECTIVE_QUOTES } from '../../data/casesData';
import { StudentPair } from '../../types';
import { sound } from '../../utils/audio';
import { FileSearch, CheckCircle, ShieldAlert, BookOpen, Key, Sparkles } from 'lucide-react';

interface Case8Props {
  pair: StudentPair;
  onCompleteCase: (caseId: number) => void;
  onSwapRoles: () => void;
  onGoToHub: () => void;
  onNextCase: () => void;
  onOpenNotebook: () => void;
  onOpenInventory?: () => void;
}

export const Case8LastArchive: React.FC<Case8Props> = ({
  pair,
  onCompleteCase,
  onSwapRoles,
  onGoToHub,
  onNextCase,
  onOpenNotebook,
  onOpenInventory,
}) => {
  const meta = CASES_META[7];
  const [activeTab, setActiveTab] = useState<'dossie' | 'sequencia' | 'protocolo'>('dossie');
  const [checkpoint1, setCheckpoint1] = useState<string>(''); // '8'
  const [checkpoint2, setCheckpoint2] = useState<string>(''); // '35'
  const [checkpoint3, setCheckpoint3] = useState<string>(''); // '8351'
  const [validatedStages, setValidatedStages] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const hints = [
    "Dica 1: Abra a aba 'Relatórios de Evidências' para reler todas as pistas que vocês descobriram até agora.",
    "Dica 2: Cada checkpoint pede a confirmação de uma parte do código mestre da agência.",
    "Dica 3: O código final completo é a união dos 4 números: Verde (8), Estrela (3), Azul (5) e Amarelo (1)."
  ];

  const handleVerifyCheckpoint1 = () => {
    sound.playClick();
    if (checkpoint1.trim() === '8') {
      sound.playSuccess();
      setValidatedStages([...validatedStages, 1]);
      setFeedback(null);
    } else {
      sound.playTryAgain();
      setFeedback("A pista não parece correta. Qual é o valor numérico do primeiro símbolo (🟢)? Olhe na aba 'Relatórios de Evidências'.");
    }
  };

  const handleVerifyCheckpoint2 = () => {
    sound.playClick();
    if (checkpoint2.trim() === '35') {
      sound.playSuccess();
      setValidatedStages([...validatedStages, 2]);
      setFeedback(null);
    } else {
      sound.playTryAgain();
      setFeedback("A pista não parece correta. Junte os valores de ⭐ (3) e 🔵 (5) para formar 35!");
    }
  };

  const handleVerifyCheckpoint3 = () => {
    sound.playClick();
    if (checkpoint3.trim() === '8351') {
      sound.playSuccess();
      setValidatedStages([...validatedStages, 3]);
      setFeedback(null);
      onCompleteCase(8);
      setIsCompleted(true);
    } else {
      sound.playTryAgain();
      setFeedback("A pista não parece correta. Digite a senha completa com os 4 números ordenados: 8351.");
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
        detectiveTip="Este é o teste dos mestres: revisar tudo o que aprendemos para abrir o computador!"
      />

      <div className="max-w-4xl mx-auto px-4">
        {/* Dossier Tabs Container */}
        <div className="bg-[#182335] rounded-2xl border-2 border-[#caa455]/40 shadow-2xl overflow-hidden">
          
          {/* Top Folder Tab Navigation */}
          <div className="bg-[#111827] px-4 pt-3 border-b border-[#2b3c54] flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('dossie');
              }}
              className={`px-4 py-2.5 rounded-t-xl text-xs font-bold font-typewriter flex items-center gap-2 transition-colors cursor-pointer border-t border-x ${
                activeTab === 'dossie'
                  ? 'bg-[#182335] text-amber-300 border-[#caa455]/60 border-b-transparent'
                  : 'bg-[#151e2d] text-slate-400 border-transparent hover:text-white'
              }`}
            >
              <span>📁</span>
              <span>1. Relatório de Evidências</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('sequencia');
              }}
              className={`px-4 py-2.5 rounded-t-xl text-xs font-bold font-typewriter flex items-center gap-2 transition-colors cursor-pointer border-t border-x ${
                activeTab === 'sequencia'
                  ? 'bg-[#182335] text-amber-300 border-[#caa455]/60 border-b-transparent'
                  : 'bg-[#151e2d] text-slate-400 border-transparent hover:text-white'
              }`}
            >
              <span>🧩</span>
              <span>2. Sequência de Segurança</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('protocolo');
              }}
              className={`px-4 py-2.5 rounded-t-xl text-xs font-bold font-typewriter flex items-center gap-2 transition-colors cursor-pointer border-t border-x ${
                activeTab === 'protocolo'
                  ? 'bg-[#182335] text-amber-300 border-[#caa455]/60 border-b-transparent'
                  : 'bg-[#151e2d] text-slate-400 border-transparent hover:text-white'
              }`}
            >
              <span>🔐</span>
              <span>3. Validação dos Checkpoints ({validatedStages.length}/3)</span>
            </button>
          </div>

          <div className="p-6">
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

            {/* TAB 1: EVIDENCES ARCHIVE */}
            {activeTab === 'dossie' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-serif font-black text-xl text-amber-100">
                      Dossiê Geral de Evidências
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Informações catalogadas durante os Casos 01 a 07 da investigação:
                    </p>
                  </div>
                  <span className="text-xs font-typewriter bg-amber-950/50 text-amber-300 border border-amber-600/40 px-2.5 py-1 rounded">
                    ARQUIVO OFICIAL WIT
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#101724] p-4 rounded-xl border border-[#2b3c54]">
                    <div className="text-xs font-bold text-amber-400 font-typewriter mb-1">
                      DOCUMENTO 1 · CASO 02
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">🟢</span>
                      <div>
                        <div className="font-serif font-bold text-slate-100">Símbolo Esmeralda</div>
                        <div className="text-xs text-slate-400">Valor codificado = <strong>8</strong></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#101724] p-4 rounded-xl border border-[#2b3c54]">
                    <div className="text-xs font-bold text-amber-400 font-typewriter mb-1">
                      DOCUMENTO 2 · CASO 03
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">⭐</span>
                      <div>
                        <div className="font-serif font-bold text-slate-100">Símbolo Estrela Dourada</div>
                        <div className="text-xs text-slate-400">Valor codificado = <strong>3</strong></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#101724] p-4 rounded-xl border border-[#2b3c54]">
                    <div className="text-xs font-bold text-amber-400 font-typewriter mb-1">
                      DOCUMENTO 3 · CASO 05
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">🔵</span>
                      <div>
                        <div className="font-serif font-bold text-slate-100">Símbolo Azul Safira</div>
                        <div className="text-xs text-slate-400">Valor codificado = <strong>5</strong></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#101724] p-4 rounded-xl border border-[#2b3c54]">
                    <div className="text-xs font-bold text-amber-400 font-typewriter mb-1">
                      DOCUMENTO 4 · CASO 06
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">🟡</span>
                      <div>
                        <div className="font-serif font-bold text-slate-100">Símbolo Amarelo Topázio</div>
                        <div className="text-xs text-slate-400">Valor codificado = <strong>1</strong></div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('sequencia');
                  }}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition-all cursor-pointer"
                >
                  Continuar para a Sequência de Segurança ➔
                </button>
              </div>
            )}

            {/* TAB 2: SEQUENCE ORDER */}
            {activeTab === 'sequencia' && (
              <div>
                <h3 className="font-serif font-black text-xl text-amber-100 mb-1">
                  Ordem de Liberação do Sistema
                </h3>
                <p className="text-xs text-slate-300 mb-6">
                  Para o sistema da agência aceitar o código, os símbolos precisam estar na ordem temporal correta:
                </p>

                <div className="bg-[#101724] p-6 rounded-xl border border-[#2b3c54] flex flex-col md:flex-row items-center justify-around gap-4 mb-6">
                  <div className="text-center">
                    <span className="text-4xl">🟢</span>
                    <div className="text-xs font-bold text-amber-400 mt-2 font-typewriter">1º Símbolo</div>
                    <div className="text-sm font-serif font-black text-slate-200 mt-1">Valor: 8</div>
                  </div>
                  <span className="text-2xl text-slate-500 hidden md:block">➔</span>

                  <div className="text-center">
                    <span className="text-4xl">⭐</span>
                    <div className="text-xs font-bold text-amber-400 mt-2 font-typewriter">2º Símbolo</div>
                    <div className="text-sm font-serif font-black text-slate-200 mt-1">Valor: 3</div>
                  </div>
                  <span className="text-2xl text-slate-500 hidden md:block">➔</span>

                  <div className="text-center">
                    <span className="text-4xl">🔵</span>
                    <div className="text-xs font-bold text-amber-400 mt-2 font-typewriter">3º Símbolo</div>
                    <div className="text-sm font-serif font-black text-slate-200 mt-1">Valor: 5</div>
                  </div>
                  <span className="text-2xl text-slate-500 hidden md:block">➔</span>

                  <div className="text-center">
                    <span className="text-4xl">🟡</span>
                    <div className="text-xs font-bold text-amber-400 mt-2 font-typewriter">4º Símbolo</div>
                    <div className="text-sm font-serif font-black text-slate-200 mt-1">Valor: 1</div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('protocolo');
                  }}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition-all cursor-pointer"
                >
                  Ir para a Validação dos 3 Checkpoints ➔
                </button>
              </div>
            )}

            {/* TAB 3: 3-STAGE PROTOCOL VALIDATION */}
            {activeTab === 'protocolo' && (
              <div className="space-y-6">
                <h3 className="font-serif font-black text-xl text-amber-100 mb-1">
                  Validação Criptográfica da Agência
                </h3>
                <p className="text-xs text-slate-300">
                  Responda aos 3 checkpoints para gerar a chave de liberação do Computador Central:
                </p>

                {/* Checkpoint 1 */}
                <div className={`p-4 rounded-xl border-2 transition-all ${
                  validatedStages.includes(1) 
                    ? 'bg-emerald-950/30 border-emerald-500' 
                    : 'bg-[#101724] border-[#2b3c54]'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-typewriter text-amber-400 font-bold">
                      CHECKPOINT 1 · PRIMEIRO SÍMBOLO (🟢)
                    </span>
                    {validatedStages.includes(1) && (
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 font-typewriter">
                        <CheckCircle className="w-3.5 h-3.5" /> CONFIRMADO
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mb-3">
                    Qual o número correspondente à cor verde esmeralda (🟢)?
                  </p>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      disabled={validatedStages.includes(1)}
                      value={checkpoint1}
                      onChange={(e) => setCheckpoint1(e.target.value)}
                      placeholder="Ex: 8"
                      className="px-4 py-2 bg-[#182335] border border-slate-700 rounded-lg text-sm text-white w-32 focus:border-amber-400 focus:outline-none"
                    />
                    {!validatedStages.includes(1) && (
                      <button
                        onClick={handleVerifyCheckpoint1}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg cursor-pointer"
                      >
                        Validar
                      </button>
                    )}
                  </div>
                </div>

                {/* Checkpoint 2 */}
                <div className={`p-4 rounded-xl border-2 transition-all ${
                  !validatedStages.includes(1)
                    ? 'opacity-50 pointer-events-none'
                    : validatedStages.includes(2) 
                    ? 'bg-emerald-950/30 border-emerald-500' 
                    : 'bg-[#101724] border-[#2b3c54]'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-typewriter text-amber-400 font-bold">
                      CHECKPOINT 2 · SÍMBOLOS CENTRAIS (⭐ e 🔵)
                    </span>
                    {validatedStages.includes(2) && (
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 font-typewriter">
                        <CheckCircle className="w-3.5 h-3.5" /> CONFIRMADO
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mb-3">
                    Junte os números de ⭐ (3) e 🔵 (5). Qual número de 2 dígitos é formado?
                  </p>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      disabled={validatedStages.includes(2)}
                      value={checkpoint2}
                      onChange={(e) => setCheckpoint2(e.target.value)}
                      placeholder="Ex: 35"
                      className="px-4 py-2 bg-[#182335] border border-slate-700 rounded-lg text-sm text-white w-32 focus:border-amber-400 focus:outline-none"
                    />
                    {!validatedStages.includes(2) && (
                      <button
                        onClick={handleVerifyCheckpoint2}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg cursor-pointer"
                      >
                        Validar
                      </button>
                    )}
                  </div>
                </div>

                {/* Checkpoint 3 */}
                <div className={`p-4 rounded-xl border-2 transition-all ${
                  !validatedStages.includes(2)
                    ? 'opacity-50 pointer-events-none'
                    : validatedStages.includes(3) 
                    ? 'bg-emerald-950/30 border-emerald-500' 
                    : 'bg-[#101724] border-[#2b3c54]'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-typewriter text-amber-400 font-bold">
                      CHECKPOINT 3 · SENHA COMPLETA DO COMPUTADOR
                    </span>
                    {validatedStages.includes(3) && (
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 font-typewriter">
                        <CheckCircle className="w-3.5 h-3.5" /> LIBERAÇÃO CONCEDIDA!
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mb-3">
                    Digite a sequência numérica de 4 dígitos completa: 🟢(8) ⭐(3) 🔵(5) 🟡(1)
                  </p>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      disabled={validatedStages.includes(3)}
                      value={checkpoint3}
                      onChange={(e) => setCheckpoint3(e.target.value)}
                      placeholder="Ex: 8351"
                      className="px-4 py-2 bg-[#182335] border border-slate-700 rounded-lg text-sm text-white w-32 focus:border-amber-400 focus:outline-none font-serif font-black tracking-widest"
                      maxLength={4}
                    />
                    {!validatedStages.includes(3) && (
                      <button
                        onClick={handleVerifyCheckpoint3}
                        className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-lg cursor-pointer"
                      >
                        Gerar Chave Mestra!
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isCompleted && (
        <CaseCompletedModal
          caseNumber={8}
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
