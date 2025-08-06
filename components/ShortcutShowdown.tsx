import React, { useState, useCallback, useMemo } from 'react';
import { ArrowUturnLeftIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

const gameData = [
  { shortcut: 'CTRL + C', description: 'Menyalin sel yang dipilih', options: ['Paste', 'Cut', 'Undo'] },
  { shortcut: 'CTRL + V', description: 'Menempelkan konten yang disalin', options: ['Copy', 'Format Painter', 'Save'] },
  { shortcut: 'CTRL + B', description: 'Membuat teks menjadi tebal (Bold)', options: ['Italic', 'Underline', 'Strikethrough'] },
  { shortcut: 'CTRL + 1', description: 'Membuka dialog Format Cells', options: ['Print', 'Insert Table', 'Filter'] },
  { shortcut: 'F2', description: 'Mengedit sel aktif', options: ['Delete Cell', 'Add Comment', 'Calculate Now'] },
  { shortcut: 'CTRL + Z', description: 'Membatalkan aksi terakhir (Undo)', options: ['Redo', 'Find', 'Replace'] },
  { shortcut: 'CTRL + S', description: 'Menyimpan workbook', options: ['Save As', 'Open', 'Close'] },
  { shortcut: 'CTRL + F', description: 'Membuka dialog Find', options: ['Go To', 'Replace', 'Sort'] },
];

const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

export const ShortcutShowdown: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [questions, setQuestions] = useState(shuffleArray(gameData));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = useMemo(() => {
    if (currentQuestionIndex >= questions.length) return null;
    const question = questions[currentQuestionIndex];
    const options = shuffleArray([...question.options, question.description]);
    return { ...question, shuffledOptions: options };
  }, [questions, currentQuestionIndex]);

  const handleAnswerClick = (option: string) => {
    if (isAnswered || !currentQuestion) return;

    setIsAnswered(true);
    if (option === currentQuestion.description) {
      setScore(prev => prev + 1);
      setFeedback('Tepat! Anda hebat!');
    } else {
      setFeedback(`Salah. Jawaban yang benar: ${currentQuestion.description}`);
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

  if (!currentQuestion) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200 text-center">
        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto animate-bounce" />
        <h2 className="text-2xl font-bold text-slate-800 mt-4">Permainan Selesai!</h2>
        <p className="text-slate-600 mt-2">Skor akhir Anda adalah:</p>
        <p className="text-6xl font-bold text-indigo-600 my-4">{score}/{questions.length}</p>
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
        <h2 className="text-2xl font-bold text-slate-800">Shortcut Showdown</h2>
        <button onClick={onBack} className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 bg-slate-200 text-slate-700 text-sm font-semibold rounded-md hover:bg-slate-300 transition-colors">
          <ArrowUturnLeftIcon className="w-5 h-5" />
          Kembali
        </button>
      </div>
      <div className="flex justify-between items-baseline mb-4">
        <p className="text-slate-500">Pertanyaan {currentQuestionIndex + 1} dari {questions.length}</p>
        <p className="font-bold text-slate-700">Skor: {score}</p>
      </div>

      <div className="p-6 bg-slate-800 rounded-lg text-center mb-6">
        <p className="font-mono text-4xl font-bold text-white">{currentQuestion.shortcut}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {currentQuestion.shuffledOptions.map(option => (
          <button
            key={option}
            onClick={() => handleAnswerClick(option)}
            disabled={isAnswered}
            className="p-4 rounded-lg border-2 border-slate-200 bg-white hover:border-indigo-500 hover:bg-indigo-50 transition-colors disabled:cursor-not-allowed font-semibold text-slate-700 text-left"
          >
            {option}
          </button>
        ))}
      </div>

      {feedback && (
        <p className={`mt-4 text-center font-semibold ${feedback.includes('Tepat') ? 'text-green-600' : 'text-red-600'}`}>
          {feedback}
        </p>
      )}
    </div>
  );
};
