import React from 'react';
import { championshipCases } from '../championshipData';
import { ArrowUturnLeftIcon, TrophyIcon } from '@heroicons/react/24/solid';

interface ExcelChampionshipLobbyProps {
  onStartCase: (caseId: number) => void;
  onBack: () => void;
}

export const ExcelChampionshipLobby: React.FC<ExcelChampionshipLobbyProps> = ({ onStartCase, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Excel Championship</h2>
          <p className="text-slate-600 mt-1">Uji kemampuan Anda dengan studi kasus nyata!</p>
        </div>
        <button
          onClick={onBack}
          className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-colors"
        >
          <ArrowUturnLeftIcon className="w-5 h-5" />
          Pilih Bagian
        </button>
      </div>

      <div className="space-y-4">
        {championshipCases.map((c) => (
          <div key={c.id} className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="bg-amber-100 p-4 rounded-full">
              <TrophyIcon className="w-10 h-10 text-amber-500" />
            </div>
            <div className="flex-grow">
              <div className="flex items-baseline gap-3">
                <h3 className="text-xl font-bold text-slate-800">{c.title}</h3>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  c.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                  c.difficulty === 'Hard' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>{c.difficulty}</span>
              </div>
              <p className="text-sm text-slate-600 mt-1">{c.description}</p>
            </div>
            <button 
              onClick={() => onStartCase(c.id)}
              className="flex-shrink-0 w-full sm:w-auto px-6 py-3 bg-amber-500 text-white font-bold rounded-lg shadow-md hover:bg-amber-600 transition"
            >
              Mulai Kasus
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
