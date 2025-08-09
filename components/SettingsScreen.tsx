import React, { useContext } from 'react';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import { SettingsContext } from '../App';
import type { AppSettings } from '../types';

interface SettingsScreenProps {
    onBack: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
    const { settings, onSettingsChange } = useContext(SettingsContext);

    const handleRegionalFormatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === 'us') {
            onSettingsChange({ ...settings, numberFormat: 'us', formulaSeparator: ',' });
        } else {
            onSettingsChange({ ...settings, numberFormat: 'eu', formulaSeparator: ';' });
        }
    };

    const handleDateFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSettingsChange({ ...settings, dateFormat: e.target.value as AppSettings['dateFormat'] });
    };

    const handleReferenceStyleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSettingsChange({ ...settings, referenceStyle: e.target.value as AppSettings['referenceStyle'] });
    };


    return (
        <div className="max-w-3xl mx-auto">
             <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Pengaturan</h2>
                    <p className="text-slate-600 mt-1">Sesuaikan pengalaman Excel Saga Anda.</p>
                </div>
                <button
                    onClick={onBack}
                    className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-colors"
                >
                    <ArrowUturnLeftIcon className="w-5 h-5" />
                    Menu Utama
                </button>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 space-y-8">
                {/* Regional Formatting */}
                <div>
                    <h3 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4">Pengaturan Regional</h3>
                    <p className="text-sm text-slate-500 mb-4">Pilih format angka dan pemisah formula yang sesuai dengan kebiasaan Anda. Pengaturan ini akan mengubah pemisah argumen formula secara otomatis.</p>
                    <fieldset className="space-y-4">
                        <div className="relative flex items-start">
                            <div className="flex h-6 items-center">
                                <input
                                    id="format-us"
                                    name="regional-format"
                                    type="radio"
                                    value="us"
                                    checked={settings.numberFormat === 'us'}
                                    onChange={handleRegionalFormatChange}
                                    className="h-4 w-4 border-slate-300 text-green-600 focus:ring-green-500"
                                />
                            </div>
                            <div className="ml-3 text-sm leading-6">
                                <label htmlFor="format-us" className="font-medium text-slate-900">
                                    Format US / UK
                                </label>
                                <p className="text-slate-500">Angka: <code className="font-mono bg-slate-100 p-1 rounded-sm">1,234.56</code> | Formula: <code className="font-mono bg-slate-100 p-1 rounded-sm">=SUM(A1,B1)</code></p>
                            </div>
                        </div>
                        <div className="relative flex items-start">
                            <div className="flex h-6 items-center">
                                <input
                                    id="format-eu"
                                    name="regional-format"
                                    type="radio"
                                    value="eu"
                                    checked={settings.numberFormat === 'eu'}
                                    onChange={handleRegionalFormatChange}
                                    className="h-4 w-4 border-slate-300 text-green-600 focus:ring-green-500"
                                />
                            </div>
                            <div className="ml-3 text-sm leading-6">
                                <label htmlFor="format-eu" className="font-medium text-slate-900">
                                    Format Eropa / Indonesia
                                </label>
                                <p className="text-slate-500">Angka: <code className="font-mono bg-slate-100 p-1 rounded-sm">1.234,56</code> | Formula: <code className="font-mono bg-slate-100 p-1 rounded-sm">=SUM(A1;B1)</code></p>
                            </div>
                        </div>
                    </fieldset>
                </div>
                
                {/* Date Formatting */}
                <div>
                    <h3 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4">Format Tanggal</h3>
                     <p className="text-sm text-slate-500 mb-3">Pilih bagaimana tanggal akan ditampilkan di dalam tabel game. (Fitur ini bersifat kosmetik dan tidak mempengaruhi validasi jawaban).</p>
                    <select
                        name="dateFormat"
                        value={settings.dateFormat}
                        onChange={handleDateFormatChange}
                        className="w-full max-w-xs p-2 border-2 border-slate-300 rounded-md focus:ring-green-500 focus:border-green-500 text-black bg-white"
                    >
                        <option value="DD-MM-YYYY">DD-MM-YYYY (e.g., 31-12-2024)</option>
                        <option value="MM-DD-YYYY">MM-DD-YYYY (e.g., 12-31-2024)</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD (e.g., 2024-12-31)</option>
                    </select>
                </div>

                {/* Reference Style */}
                <div>
                    <h3 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4">Gaya Referensi Sel</h3>
                    <p className="text-sm text-slate-500 mb-4">Pilih bagaimana header kolom dan baris ditampilkan. Jawaban formula tetap menggunakan gaya A1.</p>
                    <fieldset className="space-y-4">
                        <div className="relative flex items-start">
                            <div className="flex h-6 items-center">
                                <input
                                    id="ref-a1"
                                    name="referenceStyle"
                                    type="radio"
                                    value="A1"
                                    checked={settings.referenceStyle === 'A1'}
                                    onChange={handleReferenceStyleChange}
                                    className="h-4 w-4 border-slate-300 text-green-600 focus:ring-green-500"
                                />
                            </div>
                            <div className="ml-3 text-sm leading-6">
                                <label htmlFor="ref-a1" className="font-medium text-slate-900">Gaya A1 (Default)</label>
                                <p className="text-slate-500">Kolom menggunakan huruf (A, B, C...) dan baris menggunakan angka (1, 2, 3...).</p>
                            </div>
                        </div>
                         <div className="relative flex items-start">
                            <div className="flex h-6 items-center">
                                <input
                                    id="ref-r1c1"
                                    name="referenceStyle"
                                    type="radio"
                                    value="R1C1"
                                    checked={settings.referenceStyle === 'R1C1'}
                                    onChange={handleReferenceStyleChange}
                                    className="h-4 w-4 border-slate-300 text-green-600 focus:ring-green-500"
                                />
                            </div>
                            <div className="ml-3 text-sm leading-6">
                                <label htmlFor="ref-r1c1" className="font-medium text-slate-900">Gaya R1C1</label>
                                <p className="text-slate-500">Kolom dan baris keduanya menggunakan angka (R1C1, R2C3, ...).</p>
                            </div>
                        </div>
                    </fieldset>
                </div>

            </div>
        </div>
    );
};