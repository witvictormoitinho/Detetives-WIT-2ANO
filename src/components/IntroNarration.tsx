import React, { useState, useEffect } from 'react';
import { Volume2, Play, Users, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { ASSETS, OPENING_SCRIPT } from '../data/casesData';
import { sound } from '../utils/audio';
import { StudentPair } from '../types';

interface IntroNarrationProps {
  onStart: (pair: StudentPair) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const IntroNarration: React.FC<IntroNarrationProps> = ({
  onStart,
  isMuted,
  onToggleMute,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [detectiveName, setDetectiveName] = useState('Detetive 1');
  const [analystName, setAnalystName] = useState('Detetive 2');
  const [hasStartedAudioOnce, setHasStartedAudioOnce] = useState(false);

  // Play narration speech
  const playNarration = () => {
    sound.playClick();
    setIsPlayingAudio(true);
    setHasStartedAudioOnce(true);
    sound.speak(OPENING_SCRIPT, () => {
      setIsPlayingAudio(false);
    });
  };

  const stopNarration = () => {
    sound.stopSpeaking();
    setIsPlayingAudio(false);
  };

  // Play audio on first user click or offer clean playback
  useEffect(() => {
    return () => {
      sound.stopSpeaking();
    };
  }, []);

  const handleStartMission = () => {
    sound.playStamp();
    stopNarration();
    onStart({
      detectiveName: detectiveName.trim() || 'Detetive 1',
      analystName: analystName.trim() || 'Detetive 2',
      activeRole: 'detective',
    });
  };

  return (
    <div className="relative min-h-[calc(100vh-56px)] flex items-center justify-center p-4 md:p-8 bg-[#0d121c] overflow-hidden select-none">
      {/* Background with warm agency ambiance */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 filter blur-[1px]"
        style={{ backgroundImage: `url(${ASSETS.office})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d121c] via-[#0d121c]/80 to-transparent" />

      {/* Main Agency Dossier Box */}
      <div className="relative z-10 w-full max-w-4xl bg-[#17202e]/95 border-2 border-[#caa455]/40 rounded-2xl shadow-2xl p-6 md:p-10 backdrop-blur-md text-slate-100 flex flex-col items-center">
        
        {/* Top Confidential Agency Stamp */}
        <div className="flex items-center justify-between w-full border-b border-[#caa455]/30 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <img 
              src={ASSETS.badge} 
              alt="Distintivo WIT" 
              className="w-14 h-14 rounded-full border-2 border-amber-400/80 shadow-md object-cover bg-amber-950"
              onError={(e) => {
                // Fallback styled SVG if image fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-typewriter tracking-widest text-amber-400 font-bold">
                  Documento Confidencial
                </span>
                <span className="text-[11px] bg-red-950/80 text-red-300 border border-red-700/60 px-2 py-0.5 rounded font-typewriter">
                  NÍVEL SECRETO
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-serif font-black text-amber-100 tracking-tight">
                AGÊNCIA DETETIVE WIT
              </h1>
              <p className="text-xs text-slate-400">
                Departamento de Investigação Tecnológica · 2º Ano do Ensino Fundamental
              </p>
            </div>
          </div>

          <div className="hidden sm:block">
            <span className="stamp-confidential text-xs">
              CASO Nº 001
            </span>
          </div>
        </div>

        {/* Narrative Voice Card */}
        <div className="w-full bg-[#101724] border border-[#2d3b52] rounded-xl p-5 md:p-6 mb-6 relative">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-amber-300 text-sm font-semibold">
              <span className="animate-pulse">🎙️</span>
              <span>Mensagem do Chefe de Investigação:</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={isPlayingAudio ? stopNarration : playNarration}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold transition-all cursor-pointer"
                title="Ouvir a narração do mistério"
              >
                <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? 'animate-bounce text-amber-200' : ''}`} />
                <span>{isPlayingAudio ? 'Pausar Áudio' : hasStartedAudioOnce ? 'Ouvir novamente 🔊' : 'Ouvir Narração 🔊'}</span>
              </button>
            </div>
          </div>

          <div className="p-4 bg-amber-950/20 border-l-4 border-amber-500/80 rounded-r-lg font-serif italic text-amber-100/90 text-sm md:text-base leading-relaxed tracking-wide">
            “Atenção, novos detetives!
            <br className="my-1" />
            Vocês acabam de entrar para a <strong>Agência WIT</strong>, uma equipe especializada em resolver mistérios tecnológicos.
            <br className="my-1" />
            Hoje temos uma missão muito importante: <strong>o computador secreto da agência foi bloqueado e a senha desapareceu!</strong>
            <br className="my-1" />
            Para recuperá-la, vocês precisarão encontrar pistas, organizar informações, resolver sequências e descobrir códigos. Mas atenção: uma pista pode esconder outra pista!
            <br className="my-1" />
            Trabalhem juntos, observem com cuidado e, quando encontrarem um erro, tentem novamente. A missão começa agora. Boa sorte, Detetives WIT!”
          </div>
        </div>

        {/* Pair Registration Box */}
        <div className="w-full bg-[#1c2637] border border-[#2d3e58] rounded-xl p-5 mb-6">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-300 mb-3">
            <Users className="w-4 h-4 text-amber-400" />
            <span>Escalação da Dupla de Agentes:</span>
            <span className="text-xs font-normal text-slate-400 ml-auto">
              (Trabalho colaborativo em duplas)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#121926] p-3.5 rounded-lg border border-[#2a384e]">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-base">🔎</span>
                <span className="text-xs font-bold text-amber-300">Detetive (Observa as Pistas)</span>
              </div>
              <input
                type="text"
                value={detectiveName}
                onChange={(e) => setDetectiveName(e.target.value)}
                placeholder="Nome do(a) Detetive 1"
                className="w-full px-3 py-2 bg-[#0c121e] border border-slate-700 rounded text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                maxLength={24}
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Foco: Observar os mínimos detalhes nas pistas visuais.
              </p>
            </div>

            <div className="bg-[#121926] p-3.5 rounded-lg border border-[#2a384e]">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-base">🧩</span>
                <span className="text-xs font-bold text-sky-300">Analista (Organiza os Comandos)</span>
              </div>
              <input
                type="text"
                value={analystName}
                onChange={(e) => setAnalystName(e.target.value)}
                placeholder="Nome do(a) Analista 2"
                className="w-full px-3 py-2 bg-[#0c121e] border border-slate-700 rounded text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                maxLength={24}
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Foco: Montar sequências, testar hipóteses e registrar códigos.
              </p>
            </div>
          </div>
          <p className="text-xs text-amber-200/70 mt-3 text-center italic">
            💡 Lembrem-se: Vocês trocarão de função a cada caso resolvido!
          </p>
        </div>

        {/* Start Button Zone */}
        <div className="flex flex-col items-center gap-3 w-full">
          <div className="text-center">
            <h2 className="text-lg md:text-xl font-serif font-bold text-amber-200 tracking-wide flex items-center justify-center gap-2">
              <span>🔎</span>
              <span>SUA MISSÃO COMEÇA AGORA</span>
            </h2>
          </div>

          <button
            onClick={handleStartMission}
            className="w-full max-w-md py-4 px-6 rounded-xl font-serif font-black text-lg md:text-xl text-[#1a1205] bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 shadow-xl shadow-amber-950/60 border-2 border-amber-200 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 cursor-pointer"
          >
            <span>[ COMEÇAR INVESTIGAÇÃO ]</span>
            <ArrowRight className="w-5 h-5 text-amber-950" />
          </button>
        </div>
      </div>
    </div>
  );
};
