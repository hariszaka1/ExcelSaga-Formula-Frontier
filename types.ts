import type { ComponentType } from 'react';

export interface Answer {
  type: 'formula' | 'dropdown' | 'text';
  options?: string[];
  correctValue: string | string[];
}

export interface Question {
  challenge: string;
  hint: string;
  explanation?: string;
  answer: Answer;
}

export interface Level {
  id: number;
  title: string;
  theme: string;
  table: {
    headers: string[];
    rows: (string | number)[][];
  };
  questions: Question[];
  icon: ComponentType<{ className?: string }>;
}

export type LevelCompletionStatus = Record<number, boolean>;

export enum GameState {
  StartMenu,
  Settings,
  Credits,
  Leaderboard,
  PartSelection,
  LevelSelection,
  InGame,
  Congratulations,
  AdminPanel,
  Profile,
  MiniGameArcade,
  FormulaRacer,
  CellFinder,
  FunctionMatch,
  ChartChamp,
  ShortcutShowdown,
  ErrorExterminator,
  PivotPro,
  FillHandleFrenzy,
  ConditionalClues,
  WhatsTheFunction,
  Certificate,
  VlookupVenture,
  DataValidationDash,
  FreezePanesPuzzle,
  SortFilterSprint,
  TextSplitter,
  GoalSeekGuru,
  KeyboardNinja,
  ChartElementId,
  ConditionalLogic,
  DynamicArrayDrill,
  WhatIfWizard,
  PasteSpecialPro,
  NamedRangeRanger,
  AbsoluteRelativeRace,
  SparklineSpeedster,
  TrainingMode,
  ExcelChampionshipLobby,
  ExcelChampionship,
}

export enum MascotState {
    Idle = 'idle',
    Thinking = 'thinking',
    Correct = 'correct',
    Incorrect = 'incorrect',
    Celebrating = 'celebrating',
}

export interface UserView {
  id: string;
  type: 'password' | 'google';
}

export interface CertificateRecord {
  id: string;
  userId: string;
  userName: string;
  issuedAt: number;
}

export interface CertificateSettings {
  title: string;
  awardText: string;
  congratsText: string;
  primaryColor: string;
  secondaryColor: string;
  signerName: string;
  signerTitle: string;
}

export interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireNumber: boolean;
  requireSpecialChar: boolean;
}

export interface User {
  id: string; // email
  type: 'password' | 'google';
  password?: string; // Optional password, used to unlock answers. Can be set for both account types.
  progress: LevelCompletionStatus;
  championshipsCompleted: Record<number, boolean>;
  fullName?: string;
  phone?: string;
  isAdmin?: boolean;
  isMember?: boolean;
  createdAt: number;
  lastLoginAt?: number;
  certificate?: CertificateRecord;
}

export type PartNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface TrainingChallenge {
  challenge: string;
  table: {
    headers: string[];
    rows: (string | number)[][];
  };
  answer: Answer;
  explanation: string;
  targetCell: { r: number; c: number }; // 0-indexed
  correctResult: string | number;
}

export interface AppSettings {
  formulaSeparator: ',' | ';';
  numberFormat: 'us' | 'eu'; // us: 1,234.56 | eu: 1.234,56
  dateFormat: 'DD-MM-YYYY' | 'MM-DD-YYYY' | 'YYYY-MM-DD';
  referenceStyle: 'A1' | 'R1C1';
}

export interface ChampionshipTask {
    task: string;
    targetCell: { r: number; c: number }; // 0-indexed
    answer: Answer;
    correctResult: string | number;
    explanation: string;
}

export interface ChampionshipCase {
    id: number;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    description: string;
    table: {
        headers: string[];
        rows: (string | number)[][];
    };
    tasks: ChampionshipTask[];
}