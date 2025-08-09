import React, { useState, useEffect, useCallback, useContext } from 'react';
import type { ChampionshipCase, ChampionshipTask, AppSettings, User } from '../types';
import { SettingsContext } from '../App';
import { ArrowUturnLeftIcon, BeakerIcon, CheckCircleIcon, XCircleIcon, InformationCircleIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';

const GRID_ROWS = 15;
const GRID_COLS = 10;

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

const TaskList: React.FC<{ tasks: ChampionshipTask[], completion: boolean[], activeTask: number, onSelect: (index: number) => void }> = ({ tasks, completion, activeTask, onSelect }) => {
    return (
        <aside className="lg:col-span-1 bg-white p-4 rounded-xl shadow-lg border border-slate-200 self-start">
            <h3 className="font-bold text-lg mb-3 text-slate-700">Daftar Tugas</h3>
            <ul className="space-y-2">
                {tasks.map((task, index) => (
                    <li key={index}>
                        <button
                            onClick={() => onSelect(index)}
                            className={`w-full text-left p-3 rounded-lg flex items-start gap-3 transition-colors duration-200 ${activeTask === index ? 'bg-amber-100' : 'hover:bg-slate-100'}`}
                        >
                            {completion[index] ? <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" /> : <div className="w-5 h-5 flex-shrink-0 mt-0.5 flex items-center justify-center"><div className="w-2.5 h-2.5 rounded-full bg-slate-400"></div></div>}
                            <span className={`text-sm ${completion[index] ? 'line-through text-slate-500' : 'text-slate-800'}`}>{task.task}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

interface ChampionshipViewProps {
  user: User | null;
  caseData: ChampionshipCase;
  onBack: () => void;
  onCaseComplete: (caseId: number) => void;
}

export const ChampionshipView: React.FC<ChampionshipViewProps> = ({ user, caseData, onBack, onCaseComplete }) => {
    const { settings } = useContext(SettingsContext);
    const [gridData, setGridData] = useState<(string|number)[][]>([]);
    const [taskCompletion, setTaskCompletion] = useState<boolean[]>([]);
    const [activeTaskIndex, setActiveTaskIndex] = useState(0);
    const [selectedCell, setSelectedCell] = useState<{ r: number, c: number } | null>(null);
    const [formulaBarInput, setFormulaBarInput] = useState('');
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info', message: string, taskId: number } | null>(null);

    useEffect(() => {
        const newGrid: (string | number)[][] = Array.from({ length: GRID_ROWS }, () => Array.from({ length: GRID_COLS }, () => ''));
        caseData.table.headers.forEach((header, c) => { newGrid[0][c] = header; });
        caseData.table.rows.forEach((row, r) => {
            row.forEach((cell, c) => { newGrid[r + 1][c] = cell; });
        });
        setGridData(newGrid);
        setTaskCompletion(Array(caseData.tasks.length).fill(false));
        setActiveTaskIndex(0);
        setSelectedCell(null);
        setFormulaBarInput('');
        setFeedback(null);
    }, [caseData]);
    
    useEffect(() => {
        const allTasksCompleted = taskCompletion.length > 0 && taskCompletion.every(c => c);
        if (allTasksCompleted && user && caseData) {
            if (!user.championshipsCompleted[caseData.id]) {
                onCaseComplete(caseData.id);
            }
            setFeedback({type: 'success', message: 'Selamat! Anda telah menyelesaikan semua tugas dalam studi kasus ini!', taskId: activeTaskIndex});
        }
    }, [taskCompletion, onCaseComplete, caseData, user, activeTaskIndex]);

    const handleCheckAnswer = useCallback((cell: {r: number, c: number}, submittedFormula: string) => {
        const task = caseData.tasks[activeTaskIndex];
        if (!task || taskCompletion[activeTaskIndex]) return;

        if (cell.r !== task.targetCell.r || cell.c !== task.targetCell.c) {
            setFeedback({ type: 'info', message: `Formula ini harus dimasukkan di sel ${toA1(task.targetCell.r, task.targetCell.c)}.`, taskId: activeTaskIndex });
            return;
        }

        const normalizedUserAnswer = normalizeAnswer(submittedFormula, settings.formulaSeparator);
        const isAnswerCorrect = Array.isArray(task.answer.correctValue)
            ? task.answer.correctValue.some(val => normalizeAnswer(val, settings.formulaSeparator) === normalizedUserAnswer)
            : normalizeAnswer(task.answer.correctValue, settings.formulaSeparator) === normalizedUserAnswer;
            
        if (isAnswerCorrect) {
            let newGrid = gridData.map(row => [...row]);
            
            // Special handling for fill-down task
            if (task.task.toLowerCase().includes('tarik formula') || task.task.toLowerCase().includes('salin formula')) {
                const startTask = caseData.tasks[activeTaskIndex - 1]; // Assumes fill-down follows an initial formula
                if (startTask) {
                    const startRow = startTask.targetCell.r;
                    const endRow = task.targetCell.r;
                    for (let r = startRow; r <= endRow; r++) {
                        const correctResultForRow = caseData.tasks.find(t => t.targetCell.r === r && t.targetCell.c === cell.c)?.correctResult ?? task.correctResult;
                        newGrid[r][cell.c] = correctResultForRow;
                    }
                }
            } else {
                 newGrid[cell.r][cell.c] = task.correctResult;
            }
           
            setGridData(newGrid);
            
            const newCompletion = [...taskCompletion];
            newCompletion[activeTaskIndex] = true;
            setTaskCompletion(newCompletion);

            setFeedback({ type: 'success', message: `Benar! ${task.explanation}`, taskId: activeTaskIndex });
            
            // Move to next unsolved task
            const nextTask = newCompletion.findIndex(c => !c);
            if(nextTask !== -1) {
                setActiveTaskIndex(nextTask);
                setSelectedCell(null);
                setFormulaBarInput('');
            }
        } else {
             setFeedback({ type: 'error', message: 'Formula kurang tepat. Coba lagi.', taskId: activeTaskIndex });
        }

    }, [caseData.tasks, activeTaskIndex, taskCompletion, gridData, settings.formulaSeparator]);

    const handleFormulaBarKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && selectedCell) {
            handleCheckAnswer(selectedCell, formulaBarInput);
        }
    };

    const handleDownloadCsv = useCallback(() => {
        const { headers, rows } = caseData.table;

        const escapeCsvCell = (cell: string | number) => {
            const cellStr = String(cell);
            if (/[",\n]/.test(cellStr)) {
                return `"${cellStr.replace(/"/g, '""')}"`;
            }
            return cellStr;
        };

        const csvContent = [
            headers.map(escapeCsvCell).join(','),
            ...rows.map(row => row.map(escapeCsvCell).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const safeTitle = caseData.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        link.setAttribute('href', url);
        link.setAttribute('download', `excel_saga_case_${safeTitle}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, [caseData]);
    
    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Excel Championship</h2>
                    <p className="text-slate-600 mt-1 max-w-2xl">Mode Studi Kasus</p>
                </div>
                <button onClick={onBack} className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-colors">
                    <ArrowUturnLeftIcon className="w-5 h-5" />
                    Kembali ke Lobby
                </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 mb-6">
                <div className="flex justify-between items-start gap-4">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">{caseData.title}</h3>
                        <p className="text-sm text-slate-600">{caseData.description}</p>
                    </div>
                    <button
                        onClick={handleDownloadCsv}
                        className="flex-shrink-0 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-md hover:bg-green-700 transition-colors"
                        title="Unduh data kasus sebagai file CSV"
                    >
                        <ArrowDownTrayIcon className="w-5 h-5"/>
                        <span className="hidden sm:inline">Unduh Data (CSV)</span>
                    </button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 <TaskList tasks={caseData.tasks} completion={taskCompletion} activeTask={activeTaskIndex} onSelect={setActiveTaskIndex} />

                 <main className="lg:col-span-2 bg-white p-4 rounded-xl shadow-lg border border-slate-200">
                    {/* FORMULA BAR */}
                     <div className="flex items-center mb-2 font-mono text-sm sticky top-2 z-20">
                        <div className="w-20 p-2 text-center bg-slate-200 border border-slate-300 rounded-l-md text-slate-600">
                            {selectedCell ? toA1(selectedCell.r, selectedCell.c) : '...'}
                        </div>
                        <div className="relative flex-grow">
                             <BeakerIcon className="w-5 h-5 absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                             <input 
                                type="text"
                                value={formulaBarInput}
                                onChange={e => setFormulaBarInput(e.target.value)}
                                onKeyDown={handleFormulaBarKeyDown}
                                placeholder={selectedCell ? `Ketik formula di sini dan tekan Enter (gunakan ${settings.formulaSeparator} sebagai pemisah)` : 'Pilih sel target untuk memulai'}
                                className="w-full p-2 pl-8 bg-white border-t border-b border-r border-slate-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                             />
                        </div>
                    </div>
                     {/* GRID */}
                     <div className="overflow-auto">
                        <table className="border-collapse">
                            <thead>
                                <tr>
                                    <th className="p-1 border border-slate-300 bg-slate-200 w-10 h-8 sticky left-0 top-0 z-10"></th>
                                    {Array.from({ length: GRID_COLS }).map((_, c) => (
                                        <th key={c} className="p-1 border border-slate-300 bg-slate-200 text-black font-semibold w-28 h-8 text-center sticky top-0">{toColName(c, settings)}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from({ length: GRID_ROWS }).map((_, r) => (
                                    <tr key={r}>
                                        <th className="p-1 border border-slate-300 bg-slate-200 text-black font-semibold w-10 h-8 text-center sticky left-0">{r + 1}</th>
                                        {Array.from({ length: GRID_COLS }).map((_, c) => (
                                            <td
                                                key={c}
                                                onClick={() => {setSelectedCell({r,c}); setFormulaBarInput(String(gridData[r]?.[c] || ''))}}
                                                className={`p-1 border border-slate-200 w-28 h-8 text-left relative transition-colors cursor-cell ${selectedCell?.r === r && selectedCell?.c === c ? 'ring-2 ring-amber-600 ring-inset z-10 bg-amber-50' : ''}`}
                                            >
                                                <span className="truncate block px-1 text-sm text-black">{formatNumber(gridData[r]?.[c], settings)}</span>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                 </main>
            </div>
             {feedback && (
                <div className={`fixed bottom-8 right-8 max-w-sm p-4 rounded-xl shadow-2xl flex items-start gap-3 z-50
                    ${feedback.type === 'success' ? 'bg-green-100 text-green-900 border border-green-200' :
                      feedback.type === 'error' ? 'bg-red-100 text-red-900 border border-red-200' :
                      'bg-sky-100 text-sky-900 border border-sky-200'
                    }`}
                >
                    {feedback.type === 'success' && <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0" />}
                    {feedback.type === 'error' && <XCircleIcon className="w-6 h-6 text-red-500 flex-shrink-0" />}
                    {feedback.type === 'info' && <InformationCircleIcon className="w-6 h-6 text-sky-500 flex-shrink-0" />}
                    <p className="text-sm">{feedback.message}</p>
                </div>
            )}
        </div>
    );
};