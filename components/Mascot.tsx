import React from 'react';
import type { MascotState } from '../types';

interface MascotProps {
  state: MascotState;
}

const mascotStyles = {
    idle: { eyes: 'M8 10 H16', mouth: 'M8 14 Q12 16 16 14' },
    thinking: { eyes: 'M8 10 H16', mouth: 'M8 14 H16' },
    correct: { eyes: 'M8 11 C8 9 10 9 10 11 M14 11 C14 9 16 9 16 11', mouth: 'M8 14 Q12 18 16 14' },
    incorrect: { eyes: 'M8 11 L11 9 M8 9 L11 11 M13 11 L16 9 M13 9 L16 11', mouth: 'M8 16 Q12 14 16 16' },
    celebrating: { eyes: 'M7 9 A2 2 0 0 1 11 9 A2 2 0 0 1 7 9 M13 9 A2 2 0 0 1 17 9 A2 2 0 0 1 13 9', mouth: 'M7 14 C7 17 17 17 17 14 Q12 19 7 14' },
};

export const Mascot: React.FC<MascotProps> = ({ state }) => {
  const { eyes, mouth } = mascotStyles[state] || mascotStyles.idle;

  return (
    <svg 
      viewBox="0 0 24 24" 
      className="w-32 h-32 transition-all duration-300" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M12 2 C6.477 2 2 6.477 2 12 C2 17.523 6.477 22 12 22 C17.523 22 22 17.523 22 12 C22 6.477 17.523 2 12 2 Z" 
        className="fill-green-200 text-green-500"
      />
      <path d={eyes} className="text-green-800 transition-all duration-300" />
      <path d={mouth} className="text-green-800 transition-all duration-300" />
      
      {state === 'celebrating' && (
        <g className="text-yellow-400 animate-bounce">
            <path d="M4 4 L6 6" />
            <path d="M20 4 L18 6" />
            <path d="M12 1 V-1" />
        </g>
      )}
      {state === 'thinking' && (
         <g className="text-blue-500">
            <circle cx="18" cy="6" r="1" className="animate-ping" />
            <circle cx="20" cy="4" r="0.5" className="animate-ping delay-100" />
            <circle cx="16" cy="4" r="0.5" className="animate-ping delay-200" />
         </g>
      )}
    </svg>
  );
};