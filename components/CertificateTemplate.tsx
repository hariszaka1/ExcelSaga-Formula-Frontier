
import React from 'react';
import type { CertificateRecord, CertificateSettings } from '../types';

// New Pixel Art Trophy Icon
const PixelTrophyIcon: React.FC<{ primaryColor: string, secondaryColor: string }> = ({ primaryColor, secondaryColor }) => (
    <svg width="80" height="80" viewBox="0 0 24 24" className="mx-auto my-4" style={{ imageRendering: 'pixelated' }}>
        {/* Base */}
        <rect x="7" y="20" width="10" height="2" fill={secondaryColor} />
        <rect x="8" y="18" width="8" height="2" fill={secondaryColor} />
        {/* Stem */}
        <rect x="10" y="14" width="4" height="4" fill={primaryColor} />
        {/* Cup */}
        <rect x="8" y="12" width="8" height="2" fill="#facc15" /> {/* Gold */}
        <rect x="6" y="6" width="12" height="6" fill="#facc15" /> {/* Gold */}
        <rect x="5" y="5" width="14" height="1" fill="#fde047" /> {/* Lighter Gold */}
        {/* Handles */}
        <rect x="4" y="8" width="2" height="4" fill="#facc15" />
        <rect x="18" y="8" width="2" height="4" fill="#facc15" />
    </svg>
);

interface CertificateTemplateProps {
    certificate: CertificateRecord;
    settings: CertificateSettings;
}

export const CertificateTemplate: React.FC<CertificateTemplateProps> = ({ certificate, settings }) => {
  const gridBackgroundStyle = {
    backgroundSize: '20px 20px',
    backgroundImage: `
      linear-gradient(to right, #e2e8f0 1px, transparent 1px),
      linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
    `,
  };

  return (
    <div className="bg-slate-700 p-2">
      <div 
        className="bg-white p-8 aspect-[1.414] flex flex-col items-center justify-between text-center relative overflow-hidden" 
        style={{ ...gridBackgroundStyle, border: `4px solid ${settings.secondaryColor}` }}
      >
          <div className="absolute inset-0 border-8 border-white z-0"></div>

          <div className="relative z-10 w-full flex flex-col items-center">
            
            <h1 className="text-lg font-press-start" style={{ color: settings.secondaryColor }}>
              {settings.title}
            </h1>
            
            <PixelTrophyIcon primaryColor={settings.primaryColor} secondaryColor={settings.secondaryColor} />

            <p className="text-sm" style={{ color: settings.secondaryColor }}>
              {settings.awardText}
            </p>
            
            <p className="text-3xl font-press-start my-2 break-words" style={{ color: settings.primaryColor }}>
                {certificate.userName}
            </p>

            <p className="text-sm" style={{ color: settings.secondaryColor }}>
              telah menyelesaikan semua ujian dan dianugerahi gelar
            </p>
            <p className="text-2xl font-press-start mt-1" style={{ color: settings.primaryColor }}>
                {settings.congratsText}
            </p>
          </div>
          
          <div className="relative z-10 w-full flex justify-between items-end mt-4 text-xs">
              <div className="text-center w-2/5">
                  <p className="font-semibold border-t-2 pt-1" style={{ borderColor: settings.secondaryColor, color: settings.secondaryColor }}>
                      {settings.signerName}
                  </p>
                  <p className="text-[10px]" style={{ color: settings.secondaryColor }}>{settings.signerTitle}</p>
              </div>
              <div className="text-center w-1/5 text-[10px] opacity-75">
                  <p className="font-mono">{certificate.id}</p>
              </div>
              <div className="text-center w-2/5">
                  <p className="font-semibold border-t-2 pt-1" style={{ borderColor: settings.secondaryColor, color: settings.secondaryColor }}>
                      {new Date(certificate.issuedAt).toLocaleDateString('id-ID', { dateStyle: 'long' })}
                  </p>
                  <p className="text-[10px]" style={{ color: settings.secondaryColor }}>Tanggal Pencapaian</p>
              </div>
          </div>
      </div>
    </div>
  );
};
