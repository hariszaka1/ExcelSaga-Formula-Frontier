
import React from 'react';
import { GameState } from '../types';
import { PlayCircleIcon, Cog6ToothIcon, InformationCircleIcon, TrophyIcon } from '@heroicons/react/24/solid';

interface StartMenuProps {
    onNavigate: (state: GameState) => void;
}

const hoverSound = new Audio('sfx/hover.wav');
hoverSound.volume = 0.3;

const playHoverSound = () => {
    hoverSound.currentTime = 0;
    hoverSound.play().catch(() => {});
};

export const StartMenu: React.FC<StartMenuProps> = ({ onNavigate }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-slate-700">Selamat Datang di Petualangan Excel!</h2>
                <p className="text-slate-500 mt-2 max-w-lg">Pilih salah satu opsi di bawah ini untuk memulai perjalanan Anda menjadi seorang Master Excel.</p>
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
                <MenuButton
                    title="Mulai Petualangan"
                    description="Lanjutkan perjalananmu melalui 100+ level tantangan."
                    icon={<PlayCircleIcon className="w-12 h-12 text-green-500"/>}
                    onClick={() => onNavigate(GameState.PartSelection)}
                />
                <MenuButton
                    title="Papan Peringkat"
                    description="Lihat peringkatmu di antara semua petualang Excel."
                    icon={<TrophyIcon className="w-12 h-12 text-amber-500"/>}
                    onClick={() => onNavigate(GameState.Leaderboard)}
                />
                <MenuButton
                    title="Pengaturan"
                    description="Sesuaikan pengalaman bermain, seperti pemisah formula."
                    icon={<Cog6ToothIcon className="w-12 h-12 text-sky-500"/>}
                    onClick={() => onNavigate(GameState.Settings)}
                />
                 <MenuButton
                    title="Kredit"
                    description="Lihat siapa saja di balik pembuatan Excel Saga."
                    icon={<InformationCircleIcon className="w-12 h-12 text-purple-500"/>}
                    onClick={() => onNavigate(GameState.Credits)}
                />
            </div>
        </div>
    );
};

interface MenuButtonProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    onClick: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ title, description, icon, onClick }) => {
    return (
        <button
            onClick={onClick}
            onMouseEnter={playHoverSound}
            className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 text-center flex flex-col items-center gap-4 transition-all duration-300 transform hover:shadow-2xl hover:-translate-y-2 hover:border-green-300"
        >
            {icon}
            <div>
                <h3 className="text-xl font-bold text-slate-800">{title}</h3>
                <p className="text-sm text-slate-500 mt-2">{description}</p>
            </div>
        </button>
    );
};
