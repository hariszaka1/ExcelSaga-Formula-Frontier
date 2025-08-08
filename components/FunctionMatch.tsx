import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ArrowUturnLeftIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

const functionPairs = [
  { func: 'VLOOKUP', desc: 'Mencari nilai di kolom paling kiri sebuah tabel dan mengembalikan nilai di baris yang sama dari kolom yang ditentukan.' },
  { func: 'SUMIFS', desc: 'Menjumlahkan sel-sel yang memenuhi beberapa kriteria atau kondisi.' },
  { func: 'INDEX', desc: 'Mengembalikan nilai atau referensi ke sebuah nilai dari dalam tabel atau rentang.' },
  { func: 'MATCH', desc: 'Mencari item di dalam satu baris atau kolom, dan mengembalikan posisi relatif item tersebut.' },
  { func: 'IFERROR', desc: 'Mengembalikan nilai yang Anda tentukan jika formula menghasilkan error; jika tidak, mengembalikan hasil formula itu sendiri.' },
  { func: 'COUNTIF', desc: 'Menghitung jumlah sel dalam rentang yang memenuhi satu kriteria.' },
  { func: 'TEXTJOIN', desc: 'Menggabungkan teks dari beberapa rentang dan/atau string, dengan menyertakan pemisah.' },
  { func: 'FILTER', desc: 'Menyaring rentang data berdasarkan kriteria yang Anda tentukan.' },
  { func: 'SUM', desc: 'Menjumlahkan semua angka dalam rentang sel.' },
  { func: 'AVERAGE', desc: 'Menghitung rata-rata dari sekelompok angka.' },
  { func: 'MAX', desc: 'Mengembalikan nilai terbesar dalam sekumpulan nilai.' },
  { func: 'IF', desc: 'Memeriksa apakah suatu kondisi terpenuhi, dan mengembalikan satu nilai jika BENAR, dan nilai lain jika SALAH.' },
  { func: 'CONCAT', desc: 'Menggabungkan teks dari beberapa rentang dan/atau string (tanpa pemisah).' },
  { func: 'TRIM', desc: 'Menghapus spasi ekstra dari teks.' },
  { func: 'TODAY', desc: 'Mengembalikan tanggal serial hari ini.' },
  { func: 'XLOOKUP', desc: 'Fungsi pencarian modern yang dapat mencari ke segala arah.' },
  { func: 'AND', desc: 'Mengembalikan TRUE jika semua argumennya bernilai TRUE.' },
  { func: 'LEFT', desc: 'Mengembalikan karakter pertama atau beberapa karakter pertama dalam string teks.' },
];

const PAIRS_PER_GAME = 8;

const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

export const FunctionMatch: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [functions, setFunctions] = useState<{ func: string; matched: boolean }[]>([]);
  const [descriptions, setDescriptions] = useState<{ desc: string; matched: boolean; originalFunc: string }[]>([]);
  const [selectedFunc, setSelectedFunc] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ func: string; correct: boolean } | null>(null);
  const matchedCount = useMemo(() => functions.filter(f => f.matched).length, [functions]);
  
  const isGameWon = useMemo(() => functions.length > 0 && matchedCount === functions.length, [matchedCount, functions.length]);

  const setupGame = useCallback(() => {
    const gameSubset = shuffleArray(functionPairs).slice(0, PAIRS_PER_GAME);
    const shuffledFuncs = shuffleArray(gameSubset);
    const shuffledDescs = shuffleArray(gameSubset);
    
    setFunctions(shuffledFuncs.map(f => ({ func: f.func, matched: false })));
    setDescriptions(shuffledDescs.map(d => ({ desc: d.desc, matched: false, originalFunc: d.func })));
    setSelectedFunc(null);
    setFeedback(null);
  }, []);

  useEffect(() => {
    setupGame();
  }, [setupGame]);
  
  const handleFuncClick = (func: string) => {
    if (isGameWon) return;
    setSelectedFunc(func);
    setFeedback(null);
  };
  
  const handleDescClick = (originalFunc: string) => {
    if (isGameWon || !selectedFunc) return;
    
    if (selectedFunc === originalFunc) {
      // Correct match
      setFunctions(prev => prev.map(f => f.func === selectedFunc ? { ...f, matched: true } : f));
      setDescriptions(prev => prev.map(d => d.originalFunc === selectedFunc ? { ...d, matched: true } : d));
      setFeedback({ func: selectedFunc, correct: true });
    } else {
      // Incorrect match
      setFeedback({ func: selectedFunc, correct: false });
    }
    setSelectedFunc(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-slate-800">Function Match</h2>
        <button onClick={onBack} className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 bg-slate-200 text-slate-700 text-sm font-semibold rounded-md hover:bg-slate-300 transition-colors">
          <ArrowUturnLeftIcon className="w-5 h-5" />
          Kembali ke Arcade
        </button>
      </div>
      <p className="text-slate-600 mb-6">Klik sebuah nama fungsi, lalu klik deskripsi yang sesuai untuk memasangkannya.</p>

      {isGameWon ? (
        <div className="text-center py-10 bg-green-50 rounded-lg">
          <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto animate-bounce" />
          <h3 className="text-2xl font-bold text-green-700 mt-4">Luar Biasa!</h3>
          <p className="text-slate-600 mt-2">Anda telah memasangkan semua fungsi dengan benar.</p>
          <button onClick={setupGame} className="mt-6 px-6 py-2 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition">
            Main Lagi
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Functions Column */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-lg text-center text-slate-700">Nama Fungsi</h3>
            {functions.map(({ func, matched }) => {
              const isSelected = selectedFunc === func;
              const isFeedbackTarget = feedback?.func === func;
              let bgColor = 'bg-white hover:bg-sky-100';
              if (matched) bgColor = 'bg-green-100 text-green-700';
              else if (isSelected) bgColor = 'bg-sky-200 ring-2 ring-sky-500';
              else if (isFeedbackTarget && !feedback?.correct) bgColor = 'bg-red-100';

              return (
                <button
                  key={func}
                  onClick={() => !matched && handleFuncClick(func)}
                  disabled={matched}
                  className={`w-full p-3 rounded-lg border border-slate-200 text-left transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed h-full ${bgColor}`}
                >
                  <code className="font-bold">{func}</code>
                </button>
              );
            })}
          </div>

          {/* Descriptions Column */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-lg text-center text-slate-700">Deskripsi</h3>
            {descriptions.map(({ desc, matched, originalFunc }) => (
              <button
                key={originalFunc + desc.substring(0, 5)}
                onClick={() => !matched && handleDescClick(originalFunc)}
                disabled={matched || !selectedFunc}
                className={`w-full p-3 rounded-lg border border-slate-200 text-left text-sm transition-all duration-200 h-full ${
                  matched ? 'bg-green-100 text-green-700 disabled:opacity-50' :
                  selectedFunc ? 'bg-white hover:bg-amber-100 cursor-pointer' : 'bg-slate-50 cursor-not-allowed'
                }`}
              >
                {desc}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};