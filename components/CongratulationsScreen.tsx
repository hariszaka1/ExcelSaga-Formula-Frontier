
import React from 'react';
import { Mascot } from './Mascot';
import { MascotState } from '../types';
import { ArrowRightIcon, StarIcon } from '@heroicons/react/24/solid';

interface CongratulationsScreenProps {
  part: number;
  onContinue: () => void;
}

const partMessages: Record<number, { title: string; message: string }> = {
  1: {
    title: "Dasar & Menengah Ditaklukkan!",
    message: "Anda telah membuktikan kemampuan dasar Excel Anda. Siapkan diri untuk tantangan yang lebih besar di bagian selanjutnya!",
  },
  2: {
    title: "Level Ahli Tercapai!",
    message: "Luar biasa! Formula-formula lanjutan kini ada dalam genggaman Anda. Master Mode menanti!",
  },
  3: {
    title: "Selamat, Master Excel!",
    message: "Anda telah melewati tantangan mahir. Hanya para analis terbaik yang bisa melangkah dari sini. Apakah Anda salah satunya?",
  },
  4: {
    title: "Puncak Analis Telah Diraih!",
    message: "Selamat, Excel Sage! Anda telah menguasai semua tantangan dan mencapai puncak Formula Frontier. Kemampuan analisis Anda tiada tanding!",
  },
};

export const CongratulationsScreen: React.FC<CongratulationsScreenProps> = ({ part, onContinue }) => {
  const { title, message } = partMessages[part] || partMessages[4];

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-xl border-2 border-yellow-300 max-w-2xl mx-auto text-center transform hover:scale-105 transition-transform duration-500 relative overflow-hidden">
        <div className="absolute -top-4 -left-4 text-yellow-200/50">
            <StarIcon className="w-24 h-24 transform -rotate-12" />
        </div>
         <div className="absolute -bottom-6 -right-6 text-green-200/50">
            <StarIcon className="w-32 h-32 transform rotate-12" />
        </div>
        <div className="relative z-10">
            <Mascot state={MascotState.Celebrating} />
            <h2 className="text-3xl sm:text-4xl font-bold text-yellow-600 font-press-start mt-4">{`Selamat!`}</h2>
            <h3 className="text-2xl font-bold text-slate-700 mt-4">{title}</h3>
            <p className="text-slate-600 mt-3 max-w-md mx-auto">{message}</p>
            <button
            onClick={onContinue}
            className="mt-8 inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition-all transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300"
            >
            Lanjutkan Petualangan
            <ArrowRightIcon className="w-5 h-5" />
            </button>
        </div>
      </div>
    </div>
  );
};