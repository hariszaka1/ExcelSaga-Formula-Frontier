import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUturnLeftIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

const scenarios = [
  { start: 'Jan', answer: 'Feb' },
  { start: '1', answer: '2' },
  { start: 'Senin', answer: 'Selasa' },
  { start: 'Produk 1', answer: 'Produk 2' },
  { start: 'Q1', answer: 'Q2' },
  { start: '01/01/2024', answer: '02/01/2024' },
  { start: 'Week 1', answer: 'Week 2' },
  { start: '5', answer: '6' },
];

const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

export const FillHandleFrenzy: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [gameScenarios, setGameScenarios] = useState(shuffleArray(scenarios));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);

  const currentScenario = gameScenarios[currentIndex];
  const isGameFinished = currentIndex >= gameScenarios.length;

  const handleSubmit = useCallback((e?: React.FormEvent) => {
    e?.preventDefault();
    if (isAnswered || !userInput) return;

    setIsAnswered(true);
    if (userInput.toLowerCase() === currentScenario.answer.toLowerCase()) {
      setScore(prev => prev + 1);
      setFeedback('Tepat sekali!');
    } else {
      setFeedback(`Kurang tepat. Jawaban yang benar adalah "${currentScenario.answer}".`);
    }

    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setUserInput('');
      setIsAnswered(false);
      setFeedback('');
    }, 2000);
  }, [userInput, currentScenario, isAnswered]);
  
  const resetGame = useCallback(() => {
    setGameScenarios(shuffleArray(scenarios));
    setCurrentIndex(0);
    setScore(0);
    setUserInput('');
    setFeedback('');
    setIsAnswered(false);
  }, []);

  if (isGameFinished) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200 text-center">
        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto animate-bounce" />
        <h2 className="text-2xl font-bold text-slate-800 mt-4">Selesai!</h2>
        <p className="text-slate-600 mt-2">Skor akhir Anda:</p>
        <p className="text-6xl font-bold text-rose-600 my-4">{score}/{gameScenarios.length}</p>
        <div className="flex justify-center gap-4">
          <button onClick={resetGame} className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition">Main Lagi</button>
          <button onClick={onBack} className="px-6 py-2 bg-slate-200 text-slate-800 font-bold rounded-lg shadow-sm hover:bg-slate-300 transition">Kembali</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-2xl font-bold text-slate-800">Fill Handle Frenzy</h2>
        <button onClick={onBack} className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 bg-slate-200 text-slate-700 text-sm font-semibold rounded-md hover:bg-slate-300 transition-colors">
          <ArrowUturnLeftIcon className="w-5 h-5" />
          Kembali
        </button>
      </div>
      <div className="flex justify-between items-baseline mb-4">
        <p className="text-slate-500">Pertanyaan {currentIndex + 1} dari {gameScenarios.length}</p>
        <p className="font-bold text-slate-700">Skor: {score}</p>
      </div>

      <p className="text-slate-700 mb-4">Jika Anda mengetik nilai di bawah ini lalu menarik fill handle ke bawah, apa nilai berikutnya?</p>
      
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="p-3 border-2 border-slate-400 rounded-md text-center bg-slate-50 relative w-28">
            <p className="font-mono text-lg font-bold text-slate-800">{currentScenario.start}</p>
            <div className="absolute -right-[4px] -bottom-[4px] w-2 h-2 bg-slate-700 border-2 border-white cursor-ns-resize"></div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
        </svg>
        <div className="p-3 border-2 border-slate-400 border-dashed rounded-md text-center w-28">
            <p className="font-mono text-lg font-bold text-slate-400">?</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={isAnswered}
          placeholder="Ketik jawabanmu..."
          className="w-full p-3 bg-white border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 transition font-mono text-center"
          autoFocus
        />
      </form>

      {feedback && (
        <p className={`mt-4 text-center font-semibold ${feedback.includes('Tepat') ? 'text-green-600' : 'text-red-600'}`}>
          {feedback}
        </p>
      )}
    </div>
  );
};
