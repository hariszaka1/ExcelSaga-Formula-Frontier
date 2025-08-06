
import React, { useState, useMemo, useCallback } from 'react';
import type { User } from '../types';
import { api } from '../api';
import { levelData } from '../constants';
import { ArrowUturnLeftIcon, UserCircleIcon, PhoneIcon, KeyIcon, CheckCircleIcon, XCircleIcon, StarIcon, EnvelopeIcon } from '@heroicons/react/24/solid';

interface ProfileScreenProps {
  user: User;
  onBack: () => void;
  onUpdateSuccess: (user: User) => void;
}

const ProgressBar: React.FC<{ value: number, color?: string }> = ({ value, color = 'bg-green-500' }) => {
    const clampedValue = Math.max(0, Math.min(100, value));
    return (
        <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div className={`${color} h-2.5 rounded-full`} style={{ width: `${clampedValue}%` }}></div>
        </div>
    );
};

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onBack, onUpdateSuccess }) => {
    // Profile Edit State
    const [fullName, setFullName] = useState(user.fullName || '');
    const [phone, setPhone] = useState(user.phone || '');
    const [email, setEmail] = useState(user.id);
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [profileFeedback, setProfileFeedback] = useState<{ type: 'success' | 'error', message: string} | null>(null);

    // Password Change State
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSavingPassword, setIsSavingPassword] = useState(false);
    const [passwordFeedback, setPasswordFeedback] = useState<{ type: 'success' | 'error', message: string} | null>(null);

    const progressStats = useMemo(() => {
        const completedCount = Object.values(user.progress).filter(p => typeof p === 'boolean' && p).length;
        const totalLevels = levelData.length;
        const overallPercentage = (completedCount / totalLevels) * 100;

        const partProgress = Array.from({ length: 10 }, (_, i) => {
            const partStartIndex = i * 10;
            const partEndIndex = partStartIndex + 9;
            let partCompleted = 0;
            for(let j = partStartIndex; j <= partEndIndex; j++) {
                if (user.progress[j]) {
                    partCompleted++;
                }
            }
            return {
                part: i + 1,
                completed: partCompleted,
                total: 10,
                percentage: (partCompleted / 10) * 100,
            };
        });

        return { completedCount, totalLevels, overallPercentage, partProgress };
    }, [user.progress]);

    const handleProfileUpdate = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSavingProfile(true);
        setProfileFeedback(null);
        try {
            const { success, user: updatedUser, error } = await api.updateUserProfile(user.id, { fullName, phone, email });
            if (success && updatedUser) {
                let message = 'Profil berhasil diperbarui!';
                if (user.id !== updatedUser.id) {
                    message = 'Profil & Email berhasil diperbarui! Sesi Anda telah diperbarui secara otomatis.'
                }
                setProfileFeedback({ type: 'success', message });
                onUpdateSuccess(updatedUser);
            } else {
                throw new Error(error || 'Gagal memperbarui profil.');
            }
        } catch (err: any) {
            setProfileFeedback({ type: 'error', message: `Gagal: ${err.message}` });
        } finally {
            setIsSavingProfile(false);
            setTimeout(() => setProfileFeedback(null), 5000);
        }
    }, [user.id, fullName, phone, email, onUpdateSuccess]);

    const handlePasswordUpdate = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setPasswordFeedback({ type: 'error', message: 'Konfirmasi password baru tidak cocok.' });
            return;
        }
        setIsSavingPassword(true);
        setPasswordFeedback(null);
        try {
            const { success, error } = await api.updateUserPassword(user.id, currentPassword, newPassword);
            if (success) {
                setPasswordFeedback({ type: 'success', message: 'Password berhasil diubah!' });
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                throw new Error(error || 'Gagal mengubah password.');
            }
        } catch (err: any) {
            setPasswordFeedback({ type: 'error', message: `Gagal: ${err.message}` });
        } finally {
            setIsSavingPassword(false);
            setTimeout(() => setPasswordFeedback(null), 5000);
        }
    }, [user.id, currentPassword, newPassword, confirmPassword]);

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <div className="flex items-center gap-4 mb-1">
                        <h2 className="text-2xl font-bold text-slate-800">Profil Pengguna</h2>
                        {user.isMember && (
                            <span className="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                                <StarIcon className="w-4 h-4"/>
                                MEMBER
                            </span>
                        )}
                    </div>
                    <p className="text-slate-600">Kelola informasi dan lihat progres Anda.</p>
                </div>
                <button
                    onClick={onBack}
                    className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-colors"
                >
                    <ArrowUturnLeftIcon className="w-5 h-5" />
                    Kembali ke Game
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Progress Section */}
                <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Progres Petualangan</h3>
                    <div className="text-center mb-4">
                        <p className="text-4xl font-bold text-green-600">{progressStats.completedCount}<span className="text-2xl text-slate-500">/{progressStats.totalLevels}</span></p>
                        <p className="text-sm text-slate-600">Level Selesai</p>
                    </div>
                    <ProgressBar value={progressStats.overallPercentage} />
                    <div className="space-y-3 mt-6">
                        {progressStats.partProgress.map(part => (
                            <div key={part.part}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-semibold text-slate-600">Bagian {part.part}</span>
                                    <span className="text-slate-500">{part.completed}/{part.total}</span>
                                </div>
                                <ProgressBar value={part.percentage} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Settings Section */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Edit Profile */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                        <h3 className="text-lg font-bold text-slate-800 mb-4">Ubah Profil</h3>
                        <form onSubmit={handleProfileUpdate} className="space-y-4">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1">
                                    <UserCircleIcon className="w-4 h-4 inline-block mr-1 align-text-bottom" />
                                    Nama Lengkap
                                </label>
                                <input id="fullName" type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Masukkan nama lengkap" className="w-full p-2 bg-white text-black border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500" required disabled={isSavingProfile}/>
                            </div>
                             <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                                    <PhoneIcon className="w-4 h-4 inline-block mr-1 align-text-bottom" />
                                    Nomor HP
                                </label>
                                <input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Masukkan nomor HP" className="w-full p-2 bg-white text-black border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500" required disabled={isSavingProfile}/>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                                    <EnvelopeIcon className="w-4 h-4 inline-block mr-1 align-text-bottom" />
                                    Email
                                </label>
                                <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Masukkan email" className="w-full p-2 bg-white text-black border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500" required disabled={isSavingProfile}/>
                            </div>
                            <div className="flex items-center gap-4">
                               <button type="submit" className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:bg-green-400" disabled={isSavingProfile}>
                                    {isSavingProfile ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                                {profileFeedback && (
                                    <div className={`flex items-center gap-2 text-sm font-semibold ${profileFeedback.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                                        {profileFeedback.type === 'success' ? <CheckCircleIcon className="w-5 h-5" /> : <XCircleIcon className="w-5 h-5" />}
                                        <span>{profileFeedback.message}</span>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Change Password (only for password users) */}
                    {user.type === 'password' && (
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">Ubah Password</h3>
                            <form onSubmit={handlePasswordUpdate} className="space-y-4">
                                <div>
                                    <label htmlFor="currentPassword" className="block text-sm font-medium text-slate-700 mb-1">
                                        <KeyIcon className="w-4 h-4 inline-block mr-1 align-text-bottom" />
                                        Password Saat Ini
                                    </label>
                                    <input id="currentPassword" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full p-2 bg-white text-black border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500" required disabled={isSavingPassword}/>
                                </div>
                                <div>
                                    <label htmlFor="newPassword" className="block text-sm font-medium text-slate-700 mb-1">Password Baru</label>
                                    <input id="newPassword" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Minimal 6 karakter" className="w-full p-2 bg-white text-black border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500" required disabled={isSavingPassword}/>
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1">Konfirmasi Password Baru</label>
                                    <input id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full p-2 bg-white text-black border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500" required disabled={isSavingPassword}/>
                                </div>
                                {newPassword && confirmPassword && newPassword !== confirmPassword && (
                                    <p className="text-xs text-red-500">Konfirmasi password tidak cocok.</p>
                                )}
                                <div className="flex items-center gap-4">
                                    <button type="submit" className="px-4 py-2 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition disabled:bg-sky-400" disabled={isSavingPassword || newPassword.length < 6 || newPassword !== confirmPassword}>
                                        {isSavingPassword ? 'Menyimpan...' : 'Ubah Password'}
                                    </button>
                                     {passwordFeedback && (
                                        <div className={`flex items-center gap-2 text-sm font-semibold ${passwordFeedback.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                                            {passwordFeedback.type === 'success' ? <CheckCircleIcon className="w-5 h-5" /> : <XCircleIcon className="w-5 h-5" />}
                                            <span>{passwordFeedback.message}</span>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
