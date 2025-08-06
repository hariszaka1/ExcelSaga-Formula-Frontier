import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ArrowUturnLeftIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

const gameData = [
  {
    scenario: 'Membandingkan penjualan beberapa produk dalam satu periode.',
    options: ['Pie Chart', 'Line Chart', 'Bar Chart', 'Scatter Plot'],
    answer: 'Bar Chart',
  },
  {
    scenario: 'Menampilkan tren penjualan selama 12 bulan.',
    options: ['Bar Chart', 'Line Chart', 'Donut Chart', 'Treemap'],
    answer: 'Line Chart',
  },
  {
    scenario: 'Menunjukkan proporsi setiap kategori produk terhadap total penjualan.',
    options: ['Line Chart', 'Area Chart', 'Histogram', 'Pie Chart'],
    answer: 'Pie Chart',
  },
  {
    scenario: 'Melihat hubungan antara pengeluaran iklan dan pendapatan penjualan.',
    options: ['Scatter Plot', 'Bar Chart', 'Waterfall Chart', 'Funnel Chart'],
    answer: 'Scatter Plot',
  },
  {
    scenario: 'Menampilkan distribusi frekuensi nilai ujian siswa.',
    options: ['Sunburst', 'Histogram', 'Line Chart', 'Radar Chart'],
    answer: 'Histogram',
  },
];

const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

export const ChartChamp: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [questions, setQuestions] = useState(shuffleArray(gameData));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
  const isGameFinished = currentQuestionIndex >= questions.length;

  const handleAnswerClick = (option: string) => {
    if (isAnswered) return;

    setIsAnswered(true);
    if (option === currentQuestion.answer) {
      setScore(prev => prev + 1);
      setFeedback('Benar! Kerja bagus.');
    } else {
      setFeedback(`Kurang tepat. Jawaban yang benar adalah ${currentQuestion.answer}.`);
    }

    setTimeout(() => {
      setCurrentQuestionIndex(prev => prev + 1);
      setIsAnswered(false);
      setFeedback('');
    }, 2000);
  };

  const resetGame = useCallback(() => {
    setQuestions(shuffleArray(gameData));
    setCurrentQuestionIndex(0);
    setScore(0);
    setFeedback('');
    setIsAnswered(false);
  }, []);

  if (isGameFinished) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200 text-center">
        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto animate-bounce" />
        <h2 className="text-2xl font-bold text-slate-800 mt-4">Permainan Selesai!</h2>
        <p className="text-slate-600 mt-2">Skor akhir Anda adalah:</p>
        <p className="text-6xl font-bold text-sky-600 my-4">{score}/{questions.length}</p>
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
        <h2 className="text-2xl font-bold text-slate-800">Chart Champ</h2>
        <button onClick={onBack} className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 bg-slate-200 text-slate-700 text-sm font-semibold rounded-md hover:bg-slate-300 transition-colors">
          <ArrowUturnLeftIcon className="w-5 h-5" />
          Kembali
        </button>
      </div>
      <div className="flex justify-between items-baseline mb-4">
        <p className="text-slate-500">Pertanyaan {currentQuestionIndex + 1} dari {questions.length}</p>
        <p className="font-bold text-slate-700">Skor: {score}</p>
      </div>

      <div className="p-4 bg-slate-100 rounded-lg text-center mb-6">
        <p className="text-lg font-semibold text-slate-800">{currentQuestion.scenario}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {currentQuestion.options.map(option => (
          <button
            key={option}
            onClick={() => handleAnswerClick(option)}
            disabled={isAnswered}
            className="p-4 rounded-lg border-2 border-slate-200 bg-white hover:border-sky-500 hover:bg-sky-50 transition-colors disabled:cursor-not-allowed font-semibold text-slate-700"
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
