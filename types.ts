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

export interface User {
  id: string; // email
  type: 'password' | 'google';
  password?: string; // Optional password, used to unlock answers. Can be set for both account types.
  progress: LevelCompletionStatus;
  fullName?: string;
  phone?: string;
  isAdmin?: boolean;
  isMember?: boolean;
  createdAt: number;
  lastLoginAt?: number;
  certificate?: CertificateRecord;
}

export type PartNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;