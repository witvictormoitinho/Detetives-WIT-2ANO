/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { IntroNarration } from './components/IntroNarration';
import { OfficeHub } from './components/OfficeHub';
import { ClueNotebookModal } from './components/ClueNotebookModal';
import { InventoryModal } from './components/InventoryModal';
import { PedagogicalCycleModal } from './components/PedagogicalCycleModal';
import { CertificateModal } from './components/CertificateModal';

// Cases
import { Case1FirstCase } from './components/cases/Case1FirstCase';
import { Case2SecretPath } from './components/cases/Case2SecretPath';
import { Case3MessyDesk } from './components/cases/Case3MessyDesk';
import { Case4SecretCode } from './components/cases/Case4SecretCode';
import { Case5ConfidentialRoom } from './components/cases/Case5ConfidentialRoom';
import { Case6WhoTookClue } from './components/cases/Case6WhoTookClue';
import { Case7LostPassword } from './components/cases/Case7LostPassword';
import { Case8LastArchive } from './components/cases/Case8LastArchive';
import { CaseFinalComputer } from './components/cases/CaseFinalComputer';
import { CaseBonusMaker } from './components/cases/CaseBonusMaker';

import { ScreenMode, StudentPair } from './types';
import { sound } from './utils/audio';

const STORAGE_KEY_PROGRESS = 'wit_detective_completed_cases_v1';
const STORAGE_KEY_PAIR = 'wit_detective_pair_v1';

export default function App() {
  const [screen, setScreen] = useState<ScreenMode>('intro');
  const [pair, setPair] = useState<StudentPair>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PAIR);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      detectiveName: 'Detetive 1',
      analystName: 'Detetive 2',
      activeRole: 'detective',
    };
  });

  const [completedCases, setCompletedCases] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROGRESS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isCycleOpen, setIsCycleOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Keyboard shortcut: Press 'I' to toggle inventory
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'i' || e.key === 'I') {
        const target = e.target as HTMLElement | null;
        if (target && ['INPUT', 'TEXTAREA'].includes(target.tagName)) return;
        setIsInventoryOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Save pair to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PAIR, JSON.stringify(pair));
    } catch {}
  }, [pair]);

  // Save completed cases
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(completedCases));
    } catch {}
  }, [completedCases]);

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.setMuted(nextMuted);
  };

  const handleSwapRoles = () => {
    setPair((prev) => ({
      ...prev,
      activeRole: prev.activeRole === 'detective' ? 'analista' : 'detective',
    }));
  };

  const handleStartMission = (newPair: StudentPair) => {
    setPair(newPair);
    setScreen('hub');
  };

  const handleCompleteCase = (caseId: number) => {
    if (!completedCases.includes(caseId)) {
      setCompletedCases((prev) => [...prev, caseId]);
    }
    // Automatically alternate active role for the next case
    handleSwapRoles();
  };

  const handleNavigateCase = (caseNum: number) => {
    switch (caseNum) {
      case 1: setScreen('case1'); break;
      case 2: setScreen('case2'); break;
      case 3: setScreen('case3'); break;
      case 4: setScreen('case4'); break;
      case 5: setScreen('case5'); break;
      case 6: setScreen('case6'); break;
      case 7: setScreen('case7'); break;
      case 8: setScreen('case8'); break;
      default: setScreen('final_computer'); break;
    }
  };

  return (
    <div className="min-h-screen bg-[#0d121c] text-slate-100 flex flex-col font-sans">
      <Header
        pair={pair}
        onSwapRoles={handleSwapRoles}
        onOpenNotebook={() => setIsNotebookOpen(true)}
        onOpenInventory={() => setIsInventoryOpen(true)}
        onOpenCycle={() => setIsCycleOpen(true)}
        onGoToHub={() => setScreen('hub')}
        currentScreen={screen}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      <main className="flex-1">
        {screen === 'intro' && (
          <IntroNarration
            onStart={handleStartMission}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
          />
        )}

        {screen === 'hub' && (
          <OfficeHub
            pair={pair}
            completedCases={completedCases}
            onSelectCase={(id) => handleNavigateCase(id)}
            onSelectFinal={() => setScreen('final_computer')}
            onSelectBonus={() => setScreen('bonus_challenge')}
            onOpenNotebook={() => setIsNotebookOpen(true)}
            onOpenInventory={() => setIsInventoryOpen(true)}
            onOpenCycle={() => setIsCycleOpen(true)}
            onSwapRoles={handleSwapRoles}
          />
        )}

        {screen === 'case1' && (
          <Case1FirstCase
            pair={pair}
            onCompleteCase={handleCompleteCase}
            onSwapRoles={handleSwapRoles}
            onGoToHub={() => setScreen('hub')}
            onNextCase={() => handleNavigateCase(2)}
            onOpenNotebook={() => setIsNotebookOpen(true)}
            onOpenInventory={() => setIsInventoryOpen(true)}
          />
        )}

        {screen === 'case2' && (
          <Case2SecretPath
            pair={pair}
            onCompleteCase={handleCompleteCase}
            onSwapRoles={handleSwapRoles}
            onGoToHub={() => setScreen('hub')}
            onNextCase={() => handleNavigateCase(3)}
            onOpenNotebook={() => setIsNotebookOpen(true)}
            onOpenInventory={() => setIsInventoryOpen(true)}
          />
        )}

        {screen === 'case3' && (
          <Case3MessyDesk
            pair={pair}
            onCompleteCase={handleCompleteCase}
            onSwapRoles={handleSwapRoles}
            onGoToHub={() => setScreen('hub')}
            onNextCase={() => handleNavigateCase(4)}
            onOpenNotebook={() => setIsNotebookOpen(true)}
            onOpenInventory={() => setIsInventoryOpen(true)}
          />
        )}

        {screen === 'case4' && (
          <Case4SecretCode
            pair={pair}
            onCompleteCase={handleCompleteCase}
            onSwapRoles={handleSwapRoles}
            onGoToHub={() => setScreen('hub')}
            onNextCase={() => handleNavigateCase(5)}
            onOpenNotebook={() => setIsNotebookOpen(true)}
            onOpenInventory={() => setIsInventoryOpen(true)}
          />
        )}

        {screen === 'case5' && (
          <Case5ConfidentialRoom
            pair={pair}
            onCompleteCase={handleCompleteCase}
            onSwapRoles={handleSwapRoles}
            onGoToHub={() => setScreen('hub')}
            onNextCase={() => handleNavigateCase(6)}
            onOpenNotebook={() => setIsNotebookOpen(true)}
            onOpenInventory={() => setIsInventoryOpen(true)}
          />
        )}

        {screen === 'case6' && (
          <Case6WhoTookClue
            pair={pair}
            onCompleteCase={handleCompleteCase}
            onSwapRoles={handleSwapRoles}
            onGoToHub={() => setScreen('hub')}
            onNextCase={() => handleNavigateCase(7)}
            onOpenNotebook={() => setIsNotebookOpen(true)}
            onOpenInventory={() => setIsInventoryOpen(true)}
          />
        )}

        {screen === 'case7' && (
          <Case7LostPassword
            pair={pair}
            onCompleteCase={handleCompleteCase}
            onSwapRoles={handleSwapRoles}
            onGoToHub={() => setScreen('hub')}
            onNextCase={() => handleNavigateCase(8)}
            onOpenNotebook={() => setIsNotebookOpen(true)}
            onOpenInventory={() => setIsInventoryOpen(true)}
          />
        )}

        {screen === 'case8' && (
          <Case8LastArchive
            pair={pair}
            onCompleteCase={handleCompleteCase}
            onSwapRoles={handleSwapRoles}
            onGoToHub={() => setScreen('hub')}
            onNextCase={() => setScreen('final_computer')}
            onOpenNotebook={() => setIsNotebookOpen(true)}
            onOpenInventory={() => setIsInventoryOpen(true)}
          />
        )}

        {screen === 'final_computer' && (
          <CaseFinalComputer
            pair={pair}
            onGoToHub={() => setScreen('hub')}
            onGoToBonus={() => setScreen('bonus_challenge')}
            onOpenCertificate={() => setIsCertificateOpen(true)}
          />
        )}

        {screen === 'bonus_challenge' && (
          <CaseBonusMaker
            pair={pair}
            onGoToHub={() => setScreen('hub')}
            onOpenCertificate={() => setIsCertificateOpen(true)}
          />
        )}
      </main>

      {/* Quick Floating Inventory Bag Button (Always accessible) */}
      <button
        onClick={() => {
          sound.playClick();
          setIsInventoryOpen(true);
        }}
        className="fixed bottom-4 right-4 z-40 bg-gradient-to-r from-amber-600 via-[#5c3e21] to-[#3d2714] hover:from-amber-500 hover:to-[#4a2e12] text-amber-100 font-bold px-3.5 py-2.5 rounded-full shadow-2xl border-2 border-amber-300/80 flex items-center gap-2 text-xs transition-transform transform hover:scale-105 active:scale-95 cursor-pointer"
        title="Abrir a Maleta de Inventário (Atalho: Tecla I)"
      >
        <span className="text-base">💼</span>
        <span className="font-serif font-black tracking-wide hidden sm:inline">Inventário</span>
        <span className="bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-full text-[10px] font-typewriter font-black">
          {completedCases.length + 4}
        </span>
      </button>

      {/* Global Modals */}
      <InventoryModal
        isOpen={isInventoryOpen}
        onClose={() => setIsInventoryOpen(false)}
        completedCases={completedCases}
      />

      <ClueNotebookModal
        isOpen={isNotebookOpen}
        onClose={() => setIsNotebookOpen(false)}
        completedCases={completedCases}
      />

      <PedagogicalCycleModal
        isOpen={isCycleOpen}
        onClose={() => setIsCycleOpen(false)}
      />

      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        pair={pair}
      />
    </div>
  );
}
