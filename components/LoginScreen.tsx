
import React, { useState } from 'react';
import { LockClosedIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate a small delay for better UX
    setTimeout(() => {
      if (password === 'tanyajawabexcel') {
        onLoginSuccess();
      } else {
        setError('Password salah. Silakan coba lagi.');
        setPassword('');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      <div className="w-full max-w-md mx-auto">
        <header className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-green-700 font-press-start tracking-tight">
            Excel Saga
            </h1>
            <p className="text-slate-600 text-lg mt-2">Formula Frontier</p>
            <p className="text-sm text-slate-500 mt-1">by TanyaJawabExcel</p>
        </header>

        <form 
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200"
        >
            <h2 className="text-2xl font-bold text-slate-800 text-center mb-2">Selamat Datang!</h2>
            <p className="text-slate-500 text-center mb-6">Silakan masukkan password untuk memulai.</p>
            
            <div className="relative">
                <LockClosedIcon className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    aria-label="Password"
                    className="w-full p-3 pl-10 bg-slate-100 text-black border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                    required
                />
            </div>
            
            {error && (
                <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
            )}

            <button 
                type="submit" 
                disabled={isLoading}
                className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition disabled:bg-slate-400 disabled:cursor-wait"
            >
                {isLoading ? 'Memeriksa...' : 'Masuk'}
                {!isLoading && <ArrowRightOnRectangleIcon className="w-5 h-5" />}
            </button>
        </form>

        <footer className="text-center mt-6 space-y-2">
            <p className="text-xs text-slate-400">(Hint: passwordnya adalah tanyajawabexcel)</p>
            <p className="text-xs text-slate-500">
                Suka dengan game ini? Dukung kami di{' '}
                <a href="https://saweria.co/tanyajawabexcel" target="_blank" rel="noopener noreferrer" className="font-semibold text-green-600 hover:text-green-700 underline">
                    Saweria
                </a>!
            </p>
        </footer>
      </div>
    </div>
  );
};