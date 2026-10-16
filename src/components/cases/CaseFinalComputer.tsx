import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Lock, Unlock, ShieldAlert, Award, ArrowRight, Sparkles, RefreshCw, Printer } from 'lucide-react';
import { sound } from '../../utils/audio';
import { StudentPair } from '../../types';
import { VICTORY_SCRIPT } from '../../data/casesData';

interface CaseFinalComputerProps {
  pair: StudentPair;
  onGoToHub: () => void;
  onGoToBonus: () => void;
  onOpenCertificate: () => void;
}

export const CaseFinalComputer: React.FC<CaseFinalComputerProps> = ({
  pair,
  onGoToHub,
  onGoToBonus,
  onOpenCertificate,
}) => {
  const [digits, setDigits] = useState<string[]>(['', '', '', '']);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isError, setIsError] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleKeypadPress = (num: string) => {
    if (isUnlocked) return;
    sound.playKeypad(parseInt(num, 10));
    setIsError(false);
    setFeedback(null);

    const firstEmpty = digits.findIndex(d => d === '');
    if (firstEmpty !== -1) {
      const newDigits = [...digits];
      newDigits[firstEmpty] = num;
      setDigits(newDigits);
    }
  };

  const handleBackspace = () => {
    if (isUnlocked) return;
    sound.playClick();
    setIsError(false);
    const lastFilled = [...digits].reverse().findIndex(d => d !== '');
    if (lastFilled !== -1) {
      const actualIndex = digits.length - 1 - lastFilled;
      const newDigits = [...digits];
      newDigits[actualIndex] = '';
      setDigits(newDigits);
    }
  };

  const handleClear = () => {
    if (isUnlocked) return;
    sound.playClick();
    setIsError(false);
    setDigits(['', '', '', '']);
    setFeedback(null);
  };

  const handleUnlockAttempt = () => {
    sound.playClick();
    const entered = digits.join('');

    if (entered === '8351') {
      setIsUnlocked(true);
      setIsError(false);
      setFeedback(null);
      sound.playGrandUnlock();

      // Launch victory confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
        setTimeout(() => {
          confetti({
            particleCount: 80,
            angle: 60,
            spread: 60,
            origin: { x: 0.1, y: 0.7 }
          });
          confetti({
            particleCount: 80,
            angle: 120,
            spread: 60,
            origin: { x: 0.9, y: 0.7 }
          });
        }, 350);
      } catch {
        // Fallback gracefully
      }

      // Play victory speech
      setTimeout(() => {
        sound.speak(VICTORY_SCRIPT);
      }, 600);
    } else {
      sound.playTryAgain();
      setIsError(true);
      setFeedback("A pista não parece correta. Volte ao arquivo e investigue novamente a sequência de números: 🟢(8) ⭐(3) 🔵(5) 🟡(1).");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f18] py-8 px-4 text-slate-100 flex flex-col items-center justify-center select-none">
      
      {/* Retro Computer Terminal Frame */}
      <div className="relative w-full max-w-2xl bg-[#162233] border-4 border-[#caa455] rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-md">
        
        {/* Computer Screen Bezel Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#2d405b]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
            <span className="font-typewriter text-xs font-bold text-amber-300 uppercase tracking-widest">
              TERMINAL CENTRAL · AGÊNCIA WIT
            </span>
          </div>

          <span className="text-[11px] font-typewriter text-slate-400">
            SISTEMA OPERACIONAL SEGURO v2.0
          </span>
        </div>

        {/* CRT Monitor Screen */}
        <div className={`p-6 rounded-2xl border-2 transition-all relative overflow-hidden ${
          isUnlocked 
            ? 'bg-[#062414] border-emerald-400 text-emerald-200' 
            : isError 
            ? 'bg-[#290d10] border-red-500 text-red-200' 
            : 'bg-[#0d1624] border-amber-500/50 text-amber-200'
        }`}>
          {/* Subtle phosphor scanlines effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-transparent pointer-events-none opacity-40" />

          <div className="relative z-10 flex flex-col items-center text-center">
            {isUnlocked ? (
              <div className="space-y-3 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-300">
                  <Unlock className="w-8 h-8" />
                </div>
                
                <div className="stamp-resolved text-lg py-1 px-4 border-emerald-400 text-emerald-300 bg-emerald-950/40">
                  🔓 ACESSO CONCEDIDO
                </div>

                <h2 className="font-serif font-black text-2xl md:text-3xl text-emerald-100 tracking-tight">
                  🏆 CASO ENCERRADO!
                </h2>
                <h3 className="font-typewriter text-sm font-bold text-emerald-300">
                  DETETIVES WIT — MISSÃO CUMPRIDA
                </h3>

                <p className="text-xs md:text-sm text-emerald-200/90 max-w-md mx-auto leading-relaxed font-sans mt-2">
                  “Excelente trabalho, Detetives WIT! Vocês observaram as pistas, organizaram as informações e resolveram o mistério. A Agência WIT está salva graças a vocês!”
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="w-14 h-14 rounded-full bg-red-950/40 border-2 border-red-400 flex items-center justify-center mx-auto text-red-400">
                  <Lock className="w-7 h-7" />
                </div>

                <h2 className="font-serif font-black text-xl md:text-2xl text-amber-100">
                  🔒 COMPUTADOR DA AGÊNCIA WIT
                </h2>
                <div className="text-xs uppercase tracking-widest text-red-400 font-bold font-typewriter">
                  SISTEMA BLOQUEADO
                </div>
                <p className="text-xs text-slate-300 max-w-sm mx-auto font-sans">
                  “Somente os melhores detetives conseguem desbloquear este sistema.”
                </p>

                {/* 4 Digit Boxes */}
                <div className="flex items-center justify-center gap-3 pt-4">
                  {digits.map((digit, i) => (
                    <div
                      key={i}
                      className={`w-14 h-16 rounded-xl border-2 flex items-center justify-center text-3xl font-serif font-black shadow-inner transition-all ${
                        isError 
                          ? 'border-red-400 bg-red-950/50 text-red-300' 
                          : 'border-amber-400/80 bg-[#141e2e] text-amber-200'
                      }`}
                    >
                      {digit || <span className="text-slate-600 text-lg font-sans">•</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Feedback alert */}
        {feedback && (
          <div className="mt-4 p-3.5 rounded-xl bg-amber-950/50 border border-amber-600 text-amber-200 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">💡</span>
              <p>{feedback}</p>
            </div>
            <button
              onClick={() => setFeedback(null)}
              className="px-2 py-0.5 bg-amber-800 rounded text-white text-[11px]"
            >
              OK
            </button>
          </div>
        )}

        {/* Keypad or Victory Actions */}
        {!isUnlocked ? (
          <div className="mt-6 flex flex-col items-center">
            <div className="grid grid-cols-3 gap-2.5 w-full max-w-[280px] mb-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => handleKeypadPress(num.toString())}
                  className="h-13 rounded-xl bg-[#23334a] hover:bg-amber-500 hover:text-slate-950 text-slate-100 font-serif font-bold text-xl transition-all border border-slate-600 flex items-center justify-center cursor-pointer active:scale-95 shadow"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={handleBackspace}
                className="h-13 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 font-semibold text-xs transition-all border border-slate-700 flex items-center justify-center cursor-pointer"
              >
                Apagar ⌫
              </button>
              <button
                onClick={() => handleKeypadPress('0')}
                className="h-13 rounded-xl bg-[#23334a] hover:bg-amber-500 hover:text-slate-950 text-slate-100 font-serif font-bold text-xl transition-all border border-slate-600 flex items-center justify-center cursor-pointer active:scale-95 shadow"
              >
                0
              </button>
              <button
                onClick={handleClear}
                className="h-13 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-all border border-slate-700 flex items-center justify-center cursor-pointer"
              >
                Limpar C
              </button>
            </div>

            <button
              onClick={handleUnlockAttempt}
              disabled={digits.some(d => d === '')}
              className={`w-full max-w-[320px] py-3.5 rounded-xl font-serif font-black text-sm tracking-wide transition-all cursor-pointer shadow-xl ${
                digits.every(d => d !== '')
                  ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-slate-950 border border-amber-200 scale-102'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              🔓 DESBLOQUEAR SISTEMA
            </button>
          </div>
        ) : (
          /* Victory Actions */
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
            <button
              onClick={() => {
                sound.playClick();
                onOpenCertificate();
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-serif font-black text-xs md:text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Emitir Certificado Oficial 📜</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onGoToBonus();
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white font-serif font-bold text-xs md:text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all"
            >
              <Sparkles className="w-4 h-4 text-sky-200" />
              <span>📁 Criar Enigma Bônus!</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onGoToHub();
              }}
              className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <span>Voltar ao Quadro</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
