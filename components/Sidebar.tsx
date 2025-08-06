
import React from 'react';
import type { Level, LevelCompletionStatus } from '../types';
import { CheckCircleIcon, PlayCircleIcon } from '@heroicons/react/24/solid';
import { LockClosedIcon } from '@heroicons/react/24/outline';

interface SidebarProps {
  levels: Level[];
  partOffset: number;
  currentLevelIndex: number;
  completionStatus: LevelCompletionStatus;
  onSelectLevel: (index: number) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ levels, partOffset, currentLevelIndex, completionStatus, onSelectLevel }) => {
  return (
    <aside className="w-full lg:w-1/4 bg-white rounded-2xl shadow-lg border border-slate-200 p-4 lg:sticky lg:top-8 self-start">
      <h3 className="font-bold text-xl mb-4 text-center text-slate-700">Peta Level</h3>
      <nav>
        <ul className="space-y-2">
          {levels.map((level, index) => {
            const globalIndex = index + partOffset;
            const isCompleted = completionStatus[globalIndex];
            const isCurrent = globalIndex === currentLevelIndex;
            const isUnlocked = globalIndex === 0 || completionStatus[globalIndex - 1];

            let statusIcon;
            if (isCompleted) {
                statusIcon = <CheckCircleIcon className="w-6 h-6 text-yellow-400" />;
            } else if (isCurrent) {
                statusIcon = <PlayCircleIcon className="w-6 h-6 text-green-500 animate-pulse" />;
            } else if (!isUnlocked) {
                statusIcon = <LockClosedIcon className="w-6 h-6 text-slate-400" />;
            } else {
                statusIcon = <div className="w-6 h-6 flex items-center justify-center"><div className="w-3 h-3 rounded-full bg-slate-300"></div></div>;
            }
            
            return (
              <li key={level.id}>
                <button
                  onClick={() => isUnlocked && onSelectLevel(globalIndex)}
                  disabled={!isUnlocked}
                  className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors duration-200
                    ${isCurrent ? 'bg-green-100 font-bold text-green-800' : ''}
                    ${isUnlocked ? 'hover:bg-slate-100 cursor-pointer' : 'text-slate-500 cursor-not-allowed'}
                    ${!isCurrent && !isUnlocked ? 'bg-slate-100' : ''}
                  `}
                >
                  <span className="flex-shrink-0">{statusIcon}</span>
                  <span className="flex-grow">{level.id}. {level.title}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
