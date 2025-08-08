
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
  PuzzlePieceIcon,
  ShieldCheckIcon,
  ViewfinderCircleIcon,
  FunnelIcon,
  ScissorsIcon,
  RocketLaunchIcon,
  CommandLineIcon,
  PresentationChartLineIcon,
  ShareIcon,
  RectangleStackIcon,
  ClipboardDocumentCheckIcon,
  TagIcon,
  LinkIcon,
  ChartBarSquareIcon,
  SunIcon,
  BeakerIcon,
  LockClosedIcon,
} from '@heroicons/react/24/solid';
import type { User, LevelCompletionStatus } from '../types';

interface MiniGameArcadeProps {
  user: User;
  levelCompletion: LevelCompletionStatus;
  onStartGame: (game: 'FormulaRacer' | 'CellFinder' | 'FunctionMatch' | 'ChartChamp' | 'ShortcutShowdown' | 'ErrorExterminator' | 'PivotPro' | 'FillHandleFrenzy' | 'ConditionalClues' | 'WhatsTheFunction' | 'VlookupVenture' | 'DataValidationDash' | 'FreezePanesPuzzle' | 'SortFilterSprint' | 'TextSplitter' | 'GoalSeekGuru' | 'KeyboardNinja' | 'ChartElementId' | 'ConditionalLogic' | 'DynamicArrayDrill' | 'WhatIfWizard' | 'PasteSpecialPro' | 'NamedRangeRanger' | 'AbsoluteRelativeRace' | 'SparklineSpeedster') => void;
  onBack: () => void;
}

const gameData = [
  { id: 'FormulaRacer', title: 'Formula Racer', description: 'Ketik formula Excel secepat dan seakurat mungkin!', icon: CommandLineIcon, color: 'bg-sky-100 text-sky-600', buttonColor: 'bg-sky-500 hover:bg-sky-600' },
  { id: 'CellFinder', title: 'Cell Finder', description: 'Temukan dan klik sel yang benar di grid sebelum waktu habis.', icon: CursorArrowRaysIcon, color: 'bg-green-100 text-green-600', buttonColor: 'bg-green-500 hover:bg-green-600' },
  { id: 'FunctionMatch', title: 'Function Match', description: 'Pasangkan nama fungsi dengan deskripsi yang tepat.', icon: ArrowsRightLeftIcon, color: 'bg-amber-100 text-amber-600', buttonColor: 'bg-amber-500 hover:bg-amber-600' },
  { id: 'ChartChamp', title: 'Chart Champ', description: 'Pilih tipe grafik yang paling tepat untuk skenario yang diberikan.', icon: ChartBarIcon, color: 'bg-red-100 text-red-600', buttonColor: 'bg-red-500 hover:bg-red-600' },
  { id: 'ShortcutShowdown', title: 'Shortcut Showdown', description: 'Tebak fungsi dari shortcut keyboard Excel yang ditampilkan.', icon: ComputerDesktopIcon, color: 'bg-indigo-100 text-indigo-600', buttonColor: 'bg-indigo-500 hover:bg-indigo-600' },
  { id: 'ErrorExterminator', title: 'Error Exterminator', description: 'Identifikasi jenis error Excel dari formula yang salah.', icon: ExclamationTriangleIcon, color: 'bg-yellow-100 text-yellow-600', buttonColor: 'bg-yellow-500 hover:bg-yellow-600' },
  { id: 'PivotPro', title: 'Pivot Pro', description: 'Susun PivotTable dengan menempatkan field ke area yang benar.', icon: TableCellsIcon, color: 'bg-teal-100 text-teal-600', buttonColor: 'bg-teal-500 hover:bg-teal-600' },
  { id: 'FillHandleFrenzy', title: 'Fill Handle Frenzy', description: 'Prediksi nilai berikutnya saat menggunakan fitur Fill Handle.', icon: PlusCircleIcon, color: 'bg-rose-100 text-rose-600', buttonColor: 'bg-rose-500 hover:bg-rose-600' },
  { id: 'ConditionalClues', title: 'Conditional Clues', description: 'Klik semua sel yang akan disorot oleh aturan pemformatan bersyarat.', icon: PaintBrushIcon, color: 'bg-purple-100 text-purple-600', buttonColor: 'bg-purple-500 hover:bg-purple-600' },
  { id: 'WhatsTheFunction', title: "What's The Function?", description: 'Ketik nama fungsi yang tepat untuk menyelesaikan tugas.', icon: QuestionMarkCircleIcon, color: 'bg-orange-100 text-orange-600', buttonColor: 'bg-orange-500 hover:bg-orange-600' },
  { id: 'VlookupVenture', title: 'VLOOKUP Venture', description: 'Pilih formula VLOOKUP yang benar untuk skenario yang diberikan.', icon: PuzzlePieceIcon, color: 'bg-lime-100 text-lime-600', buttonColor: 'bg-lime-500 hover:bg-lime-600' },
  { id: 'DataValidationDash', title: 'Data Validation Dash', description: 'Tebak aturan validasi data dari deskripsi yang diberikan.', icon: ShieldCheckIcon, color: 'bg-cyan-100 text-cyan-600', buttonColor: 'bg-cyan-500 hover:bg-cyan-600' },
  { id: 'FreezePanesPuzzle', title: 'Freeze Panes Puzzle', description: 'Pilih sel yang benar untuk membekukan baris dan kolom.', icon: ViewfinderCircleIcon, color: 'bg-fuchsia-100 text-fuchsia-600', buttonColor: 'bg-fuchsia-500 hover:bg-fuchsia-600' },
  { id: 'SortFilterSprint', title: 'Sort & Filter Sprint', description: 'Pilih tindakan yang benar untuk menyortir atau memfilter data.', icon: FunnelIcon, color: 'bg-pink-100 text-pink-600', buttonColor: 'bg-pink-500 hover:bg-pink-600' },
  { id: 'TextSplitter', title: 'Text Splitter', description: 'Pilih formula yang tepat untuk mengekstrak teks.', icon: ScissorsIcon, color: 'bg-blue-100 text-blue-600', buttonColor: 'bg-blue-500 hover:bg-blue-600' },
  { id: 'GoalSeekGuru', title: 'Goal Seek Guru', description: 'Identifikasi komponen yang benar untuk analisis Goal Seek.', icon: RocketLaunchIcon, color: 'bg-red-100 text-red-600', buttonColor: 'bg-red-500 hover:bg-red-600' },
  { id: 'KeyboardNinja', title: 'Keyboard Ninja', description: 'Cocokkan shortcut keyboard dengan aksinya.', icon: ComputerDesktopIcon, color: 'bg-gray-100 text-gray-600', buttonColor: 'bg-gray-500 hover:bg-gray-600' },
  { id: 'ChartElementId', title: 'Chart Element ID', description: 'Identifikasi bagian-bagian dari sebuah grafik Excel.', icon: PresentationChartLineIcon, color: 'bg-amber-100 text-amber-600', buttonColor: 'bg-amber-500 hover:bg-amber-600' },
  { id: 'ConditionalLogic', title: 'Conditional Logic', description: 'Prediksi hasil dari formula logika IF, AND, atau OR.', icon: ShareIcon, color: 'bg-indigo-100 text-indigo-600', buttonColor: 'bg-indigo-500 hover:bg-indigo-600' },
  { id: 'DynamicArrayDrill', title: 'Dynamic Array Drill', description: 'Pilih formula array dinamis yang benar untuk suatu tugas.', icon: RectangleStackIcon, color: 'bg-teal-100 text-teal-600', buttonColor: 'bg-teal-500 hover:bg-teal-600' },
  { id: 'WhatIfWizard', title: 'What-If Wizard', description: 'Cocokkan skenario (mis. Optimis) dengan hasil yang benar.', icon: SunIcon, color: 'bg-yellow-100 text-yellow-600', buttonColor: 'bg-yellow-500 hover:bg-yellow-600' },
  { id: 'PasteSpecialPro', title: 'Paste Special Pro', description: 'Pilih opsi Paste Special yang tepat untuk suatu pekerjaan.', icon: ClipboardDocumentCheckIcon, color: 'bg-lime-100 text-lime-600', buttonColor: 'bg-lime-500 hover:bg-lime-600' },
  { id: 'NamedRangeRanger', title: 'Named Range Ranger', description: 'Jawab pertanyaan tentang penggunaan Named Range.', icon: TagIcon, color: 'bg-green-100 text-green-600', buttonColor: 'bg-green-500 hover:bg-green-600' },
  { id: 'AbsoluteRelativeRace', title: 'Absolute/Relative Race', description: 'Identifikasi arti dari berbagai jenis referensi sel (mis. A$1).', icon: LinkIcon, color: 'bg-sky-100 text-sky-600', buttonColor: 'bg-sky-500 hover:bg-sky-600' },
  { id: 'SparklineSpeedster', title: 'Sparkline Speedster', description: 'Pilih jenis sparkline yang tepat untuk visualisasi data.', icon: ChartBarSquareIcon, color: 'bg-purple-100 text-purple-600', buttonColor: 'bg-purple-500 hover:bg-purple-600' },
] as const;


export const MiniGameArcade: React.FC<MiniGameArcadeProps> = ({ user, levelCompletion, onStartGame, onBack }) => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Arcade Mode</h2>
          <p className="text-slate-600 mt-1">Latih skill Excel-mu dengan koleksi mini-game seru ini!</p>
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
        {gameData.map((game) => {
          const isUnlocked = true; // All games are now unlocked

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
                {game.description}
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
