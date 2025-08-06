
import React from 'react';
import { levelData } from '../constants';
import type { LevelCompletionStatus } from '../types';
import { CheckCircleIcon, LockClosedIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/solid';

type PartNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface MainMenuProps {
  part: PartNumber;
  onSelectLevel: (levelIndex: number) => void;
  levelCompletion: LevelCompletionStatus;
  onBackToPartSelection: () => void;
}

const PartHeader: React.FC<{ part: PartNumber }> = ({ part }) => {
  const titles: Record<PartNumber, string> = {
    1: 'Bagian 1: Dasar & Menengah',
    2: 'Bagian 2: Lanjutan & Ahli',
    3: 'Bagian 3: Tantangan Mahir',
    4: 'Bagian 4: The Analyst’s Ascent',
    5: 'Bagian 5: Grandmaster Analyst',
    6: 'Bagian 6: Data Wrangler',
    7: 'Bagian 7: Automation Apprentice',
    8: 'Bagian 8: BI Specialist',
    9: 'Bagian 9: Formula Architect',
    10: 'Bagian 10: Excel Virtuoso',
  };
  const borders: Record<PartNumber, string> = {
    1: 'border-green-300',
    2: 'border-purple-300',
    3: 'border-red-300',
    4: 'border-blue-300',
    5: 'border-slate-400',
    6: 'border-cyan-400',
    7: 'border-indigo-400',
    8: 'border-teal-400',
    9: 'border-orange-400',
    10: 'border-gray-500',
  };
  return (
    <h3 className={`text-xl font-bold text-slate-600 mb-4 border-b-2 ${borders[part]} pb-2`}>
      {titles[part]}
    </h3>
  );
};

export const MainMenu: React.FC<MainMenuProps> = ({ part, onSelectLevel, levelCompletion, onBackToPartSelection }) => {
  const indexOffset = (part - 1) * 10;
  const levels = levelData.slice(indexOffset, indexOffset + 10);
  
  const partStyles: Record<PartNumber, { borderColor: string, bgColor: string, textColor: string, accentColor: string }> = {
    1: { borderColor: 'border-green-200', bgColor: 'bg-green-100', textColor: 'text-green-600', accentColor: 'text-green-600' },
    2: { borderColor: 'border-purple-200', bgColor: 'bg-purple-100', textColor: 'text-purple-600', accentColor: 'text-purple-600' },
    3: { borderColor: 'border-red-200', bgColor: 'bg-red-100', textColor: 'text-red-600', accentColor: 'text-red-600' },
    4: { borderColor: 'border-blue-300', bgColor: 'bg-blue-100', textColor: 'text-blue-700', accentColor: 'text-green-500' },
    5: { borderColor: 'border-slate-400', bgColor: 'bg-slate-200', textColor: 'text-slate-800', accentColor: 'text-yellow-500' },
    6: { borderColor: 'border-cyan-300', bgColor: 'bg-cyan-100', textColor: 'text-cyan-700', accentColor: 'text-cyan-500' },
    7: { borderColor: 'border-indigo-300', bgColor: 'bg-indigo-100', textColor: 'text-indigo-700', accentColor: 'text-indigo-500' },
    8: { borderColor: 'border-teal-300', bgColor: 'bg-teal-100', textColor: 'text-teal-700', accentColor: 'text-teal-500' },
    9: { borderColor: 'border-orange-300', bgColor: 'bg-orange-100', textColor: 'text-orange-700', accentColor: 'text-orange-500' },
    10: { borderColor: 'border-gray-400', bgColor: 'bg-gray-200', textColor: 'text-gray-800', accentColor: 'text-amber-500' },
  };

  const { borderColor, bgColor, textColor, accentColor } = partStyles[part];

  const renderHeader = () => {
    const titles: Record<PartNumber, { title: string, subtitle: string }> = {
        1: { title: "Excel Saga", subtitle: "Pilih Level Dasar (1-10)" },
        2: { title: "Excel Saga: Advanced Path", subtitle: "Pilih Level Lanjutan (11-20)" },
        3: { title: "Excel Saga: Master Mode", subtitle: "Pilih Level Tantangan Mahir (21-30)" },
        4: { title: "Excel Saga: The Analyst’s Ascent", subtitle: "Pilih Level Ahli (31-40)" },
        5: { title: "Excel Saga: Grandmaster Analyst", subtitle: "Pilih Level Grandmaster (41-50)" },
        6: { title: "Excel Saga: Data Wrangler", subtitle: "Pilih Level Penjinak Data (51-60)" },
        7: { title: "Excel Saga: Automation Apprentice", subtitle: "Pilih Level Otomatisasi (61-70)" },
        8: { title: "Excel Saga: BI Specialist", subtitle: "Pilih Level Intelijen Bisnis (71-80)" },
        9: { title: "Excel Saga: Formula Architect", subtitle: "Pilih Level Arsitek Formula (81-90)" },
        10: { title: "Excel Saga: Excel Virtuoso", subtitle: "Pilih Level Sang Maestro (91-100)" },
    }
    const {title, subtitle} = titles[part];
    
    return (
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
             <span className={textColor}>{title}</span>
          </h2>
          <p className="text-slate-600 mt-1">{subtitle}</p>
        </div>
      );
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
            const isUnlocked = levelCompletion[-1] || globalIndex === 0 || levelCompletion[globalIndex - 1];
            const IconComponent = level.icon;

            let statusText = '';
            let statusColor = '';
            if (!isUnlocked) {
              statusText = 'Terkunci';
              statusColor = 'text-slate-500';
            } else if (isCompleted) {
              statusText = 'Selesai';
              statusColor = accentColor;
            } else {
              statusText = 'Tersedia';
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
                    {isCompleted && <CheckCircleIcon className={`w-6 h-6 ${accentColor}`} />}
                    {!isUnlocked && <LockClosedIcon className="w-6 h-6 text-slate-500" />}
                  </div>
                  <h3 className="font-bold text-lg mt-3">{level.title}</h3>
                  <p className={`text-sm ${isUnlocked ? 'text-slate-600' : 'text-slate-500'}`}>{level.theme}</p>
                </div>
                <p className={`text-xs mt-2 font-bold ${statusColor}`}>{statusText}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
