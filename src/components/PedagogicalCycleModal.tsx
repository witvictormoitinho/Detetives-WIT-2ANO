import React from 'react';
import { X, CheckCircle, ArrowDown, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface PedagogicalCycleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PedagogicalCycleModal: React.FC<PedagogicalCycleModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const steps = [
    {
      icon: '🔎',
      title: 'OBSERVAR',
      desc: 'Olhe com calma cada detalhe, imagem, símbolo e texto. Detetives nunca têm pressa!',
      color: 'border-amber-500/80 bg-amber-950/20 text-amber-200'
    },
    {
      icon: '🧠',
      title: 'PENSAR',
      desc: 'Converse com sua dupla. O que este desafio está pedindo? Qual pista já temos no caderno?',
      color: 'border-sky-500/80 bg-sky-950/20 text-sky-200'
    },
    {
      icon: '🧩',
      title: 'ORGANIZAR',
      desc: 'Coloque as peças em ordem: primeiro, depois e por último. Estruture os passos da resposta.',
      color: 'border-purple-500/80 bg-purple-950/20 text-purple-200'
    },
    {
      icon: '▶️',
      title: 'TESTAR',
      desc: 'Execute seu comando ou confirme sua resposta. A hipótese foi boa? Vamos conferir!',
      color: 'border-emerald-500/80 bg-emerald-950/20 text-emerald-200'
    },
    {
      icon: '🔧',
      title: 'CORRIGIR',
      desc: 'Errou? Que maravilha! Na ciência e na programação, o erro nos mostra o caminho certo.',
      color: 'border-rose-500/80 bg-rose-950/20 text-rose-200'
    },
    {
      icon: '🏆',
      title: 'RESOLVER',
      desc: 'Pista desbloqueada! Comemore com sua dupla e troquem de papéis para o próximo caso.',
      color: 'border-amber-400 bg-amber-500/20 text-amber-100'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
      <div className="relative w-full max-w-2xl bg-[#141c2b] border-2 border-amber-500/40 rounded-2xl shadow-2xl p-6 text-slate-100 flex flex-col max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#2d3f58]">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🕵️</span>
            <div>
              <h3 className="font-serif font-bold text-lg md:text-xl text-amber-200">
                O Método de Investigação da Agência WIT
              </h3>
              <p className="text-xs text-slate-400">
                Princípio pedagógico para solucionar qualquer desafio tecnológico
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-2">
          {steps.map((st, i) => (
            <React.Fragment key={st.title}>
              <div className={`p-3 rounded-xl border-l-4 flex items-center gap-3.5 ${st.color}`}>
                <div className="text-2xl w-10 h-10 rounded-lg bg-black/30 flex items-center justify-center shrink-0">
                  {st.icon}
                </div>
                <div>
                  <h4 className="font-serif font-black text-sm tracking-wider uppercase">
                    {i + 1}. {st.title}
                  </h4>
                  <p className="text-xs opacity-90 leading-relaxed font-sans">
                    {st.desc}
                  </p>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="flex justify-center text-slate-500 my-0.5">
                  <ArrowDown className="w-3.5 h-3.5" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="bg-amber-950/40 border border-amber-500/30 rounded-xl p-3.5 flex items-center gap-3 text-xs text-amber-200">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
          <p>
            <strong>Lembrete de Ouro:</strong> Na Agência WIT não existe cronômetro punitivo nem limite de tentativas. O segredo é conversar, testar e aprender com cada pista!
          </p>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="mt-4 w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-lg transition-all text-sm cursor-pointer shadow-md"
        >
          Entendido, Detetive! Vamos Investigar!
        </button>
      </div>
    </div>
  );
};
