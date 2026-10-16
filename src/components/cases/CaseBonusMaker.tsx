import React, { useState } from 'react';
import { Sparkles, Users, ArrowRight, CheckCircle2, RotateCcw, Play, Award } from 'lucide-react';
import { StudentPair } from '../../types';
import { sound } from '../../utils/audio';

interface CaseBonusMakerProps {
  pair: StudentPair;
  onGoToHub: () => void;
  onOpenCertificate: () => void;
}

export const CaseBonusMaker: React.FC<CaseBonusMakerProps> = ({
  pair,
  onGoToHub,
  onOpenCertificate,
}) => {
  const [step, setStep] = useState<'build' | 'play_challenge' | 'solved'>('build');
  
  // Custom puzzle state
  const [sequence, setSequence] = useState<string[]>(['⭐', '🔵', '🟢']);
  const [correctAnswer, setCorrectAnswer] = useState<string>('⭐');
  const [distractor1, setDistractor1] = useState<string>('🐾');
  const [distractor2, setDistractor2] = useState<string>('📁');
  const [creatorHint, setCreatorHint] = useState<string>('Observe as cores e veja qual símbolo repete!');

  // Challenge player state
  const [challengeGuess, setChallengeGuess] = useState<string | null>(null);
  const [challengeFeedback, setChallengeFeedback] = useState<string | null>(null);

  const availableSymbols = ['⭐', '🔵', '🟢', '🟡', '🐾', '📁', '🔎', '🔑', '🤖'];

  const handleUpdateSequenceItem = (index: number, sym: string) => {
    sound.playClick();
    const newSeq = [...sequence];
    newSeq[index] = sym;
    setSequence(newSeq);
  };

  const handleStartChallengeMode = () => {
    sound.playStamp();
    setStep('play_challenge');
    setChallengeGuess(null);
    setChallengeFeedback(null);
  };

  const handlePlayerGuess = (sym: string) => {
    sound.playClick();
    setChallengeGuess(sym);
    if (sym === correctAnswer) {
      sound.playSuccess();
      setChallengeFeedback("🎉 PARABÉNS! Você resolveu o enigma criado pelos detetives!");
      setStep('solved');
    } else {
      sound.playTryAgain();
      setChallengeFeedback("Não foi dessa vez! Tente observar a regra que os colegas criaram.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d131f] py-8 px-4 text-slate-100 select-none">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6 bg-[#162030] p-4 rounded-2xl border border-[#2b3a50]">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🧠</span>
            <div>
              <span className="text-xs font-typewriter text-amber-400 font-bold uppercase">
                CASO BÔNUS · LABORATÓRIO DO CRIADOR
              </span>
              <h2 className="font-serif font-black text-xl text-amber-100">
                Agora Vocês São os Criadores de Mistérios!
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onGoToHub();
            }}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold cursor-pointer border border-slate-700"
          >
            Quadro de Casos
          </button>
        </div>

        {/* STEP: BUILD PUZZLE */}
        {step === 'build' && (
          <div className="bg-[#182335] rounded-2xl p-6 border-2 border-[#caa455]/40 shadow-xl space-y-6">
            <div>
              <span className="text-xs font-typewriter text-amber-400 font-bold">
                PASSO 1: MONTEM A SEQUÊNCIA DO ENIGMA
              </span>
              <h3 className="font-serif font-black text-lg text-slate-100 mt-1">
                Escolha os símbolos para a outra dupla decifrar:
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Clique nos cartões para alterar os símbolos da sequência:
              </p>
            </div>

            {/* Sequence preview strip */}
            <div className="bg-[#0f1724] p-5 rounded-xl border border-[#2b3c54] flex flex-wrap items-center justify-center gap-3">
              {sequence.map((sym, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-slate-400 font-typewriter mb-1">{idx + 1}º</span>
                    <select
                      value={sym}
                      onChange={(e) => handleUpdateSequenceItem(idx, e.target.value)}
                      className="w-16 h-16 rounded-xl bg-[#1b273b] border-2 border-amber-400/80 text-3xl text-center focus:outline-none focus:border-amber-300 cursor-pointer"
                    >
                      {availableSymbols.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <span className="text-xl text-slate-500 font-bold">➔</span>
                </div>
              ))}

              <div className="flex flex-col items-center">
                <span className="text-xs text-amber-300 font-typewriter mb-1 font-bold">Próximo?</span>
                <div className="w-16 h-16 rounded-xl bg-amber-500/20 border-2 border-dashed border-amber-400 flex items-center justify-center text-3xl font-black text-amber-300 animate-pulse">
                  ❓
                </div>
              </div>
            </div>

            {/* Step 2: Set the correct answer and distractor options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#2b3c54]">
              <div className="bg-[#101724] p-4 rounded-xl border border-emerald-500/50">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5" /> RESPOSTA CORRETA:
                </span>
                <select
                  value={correctAnswer}
                  onChange={(e) => {
                    sound.playClick();
                    setCorrectAnswer(e.target.value);
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-[#182335] border border-slate-700 text-2xl text-center cursor-pointer"
                >
                  {availableSymbols.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="bg-[#101724] p-4 rounded-xl border border-slate-700">
                <span className="text-xs font-bold text-slate-400 mb-2 block">
                  OPÇÃO FALSA 1 (Pegadinha):
                </span>
                <select
                  value={distractor1}
                  onChange={(e) => {
                    sound.playClick();
                    setDistractor1(e.target.value);
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-[#182335] border border-slate-700 text-2xl text-center cursor-pointer"
                >
                  {availableSymbols.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="bg-[#101724] p-4 rounded-xl border border-slate-700">
                <span className="text-xs font-bold text-slate-400 mb-2 block">
                  OPÇÃO FALSA 2 (Pegadinha):
                </span>
                <select
                  value={distractor2}
                  onChange={(e) => {
                    sound.playClick();
                    setDistractor2(e.target.value);
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-[#182335] border border-slate-700 text-2xl text-center cursor-pointer"
                >
                  {availableSymbols.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 3: Creator hint */}
            <div className="bg-[#101724] p-4 rounded-xl border border-[#2b3c54]">
              <span className="text-xs font-bold text-amber-300 mb-1 block">
                Dica Secreta para os Colegas:
              </span>
              <input
                type="text"
                value={creatorHint}
                onChange={(e) => setCreatorHint(e.target.value)}
                placeholder="Escreva uma dica amigável..."
                className="w-full px-3 py-2 bg-[#182335] border border-slate-700 rounded text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Launch Challenge Mode Button */}
            <button
              onClick={handleStartChallengeMode}
              className="w-full py-4 bg-gradient-to-r from-sky-500 via-sky-400 to-sky-500 hover:from-sky-400 hover:to-sky-300 text-slate-950 font-serif font-black text-base rounded-xl shadow-xl transition-all cursor-pointer flex items-center justify-center gap-3"
            >
              <Users className="w-5 h-5" />
              <span>CHAMAR OUTRA DUPLA PARA JOGAR NOSSO CASO! ➔</span>
            </button>
          </div>
        )}

        {/* STEP: PLAY CHALLENGE (FOR THE OTHER PAIR) */}
        {(step === 'play_challenge' || step === 'solved') && (
          <div className="bg-[#182335] rounded-2xl p-6 md:p-8 border-2 border-sky-400/60 shadow-2xl space-y-6">
            <div className="text-center pb-4 border-b border-[#2b3c54]">
              <span className="text-xs font-typewriter text-sky-400 font-bold uppercase tracking-wider">
                DESAFIO ESPECIAL DA AGÊNCIA WIT
              </span>
              <h3 className="font-serif font-black text-2xl text-amber-100 mt-1">
                Enigma Criado por {pair.detectiveName} & {pair.analystName}!
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Descubra qual é o próximo símbolo desta sequência secreta:
              </p>
            </div>

            {/* Sequence display */}
            <div className="bg-[#0c121e] p-6 rounded-2xl border-2 border-sky-500/40 flex items-center justify-center gap-3 md:gap-5 overflow-x-auto">
              {sequence.map((sym, i) => (
                <React.Fragment key={i}>
                  <div className="w-16 h-16 rounded-xl bg-[#172233] border border-slate-700 flex items-center justify-center text-3xl shadow">
                    {sym}
                  </div>
                  <span className="text-xl text-slate-500 font-bold">➔</span>
                </React.Fragment>
              ))}

              <div className="w-16 h-16 rounded-xl bg-sky-500/20 border-2 border-dashed border-sky-400 flex items-center justify-center text-3xl font-black text-sky-300 animate-pulse">
                {step === 'solved' ? correctAnswer : '❓'}
              </div>
            </div>

            {/* Creator Hint Callout */}
            <div className="bg-amber-950/30 border border-amber-600/40 rounded-xl p-3.5 text-xs text-amber-200 flex items-center gap-2">
              <span className="text-lg">💡</span>
              <p>
                <strong>Dica dos Criadores:</strong> &ldquo;{creatorHint}&rdquo;
              </p>
            </div>

            {challengeFeedback && (
              <div className={`p-4 rounded-xl text-center text-sm font-bold border ${
                step === 'solved'
                  ? 'bg-emerald-950/60 border-emerald-400 text-emerald-200'
                  : 'bg-amber-950/60 border-amber-500 text-amber-200'
              }`}>
                {challengeFeedback}
              </div>
            )}

            {/* Choices */}
            {step !== 'solved' ? (
              <div>
                <p className="text-center text-xs text-slate-400 mb-3 font-semibold">
                  Clique na resposta que completa o enigma:
                </p>
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                  {/* Shuffled list of options */}
                  {[correctAnswer, distractor1, distractor2]
                    .sort(() => 0.5 - Math.random())
                    .map((sym, i) => (
                      <button
                        key={i}
                        onClick={() => handlePlayerGuess(sym)}
                        className="h-20 rounded-2xl bg-[#141e2d] border-2 border-slate-600 hover:border-sky-400 hover:bg-sky-950/30 text-4xl flex items-center justify-center transition-all cursor-pointer shadow-md hover:scale-105"
                      >
                        {sym}
                      </button>
                    ))}
                </div>
              </div>
            ) : (
              /* Success Actions */
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => setStep('build')}
                  className="w-full sm:w-auto px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Criar Outro Enigma</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    onOpenCertificate();
                  }}
                  className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-serif font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all"
                >
                  <Award className="w-4 h-4" />
                  <span>Ver Certificado de Mestre Detetive 📜</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
