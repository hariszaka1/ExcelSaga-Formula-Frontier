import React, { useRef, useCallback, useState, useEffect } from 'react';
import type { User, CertificateSettings } from '../types';
import { api } from '../api';
import { ArrowUturnLeftIcon, ShareIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';
import { CertificateTemplate } from './CertificateTemplate';

interface CertificateScreenProps {
  user: User;
  onBack: () => void;
}

export const CertificateScreen: React.FC<CertificateScreenProps> = ({ user, onBack }) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const { certificate } = user;
  const [settings, setSettings] = useState<CertificateSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getCertificateSettings().then(res => {
        setSettings(res.settings);
        setIsLoading(false);
    }).catch(err => {
        console.error("Failed to load certificate settings", err);
        setIsLoading(false);
    })
  }, []);


  const handleDownloadPdf = useCallback(async () => {
    if (!certificateRef.current) return;
    try {
        const dataUrl = await toPng(certificateRef.current, { 
            quality: 0.98,
            pixelRatio: 3, // For higher quality
            cacheBust: true,
        });

        const pdf = new jsPDF('landscape', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);

        const safeUserName = (user.fullName || "user").replace(/[^a-z0-9]/gi, '_').toLowerCase();
        pdf.save(`sertifikat-excel-saga-${safeUserName}.pdf`);

    } catch (err) {
        console.error('Gagal mengunduh sertifikat PDF:', err);
        alert("Maaf, terjadi kesalahan saat mencoba mengunduh sertifikat.");
    }
  }, [user]);
  
  const handleDownloadPng = useCallback(async () => {
    if (!certificateRef.current) return;
    try {
      const dataUrl = await toPng(certificateRef.current, { quality: 0.98, cacheBust: true });
      const link = document.createElement('a');
      const safeUserName = (user.fullName || 'user').replace(/[^a-z0-9]/gi, '_').toLowerCase();
      link.download = `sertifikat-excel-saga-${safeUserName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Gagal mengunduh sertifikat PNG:', err);
      alert('Maaf, terjadi kesalahan saat mencoba mengunduh sertifikat.');
    }
  }, [user]);

  const handleShare = useCallback(async () => {
    const shareData = {
      title: 'Sertifikat Excel Saga',
      text: `Saya telah menyelesaikan Excel Saga dan meraih gelar Excel Virtuoso!`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        alert("Fungsi berbagi tidak didukung di browser ini. Coba salin URL halaman.");
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  }, []);

  if (!certificate) {
    return (
        <div className="text-center p-8">
            <p>Sertifikat tidak ditemukan. Selesaikan semua level untuk mendapatkannya!</p>
            <button onClick={onBack} className="mt-4 px-4 py-2 bg-slate-200 rounded-lg">Kembali</button>
        </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Sertifikat Kelulusan</h2>
          <p className="text-slate-600">Selamat, Anda adalah seorang Excel Virtuoso!</p>
        </div>
        <button onClick={onBack} className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-colors">
          <ArrowUturnLeftIcon className="w-5 h-5" />
          Kembali ke Menu
        </button>
      </div>

      <div ref={certificateRef}>
        {isLoading ? (
             <div className="bg-white aspect-[1.414] flex items-center justify-center">
                <p className="text-slate-500 animate-pulse">Memuat sertifikat...</p>
            </div>
        ) : settings ? (
            <CertificateTemplate certificate={certificate} settings={settings} />
        ) : (
            <div className="bg-white aspect-[1.414] flex items-center justify-center">
                <p className="text-red-500">Gagal memuat desain sertifikat.</p>
            </div>
        )}
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button onClick={handleDownloadPng} className="flex items-center gap-2 px-6 py-3 bg-sky-600 text-white font-bold rounded-lg shadow-md hover:bg-sky-700 transition">
              <ArrowDownTrayIcon className="w-5 h-5"/>
              Unduh (PNG)
          </button>
          <button onClick={handleDownloadPdf} className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition">
              <ArrowDownTrayIcon className="w-5 h-5"/>
              Unduh (PDF)
          </button>
          <button onClick={handleShare} className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white font-bold rounded-lg shadow-md hover:bg-teal-700 transition">
              <ShareIcon className="w-5 h-5"/>
              Bagikan
          </button>
      </div>
    </div>
  );
};