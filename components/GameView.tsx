import React, { useState, useEffect, useCallback } from 'react';
import { levelData } from '../constants';
import type { LevelCompletionStatus, Question, User } from '../types';
import { MascotState } from '../types';
import { Sidebar } from './Sidebar';
import { GameTable } from './GameTable';
import { ActionPanel } from './ActionPanel';
import { ChevronUpIcon, ChevronDownIcon, StarIcon } from '@heroicons/react/24/solid';
import { geminiService } from '../services/geminiService';

const renderExplanation = (text: string) => {
    if (!text) return { __html: '' };
    const html = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code class="bg-slate-200 text-slate-800 px-1 rounded font-mono">$1</code>')
      .replace(/\n/g, '<br />');
    
    return { __html: html };
};

interface GameViewProps {
  user: User | null;
  levelIndex: number;
  onLevelComplete: (levelIndex: number) => void;
  onBackToLevelSelection: () => void;
  onNextLevel: () => void;
  levelCompletion: LevelCompletionStatus;
  onSelectLevel: (levelIndex: number) => void;
}

const normalizeAnswer = (answer: string): string => {
    if (typeof answer !== 'string') return '';
    let inQuotes = false;
    let result = '';
    for (const char of answer) {
        if (char === '"') inQuotes = !inQuotes;
        if (!inQuotes && char === ' ') continue;
        if (!inQuotes && char === ';') {
            result += ',';
            continue;
        }
        result += char;
    }
    return result.toLowerCase();
};

export const GameView: React.FC<GameViewProps> = ({
  user,
  levelIndex,
  onLevelComplete,
  onBackToLevelSelection,
  onNextLevel,
  levelCompletion,
  onSelectLevel
}) => {
  const level = levelData[levelIndex];

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState(false);
  
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [hint, setHint] = useState('');
  const [isAiHint, setIsAiHint] = useState(false);
  const [isHintLoading, setIsHintLoading] = useState(false);
  const [mascotState, setMascotState] = useState<MascotState>(MascotState.Idle);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showAlternatives, setShowAlternatives] = useState(false);
  
  const [isPasswordPromptVisible, setIsPasswordPromptVisible] = useState(false);
  const [passwordForAnswer, setPasswordForAnswer] = useState('');
  const [passwordError, setPasswordError] = useState('');


  useEffect(() => {
    const questionPool = level.questions;
    const randomQuestion = questionPool[Math.floor(Math.random() * questionPool.length)];
    setCurrentQuestion(randomQuestion);

    setUserAnswer('');
    setFeedback('');
    setHint('');
    setIsAiHint(false);
    setIsHintLoading(false);
    setShowAnswer(false);
    setShowAlternatives(false);
    setMascotState(MascotState.Idle);
    setIsAnsweredCorrectly(false);
  }, [levelIndex, level.questions]);
  
  const handleRangeSelected = useCallback((range: string) => {
    setUserAnswer(prev => prev + range);
  }, []);
  
  const isOverallLevelCompleted = levelCompletion[levelIndex];

  const handleCheckAnswer = useCallback(() => {
    if (!currentQuestion) return;

    const normalizedUserAnswer = normalizeAnswer(userAnswer);
    const { correctValue } = currentQuestion.answer;

    const isCorrect = Array.isArray(correctValue)
      ? correctValue.some(val => normalizeAnswer(val) === normalizedUserAnswer)
      : normalizeAnswer(correctValue) === normalizedUserAnswer;
    
    if (isCorrect) {
      setIsAnsweredCorrectly(true);
      setFeedback('Jawaban Benar! Anda telah menyelesaikan level ini!');
      onLevelComplete(levelIndex);
      setMascotState(MascotState.Celebrating);
    } else {
      setFeedback('Jawaban kurang tepat. Coba lagi!');
      setMascotState(MascotState.Incorrect);
      setTimeout(() => setMascotState(MascotState.Idle), 2000);
    }
  }, [currentQuestion, userAnswer, onLevelComplete, levelIndex]);

  const handleGetHint = useCallback(async () => {
    if (currentQuestion) {
        setIsHintLoading(true);
        setHint('');
        setIsAiHint(true);
        try {
            const aiHint = await geminiService.getAiHint(currentQuestion.challenge, level.table);
            setHint(aiHint);
        } catch (e) {
            setHint(currentQuestion.hint);
            setIsAiHint(false);
        } finally {
            setIsHintLoading(false);
        }
    }
  }, [currentQuestion, level.table]);

  const handleToggleAnswer = () => {
    if (showAnswer) {
        setShowAnswer(false);
        return;
    }

    if (user && user.password && !user.isAdmin) {
        setPasswordError('');
        setPasswordForAnswer('');
        setIsPasswordPromptVisible(true);
    } else {
        setShowAnswer(true);
    }
  };

  const handleVerifyPasswordAndShowAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (user && user.password && user.password === passwordForAnswer) {
        setShowAnswer(true);
        setIsPasswordPromptVisible(false);
        setPasswordForAnswer('');
        setPasswordError('');
    } else {
        setPasswordError('Password salah. Coba lagi.');
        setPasswordForAnswer('');
    }
  };
  
  const partOffset = Math.floor(levelIndex / 10) * 10;
  const partLevels = levelData.slice(partOffset, partOffset + 10);

  if (!currentQuestion) {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-xl font-semibold text-slate-600">Memuat level...</div>
        </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
      <Sidebar 
        levels={partLevels} 
        partOffset={partOffset}
        currentLevelIndex={levelIndex} 
        completionStatus={levelCompletion}
        onSelectLevel={onSelectLevel}
      />

      <main className="flex-grow bg-white rounded-2xl shadow-lg border border-slate-200 p-6 w-full lg:w-2/3">
        <header className="mb-4">
          <p className="text-sm font-semibold text-green-600">
            Level {level.id} &mdash; {level.theme}
          </p>
          <h2 className="text-3xl font-bold text-slate-800">{level.title}</h2>
        </header>
        
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4">
          <p className="text-slate-700">{currentQuestion.challenge}</p>
        </div>

        <GameTable
            table={level.table}
            onRangeSelect={handleRangeSelected}
        />

        <div className="mt-6">
          <label htmlFor="answer-input" className="block text-lg font-semibold mb-2 text-slate-700">Masukkan Jawabanmu:</label>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
                id="answer-input"
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder={currentQuestion.answer.type === 'formula' ? 'Contoh: =SUM(A1:B1)' : 'Ketik jawabanmu...'}
                className="flex-grow p-3 bg-slate-800 text-white border-2 border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition font-mono placeholder-slate-400"
                disabled={isAnsweredCorrectly}
            />
            <button onClick={handleCheckAnswer} disabled={isAnsweredCorrectly || !userAnswer} className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition disabled:bg-slate-400 disabled:cursor-not-allowed">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Periksa Jawaban
            </button>
          </div>
        </div>

        {feedback && (
          <div className={`mt-4 p-3 rounded-lg text-center font-semibold ${isAnsweredCorrectly ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {feedback}
          </div>
        )}

        {isAnsweredCorrectly && currentQuestion.explanation && (
            <div className="mt-4 p-4 rounded-lg bg-blue-50 border border-blue-200 text-blue-900">
                 <h4 className="font-bold text-blue-900 mb-2">Penjelasan Jawaban:</h4>
                 <div className="text-sm space-y-2" dangerouslySetInnerHTML={renderExplanation(currentQuestion.explanation)} />
            </div>
        )}

        {showAnswer && (
          <div className="mt-4 p-4 rounded-lg bg-sky-100 border border-sky-200 text-sky-800">
            <p className="font-bold mb-1">Jawaban yang Benar:</p>
            <code className="block bg-sky-200 p-2 rounded text-sm font-mono break-words">
              {Array.isArray(currentQuestion.answer.correctValue) ? currentQuestion.answer.correctValue[0] : currentQuestion.answer.correctValue}
            </code>
            {Array.isArray(currentQuestion.answer.correctValue) && currentQuestion.answer.correctValue.length > 1 && (
              <div className="mt-2">
                <button onClick={() => setShowAlternatives(prev => !prev)} className="text-sm text-sky-700 hover:underline font-semibold flex items-center gap-1">
                  {showAlternatives ? (
                    <>
                      <ChevronUpIcon className="h-4 w-4" />
                      Sembunyikan alternatif
                    </>
                  ) : (
                    <>
                      <ChevronDownIcon className="h-4 w-4" />
                      Lihat alternatif jawaban lain
                    </>
                  )}
                </button>
                {showAlternatives && (
                  <div className="mt-2 pl-2 border-l-2 border-sky-300">
                    <ul className="space-y-1">
                      {currentQuestion.answer.correctValue.slice(1).map((alt, index) => (
                        <li key={index}>
                          <code className="bg-sky-200 p-1 rounded text-sm font-mono break-words">
                            {alt}
                          </code>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

         {(hint || isHintLoading) && (
            <div className="mt-4 p-4 rounded-lg bg-yellow-100 border border-yellow-200 text-yellow-800">
                <p className="font-bold mb-1 flex items-center gap-1.5">
                    {isAiHint && <StarIcon className="w-5 h-5 text-yellow-600" />}
                    Petunjuk{isAiHint ? ' AI' : ''}:
                </p>
                {isHintLoading ? (
                    <p className="animate-pulse">AI sedang berpikir...</p>
                ) : (
                    <p>{hint}</p>
                )}
            </div>
        )}
      </main>

      <ActionPanel
        mascotState={mascotState}
        hint={hint}
        isAnsweredCorrectly={isAnsweredCorrectly}
        isOverallLevelCompleted={isOverallLevelCompleted}
        showAnswer={showAnswer}
        isHintLoading={isHintLoading}
        onGetHint={handleGetHint}
        onToggleAnswer={handleToggleAnswer}
        onNextLevel={onNextLevel}
        onBackToLevelSelection={onBackToLevelSelection}
      />

      {isPasswordPromptVisible && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm">
            <h3 className="text-lg font-bold mb-2 text-slate-800">Konfirmasi Password</h3>
            <p className="text-sm text-slate-600 mb-4">Untuk melihat jawaban, masukkan password akun Anda.</p>
            <form onSubmit={handleVerifyPasswordAndShowAnswer}>
              <label htmlFor="password-prompt" className="sr-only">Password</label>
              <input
                id="password-prompt"
                type="password"
                value={passwordForAnswer}
                onChange={(e) => {
                  setPasswordForAnswer(e.target.value);
                  setPasswordError('');
                }}
                className="w-full p-2 bg-white border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                autoFocus
              />
              {passwordError && <p className="text-red-600 text-xs mt-1">{passwordError}</p>}
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => setIsPasswordPromptVisible(false)} className="px-4 py-2 bg-slate-200 text-slate-800 font-semibold rounded-lg hover:bg-slate-300 transition-colors">
                  Batal
                </button>
                <button type="submit" className="px-4 py-2 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition-colors">
                  Konfirmasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
