
import React from 'react';
import type { LevelCompletionStatus } from '../types';
import { LockClosedIcon, BookOpenIcon, AcademicCapIcon, FireIcon, CpuChipIcon } from '@heroicons/react/24/solid';

interface PartSelectionScreenProps {
  onSelectPart: (part: 1 | 2 | 3 | 4) => void;
  levelCompletion: LevelCompletionStatus;
}

export const PartSelectionScreen: React.FC<PartSelectionScreenProps> = ({ onSelectPart, levelCompletion }) => {
  const isPart2Unlocked = levelCompletion[9];
  const isPart3Unlocked = levelCompletion[19];
  const isPart4Unlocked = levelCompletion[29];

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-700 mb-8">Pilih Bagian Petualanganmu</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Part 1 */}
        <div 
          onClick={() => onSelectPart(1)}
          className="bg-white p-8 rounded-2xl shadow-lg border-2 border-green-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col items-center text-center"
        >
          <div className="p-4 bg-green-100 rounded-full mb-4">
            <BookOpenIcon className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Bagian 1</h3>
          <p className="text-slate-600">Dasar & Menengah</p>
          <p className="text-xs text-slate-500 mt-1">(Level 1-10)</p>
        </div>

        {/* Part 2 */}
        <div
          onClick={() => isPart2Unlocked && onSelectPart(2)}
          className={`p-8 rounded-2xl shadow-lg border-2 transition-all duration-300 flex flex-col items-center text-center ${isPart2Unlocked 
            ? 'bg-white border-purple-200 hover:shadow-2xl hover:-translate-y-2 cursor-pointer' 
            : 'bg-slate-200 border-slate-300 text-slate-500 cursor-not-allowed'}`
          }
        >
          <div className={`p-4 rounded-full mb-4 ${isPart2Unlocked ? 'bg-purple-100' : 'bg-slate-300'}`}>
            <AcademicCapIcon className={`w-12 h-12 ${isPart2Unlocked ? 'text-purple-600' : 'text-slate-500'}`} />
          </div>
          <h3 className="text-2xl font-bold mb-2">Bagian 2</h3>
          <p className="">Lanjutan & Ahli</p>
          <p className="text-xs mt-1">(Level 11-20)</p>
          {!isPart2Unlocked && (
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold">
              <LockClosedIcon className="w-4 h-4" />
              <span>Selesaikan Bagian 1</span>
            </div>
          )}
        </div>

        {/* Part 3 */}
         <div
          onClick={() => isPart3Unlocked && onSelectPart(3)}
          className={`p-8 rounded-2xl shadow-lg border-2 transition-all duration-300 flex flex-col items-center text-center ${isPart3Unlocked 
            ? 'bg-white border-red-200 hover:shadow-2xl hover:-translate-y-2 cursor-pointer' 
            : 'bg-slate-200 border-slate-300 text-slate-500 cursor-not-allowed'}`
          }
        >
          <div className={`p-4 rounded-full mb-4 ${isPart3Unlocked ? 'bg-red-100' : 'bg-slate-300'}`}>
            <FireIcon className={`w-12 h-12 ${isPart3Unlocked ? 'text-red-600' : 'text-slate-500'}`} />
          </div>
          <h3 className="text-2xl font-bold mb-2">Bagian 3</h3>
          <p className="">Master Mode</p>
          <p className="text-xs mt-1">(Level 21-30)</p>
          {!isPart3Unlocked && (
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold">
              <LockClosedIcon className="w-4 h-4" />
              <span>Selesaikan Bagian 2</span>
            </div>
          )}
        </div>

        {/* Part 4 */}
        <div
          onClick={() => isPart4Unlocked && onSelectPart(4)}
          className={`p-8 rounded-2xl shadow-lg border-2 transition-all duration-300 flex flex-col items-center text-center ${isPart4Unlocked 
            ? 'bg-white border-blue-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer' 
            : 'bg-slate-200 border-slate-300 text-slate-500 cursor-not-allowed'}`
          }
        >
          <div className={`p-4 rounded-full mb-4 ${isPart4Unlocked ? 'bg-blue-100' : 'bg-slate-300'}`}>
            <CpuChipIcon className={`w-12 h-12 ${isPart4Unlocked ? 'text-blue-700' : 'text-slate-500'}`} />
          </div>
          <h3 className="text-2xl font-bold mb-2">Bagian 4</h3>
          <p className="">The Analyst’s Ascent</p>
          <p className="text-xs mt-1">(Level 31-40)</p>
          {!isPart4Unlocked && (
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold">
              <LockClosedIcon className="w-4 h-4" />
              <span>Selesaikan Bagian 3</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};