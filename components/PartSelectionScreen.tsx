
import React, { useState } from 'react';
import type { LevelCompletionStatus, User } from '../types';
import { api } from '../api';
import { LockClosedIcon, BookOpenIcon, AcademicCapIcon, FireIcon, CpuChipIcon, TrophyIcon, StarIcon, WrenchScrewdriverIcon, Cog6ToothIcon, CircleStackIcon, BeakerIcon, SunIcon, SparklesIcon, CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

interface MembershipCTAProps {
  onVerify: (code: string) => void;
  isLoading: boolean;
  error: string;
  onCodeChange: () => void;
}

const MembershipCTA: React.FC<MembershipCTAProps> = ({ onVerify, isLoading, error, onCodeChange }) => {
  const [code, setCode] = useState('');

  const handleVerifyClick = () => {
    onVerify(code);
  };
  
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
    onCodeChange();
  }

  const benefits = [
      "Buka semua 100+ level pembelajaran progresif",
      "Akses tanpa batas ke 10+ mini-game di Arcade Mode",
      "Raih gelar dan sertifikat digital Grandmaster Excel"
  ];

  return (
    <div className="md:col-span-2 lg:col-span-5 bg-gradient-to-br from-slate-900 to-blue-900 text-white p-6 sm:p-8 rounded-3xl shadow-2xl overflow-hidden relative">
        <div 
            className="absolute top-0 left-0 w-full h-full bg-repeat opacity-5"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}
        ></div>

        <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
            {/* Left side: Benefits */}
            <div className="space-y-6 text-left">
                <div>
                    <h3 className="text-3xl lg:text-4xl font-bold tracking-tight">
                        Buka Potensi Penuh <span className="text-green-400">Excel</span> Anda
                    </h3>
                    <p className="mt-2 text-white/70">Tingkatkan dari pemula menjadi virtuoso dengan akses lengkap.</p>
                </div>
                <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <CheckCircleIcon className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5"/>
                            <span>{benefit}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right side: CTA */}
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl flex flex-col gap-6">
                <div className="text-center">
                    <h4 className="text-2xl font-bold">Jadi Member Premium</h4>
                    <p className="mt-1 text-white/80">Akses instan setelah checkout.</p>
                </div>

                <a
                    href="https://lynk.id/hariszaka/ymqj0pwpk6p8/checkout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-500 text-white font-bold px-6 py-4 rounded-lg shadow-lg hover:bg-green-600 transition-all transform hover:scale-105 flex items-center justify-center text-lg gap-2 ring-2 ring-white/20"
                >
                    Beli Membership Sekarang
                    <ArrowRightIcon className="w-5 h-5"/>
                </a>

                <div className="text-center">
                    <p className="text-sm text-white/80 mb-2">Sudah punya kode akses?</p>
                    <div className="flex flex-col sm:flex-row gap-2 w-full max-w-md mx-auto">
                        <input
                        type="text"
                        value={code}
                        onChange={handleCodeChange}
                        placeholder="Masukkan kode di sini..."
                        className="flex-grow p-3 bg-white/20 text-white border-2 border-white/30 rounded-lg focus:ring-2 focus:ring-green-400 transition placeholder:text-white/60"
                        disabled={isLoading}
                        aria-label="Access Code"
                        />
                        <button
                        onClick={handleVerifyClick}
                        disabled={isLoading || !code}
                        className="bg-white text-blue-800 font-bold px-6 py-3 rounded-lg shadow-md hover:bg-slate-200 transition transform hover:scale-105 disabled:bg-slate-300 disabled:cursor-not-allowed"
                        >
                        {isLoading ? 'Memverifikasi...' : 'Gunakan'}
                        </button>
                    </div>
                    {error && <p className="text-yellow-300 text-sm mt-2 text-center w-full">{error}</p>}
                </div>
            </div>
        </div>
    </div>
  );
};


const partData = [
    { id: 1, title: "Bagian 1", subtitle: "Dasar & Menengah", levels: "(Level 1-10)", icon: BookOpenIcon, color: "green" },
    { id: 2, title: "Bagian 2", subtitle: "Lanjutan & Ahli", levels: "(Level 11-20)", icon: AcademicCapIcon, color: "purple" },
    { id: 3, title: "Bagian 3", subtitle: "Master Mode", levels: "(Level 21-30)", icon: FireIcon, color: "red" },
    { id: 4, title: "Bagian 4", subtitle: "The Analyst’s Ascent", levels: "(Level 31-40)", icon: CpuChipIcon, color: "blue" },
    { id: 5, title: "Bagian 5", subtitle: "Grandmaster Analyst", levels: "(Level 41-50)", icon: TrophyIcon, color: "slate" },
    { id: 6, title: "Bagian 6", subtitle: "Data Wrangler", levels: "(Level 51-60)", icon: WrenchScrewdriverIcon, color: "cyan" },
    { id: 7, title: "Bagian 7", subtitle: "Automation Apprentice", levels: "(Level 61-70)", icon: Cog6ToothIcon, color: "indigo" },
    { id: 8, title: "Bagian 8", subtitle: "BI Specialist", levels: "(Level 71-80)", icon: CircleStackIcon, color: "teal" },
    { id: 9, title: "Bagian 9", subtitle: "Formula Architect", levels: "(Level 81-90)", icon: BeakerIcon, color: "orange" },
    { id: 10, title: "Bagian 10", subtitle: "Excel Virtuoso", levels: "(Level 91-100)", icon: SunIcon, color: "gray" },
] as const;

interface PartSelectionScreenProps {
  user: User;
  onSelectPart: (part: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10) => void;
  levelCompletion: LevelCompletionStatus;
  onBecomeMember: () => void;
  onGoToArcade: () => void;
}

export const PartSelectionScreen: React.FC<PartSelectionScreenProps> = ({ user, onSelectPart, levelCompletion, onBecomeMember, onGoToArcade }) => {
    const [isVerifying, setIsVerifying] = useState(false);
    const [codeError, setCodeError] = useState('');
    
    const isMember = user.isMember || user.isAdmin;
    const canEnterArcade = user.isAdmin || !!levelCompletion[9]; // Unlocked after completing part 1 (level index 9)

    const handleVerifyCode = async (accessCode: string) => {
        if (accessCode.trim() !== 'NN1q4E9F361kpiZqLptIEOnnL') {
            setCodeError('Kode akses tidak valid.');
            return;
        }

        setIsVerifying(true);
        setCodeError('');
        const { success } = await api.updateUserMembership(user.id, true);
        if (success) {
            onBecomeMember(); // Refetches user and re-renders
        } else {
            setCodeError('Gagal memverifikasi. Coba lagi.');
            setIsVerifying(false); // Only set back if it fails
        }
    };

    const isPartUnlockedByProgress = (partNumber: number): boolean => {
        if (partNumber === 1) return true;
        if (levelCompletion[-1]) return true; // Admin unlock
        const prevPartLastLevel = (partNumber - 1) * 10 - 1;
        return !!levelCompletion[prevPartLastLevel];
    };
    
    const colors = {
        green: { border: 'border-green-200', bg: 'bg-green-100', text: 'text-green-600' },
        purple: { border: 'border-purple-200', bg: 'bg-purple-100', text: 'text-purple-600' },
        red: { border: 'border-red-200', bg: 'bg-red-100', text: 'text-red-600' },
        blue: { border: 'border-blue-300', bg: 'bg-blue-100', text: 'text-blue-700' },
        slate: { border: 'border-slate-400', bg: 'bg-slate-200', text: 'text-slate-800' },
        cyan: { border: 'border-cyan-300', bg: 'bg-cyan-100', text: 'text-cyan-700' },
        indigo: { border: 'border-indigo-300', bg: 'bg-indigo-100', text: 'text-indigo-700' },
        teal: { border: 'border-teal-300', bg: 'bg-teal-100', text: 'text-teal-700' },
        orange: { border: 'border-orange-300', bg: 'bg-orange-100', text: 'text-orange-700' },
        gray: { border: 'border-gray-400', bg: 'bg-gray-200', text: 'text-gray-800' },
        locked: { border: 'border-slate-300', bg: 'bg-slate-300', text: 'text-slate-500' },
    };

    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-700 mb-8">Pilih Bagian Petualanganmu</h2>
            
            <div className="mb-10">
                <div 
                    onClick={canEnterArcade ? onGoToArcade : undefined}
                    className={`md:col-span-2 lg:col-span-5 p-6 rounded-2xl shadow-lg flex items-center justify-center gap-4 ring-4 ring-offset-2 ring-offset-blue-50 transition-all duration-300 ${
                        canEnterArcade 
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white ring-indigo-200 cursor-pointer hover:shadow-2xl hover:-translate-y-1'
                        : 'bg-slate-300 text-slate-500 ring-slate-200 cursor-not-allowed'
                    }`}
                >
                     {canEnterArcade ? (
                        <>
                            <SparklesIcon className="w-10 h-10 text-yellow-300 transform -rotate-12"/>
                            <div className="text-center">
                                <h3 className="text-2xl font-bold">Arcade Mode</h3>
                                <p className="mt-1 opacity-90 text-sm">Mainkan mini-game seru untuk istirahat!</p>
                            </div>
                            <SparklesIcon className="w-10 h-10 text-yellow-300 transform rotate-12"/>
                        </>
                     ) : (
                        <>
                            <LockClosedIcon className="w-8 h-8 text-slate-600"/>
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-slate-700">Arcade Mode</h3>
                                <p className="mt-1 text-sm font-semibold">Selesaikan Bagian 1 untuk membuka</p>
                            </div>
                            <LockClosedIcon className="w-8 h-8 text-slate-600"/>
                        </>
                     )}
                </div>
            </div>

            {!isMember && (
                <div className="mb-10">
                    <MembershipCTA onVerify={handleVerifyCode} isLoading={isVerifying} error={codeError} onCodeChange={() => setCodeError('')} />
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {partData.map(part => {
                    const progressUnlocked = isPartUnlockedByProgress(part.id);
                    const membershipRequired = part.id > 1;
                    const canAccess = !membershipRequired || isMember;
                    const isLocked = !progressUnlocked || !canAccess;
                    
                    const uiColors = isLocked ? colors.locked : colors[part.color];

                    let lockMessage = '';
                    if (isLocked) {
                        if (!canAccess) lockMessage = "Perlu Membership";
                        else lockMessage = `Selesaikan Bagian ${part.id - 1}`;
                    }

                    return (
                        <div
                            key={part.id}
                            onClick={() => !isLocked && onSelectPart(part.id)}
                            className={`p-6 rounded-2xl shadow-lg border-2 transition-all duration-300 flex flex-col items-center text-center 
                                ${!isLocked
                                ? `bg-white ${uiColors.border} hover:shadow-2xl hover:-translate-y-2 cursor-pointer`
                                : `bg-slate-200 ${uiColors.border} text-slate-500 cursor-not-allowed`
                                }
                            `}
                        >
                            <div className={`p-4 rounded-full mb-4 ${uiColors.bg}`}>
                                <part.icon className={`w-12 h-12 ${uiColors.text}`} />
                            </div>
                            <h3 className="text-xl font-bold mb-1">{part.title}</h3>
                            <p className="text-sm">{part.subtitle}</p>
                            <p className="text-xs mt-1 opacity-80">{part.levels}</p>
                            
                            {isLocked && (
                                <div className="mt-4 flex items-center gap-2 text-sm font-semibold">
                                    <LockClosedIcon className="w-4 h-4" />
                                    <span>{lockMessage}</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};