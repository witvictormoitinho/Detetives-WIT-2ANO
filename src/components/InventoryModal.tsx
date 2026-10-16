import React, { useState } from 'react';
import { X, Briefcase, Lock, Sparkles, Volume2, Search, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { INVENTORY_ITEMS, ASSETS } from '../data/casesData';
import { InventoryItem } from '../types';
import { sound } from '../utils/audio';

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedCases: number[];
}

export const InventoryModal: React.FC<InventoryModalProps> = ({
  isOpen,
  onClose,
  completedCases,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'tool' | 'clue' | 'code'>('all');
  const [inspectedItem, setInspectedItem] = useState<InventoryItem | null>(null);

  if (!isOpen) return null;

  const isItemUnlocked = (item: InventoryItem): boolean => {
    if (!item.requiredCaseId || item.requiredCaseId === 0) return true;
    return completedCases.includes(item.requiredCaseId);
  };

  const filteredItems = INVENTORY_ITEMS.filter((item) => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  const unlockedCount = INVENTORY_ITEMS.filter(isItemUnlocked).length;

  const handleInspect = (item: InventoryItem) => {
    sound.playClick();
    setInspectedItem(item);
  };

  const handleSpeakItem = (item: InventoryItem) => {
    sound.playClick();
    sound.speak(`${item.title}. ${item.shortDesc} ${item.fullDesc}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-sm select-none animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-parchment rounded-2xl shadow-2xl border-4 border-[#5c3e21] flex flex-col overflow-hidden text-slate-800">
        
        {/* Leather Briefcase Top Bar */}
        <div className="bg-[#462d16] text-amber-100 px-5 py-3.5 flex items-center justify-between border-b-4 border-[#2d1b0c]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-2xl shadow-inner">
              💼
            </div>
            <div>
              <h2 className="font-serif font-black text-xl text-amber-100 tracking-wide flex items-center gap-2">
                MALETA DE INVENTÁRIO DO DETETIVE
              </h2>
              <span className="text-[11px] text-amber-200/80 font-typewriter uppercase tracking-wider">
                EQUIPAMENTOS, PISTAS E CÓDIGOS COLETADOS · AGÊNCIA WIT
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-black/20 hover:bg-black/40 text-amber-200 transition-colors cursor-pointer"
            title="Fechar Maleta de Inventário"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Briefcase Banner & Quick Stats */}
        <div className="bg-[#ebdcc0] px-5 py-2.5 border-b border-[#cca97f] flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-[#4a2e12]">
          <div className="flex items-center gap-2">
            <span>🎒 Inventário Ativo:</span>
            <span className="px-2 py-0.5 rounded bg-[#5c3e21] text-amber-100 font-typewriter font-bold text-xs">
              {unlockedCount} de {INVENTORY_ITEMS.length} Itens em Posse
            </span>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 bg-[#dbc6a4] p-1 rounded-lg border border-[#baa17f]">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('all');
              }}
              className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#5c3e21] text-white shadow-sm'
                  : 'text-[#4a2e12] hover:bg-[#caa97f]/50'
              }`}
            >
              Todos ({INVENTORY_ITEMS.length})
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('tool');
              }}
              className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'tool'
                  ? 'bg-[#5c3e21] text-white shadow-sm'
                  : 'text-[#4a2e12] hover:bg-[#caa97f]/50'
              }`}
            >
              🧰 Equipamentos (4)
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('clue');
              }}
              className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'clue'
                  ? 'bg-[#5c3e21] text-white shadow-sm'
                  : 'text-[#4a2e12] hover:bg-[#caa97f]/50'
              }`}
            >
              🔍 Pistas (4)
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('code');
              }}
              className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'code'
                  ? 'bg-[#5c3e21] text-white shadow-sm'
                  : 'text-[#4a2e12] hover:bg-[#caa97f]/50'
              }`}
            >
              🔐 Códigos (4)
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-5 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredItems.map((item) => {
              const unlocked = isItemUnlocked(item);

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (unlocked) handleInspect(item);
                    else sound.playTryAgain();
                  }}
                  className={`p-3.5 rounded-xl border-2 transition-all relative flex flex-col justify-between ${
                    unlocked
                      ? 'bg-[#fffef7] border-[#8c6747] hover:border-amber-600 hover:shadow-md cursor-pointer hover:-translate-y-0.5'
                      : 'bg-[#e2d5bd]/60 border-[#c2b294] opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div>
                    {/* Item Card Header */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold font-typewriter text-[#8c6747] uppercase truncate max-w-[170px]">
                        {item.source}
                      </span>
                      {unlocked ? (
                        item.symbolBadge ? (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-serif">
                            {item.symbolBadge}
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-emerald-700 font-typewriter flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" /> PRONTO
                          </span>
                        )
                      ) : (
                        <span className="text-[10px] font-bold text-slate-500 font-typewriter flex items-center gap-1">
                          <Lock className="w-3 h-3" /> BLOQUEADO
                        </span>
                      )}
                    </div>

                    {/* Icon & Title */}
                    <div className="flex items-start gap-3 my-1">
                      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center text-2xl shrink-0 shadow-sm ${
                        unlocked
                          ? 'bg-amber-100/70 border-amber-300'
                          : 'bg-slate-300/50 border-slate-400'
                      }`}>
                        {unlocked ? item.icon : '🔒'}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-bold text-sm text-[#4a2e12] leading-snug">
                          {unlocked ? item.title : `Pista do Caso 0${item.requiredCaseId}`}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                          {unlocked ? item.shortDesc : 'Resolva a investigação deste caso para recolher esta evidência na maleta.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  {unlocked && (
                    <div className="mt-2.5 pt-2 border-t border-[#ede2cd] flex items-center justify-between text-[11px] text-[#754a20] font-semibold">
                      <span className="flex items-center gap-1 hover:text-amber-800">
                        <Search className="w-3 h-3" /> Examinar com a lupa
                      </span>
                      <ArrowRight className="w-3 h-3 text-[#caa455]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Inspection Modal Overlay */}
        {inspectedItem && (
          <div className="absolute inset-0 z-20 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
            <div className="bg-[#fffef7] rounded-2xl p-6 max-w-lg w-full border-4 border-[#8c6747] shadow-2xl relative text-slate-800">
              
              <button
                onClick={() => {
                  sound.playClick();
                  setInspectedItem(null);
                }}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-black/10 hover:bg-black/20 text-[#5c3e21] cursor-pointer"
                title="Fechar Exame"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 border-b-2 border-[#caa455] pb-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-100 border-2 border-amber-400 flex items-center justify-center text-4xl shadow-md shrink-0">
                  {inspectedItem.icon}
                </div>
                <div>
                  <span className="text-[11px] font-typewriter font-bold text-[#8c6747] uppercase block">
                    {inspectedItem.source}
                  </span>
                  <h3 className="font-serif font-black text-xl text-[#4a2e12] leading-tight">
                    {inspectedItem.title}
                  </h3>
                  {inspectedItem.symbolBadge && (
                    <span className="inline-block mt-1 px-2 py-0.5 rounded bg-amber-500/20 text-amber-900 border border-amber-500/40 text-xs font-serif font-bold">
                      {inspectedItem.symbolBadge}
                    </span>
                  )}
                </div>
              </div>

              {/* Short & Full Description */}
              <div className="space-y-3 font-sans my-4">
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs font-medium text-amber-950">
                  <strong>Resumo da Evidência:</strong> {inspectedItem.shortDesc}
                </div>

                <div className="p-4 bg-[#f8f3e6] rounded-xl border border-[#d8c7a6] text-xs text-slate-700 leading-relaxed">
                  <p>{inspectedItem.fullDesc}</p>
                </div>

                {inspectedItem.revealedValue && (
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-300 flex items-center justify-between text-xs text-emerald-900 font-bold">
                    <span>Dado Criptográfico Decodificado:</span>
                    <span className="text-base font-serif bg-emerald-200/70 px-2.5 py-0.5 rounded border border-emerald-400">
                      {inspectedItem.revealedValue}
                    </span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-[#caa455] flex items-center justify-between">
                <button
                  onClick={() => handleSpeakItem(inspectedItem)}
                  className="px-3.5 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-[#5c3e21] border border-amber-500/40 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                  title="Ouvir a narração deste item"
                >
                  <Volume2 className="w-4 h-4 text-amber-800" />
                  <span>Ouvir Detetive WIT 🔊</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setInspectedItem(null);
                  }}
                  className="px-5 py-2 bg-[#5c3e21] hover:bg-[#432b14] text-amber-100 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Guardar na Maleta
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-[#ebdcc0] px-5 py-3 border-t border-[#cca97f] flex items-center justify-between text-xs text-[#5c3e21]">
          <span className="italic">
            💡 Dica: Clique em qualquer item coletado para examiná-lo com a lupa!
          </span>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-1.5 bg-[#5c3e21] text-amber-100 font-semibold rounded-lg hover:bg-[#432b14] transition-colors cursor-pointer"
          >
            Fechar Maleta
          </button>
        </div>
      </div>
    </div>
  );
};
