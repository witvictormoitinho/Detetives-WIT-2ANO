/**
 * Types for Detetive WIT Escape Room
 */

export type Role = 'detective' | 'analista';

export interface StudentPair {
  detectiveName: string;
  analystName: string;
  activeRole: Role; // Who is leading current phase
}

export interface ClueItem {
  id: string;
  caseNumber: number;
  title: string;
  symbol?: string;
  value?: string | number;
  description: string;
  revealed: boolean;
}

export interface InventoryItem {
  id: string;
  category: 'tool' | 'clue' | 'code';
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  symbolBadge?: string;
  source: string;
  requiredCaseId?: number;
  revealedValue?: string;
}

export type ScreenMode = 
  | 'intro'
  | 'hub'
  | 'case1'
  | 'case2'
  | 'case3'
  | 'case4'
  | 'case5'
  | 'case6'
  | 'case7'
  | 'case8'
  | 'final_computer'
  | 'bonus_challenge'
  | 'victory';

export interface GameProgress {
  completedCases: number[]; // e.g. [1, 2, 3...]
  unlockedClues: string[];
  finalPasswordUnlocked: boolean;
  bonusCompleted: boolean;
}
