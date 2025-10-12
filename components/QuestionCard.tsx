
import React, { useState, useEffect } from 'react';
import { Question, Answer } from '../types';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: Answer) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);

  useEffect(() => {
    setSelectedAnswer(null);
  }, [question]);

  const handleAnswerClick = (answer: Answer) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    onAnswer(answer);
  };

  const getButtonClass = (answer: Answer) => {
    if (!selectedAnswer) {
      return 'bg-indigo-600 hover:bg-indigo-500';
    }
    if (answer.isCorrect) {
      return 'bg-green-500 scale-105';
    }
    if (answer === selectedAnswer && !answer.isCorrect) {
      return 'bg-red-500';
    }
    return 'bg-indigo-600 opacity-50';
  };

  return (
    <div className="w-full max-w-3xl bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-slate-700 text-white">
      <div className="text-center mb-6">
        <p className="text-3xl md:text-4xl font-mono text-cyan-300">{question.questionText}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(answer)}
            disabled={!!selectedAnswer}
            className={`p-4 text-2xl font-bold rounded-lg transition-all duration-300 ease-in-out transform disabled:cursor-not-allowed ${getButtonClass(answer)}`}
          >
            {answer.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
