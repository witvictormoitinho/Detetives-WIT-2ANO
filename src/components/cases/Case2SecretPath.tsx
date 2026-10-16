import React, { useState } from 'react';
import { CaseHeader } from '../CaseHeader';
import { CaseCompletedModal } from '../CaseCompletedModal';
import { CASES_META, DETECTIVE_QUOTES } from '../../data/casesData';
import { StudentPair } from '../../types';
import { sound } from '../../utils/audio';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Play, RotateCcw, Trash2, CheckCircle2 } from 'lucide-react';

interface Case2Props {
  pair: StudentPair;
  onCompleteCase: (caseId: number) => void;
  onSwapRoles: () => void;
  onGoToHub: () => void;
  onNextCase: () => void;
  onOpenNotebook: () => void;
  onOpenInventory?: () => void;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

interface LevelConfig {
  name: string;
  subtitle: string;
  gridSize: number; // 4 or 5
  start: [number, number]; // [row, col]
  target: [number, number];
  obstacles: [number, number][];
  targetSymbol: string;
}

const LEVELS: LevelConfig[] = [
  {
    name: 'Desafio A: Caminho Simples',
    subtitle: 'Ande em linha reta e colete a pista no corredor da agência.',
    gridSize: 4,
    start: [1, 0],
    target: [1, 3],
    obstacles: [],
    targetSymbol: '🔎'
  },
  {
    name: 'Desafio B: Mudança de Direção',
    subtitle: 'Vire na esquina da sala de arquivos para alcançar a evidência.',
    gridSize: 4,
    start: [0, 0],
    target: [2, 2],
    obstacles: [[1, 0]],
    targetSymbol: '📂'
  },
  {
    name: 'Desafio C: Obstáculo no Caminho',
    subtitle: 'Um armário de aço bloqueia a passagem! Contorne o obstáculo.',
    gridSize: 4,
    start: [3, 0],
    target: [1, 3],
    obstacles: [[2, 1], [2, 2]],
    targetSymbol: '🟢'
  }
];

export const Case2SecretPath: React.FC<Case2Props> = ({
  pair,
  onCompleteCase,
  onSwapRoles,
  onGoToHub,
  onNextCase,
  onOpenNotebook,
  onOpenInventory,
}) => {
  const meta = CASES_META[1];
  const [levelIndex, setLevelIndex] = useState(0);
  const currentLevel = LEVELS[levelIndex];

  const [commands, setCommands] = useState<Direction[]>([]);
  const [characterPos, setCharacterPos] = useState<[number, number]>(currentLevel.start);
  const [isRunning, setIsRunning] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const hints = [
    "Dica 1: Conte quantas casas o detetive precisa andar para frente antes de virar.",
    "Dica 2: No desafio com obstáculos, lembre-se: você pode dar a volta por cima ou por baixo.",
    "Dica 3: Teste seus comandos! Se errar, ajuste apenas o comando que errou e tente de novo."
  ];

  const handleAddCommand = (dir: Direction) => {
    if (isRunning) return;
    if (commands.length >= 10) return;
    sound.playClick();
    setCommands([...commands, dir]);
    setFeedback(null);
  };

  const handleRemoveLast = () => {
    if (isRunning || commands.length === 0) return;
    sound.playClick();
    setCommands(commands.slice(0, -1));
  };

  const handleReset = () => {
    if (isRunning) return;
    sound.playClick();
    setCommands([]);
    setCharacterPos(currentLevel.start);
    setFeedback(null);
  };

  const handleExecuteCommands = async () => {
    if (commands.length === 0 || isRunning) return;
    setIsRunning(true);
    setFeedback(null);

    let [r, c] = currentLevel.start;
    setCharacterPos([r, c]);

    for (let i = 0; i < commands.length; i++) {
      setActiveStepIndex(i);
      const cmd = commands[i];

      if (cmd === 'UP') r -= 1;
      if (cmd === 'DOWN') r += 1;
      if (cmd === 'LEFT') c -= 1;
      if (cmd === 'RIGHT') c += 1;

      sound.playStep();
      setCharacterPos([r, c]);

      // Check bounds
      if (r < 0 || r >= currentLevel.gridSize || c < 0 || c >= currentLevel.gridSize) {
        await new Promise((res) => setTimeout(res, 400));
        sound.playTryAgain();
        setFeedback("Cuidado! O detetive saiu do mapa da agência. Ajuste os comandos.");
        setIsRunning(false);
        setActiveStepIndex(null);
        setCharacterPos(currentLevel.start);
        return;
      }

      // Check obstacles
      const hitObstacle = currentLevel.obstacles.some(([or, oc]) => or === r && oc === c);
      if (hitObstacle) {
        await new Promise((res) => setTimeout(res, 400));
        sound.playTryAgain();
        setFeedback("O detetive bateu no armário! É preciso contornar o obstáculo.");
        setIsRunning(false);
        setActiveStepIndex(null);
        setCharacterPos(currentLevel.start);
        return;
      }

      await new Promise((res) => setTimeout(res, 380));
    }

    setActiveStepIndex(null);
    setIsRunning(false);

    // Check if reached target
    if (r === currentLevel.target[0] && c === currentLevel.target[1]) {
      sound.playSuccess();
      if (levelIndex < LEVELS.length - 1) {
        setFeedback("Boa investigação! Você encontrou uma pista deste trecho. Avançando para o próximo!");
        setTimeout(() => {
          const nextIdx = levelIndex + 1;
          setLevelIndex(nextIdx);
          setCommands([]);
          setCharacterPos(LEVELS[nextIdx].start);
          setFeedback(null);
        }, 1200);
      } else {
        // Completed all 3 challenges in Case 2
        onCompleteCase(2);
        setIsCompleted(true);
      }
    } else {
      sound.playTryAgain();
      setFeedback("A pista não parece correta. O detetive não chegou exatamente no local da pista. Observe o caminho e tente novamente.");
    }
  };

  const getDirIcon = (dir: Direction) => {
    switch (dir) {
      case 'UP': return <ArrowUp className="w-5 h-5" />;
      case 'DOWN': return <ArrowDown className="w-5 h-5" />;
      case 'LEFT': return <ArrowLeft className="w-5 h-5" />;
      case 'RIGHT': return <ArrowRight className="w-5 h-5" />;
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
        detectiveTip="Lembre-se da aula de programação: divida o caminho passo a passo!"
      />

      <div className="max-w-4xl mx-auto px-4">
        {/* Progress among 3 challenges */}
        <div className="flex items-center justify-between mb-4 bg-[#162030] p-3 rounded-xl border border-[#2b3a50]">
          <div>
            <span className="text-xs uppercase font-typewriter font-bold text-amber-400">
              {currentLevel.name}
            </span>
            <p className="text-xs text-slate-300">{currentLevel.subtitle}</p>
          </div>
          <div className="flex items-center gap-1.5">
            {LEVELS.map((lvl, idx) => (
              <div
                key={idx}
                className={`w-8 h-2 rounded-full transition-all ${
                  levelIndex === idx 
                    ? 'bg-amber-400' 
                    : levelIndex > idx 
                    ? 'bg-emerald-500' 
                    : 'bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        {feedback && (
          <div className="mb-4 p-3.5 rounded-xl bg-amber-950/40 border border-amber-600/60 text-amber-200 text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">💡</span>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* MAP CANVAS */}
          <div className="bg-[#182335] rounded-2xl p-5 border-2 border-[#caa455]/40 shadow-xl flex flex-col items-center">
            <div className="flex items-center justify-between w-full mb-3 text-xs">
              <span className="font-typewriter text-amber-400 font-bold uppercase">
                MAPA DA AGÊNCIA (SALA {levelIndex + 1})
              </span>
              <span className="text-slate-400">
                Alvo: <span className="text-base">{currentLevel.targetSymbol}</span>
              </span>
            </div>

            {/* Grid */}
            <div 
              className="grid gap-2 bg-[#0c121e] p-3 rounded-xl border-2 border-[#2b3c54]"
              style={{
                gridTemplateColumns: `repeat(${currentLevel.gridSize}, minmax(0, 1fr))`
              }}
            >
              {Array.from({ length: currentLevel.gridSize * currentLevel.gridSize }).map((_, index) => {
                const r = Math.floor(index / currentLevel.gridSize);
                const c = index % currentLevel.gridSize;
                const isChar = characterPos[0] === r && characterPos[1] === c;
                const isTarget = currentLevel.target[0] === r && currentLevel.target[1] === c;
                const isObstacle = currentLevel.obstacles.some(([or, oc]) => or === r && oc === c);

                return (
                  <div
                    key={index}
                    className={`w-14 h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center text-2xl font-bold relative transition-all border ${
                      isObstacle
                        ? 'bg-slate-800/90 border-slate-600 shadow-inner'
                        : isTarget
                        ? 'bg-amber-950/40 border-amber-400/80 animate-pulse'
                        : 'bg-[#151e2d] border-[#253245]'
                    }`}
                  >
                    {/* Obstacle */}
                    {isObstacle && (
                      <span title="Armário Bloqueado" className="text-2xl">
                        🗄️
                      </span>
                    )}

                    {/* Target */}
                    {isTarget && !isChar && (
                      <span className="text-3xl animate-bounce">
                        {currentLevel.targetSymbol}
                      </span>
                    )}

                    {/* Character */}
                    {isChar && (
                      <div className="absolute inset-0 flex items-center justify-center text-3xl z-10 scale-110 transition-transform">
                        🕵️
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-400 mt-4">
              <span className="flex items-center gap-1">🕵️ Detetive</span>
              <span className="flex items-center gap-1">{currentLevel.targetSymbol} Pista</span>
              {currentLevel.obstacles.length > 0 && (
                <span className="flex items-center gap-1">🗄️ Obstáculo</span>
              )}
            </div>
          </div>

          {/* PROGRAMMING CONTROLS */}
          <div className="bg-[#182335] rounded-2xl p-5 border-2 border-[#caa455]/40 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-typewriter text-amber-400 font-bold uppercase">
                  PAINEL DE PROGRAMAÇÃO
                </span>
                <span className="text-xs text-slate-400">
                  {commands.length}/10 passos
                </span>
              </div>

              {/* Directional Pad */}
              <div className="grid grid-cols-3 gap-2 max-w-[220px] mx-auto my-3">
                <div />
                <button
                  onClick={() => handleAddCommand('UP')}
                  disabled={isRunning}
                  className="p-3.5 bg-[#253247] hover:bg-amber-500 hover:text-slate-950 text-amber-300 rounded-xl font-bold flex flex-col items-center justify-center border border-slate-600 transition-all cursor-pointer active:scale-95"
                >
                  <ArrowUp className="w-6 h-6" />
                  <span className="text-[10px] mt-0.5 font-bold">CIMA</span>
                </button>
                <div />

                <button
                  onClick={() => handleAddCommand('LEFT')}
                  disabled={isRunning}
                  className="p-3.5 bg-[#253247] hover:bg-amber-500 hover:text-slate-950 text-amber-300 rounded-xl font-bold flex flex-col items-center justify-center border border-slate-600 transition-all cursor-pointer active:scale-95"
                >
                  <ArrowLeft className="w-6 h-6" />
                  <span className="text-[10px] mt-0.5 font-bold">ESQ.</span>
                </button>

                <button
                  onClick={() => handleAddCommand('DOWN')}
                  disabled={isRunning}
                  className="p-3.5 bg-[#253247] hover:bg-amber-500 hover:text-slate-950 text-amber-300 rounded-xl font-bold flex flex-col items-center justify-center border border-slate-600 transition-all cursor-pointer active:scale-95"
                >
                  <ArrowDown className="w-6 h-6" />
                  <span className="text-[10px] mt-0.5 font-bold">BAIXO</span>
                </button>

                <button
                  onClick={() => handleAddCommand('RIGHT')}
                  disabled={isRunning}
                  className="p-3.5 bg-[#253247] hover:bg-amber-500 hover:text-slate-950 text-amber-300 rounded-xl font-bold flex flex-col items-center justify-center border border-slate-600 transition-all cursor-pointer active:scale-95"
                >
                  <ArrowRight className="w-6 h-6" />
                  <span className="text-[10px] mt-0.5 font-bold">DIR.</span>
                </button>
              </div>

              {/* Command Sequence Strip */}
              <div className="bg-[#0f1724] p-3 rounded-xl border border-[#2b3c54] my-3 min-h-[56px] flex items-center justify-start gap-1.5 overflow-x-auto">
                {commands.length === 0 ? (
                  <span className="text-xs text-slate-500 italic mx-auto">
                    Adicione setas para programar o caminho
                  </span>
                ) : (
                  commands.map((cmd, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1 shrink-0 transition-all border ${
                        activeStepIndex === i
                          ? 'bg-amber-400 text-slate-950 scale-110 border-white ring-2 ring-amber-300'
                          : 'bg-[#1e2a3c] text-amber-200 border-slate-700'
                      }`}
                    >
                      <span>{i + 1}.</span>
                      {getDirIcon(cmd)}
                    </div>
                  ))
                )}
              </div>

              {/* Edit Controls */}
              <div className="flex items-center justify-end gap-2 mb-4">
                <button
                  onClick={handleRemoveLast}
                  disabled={commands.length === 0 || isRunning}
                  className="px-2.5 py-1 text-xs text-slate-400 hover:text-white bg-slate-800 rounded border border-slate-700 disabled:opacity-40 cursor-pointer"
                >
                  Desfazer ↩️
                </button>
                <button
                  onClick={handleReset}
                  disabled={commands.length === 0 || isRunning}
                  className="px-2.5 py-1 text-xs text-rose-400 hover:text-rose-200 bg-rose-950/30 rounded border border-rose-800/40 disabled:opacity-40 cursor-pointer"
                >
                  Limpar 🗑️
                </button>
              </div>
            </div>

            {/* Run Button */}
            <button
              onClick={handleExecuteCommands}
              disabled={commands.length === 0 || isRunning}
              className={`w-full py-3.5 rounded-xl font-bold font-serif text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                commands.length > 0 && !isRunning
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isRunning ? 'Detetive Andando...' : '▶️ EXECUTAR COMANDOS!'}</span>
            </button>
          </div>
        </div>
      </div>

      {isCompleted && (
        <CaseCompletedModal
          caseNumber={2}
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
