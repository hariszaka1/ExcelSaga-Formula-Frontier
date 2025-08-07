import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { api } from '../api';
import type { User, LevelCompletionStatus, CertificateRecord, CertificateSettings, PasswordPolicy } from '../types';
import { levelData } from '../constants';
import { ArrowUturnLeftIcon, UserCircleIcon, UsersIcon, ChartPieIcon, UserPlusIcon, ArrowDownTrayIcon, KeyIcon, ArrowPathIcon, EllipsisVerticalIcon, CheckCircleIcon, XCircleIcon, StarIcon, TrashIcon, TrophyIcon, EyeIcon, PaintBrushIcon, DocumentTextIcon, PencilSquareIcon, PhoneIcon, ShieldCheckIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';
import { CertificateTemplate } from './CertificateTemplate';


const getOpenProgressStatus = (): LevelCompletionStatus => {
    const progress = levelData.reduce((acc, _, index) => {
        acc[index] = false; // Set all levels to not completed by default
        return acc;
    }, {} as LevelCompletionStatus);
    progress[-1] = true; // Add special flag to unlock all levels
    return progress;
};

const getResetProgressStatus = (): LevelCompletionStatus => {
    return levelData.reduce((acc, _, index) => {
        acc[index] = false;
        return acc;
    }, {} as LevelCompletionStatus);
};

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; color: string }> = ({ title, value, icon, color }) => (
  <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-200 flex items-center gap-4">
    <div className={`p-3 rounded-full ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

const CertificatePreviewModal: React.FC<{ certificate: CertificateRecord, onClose: () => void }> = ({ certificate, onClose }) => {
    const certificateRef = useRef<HTMLDivElement>(null);
    const [settings, setSettings] = useState<CertificateSettings | null>(null);

    useEffect(() => {
        api.getCertificateSettings().then(res => {
            setSettings(res.settings);
        });
    }, []);

    const handleDownloadPdf = useCallback(async () => {
        if (!certificateRef.current) return;
        try {
            const dataUrl = await toPng(certificateRef.current, { 
                quality: 0.98, 
                pixelRatio: 3,
                cacheBust: true,
            });
            const pdf = new jsPDF('landscape', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
            const safeUserName = certificate.userName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            pdf.save(`sertifikat-excel-saga-${safeUserName}.pdf`);
        } catch (err) {
            console.error('Gagal mengunduh sertifikat:', err);
            alert('Maaf, terjadi kesalahan saat mencoba mengunduh sertifikat.');
        }
    }, [certificate]);

    const handleDownloadPng = useCallback(async () => {
        if (!certificateRef.current) return;
        try {
            const dataUrl = await toPng(certificateRef.current, { quality: 0.98, cacheBust: true });
            const link = document.createElement('a');
            const safeUserName = certificate.userName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            link.download = `sertifikat-excel-saga-${safeUserName}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Gagal mengunduh sertifikat PNG:', err);
            alert('Maaf, terjadi kesalahan saat mencoba mengunduh sertifikat.');
        }
    }, [certificate]);

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
                <div className="absolute -top-5 right-0 flex gap-2 z-20">
                    <button 
                        onClick={handleDownloadPng} 
                        className="bg-white/80 p-2 rounded-full text-slate-700 hover:text-sky-600 transition-transform hover:scale-110" 
                        aria-label="Unduh Sertifikat (PNG)"
                        title="Unduh Sertifikat (PNG)"
                    >
                        <ArrowDownTrayIcon className="w-8 h-8"/>
                    </button>
                    <button 
                        onClick={handleDownloadPdf} 
                        className="bg-white/80 p-2 rounded-full text-slate-700 hover:text-green-600 transition-transform hover:scale-110" 
                        aria-label="Unduh Sertifikat (PDF)"
                        title="Unduh Sertifikat (PDF)"
                    >
                        <ArrowDownTrayIcon className="w-8 h-8"/>
                    </button>
                    <button onClick={onClose} className="bg-white/80 p-1 rounded-full text-slate-700 hover:text-red-600 transition-transform hover:scale-110" aria-label="Tutup pratinjau">
                        <XCircleIcon className="w-10 h-10"/>
                    </button>
                </div>
                <div ref={certificateRef}>
                    {settings ? (
                        <CertificateTemplate certificate={certificate} settings={settings} />
                    ) : (
                        <div className="bg-white aspect-[1.414] flex items-center justify-center">
                            <p className="text-slate-500 animate-pulse">Memuat pratinjau...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const CertificateSettingsEditor: React.FC = () => {
    const [settings, setSettings] = useState<CertificateSettings | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [feedback, setFeedback] = useState<{type: 'success' | 'error', message: string} | null>(null);
    const previewRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        api.getCertificateSettings().then(res => {
            setSettings(res.settings);
            setIsLoading(false);
        });
    }, []);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if(settings) {
            setSettings({...settings, [name]: value });
        }
    };
    
    const handleSave = async () => {
        if (!settings) return;
        setIsSaving(true);
        setFeedback(null);
        try {
            const { success, error } = await api.updateCertificateSettings(settings);
            if (success) {
                setFeedback({type: 'success', message: 'Pengaturan berhasil disimpan!'});
            } else {
                throw new Error(error || 'Gagal menyimpan pengaturan.');
            }
        } catch (err: any) {
            setFeedback({type: 'error', message: `Gagal: ${err.message}`});
        } finally {
            setIsSaving(false);
            setTimeout(() => setFeedback(null), 5000);
        }
    };

    const handleDownloadPreviewPdf = useCallback(async () => {
        if (!previewRef.current) return;
        try {
            const dataUrl = await toPng(previewRef.current, { 
                quality: 0.98,
                pixelRatio: 3,
                cacheBust: true,
            });
            const pdf = new jsPDF('landscape', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('pratinjau-sertifikat-excel-saga.pdf');
        } catch (err) {
            console.error('Gagal mengunduh pratinjau:', err);
        }
    }, []);

    const handleDownloadPreviewPng = useCallback(async () => {
        if (!previewRef.current) return;
        try {
            const dataUrl = await toPng(previewRef.current, { quality: 0.98, cacheBust: true });
            const link = document.createElement('a');
            link.download = 'pratinjau-sertifikat-excel-saga.png';
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Gagal mengunduh pratinjau PNG:', err);
            alert('Gagal mengunduh pratinjau PNG.');
        }
    }, []);

    if (isLoading) {
        return <p className="text-center text-slate-500 py-10">Memuat editor...</p>;
    }
    
    if (!settings) {
        return <p className="text-center text-red-500 py-10">Gagal memuat pengaturan sertifikat.</p>;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-slate-700">Judul Utama</label>
                        <input type="text" id="title" name="title" value={settings.title} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border-2 bg-white text-black" />
                    </div>
                    <div>
                        <label htmlFor="congratsText" className="block text-sm font-medium text-slate-700">Teks Gelar</label>
                        <input type="text" id="congratsText" name="congratsText" value={settings.congratsText} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border-2 bg-white text-black" />
                    </div>
                </div>
                <div>
                    <label htmlFor="awardText" className="block text-sm font-medium text-slate-700">Teks Penghargaan (mendukung tag &lt;strong&gt;)</label>
                    <textarea id="awardText" name="awardText" value={settings.awardText} onChange={handleInputChange} rows={3} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border-2 bg-white text-black" />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="primaryColor" className="block text-sm font-medium text-slate-700">Warna Primer</label>
                        <input type="color" id="primaryColor" name="primaryColor" value={settings.primaryColor} onChange={handleInputChange} className="mt-1 block w-full h-10 rounded-md border-slate-300" />
                    </div>
                    <div>
                        <label htmlFor="secondaryColor" className="block text-sm font-medium text-slate-700">Warna Sekunder</label>
                        <input type="color" id="secondaryColor" name="secondaryColor" value={settings.secondaryColor} onChange={handleInputChange} className="mt-1 block w-full h-10 rounded-md border-slate-300" />
                    </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="signerName" className="block text-sm font-medium text-slate-700">Nama Penanda Tangan</label>
                        <input type="text" id="signerName" name="signerName" value={settings.signerName} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border-2 bg-white text-black" />
                    </div>
                    <div>
                        <label htmlFor="signerTitle" className="block text-sm font-medium text-slate-700">Jabatan Penanda Tangan</label>
                        <input type="text" id="signerTitle" name="signerTitle" value={settings.signerTitle} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border-2 bg-white text-black" />
                    </div>
                </div>
                <div className="flex items-center gap-4 pt-4">
                    <button onClick={handleSave} disabled={isSaving} className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-slate-400">
                        {isSaving ? 'Menyimpan...' : 'Simpan Pengaturan'}
                    </button>
                    {feedback && (
                        <div className={`flex items-center gap-2 text-sm font-semibold ${feedback.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                            {feedback.type === 'success' ? <CheckCircleIcon className="w-5 h-5" /> : <XCircleIcon className="w-5 h-5" />}
                            <span>{feedback.message}</span>
                        </div>
                    )}
                </div>
            </div>
            <div>
                 <h4 className="text-lg font-bold text-slate-800 mb-2">Pratinjau Langsung</h4>
                 <div className="shadow-lg">
                    <div ref={previewRef}>
                        <CertificateTemplate 
                            certificate={{ id: 'CERT-PREVIEW-ID', userName: 'Nama Pengguna', issuedAt: Date.now(), userId: 'preview-user' }}
                            settings={settings}
                        />
                    </div>
                 </div>
                 <div className="mt-4 flex flex-wrap gap-2">
                    <button onClick={handleDownloadPreviewPng} className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white text-sm font-semibold rounded-md hover:bg-sky-600 transition-colors">
                        <ArrowDownTrayIcon className="w-5 h-5"/>
                        Unduh Pratinjau (PNG)
                    </button>
                    <button onClick={handleDownloadPreviewPdf} className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-md hover:bg-green-600 transition-colors">
                        <ArrowDownTrayIcon className="w-5 h-5"/>
                        Unduh Pratinjau (PDF)
                    </button>
                 </div>
            </div>
        </div>
    );
};

const PasswordPolicyEditor: React.FC = () => {
    const [policy, setPolicy] = useState<PasswordPolicy | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [feedback, setFeedback] = useState<{type: 'success' | 'error', message: string} | null>(null);

    useEffect(() => {
        api.getPasswordPolicy().then(res => {
            setPolicy(res.policy);
            setIsLoading(false);
        });
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        if (policy) {
            setPolicy({
                ...policy,
                [name]: type === 'checkbox' ? checked : parseInt(value, 10)
            });
        }
    };

    const handleSave = async () => {
        if (!policy) return;
        setIsSaving(true);
        setFeedback(null);
        try {
            const { success, error } = await api.updatePasswordPolicy(policy);
            if (success) {
                setFeedback({type: 'success', message: 'Kebijakan password berhasil disimpan!'});
            } else {
                throw new Error(error || 'Gagal menyimpan kebijakan.');
            }
        } catch (err: any) {
            setFeedback({type: 'error', message: `Gagal: ${err.message}`});
        } finally {
            setIsSaving(false);
            setTimeout(() => setFeedback(null), 5000);
        }
    };

    if (isLoading) {
        return <p className="text-center text-slate-500 py-10">Memuat kebijakan...</p>;
    }
    
    if (!policy) {
        return <p className="text-center text-red-500 py-10">Gagal memuat kebijakan password.</p>;
    }

    return (
        <div className="space-y-4 max-w-lg">
            <div>
                <label htmlFor="minLength" className="block text-sm font-medium text-slate-700">Panjang Minimal</label>
                <input type="number" id="minLength" name="minLength" value={policy.minLength} onChange={handleInputChange} className="mt-1 block w-24 rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border-2 bg-white text-black" min="4" max="20" />
            </div>
            <div className="flex items-center">
                <input id="requireUppercase" name="requireUppercase" type="checkbox" checked={policy.requireUppercase} onChange={handleInputChange} className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                <label htmlFor="requireUppercase" className="ml-3 block text-sm font-medium text-slate-700">Wajib Huruf Besar (A-Z)</label>
            </div>
            <div className="flex items-center">
                <input id="requireNumber" name="requireNumber" type="checkbox" checked={policy.requireNumber} onChange={handleInputChange} className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                <label htmlFor="requireNumber" className="ml-3 block text-sm font-medium text-slate-700">Wajib Angka (0-9)</label>
            </div>
            <div className="flex items-center">
                <input id="requireSpecialChar" name="requireSpecialChar" type="checkbox" checked={policy.requireSpecialChar} onChange={handleInputChange} className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                <label htmlFor="requireSpecialChar" className="ml-3 block text-sm font-medium text-slate-700">Wajib Karakter Spesial (!@#$...)</label>
            </div>
            <p className="text-xs text-slate-500 italic">Catatan: Perubahan kebijakan ini hanya untuk tujuan demonstrasi dan tidak akan diterapkan pada form pendaftaran saat ini.</p>
            <div className="flex items-center gap-4 pt-4">
                <button onClick={handleSave} disabled={isSaving} className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-slate-400">
                    {isSaving ? 'Menyimpan...' : 'Simpan Kebijakan'}
                </button>
                {feedback && (
                    <div className={`flex items-center gap-2 text-sm font-semibold ${feedback.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                        {feedback.type === 'success' ? <CheckCircleIcon className="w-5 h-5" /> : <XCircleIcon className="w-5 h-5" />}
                        <span>{feedback.message}</span>
                    </div>
                )}
            </div>
        </div>
    );
};


interface AdminPanelProps {
  user: User;
  onBack: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ user, onBack }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'certificates' | 'settings'>('dashboard');

  const [users, setUsers] = useState<User[]>([]);
  const [certificates, setCertificates] = useState<CertificateRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordFeedback, setPasswordFeedback] = useState('');
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  const [openActionMenuFor, setOpenActionMenuFor] = useState<string | null>(null);
  const [updatingUserFor, setUpdatingUserFor] = useState<string | null>(null);
  const [actionFeedback, setActionFeedback] = useState<{ type: 'success' | 'error', message: string} | null>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);
  
  const [viewingCertificate, setViewingCertificate] = useState<CertificateRecord | null>(null);

  // Modal States
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [resettingPasswordForUser, setResettingPasswordForUser] = useState<User | null>(null);
  const [modalFeedback, setModalFeedback] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const [editFullName, setEditFullName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [isSavingUser, setIsSavingUser] = useState(false);
  const [newPasswordForReset, setNewPasswordForReset] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  // Add User Modal States
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserIsMember, setNewUserIsMember] = useState(false);

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    try {
      const [userResponse, certResponse] = await Promise.all([
        api.getUsers(),
        api.getCertificates(),
      ]);

      const sortedUsers = userResponse.users.sort((a, b) => {
          if (a.isAdmin) return -1;
          if (b.isAdmin) return 1;
          const lastLoginA = a.lastLoginAt || a.createdAt;
          const lastLoginB = b.lastLoginAt || b.createdAt;
          return lastLoginB - lastLoginA;
      });
      setUsers(sortedUsers);
      setCertificates(certResponse.certificates);
    } catch (err) {
      setError('Gagal memuat data pengguna atau sertifikat.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'dashboard' || activeTab === 'users' || activeTab === 'certificates') {
        fetchAllData();
    }
  }, [fetchAllData, activeTab]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openActionMenuFor && actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
        setOpenActionMenuFor(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openActionMenuFor]);
  
  useEffect(() => {
    if (editingUser) {
        setEditFullName(editingUser.fullName || '');
        setEditPhone(editingUser.phone || '');
        setModalFeedback(null);
    }
  }, [editingUser]);

  useEffect(() => {
    if (resettingPasswordForUser) {
        setNewPasswordForReset('');
        setModalFeedback(null);
    }
  }, [resettingPasswordForUser]);

  const dashboardStats = useMemo(() => {
    if (!users.length) {
      return {
        totalUsers: 0,
        membershipUsers: 0,
        standardUsers: 0,
        avgProgress: "0.0",
        levelCompletionCounts: [],
        maxCompletions: 0,
        dailyNewUsers: 0,
        userSignupsLast7Days: [],
        dayLabels: [],
        maxSignups: 1,
        totalCerts: 0,
      };
    }

    const totalLevels = levelData.length;
    const levelCounts = new Array(totalLevels).fill(0);
    let totalProgressSum = 0;
    let membershipUsers = 0;
    let standardUsers = 0;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const oneDay = 24 * 60 * 60 * 1000;
    
    let dailyNewUsers = 0;
    const userSignupsLast7Days = Array(7).fill(0);
    const dayLabels = Array(7).fill('');

    users.forEach(u => {
      // Progress stats
      const completedLevels = Object.values(u.progress).filter(p => typeof p === 'boolean' && p).length;
      totalProgressSum += (completedLevels / totalLevels) * 100;
      Object.entries(u.progress).forEach(([levelIndex, isCompleted]) => {
        const idx = parseInt(levelIndex, 10);
        if (isCompleted && idx >= 0 && idx < totalLevels) {
          levelCounts[idx]++;
        }
      });
      
      // Membership status stats
      if (u.isMember) {
        membershipUsers++;
      } else {
        standardUsers++;
      }
      
      // Signup stats
      const signupDate = new Date(u.createdAt);
      if (signupDate >= today) {
        dailyNewUsers++;
      }
      const diffDays = Math.floor((today.getTime() - new Date(signupDate).setHours(0,0,0,0)) / oneDay);
      if (diffDays >= 0 && diffDays < 7) {
        userSignupsLast7Days[6 - diffDays]++;
      }
    });

    const avgProgress = users.length > 0 ? totalProgressSum / users.length : 0;
    const maxCompletions = levelCounts.length > 0 ? Math.max(...levelCounts, 1) : 1;

    for (let i = 0; i < 7; i++) {
        const d = new Date(today.getTime() - (6 - i) * oneDay);
        dayLabels[i] = d.toLocaleDateString('id-ID', { weekday: 'short' });
    }
    const maxSignups = Math.max(...userSignupsLast7Days, 1);

    return {
      totalUsers: users.length,
      membershipUsers,
      standardUsers,
      avgProgress: avgProgress.toFixed(1),
      levelCompletionCounts: levelCounts,
      maxCompletions,
      dailyNewUsers,
      userSignupsLast7Days,
      dayLabels,
      maxSignups,
      totalCerts: certificates.length,
    };
  }, [users, certificates]);

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setPasswordFeedback('Gagal: Konfirmasi password baru tidak cocok.');
      return;
    }
    setIsSavingPassword(true);
    setPasswordFeedback('');
    try {
      const { success, error } = await api.updateAdminPassword(user.id, oldPassword, newPassword);
      if (success) {
        setPasswordFeedback('Password admin berhasil diperbarui!');
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      } else {
        throw new Error(error || 'Gagal memperbarui password.');
      }
    } catch (err: any) {
      setPasswordFeedback(`Gagal: ${err.message}`);
    } finally {
      setIsSavingPassword(false);
      setTimeout(() => setPasswordFeedback(''), 5000);
    }
  };

  const handleUpdateProgress = async (userId: string, progress: LevelCompletionStatus) => {
    setUpdatingUserFor(userId);
    setActionFeedback(null);
    try {
        const { success } = await api.saveProgress(userId, progress);
        if (success) {
            setActionFeedback({ type: 'success', message: 'Progres pengguna berhasil diperbarui!' });
            await fetchAllData();
        } else {
            throw new Error('Gagal memperbarui progres.');
        }
    } catch (err: any) {
        setActionFeedback({ type: 'error', message: err.message });
    } finally {
        setUpdatingUserFor(null);
        setOpenActionMenuFor(null);
    }
  };

  const handleToggleMembership = async (userId: string, isMember: boolean) => {
    setUpdatingUserFor(userId);
    setActionFeedback(null);
    try {
        const { success, error } = await api.updateUserMembership(userId, isMember);
        if (success) {
            setActionFeedback({ type: 'success', message: `Membership pengguna berhasil ${isMember ? 'diberikan' : 'dihapus'}!` });
            await fetchAllData();
        } else {
            throw new Error(error || 'Gagal mengubah status membership.');
        }
    } catch (err: any) {
        setActionFeedback({ type: 'error', message: err.message });
    } finally {
        setUpdatingUserFor(null);
        setOpenActionMenuFor(null);
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (window.confirm(`Anda yakin ingin menghapus pengguna "${userName || userId}"? Tindakan ini tidak dapat diurungkan.`)) {
        setUpdatingUserFor(userId);
        setActionFeedback(null);
        try {
            const { success, error } = await api.deleteUser(userId);
            if (success) {
                setActionFeedback({ type: 'success', message: 'Pengguna berhasil dihapus.' });
                await fetchAllData();
            } else {
                throw new Error(error || 'Gagal menghapus pengguna.');
            }
        } catch (err: any) {
            setActionFeedback({ type: 'error', message: err.message });
        } finally {
            setUpdatingUserFor(null);
            setOpenActionMenuFor(null);
        }
    }
  };

  const handleCreateCertificate = async (userId: string, userName: string) => {
    setUpdatingUserFor(userId);
    setActionFeedback(null);
    try {
        const { certificate, error } = await api.createCertificate(userId, userName);
        if (error) {
            throw new Error(error);
        }
        if (certificate) {
            setActionFeedback({ type: 'success', message: 'Sertifikat berhasil dibuat!' });
            await fetchAllData();
        } else {
            throw new Error('Gagal membuat sertifikat karena alasan yang tidak diketahui.');
        }
    } catch (err: any) {
        setActionFeedback({ type: 'error', message: err.message });
    } finally {
        setUpdatingUserFor(null);
        setOpenActionMenuFor(null);
    }
  };

  const handleDeleteCertificate = async (userId: string) => {
      if (window.confirm('Anda yakin ingin menghapus sertifikat pengguna ini?')) {
          setUpdatingUserFor(userId);
          setActionFeedback(null);
          try {
              const { success, error } = await api.deleteCertificate(userId);
              if (success) {
                  setActionFeedback({ type: 'success', message: 'Sertifikat berhasil dihapus.' });
                  await fetchAllData();
              } else {
                  throw new Error(error || 'Gagal menghapus sertifikat.');
              }
          } catch (err: any) {
              setActionFeedback({ type: 'error', message: err.message });
          } finally {
              setUpdatingUserFor(null);
              setOpenActionMenuFor(null);
          }
      }
  };

  const handleEditUserSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!editingUser) return;
      setIsSavingUser(true);
      setModalFeedback(null);
      try {
          const { success, error } = await api.updateUserProfile(editingUser.id, {fullName: editFullName, phone: editPhone, email: editingUser.id});
          if (success) {
              setModalFeedback({type: 'success', message: 'Profil berhasil diperbarui!'});
              await fetchAllData();
              setTimeout(() => {
                  setEditingUser(null);
              }, 1500);
          } else {
              throw new Error(error || 'Gagal memperbarui profil.');
          }
      } catch (err: any) {
          setModalFeedback({type: 'error', message: err.message});
      } finally {
          setIsSavingUser(false);
      }
  };

  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!resettingPasswordForUser) return;
      setIsResettingPassword(true);
      setModalFeedback(null);
      try {
          const { success, error } = await api.adminResetPassword(resettingPasswordForUser.id, newPasswordForReset);
          if (success) {
              setModalFeedback({type: 'success', message: 'Password berhasil direset!'});
              setTimeout(() => {
                  setResettingPasswordForUser(null);
              }, 1500);
          } else {
              throw new Error(error || 'Gagal mereset password.');
          }
      } catch (err: any) {
          setModalFeedback({type: 'error', message: err.message});
      } finally {
          setIsResettingPassword(false);
      }
  };

  const handleAddNewUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingUser(true);
    setModalFeedback(null);
    try {
        const { user, error } = await api.adminCreateUser({
            fullName: newUserName,
            phone: newUserPhone,
            email: newUserEmail,
            password_input: newUserPassword,
            isMember: newUserIsMember
        });
        if (user) {
            setModalFeedback({ type: 'success', message: 'Pengguna baru berhasil dibuat!' });
            await fetchAllData();
            setTimeout(() => {
                setIsAddUserModalOpen(false);
                // Reset form fields
                setNewUserName('');
                setNewUserEmail('');
                setNewUserPhone('');
                setNewUserPassword('');
                setNewUserIsMember(false);
            }, 1500);
        } else {
            throw new Error(error || 'Gagal membuat pengguna baru.');
        }
    } catch (err: any) {
        setModalFeedback({ type: 'error', message: err.message });
    } finally {
        setIsCreatingUser(false);
    }
  };

  const handleExportUsers = () => {
    const header = ['ID (Email)', 'Nama Lengkap', 'No. HP', 'Tipe Akun', 'Progres (%)', 'Level Selesai', 'Member', 'Tanggal Daftar', 'Login Terakhir'];
    const totalLevels = levelData.length;
    
    const rows = users.map(u => {
      const completedCount = Object.values(u.progress).filter(p => p === true).length;
      const progressPercent = ((completedCount / totalLevels) * 100).toFixed(1);
      const row = [
        u.id,
        u.fullName || '-',
        u.phone || '-',
        u.type,
        progressPercent,
        completedCount,
        u.isMember ? 'Ya' : 'Tidak',
        new Date(u.createdAt).toLocaleString('id-ID'),
        u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString('id-ID') : 'Belum pernah',
      ];
      return row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(',');
    });

    const csvContent = "data:text/csv;charset=utf-8," + [header.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `excel_saga_users_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const TabButton: React.FC<{tabId: 'dashboard' | 'users' | 'certificates' | 'settings', title: string, icon: React.ReactNode}> = ({tabId, title, icon}) => (
      <button
          onClick={() => setActiveTab(tabId)}
          className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-1 py-3 text-sm font-semibold transition-colors ${activeTab === tabId ? 'border-green-500 text-green-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
      >
        {icon}
        {title}
      </button>
  );

  return (
    <div className="max-w-7xl mx-auto">
      {viewingCertificate && <CertificatePreviewModal certificate={viewingCertificate} onClose={() => setViewingCertificate(null)} />}
      
      {editingUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setEditingUser(null)}>
              <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
                  <h3 className="text-lg font-bold mb-4 text-slate-800">Ubah Pengguna: <span className="font-normal">{editingUser.fullName || editingUser.id}</span></h3>
                  <form onSubmit={handleEditUserSubmit} className="space-y-4">
                       <div>
                            <label htmlFor="editFullName" className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1.5"><UserCircleIcon className="w-4 h-4"/>Nama Lengkap</label>
                            <input id="editFullName" type="text" value={editFullName} onChange={e => setEditFullName(e.target.value)} className="w-full p-2 bg-white text-black border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500" required disabled={isSavingUser}/>
                        </div>
                        <div>
                            <label htmlFor="editPhone" className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1.5"><PhoneIcon className="w-4 h-4"/>Nomor HP</label>
                            <input id="editPhone" type="tel" value={editPhone} onChange={e => setEditPhone(e.target.value)} className="w-full p-2 bg-white text-black border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500" required disabled={isSavingUser}/>
                        </div>
                      {modalFeedback && <div className={`p-2 rounded-md text-sm text-center ${modalFeedback.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{modalFeedback.message}</div>}
                      <div className="flex justify-end gap-2 pt-2">
                          <button type="button" onClick={() => setEditingUser(null)} className="px-4 py-2 bg-slate-200 text-slate-800 font-semibold rounded-lg hover:bg-slate-300 transition-colors">Batal</button>
                          <button type="submit" className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:bg-green-400" disabled={isSavingUser}>{isSavingUser ? 'Menyimpan...' : 'Simpan'}</button>
                      </div>
                  </form>
              </div>
          </div>
      )}

      {resettingPasswordForUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setResettingPasswordForUser(null)}>
              <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
                  <h3 className="text-lg font-bold mb-4 text-slate-800">Reset Password: <span className="font-normal">{resettingPasswordForUser.id}</span></h3>
                  <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
                       <div>
                            <label htmlFor="newPasswordForReset" className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1.5"><KeyIcon className="w-4 h-4"/>Password Baru</label>
                            <input id="newPasswordForReset" type="text" value={newPasswordForReset} onChange={e => setNewPasswordForReset(e.target.value)} placeholder="Minimal 6 karakter" className="w-full p-2 bg-white text-black border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500" required disabled={isResettingPassword}/>
                        </div>
                      {modalFeedback && <div className={`p-2 rounded-md text-sm text-center ${modalFeedback.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{modalFeedback.message}</div>}
                      <div className="flex justify-end gap-2 pt-2">
                          <button type="button" onClick={() => setResettingPasswordForUser(null)} className="px-4 py-2 bg-slate-200 text-slate-800 font-semibold rounded-lg hover:bg-slate-300 transition-colors">Batal</button>
                          <button type="submit" className="px-4 py-2 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition disabled:bg-sky-400" disabled={isResettingPassword || newPasswordForReset.length < 6}>{isResettingPassword ? 'Mereset...' : 'Reset Password'}</button>
                      </div>
                  </form>
              </div>
          </div>
      )}

      {isAddUserModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setIsAddUserModalOpen(false)}>
              <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
                  <h3 className="text-lg font-bold mb-4 text-slate-800">Tambah Pengguna Baru</h3>
                  <form onSubmit={handleAddNewUser} className="space-y-4">
                      <div>
                          <label htmlFor="newUserName" className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1.5"><UserCircleIcon className="w-4 h-4"/>Nama Lengkap</label>
                          <input id="newUserName" type="text" value={newUserName} onChange={e => setNewUserName(e.target.value)} placeholder="John Doe" className="w-full p-2 bg-white text-black border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500" required disabled={isCreatingUser}/>
                      </div>
                      <div>
                          <label htmlFor="newUserEmail" className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1.5"><EnvelopeIcon className="w-4 h-4"/>Email</label>
                          <input id="newUserEmail" type="email" value={newUserEmail} onChange={e => setNewUserEmail(e.target.value)} placeholder="user@example.com" className="w-full p-2 bg-white text-black border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500" required disabled={isCreatingUser}/>
                      </div>
                      <div>
                          <label htmlFor="newUserPhone" className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1.5"><PhoneIcon className="w-4 h-4"/>Nomor HP</label>
                          <input id="newUserPhone" type="tel" value={newUserPhone} onChange={e => setNewUserPhone(e.target.value)} placeholder="08123..." className="w-full p-2 bg-white text-black border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500" required disabled={isCreatingUser}/>
                      </div>
                      <div>
                          <label htmlFor="newUserPassword" className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1.5"><KeyIcon className="w-4 h-4"/>Password</label>
                          <input id="newUserPassword" type="password" value={newUserPassword} onChange={e => setNewUserPassword(e.target.value)} placeholder="Minimal 6 karakter" className="w-full p-2 bg-white text-black border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500" required disabled={isCreatingUser}/>
                      </div>
                      <div className="flex items-center pt-2">
                        <input id="newUserIsMember" name="newUserIsMember" type="checkbox" checked={newUserIsMember} onChange={e => setNewUserIsMember(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-green-600 focus:ring-green-500" />
                        <label htmlFor="newUserIsMember" className="ml-3 block text-sm font-medium text-slate-700">Jadikan Member Premium</label>
                     </div>
                      {modalFeedback && <div className={`p-2 rounded-md text-sm text-center ${modalFeedback.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{modalFeedback.message}</div>}
                      <div className="flex justify-end gap-2 pt-2">
                          <button type="button" onClick={() => setIsAddUserModalOpen(false)} className="px-4 py-2 bg-slate-200 text-slate-800 font-semibold rounded-lg hover:bg-slate-300 transition-colors">Batal</button>
                          <button type="submit" className="px-4 py-2 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition disabled:bg-sky-400" disabled={isCreatingUser || newUserPassword.length < 6 || !newUserEmail || !newUserName}>{isCreatingUser ? 'Menyimpan...' : 'Simpan Pengguna'}</button>
                      </div>
                  </form>
              </div>
          </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <div>
            <h2 className="text-2xl font-bold text-slate-800">Admin Panel</h2>
            <p className="text-slate-600">Selamat datang, {user.fullName || user.id}</p>
        </div>
        <button
          onClick={onBack}
          className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-colors"
        >
          <ArrowUturnLeftIcon className="w-5 h-5" />
          Kembali ke Game
        </button>
      </div>
      
      <div className="mb-6 border-b border-slate-200">
        <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
            <TabButton tabId="dashboard" title="Dashboard" icon={<ChartPieIcon className="w-5 h-5"/>} />
            <TabButton tabId="users" title="Pengguna" icon={<UsersIcon className="w-5 h-5"/>}/>
            <TabButton tabId="certificates" title="Sertifikat" icon={<TrophyIcon className="w-5 h-5"/>}/>
            <TabButton tabId="settings" title="Pengaturan" icon={<PaintBrushIcon className="w-5 h-5"/>}/>
        </nav>
      </div>
      
        {loading && <p className="text-center py-10 text-slate-500">Memuat data...</p>}
        {error && <p className="text-center py-10 text-red-500">{error}</p>}
        
        {!loading && !error && (
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-slate-200">
                {activeTab === 'dashboard' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            <StatCard title="Total Pengguna" value={dashboardStats.totalUsers} icon={<UsersIcon className="w-6 h-6 text-white"/>} color="bg-blue-500"/>
                            <StatCard title="Sertifikat Diterbitkan" value={dashboardStats.totalCerts} icon={<TrophyIcon className="w-6 h-6 text-white"/>} color="bg-amber-500"/>
                            <StatCard title="Progres Rata-rata" value={`${dashboardStats.avgProgress}%`} icon={<ChartPieIcon className="w-6 h-6 text-white"/>} color="bg-green-500"/>
                            <StatCard title="Pendaftar Hari Ini" value={dashboardStats.dailyNewUsers} icon={<UserPlusIcon className="w-6 h-6 text-white"/>} color="bg-indigo-500"/>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <h3 className="font-bold text-slate-700 mb-2">Penyelesaian Level</h3>
                                <div className="w-full overflow-x-auto">
                                    <div className="flex gap-1 items-end min-w-[600px] h-48 border-b border-slate-300">
                                        {dashboardStats.levelCompletionCounts.map((count, index) => (
                                            <div key={index} className="flex-1 flex flex-col items-center justify-end" title={`Level ${index+1}: ${count} penyelesaian`}>
                                                <span className="text-xs text-slate-500">{count}</span>
                                                <div className="w-full bg-green-500 hover:bg-green-600 transition-colors" style={{ height: `${(count / dashboardStats.maxCompletions) * 90}%` }}></div>
                                                <span className="text-[10px] text-slate-400 mt-1">{index+1}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <h3 className="font-bold text-slate-700 mb-2">Pendaftar 7 Hari Terakhir</h3>
                                <div className="flex gap-3 items-end h-48 border-b border-slate-300">
                                    {dashboardStats.userSignupsLast7Days.map((count, index) => (
                                        <div key={index} className="flex-1 flex flex-col items-center justify-end" title={`${dashboardStats.dayLabels[index]}: ${count} pendaftar`}>
                                            <span className="text-xs text-slate-500">{count}</span>
                                            <div className="w-full bg-indigo-500 hover:bg-indigo-600 transition-colors rounded-t" style={{ height: `${(count / dashboardStats.maxSignups) * 90}%` }}></div>
                                            <span className="text-xs font-semibold text-slate-400 mt-1">{dashboardStats.dayLabels[index]}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="pt-6 border-t border-slate-200">
                           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-slate-50 p-4 rounded-lg">
                                    <h3 className="font-bold text-slate-700 mb-2">Status Keanggotaan</h3>
                                    <div className="space-y-3 mt-4">
                                        <div className="flex justify-between items-center text-lg">
                                            <span className="flex items-center gap-2 font-semibold text-green-600">
                                                <StarIcon className="w-6 h-6"/> Member
                                            </span>
                                            <span className="font-bold text-slate-800">{dashboardStats.membershipUsers}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-lg">
                                            <span className="flex items-center gap-2 font-semibold text-slate-500">
                                                <UserCircleIcon className="w-6 h-6"/> Standard
                                            </span>
                                            <span className="font-bold text-slate-800">{dashboardStats.standardUsers}</span>
                                        </div>
                                    </div>
                                </div>
                           </div>
                        </div>
                    </div>
                )}
                {activeTab === 'users' && (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-slate-800">Manajemen Pengguna ({users.length})</h3>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setIsAddUserModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white text-sm font-semibold rounded-md hover:bg-sky-700 transition-colors">
                                    <UserPlusIcon className="w-5 h-5"/>
                                    Tambah
                                </button>
                                <button onClick={handleExportUsers} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-md hover:bg-green-700 transition-colors">
                                    <ArrowDownTrayIcon className="w-5 h-5"/>
                                    Ekspor
                                </button>
                            </div>
                        </div>
                        {actionFeedback && (
                            <div className={`mb-4 p-2 rounded-md text-sm text-center ${actionFeedback.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{actionFeedback.message}</div>
                        )}
                        <div className="overflow-x-auto">
                             <table className="w-full text-sm text-left text-slate-600">
                                <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">Nama</th>
                                        <th scope="col" className="px-4 py-3">User ID (Email)</th>
                                        <th scope="col" className="px-4 py-3">Tipe</th>
                                        <th scope="col" className="px-4 py-3">Progres</th>
                                        <th scope="col" className="px-4 py-3">Member</th>
                                        <th scope="col" className="px-4 py-3">Login Terakhir</th>
                                        <th scope="col" className="px-4 py-3"><span className="sr-only">Tindakan</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {users.map(u => {
                                    const completedCount = Object.values(u.progress).filter(p => p === true).length;
                                    const progressPercent = ((completedCount / levelData.length) * 100).toFixed(0);
                                    return (
                                        <tr key={u.id} className="border-b hover:bg-slate-50">
                                            <td className="px-4 py-3 font-medium text-slate-900">{u.fullName || <span className="text-slate-400 italic">Tanpa Nama</span>} {u.isAdmin && <span className="text-xs text-sky-600 font-bold">(Admin)</span>}</td>
                                            <td className="px-4 py-3">{u.id}</td>
                                            <td className="px-4 py-3 capitalize">{u.type}</td>
                                            <td className="px-4 py-3">{progressPercent}%</td>
                                            <td className="px-4 py-3">{u.isMember ? <CheckCircleIcon className="w-5 h-5 text-green-500" title="Member"/> : <XCircleIcon className="w-5 h-5 text-red-500" title="Bukan Member"/>}</td>
                                            <td className="px-4 py-3">{u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString('id-ID') : 'Belum pernah'}</td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="relative">
                                                <button onClick={() => setOpenActionMenuFor(u.id)} disabled={u.isAdmin}>
                                                    <EllipsisVerticalIcon className="w-5 h-5 text-slate-500 hover:text-slate-800" />
                                                </button>
                                                {openActionMenuFor === u.id && (
                                                    <div ref={actionMenuRef} className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-10">
                                                         <button onClick={() => { setEditingUser(u); setOpenActionMenuFor(null); }} className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                                                            <PencilSquareIcon className="w-4 h-4"/> Edit Pengguna
                                                        </button>
                                                        {u.type === 'password' && (
                                                            <button onClick={() => { setResettingPasswordForUser(u); setOpenActionMenuFor(null); }} className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                                                                <KeyIcon className="w-4 h-4"/> Reset Password
                                                            </button>
                                                        )}
                                                        <div className="border-t my-1"></div>
                                                        {u.isMember ? (
                                                            <button onClick={() => handleToggleMembership(u.id, false)} className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-yellow-700 hover:bg-yellow-50">
                                                                <StarIcon className="w-4 h-4"/> Hapus Membership
                                                            </button>
                                                        ) : (
                                                            <button onClick={() => handleToggleMembership(u.id, true)} className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-green-50">
                                                                <StarIcon className="w-4 h-4"/> Jadikan Member
                                                            </button>
                                                        )}
                                                        <div className="border-t my-1"></div>
                                                        <button onClick={() => handleUpdateProgress(u.id, getOpenProgressStatus())} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Buka semua level</button>
                                                        <button onClick={() => handleUpdateProgress(u.id, getResetProgressStatus())} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Reset progres</button>
                                                        <div className="border-t my-1"></div>
                                                        {u.certificate ? (
                                                             <button onClick={() => handleDeleteCertificate(u.id)} className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-yellow-700 hover:bg-yellow-50">
                                                                <TrashIcon className="w-4 h-4"/> Hapus Sertifikat
                                                            </button>
                                                        ) : (
                                                            <button onClick={() => handleCreateCertificate(u.id, u.fullName || u.id)} className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-green-50">
                                                                <TrophyIcon className="w-4 h-4"/> Buat Sertifikat
                                                            </button>
                                                        )}
                                                        <div className="border-t my-1"></div>
                                                        <button onClick={() => handleDeleteUser(u.id, u.fullName || u.id)} className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                                            <TrashIcon className="w-4 h-4"/> Hapus pengguna
                                                        </button>
                                                    </div>
                                                )}
                                                {updatingUserFor === u.id && <ArrowPathIcon className="w-5 h-5 text-sky-500 animate-spin" />}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                             </table>
                        </div>
                    </div>
                )}
                {activeTab === 'certificates' && (
                     <div>
                        <h3 className="text-xl font-bold text-slate-800 mb-4">Sertifikat Diterbitkan ({certificates.length})</h3>
                         <div className="overflow-x-auto">
                             <table className="w-full text-sm text-left text-slate-600">
                                <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">Nama</th>
                                        <th scope="col" className="px-4 py-3">Email Pengguna</th>
                                        <th scope="col" className="px-4 py-3">Tanggal Terbit</th>
                                        <th scope="col" className="px-4 py-3">ID Sertifikat</th>
                                        <th scope="col" className="px-4 py-3"><span className="sr-only">Tindakan</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {certificates.map(cert => (
                                        <tr key={cert.id} className="border-b hover:bg-slate-50">
                                            <td className="px-4 py-3 font-medium text-slate-900">{cert.userName}</td>
                                            <td className="px-4 py-3">{cert.userId}</td>
                                            <td className="px-4 py-3">{new Date(cert.issuedAt).toLocaleDateString('id-ID', { dateStyle: 'long' })}</td>
                                            <td className="px-4 py-3 font-mono text-xs">{cert.id}</td>
                                            <td className="px-4 py-3">
                                                <button onClick={() => setViewingCertificate(cert)} className="flex items-center gap-1 text-sm text-sky-600 hover:underline font-semibold">
                                                    <EyeIcon className="w-4 h-4"/>
                                                    Pratinjau
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                             </table>
                         </div>
                     </div>
                )}
                {activeTab === 'settings' && (
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 mb-1 flex items-center gap-2"><PaintBrushIcon className="w-6 h-6"/>Kustomisasi Sertifikat</h3>
                            <p className="text-sm text-slate-500 mb-4">Ubah tampilan sertifikat yang diterima oleh pengguna.</p>
                            <CertificateSettingsEditor />
                        </div>
                        <div className="border-t pt-8">
                            <h3 className="text-xl font-bold text-slate-800 mb-1 flex items-center gap-2"><ShieldCheckIcon className="w-6 h-6"/>Kebijakan Password</h3>
                            <p className="text-sm text-slate-500 mb-4">Atur kebijakan password untuk pendaftaran pengguna baru.</p>
                            <PasswordPolicyEditor />
                        </div>
                        {user.type === 'password' && (
                            <div className="border-t pt-8">
                                <h3 className="text-xl font-bold text-slate-800 mb-1 flex items-center gap-2"><KeyIcon className="w-6 h-6"/>Ganti Password Admin</h3>
                                <p className="text-sm text-slate-500 mb-4">Ubah password untuk akun admin Anda.</p>
                                <form onSubmit={handlePasswordUpdate} className="space-y-4 max-w-md">
                                    <div>
                                        <label htmlFor="oldPasswordAdmin" className="block text-sm font-medium text-slate-700 mb-1">Password Lama</label>
                                        <input
                                            id="oldPasswordAdmin"
                                            type="password"
                                            value={oldPassword}
                                            onChange={(e) => {setOldPassword(e.target.value); setPasswordFeedback('');}}
                                            className="w-full p-2 bg-white text-black border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                                            placeholder="Masukkan password lama..."
                                            required
                                            disabled={isSavingPassword}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="newPasswordAdmin" className="block text-sm font-medium text-slate-700 mb-1">Password Baru</label>
                                        <input
                                            id="newPasswordAdmin"
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => {setNewPassword(e.target.value); setPasswordFeedback('');}}
                                            className="w-full p-2 bg-white text-black border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                                            placeholder="Minimal 6 karakter..."
                                            required
                                            disabled={isSavingPassword}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="confirmNewPasswordAdmin" className="block text-sm font-medium text-slate-700 mb-1">Konfirmasi Password Baru</label>
                                        <input
                                            id="confirmNewPasswordAdmin"
                                            type="password"
                                            value={confirmNewPassword}
                                            onChange={(e) => {setConfirmNewPassword(e.target.value); setPasswordFeedback('');}}
                                            className="w-full p-2 bg-white text-black border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                                            placeholder="Ketik ulang password baru..."
                                            required
                                            disabled={isSavingPassword}
                                        />
                                    </div>

                                    {newPassword && confirmNewPassword && newPassword !== confirmNewPassword && (
                                        <p className="text-xs text-red-500">Konfirmasi password tidak cocok.</p>
                                    )}

                                    {passwordFeedback && <p className={`text-sm ${passwordFeedback.includes('Gagal') ? 'text-red-600' : 'text-green-600'}`}>{passwordFeedback}</p>}

                                    <div>
                                        <button 
                                            type="submit" 
                                            className="px-4 py-2 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition disabled:bg-sky-400" 
                                            disabled={isSavingPassword || newPassword.length < 6 || newPassword !== confirmNewPassword || !oldPassword}
                                        >
                                            {isSavingPassword ? 'Menyimpan...' : 'Simpan Password'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                )}
            </div>
        )}
    </div>
  );
};