import React, { useState, useEffect } from 'react';
import { api } from '../api';
import type { User } from '../types';
import { levelData } from '../constants';
import { ArrowUturnLeftIcon, TrophyIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

interface RankedUser {
    id: string;
    rank: number;
    name: string;
    completedLevels: number;
    totalLevels: number;
    progressPercent: number;
    isCurrentUser: boolean;
    completedChampionships: number;
}

interface LeaderboardScreenProps {
    currentUser: User;
    onBack: () => void;
}

const ProgressBar: React.FC<{ value: number }> = ({ value }) => (
    <div className="w-full bg-slate-200 rounded-full h-2.5">
        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${Math.max(0, Math.min(100, value))}%` }}></div>
    </div>
);

export const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ currentUser, onBack }) => {
    const [rankedUsers, setRankedUsers] = useState<RankedUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            setIsLoading(true);
            setError('');
            try {
                const { users } = await api.getUsers();
                const totalLevels = levelData.length;

                const processedUsers = users
                    .filter(user => !user.isAdmin)
                    .map(user => {
                        const completedLevels = Object.values(user.progress).filter(p => p === true).length;
                        const completedChampionships = user.championshipsCompleted ? Object.values(user.championshipsCompleted).filter(c => c).length : 0;
                        return {
                            ...user,
                            completedLevels,
                            progressPercent: (completedLevels / totalLevels) * 100,
                            completedChampionships,
                        };
                    });

                processedUsers.sort((a, b) => {
                    if (a.completedLevels !== b.completedLevels) {
                        return b.completedLevels - a.completedLevels;
                    }
                    if (a.completedChampionships !== b.completedChampionships) {
                        return b.completedChampionships - a.completedChampionships;
                    }
                    const dateA = a.lastLoginAt || a.createdAt;
                    const dateB = b.lastLoginAt || b.createdAt;
                    return dateA - dateB;
                });

                const finalRankedList: RankedUser[] = processedUsers.map((user, index) => ({
                    id: user.id,
                    rank: index + 1,
                    name: user.fullName || user.id,
                    completedLevels: user.completedLevels,
                    totalLevels,
                    progressPercent: user.progressPercent,
                    isCurrentUser: user.id === currentUser.id,
                    completedChampionships: user.completedChampionships,
                }));

                setRankedUsers(finalRankedList);
            } catch (err) {
                setError('Gagal memuat papan peringkat. Coba lagi nanti.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLeaderboardData();
    }, [currentUser.id]);

    const getRankIcon = (rank: number) => {
        if (rank === 1) return <TrophyIcon className="w-7 h-7 text-amber-400" title="Peringkat 1" />;
        if (rank === 2) return <TrophyIcon className="w-7 h-7 text-slate-400" title="Peringkat 2" />;
        if (rank === 3) return <TrophyIcon className="w-7 h-7 text-orange-400" title="Peringkat 3" />;
        return <span className="font-bold text-slate-500 w-7 text-center text-lg">{rank}</span>;
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center py-20">
                    <ArrowPathIcon className="w-10 h-10 text-slate-400 animate-spin" />
                    <p className="mt-4 text-slate-500">Memuat peringkat...</p>
                </div>
            );
        }

        if (error) {
            return <p className="text-center py-20 text-red-500">{error}</p>;
        }

        return (
             <div className="flow-root">
                <ul role="list" className="-my-4 divide-y divide-slate-200">
                    {rankedUsers.map((user) => (
                        <li key={user.id} className={`flex items-center gap-4 sm:gap-6 px-2 py-4 ${user.isCurrentUser ? 'bg-green-100 rounded-lg' : ''}`}>
                            <div className="flex-shrink-0 w-8 flex justify-center">{getRankIcon(user.rank)}</div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-slate-800 truncate">{user.name}</p>
                                <div className="sm:hidden mt-1 space-y-1">
                                    <div className="text-xs text-slate-500">{user.completedLevels} / {user.totalLevels} Level</div>
                                    <div className="text-xs text-slate-500 flex items-center gap-1">
                                        <TrophyIcon className="w-3 h-3 text-amber-500" />
                                        {user.completedChampionships} Kejuaraan
                                    </div>
                                    <div className="mt-1">
                                        <ProgressBar value={user.progressPercent} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 hidden sm:flex items-center gap-4">
                                <div className="w-2/5">
                                    <ProgressBar value={user.progressPercent} />
                                </div>
                                <div className="w-1/5 text-xs text-slate-500 font-medium">{user.completedLevels}/{user.totalLevels}</div>
                                <div className="w-2/5 text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                                    <TrophyIcon className="w-4 h-4 text-amber-500" />
                                    <span>{user.completedChampionships} Selesai</span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Papan Peringkat</h2>
                    <p className="text-slate-600 mt-1">Lihat siapa petualang Excel terhebat!</p>
                </div>
                <button
                    onClick={onBack}
                    className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-colors"
                >
                    <ArrowUturnLeftIcon className="w-5 h-5" />
                    Menu Utama
                </button>
            </div>
            <div className="bg-white p-4 sm:p-8 rounded-xl shadow-lg border border-slate-200">
                <div className="hidden sm:flex items-center gap-4 sm:gap-6 px-2 py-2 text-xs font-bold text-slate-500 border-b mb-2">
                    <div className="w-8 text-center">#</div>
                    <div className="flex-1 min-w-0">Petualang</div>
                    <div className="flex-1 flex items-center gap-4">
                        <div className="w-2/5">Progres</div>
                        <div className="w-1/5">Level Selesai</div>
                        <div className="w-2/5">Kejuaraan</div>
                    </div>
                </div>
                {renderContent()}
            </div>
        </div>
    );
};