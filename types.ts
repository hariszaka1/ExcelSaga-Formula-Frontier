import type { ComponentType } from 'react';

export interface Level {
  id: number;
  title: string;
  theme: string;
  challenge: string;
  hint: string;
  explanation?: string;
  table: {
    headers: string[];
    rows: (string | number)[][];
  };
  answer: {
    type: 'formula' | 'dropdown' | 'text';
    options?: string[];
    correctValue: string | string[];
  };
  icon: ComponentType<{ className?: string }>;
}

export type LevelCompletionStatus = Record<number, boolean>;

export enum GameState {
  PartSelection,
  LevelSelection,
  InGame,
  Congratulations,
}

export enum MascotState {
    Idle = 'idle',
    Thinking = 'thinking',
    Correct = 'correct',
    Incorrect = 'incorrect',
    Celebrating = 'celebrating',
}