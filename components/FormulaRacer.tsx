import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowUturnLeftIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

const formulas = [
  '=VLOOKUP(A2,Sheet2!A:B,2,FALSE)',
  '=SUMIFS(C:C,A:A,"Utara",B:B,">100")',
  '=INDEX(C3:C10,MATCH(G2,A3:A10,0))',
  '=IF(ISERROR(FIND("Excel",A1)),"Not Found","Found")',
  '=TEXT(TODAY(),"dddd, dd mmmm yyyy")',
  '=SUMPRODUCT(--(MONTH(A2:A100)=1),B2:B100)',
  '=LEFT(B2,FIND(" ",B2)-1)',
  '=IF(AND(B2>50,C2="Yes"),"Pass","Fail")',
  '=XLOOKUP(A1,Products!A:A,Products!C:C,"Not Found",0)',
  '=FILTER(A2:D100,C2:C100>5000)',
];

type GameStatus = 'ready' | 'playing' | 'finished';

export const FormulaRacer: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [gameStatus, setGameStatus] = useState<GameStatus>('ready');
  const [currentFormula, setCurrentFormula] = useState('');
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState<{ wpm: number; accuracy: number } | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getNextFormula = useCallback(() => {
    const availableFormulas = formulas.filter(f => f !== currentFormula);
    return availableFormulas[Math.floor(Math.random() * availableFormulas.length)];
  }, [currentFormula]);

  const startGame = useCallback(() => {
    setCurrentFormula(getNextFormula());
    setGameStatus('playing');
    setUserInput('');
    setResult(null);
    startTimeRef.current = Date.now();
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [getNextFormula]);

  useEffect(() => {
    if (gameStatus === 'ready') {
      startGame();
    }
  }, [gameStatus, startGame]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gameStatus !== 'playing') return;
    setUserInput(e.target.value);

    if (e.target.value.length >= currentFormula.length) {
      endGame(e.target.value);
    }
  };
  
  const endGame = (finalInput: string) => {
    if (!startTimeRef.current) return;

    const endTime = Date.now();
    const elapsedTimeSeconds = (endTime - startTimeRef.current) / 1000;
    const words = finalInput.length / 5;
    const wpm = Math.round((words / elapsedTimeSeconds) * 60);

    let correctChars = 0;
    for (let i = 0; i < finalInput.length; i++) {
      if (finalInput[i] === currentFormula[i]) {
        correctChars++;
      }
    }
    const accuracy = (correctChars / currentFormula.length) * 100;
    
    setResult({ wpm, accuracy });
    setGameStatus('finished');
  }

  const renderFormulaPreview = () => {
    return currentFormula.split('').map((char, index) => {
      let colorClass = 'text-slate-400';
      if (index < userInput.length) {
        colorClass = char === userInput[index] ? 'text-green-500' : 'text-red-500 bg-red-100';
      }
      return <span key={index} className={colorClass}>{char}</span>;
    });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-slate-800">Formula Racer</h2>
        <button onClick={onBack} className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 bg-slate-200 text-slate-700 text-sm font-semibold rounded-md hover:bg-slate-300 transition-colors">
          <ArrowUturnLeftIcon className="w-5 h-5" />
          Kembali ke Arcade
        </button>
      </div>
      <p className="text-slate-600 mb-6">Ketik formula di bawah ini secepat mungkin. Tekan Enter atau selesaikan pengetikan untuk melihat hasilnya.</p>
      
      <div className="p-4 bg-slate-800 text-white rounded-lg font-mono text-lg break-all mb-4">
        {gameStatus === 'playing' ? renderFormulaPreview() : currentFormula}
      </div>

      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={handleInputChange}
        onKeyDown={(e) => { if (e.key === 'Enter') endGame(userInput); }}
        disabled={gameStatus !== 'playing'}
        className="w-full p-3 bg-white border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 transition font-mono"
        placeholder="Mulai mengetik di sini..."
      />

      {gameStatus === 'finished' && result && (
        <div className="mt-6 text-center bg-green-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-green-700 flex items-center justify-center gap-2">
            <CheckCircleIcon className="w-7 h-7"/>
            Selesai!
          </h3>
          <div className="flex justify-around mt-4">
            <div>
              <p className="text-3xl font-bold text-green-600">{result.wpm}</p>
              <p className="text-sm text-slate-600">Kata Per Menit</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">{result.accuracy.toFixed(1)}%</p>
              <p className="text-sm text-slate-600">Akurasi</p>
            </div>
          </div>
          <button
            onClick={() => setGameStatus('ready')}
            className="mt-6 px-6 py-2 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Main Lagi
          </button>
        </div>
      )}
    </div>
  );
};
