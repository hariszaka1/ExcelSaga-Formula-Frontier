import { createClient } from '@supabase/supabase-js';
import { levelData } from './constants';
import type { LevelCompletionStatus, User, CertificateRecord, CertificateSettings } from './types';

// Inisialisasi Supabase client
const supabase = createClient(
  'https://imqrdxahmfggrrncnwuf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltcXJkeGFobWZnZ3JybmNud3VmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MDA5OTIsImV4cCI6MjA3MDA3Njk5Mn0.ha4QeMRi5bL4zpMcmVSo70rUMqFMZy-rOU_8CBfpLoQ'
);

const getDefaultCompletionStatus = (): LevelCompletionStatus => {
  return levelData.reduce((acc, _, index) => {
    acc[index] = false;
    return acc;
  }, {} as LevelCompletionStatus);
};

const generateCertificateId = () => `ESC-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

export const api = {
  async login(email: string, password_input: string): Promise<{ user: User | null; error?: string }> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: password_input });
    if (error || !data?.user) return { user: null, error: error?.message || 'Email atau password salah' };
    const { data: userData } = await supabase.from('users').select('*').eq('id', data.user.id).single();
    return { user: userData as User, error: null };
  },

  async register(fullName: string, phone: string, email: string, password_input: string): Promise<{ user: User | null; error?: string }> {
    const { data, error } = await supabase.auth.signUp({ email, password: password_input });
    if (error || !data?.user) return { user: null, error: error?.message || 'Registrasi gagal' };
    const newUser: User = {
      id: data.user.id,
      type: 'password',
      password: password_input,
      fullName,
      phone,
      progress: getDefaultCompletionStatus(),
      isAdmin: false,
      isMember: false,
      createdAt: Date.now(),
    };
    await supabase.from('users').insert([newUser]);
    return { user: newUser, error: null };
  },

  async registerOrLoginWithGoogle(email: string, password_input: string): Promise<{ user: User | null; error?: string }> {
    // Implementasi Google login sesuai dokumentasi Supabase
    return { user: null, error: 'Belum diimplementasikan.' };
  },

  async getUserById(id: string): Promise<{ user: User | null }> {
    const { data } = await supabase.from('users').select('*').eq('id', id).single();
    return { user: data as User || null };
  },

  async loadProgress(userId: string): Promise<{ progress: LevelCompletionStatus | null }> {
    const { data } = await supabase.from('users').select('progress').eq('id', userId).single();
    return { progress: data?.progress || null };
  },

  async saveProgress(userId: string, progress: LevelCompletionStatus): Promise<{ success: boolean }> {
    const { error } = await supabase.from('users').update({ progress }).eq('id', userId);
    return { success: !error };
  },

  async getUsers(): Promise<{ users: User[] }> {
    const { data } = await supabase.from('users').select('*');
    return { users: data as User[] };
  },

  async updateAdminPassword(adminId: string, currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
    // Untuk keamanan, sebaiknya gunakan Supabase Auth API untuk update password
    return { success: false, error: 'Belum diimplementasikan.' };
  },

  async updateUserMembership(userId: string, isMember: boolean): Promise<{ success: boolean, user?: User, error?: string }> {
    const { data, error } = await supabase.from('users').update({ isMember }).eq('id', userId).select();
    if (error) return { success: false, error: error.message };
    return { success: true, user: data?.[0] as User };
  },

  async updateUserProfile(userId: string, updates: { fullName: string; phone: string; email: string; }): Promise<{ success: boolean, user?: User, error?: string }> {
    const { data, error } = await supabase.from('users').update(updates).eq('id', userId).select();
    if (error) return { success: false, error: error.message };
    return { success: true, user: data?.[0] as User };
  },

  async updateUserPassword(userId: string, currentPassword: string, newPassword: string): Promise<{success: boolean, error?: string}> {
    // Untuk update password, gunakan Supabase Auth API
    return { success: false, error: 'Belum diimplementasikan.' };
  },

  async deleteUser(userIdToDelete: string): Promise<{ success: boolean; error?: string }> {
    const { error } = await supabase.from('users').delete().eq('id', userIdToDelete);
    return { success: !error, error: error?.message };
  },

  async createCertificate(userId: string, fullName: string): Promise<{ certificate: CertificateRecord | null; error?: string }> {
    const newCertificate: CertificateRecord = {
      id: generateCertificateId(),
      userId,
      userName: fullName,
      issuedAt: Date.now(),
    };
    const { error } = await supabase.from('certificates').insert([newCertificate]);
    return { certificate: error ? null : newCertificate, error: error?.message };
  },

  async deleteCertificate(userId: string): Promise<{ success: boolean; error?: string }> {
    const { error } = await supabase.from('certificates').delete().eq('userId', userId);
    return { success: !error, error: error?.message };
  },

  async getCertificates(): Promise<{ certificates: CertificateRecord[] }> {
    const { data } = await supabase.from('certificates').select('*');
    return { certificates: data as CertificateRecord[] };
  },

  async getCertificateSettings(): Promise<{ settings: CertificateSettings }> {
    // Implementasi sesuai struktur settings di Supabase
    return { settings: {} as CertificateSettings };
  },

  async updateCertificateSettings(newSettings: CertificateSettings): Promise<{ success: boolean, error?: string }> {
    // Implementasi sesuai struktur settings di Supabase
    return { success: false, error: 'Belum diimplementasikan.' };
  },
   async loginWithGoogle(): Promise<{ user: User | null; error?: string }> {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin, // ganti jika ingin redirect ke halaman tertentu
      },
    });
    // Setelah login, user akan diarahkan ke redirectTo
    // Untuk mendapatkan data user, gunakan supabase.auth.getUser() di halaman setelah redirect
    return { user: null, error: error?.message || null };
  },
  async ensureDefaultAdmin() {
  const adminEmail = 'admin@excel.saga';
  const adminPassword = '123';
  // Cek apakah admin sudah ada di Supabase Auth
  const { data: users } = await supabase.from('users').select('*').eq('id', adminEmail);
  if (!users || users.length === 0) {
    // Register admin di Supabase Auth
    const { data, error } = await supabase.auth.signUp({ email: adminEmail, password: adminPassword });
    if (!error && data?.user) {
      // Tambahkan ke tabel users
      const newAdmin: User = {
        id: data.user.id,
        type: 'password',
        password: adminPassword,
        fullName: 'Admin',
        phone: '',
        progress: getDefaultCompletionStatus(),
        isAdmin: true,
        isMember: false,
        createdAt: Date.now(),
      };
      await supabase.from('users').insert([newAdmin]);
    }
  }
},
};
