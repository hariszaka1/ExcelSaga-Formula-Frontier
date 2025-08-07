
import React, { useEffect } from 'react';
import { Mascot } from './Mascot';
import { MascotState } from '../types';
import { ArrowRightIcon, StarIcon, TrophyIcon } from '@heroicons/react/24/solid';

interface CongratulationsScreenProps {
  part: number;
  onContinue: () => void;
}

const partMessages: Record<number, { title: string; message: string }> = {
  1: {
    title: "Dasar & Menengah Ditaklukkan!",
    message: "Kerja bagus! Anda telah menguasai fondasi penting Excel. Ini adalah langkah pertama yang krusial. Sekarang, siapkan diri Anda untuk formula yang lebih canggih di bagian selanjutnya!",
  },
  2: {
    title: "Level Ahli Tercapai!",
    message: "Luar biasa! Anda telah membuktikan bahwa Anda bisa menangani fungsi-fungsi kompleks seperti INDEX-MATCH dan logika IFERROR. Kemampuan Anda berkembang pesat. Mode Master dengan tantangan yang lebih berat menanti Anda!",
  },
  3: {
    title: "Selamat, Master Excel!",
    message: "Anda telah menaklukkan fungsi dinamis dan teknik-teknik canggih. Anda sekarang berpikir seperti seorang analis. Jalur menuju Puncak Analis terbuka di depan Anda. Teruslah melangkah!",
  },
  4: {
    title: "Puncak Analis Telah Diraih!",
    message: "Luar biasa! Kemampuan Anda dalam membersihkan data, mengotomatisasi laporan, dan menggunakan formula kompleks sungguh mengesankan. Namun, ini bukanlah akhir. Ujian terakhir dari seorang Grandmaster menanti untuk menguji batas kemampuan Anda!",
  },
  5: {
    title: "Gelar Grandmaster di Depan Mata!",
    message: "Anda telah membuktikan diri sebagai Grandmaster Analyst! Kemampuan Anda dalam menggunakan formula array dinamis dan fungsi-fungsi canggih sangat mengesankan. Jalan sang Data Wrangler menanti!",
  },
  6: {
    title: "Data Telah Dijinakkan!",
    message: "Selamat, Data Wrangler! Anda telah membuktikan kemampuan Anda dalam membersihkan, mentransformasi, dan menyusun data yang paling berantakan sekalipun. Pintu menuju otomatisasi kini terbuka.",
  },
  7: {
    title: "Sang Murid Otomatisasi!",
    message: "Hebat! Anda tidak lagi melakukan pekerjaan manual yang berulang. Dengan VBA, Anda telah membuka kekuatan baru untuk mengotomatiskan tugas. Level selanjutnya akan menguji kecerdasan bisnis Anda.",
  },
  8: {
    title: "Spesialis BI Telah Lahir!",
    message: "Luar biasa! Anda telah menguasai DAX dan pemodelan data. Anda tidak hanya melaporkan data, tetapi juga menciptakan wawasan. Kini saatnya menjadi arsitek dari solusi Anda sendiri.",
  },
  9: {
    title: "Selamat, Arsitek Formula!",
    message: "Anda telah mencapai tingkat pemahaman formula yang mendalam, bahkan mampu menciptakan fungsi Anda sendiri dengan LAMBDA. Hanya ada satu puncak tersisa untuk ditaklukkan: Sang Maestro.",
  },
  10: {
    title: "EXCEL SAGA VIRTUOSO!",
    message: "GELAR VIRTUOSO ANDA RAIH! Selamat! Anda telah menaklukkan setiap tantangan, dari VLOOKUP dasar hingga integrasi VBA dan DAX yang rumit. Anda adalah seorang maestro sejati di dunia Formula Frontier. Kemampuan analisis dan pemecahan masalah Anda benar-benar tiada tanding!",
  },
};

const CONGRATS_SOUND_PATH = 'music/congrat.wav';

export const CongratulationsScreen: React.FC<CongratulationsScreenProps> = ({ part, onContinue }) => {
  const { title, message } = partMessages[part] || partMessages[10];
  const isFinalPart = part === 10;

  useEffect(() => {
    const audio = new Audio(CONGRATS_SOUND_PATH);
    audio.play().catch(error => console.error("Error playing congratulation sound:", error));
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className={`bg-white p-8 sm:p-12 rounded-2xl shadow-xl border-2 ${isFinalPart ? 'border-amber-400' : 'border-yellow-300'} max-w-2xl mx-auto text-center transform hover:scale-105 transition-transform duration-500 relative overflow-hidden`}>
        <div className={`absolute -top-4 -left-4 ${isFinalPart ? 'text-amber-300/50' : 'text-yellow-200/50'}`}>
            <StarIcon className="w-24 h-24 transform -rotate-12" />
        </div>
         <div className={`absolute -bottom-6 -right-6 ${isFinalPart ? 'text-amber-300/50' : 'text-green-200/50'}`}>
            <StarIcon className="w-32 h-32 transform rotate-12" />
        </div>
        <div className="relative z-10">
            {isFinalPart ? <TrophyIcon className="w-32 h-32 text-amber-400 mx-auto animate-bounce" /> : <Mascot state={MascotState.Celebrating} />}
            <h2 className={`text-3xl sm:text-4xl font-bold ${isFinalPart ? 'text-amber-600' : 'text-yellow-600'} font-press-start mt-4`}>{isFinalPart ? 'JUARA!' : `Selamat!`}</h2>
            <h3 className="text-2xl font-bold text-slate-700 mt-4">{title}</h3>
            <p className="text-slate-600 mt-3 max-w-md mx-auto">{message}</p>
            <button
            onClick={onContinue}
            className={`mt-8 inline-flex items-center justify-center gap-2 px-8 py-4 ${isFinalPart ? 'bg-amber-500 hover:bg-amber-600 focus:ring-amber-300' : 'bg-green-600 hover:bg-green-700 focus:ring-green-300'} text-white font-bold rounded-lg shadow-md transition-all transform hover:scale-110 focus:outline-none focus:ring-4`}
            >
            {isFinalPart ? 'Kembali ke Menu Utama' : 'Lanjutkan Petualangan'}
            <ArrowRightIcon className="w-5 h-5" />
            </button>
        </div>
      </div>
    </div>
  );
};
