import React from 'react';
import { CASES_META, ASSETS } from '../data/casesData';
import { StudentPair, ScreenMode } from '../types';
import { sound } from '../utils/audio';
import { Lock, Unlock, CheckCircle2, Shield, Sparkles, Terminal, Award, BookOpen, RefreshCw, Briefcase } from 'lucide-react';

interface OfficeHubProps {
  pair: StudentPair;
  completedCases: number[];
  onSelectCase: (caseId: number) => void;
  onSelectFinal: () => void;
  onSelectBonus: () => void;
  onOpenNotebook: () => void;
  onOpenInventory: () => void;
  onOpenCycle: () => void;
  onSwapRoles: () => void;
}

export const OfficeHub: React.FC<OfficeHubProps> = ({
  pair,
  completedCases,
  onSelectCase,
  onSelectFinal,
  onSelectBonus,
  onOpenNotebook,
  onOpenInventory,
  onOpenCycle,
  onSwapRoles,
}) => {
  const isFinalUnlocked = completedCases.length >= 7; // Accessible after unlocking enough clues or when all 8 are done
  const allCasesDone = completedCases.length === 8;

  return (
    <div className="min-h-screen bg-[#0d121c] pb-20 select-none">
      {/* Hero Agency Wall Background */}
      <div className="relative border-b border-[#2d3a4e] bg-[#141b27] px-4 py-8 shadow-xl">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15 filter blur-[1px]"
          style={{ backgroundImage: `url(${ASSETS.office})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#141b27]" />

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <img 
              src={ASSETS.badge} 
              alt="Distintivo da Agência WIT" 
              className="w-16 h-16 rounded-full border-2 border-amber-400 shadow-xl bg-amber-950 shrink-0"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1">
                <span className="stamp-confidential text-[10px] py-0.5 px-2">
                  CASO Nº 001
                </span>
                <span className="text-xs uppercase font-typewriter tracking-widest text-amber-400 font-bold">
                  Quadro de Investigação da Agência WIT
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl font-serif font-black text-amber-100 tracking-tight">
                O COMPUTADOR BLOQUEADO
              </h1>
              <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-xl">
                O computador secreto da agência está travado! Investiguem os 8 casos para recuperar a senha mestre.
              </p>
            </div>
          </div>

          {/* Quick Status Dossier Box */}
          <div className="bg-[#1b2536] p-4 rounded-2xl border-2 border-[#caa455]/40 shadow-xl flex flex-col items-center md:items-end text-right">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-slate-400">Progresso do Caso:</span>
              <span className="px-2.5 py-0.5 rounded bg-amber-400 text-slate-950 font-bold font-typewriter text-xs">
                {completedCases.length} / 8 Resolvidos
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Dupla:</span>
              <span className="font-bold text-amber-300">🔎 {pair.detectiveName}</span>
              <span className="text-slate-500">&</span>
              <span className="font-bold text-sky-300">🧩 {pair.analystName}</span>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenInventory();
                }}
                className="px-2.5 py-1 text-[11px] font-bold bg-[#caa455] hover:bg-amber-300 text-slate-950 rounded flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
                title="Abrir Maleta de Inventário"
              >
                <Briefcase className="w-3 h-3 text-slate-950" />
                <span>Maleta de Inventário 💼</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onSwapRoles();
                }}
                className="text-[11px] text-amber-400/90 hover:text-amber-200 flex items-center gap-1 cursor-pointer transition-colors px-1"
                title="Trocar papéis"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Trocar papéis</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Corkboard / Dossier Grid */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        
        {/* Pedagogical Banner */}
        <div 
          onClick={onOpenCycle}
          className="mb-8 p-3.5 bg-gradient-to-r from-amber-950/40 via-[#182335] to-amber-950/40 border border-amber-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-amber-200 cursor-pointer hover:border-amber-400/60 transition-colors shadow-md"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-xl">💡</span>
            <div>
              <strong className="text-amber-100">Método de Investigação WIT:</strong>
              <span className="ml-1 text-slate-300">
                🔎 Observar ➔ 🧠 Pensar ➔ 🧩 Organizar ➔ ▶️ Testar ➔ 🔧 Corrigir ➔ 🏆 Resolver
              </span>
            </div>
          </div>
          <span className="text-amber-400 text-[11px] font-semibold underline shrink-0">
            Conhecer o método ➔
          </span>
        </div>

        {/* Section Title */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif font-bold text-xl text-amber-100 flex items-center gap-2">
            <span>📁</span>
            <span>ARQUIVOS DE INVESTIGAÇÃO</span>
          </h2>
          <span className="text-xs text-slate-400 font-typewriter">
            Clique em um arquivo para investigar
          </span>
        </div>

        {/* 8 Case Folders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {CASES_META.map((c, index) => {
            const isResolved = completedCases.includes(c.id);
            // Case is accessible if previous case is completed or if it is Case 1
            const isUnlocked = c.id === 1 || completedCases.includes(c.id - 1) || isResolved;

            return (
              <div
                key={c.id}
                onClick={() => {
                  if (isUnlocked) {
                    sound.playClick();
                    onSelectCase(c.id);
                  } else {
                    sound.playTryAgain();
                  }
                }}
                className={`relative rounded-2xl border-2 p-5 flex flex-col justify-between transition-all select-none ${
                  isResolved
                    ? 'bg-[#182232] border-emerald-500/70 hover:border-emerald-400 hover:shadow-xl cursor-pointer'
                    : isUnlocked
                    ? 'bg-[#17202f] border-amber-500/50 hover:border-amber-400 hover:shadow-xl cursor-pointer transform hover:-translate-y-1'
                    : 'bg-[#111722]/80 border-slate-800 opacity-60 cursor-not-allowed'
                }`}
              >
                <div>
                  {/* Top Bar inside card */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-typewriter text-xs font-bold text-amber-400">
                      {c.code}
                    </span>
                    <span className="text-xs">
                      {'⭐'.repeat(c.difficulty)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 my-2">
                    <div className="w-12 h-12 rounded-xl bg-black/40 border border-slate-700 flex items-center justify-center text-2xl shrink-0">
                      {c.icon}
                    </div>
                    <div>
                      <h3 className="font-serif font-black text-base text-slate-100 leading-snug">
                        {c.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {c.summary}
                  </p>
                </div>

                {/* Status Stamp or Lock */}
                <div className="mt-4 pt-3 border-t border-[#28374d] flex items-center justify-between">
                  {isResolved ? (
                    <div className="stamp-resolved text-[10px] py-0.5 px-2">
                      ✓ CASO RESOLVIDO
                    </div>
                  ) : isUnlocked ? (
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1 font-typewriter">
                      <span>▶️</span> ABRIR ARQUIVO
                    </span>
                  ) : (
                    <span className="text-xs text-slate-500 flex items-center gap-1 font-typewriter">
                      <Lock className="w-3.5 h-3.5" /> BLOQUEADO
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* FINAL MISSION & BONUS CALLOUT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          
          {/* Final Mission: Desbloqueie o Computador */}
          <div
            onClick={() => {
              if (isFinalUnlocked) {
                sound.playClick();
                onSelectFinal();
              } else {
                sound.playTryAgain();
              }
            }}
            className={`p-6 rounded-2xl border-4 transition-all relative overflow-hidden flex flex-col justify-between ${
              allCasesDone
                ? 'bg-gradient-to-br from-[#1a2d1f] via-[#122217] to-[#0a180f] border-emerald-400 shadow-2xl cursor-pointer hover:scale-[1.01]'
                : isFinalUnlocked
                ? 'bg-gradient-to-br from-[#2a1d12] via-[#1a141c] to-[#0d121c] border-amber-400 shadow-2xl cursor-pointer hover:scale-[1.01]'
                : 'bg-[#121824] border-slate-800 opacity-65 cursor-not-allowed'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-typewriter text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1">
                  <Terminal className="w-4 h-4 text-red-400" />
                  MISSÃO FINAL DECISIVA
                </span>
                {allCasesDone && (
                  <span className="bg-emerald-500 text-slate-950 text-[10px] font-bold font-typewriter px-2 py-0.5 rounded">
                    SISTEMA LIBERADO
                  </span>
                )}
              </div>

              <h3 className="font-serif font-black text-2xl text-amber-100 mt-1">
                🏆 O Computador da Agência WIT
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Digite a senha de 4 números combinando as pistas e sequências para desbloquear o computador central e salvar a agência!
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between pt-3 border-t border-slate-700">
              <span className="text-xs text-amber-300 font-semibold font-typewriter">
                {isFinalUnlocked ? '🔓 Chave Pronta: Digite 8351' : '🔒 Requer casos anteriores'}
              </span>

              <button
                disabled={!isFinalUnlocked}
                className={`px-4 py-2 rounded-xl font-serif font-black text-xs transition-all flex items-center gap-2 ${
                  isFinalUnlocked
                    ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                <span>Acessar Computador ➔</span>
              </button>
            </div>
          </div>

          {/* Bonus Challenge: Criar Enigma */}
          <div
            onClick={() => {
              sound.playClick();
              onSelectBonus();
            }}
            className="p-6 rounded-2xl border-4 border-sky-500/50 bg-gradient-to-br from-[#0c1e33] via-[#10243d] to-[#0c1827] shadow-2xl flex flex-col justify-between cursor-pointer hover:border-sky-400 hover:scale-[1.01] transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-typewriter text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-sky-400" />
                  DESAFIO BÔNUS DA DUPLA
                </span>
                <span className="bg-sky-500/20 text-sky-300 border border-sky-500/40 text-[10px] font-bold font-typewriter px-2 py-0.5 rounded">
                  LABORATÓRIO
                </span>
              </div>

              <h3 className="font-serif font-black text-2xl text-sky-100 mt-1">
                🧠 Crie um Enigma para Outra Dupla
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Agora vocês são os detetives criadores! Montem uma sequência de símbolos misteriosa e passem para a outra dupla da sala resolver.
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between pt-3 border-t border-slate-700">
              <span className="text-xs text-sky-300 font-semibold font-typewriter">
                Atividade Interativa em Duplas
              </span>

              <button className="px-4 py-2 rounded-xl font-serif font-bold text-xs bg-sky-500 hover:bg-sky-400 text-slate-950 shadow flex items-center gap-2">
                <span>Criar Novo Caso ➔</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
