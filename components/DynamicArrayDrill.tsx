
import React, { useState, useCallback, useMemo } from 'react';
import { ArrowUturnLeftIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

const gameData = [
  { task: 'Menampilkan daftar unik dari rentang A2:A100.', answer: 'UNIQUE', options: ['FILTER', 'SORT', 'SEQUENCE'] },
  { task: 'Mengurutkan data di A2:B10 berdasarkan kolom kedua (B) secara menurun.', answer: '=SORT(A2:B10, 2, -1)', options: ['=SORT(A2:B10, 1, 1)', '=SORTBY(A2:B10, B2:B10)', '=FILTER(A2:B10, B2:B10 > 0)'] },
  { task: 'Menyaring data di A2:C50 untuk menampilkan hanya baris di mana kolom B adalah "Buah".', answer: 'FILTER', options: ['UNIQUE', 'SORT', 'TAKE'] },
  { task: 'Membuat daftar angka dari 1 sampai 5 dalam satu kolom.', answer: '=SEQUENCE(5)', options: ['=RANDARRAY(5)', '=TAKE(A:A, 5)', '=UNIQUE(1,2,3,4,5)'] },
];

const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

export const DynamicArrayDrill: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [questions] = useState(shuffleArray(gameData));
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
      setFeedback('Benar! Formula yang dinamis!');
    } else {
      setFeedback(`Salah. Jawaban yang benar: ${currentQuestion.answer}`);
    }
    setTimeout(() => {
      setCurrentQuestionIndex(prev => prev + 1);
      setIsAnswered(false);
      setFeedback('');
    }, 2500);
  };

  const resetGame = useCallback(() => {
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
        <p className="text-slate-600 mt-2">Skor akhir Anda dalam Dynamic Array Drill:</p>
        <p className="text-6xl font-bold text-teal-600 my-4">{score}/{questions.length}</p>
        <div className="flex justify-center gap-4">
          <button onClick={resetGame} className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition">Main Lagi</button>
          <button onClick={onBack} className="px-6 py-2 bg-slate-200 text-slate-800 font-bold rounded-lg shadow-sm hover:bg-slate-300 transition">Kembali ke Arcade</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-2xl font-bold text-slate-800">Dynamic Array Drill</h2>
        <button onClick={onBack} className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 bg-slate-200 text-slate-700 text-sm font-semibold rounded-md hover:bg-slate-300 transition-colors">
          <ArrowUturnLeftIcon className="w-5 h-5" /> Kembali
        </button>
      </div>
      <div className="flex justify-between items-baseline mb-4">
        <p className="text-slate-500">Pertanyaan {currentQuestionIndex + 1} dari {questions.length}</p>
        <p className="font-bold text-slate-700">Skor: {score}</p>
      </div>
      <div className="p-6 bg-slate-100 rounded-lg text-center mb-6">
        <p className="font-semibold text-lg text-slate-800">{currentQuestion.task}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {currentQuestion.shuffledOptions.map(option => (
          <button
            key={option}
            onClick={() => handleAnswerClick(option)}
            disabled={isAnswered}
            className="p-4 rounded-lg border-2 border-slate-200 bg-white hover:border-teal-500 hover:bg-teal-50 transition-colors disabled:cursor-not-allowed font-semibold text-slate-700 text-left"
          >
            {option}
          </button>
        ))}
      </div>
      {feedback && (
        <p className={`mt-4 text-center font-semibold ${feedback.includes('Benar') ? 'text-green-600' : 'text-red-600'}`}>{feedback}</p>
      )}
    </div>
  );
};
