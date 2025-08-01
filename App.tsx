import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GameView } from './components/GameView';
import { MainMenu } from './components/MainMenu';
import { PartSelectionScreen } from './components/PartSelectionScreen';
import { LoginScreen } from './components/LoginScreen';
import { CongratulationsScreen } from './components/CongratulationsScreen';
import { levelData } from './constants';
import type { LevelCompletionStatus } from './types';
import { GameState } from './types';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid';

const musicTracks = {
  menu: '/music/menu.wav',
  game: '/music/in-game.wav',
  congrats: '/music/congrats.wav',
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [gameState, setGameState] = useState<GameState>(GameState.PartSelection);
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [selectedPart, setSelectedPart] = useState<1 | 2 | 3 | 4 | null>(null);
  const [completedPart, setCompletedPart] = useState<number | null>(null);
  const [levelCompletion, setLevelCompletion] = useState<LevelCompletionStatus>(
    levelData.reduce((acc, _, index) => {
      acc[index] = false;
      return acc;
    }, {} as LevelCompletionStatus)
  );
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Determine the correct track based on the current game state.
    let targetTrack: string;
    switch (gameState) {
        case GameState.InGame:
            targetTrack = musicTracks.game;
            break;
        case GameState.Congratulations:
            targetTrack = musicTracks.congrats;
            break;
        case GameState.PartSelection:
        case GameState.LevelSelection:
        default:
            targetTrack = musicTracks.menu;
            break;
    }

    if (audioRef.current && isAuthenticated) {
        const audio = audioRef.current;
        const newSrc = new URL(targetTrack, window.location.origin).href;

        // Change source only if it's different to avoid reloading the same track.
        if (audio.src !== newSrc) {
            audio.src = targetTrack;
        }

        if (isPlaying) {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error("Audio playback error:", error);
                });
            }
        } else {
            audio.pause();
        }
    } else if (audioRef.current) {
        audioRef.current.pause();
    }
  }, [gameState, isPlaying, isAuthenticated]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleLoginSuccess = useCallback(() => {
    setIsAuthenticated(true);
    setGameState(GameState.PartSelection);
  }, []);

  const handleSelectPart = useCallback((part: 1 | 2 | 3 | 4) => {
    setSelectedPart(part);
    setGameState(GameState.LevelSelection);
  }, []);

  const handleBackToPartSelection = useCallback(() => {
    setGameState(GameState.PartSelection);
    setSelectedPart(null);
  }, []);

  const handleSelectLevel = useCallback((levelIndex: number) => {
    setCurrentLevel(levelIndex);
    setGameState(GameState.InGame);
  }, []);

  const handleBackToLevelSelection = useCallback(() => {
    setGameState(GameState.LevelSelection);
  }, []);

  const handleLevelComplete = useCallback((levelIndex: number) => {
    setLevelCompletion(prev => ({ ...prev, [levelIndex]: true }));

    const partBoundaries = [9, 19, 29, 39];
    const partIndex = partBoundaries.indexOf(levelIndex);

    if (partIndex !== -1) {
        setCompletedPart(partIndex + 1);
        setGameState(GameState.Congratulations);
    }
  }, []);

  const handleNextLevel = useCallback(() => {
    if (currentLevel < levelData.length - 1) {
      const nextLevel = currentLevel + 1;
      setCurrentLevel(nextLevel);
      const nextLevelPart = nextLevel < 10 ? 1 : (nextLevel < 20 ? 2 : (nextLevel < 30 ? 3 : 4));
      if (selectedPart !== nextLevelPart) {
        setSelectedPart(nextLevelPart);
      }
    } else {
      setGameState(GameState.LevelSelection);
    }
  }, [currentLevel, selectedPart]);

  const handleContinueFromCongrats = useCallback(() => {
    setGameState(GameState.PartSelection);
    setSelectedPart(null);
  }, []);


  return (
    <>
      <audio ref={audioRef} loop />
      
      {!isAuthenticated ? (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
            <button
                onClick={togglePlayPause}
                className="fixed bottom-4 right-4 z-50 bg-white/70 backdrop-blur-sm p-3 rounded-full shadow-lg text-slate-700 hover:bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label={isPlaying ? 'Pause music' : 'Play music'}
            >
                {isPlaying ? (
                <SpeakerWaveIcon className="h-6 w-6" />
                ) : (
                <SpeakerXMarkIcon className="h-6 w-6" />
                )}
            </button>
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 text-slate-800 p-4 sm:p-6 lg:p-8">
            <header className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-green-700 font-press-start tracking-tight">
                Excel Saga
                </h1>
                <p className="text-slate-600 text-lg mt-2">Formula Frontier</p>
                <p className="text-sm text-slate-500 mt-1">by TanyaJawabExcel</p>
            </header>
            
            {gameState === GameState.PartSelection && (
                <PartSelectionScreen 
                onSelectPart={handleSelectPart}
                levelCompletion={levelCompletion} 
                />
            )}
            
            {gameState === GameState.LevelSelection && selectedPart && (
                <MainMenu 
                part={selectedPart}
                onSelectLevel={handleSelectLevel} 
                levelCompletion={levelCompletion}
                onBackToPartSelection={handleBackToPartSelection}
                />
            )}
            
            {gameState === GameState.InGame && (
                <GameView 
                levelIndex={currentLevel}
                onLevelComplete={handleLevelComplete}
                onBackToLevelSelection={handleBackToLevelSelection}
                onNextLevel={handleNextLevel}
                levelCompletion={levelCompletion}
                onSelectLevel={handleSelectLevel}
                />
            )}

            {gameState === GameState.Congratulations && completedPart && (
                <CongratulationsScreen 
                part={completedPart}
                onContinue={handleContinueFromCongrats}
                />
            )}
            </div>
        </>
      )}
    </>
  );
};

export default App;