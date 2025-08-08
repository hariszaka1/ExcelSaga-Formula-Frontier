
import React, { useState, useCallback, useMemo } from 'react';
import { ArrowUturnLeftIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

const gameData = [
  { question: 'Untuk mencari harga "Apel" dari tabel di A1:B10 (harga di kolom ke-2), formula apa yang benar?', answer: '=VLOOKUP("Apel",A1:B10,2,FALSE)', options: ['=VLOOKUP(A1,A1:B10,2,TRUE)', '=HLOOKUP("Apel",A1:B10,2,FALSE)', '=LOOKUP("Apel",A1:B10)'] },
  { question: 'Apa fungsi argumen ke-4 (range_lookup) di VLOOKUP jika diatur ke FALSE?', answer: 'Mencari kecocokan yang persis (exact match)', options: ['Mencari kecocokan terdekat (approximate match)', 'Mengurutkan tabel secara otomatis', 'Mengabaikan error'] },
  { question: 'Jika VLOOKUP tidak menemukan nilai yang dicari, error apa yang akan muncul?', answer: '#N/A', options: ['#REF!', '#VALUE!', '#NAME?'] },
  { question: 'VLOOKUP selalu mencari nilai di kolom mana dari table_array yang Anda tentukan?', answer: 'Kolom paling kiri', options: ['Kolom paling kanan', 'Kolom yang Anda tentukan', 'Di semua kolom'] },
];

const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

export const VlookupVenture: React.FC<{ onBack: () => void }> = ({ onBack }) => {
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
      setFeedback('Tepat! Anda menguasai VLOOKUP!');
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
        <p className="text-slate-600 mt-2">Skor akhir Anda dalam VLOOKUP Venture:</p>
        <p className="text-6xl font-bold text-lime-600 my-4">{score}/{questions.length}</p>
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
        <h2 className="text-2xl font-bold text-slate-800">VLOOKUP Venture</h2>
        <button onClick={onBack} className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 bg-slate-200 text-slate-700 text-sm font-semibold rounded-md hover:bg-slate-300 transition-colors">
          <ArrowUturnLeftIcon className="w-5 h-5" />
          Kembali
        </button>
      </div>
      <div className="flex justify-between items-baseline mb-4">
        <p className="text-slate-500">Pertanyaan {currentQuestionIndex + 1} dari {questions.length}</p>
        <p className="font-bold text-slate-700">Skor: {score}</p>
      </div>

      <div className="p-6 bg-slate-100 rounded-lg text-center mb-6">
        <p className="font-semibold text-lg text-slate-800">{currentQuestion.question}</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {currentQuestion.shuffledOptions.map(option => (
          <button
            key={option}
            onClick={() => handleAnswerClick(option)}
            disabled={isAnswered}
            className="p-4 rounded-lg border-2 border-slate-200 bg-white hover:border-lime-500 hover:bg-lime-50 transition-colors disabled:cursor-not-allowed font-semibold text-slate-700 text-left"
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
