import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUturnLeftIcon, CheckCircleIcon, ComputerDesktopIcon } from '@heroicons/react/24/solid';

const GRID_ROWS = 7;
const GRID_COLS = 3;

// Helper to create an empty grid
const createEmptyGrid = () => Array.from({ length: GRID_ROWS }, () => Array.from({ length: GRID_COLS }, () => ''));

// New scenario structure for the simulation
const scenarios = [
  {
    initialGrid: [[5]],
    selection: { start: { r: 0, c: 0 }, end: { r: 0, c: 0 } },
    fillTarget: { start: { r: 1, c: 0 }, end: { r: 3, c: 0 } },
    question: 'Jika Anda menarik fill handle ke bawah hingga baris 4, apa isi sel A2, A3, dan A4?',
    options: [
      ['5', '5', '5'],
      ['6', '7', '8'],
      ['5', '10', '15'],
      ['', '', '']
    ],
    answer: ['5', '5', '5'],
    description: 'Saat menarik satu angka saja (tanpa menahan Ctrl), Excel akan menyalinnya (Copy Cells).'
  },
  {
    initialGrid: [[5]],
    selection: { start: { r: 0, c: 0 }, end: { r: 0, c: 0 } },
    fillTarget: { start: { r: 1, c: 0 }, end: { r: 3, c: 0 } },
    withCtrl: true,
    question: 'Jika Anda menarik fill handle ke bawah hingga baris 4 SAMBIL MENAHAN CTRL, apa isi sel A2, A3, dan A4?',
    options: [
      ['6', '7', '8'],
      ['5', '5', '5'],
      ['', '', ''],
      ['10', '15', '20']
    ],
    answer: ['6', '7', '8'],
    description: 'Saat menarik satu angka sambil menahan tombol Ctrl, Excel akan membuat seri (Fill Series), menaikkan nilainya satu per satu.'
  },
  {
    initialGrid: [['Jan'], ['Mar']],
    selection: { start: { r: 0, c: 0 }, end: { r: 1, c: 0 } },
    fillTarget: { start: { r: 2, c: 0 }, end: { r: 3, c: 0 } },
    question: 'Jika Anda memilih A1:A2 lalu menarik fill handle ke A4, apa isi sel A3 dan A4?',
    options: [
      ['Mei', 'Jul'],
      ['Apr', 'Mei'],
      ['Feb', 'Mar'],
      ['Jan', 'Mar']
    ],
    answer: ['Mei', 'Jul'],
    description: 'Dengan memilih dua item seri (Jan, Mar), Excel mendeteksi pola "langkah 2 bulan" dan melanjutkannya.'
  },
  {
    initialGrid: [['Produk 1']],
    selection: { start: { r: 0, c: 0 }, end: { r: 0, c: 0 } },
    fillTarget: { start: { r: 1, c: 0 }, end: { r: 2, c: 0 } },
    question: 'Jika Anda menarik fill handle dari sel A1 ke A3, apa isi sel A2 dan A3?',
    options: [
      ['Produk 2', 'Produk 3'],
      ['Produk 1', 'Produk 1'],
      ['Produk', 'Produk'],
      ['2', '3']
    ],
    answer: ['Produk 2', 'Produk 3'],
    description: 'Excel mengidentifikasi pola teks dan angka di akhir, lalu menaikkan angkanya.'
  },
   {
    initialGrid: [[10], [20]],
    selection: { start: { r: 0, c: 0 }, end: { r: 1, c: 0 } },
    fillTarget: { start: { r: 2, c: 0 }, end: { r: 3, c: 0 } },
    question: 'Jika Anda memilih A1:A2 lalu menarik fill handle ke A4, apa isi sel A3 dan A4?',
    options: [
      ['30', '40'],
      ['20', '20'],
      ['25', '30'],
      ['10', '20']
    ],
    answer: ['30', '40'],
    description: 'Dengan memilih dua angka, Excel akan membuat tren linear (dalam hal ini, tambah 10) dan melanjutkannya.'
  }
];

const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

const toColName = (col: number): string => String.fromCharCode(65 + col);

const isCellInRange = (
    cellR: number, cellC: number,
    start: { r: number; c: number },
    end: { r: number; c: number }
): boolean => {
    const minR = Math.min(start.r, end.r);
    const maxR = Math.max(start.r, end.r);
    const minC = Math.min(start.c, end.c);
    const maxC = Math.max(start.c, end.c);
    return cellR >= minR && cellR <= maxR && cellC >= minC && cellC <= maxC;
};

export const FillHandleFrenzy: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [gameScenarios, setGameScenarios] = useState(shuffleArray(scenarios));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [gridState, setGridState] = useState(createEmptyGrid());
  const [fillResult, setFillResult] = useState<{isCorrect: boolean, cells: {r: number, c: number}[]} | null>(null);

  const currentScenario = gameScenarios[currentIndex];
  const isGameFinished = currentIndex >= gameScenarios.length;

  const setupRound = useCallback(() => {
    if (!currentScenario) return;
    const newGrid = createEmptyGrid();
    currentScenario.initialGrid.forEach((row, r) => {
        row.forEach((val, c) => {
            if (newGrid[r] && newGrid[r][c] !== undefined) {
                newGrid[r][c] = String(val);
            }
        });
    });
    setGridState(newGrid);
    setFeedback('');
    setIsAnswered(false);
    setFillResult(null);
  }, [currentScenario]);

  useEffect(() => {
    if(!isGameFinished) {
        setupRound();
    }
  }, [isGameFinished, setupRound]);
  
  const handleAnswer = (chosenOption: (string|number)[]) => {
    if (isAnswered) return;
    setIsAnswered(true);

    const isCorrect = JSON.stringify(chosenOption) === JSON.stringify(currentScenario.answer);
    
    const newGrid = [...gridState.map(row => [...row])];
    const filledCells: {r: number, c: number}[] = [];
    let optionIndex = 0;
    for (let r = currentScenario.fillTarget.start.r; r <= currentScenario.fillTarget.end.r; r++) {
        for (let c = currentScenario.fillTarget.start.c; c <= currentScenario.fillTarget.end.c; c++) {
            if (newGrid[r] && newGrid[r][c] !== undefined) {
                newGrid[r][c] = String(chosenOption[optionIndex++] ?? '');
                filledCells.push({r, c});
            }
        }
    }
    setGridState(newGrid);
    setFillResult({ isCorrect, cells: filledCells });

    if (isCorrect) {
        setScore(prev => prev + 1);
        setFeedback(`Tepat sekali! ${currentScenario.description}`);
    } else {
        setFeedback(`Kurang tepat. Jawaban yang benar adalah "${currentScenario.answer.join(', ')}". ${currentScenario.description}`);
    }
    
    setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
    }, 4000);
  };
  
  const resetGame = useCallback(() => {
    setGameScenarios(shuffleArray(scenarios));
    setCurrentIndex(0);
    setScore(0);
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
    <div className="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200">
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Fill Handle Frenzy</h2>
        <button onClick={onBack} className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 bg-slate-200 text-slate-700 text-sm font-semibold rounded-md hover:bg-slate-300 transition-colors">
          <ArrowUturnLeftIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Kembali</span>
        </button>
      </div>
       <div className="flex justify-between items-baseline mb-4">
        <p className="text-slate-500 text-sm">Pertanyaan {currentIndex + 1} dari {gameScenarios.length}</p>
        <p className="font-bold text-slate-700">Skor: {score}</p>
      </div>
      
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg mb-4 text-center">
        <p className="text-slate-800 font-semibold">{currentScenario.question}</p>
        {currentScenario.withCtrl && <p className="text-sm font-bold text-rose-600 flex items-center justify-center gap-2 mt-1"><ComputerDesktopIcon className="w-4 h-4"/> Anggap tombol CTRL sedang ditekan.</p>}
      </div>
      
      <div className="mb-4 flex justify-center overflow-x-auto">
        <table className="border-collapse">
            <thead>
                <tr>
                    <th className="p-1 border border-slate-300 bg-slate-200 w-8 h-8"></th>
                    {Array.from({ length: GRID_COLS }).map((_, c) => (
                        <th key={c} className="p-1 border border-slate-300 bg-slate-200 text-black font-semibold w-20 h-8 text-center">{toColName(c)}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {Array.from({ length: GRID_ROWS }).map((_, r) => (
                    <tr key={r}>
                        <th className="p-1 border border-slate-300 bg-slate-200 text-black font-semibold w-8 h-10 text-center">{r + 1}</th>
                        {Array.from({ length: GRID_COLS }).map((_, c) => {
                            const isSelected = isCellInRange(r, c, currentScenario.selection.start, currentScenario.selection.end);
                            const isFillHandle = r === currentScenario.selection.end.r && c === currentScenario.selection.end.c;
                            
                            const isFilledCell = fillResult?.cells.some(cell => cell.r === r && cell.c === c);
                            let fillClass = '';
                            if (isAnswered && isFilledCell) {
                                fillClass = fillResult?.isCorrect ? 'bg-green-100' : 'bg-red-100';
                            }
                            
                            return (
                                <td key={c} className={`p-1 border border-slate-200 w-20 h-10 text-center relative transition-colors ${isSelected ? 'ring-2 ring-green-600 ring-inset z-10' : ''} ${fillClass}`}>
                                    <span className="font-mono text-black">{gridState[r][c]}</span>
                                    {isSelected && isFillHandle && (
                                        <div className="absolute -right-[3px] -bottom-[3px] w-2 h-2 bg-green-600 border-2 border-white cursor-ns-resize"></div>
                                    )}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {currentScenario.options.map((opt, i) => (
            <button key={i} onClick={() => handleAnswer(opt)} disabled={isAnswered} className="p-3 rounded-lg border-2 border-slate-200 bg-white hover:border-rose-500 hover:bg-rose-50 transition-colors disabled:cursor-not-allowed font-semibold text-slate-700 text-center font-mono">
                {opt.join(', ')}
            </button>
        ))}
      </div>
      
      {feedback && (
        <div className={`p-3 rounded-lg text-center ${feedback.includes('Tepat') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            <p className="font-semibold">{feedback}</p>
        </div>
      )}

    </div>
  );
};