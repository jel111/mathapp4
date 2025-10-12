import React, { useState, useCallback } from 'react';
import { GameState, Question, Topic } from './types';
import { generateQuestions } from './services/mathService';
import TopicSelectionScreen from './components/StartScreen';
import EndScreen from './components/EndScreen';
import QuestionCard from './components/QuestionCard';
import StatisticsLesson from './components/StatisticsLesson';

const TOTAL_QUESTIONS = 10;

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.TopicSelection);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const startQuiz = useCallback((topic: Topic) => {
    setQuestions(generateQuestions(TOTAL_QUESTIONS, topic));
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameState(GameState.Playing);
  }, []);

  const handleTopicSelect = useCallback((topic: Topic) => {
    if (topic === 'statistics') {
      setGameState(GameState.StatisticsLesson);
    } else {
      startQuiz(topic);
    }
  }, [startQuiz]);
  
  const handleReturnToMenu = useCallback(() => {
    setQuestions([]);
    setGameState(GameState.TopicSelection);
  }, []);

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setGameState(GameState.Finished);
    }
  }, [currentQuestionIndex]);
  
  const handleAnswer = useCallback((answer: { isCorrect: boolean }) => {
    if (answer.isCorrect) {
      setScore(prev => prev + 1);
    }
    setTimeout(nextQuestion, 1500);
  }, [nextQuestion]);

  const renderGameContent = () => {
    switch (gameState) {
      case GameState.TopicSelection:
        return <TopicSelectionScreen onTopicSelect={handleTopicSelect} />;
      case GameState.StatisticsLesson:
        return <StatisticsLesson onStartQuiz={() => startQuiz('statistics')} onBack={handleReturnToMenu} />;
      case GameState.Finished:
        return <EndScreen score={score} totalQuestions={TOTAL_QUESTIONS} onReturnToMenu={handleReturnToMenu} />;
      case GameState.Playing:
        if (questions.length === 0) return null;
        return (
          <div className="w-full px-4 flex flex-col items-center gap-6">
            <div className="w-full max-w-3xl flex justify-between items-center text-white font-bold text-2xl">
                <button
                    onClick={handleReturnToMenu}
                    className="px-4 py-2 bg-slate-700 text-slate-200 font-semibold text-lg rounded-lg shadow-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-pink-400 transform hover:scale-105 transition-all duration-300"
                    aria-label="Return to main menu"
                >
                    &larr; Menu
                </button>
                <div className="text-right">
                    <span className="block">Score: {score}</span>
                    <span className="block text-lg opacity-75">{currentQuestionIndex + 1} / {TOTAL_QUESTIONS}</span>
                </div>
            </div>
            <QuestionCard 
              question={questions[currentQuestionIndex]} 
              onAnswer={handleAnswer} 
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-slate-900 to-black flex items-center justify-center p-4">
      {renderGameContent()}
    </div>
  );
};

export default App;