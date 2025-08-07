import React from 'react';
import { Mascot } from './Mascot';
import { MascotState } from '../types';
import { ArrowRightIcon, HomeIcon, LightBulbIcon, KeyIcon } from '@heroicons/react/24/solid';

interface ActionPanelProps {
    mascotState: MascotState;
    hint: string;
    isAnsweredCorrectly: boolean;
    isOverallLevelCompleted: boolean;
    showAnswer: boolean;
    onGetHint: () => void;
    onToggleAnswer: () => void;
    onNextLevel: () => void;
    onBackToLevelSelection: () => void;
}

export const ActionPanel: React.FC<ActionPanelProps> = ({
    mascotState,
    hint,
    isAnsweredCorrectly,
    isOverallLevelCompleted,
    showAnswer,
    onGetHint,
    onToggleAnswer,
    onNextLevel,
    onBackToLevelSelection,
}) => {
    return (
        <aside className="w-full lg:w-1/4 flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 flex flex-col items-center justify-center">
                <Mascot state={mascotState} />
                <p className="mt-2 text-sm text-slate-500 font-semibold capitalize">{mascotState}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 flex flex-col gap-3">
                <button 
                    onClick={onGetHint} 
                    disabled={!!hint || isAnsweredCorrectly} 
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-yellow-400 text-yellow-900 font-bold rounded-lg shadow-md hover:bg-yellow-500 transition disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                    <LightBulbIcon className="w-5 h-5" />
                    Petunjuk
                </button>
                <button onClick={onToggleAnswer} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-amber-400 text-amber-900 font-bold rounded-lg shadow-md hover:bg-amber-500 transition">
                    <KeyIcon className="w-5 h-5" />
                    {showAnswer ? 'Sembunyikan Jawaban' : 'Lihat Jawaban'}
                </button>
                <button onClick={onNextLevel} disabled={!isOverallLevelCompleted} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition disabled:bg-slate-400 disabled:cursor-not-allowed">
                    Lanjut ke Level Berikutnya <ArrowRightIcon className="w-5 h-5" />
                </button>
                <button onClick={onBackToLevelSelection} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-500 text-white font-bold rounded-lg shadow-md hover:bg-slate-600 transition">
                    <HomeIcon className="w-5 h-5" />
                    Kembali ke Menu
                </button>
            </div>
        </aside>
    );
};