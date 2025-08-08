import React, { useState, useCallback, useMemo } from 'react';
import { ArrowUturnLeftIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

// New game data structure
const gameData = [
  {
    question: 'Sebuah formula mencoba membagi dengan sel yang berisi nol. Error apa yang akan muncul?',
    table: {
      headers: ['A', 'B'],
      rows: [['Pendapatan', 1000], ['Hari Kerja', 0]]
    },
    formula: '=B1/B2',
    answer: '#DIV/0!',
    options: ['#VALUE!', '#NAME?', '#REF!']
  },
  {
    question: 'Nama fungsi salah ketik di dalam formula. Error apa yang akan muncul?',
    table: {
      headers: ['A'],
      rows: [[10], [20]]
    },
    formula: '=SU(A1:A2)',
    answer: '#NAME?',
    options: ['#VALUE!', '#N/A', '#REF!']
  },
  {
    question: 'Sebuah formula mencoba melakukan operasi matematika pada teks. Error apa yang akan muncul?',
    table: {
      headers: ['A', 'B'],
      rows: [[100, 'Teks']]
    },
    formula: '=A1+B1',
    answer: '#VALUE!',
    options: ['#DIV/0!', '#NAME?', '#N/A']
  },
  {
    question: 'VLOOKUP tidak dapat menemukan nilai yang dicari. Error apa yang akan muncul?',
    table: {
      headers: ['ID', 'Produk'],
      rows: [['P01', 'Apel'], ['P02', 'Mangga']]
    },
    formula: '=VLOOKUP("P03", A1:B2, 2, FALSE)',
    answer: '#N/A',
    options: ['#REF!', '#VALUE!', '#NAME?']
  },
  {
    question: 'Sebuah formula merujuk ke sel yang telah dihapus. Error apa yang akan muncul?',
    table: {
      headers: ['A'],
      rows: [['(Kolom B dihapus)']]
    },
    formula: '=A1+#REF!',
    answer: '#REF!',
    options: ['#N/A', '#VALUE!', '#NULL!']
  }
];

const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

const toColName = (col: number): string => String.fromCharCode(65 + col);

// Mini table component for display
const MiniTable: React.FC<{ data: { headers: string[], rows: (string|number)[][] } }> = ({ data }) => (
  <div className="my-2 flex justify-center">
    <table className="border-collapse text-xs">
      <thead>
        <tr>
          <th className="p-1 border border-slate-300 bg-slate-200 w-6 h-6"></th>
          {data.headers.map((_, c) => (
            <th key={c} className="p-1 border border-slate-300 bg-slate-200 font-semibold w-24 h-6 text-center text-black">{toColName(c)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, r) => (
          <tr key={r}>
            <th className="p-1 border border-slate-300 bg-slate-200 font-semibold w-6 h-8 text-center text-black">{r + 1}</th>
            {row.map((cell, c) => (
              <td key={c} className="p-1 border border-slate-200 w-24 h-8 text-center text-black">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);


export const ErrorExterminator: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [questions, setQuestions] = useState(shuffleArray(gameData));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = useMemo(() => {
    if (currentQuestionIndex >= questions.length) return null;
    const question = questions[currentQuestionIndex];
    const options = shuffleArray([...question.options, question.answer]);
    return { ...question, shuffledOptions: options };
  }, [questions, currentQuestionIndex]);

  const handleAnswerClick = (option: string) => {
    if (isAnswered || !currentQuestion) return;

    setIsAnswered(true);
    if (option === currentQuestion.answer) {
      setScore(prev => prev + 1);
      setFeedback('Benar! Anda pembasmi error yang hebat!');
    } else {
      setFeedback(`Salah. Jawaban yang benar adalah ${currentQuestion.answer}.`);
    }

    setTimeout(() => {
      setCurrentQuestionIndex(prev => prev + 1);
      setIsAnswered(false);
      setFeedback('');
    }, 2500);
  };

  const resetGame = useCallback(() => {
    setQuestions(shuffleArray(gameData));
    setCurrentQuestionIndex(0);
    setScore(0);
    setFeedback('');
    setIsAnswered(false);
  }, []);

  if (!currentQuestion) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200 text-center">
        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto animate-bounce" />
        <h2 className="text-2xl font-bold text-slate-800 mt-4">Permainan Selesai!</h2>
        <p className="text-slate-600 mt-2">Skor akhir Anda adalah:</p>
        <p className="text-6xl font-bold text-yellow-600 my-4">{score}/{questions.length}</p>
        <div className="flex justify-center gap-4">
          <button onClick={resetGame} className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition">
            Main Lagi
          </button>
          <button onClick={onBack} className="px-6 py-2 bg-slate-200 text-slate-800 font-bold rounded-lg shadow-sm hover:bg-slate-300 transition">
            Kembali ke Arcade
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-2xl font-bold text-slate-800">Error Exterminator</h2>
        <button onClick={onBack} className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 bg-slate-200 text-slate-700 text-sm font-semibold rounded-md hover:bg-slate-300 transition-colors">
          <ArrowUturnLeftIcon className="w-5 h-5" />
          Kembali
        </button>
      </div>
      <div className="flex justify-between items-baseline mb-4">
        <p className="text-slate-500">Pertanyaan {currentQuestionIndex + 1} dari {questions.length}</p>
        <p className="font-bold text-slate-700">Skor: {score}</p>
      </div>

      <div className="p-4 bg-slate-100 rounded-lg text-center mb-4">
        <p className="font-semibold text-slate-800">{currentQuestion.question}</p>
        <MiniTable data={currentQuestion.table} />
        <p className="font-mono text-sm font-bold text-slate-600 bg-slate-200 inline-block px-2 py-1 rounded">{currentQuestion.formula}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {currentQuestion.shuffledOptions.map(option => (
          <button
            key={option}
            onClick={() => handleAnswerClick(option)}
            disabled={isAnswered}
            className="p-4 rounded-lg border-2 border-slate-200 bg-white hover:border-yellow-500 hover:bg-yellow-50 transition-colors disabled:cursor-not-allowed font-semibold text-red-600 font-mono"
          >
            {option}
          </button>
        ))}
      </div>

      {feedback && (
        <p className={`mt-4 text-center font-semibold ${feedback.includes('Benar') ? 'text-green-600' : 'text-red-600'}`}>
          {feedback}
        </p>
      )}
    </div>
  );
};