import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowUturnLeftIcon, ClockIcon, StarIcon } from '@heroicons/react/24/solid';

const GRID_SIZE = 10;
const GAME_DURATION = 30; // seconds

type GameStatus = 'ready' | 'playing' | 'finished';

const toColName = (col: number): string => String.fromCharCode(65 + col);
const toA1 = (row: number, col: number): string => `${toColName(col)}${row + 1}`;

export const CellFinder: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [gameStatus, setGameStatus] = useState<GameStatus>('ready');
  const [targetCell, setTargetCell] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const timerRef = useRef<number | null>(null);

  const generateNewTarget = useCallback(() => {
    const row = Math.floor(Math.random() * GRID_SIZE);
    const col = Math.floor(Math.random() * GRID_SIZE);
    setTargetCell(toA1(row, col));
  }, []);

  const startGame = useCallback(() => {
    setGameStatus('playing');
    setScore(0);
    setTimeLeft(GAME_DURATION);
    generateNewTarget();
  }, [generateNewTarget]);

  useEffect(() => {
    if (gameStatus !== 'playing') {
      return;
    }

    timerRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setGameStatus('finished');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [gameStatus]);

  const handleCellClick = (row: number, col: number) => {
    if (gameStatus !== 'playing') return;
    if (toA1(row, col) === targetCell) {
      setScore(prev => prev + 1);
      generateNewTarget();
    }
  };

  const resetGame = () => {
    setGameStatus('ready');
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setTargetCell('');
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const renderGrid = () => (
    <div className="overflow-x-auto">
      <table className="border-collapse">
        <thead>
          <tr>
            <th className="p-1 border border-slate-300 bg-slate-200 w-8 h-8"></th>
            {Array.from({ length: GRID_SIZE }).map((_, colIndex) => (
              <th key={colIndex} className="p-1 border border-slate-300 bg-slate-200 text-slate-600 font-semibold w-8 h-8 text-xs sm:w-10 sm:h-10 sm:text-sm">
                {toColName(colIndex)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: GRID_SIZE }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              <th className="p-1 border border-slate-300 bg-slate-200 text-slate-600 font-semibold w-8 h-8 text-xs sm:w-10 sm:h-10 sm:text-sm">
                {rowIndex + 1}
              </th>
              {Array.from({ length: GRID_SIZE }).map((_, colIndex) => (
                <td
                  key={colIndex}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  className="p-1 border border-slate-200 w-8 h-8 text-xs sm:w-10 sm:h-10 hover:bg-green-100 cursor-pointer transition-colors"
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-slate-800">Cell Finder</h2>
        <button onClick={onBack} className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 bg-slate-200 text-slate-700 text-sm font-semibold rounded-md hover:bg-slate-300 transition-colors">
          <ArrowUturnLeftIcon className="w-5 h-5" />
          Kembali ke Arcade
        </button>
      </div>

      {gameStatus === 'ready' && (
        <div className="text-center">
          <p className="text-slate-600 mb-6">Temukan sel yang ditargetkan secepat mungkin dalam {GAME_DURATION} detik. Siap?</p>
          <button onClick={startGame} className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition">Mulai Game</button>
        </div>
      )}

      {gameStatus === 'playing' && (
        <div>
          <div className="flex justify-between items-center mb-4 p-4 bg-slate-100 rounded-lg">
            <div className="text-center">
              <p className="text-2xl font-bold text-sky-600">{targetCell}</p>
              <p className="text-sm text-slate-500 font-semibold">Temukan Sel Ini</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-700 flex items-center gap-1"><StarIcon className="w-6 h-6 text-yellow-500"/>{score}</p>
              <p className="text-sm text-slate-500 font-semibold">Skor</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600 flex items-center gap-1"><ClockIcon className="w-6 h-6"/>{timeLeft}</p>
              <p className="text-sm text-slate-500 font-semibold">Sisa Waktu</p>
            </div>
          </div>
          {renderGrid()}
        </div>
      )}

      {gameStatus === 'finished' && (
         <div className="text-center">
          <h3 className="text-xl font-bold text-green-700">Waktu Habis!</h3>
          <p className="text-slate-600 mt-2">Skor akhirmu adalah:</p>
          <p className="text-6xl font-bold text-sky-600 my-4">{score}</p>
          <button onClick={resetGame} className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition">Main Lagi</button>
        </div>
      )}
    </div>
  );
};