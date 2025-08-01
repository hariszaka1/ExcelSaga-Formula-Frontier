
import React, { useState, useEffect, useCallback } from 'react';
import { levelData } from '../constants';
import type { Level, LevelCompletionStatus } from '../types';
import { MascotState } from '../types';
import { Sidebar } from './Sidebar';
import { Mascot } from './Mascot';
import { ArrowPathIcon, ArrowRightIcon, HomeIcon, CheckIcon, LightBulbIcon, KeyIcon } from '@heroicons/react/24/solid';

// Simple text formatter
const renderExplanation = (text: string) => {
    const html = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/`([^`]+)`/g, '<code class="bg-slate-200 text-slate-800 px-1 rounded font-mono">$1</code>') // Inline code
      .replace(/\n/g, '<br />');
    
    return { __html: html };
};


interface GameViewProps {
  levelIndex: number;
  onLevelComplete: (levelIndex: number) => void;
  onBackToLevelSelection: () => void;
  onNextLevel: () => void;
  levelCompletion: LevelCompletionStatus;
  onSelectLevel: (levelIndex: number) => void;
}

const normalizeAnswer = (answer: string): string => {
    if (typeof answer !== 'string') return '';
    // This normalization is designed to be forgiving for user input in formulas.
    // It converts to lowercase, standardizes function separators to commas,
    // and removes spaces outside of double quotes to handle variations in user typing.
    let inQuotes = false;
    let result = '';
    for (const char of answer) {
        if (char === '"') {
            inQuotes = !inQuotes;
        }
        // Remove spaces only if they are outside of quoted strings
        if (!inQuotes && char === ' ') {
            continue;
        }
        // Standardize list separators to commas, only outside of quoted strings
        if (!inQuotes && char === ';') {
            result += ',';
            continue;
        }
        result += char;
    }
    return result.toLowerCase();
};

export const GameView: React.FC<GameViewProps> = ({
  levelIndex,
  onLevelComplete,
  onBackToLevelSelection,
  onNextLevel,
  levelCompletion,
  onSelectLevel
}) => {
  const level = levelData[levelIndex];
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [hint, setHint] = useState('');
  const [mascotState, setMascotState] = useState<MascotState>(MascotState.Idle);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setUserAnswer('');
    setFeedback('');
    setHint('');
    setMascotState(MascotState.Idle);
    setShowAnswer(false);
  }, [levelIndex]);

  const isCompleted = levelCompletion[levelIndex];
  
  const handleCheckAnswer = () => {
    const normalizedUserAnswer = normalizeAnswer(userAnswer);
    const { correctValue } = level.answer;

    const isCorrect = Array.isArray(correctValue)
      ? correctValue.some(val => normalizeAnswer(val) === normalizedUserAnswer)
      : normalizeAnswer(correctValue) === normalizedUserAnswer;
    
    if (isCorrect) {
      setFeedback('Jawaban Benar! Kerja bagus!');
      setMascotState(MascotState.Celebrating);
      onLevelComplete(levelIndex);
      setTimeout(() => setMascotState(MascotState.Idle), 3000);
    } else {
      setFeedback('Jawaban kurang tepat. Coba lagi!');
      setMascotState(MascotState.Incorrect);
      setTimeout(() => setMascotState(MascotState.Idle), 2000);
    }
  };

  const handleGetHint = useCallback(() => {
    setHint(level.hint);
  }, [level.hint]);

  const handleToggleAnswer = () => {
    setShowAnswer(prev => !prev);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
      <Sidebar 
        levels={levelData} 
        currentLevelIndex={levelIndex} 
        completionStatus={levelCompletion}
        onSelectLevel={onSelectLevel}
      />

      <main className="flex-grow bg-white rounded-2xl shadow-lg border border-slate-200 p-6 w-full lg:w-2/3">
        <header className="mb-4">
          <p className="text-sm font-semibold text-green-600">Level {level.id}</p>
          <h2 className="text-3xl font-bold text-slate-800">{level.title}</h2>
        </header>
        
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4">
          <p className="text-slate-700">{level.challenge}</p>
        </div>

        <div className="my-6 overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-600 border-collapse">
            <thead>
              <tr>
                {/* Top-left empty corner cell */}
                <th scope="col" className="p-2 border border-slate-300 bg-slate-200 sticky left-0 top-0 z-20 w-12"></th>
                
                {/* Column letters (A, B, C...) */}
                {level.table.headers.map((_, colIndex) => (
                  <th key={colIndex} scope="col" className="px-4 py-2 border border-slate-300 text-center font-semibold text-slate-500 bg-slate-200 sticky top-0 z-10 min-w-[100px]">
                    {String.fromCharCode(65 + colIndex)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Data headers row (Row 1) */}
              <tr className="bg-green-100">
                <th scope="row" className="px-4 py-3 border border-slate-300 text-center font-semibold text-slate-500 bg-slate-200 sticky left-0 z-10">1</th>
                {level.table.headers.map((header, i) => (
                  <td key={i} className="px-4 py-3 border border-green-200 text-green-800 uppercase font-bold text-xs">
                    {header}
                  </td>
                ))}
              </tr>
              
              {/* Data rows (Row 2, 3, 4...) */}
              {level.table.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="bg-white even:bg-green-50/50">
                  <th scope="row" className="px-4 py-3 border border-slate-300 text-center font-semibold text-slate-500 bg-slate-200 sticky left-0 z-10">{rowIndex + 2}</th>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-3 border border-slate-200">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <label htmlFor="answer-input" className="block text-lg font-semibold mb-2 text-slate-700">Masukkan Jawabanmu:</label>
          <div className="flex flex-col sm:flex-row gap-4">
             {level.answer.type === 'dropdown' ? (
                <select 
                    id="answer-input"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="flex-grow p-3 bg-slate-800 text-white border-2 border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                >
                    <option value="" className="text-slate-400">Pilih Kategori</option>
                    {level.answer.options?.map(opt => <option key={opt} value={opt} className="bg-slate-800 text-white">{opt}</option>)}
                </select>
             ) : (
                <input
                    id="answer-input"
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder={level.answer.type === 'formula' ? 'Contoh: =SUM(A1:B1)' : 'Ketik jawabanmu...'}
                    className="flex-grow p-3 bg-slate-800 text-white border-2 border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition font-mono placeholder-slate-400"
                />
             )}
            <button onClick={handleCheckAnswer} disabled={isCompleted || !userAnswer} className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition disabled:bg-slate-400 disabled:cursor-not-allowed">
                <CheckIcon className="w-5 h-5" />
                Periksa Jawaban
            </button>
          </div>
        </div>

        {feedback && (
          <div className={`mt-4 p-3 rounded-lg text-center font-semibold ${isCompleted ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {feedback}
          </div>
        )}

        {isCompleted && level.explanation && (
            <div className="mt-4 p-4 rounded-lg bg-blue-50 border border-blue-200 text-blue-900">
                 <h4 className="font-bold text-blue-900 mb-2">Penjelasan Jawaban:</h4>
                 <div className="text-sm space-y-2" dangerouslySetInnerHTML={renderExplanation(level.explanation)} />
            </div>
        )}

        {showAnswer && (
          <div className="mt-4 p-4 rounded-lg bg-sky-100 border border-sky-200 text-sky-800">
            <p className="font-bold mb-1">Jawaban yang Benar:</p>
            <code className="block bg-sky-200 p-2 rounded text-sm font-mono break-words">
              {Array.isArray(level.answer.correctValue) ? level.answer.correctValue[0] : level.answer.correctValue}
            </code>
            {Array.isArray(level.answer.correctValue) && level.answer.correctValue.length > 1 && (
              <>
                <p className="font-bold mt-2 text-xs">Alternatif lain yang valid:</p>
                <ul className="list-disc list-inside text-xs mt-1 space-y-1">
                  {level.answer.correctValue.slice(1).map((alt, index) => (
                    <li key={index}>
                      <code className="font-mono bg-sky-200/50 px-1 py-0.5 rounded">{alt}</code>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

         {hint && (
          <div className="mt-4 p-4 rounded-lg bg-yellow-100 border border-yellow-200 text-yellow-800">
            <p className="font-bold mb-1">Petunjuk:</p>
            <p>{hint}</p>
          </div>
        )}

      </main>

      <aside className="w-full lg:w-1/4 flex flex-col gap-6">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 flex flex-col items-center justify-center">
            <Mascot state={mascotState} />
            <p className="mt-2 text-sm text-slate-500 font-semibold capitalize">{mascotState}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 flex flex-col gap-3">
           <button onClick={handleGetHint} disabled={isCompleted || !!hint} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-yellow-400 text-yellow-900 font-bold rounded-lg shadow-md hover:bg-yellow-500 transition disabled:bg-slate-400 disabled:cursor-not-allowed">
                <LightBulbIcon className="w-5 h-5"/>
                Petunjuk
            </button>
            <button onClick={handleToggleAnswer} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-amber-400 text-amber-900 font-bold rounded-lg shadow-md hover:bg-amber-500 transition">
                <KeyIcon className="w-5 h-5"/>
                {showAnswer ? 'Sembunyikan Jawaban' : 'Lihat Jawaban'}
            </button>
            <button onClick={onNextLevel} disabled={!isCompleted} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition disabled:bg-slate-400 disabled:cursor-not-allowed">
                Lanjut ke Level Berikutnya <ArrowRightIcon className="w-5 h-5"/>
            </button>
            <button onClick={onBackToLevelSelection} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-500 text-white font-bold rounded-lg shadow-md hover:bg-slate-600 transition">
                <HomeIcon className="w-5 h-5"/>
                Kembali ke Menu
            </button>
        </div>
      </aside>
    </div>
  );
};