import React from 'react';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';

interface CreditsScreenProps {
    onBack: () => void;
}

export const CreditsScreen: React.FC<CreditsScreenProps> = ({ onBack }) => {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Kredit</h2>
                    <p className="text-slate-600 mt-1">Terima kasih telah bermain!</p>
                </div>
                <button
                    onClick={onBack}
                    className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-colors"
                >
                    <ArrowUturnLeftIcon className="w-5 h-5" />
                    Menu Utama
                </button>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 space-y-6">
                <CreditSection title="Game Design & Development">
                    <CreditItem name="TanyaJawabExcel" role="Lead Developer & Excel Expert" />
                </CreditSection>

                <CreditSection title="Teknologi">
                    <CreditItem name="React & TypeScript" role="Core Frontend Framework" />
                    <CreditItem name="Tailwind CSS" role="Styling & UI" />
                    <CreditItem name="Google Gemini API" role="AI-Powered Hints" />
                </CreditSection>

                <CreditSection title="Musik & Aset">
                    <p className="text-sm text-slate-600">Musik dan efek suara dibuat khusus untuk Excel Saga.</p>
                </CreditSection>
                
                <div className="text-center pt-4 border-t">
                    <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} Excel Saga: Formula Frontier. All Rights Reserved.</p>
                </div>
            </div>
        </div>
    );
};

interface CreditSectionProps {
    title: string;
    children: React.ReactNode;
}

const CreditSection: React.FC<CreditSectionProps> = ({ title, children }) => (
    <div>
        <h3 className="text-lg font-bold text-slate-800 mb-3">{title}</h3>
        <div className="space-y-2">{children}</div>
    </div>
);

interface CreditItemProps {
    name: string;
    role: string;
}

const CreditItem: React.FC<CreditItemProps> = ({ name, role }) => (
    <div className="flex justify-between items-baseline">
        <p className="font-semibold text-slate-700">{name}</p>
        <p className="text-sm text-slate-500 text-right">{role}</p>
    </div>
);
