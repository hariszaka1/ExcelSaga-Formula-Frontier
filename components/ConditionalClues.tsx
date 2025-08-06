import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';

const generateGrid = (size: number) => Array.from({ length: size }, () => Array.from({ length: size }, () => Math.floor(Math.random() * 99) + 1));

const scenarios = [
  { rule: '> 50', description: 'Lebih besar dari 50', check: (val: number) => val > 50 },
  { rule: '< 20', description: 'Lebih kecil dari 20', check: (val: number) => val < 20 },
  { rule: 'Genap', description: 'Angka genap', check: (val: number) => val % 2 === 0 },
  { rule: 'Ganjil', description: 'Angka ganjil', check: (val: number) => val % 2 !== 0 },
  { rule: 'antara 30-60', description: 'Antara 30 dan 60', check: (val: number) => val >= 30 && val <= 60 },
];

const GRID_SIZE = 5;

export const ConditionalClues: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [grid, setGrid] = useState<number[][]>([]);
  const [scenario, setScenario] = useState(scenarios[0]);
  const [selectedCells, setSelectedCells] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [round, setRound] = useState(0);

  const setupRound = useCallback(() => {
    setGrid(generateGrid(GRID_SIZE));
    setScenario(scenarios[Math.floor(Math.random() * scenarios.length)]);
    setSelectedCells([]);
    setFeedback('');
    setIsAnswered(false);
    setRound(prev => prev + 1);
  }, []);
  
  useEffect(() => {
    setupRound();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCellClick = (row: number, col: number) => {
    if (isAnswered) return;
    const cellId = `${row}-${col}`;
    setSelectedCells(prev => 
      prev.includes(cellId) ? prev.filter(id => id !== cellId) : [...prev, cellId]
    );
  };

  const checkAnswer = () => {
    const correctCells = new Set<string>();
    grid.forEach((row, rIdx) => {
      row.forEach((val, cIdx) => {
        if (scenario.check(val)) {
          correctCells.add(`${rIdx}-${cIdx}`);
        }
      });
    });

    const selectedSet = new Set(selectedCells);
    const isCorrect = selectedSet.size === correctCells.size && [...selectedSet].every(id => correctCells.has(id));

    setIsAnswered(true);
    if (isCorrect) {
      setFeedback('Sempurna! Semua sel benar.');
      setScore(prev => prev + 1);
    } else {
      setFeedback('Hampir benar. Coba lagi di ronde berikutnya.');
    }
    
    setTimeout(setupRound, 3000);
  };
  
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-2xl font-bold text-slate-800">Conditional Clues</h2>
        <button onClick={onBack} className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 bg-slate-200 text-slate-700 text-sm font-semibold rounded-md hover:bg-slate-300 transition-colors">
          <ArrowUturnLeftIcon className="w-5 h-5" /> Kembali
        </button>
      </div>
       <div className="flex justify-between items-baseline mb-4">
        <p className="text-slate-500">Ronde {round}</p>
        <p className="font-bold text-slate-700">Skor: {score}</p>
      </div>

      <div className="p-3 bg-slate-100 rounded-lg text-center mb-4">
        <p className="text-slate-700">Klik semua sel yang memenuhi aturan:</p>
        <p className="text-lg font-bold text-purple-600">"{scenario.description}"</p>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-5 gap-1">
          {grid.map((row, rIdx) => (
            row.map((val, cIdx) => {
              const cellId = `${rIdx}-${cIdx}`;
              const isSelected = selectedCells.includes(cellId);
              let cellStyle = 'bg-white hover:bg-purple-100';
              if (isSelected) cellStyle = 'bg-purple-300 ring-2 ring-purple-500';
              if (isAnswered) {
                  const isCorrect = scenario.check(val);
                  if (isSelected && isCorrect) cellStyle = 'bg-green-300';
                  else if (isSelected && !isCorrect) cellStyle = 'bg-red-300';
                  else if (!isSelected && isCorrect) cellStyle = 'bg-yellow-200 ring-1 ring-yellow-400';
                  else cellStyle = 'bg-slate-100';
              }

              return (
              <button
                key={cellId}
                onClick={() => handleCellClick(rIdx, cIdx)}
                className={`w-12 h-12 flex items-center justify-center border border-slate-200 rounded-md font-mono font-bold text-slate-800 transition-all ${cellStyle}`}
                disabled={isAnswered}
              >
                {val}
              </button>
            )})
          ))}
        </div>
      </div>
      
      <div className="mt-6 text-center">
          <button onClick={checkAnswer} disabled={isAnswered} className="w-full px-6 py-3 bg-purple-500 text-white font-bold rounded-lg shadow-md hover:bg-purple-600 transition disabled:bg-slate-400">
              Periksa Jawaban
          </button>
          {feedback && <p className="mt-2 font-semibold text-center">{feedback}</p>}
      </div>
    </div>
  );
};
