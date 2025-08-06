import React, { useState } from 'react';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';

const GoogleIcon = () => (
    <svg className="w-7 h-7" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
        <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 111.8 512 0 398.5 0 256S111.8 0 244 0c69.8 0 133 28.5 178.5 74.2l-64.8 64.8C337 112.5 293.7 96 244 96c-82.6 0-149.2 67.5-149.2 160s66.6 160 149.2 160c94.9 0 132.3-63.4 136-96h-136v-80h225.4c1.2 6.3 1.8 12.8 1.8 19.8z"></path>
    </svg>
);

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

interface InputFieldProps {
  id: string;
  type: 'password';
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

interface GoogleLoginScreenProps {
  onRegister: (email: string, password_input: string) => Promise<void>;
  onBack: () => void;
}

export const GoogleLoginScreen: React.FC<GoogleLoginScreenProps> = ({ onRegister, onBack }) => {
  const [step, setStep] = useState<'google' | 'password'>('google');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      try {
        const idToken = credentialResponse.credential;
        const payload = JSON.parse(atob(idToken.split('.')[1]));
        if (payload.email) {
          setEmail(payload.email);
          setStep('password');
        } else {
          setError('Gagal mendapatkan email dari Google. Silakan coba lagi.');
        }
      } catch (e) {
        console.error("Error decoding JWT", e);
        setError('Terjadi kesalahan saat memproses login Google.');
        setStep('google');
      }
    } else {
      setError('Login dengan Google gagal. Silakan coba lagi.');
    }
  };
  
  const handleGoogleError = () => {
      console.log("Login gagal");
      setError('Login dengan Google gagal. Silakan coba lagi.');
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (password.length < 6) {
          setError("Password harus minimal 6 karakter.");
          return;
      }
      if (password !== confirmPassword) {
          setError("Konfirmasi password tidak cocok.");
          return;
      }
      setIsLoading(true);
      setError('');
      try {
          await onRegister(email, password);
      } catch (err: any) {
          setError(err.message || 'Pendaftaran gagal. Silakan coba lagi atau gunakan email lain.');
          setIsLoading(false);
      }
  };

  const renderGoogleStep = () => (
    <>
        <div className="text-center mb-8">
            <div className="inline-block text-blue-600">
                <GoogleIcon />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mt-4">Login dengan Google</h1>
            <p className="text-slate-600 mt-1">Lanjutkan ke Excel Saga</p>
        </div>
        <div className="flex flex-col items-center">
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
            />
            {error && (
                <p className="text-red-600 text-sm mt-4 text-center">{error}</p>
            )}
        </div>
    </>
  );
  
  const renderPasswordStep = () => (
    <>
        <h2 className="text-2xl font-bold text-slate-800 text-center">Buat Password</h2>
        <p className="text-slate-600 mt-1 text-center mb-6">
            Password ini digunakan untuk melihat jawaban di setiap level.
            <br/>
            Login untuk <strong className="text-slate-900">{email}</strong>
        </p>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <InputField
                id="password"
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="Password (min. 6 karakter)"
                icon={<LockIcon />}
                disabled={isLoading}
            />
            <InputField
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
                placeholder="Konfirmasi Password"
                icon={<LockIcon />}
                disabled={isLoading}
            />
            {error && <p className="text-red-600 text-sm pt-1 text-center">{error}</p>}
            <div className="pt-2">
                <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition transform hover:scale-105 disabled:bg-green-400" disabled={isLoading}>
                    {isLoading ? 'Menyimpan...' : 'Simpan Password & Masuk'}
                </button>
            </div>
        </form>
    </>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
      <div className="w-full max-w-sm mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 relative">
          <button onClick={onBack} className="absolute top-4 left-4 text-slate-500 hover:text-slate-800 transition-colors" aria-label="Kembali">
            <ArrowUturnLeftIcon className="w-6 h-6" />
          </button>
          {step === 'google' ? renderGoogleStep() : renderPasswordStep()}
        </div>
      </div>
    </div>
  );
};
