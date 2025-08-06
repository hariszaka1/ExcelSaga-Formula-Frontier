import React, { useState, useCallback } from 'react';
import { ArrowUturnLeftIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

const gameData = [
  { task: 'Menjumlahkan semua angka dalam rentang sel.', answer: 'SUM' },
  { task: 'Menghitung rata-rata dari sekelompok angka.', answer: 'AVERAGE' },
  { task: 'Menghitung jumlah sel dalam rentang yang tidak kosong.', answer: 'COUNTA' },
  { task: 'Mencari nilai di kolom kiri dan mengembalikan nilai dari kolom lain.', answer: 'VLOOKUP' },
  { task: 'Menggabungkan teks dari beberapa sel menjadi satu.', answer: 'CONCAT' },
  { task: 'Menampilkan tanggal dan waktu saat ini.', answer: 'NOW' },
  { task: 'Mengekstrak sejumlah karakter dari sisi kiri sebuah teks.', answer: 'LEFT' },
  { task: 'Membuat keputusan logis antara dua nilai.', answer: 'IF' },
];

const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

export const WhatsTheFunction: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [questions] = useState(shuffleArray(gameData));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isGameFinished = currentIndex >= questions.length;

  const handleSubmit = useCallback((e?: React.FormEvent) => {
    e?.preventDefault();
    if (isAnswered || !userInput) return;

    setIsAnswered(true);
    const formattedAnswer = userInput.toUpperCase().replace('()', '');
    if (formattedAnswer === currentQuestion.answer) {
      setScore(prev => prev + 1);
      setFeedback('Tepat sekali! Fungsi yang benar.');
    } else {
      setFeedback(`Kurang tepat. Jawaban yang benar adalah =${currentQuestion.answer}().`);
    }

    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setUserInput('');
      setIsAnswered(false);
      setFeedback('');
    }, 2500);
  }, [userInput, currentQuestion, isAnswered]);

  const resetGame = useCallback(() => {
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
        <p className="text-6xl font-bold text-orange-600 my-4">{score}/{questions.length}</p>
        <div className="flex justify-center gap-4">
          <button onClick={resetGame} className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition">Main Lagi</button>
          <button onClick={onBack} className="px-6 py-2 bg-slate-200 text-slate-800 font-bold rounded-lg shadow-sm hover:bg-slate-300 transition">Kembali</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-2xl font-bold text-slate-800">What's The Function?</h2>
        <button onClick={onBack} className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 bg-slate-200 text-slate-700 text-sm font-semibold rounded-md hover:bg-slate-300 transition-colors">
          <ArrowUturnLeftIcon className="w-5 h-5" />
          Kembali
        </button>
      </div>
      <div className="flex justify-between items-baseline mb-4">
        <p className="text-slate-500">Pertanyaan {currentIndex + 1} dari {questions.length}</p>
        <p className="font-bold text-slate-700">Skor: {score}</p>
      </div>

      <div className="p-4 bg-slate-100 rounded-lg text-center mb-6 min-h-[80px] flex items-center justify-center">
        <p className="text-lg font-semibold text-slate-800">"{currentQuestion.task}"</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex items-center">
          <span className="p-3 bg-slate-200 border-2 border-r-0 border-slate-300 rounded-l-lg font-mono text-slate-500">=</span>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={isAnswered}
            placeholder="NAMA_FUNGSI"
            className="w-full p-3 bg-white border-2 border-slate-300 rounded-r-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition font-mono uppercase tracking-wider"
            autoFocus
          />
        </div>
        <button type="submit" className="w-full mt-3 px-6 py-3 bg-orange-500 text-white font-bold rounded-lg shadow-md hover:bg-orange-600 transition">
          Kirim Jawaban
        </button>
      </form>

      {feedback && (
        <p className={`mt-4 text-center font-semibold ${feedback.includes('Tepat') ? 'text-green-600' : 'text-red-600'}`}>
          {feedback}
        </p>
      )}
    </div>
  );
};
