import React, { useState, useCallback, useMemo } from 'react';
import { ArrowUturnLeftIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

const gameData = [
  { formula: '=VLOOKUP("Apel", A1:A5, 2, FALSE)', error: '#N/A', description: 'Nilai tidak tersedia untuk formula.' },
  { formula: '=10/0', error: '#DIV/0!', description: 'Mencoba membagi sebuah angka dengan nol.' },
  { formula: '=SUM(A1:B1) C1', error: '#NULL!', description: 'Referensi rentang yang tidak beririsan.' },
  { formula: '=NONEXISTENT()', error: '#NAME?', description: 'Excel tidak mengenali teks dalam formula.' },
  { formula: '=SQRT(-1)', error: '#NUM!', description: 'Masalah dengan angka, seperti angka tidak valid.' },
  { formula: '=A1+B1', error: '#VALUE!', description: 'Jenis argumen atau operand yang salah.' },
  { formula: '=A1', error: '#REF!', description: 'Referensi sel tidak valid.' },
];

const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

export const ErrorExterminator: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [questions, setQuestions] = useState(shuffleArray(gameData));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = useMemo(() => {
    if (currentQuestionIndex >= questions.length) return null;
    const question = questions[currentQuestionIndex];
    const otherOptions = questions.filter(q => q.error !== question.error).map(q => q.error);
    const options = shuffleArray([...new Set(otherOptions)]).slice(0, 3);
    const shuffledOptions = shuffleArray([...options, question.error]);
    return { ...question, shuffledOptions };
  }, [questions, currentQuestionIndex]);

  const handleAnswerClick = (option: string) => {
    if (isAnswered || !currentQuestion) return;

    setIsAnswered(true);
    if (option === currentQuestion.error) {
      setScore(prev => prev + 1);
      setFeedback('Benar! Error teridentifikasi!');
    } else {
      setFeedback(`Salah. Jawaban yang benar: ${currentQuestion.error}. ${currentQuestion.description}`);
    }

    setTimeout(() => {
      setCurrentQuestionIndex(prev => prev + 1);
      setIsAnswered(false);
      setFeedback('');
    }, 3000);
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

      <div className="p-4 bg-slate-100 rounded-lg mb-6">
        <p className="text-slate-700">Formula berikut menghasilkan error. Apa jenis error tersebut?</p>
        <p className="font-mono text-lg font-semibold text-red-600 mt-2">{currentQuestion.formula}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {currentQuestion.shuffledOptions.map(option => (
          <button
            key={option}
            onClick={() => handleAnswerClick(option)}
            disabled={isAnswered}
            className="p-4 rounded-lg border-2 border-slate-200 bg-white hover:border-yellow-500 hover:bg-yellow-50 transition-colors disabled:cursor-not-allowed font-mono font-bold text-slate-700"
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
