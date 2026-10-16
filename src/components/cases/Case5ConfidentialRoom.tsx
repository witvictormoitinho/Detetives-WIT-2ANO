import React, { useState, useEffect } from 'react';
import { CaseHeader } from '../CaseHeader';
import { CaseCompletedModal } from '../CaseCompletedModal';
import { CASES_META, ASSETS, DETECTIVE_QUOTES } from '../../data/casesData';
import { StudentPair } from '../../types';
import { sound } from '../../utils/audio';
import { Eye, EyeOff, Clock, Sparkles, CheckCircle2 } from 'lucide-react';

interface Case5Props {
  pair: StudentPair;
  onCompleteCase: (caseId: number) => void;
  onSwapRoles: () => void;
  onGoToHub: () => void;
  onNextCase: () => void;
  onOpenNotebook: () => void;
  onOpenInventory?: () => void;
}

export const Case5ConfidentialRoom: React.FC<Case5Props> = ({
  pair,
  onCompleteCase,
  onSwapRoles,
  onGoToHub,
  onNextCase,
  onOpenNotebook,
  onOpenInventory,
}) => {
  const meta = CASES_META[4];
  const [isObserving, setIsObserving] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(12);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const hints = [
    "Dica 1: Observe a parede à esquerda para ver a chave dourada pendurada.",
    "Dica 2: Olhe os livros na prateleira de madeira acima da mesa.",
    "Dica 3: Conte as pastas marrons na mesa e veja o amigo tecnológico ao lado da tela."
  ];

  const questions = [
    {
      id: 1,
      title: 'Onde estava pendurada a chave dourada?',
      options: [
        { id: 'correto', label: 'No painel de madeira à esquerda', icon: '🔑🧱' },
        { id: 'errado1', label: 'Embaixo da cadeira', icon: '🪑' },
        { id: 'errado2', label: 'Na maçaneta da porta', icon: '🚪' },
      ]
    },
    {
      id: 2,
      title: 'Qual era a cor do livro secreto na estante?',
      options: [
        { id: 'correto', label: 'Verde brilhante', icon: '📗' },
        { id: 'errado1', label: 'Vermelho fogo', icon: '📕' },
        { id: 'errado2', label: 'Roxo escuro', icon: '📘' },
      ]
    },
    {
      id: 3,
      title: 'Quantas pastas de arquivo estavam empilhadas sobre a mesa?',
      options: [
        { id: 'correto', label: '3 pastas empilhadas', icon: '📁📁📁' },
        { id: 'errado1', label: '1 pasta sozinha', icon: '📁' },
        { id: 'errado2', label: '6 pastas espalhadas', icon: '📁📁📁📁📁📁' },
      ]
    },
    {
      id: 4,
      title: 'Qual objeto estava exatamente ao lado do computador?',
      options: [
        { id: 'correto', label: 'Um robô tecnológico', icon: '🤖' },
        { id: 'errado1', label: 'Um vaso com flores', icon: '💐' },
        { id: 'errado2', label: 'Uma bola de futebol', icon: '⚽' },
      ]
    }
  ];

  // Timer countdown during observation mode
  useEffect(() => {
    if (!isObserving) return;
    if (secondsLeft <= 0) {
      setIsObserving(false);
      sound.playStamp();
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isObserving, secondsLeft]);

  const handleFinishObservationEarly = () => {
    sound.playClick();
    setIsObserving(false);
    sound.playStamp();
  };

  const handlePeekAgain = () => {
    sound.playClick();
    setSecondsLeft(6);
    setIsObserving(true);
  };

  const handleSelectOption = (optionId: string) => {
    sound.playClick();
    if (optionId === 'correto') {
      sound.playSuccess();
      setFeedback(null);
      if (currentQuestionIdx < questions.length - 1) {
        setCurrentQuestionIdx(prev => prev + 1);
      } else {
        onCompleteCase(5);
        setIsCompleted(true);
      }
    } else {
      sound.playTryAgain();
      setFeedback("A pista não parece correta. Lembre-se do que viu na sala confidencial ou clique em 'Espiar Novamente'!");
    }
  };

  const q = questions[currentQuestionIdx];

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
        detectiveTip="Olhos de lince! Cada detalhe no cenário pode ser uma resposta valiosa."
      />

      <div className="max-w-4xl mx-auto px-4">
        {/* Step indicator */}
        <div className="flex items-center justify-between mb-6 bg-[#162030] p-3 rounded-xl border border-[#2b3a50]">
          <span className="text-xs uppercase font-typewriter font-bold text-amber-400">
            {isObserving ? 'FASE 1: OBSERVAÇÃO ATENTA' : `FASE 2: PERGUNTA ${currentQuestionIdx + 1} DE 4`}
          </span>
          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className={`w-7 h-2 rounded-full transition-all ${
                  isObserving 
                    ? 'bg-amber-400/40' 
                    : currentQuestionIdx === idx 
                    ? 'bg-amber-400' 
                    : currentQuestionIdx > idx 
                    ? 'bg-emerald-500' 
                    : 'bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* OBSERVATION VIEW */}
        {isObserving ? (
          <div className="bg-[#182335] rounded-2xl p-6 border-2 border-[#caa455]/40 shadow-xl flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                <Eye className="w-5 h-5 text-amber-400 animate-pulse" />
                <span>MEMORIZE OS DETALHES DESTA SALA!</span>
              </div>
              
              <div className="flex items-center gap-2 bg-[#0c121e] px-3 py-1 rounded-full border border-amber-500/50 text-amber-300 text-xs font-typewriter font-bold">
                <Clock className="w-3.5 h-3.5" />
                <span>{secondsLeft}s restantes</span>
              </div>
            </div>

            {/* Room Image */}
            <div className="relative w-full rounded-xl overflow-hidden border-2 border-[#caa455] shadow-2xl bg-black">
              <img 
                src={ASSETS.secretRoom} 
                alt="Sala Confidencial da Agência WIT"
                className="w-full h-auto max-h-[460px] object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
              <p className="text-xs text-slate-300 italic">
                Observe: Onde está a chave? Qual a cor do livro? Quantas pastas há? O que está ao lado do PC?
              </p>

              <button
                onClick={handleFinishObservationEarly}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-md transition-all shrink-0"
              >
                <span>Já Memorizei Tudo! Esconder Sala</span>
                <EyeOff className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* QUESTIONS VIEW */
          <div className="bg-[#182335] rounded-2xl p-6 border-2 border-[#caa455]/40 shadow-xl">
            <div className="flex items-center justify-between mb-4 border-b border-[#2a384e] pb-3">
              <div>
                <span className="text-xs font-typewriter text-amber-400 font-bold">
                  SALA CONFIDENCIAL TRANCADA 🔒
                </span>
                <h3 className="font-serif font-black text-xl text-amber-100 mt-1">
                  {q.title}
                </h3>
              </div>

              <button
                onClick={handlePeekAgain}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                title="Olhar a imagem novamente por alguns segundos"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Espiar Sala (6s)</span>
              </button>
            </div>

            {feedback && (
              <div className="mb-4 p-3.5 rounded-xl bg-amber-950/40 border border-amber-600/60 text-amber-200 text-sm flex items-center justify-between">
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
              {q.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className="p-6 rounded-2xl bg-[#101724] border-2 border-[#2b3c54] hover:border-amber-400 hover:bg-amber-950/20 transition-all flex flex-col items-center text-center gap-3 cursor-pointer group"
                >
                  <span className="text-4xl group-hover:scale-110 transition-transform">
                    {opt.icon}
                  </span>
                  <span className="text-sm font-semibold text-slate-100">
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {isCompleted && (
        <CaseCompletedModal
          caseNumber={5}
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
