import React, { useState } from 'react';
import { CaseHeader } from '../CaseHeader';
import { CaseCompletedModal } from '../CaseCompletedModal';
import { CASES_META, DETECTIVE_QUOTES } from '../../data/casesData';
import { StudentPair } from '../../types';
import { sound } from '../../utils/audio';
import { MapPin, Key, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

interface Case7Props {
  pair: StudentPair;
  onCompleteCase: (caseId: number) => void;
  onSwapRoles: () => void;
  onGoToHub: () => void;
  onNextCase: () => void;
  onOpenNotebook: () => void;
  onOpenInventory?: () => void;
}

export const Case7LostPassword: React.FC<Case7Props> = ({
  pair,
  onCompleteCase,
  onSwapRoles,
  onGoToHub,
  onNextCase,
  onOpenNotebook,
  onOpenInventory,
}) => {
  const meta = CASES_META[6];
  const [stage, setStage] = useState<1 | 2 | 3>(1);
  const [visitedStations, setVisitedStations] = useState<string[]>([]);
  const [digits, setDigits] = useState<string[]>(['', '', '', '']);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const hints = [
    "Dica 1: No mapa, visite os postos na ordem indicada: primeiro 🟢, depois ⭐, depois 🔵, por último 🟡.",
    "Dica 2: Consulte o Caderno de Pistas para ver o valor de cada símbolo: 🟢=8, ⭐=3, 🔵=5, 🟡=1.",
    "Dica 3: Junte os 4 números na ordem exata dos símbolos encontrados para formar a senha."
  ];

  const stations = [
    { id: 'verde', name: 'Posto 1: Laboratório de Hardware', symbol: '🟢', value: '8', icon: '🔬' },
    { id: 'estrela', name: 'Posto 2: Sala de Arquivos Antigos', symbol: '⭐', value: '3', icon: '🗄️' },
    { id: 'azul', name: 'Posto 3: Central de Servidores', symbol: '🔵', value: '5', icon: '🖥️' },
    { id: 'amarelo', name: 'Posto 4: Gabinete da Chefia', symbol: '🟡', value: '1', icon: '🚪' },
  ];

  // Stage 1: Map route collection
  const handleVisitStation = (stationId: string) => {
    sound.playClick();
    if (visitedStations.includes(stationId)) return;

    // Check if visiting in sequence
    const expectedOrder = ['verde', 'estrela', 'azul', 'amarelo'];
    const nextExpected = expectedOrder[visitedStations.length];

    if (stationId === nextExpected) {
      sound.playStep();
      const updated = [...visitedStations, stationId];
      setVisitedStations(updated);
      setFeedback(null);

      if (updated.length === 4) {
        sound.playSuccess();
        setTimeout(() => setStage(2), 700);
      }
    } else {
      sound.playTryAgain();
      setFeedback("Atenção à rota: siga a trilha das pegadas na ordem correta!");
    }
  };

  // Stage 3: Digit keypad
  const handleKeypadPress = (val: string) => {
    sound.playKeypad(parseInt(val, 10));
    const firstEmpty = digits.findIndex(d => d === '');
    if (firstEmpty !== -1) {
      const newDigits = [...digits];
      newDigits[firstEmpty] = val;
      setDigits(newDigits);
    }
  };

  const handleBackspace = () => {
    sound.playClick();
    const lastFilled = [...digits].reverse().findIndex(d => d !== '');
    if (lastFilled !== -1) {
      const actualIndex = digits.length - 1 - lastFilled;
      const newDigits = [...digits];
      newDigits[actualIndex] = '';
      setDigits(newDigits);
    }
  };

  const handleVerifyPassword = () => {
    sound.playClick();
    const entered = digits.join('');
    if (entered === '8351') {
      sound.playSuccess();
      setFeedback(null);
      onCompleteCase(7);
      setIsCompleted(true);
    } else {
      sound.playTryAgain();
      setFeedback("A senha não parece correta. Veja a tabela: 🟢=8, ⭐=3, 🔵=5, 🟡=1. A ordem correta forma 8351!");
      setDigits(['', '', '', '']);
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
        detectiveTip="Chegou o grande momento de unir o mapa, os símbolos e os números!"
      />

      <div className="max-w-4xl mx-auto px-4">
        {/* Step indicator */}
        <div className="flex items-center justify-between mb-6 bg-[#162030] p-3 rounded-xl border border-[#2b3a50]">
          <span className="text-xs uppercase font-typewriter font-bold text-amber-400">
            {stage === 1 ? 'ETAPA 1: ROTA NO MAPA' : stage === 2 ? 'ETAPA 2: TABELA DE CÓDIGOS' : 'ETAPA 3: SENHA DE 4 NÚMEROS'}
          </span>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((st) => (
              <div
                key={st}
                className={`w-8 h-2 rounded-full transition-all ${
                  stage === st 
                    ? 'bg-amber-400' 
                    : stage > st 
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

        {/* STAGE 1: MAP COLLECTION */}
        {stage === 1 && (
          <div className="bg-[#182335] rounded-2xl p-6 border-2 border-[#caa455]/40 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-xs font-typewriter text-amber-400 font-bold uppercase">
                  ETAPA 1 · SIGA O CAMINHO DOS 4 POSTOS
                </span>
                <h3 className="font-serif font-black text-xl text-amber-100 mt-1">
                  Colete os 4 símbolos na ordem da missão
                </h3>
              </div>
              <span className="text-xs bg-[#0c121e] px-3 py-1 rounded border border-amber-500/40 text-amber-300 font-bold">
                {visitedStations.length}/4 Coletados
              </span>
            </div>
            <p className="text-sm text-slate-300 mb-6">
              Ordem exigida pela Agência WIT: <strong>1º Verde (🟢) ➔ 2º Estrela (⭐) ➔ 3º Azul (🔵) ➔ 4º Amarelo (🟡)</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stations.map((st) => {
                const isVisited = visitedStations.includes(st.id);
                return (
                  <button
                    key={st.id}
                    onClick={() => handleVisitStation(st.id)}
                    className={`p-5 rounded-2xl border-2 transition-all flex items-center justify-between text-left cursor-pointer ${
                      isVisited
                        ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-200 shadow-md'
                        : 'bg-[#101724] border-[#2c3c52] hover:border-amber-400 hover:bg-amber-950/20'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-black/40 flex items-center justify-center text-3xl">
                        {st.symbol}
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-sm text-slate-100">
                          {st.name}
                        </h4>
                        <span className="text-xs text-slate-400 mt-0.5 block">
                          {st.icon} Local verificado
                        </span>
                      </div>
                    </div>

                    <div>
                      {isVisited ? (
                        <span className="px-2.5 py-1 rounded bg-emerald-500 text-slate-950 font-bold text-xs font-typewriter">
                          ✓ COLETADO
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded bg-slate-800 text-amber-300 text-xs font-semibold border border-slate-700">
                          Acessar Posto
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STAGE 2: CONVERSION TABLE REVIEW */}
        {stage === 2 && (
          <div className="bg-[#182335] rounded-2xl p-6 border-2 border-[#caa455]/40 shadow-xl">
            <span className="text-xs font-typewriter text-amber-400 font-bold uppercase">
              ETAPA 2 · CONVERSÃO DOS SÍMBOLOS EM NÚMEROS
            </span>
            <h3 className="font-serif font-black text-xl text-amber-100 mt-1">
              Veja a Tabela Criptográfica Oficial
            </h3>
            <p className="text-sm text-slate-300 mt-1 mb-6">
              Os 4 símbolos encontrados correspondem a números secretos guardados nos arquivos anteriores:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {stations.map((st, i) => (
                <div key={st.id} className="bg-[#101724] border-2 border-[#caa455] rounded-xl p-4 text-center">
                  <div className="text-3xl mb-1">{st.symbol}</div>
                  <div className="text-xs text-slate-400 font-bold">Posição {i + 1}º</div>
                  <div className="text-2xl font-serif font-black text-amber-300 mt-2">
                    = {st.value}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setStage(3);
              }}
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-serif text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Ir para o Teclado de Segurança e Digitar a Senha</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STAGE 3: 4-DIGIT PASSWORD KEYPAD */}
        {stage === 3 && (
          <div className="bg-[#182335] rounded-2xl p-6 border-2 border-[#caa455]/40 shadow-xl max-w-lg mx-auto">
            <span className="text-xs font-typewriter text-amber-400 font-bold uppercase">
              ETAPA 3 · TECLADO NUMÉRICO DA PORTA
            </span>
            <h3 className="font-serif font-black text-xl text-amber-100 mt-1 text-center">
              Digite a Senha de 4 Números
            </h3>
            <p className="text-xs text-slate-300 text-center mt-1 mb-5">
              Ordem: 🟢(8) ➔ ⭐(3) ➔ 🔵(5) ➔ 🟡(1)
            </p>

            {/* Display screen */}
            <div className="bg-[#0b1019] p-4 rounded-xl border-2 border-[#2c3d56] mb-5 flex items-center justify-center gap-3">
              {digits.map((digit, i) => (
                <div
                  key={i}
                  className="w-14 h-16 rounded-lg bg-[#141c2c] border-2 border-amber-400/80 flex items-center justify-center text-3xl font-serif font-black text-amber-300 shadow-inner"
                >
                  {digit || <span className="text-slate-600 text-xl font-sans">•</span>}
                </div>
              ))}
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-3 gap-2.5 max-w-[280px] mx-auto mb-5">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => handleKeypadPress(num.toString())}
                  className="h-14 rounded-xl bg-[#253247] hover:bg-amber-500 hover:text-slate-950 text-slate-100 font-serif font-bold text-xl transition-all border border-slate-600 flex items-center justify-center cursor-pointer active:scale-95"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={handleBackspace}
                className="h-14 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 font-semibold text-xs transition-all border border-slate-700 flex items-center justify-center cursor-pointer"
              >
                Apagar ⌫
              </button>
              <button
                onClick={() => handleKeypadPress('0')}
                className="h-14 rounded-xl bg-[#253247] hover:bg-amber-500 hover:text-slate-950 text-slate-100 font-serif font-bold text-xl transition-all border border-slate-600 flex items-center justify-center cursor-pointer active:scale-95"
              >
                0
              </button>
              <button
                onClick={() => setDigits(['', '', '', ''])}
                className="h-14 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-all border border-slate-700 flex items-center justify-center cursor-pointer"
              >
                Limpar C
              </button>
            </div>

            <button
              onClick={handleVerifyPassword}
              disabled={digits.some(d => d === '')}
              className={`w-full py-3.5 rounded-xl font-serif font-black text-sm transition-all cursor-pointer shadow-lg ${
                digits.every(d => d !== '')
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              🔓 Desbloquear Arquivo 07
            </button>
          </div>
        )}
      </div>

      {isCompleted && (
        <CaseCompletedModal
          caseNumber={7}
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
