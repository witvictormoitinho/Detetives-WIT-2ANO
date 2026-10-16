import React, { useState } from 'react';
import { CaseHeader } from '../CaseHeader';
import { CaseCompletedModal } from '../CaseCompletedModal';
import { CASES_META, ASSETS, DETECTIVE_QUOTES } from '../../data/casesData';
import { StudentPair } from '../../types';
import { sound } from '../../utils/audio';
import { Users, FileQuestion, CheckCircle2 } from 'lucide-react';

interface Case6Props {
  pair: StudentPair;
  onCompleteCase: (caseId: number) => void;
  onSwapRoles: () => void;
  onGoToHub: () => void;
  onNextCase: () => void;
  onOpenNotebook: () => void;
  onOpenInventory?: () => void;
}

interface DetectiveAgent {
  id: string;
  name: string;
  colorName: string;
  colorHex: string;
  badge: string;
  tool: string;
  avatarIcon: string;
}

const AGENTS: DetectiveAgent[] = [
  {
    id: 'leo',
    name: 'Agente Leo',
    colorName: 'Azul Marinho',
    colorHex: 'border-blue-500 bg-blue-950/40 text-blue-300',
    badge: 'Casaco Azul',
    tool: 'Chave Dourada 🔑',
    avatarIcon: '🧥🔵',
  },
  {
    id: 'sofia',
    name: 'Agente Sofia',
    colorName: 'Vermelho Rubi',
    colorHex: 'border-red-500 bg-red-950/40 text-red-300',
    badge: 'Casaco Vermelho',
    tool: 'Lupa Óptica 🔎',
    avatarIcon: '🧥🔴',
  },
  {
    id: 'maya',
    name: 'Agente Maya',
    colorName: 'Amarelo Ouro',
    colorHex: 'border-amber-500 bg-amber-950/40 text-amber-300',
    badge: 'Moletom Amarelo',
    tool: 'Crachá Mestre 🪪',
    avatarIcon: '🧥🟡',
  },
  {
    id: 'tom',
    name: 'Agente Tom',
    colorName: 'Verde Floresta',
    colorHex: 'border-emerald-500 bg-emerald-950/40 text-emerald-300',
    badge: 'Colete Verde',
    tool: 'Lanterna Tática 🔦',
    avatarIcon: '🦺🟢',
  },
];

interface MysteryQuestion {
  id: number;
  title: string;
  clues: string[];
  correctAgentId: string;
  explanation: string;
}

const MYSTERIES: MysteryQuestion[] = [
  {
    id: 1,
    title: 'Mistério 1: Quem encontrou a chave do arquivo?',
    clues: [
      '“Quem encontrou a chave estava usando casaco azul.”',
      '“A Agente Sofia estava usando casaco vermelho.”',
      '“O Agente Tom estava usando colete verde.”'
    ],
    correctAgentId: 'leo',
    explanation: 'Excelente! Sofia usava vermelho e Tom usava verde. O único que usava azul é o Agente Leo!'
  },
  {
    id: 2,
    title: 'Mistério 2: Quem guardou a folha amarela com o código?',
    clues: [
      '“O agente com o código NÃO está usando vermelho nem azul.”',
      '“O agente está usando uma roupa amarela brilhante.”',
      '“O Agente Tom estava de colete verde anotando pegadas.”'
    ],
    correctAgentId: 'maya',
    explanation: 'Correto! Eliminando vermelho, azul e verde, a Agente Maya estava de moletom amarelo!'
  },
  {
    id: 3,
    title: 'Mistério 3: Quem encontrou a lanterna e o quarto símbolo?',
    clues: [
      '“O detetive que descobriu o quarto símbolo estava segurando uma lanterna.”',
      '“Leo estava com a chave dourada e Sofia estava com a lupa de aumento.”',
      '“Maya estava com o crachá mestre e não usava lanterna.”'
    ],
    correctAgentId: 'tom',
    explanation: 'Genial! Tom é o detetive equipado com a lanterna tática!'
  }
];

export const Case6WhoTookClue: React.FC<Case6Props> = ({
  pair,
  onCompleteCase,
  onSwapRoles,
  onGoToHub,
  onNextCase,
  onOpenNotebook,
  onOpenInventory,
}) => {
  const meta = CASES_META[5];
  const [mysteryIdx, setMysteryIdx] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const hints = [
    "Dica 1: Leia a primeira pista e veja qual cor foi mencionada.",
    "Dica 2: Elimine os agentes que NÃO usam aquela cor ou acessório.",
    "Dica 3: Se Sofia está de vermelho e Tom de verde, quem sobrou usando azul?"
  ];

  const currentMystery = MYSTERIES[mysteryIdx];

  const handleChooseAgent = (agentId: string) => {
    sound.playClick();
    if (agentId === currentMystery.correctAgentId) {
      sound.playSuccess();
      setFeedback(currentMystery.explanation);
      setTimeout(() => {
        if (mysteryIdx < MYSTERIES.length - 1) {
          setMysteryIdx(prev => prev + 1);
          setFeedback(null);
        } else {
          onCompleteCase(6);
          setIsCompleted(true);
        }
      }, 1400);
    } else {
      sound.playTryAgain();
      setFeedback("A pista não parece correta. Releia as pistas e elimine quem tem roupas ou ferramentas diferentes.");
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
        detectiveTip="Dedução lógica é como um quebra-cabeça: vá eliminando quem não pode ser!"
      />

      <div className="max-w-4xl mx-auto px-4">
        {/* Step indicator */}
        <div className="flex items-center justify-between mb-6 bg-[#162030] p-3 rounded-xl border border-[#2b3a50]">
          <span className="text-xs uppercase font-typewriter font-bold text-amber-400">
            {currentMystery.title}
          </span>
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((idx) => (
              <div
                key={idx}
                className={`w-8 h-2 rounded-full transition-all ${
                  mysteryIdx === idx 
                    ? 'bg-amber-400' 
                    : mysteryIdx > idx 
                    ? 'bg-emerald-500' 
                    : 'bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Suspects Lineup Banner */}
        <div className="mb-6 rounded-2xl overflow-hidden border-2 border-[#caa455] bg-black shadow-xl">
          <div className="relative">
            <img 
              src={ASSETS.suspects} 
              alt="Equipe de Detetives da Agência WIT"
              className="w-full h-auto max-h-[260px] object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 flex items-center justify-between">
              <span className="text-xs font-typewriter text-amber-300 font-bold uppercase">
                EQUIPE DE DETETIVES MIRINS DA AGÊNCIA WIT
              </span>
              <span className="text-[11px] text-slate-300">
                4 Agentes em Campo
              </span>
            </div>
          </div>
        </div>

        {/* Clue Parchment Board */}
        <div className="bg-parchment text-slate-900 rounded-2xl p-6 border-4 border-[#8c6747] shadow-xl mb-6">
          <div className="flex items-center gap-2 mb-3 border-b-2 border-[#caa455] pb-2">
            <FileQuestion className="w-5 h-5 text-amber-900" />
            <h3 className="font-serif font-black text-lg text-amber-950">
              Pistas Registradas no Dossiê
            </h3>
          </div>

          <div className="space-y-2 mb-2 font-serif italic text-sm md:text-base text-amber-950">
            {currentMystery.clues.map((clue, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-[#fffdf5] border border-[#d8c8a8] flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-800 text-white font-sans text-xs flex items-center justify-center not-italic font-bold shrink-0">
                  {idx + 1}
                </span>
                <p className="leading-snug">{clue}</p>
              </div>
            ))}
          </div>
        </div>

        {feedback && (
          <div className="mb-6 p-4 rounded-xl bg-amber-950/40 border border-amber-600/60 text-amber-200 text-sm flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💡</span>
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

        {/* Suspect Detective Cards to Choose */}
        <h4 className="text-xs font-typewriter text-amber-400 font-bold uppercase tracking-wider mb-3">
          SELECIONE O AGENTE IDENTIFICADO:
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {AGENTS.map((agent) => (
            <button
              key={agent.id}
              onClick={() => handleChooseAgent(agent.id)}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center text-center cursor-pointer group hover:scale-102 hover:shadow-xl ${agent.colorHex}`}
            >
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                {agent.avatarIcon}
              </div>
              <h5 className="font-serif font-black text-base text-slate-100 mb-1">
                {agent.name}
              </h5>
              <div className="text-xs font-semibold text-slate-300">
                {agent.badge}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {agent.tool}
              </div>
            </button>
          ))}
        </div>
      </div>

      {isCompleted && (
        <CaseCompletedModal
          caseNumber={6}
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
