import React, { useState } from 'react';
import { api } from '../api';

// Icons will be inline SVGs for simplicity
const GoogleIcon = () => (
    <svg className="w-5 h-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
        <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 111.8 512 0 398.5 0 256S111.8 0 244 0c69.8 0 133 28.5 178.5 74.2l-64.8 64.8C337 112.5 293.7 96 244 96c-82.6 0-149.2 67.5-149.2 160s66.6 160 149.2 160c94.9 0 132.3-63.4 136-96h-136v-80h225.4c1.2 6.3 1.8 12.8 1.8 19.8z"></path>
    </svg>
);

const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
    </svg>
);

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);

interface InputFieldProps {
  id: string;
  type: 'email' | 'password' | 'text' | 'tel';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: React.ReactNode;
  disabled: boolean;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ id, type, value, onChange, placeholder, icon, disabled, required = true }) => (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-3 pl-10 bg-slate-100 text-slate-900 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition placeholder:text-slate-500"
        required={required}
        aria-label={placeholder}
        disabled={disabled}
      />
    </div>
);


interface LoginScreenProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onGoogleLoginClick: () => void;
}


export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onGoogleLoginClick }) => {
  const [view, setView] = useState<'login' | 'register'>('login');
  
  // Login states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Register states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await onLogin(email, password);
    } catch (err: any) {
      setError(err.message || 'Email atau password salah. Silakan coba lagi.');
      setPassword('');
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      if (regPassword.length < 6) {
        throw new Error("Password harus minimal 6 karakter.");
      }
      const { user, error: registerError } = await api.register(fullName, phone, regEmail, regPassword);
      if (registerError) {
        throw new Error(registerError);
      }
      if (user && user.password) {
        // Registration successful, now automatically log in
        await onLogin(user.id, user.password);
      } else {
        throw new Error('Pendaftaran gagal. Silakan coba lagi.');
      }
    } catch (err: any) {
      setError(err.message || 'Pendaftaran gagal. Silakan coba lagi.');
      setIsLoading(false);
    }
  };

  const renderLoginView = () => (
    <>
      <h2 className="text-2xl font-bold text-slate-800 text-center">Selamat Datang Kembali!</h2>
      <p className="text-slate-600 mt-1 text-center mb-8">Login untuk melanjutkan petualangan Excel-mu.</p>
      <form onSubmit={handleLoginSubmit} className="space-y-4">
        <InputField
            id="email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(''); }}
            placeholder="Email"
            icon={<MailIcon />}
            disabled={isLoading}
        />
        <InputField
            id="password"
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
            placeholder="Password"
            icon={<LockIcon />}
            disabled={isLoading}
        />
        {error && <p className="text-red-600 text-sm pt-1 text-center">{error}</p>}
        <div className="pt-2">
          <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition transform hover:scale-105 disabled:bg-green-400" disabled={isLoading}>
            {isLoading ? 'Memproses...' : 'Login'}
          </button>
        </div>
      </form>
      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-slate-300"></div>
        <span className="flex-shrink mx-4 text-slate-500 text-sm font-semibold">ATAU</span>
        <div className="flex-grow border-t border-slate-300"></div>
      </div>
      <button onClick={onGoogleLoginClick} type="button" className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white text-slate-700 font-semibold rounded-lg shadow-md border border-slate-300 hover:bg-slate-100 hover:scale-105 transition-transform" disabled={isLoading}>
        <GoogleIcon />
        Login dengan Google
      </button>
      <p className="text-center text-sm text-slate-600 mt-6">
          Belum punya akun? <button onClick={() => { setView('register'); setError(''); }} className="font-semibold text-green-600 hover:underline">Daftar di sini</button>
      </p>
    </>
  );

  const renderRegisterView = () => (
    <>
      <h2 className="text-2xl font-bold text-slate-800 text-center">Buat Akun Baru</h2>
      <p className="text-slate-600 mt-1 text-center mb-8">Mulai perjalananmu menjadi Master Excel!</p>
      <form onSubmit={handleRegisterSubmit} className="space-y-4">
        <InputField
            id="fullName"
            type="text"
            value={fullName}
            onChange={e => { setFullName(e.target.value); setError(''); }}
            placeholder="Nama Lengkap"
            icon={<UserIcon />}
            disabled={isLoading}
        />
        <InputField
            id="phone"
            type="tel"
            value={phone}
            onChange={e => { setPhone(e.target.value); setError(''); }}
            placeholder="Nomor HP"
            icon={<PhoneIcon />}
            disabled={isLoading}
        />
        <InputField
            id="regEmail"
            type="email"
            value={regEmail}
            onChange={e => { setRegEmail(e.target.value); setError(''); }}
            placeholder="Email"
            icon={<MailIcon />}
            disabled={isLoading}
        />
        <InputField
            id="regPassword"
            type="password"
            value={regPassword}
            onChange={e => { setRegPassword(e.target.value); setError(''); }}
            placeholder="Password (min. 6 karakter)"
            icon={<LockIcon />}
            disabled={isLoading}
        />
        {error && <p className="text-red-600 text-sm pt-1 text-center">{error}</p>}
        <div className="pt-2">
          <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition transform hover:scale-105 disabled:bg-green-400" disabled={isLoading}>
            {isLoading ? 'Mendaftarkan...' : 'Daftar & Masuk'}
          </button>
        </div>
      </form>
      <p className="text-center text-sm text-slate-600 mt-6">
        Sudah punya akun? <button onClick={() => { setView('login'); setError(''); }} className="font-semibold text-green-600 hover:underline">Login di sini</button>
      </p>
    </>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-green-700 font-press-start tracking-tight">
          Excel Saga
        </h1>
        <p className="text-slate-600 text-lg mt-2">Formula Frontier</p>
      </div>
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-slate-200/80">
            {view === 'login' ? renderLoginView() : renderRegisterView()}
        </div>
      </div>
    </div>
  );
};
