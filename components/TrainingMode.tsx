import React, { useState, useEffect, useCallback, useContext } from 'react';
import { generateRandomChallenge } from '../services/challengeGenerator';
import { geminiService } from '../services/geminiService';
import type { TrainingChallenge, AppSettings } from '../types';
import { SettingsContext } from '../App';
import { MascotState } from '../types';
import { Mascot } from './Mascot';
import { ArrowUturnLeftIcon, LightBulbIcon, ForwardIcon, CheckCircleIcon, XCircleIcon, BeakerIcon } from '@heroicons/react/24/solid';

const GRID_ROWS = 10;
const GRID_COLS = 6;

const formatNumber = (value: string | number, settings: AppSettings): string => {
    if (typeof value !== 'number') {
        return String(value);
    }

    const { numberFormat } = settings;
    const thousandsSeparator = numberFormat === 'us' ? ',' : '.';
    const decimalSeparator = numberFormat === 'us' ? '.' : ',';

    const parts = value.toString().split('.');
    let integerPart = parts[0];
    const decimalPart = parts[1];

    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);

    return decimalPart ? `${integerPart}${decimalSeparator}${decimalPart}` : integerPart;
};

const toColName = (col: number, settings: AppSettings): string => {
    if (settings.referenceStyle === 'R1C1') {
        return String(col + 1);
    }
    let s = '', t;
    while (col >= 0) {
      t = col % 26;
      s = String.fromCharCode(t + 65) + s;
      col = Math.floor(col / 26) - 1;
    }
    return s;
};

const toA1 = (r: number, c: number): string => `${toColName(c, { referenceStyle: 'A1' } as AppSettings)}${r + 1}`;

const renderExplanation = (text: string) => {
    if (!text) return { __html: '' };
    const html = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code class="bg-slate-200 text-slate-800 px-1 rounded font-mono">$1</code>')
      .replace(/\n/g, '<br />');
    
    return { __html: html };
};

const normalizeAnswer = (answer: string, separator: ',' | ';'): string => {
    if (typeof answer !== 'string') return '';
    let inQuotes = false;
    let result = '';
    const otherSeparator = separator === ';' ? ',' : ';';

    for (const char of answer) {
        if (char === '"') inQuotes = !inQuotes;
        if (!inQuotes && char === ' ') continue;
        if (!inQuotes && char === otherSeparator) {
            result += separator;
            continue;
        }
        result += char;
    }
    return result.toLowerCase();
};

interface TrainingModeProps {
  onBack: () => void;
}

export const TrainingMode: React.FC<TrainingModeProps> = ({ onBack }) => {
    const { settings } = useContext(SettingsContext);
    const [challenge, setChallenge] = useState<TrainingChallenge | null>(null);
    const [gridData, setGridData] = useState<(string|number)[][]>([]);
    const [cellStatus, setCellStatus] = useState<string[][]>([]); // 'correct', 'incorrect', ''
    const [selectedCell, setSelectedCell] = useState<{ r: number, c: number } | null>(null);
    const [formulaBarInput, setFormulaBarInput] = useState('');
    const [hint, setHint] = useState('');
    const [isHintLoading, setIsHintLoading] = useState(false);
    const [mascotState, setMascotState] = useState<MascotState>(MascotState.Idle);
    const [isCorrect, setIsCorrect] = useState(false);
    const [feedback, setFeedback] = useState('');

    const loadNewChallenge = useCallback(() => {
        const newChallenge = generateRandomChallenge();
        setChallenge(newChallenge);
        
        const newGrid: (string | number)[][] = Array.from({ length: GRID_ROWS }, () => Array.from({ length: GRID_COLS }, () => ''));
        const newStatusGrid = Array.from({ length: GRID_ROWS }, () => Array.from({ length: GRID_COLS }, () => ''));
        
        newChallenge.table.headers.forEach((header, c) => { newGrid[0][c] = header; });
        newChallenge.table.rows.forEach((row, r) => {
            row.forEach((cell, c) => { newGrid[r + 1][c] = cell; });
        });
        
        setGridData(newGrid);
        setCellStatus(newStatusGrid);
        setSelectedCell(null);
        setFormulaBarInput('');
        setHint('');
        setIsCorrect(false);
        setFeedback('');
        setMascotState(MascotState.Idle);
    }, []);

    useEffect(() => {
        loadNewChallenge();
    }, [loadNewChallenge]);

    const handleCellSelect = useCallback((r: number, c: number) => {
        if (isCorrect) return;
        setSelectedCell({ r, c });
        setFormulaBarInput(String(gridData[r][c] || ''));
    }, [isCorrect, gridData]);

    const handleFormulaBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormulaBarInput(e.target.value);
    };
    
    const handleCheckAnswer = useCallback((cell: {r: number, c: number}, submittedFormula: string) => {
        if (!challenge) return;
        
        const { targetCell, answer, correctResult } = challenge;
        const isTargetCell = cell.r === targetCell.r && cell.c === targetCell.c;

        if (!isTargetCell) {
            setFeedback(`Coba masukkan formula di sel ${toA1(targetCell.r, targetCell.c)}.`);
            setTimeout(() => setFeedback(''), 2500);
            return;
        }

        const normalizedUserAnswer = normalizeAnswer(submittedFormula, settings.formulaSeparator);
        const correctAnswers = (Array.isArray(answer.correctValue) ? answer.correctValue : [answer.correctValue])
            .map(val => normalizeAnswer(val, settings.formulaSeparator));
        
        const isAnswerCorrect = correctAnswers.includes(normalizedUserAnswer);
        
        const newStatusGrid = cellStatus.map(row => [...row]);
        const newGrid = gridData.map(row => [...row]);
        newGrid[cell.r][cell.c] = submittedFormula;

        if (isAnswerCorrect) {
            newGrid[cell.r][cell.c] = correctResult;
            newStatusGrid[cell.r][cell.c] = 'correct';
            setIsCorrect(true);
            setMascotState(MascotState.Celebrating);
            setFeedback('Benar! Hasilnya ditampilkan di sel.');
        } else {
            newStatusGrid[cell.r][cell.c] = 'incorrect';
            setMascotState(MascotState.Incorrect);
            setFeedback('Formula kurang tepat. Periksa kembali dan coba lagi.');
            setTimeout(() => {
                const resetStatus = cellStatus.map(row => [...row]);
                resetStatus[cell.r][cell.c] = '';
                setCellStatus(resetStatus);
            }, 2000);
        }
        setGridData(newGrid);
        setCellStatus(newStatusGrid);
    }, [challenge, cellStatus, gridData, settings.formulaSeparator]);

    const handleFormulaBarKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedCell) {
                handleCheckAnswer(selectedCell, formulaBarInput);
                const nextCell = { r: selectedCell.r + 1, c: selectedCell.c };
                if (nextCell.r < GRID_ROWS) {
                    handleCellSelect(nextCell.r, nextCell.c);
                }
            }
        } else if (e.key === 'Escape') {
            e.preventDefault();
            if(selectedCell) {
                setFormulaBarInput(String(gridData[selectedCell.r][selectedCell.c] || ''));
            }
        }
    }, [selectedCell, formulaBarInput, handleCheckAnswer, gridData, handleCellSelect]);

    const handleGetHint = useCallback(async () => {
        if (!challenge) return;
        setIsHintLoading(true);
        setMascotState(MascotState.Thinking);
        try {
            const aiHint = await geminiService.getAiHint(challenge.challenge, challenge.table);
            setHint(aiHint);
        } catch (error) {
            setHint("Maaf, terjadi kesalahan saat mengambil petunjuk.");
        } finally {
            setIsHintLoading(false);
            setMascotState(MascotState.Idle);
        }
    }, [challenge]);

    if (!challenge) {
        return <div className="text-center p-8">Memuat tantangan...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Mode Latihan: Simulasi</h2>
                    <p className="text-slate-600">Klik sel, ketik formula di formula bar, lalu tekan Enter.</p>
                </div>
                <button
                    onClick={onBack}
                    className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-colors"
                >
                    <ArrowUturnLeftIcon className="w-5 h-5" />
                    Kembali
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <main className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4">
                        <p className="text-slate-700 font-semibold">{challenge.challenge}</p>
                    </div>

                    {/* FORMULA BAR */}
                    <div className="flex items-center mb-2 font-mono text-sm">
                        <div className="w-20 p-2 text-center bg-slate-200 border border-slate-300 rounded-l-md text-slate-600">
                            {selectedCell ? toA1(selectedCell.r, selectedCell.c) : '...'}
                        </div>
                        <div className="relative flex-grow">
                             <BeakerIcon className="w-5 h-5 absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                             <input 
                                type="text"
                                value={formulaBarInput}
                                onChange={handleFormulaBarChange}
                                onKeyDown={handleFormulaBarKeyDown}
                                disabled={isCorrect}
                                placeholder={selectedCell ? `Ketik formula di sini (gunakan ${settings.formulaSeparator} sebagai pemisah)` : 'Pilih sebuah sel untuk memulai'}
                                className="w-full p-2 pl-8 border-t border-b border-r border-slate-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-slate-100"
                             />
                        </div>
                    </div>

                    {/* SIMULATED GRID */}
                    <div className="overflow-x-auto">
                        <table className="border-collapse">
                            <thead>
                                <tr>
                                    <th className="p-1 border border-slate-300 bg-slate-200 w-10 h-8"></th>
                                    {Array.from({ length: GRID_COLS }).map((_, c) => (
                                        <th key={c} className="p-1 border border-slate-300 bg-slate-200 text-black font-semibold w-24 h-8 text-center">{toColName(c, settings)}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from({ length: GRID_ROWS }).map((_, r) => (
                                    <tr key={r}>
                                        <th className="p-1 border border-slate-300 bg-slate-200 text-black font-semibold w-10 h-8 text-center">{r + 1}</th>
                                        {Array.from({ length: GRID_COLS }).map((_, c) => {
                                            const isSelected = selectedCell?.r === r && selectedCell?.c === c;
                                            const status = cellStatus[r]?.[c] || '';
                                            let cellClass = 'bg-white';
                                            if (isSelected) cellClass = 'ring-2 ring-green-600 ring-inset z-10';
                                            if (status === 'correct') cellClass += ' bg-green-200 font-bold';
                                            if (status === 'incorrect') cellClass += ' bg-red-200';
                                            
                                            return (
                                                <td
                                                    key={c}
                                                    onClick={() => handleCellSelect(r, c)}
                                                    className={`p-1 border border-slate-200 w-24 h-8 text-left text-black relative transition-colors cursor-pointer ${cellClass}`}
                                                >
                                                    <span className="truncate block px-1">{formatNumber(gridData[r]?.[c], settings)}</span>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {isCorrect && (
                        <div className="mt-4 p-4 rounded-lg bg-blue-50 border border-blue-200 text-blue-900">
                            <h4 className="font-bold text-blue-900 mb-2">Penjelasan:</h4>
                            <div className="text-sm space-y-2" dangerouslySetInnerHTML={renderExplanation(challenge.explanation)} />
                        </div>
                    )}
                </main>

                <aside className="lg:col-span-1 space-y-4">
                    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 flex flex-col items-center">
                        <Mascot state={mascotState} />
                    </div>
                    {feedback && (
                        <div className={`p-3 rounded-lg text-center font-semibold flex items-center gap-2 justify-center text-sm ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                           {isCorrect ? <CheckCircleIcon className="w-5 h-5"/> : <XCircleIcon className="w-5 h-5"/>}
                           {feedback}
                        </div>
                    )}
                    {hint && (
                        <div className="p-4 rounded-lg bg-yellow-100 border border-yellow-200 text-yellow-800 text-sm">
                            <p className="font-bold mb-1">Petunjuk AI:</p>
                            <p>{hint}</p>
                        </div>
                    )}
                    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 space-y-3">
                        <button onClick={handleGetHint} disabled={isCorrect || isHintLoading || !!hint} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-yellow-400 text-yellow-900 font-bold rounded-lg shadow-md hover:bg-yellow-500 transition disabled:bg-slate-400">
                            <LightBulbIcon className="w-5 h-5" />
                            {isHintLoading ? 'AI Berpikir...' : 'Petunjuk AI'}
                        </button>
                        <button onClick={loadNewChallenge} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-sky-500 text-white font-bold rounded-lg shadow-md hover:bg-sky-600 transition">
                            <ForwardIcon className="w-5 h-5" />
                            Tantangan Berikutnya
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
};