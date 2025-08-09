import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GameView } from './components/GameView';
import { MainMenu } from './components/MainMenu';
import { PartSelectionScreen } from './components/PartSelectionScreen';
import { LoginScreen } from './components/LoginScreen';
import { GoogleLoginScreen } from './components/GoogleLoginScreen';
import { CongratulationsScreen } from './components/CongratulationsScreen';
import { AdminPanel } from './components/AdminPanel';
import { ProfileScreen } from './components/ProfileScreen';
import { MiniGameArcade } from './components/MiniGameArcade';
import { FormulaRacer } from './components/FormulaRacer';
import { CellFinder } from './components/CellFinder';
import { FunctionMatch } from './components/FunctionMatch';
import { ChartChamp } from './components/ChartChamp';
import { ShortcutShowdown } from './components/ShortcutShowdown';
import { ErrorExterminator } from './components/ErrorExterminator';
import { PivotPro } from './components/PivotPro';
import { FillHandleFrenzy } from './components/FillHandleFrenzy';
import { ConditionalClues } from './components/ConditionalClues';
import { WhatsTheFunction } from './components/WhatsTheFunction';
import { CertificateScreen } from './components/CertificateScreen';
import { VlookupVenture } from './components/VlookupVenture';
import { DataValidationDash } from './components/DataValidationDash';
import { FreezePanesPuzzle } from './components/FreezePanesPuzzle';
import { SortFilterSprint } from './components/SortFilterSprint';
import { TextSplitter } from './components/TextSplitter';
import { GoalSeekGuru } from './components/GoalSeekGuru';
import { KeyboardNinja } from './components/KeyboardNinja';
import { ChartElementId } from './components/ChartElementId';
import { ConditionalLogic } from './components/ConditionalLogic';
import { DynamicArrayDrill } from './components/DynamicArrayDrill';
import { WhatIfWizard } from './components/WhatIfWizard';
import { PasteSpecialPro } from './components/PasteSpecialPro';
import { NamedRangeRanger } from './components/NamedRangeRanger';
import { AbsoluteRelativeRace } from './components/AbsoluteRelativeRace';
import { SparklineSpeedster } from './components/SparklineSpeedster';
import { TrainingMode } from './components/TrainingMode';
import { StartMenu } from './components/StartMenu';
import { SettingsScreen } from './components/SettingsScreen';
import { CreditsScreen } from './components/CreditsScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';
import { ExcelChampionshipLobby } from './components/ExcelChampionshipLobby';
import { ChampionshipView } from './components/ChampionshipView';
import { levelData } from './constants';
import { championshipCases } from './championshipData';
import type { LevelCompletionStatus, PartNumber, User, AppSettings, ChampionshipCase } from './types';
import { GameState } from './types';
import { SpeakerWaveIcon, SpeakerXMarkIcon, ArrowRightOnRectangleIcon, WrenchScrewdriverIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { api } from './api';

const musicTracks = {
  menu: 'music/menu.wav',
  game: 'music/in-game.wav',
  congrats: 'music/congrat.wav',
};

interface SessionState {
  user: User | null;
  isLoading: boolean;
}

export const SettingsContext = React.createContext<{settings: AppSettings; onSettingsChange: (settings: AppSettings) => void;}>({
    settings: { formulaSeparator: ';', numberFormat: 'eu', dateFormat: 'DD-MM-YYYY', referenceStyle: 'A1' },
    onSettingsChange: () => {},
});

const getDefaultCompletionStatus = (): LevelCompletionStatus => {
    return levelData.reduce((acc, _, index) => {
      acc[index] = false;
      return acc;
    }, {} as LevelCompletionStatus);
};

const isGameComplete = (progress: LevelCompletionStatus): boolean => {
    for (let i = 0; i < levelData.length; i++) {
        if (!progress[i]) {
            return false;
        }
    }
    return true;
};

const App: React.FC = () => {
  const [session, setSession] = useState<SessionState>({ user: null, isLoading: true });
  const [levelCompletion, setLevelCompletion] = useState<LevelCompletionStatus>(getDefaultCompletionStatus());
  
  const [gameState, setGameState] = useState<GameState>(GameState.StartMenu);
  const [loginView, setLoginView] = useState<'password' | 'google'>('password');
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [selectedPart, setSelectedPart] = useState<number | null>(null);
  const [completedPart, setCompletedPart] = useState<number | null>(null);
  const [currentChampionshipCase, setCurrentChampionshipCase] = useState<ChampionshipCase | null>(null);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
        const savedSettings = localStorage.getItem('excelSagaSettings');
        if (savedSettings) {
            const parsed = JSON.parse(savedSettings);
            // Gracefully handle old settings and add new ones with defaults
            return {
                formulaSeparator: parsed.formulaSeparator === ',' || parsed.formulaSeparator === ';' ? parsed.formulaSeparator : ';',
                numberFormat: parsed.numberFormat === 'us' ? 'us' : 'eu',
                dateFormat: ['DD-MM-YYYY', 'MM-DD-YYYY', 'YYYY-MM-DD'].includes(parsed.dateFormat) ? parsed.dateFormat : 'DD-MM-YYYY',
                referenceStyle: parsed.referenceStyle === 'R1C1' ? 'R1C1' : 'A1',
            };
        }
    } catch (e) { console.error('Failed to load settings'); }
    // Default for a fresh user (Indonesian style)
    return { 
        formulaSeparator: ';',
        numberFormat: 'eu',
        dateFormat: 'DD-MM-YYYY',
        referenceStyle: 'A1',
    };
  });

  const handleSettingsChange = (newSettings: AppSettings) => {
    setSettings(newSettings);
    localStorage.setItem('excelSagaSettings', JSON.stringify(newSettings));
  };

  const refreshSessionData = useCallback(async () => {
    const userId = localStorage.getItem('excelSagaSession');
    if (userId) {
      const { user } = await api.getUserById(userId);
      if (user) {
        setSession({ user, isLoading: false });
        setLevelCompletion(user.progress);
      }
    }
  }, []);

  const handleUserUpdate = useCallback((updatedUser: User) => {
    if (session.user && session.user.id !== updatedUser.id) {
        localStorage.setItem('excelSagaSession', updatedUser.id);
    }
    setSession({ user: updatedUser, isLoading: false });
    setLevelCompletion(updatedUser.progress);
  }, [session.user]);

  // Check for an active session on initial load
  useEffect(() => {
    const checkSession = async () => {
      const userId = localStorage.getItem('excelSagaSession');
      if (userId) {
        const { user } = await api.getUserById(userId);
        if (user) {
          setSession({ user, isLoading: false });
          setLevelCompletion(user.progress);
        } else {
          localStorage.removeItem('excelSagaSession');
          setSession({ user: null, isLoading: false });
        }
      } else {
        setSession({ user: null, isLoading: false });
      }
    };
    checkSession();
  }, []);

  // Save level completion progress to our "backend" whenever it changes
  useEffect(() => {
    if (session.user) {
      api.saveProgress(session.user.id, levelCompletion);
    }
  }, [levelCompletion, session.user]);

  // Audio track management
  useEffect(() => {
    let targetTrack: string;
    switch (gameState) {
        case GameState.InGame:
        case GameState.ExcelChampionship:
            targetTrack = musicTracks.game;
            break;
        case GameState.Certificate:
            targetTrack = musicTracks.congrats;
            break;
        case GameState.StartMenu:
        case GameState.Settings:
        case GameState.Credits:
        case GameState.Leaderboard:
        case GameState.PartSelection:
        case GameState.LevelSelection:
        case GameState.Congratulations:
        case GameState.MiniGameArcade:
        case GameState.TrainingMode:
        case GameState.ExcelChampionshipLobby:
        case GameState.FormulaRacer:
        case GameState.CellFinder:
        case GameState.FunctionMatch:
        case GameState.ChartChamp:
        case GameState.ShortcutShowdown:
        case GameState.ErrorExterminator:
        case GameState.PivotPro:
        case GameState.FillHandleFrenzy:
        case GameState.ConditionalClues:
        case GameState.WhatsTheFunction:
        case GameState.VlookupVenture:
        case GameState.DataValidationDash:
        case GameState.FreezePanesPuzzle:
        case GameState.SortFilterSprint:
        case GameState.TextSplitter:
        case GameState.GoalSeekGuru:
        case GameState.KeyboardNinja:
        case GameState.ChartElementId:
        case GameState.ConditionalLogic:
        case GameState.DynamicArrayDrill:
        case GameState.WhatIfWizard:
        case GameState.PasteSpecialPro:
        case GameState.NamedRangeRanger:
        case GameState.AbsoluteRelativeRace:
        case GameState.SparklineSpeedster:
        default:
            targetTrack = musicTracks.menu;
            break;
    }

    if (audioRef.current && session.user) {
        const audio = audioRef.current;
        const newSrc = new URL(targetTrack, window.location.origin).href;

        if (audio.src !== newSrc) {
            audio.src = targetTrack;
        }

        if (isPlaying) {
            audio.play().catch(error => console.error("Audio playback error:", error));
        } else {
            audio.pause();
        }
    } else if (audioRef.current) {
        audioRef.current.pause();
    }
  }, [gameState, isPlaying, session.user]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePasswordLogin = useCallback(async (email: string, password_input: string) => {
    const { user, error } = await api.login(email, password_input);
    if (user) {
        localStorage.setItem('excelSagaSession', user.id);
        setSession({ user, isLoading: false });
        setLevelCompletion(user.progress);
        setGameState(GameState.StartMenu);
    } else {
        throw new Error(error || 'Login gagal');
    }
  }, []);

  const handleGoogleRegister = useCallback(async (email: string, password_input: string) => {
    const { user, error } = await api.registerOrLoginWithGoogle(email, password_input);
    if (user) {
        localStorage.setItem('excelSagaSession', user.id);
        setSession({ user, isLoading: false });
        setLevelCompletion(user.progress);
        setGameState(GameState.StartMenu);
    } else {
        throw new Error(error || 'Login atau pendaftaran Google gagal.');
    }
  }, []);
  
  const handleLogout = useCallback(() => {
    localStorage.removeItem('excelSagaSession');
    setSession({ user: null, isLoading: false });
    setLevelCompletion(getDefaultCompletionStatus());
    setLoginView('password');
    setGameState(GameState.StartMenu);
  }, []);

  const handleSelectPart = useCallback((part: number) => {
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

  const handleLevelComplete = useCallback(async (levelIndex: number) => {
    const newCompletionStatus = { ...levelCompletion, [levelIndex]: true };
    setLevelCompletion(newCompletionStatus);

    // Check for overall game completion first
    if (session.user && isGameComplete(newCompletionStatus)) {
        // If the game is complete, always show the certificate.
        // Create it if it doesn't exist.
        if (!session.user.certificate) {
            const { certificate } = await api.createCertificate(session.user.id, session.user.fullName || session.user.id);
            if (certificate) {
                await refreshSessionData(); // Refresh user data to include certificate
            }
        }
        setGameState(GameState.Certificate);
        return; // Skip regular congratulations screen
    }

    const partBoundaries = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
    const partIndex = partBoundaries.indexOf(levelIndex);

    if (partIndex !== -1) {
        setCompletedPart(partIndex + 1);
        setGameState(GameState.Congratulations);
    }
  }, [levelCompletion, session.user, refreshSessionData]);

  const handleNextLevel = useCallback(() => {
    if (currentLevel < levelData.length - 1) {
      const nextLevel = currentLevel + 1;
      setCurrentLevel(nextLevel);
      const nextLevelPart = Math.floor(nextLevel / 10) + 1;
      if (selectedPart !== nextLevelPart) {
        setSelectedPart(nextLevelPart as PartNumber);
      }
      setGameState(GameState.InGame);
    } else {
      setGameState(GameState.PartSelection);
    }
  }, [currentLevel, selectedPart]);

  const handleContinueFromCongrats = useCallback(() => {
    setGameState(GameState.PartSelection);
    setSelectedPart(null);
  }, []);
  
  const handleBackToGame = useCallback(() => {
    setGameState(GameState.StartMenu);
  }, []);

  const handleGoToProfile = useCallback(() => {
      setGameState(GameState.Profile);
  }, []);

  const handleGoToArcade = useCallback(() => {
      setGameState(GameState.MiniGameArcade);
  }, []);

  const handleStartTraining = useCallback(() => {
      setGameState(GameState.TrainingMode);
  }, []);

  const handleStartChampionship = useCallback(() => {
    setGameState(GameState.ExcelChampionshipLobby);
  }, []);

  const handleSelectChampionshipCase = useCallback((caseId: number) => {
    const selectedCase = championshipCases.find(c => c.id === caseId);
    if (selectedCase) {
        setCurrentChampionshipCase(selectedCase);
        setGameState(GameState.ExcelChampionship);
    }
  }, []);

  const handleCaseComplete = useCallback(async (caseId: number) => {
    if (session.user) {
        await api.saveChampionshipProgress(session.user.id, caseId);
        await refreshSessionData();
    }
  }, [session.user, refreshSessionData]);

  const handleStartMiniGame = (game: 'FormulaRacer' | 'CellFinder' | 'FunctionMatch' | 'ChartChamp' | 'ShortcutShowdown' | 'ErrorExterminator' | 'PivotPro' | 'FillHandleFrenzy' | 'ConditionalClues' | 'WhatsTheFunction' | 'VlookupVenture' | 'DataValidationDash' | 'FreezePanesPuzzle' | 'SortFilterSprint' | 'TextSplitter' | 'GoalSeekGuru' | 'KeyboardNinja' | 'ChartElementId' | 'ConditionalLogic' | 'DynamicArrayDrill' | 'WhatIfWizard' | 'PasteSpecialPro' | 'NamedRangeRanger' | 'AbsoluteRelativeRace' | 'SparklineSpeedster') => {
      switch(game) {
          case 'FormulaRacer': setGameState(GameState.FormulaRacer); break;
          case 'CellFinder': setGameState(GameState.CellFinder); break;
          case 'FunctionMatch': setGameState(GameState.FunctionMatch); break;
          case 'ChartChamp': setGameState(GameState.ChartChamp); break;
          case 'ShortcutShowdown': setGameState(GameState.ShortcutShowdown); break;
          case 'ErrorExterminator': setGameState(GameState.ErrorExterminator); break;
          case 'PivotPro': setGameState(GameState.PivotPro); break;
          case 'FillHandleFrenzy': setGameState(GameState.FillHandleFrenzy); break;
          case 'ConditionalClues': setGameState(GameState.ConditionalClues); break;
          case 'WhatsTheFunction': setGameState(GameState.WhatsTheFunction); break;
          case 'VlookupVenture': setGameState(GameState.VlookupVenture); break;
          case 'DataValidationDash': setGameState(GameState.DataValidationDash); break;
          case 'FreezePanesPuzzle': setGameState(GameState.FreezePanesPuzzle); break;
          case 'SortFilterSprint': setGameState(GameState.SortFilterSprint); break;
          case 'TextSplitter': setGameState(GameState.TextSplitter); break;
          case 'GoalSeekGuru': setGameState(GameState.GoalSeekGuru); break;
          case 'KeyboardNinja': setGameState(GameState.KeyboardNinja); break;
          case 'ChartElementId': setGameState(GameState.ChartElementId); break;
          case 'ConditionalLogic': setGameState(GameState.ConditionalLogic); break;
          case 'DynamicArrayDrill': setGameState(GameState.DynamicArrayDrill); break;
          case 'WhatIfWizard': setGameState(GameState.WhatIfWizard); break;
          case 'PasteSpecialPro': setGameState(GameState.PasteSpecialPro); break;
          case 'NamedRangeRanger': setGameState(GameState.NamedRangeRanger); break;
          case 'AbsoluteRelativeRace': setGameState(GameState.AbsoluteRelativeRace); break;
          case 'SparklineSpeedster': setGameState(GameState.SparklineSpeedster); break;
      }
  };

  const renderLogin = () => {
    if (loginView === 'password') {
      return <LoginScreen onLogin={handlePasswordLogin} onGoogleLoginClick={() => setLoginView('google')} />;
    }
    if (loginView === 'google') {
      return <GoogleLoginScreen onRegister={handleGoogleRegister} onBack={() => setLoginView('password')} />;
    }
    return null;
  }
  
  if (session.isLoading) {
      return (
          <div className="flex items-center justify-center min-h-screen bg-slate-100">
              <p className="text-xl font-semibold text-slate-600">Memuat sesi...</p>
          </div>
      )
  }

  return (
    <SettingsContext.Provider value={{ settings, onSettingsChange: handleSettingsChange }}>
      <audio ref={audioRef} loop />
      
      {!session.user ? (
        renderLogin()
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
            <header className="text-center mb-8 relative">
                <h1 className="text-4xl md:text-5xl font-bold text-green-700 font-press-start tracking-tight">
                Excel Saga
                </h1>
                <p className="text-slate-600 text-lg mt-2">Formula Frontier</p>
                <p className="text-sm text-slate-500 mt-1">by TanyaJawabExcel</p>
                
                <div className="absolute top-0 right-0 flex items-center gap-2 sm:gap-4 bg-white/60 backdrop-blur-sm p-2 rounded-lg shadow">
                    {session.user.isAdmin && gameState !== GameState.AdminPanel && (
                        <button onClick={() => setGameState(GameState.AdminPanel)} className="flex items-center gap-2 px-3 py-1.5 bg-sky-500 text-white text-sm font-semibold rounded-md hover:bg-sky-600 transition-colors" title="Admin Panel">
                            <WrenchScrewdriverIcon className="w-5 h-5"/>
                            <span className="hidden md:inline">Admin</span>
                        </button>
                    )}
                   {gameState !== GameState.Profile && (
                        <button onClick={handleGoToProfile} className="flex items-center gap-2 px-3 py-1.5 bg-slate-200 text-slate-700 text-sm font-semibold rounded-md hover:bg-slate-300 transition-colors" title="Profil">
                            <UserCircleIcon className="w-5 h-5"/>
                            <span className="hidden md:inline">Profil</span>
                        </button>
                    )}
                   <span className="text-sm font-semibold text-slate-600 hidden sm:inline max-w-[150px] truncate" title={session.user.fullName || session.user.id}>{session.user.fullName || session.user.id}</span>
                   <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-1.5 bg-red-500 text-white text-sm font-semibold rounded-md hover:bg-red-600 transition-colors" title="Logout">
                       <ArrowRightOnRectangleIcon className="w-5 h-5"/>
                       <span className="hidden md:inline">Logout</span>
                   </button>
                </div>
            </header>
            
            {gameState === GameState.StartMenu && <StartMenu onNavigate={setGameState} />}
            
            {gameState === GameState.Settings && <SettingsScreen onBack={() => setGameState(GameState.StartMenu)} />}

            {gameState === GameState.Credits && <CreditsScreen onBack={() => setGameState(GameState.StartMenu)} />}

            {gameState === GameState.Leaderboard && <LeaderboardScreen currentUser={session.user} onBack={() => setGameState(GameState.StartMenu)} />}
            
            {gameState === GameState.PartSelection && (
                <PartSelectionScreen 
                    user={session.user}
                    onSelectPart={handleSelectPart}
                    levelCompletion={levelCompletion} 
                    onBecomeMember={refreshSessionData}
                    onGoToArcade={handleGoToArcade}
                    onStartTraining={handleStartTraining}
                    onStartChampionship={handleStartChampionship}
                    onBack={() => setGameState(GameState.StartMenu)}
                />
            )}
            
            {gameState === GameState.LevelSelection && selectedPart && (
                <MainMenu 
                part={selectedPart as PartNumber}
                onSelectLevel={handleSelectLevel} 
                levelCompletion={levelCompletion}
                onBackToPartSelection={handleBackToPartSelection}
                />
            )}
            
            {gameState === GameState.InGame && (
                <GameView 
                user={session.user}
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
            
            {gameState === GameState.AdminPanel && session.user && (
                <AdminPanel user={session.user} onBack={handleBackToGame} />
            )}
            
            {gameState === GameState.Profile && session.user && (
                <ProfileScreen 
                    user={session.user} 
                    onBack={handleBackToGame} 
                    onUpdateSuccess={handleUserUpdate}
                />
            )}

            {gameState === GameState.Certificate && session.user && (
              <CertificateScreen user={session.user} onBack={handleBackToGame} />
            )}

            {gameState === GameState.MiniGameArcade && (
                <MiniGameArcade 
                    user={session.user}
                    levelCompletion={levelCompletion}
                    onStartGame={handleStartMiniGame}
                    onBack={handleBackToGame}
                />
            )}
            
            {gameState === GameState.ExcelChampionshipLobby && (
                <ExcelChampionshipLobby onStartCase={handleSelectChampionshipCase} onBack={() => setGameState(GameState.PartSelection)} />
            )}

            {gameState === GameState.ExcelChampionship && currentChampionshipCase && (
                <ChampionshipView 
                    user={session.user}
                    caseData={currentChampionshipCase} 
                    onBack={() => setGameState(GameState.ExcelChampionshipLobby)} 
                    onCaseComplete={handleCaseComplete}
                />
            )}


            {gameState === GameState.TrainingMode && <TrainingMode onBack={() => setGameState(GameState.PartSelection)} />}
            {gameState === GameState.FormulaRacer && <FormulaRacer onBack={() => setGameState(GameState.MiniGameArcade)} />}
            {gameState === GameState.CellFinder && <CellFinder onBack={() => setGameState(GameState.MiniGameArcade)} />}
            {gameState === GameState.FunctionMatch && <FunctionMatch onBack={() => setGameState(GameState.MiniGameArcade)} />}
            {gameState === GameState.ChartChamp && <ChartChamp onBack={() => setGameState(GameState.MiniGameArcade)} />}
            {gameState === GameState.ShortcutShowdown && <ShortcutShowdown onBack={() => setGameState(GameState.MiniGameArcade)} />}
            {gameState === GameState.ErrorExterminator && <ErrorExterminator onBack={() => setGameState(GameState.MiniGameArcade)} />}
            {gameState === GameState.PivotPro && <PivotPro onBack={() => setGameState(GameState.MiniGameArcade)} />}
            {gameState === GameState.FillHandleFrenzy && <FillHandleFrenzy onBack={() => setGameState(GameState.MiniGameArcade)} />}
            {gameState === GameState.ConditionalClues && <ConditionalClues onBack={() => setGameState(GameState.MiniGameArcade)} />}
            {gameState === GameState.WhatsTheFunction && <WhatsTheFunction onBack={() => setGameState(GameState.MiniGameArcade)} />}
            {gameState === GameState.VlookupVenture && <VlookupVenture onBack={() => setGameState(GameState.MiniGameArcade)} />}
            {gameState === GameState.DataValidationDash && <DataValidationDash onBack={() => setGameState(GameState.MiniGameArcade)} />}
            {gameState === GameState.FreezePanesPuzzle && <FreezePanesPuzzle onBack={() => setGameState(GameState.MiniGameArcade)} />}
            {gameState === GameState.SortFilterSprint && <SortFilterSprint onBack={() => setGameState(GameState.MiniGameArcade)} />}
            {gameState === GameState.TextSplitter && <TextSplitter onBack={() => setGameState(GameState.MiniGameArcade)} />}
            {gameState === GameState.GoalSeekGuru && <GoalSeekGuru onBack={() => setGameState(GameState.MiniGameArcade)} />}
            {gameState === GameState.KeyboardNinja && <KeyboardNinja onBack={() => setGameState(GameState.MiniGameArcade)} />}
            {gameState === GameState.ChartElementId && <ChartElementId onBack={() => setGameState(GameState.MiniGameArcade)} />}
            {gameState === GameState.ConditionalLogic && <ConditionalLogic onBack={() => setGameState(GameState.MiniGameArcade)} />}
            {gameState === GameState.DynamicArrayDrill && <DynamicArrayDrill onBack={() => setGameState(GameState.MiniGameArcade)} />}
            {gameState === GameState.WhatIfWizard && <WhatIfWizard onBack={() => setGameState(GameState.MiniGameArcade)} />}
            {gameState === GameState.PasteSpecialPro && <PasteSpecialPro onBack={() => setGameState(GameState.MiniGameArcade)} />}
            {gameState === GameState.NamedRangeRanger && <NamedRangeRanger onBack={() => setGameState(GameState.MiniGameArcade)} />}
            {gameState === GameState.AbsoluteRelativeRace && <AbsoluteRelativeRace onBack={() => setGameState(GameState.MiniGameArcade)} />}
            {gameState === GameState.SparklineSpeedster && <SparklineSpeedster onBack={() => setGameState(GameState.MiniGameArcade)} />}

            </div>
        </>
      )}
    </SettingsContext.Provider>
  );
};

export default App;