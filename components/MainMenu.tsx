
import React from 'react';
import { levelData } from '../constants';
import type { LevelCompletionStatus } from '../types';
import { CheckCircleIcon, LockClosedIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/solid';

interface MainMenuProps {
  part: 1 | 2 | 3 | 4;
  onSelectLevel: (levelIndex: number) => void;
  levelCompletion: LevelCompletionStatus;
  onBackToPartSelection: () => void;
}

const PartHeader: React.FC<{ part: 1 | 2 | 3 | 4 }> = ({ part }) => {
  const titles = {
    1: 'Bagian 1: Dasar & Menengah',
    2: 'Bagian 2: Lanjutan & Ahli',
    3: 'Bagian 3: Tantangan Mahir',
    4: 'Bagian 4: The Analyst’s Ascent',
  };
  const borders = {
    1: 'border-green-300',
    2: 'border-purple-300',
    3: 'border-red-300',
    4: 'border-blue-300',
  };
  return (
    <h3 className={`text-xl font-bold text-slate-600 mb-4 border-b-2 ${borders[part]} pb-2`}>
      {titles[part]}
    </h3>
  );
};

export const MainMenu: React.FC<MainMenuProps> = ({ part, onSelectLevel, levelCompletion, onBackToPartSelection }) => {
  const levels = part === 1 ? levelData.slice(0, 10) : (part === 2 ? levelData.slice(10, 20) : (part === 3 ? levelData.slice(20, 30) : levelData.slice(30)));
  const indexOffset = part === 1 ? 0 : (part === 2 ? 10 : (part === 3 ? 20 : 30));
  
  const partStyles = {
    1: { borderColor: 'border-green-200', bgColor: 'bg-green-100', textColor: 'text-green-600', accentColor: 'text-green-600' },
    2: { borderColor: 'border-purple-200', bgColor: 'bg-purple-100', textColor: 'text-purple-600', accentColor: 'text-purple-600' },
    3: { borderColor: 'border-red-200', bgColor: 'bg-red-100', textColor: 'text-red-600', accentColor: 'text-red-600' },
    4: { borderColor: 'border-blue-300', bgColor: 'bg-blue-100', textColor: 'text-blue-700', accentColor: 'text-green-500' },
  };

  const { borderColor, bgColor, textColor, accentColor } = partStyles[part];

  const renderHeader = () => {
    if (part === 4) {
      return (
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Excel Saga: <span className={textColor}>The Analyst’s Ascent</span>
          </h2>
          <p className="text-slate-600 mt-1">Pilih Level Ahli (31–40)</p>
        </div>
      );
    }
    if (part === 3) {
      return (
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Excel Saga: <span className={textColor}>Master Mode</span>
          </h2>
          <p className="text-slate-600 mt-1">Pilih Level Tantangan Mahir (21–30)</p>
        </div>
      );
    }
    return <h2 className="text-2xl font-bold text-slate-700">Pilih Level</h2>
  }


  return (
    <div className="max-w-7xl mx-auto">
       <div className="flex justify-between items-center mb-6">
        {renderHeader()}
        <button 
          onClick={onBackToPartSelection}
          className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-colors"
        >
          <ArrowUturnLeftIcon className="w-5 h-5"/>
          Pilih Bagian
        </button>
      </div>
      
      <div>
        <PartHeader part={part} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {levels.map((level, index) => {
            const globalIndex = index + indexOffset;
            const isCompleted = levelCompletion[globalIndex];
            const isUnlocked = globalIndex === 0 || levelCompletion[globalIndex - 1];
            const IconComponent = level.icon;

            let statusText = '';
            let statusColor = '';
            if (!isUnlocked) {
              statusText = 'Terkunci';
              statusColor = 'text-slate-500';
            } else if (isCompleted) {
              statusText = 'Selesai';
              statusColor = 'text-yellow-500 font-bold';
            } else {
              statusText = 'Belum Selesai';
              statusColor = 'text-green-600';
            }

            return (
              <div
                key={level.id}
                onClick={() => isUnlocked && onSelectLevel(globalIndex)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 transform flex flex-col justify-between ${isUnlocked ? `bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer ${borderColor}` : 'bg-slate-200 shadow-inner text-slate-500 border-slate-300'}`}
              >
                <div>
                  <div className="flex justify-between items-start">
                    <div className={`p-2 rounded-lg ${isUnlocked ? `${bgColor} ${textColor}` : 'bg-slate-300 text-slate-500'}`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    {isCompleted && <CheckCircleIcon className="w-6 h-6 text-yellow-400" />}
                    {!isUnlocked && <LockClosedIcon className="w-6 h-6 text-slate-500" />}
                  </div>
                  <h3 className="font-bold text-lg mt-3">{level.title}</h3>
                  <p className={`text-sm ${isUnlocked ? 'text-slate-600' : 'text-slate-500'}`}>{level.theme}</p>
                </div>
                <p className={`text-xs mt-2 ${statusColor}`}>{statusText}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};