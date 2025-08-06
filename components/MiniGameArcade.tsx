
import React from 'react';
import {
  ArrowUturnLeftIcon,
  ComputerDesktopIcon,
  CursorArrowRaysIcon,
  ArrowsRightLeftIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  TableCellsIcon,
  PlusCircleIcon,
  PaintBrushIcon,
  QuestionMarkCircleIcon,
  LockClosedIcon,
} from '@heroicons/react/24/solid';
import type { User, LevelCompletionStatus } from '../types';

interface MiniGameArcadeProps {
  user: User;
  levelCompletion: LevelCompletionStatus;
  onStartGame: (game: 'FormulaRacer' | 'CellFinder' | 'FunctionMatch' | 'ChartChamp' | 'ShortcutShowdown' | 'ErrorExterminator' | 'PivotPro' | 'FillHandleFrenzy' | 'ConditionalClues' | 'WhatsTheFunction') => void;
  onBack: () => void;
}

const gameData = [
  {
    id: 'FormulaRacer',
    title: 'Formula Racer',
    description: 'Ketik formula Excel secepat dan seakurat mungkin!',
    icon: ComputerDesktopIcon,
    color: 'bg-sky-100 text-sky-600',
    buttonColor: 'bg-sky-500 hover:bg-sky-600',
  },
  {
    id: 'CellFinder',
    title: 'Cell Finder',
    description: 'Temukan dan klik sel yang benar di grid sebelum waktu habis.',
    icon: CursorArrowRaysIcon,
    color: 'bg-green-100 text-green-600',
    buttonColor: 'bg-green-500 hover:bg-green-600',
  },
  {
    id: 'FunctionMatch',
    title: 'Function Match',
    description: 'Pasangkan nama fungsi dengan deskripsi yang tepat.',
    icon: ArrowsRightLeftIcon,
    color: 'bg-amber-100 text-amber-600',
    buttonColor: 'bg-amber-500 hover:bg-amber-600',
  },
  {
    id: 'ChartChamp',
    title: 'Chart Champ',
    description: 'Pilih tipe grafik yang paling tepat untuk skenario yang diberikan.',
    icon: ChartBarIcon,
    color: 'bg-red-100 text-red-600',
    buttonColor: 'bg-red-500 hover:bg-red-600',
  },
  {
    id: 'ShortcutShowdown',
    title: 'Shortcut Showdown',
    description: 'Tebak fungsi dari shortcut keyboard Excel yang ditampilkan.',
    icon: ComputerDesktopIcon,
    color: 'bg-indigo-100 text-indigo-600',
    buttonColor: 'bg-indigo-500 hover:bg-indigo-600',
  },
  {
    id: 'ErrorExterminator',
    title: 'Error Exterminator',
    description: 'Identifikasi jenis error Excel dari formula yang salah.',
    icon: ExclamationTriangleIcon,
    color: 'bg-yellow-100 text-yellow-600',
    buttonColor: 'bg-yellow-500 hover:bg-yellow-600',
  },
  {
    id: 'PivotPro',
    title: 'Pivot Pro',
    description: 'Susun PivotTable sederhana dengan menempatkan field ke area yang benar.',
    icon: TableCellsIcon,
    color: 'bg-teal-100 text-teal-600',
    buttonColor: 'bg-teal-500 hover:bg-teal-600',
  },
  {
    id: 'FillHandleFrenzy',
    title: 'Fill Handle Frenzy',
    description: 'Prediksi nilai berikutnya saat menggunakan fitur Fill Handle.',
    icon: PlusCircleIcon,
    color: 'bg-rose-100 text-rose-600',
    buttonColor: 'bg-rose-500 hover:bg-rose-600',
  },
  {
    id: 'ConditionalClues',
    title: 'Conditional Clues',
    description: 'Klik semua sel yang akan disorot oleh aturan pemformatan bersyarat.',
    icon: PaintBrushIcon,
    color: 'bg-purple-100 text-purple-600',
    buttonColor: 'bg-purple-500 hover:bg-purple-600',
  },
  {
    id: 'WhatsTheFunction',
    title: "What's The Function?",
    description: 'Ketik nama fungsi Excel yang tepat untuk menyelesaikan tugas yang diberikan.',
    icon: QuestionMarkCircleIcon,
    color: 'bg-orange-100 text-orange-600',
    buttonColor: 'bg-orange-500 hover:bg-orange-600',
  },
] as const;

export const MiniGameArcade: React.FC<MiniGameArcadeProps> = ({ user, levelCompletion, onStartGame, onBack }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Arcade Mode</h2>
          <p className="text-slate-600 mt-1">Selesaikan setiap bagian dari game utama untuk membuka lebih banyak mini-game!</p>
        </div>
        <button
          onClick={onBack}
          className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-colors"
        >
          <ArrowUturnLeftIcon className="w-5 h-5" />
          Kembali ke Menu
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {gameData.map((game, index) => {
          const correspondingPartNumber = index + 1;
          const requiredLevelIndex = correspondingPartNumber * 10 - 1;
          const isUnlocked = user.isAdmin || !!levelCompletion[requiredLevelIndex];

          return (
            <div
              key={game.id}
              className={`bg-white p-6 rounded-2xl shadow-lg border border-slate-200 flex flex-col items-center text-center transition-all duration-300 ${isUnlocked ? 'transform hover:-translate-y-1' : 'bg-slate-100'}`}
            >
              <div className={`p-4 rounded-full mb-4 ${isUnlocked ? game.color : 'bg-slate-200 text-slate-400'}`}>
                {isUnlocked ? <game.icon className="w-12 h-12" /> : <LockClosedIcon className="w-12 h-12" />}
              </div>
              <h3 className={`text-xl font-bold ${isUnlocked ? 'text-slate-800' : 'text-slate-500'}`}>{game.title}</h3>
              <p className={`text-sm mt-2 flex-grow ${isUnlocked ? 'text-slate-600' : 'text-slate-500 font-semibold'}`}>
                {isUnlocked ? game.description : `Selesaikan Bagian ${correspondingPartNumber} untuk membuka.`}
              </p>
              <button
                onClick={() => isUnlocked && onStartGame(game.id)}
                disabled={!isUnlocked}
                className={`mt-6 w-full px-4 py-2 text-white font-bold rounded-lg shadow-md transition-colors ${isUnlocked ? game.buttonColor : 'bg-slate-400 cursor-not-allowed'}`}
              >
                {isUnlocked ? 'Mainkan' : 'Terkunci'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
