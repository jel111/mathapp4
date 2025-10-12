import React from 'react';

interface StatisticsLessonProps {
  onStartQuiz: () => void;
  onBack: () => void;
}

const LessonCard: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
        <h3 className="text-xl font-bold text-pink-400">{title}</h3>
        <p className="mt-1 text-slate-300">{children}</p>
    </div>
);

const StatisticsLesson: React.FC<StatisticsLessonProps> = ({ onStartQuiz, onBack }) => {
  return (
    <div className="text-white bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-slate-700 max-w-3xl w-full">
      <h2 className="text-4xl font-bold text-cyan-300 text-center mb-6">Mission Briefing: Statistics</h2>
      <div className="space-y-4 text-lg">
          <LessonCard title="Mean">
              The 'Mean' is the average of all the numbers. You find it by adding all the numbers up and then dividing by how many numbers there are.
          </LessonCard>
          <LessonCard title="Median">
              The 'Median' is the middle number in a list of numbers that are sorted from smallest to largest.
          </LessonCard>
          <LessonCard title="Mode">
              The 'Mode' is the number that appears most often in a list of numbers. You can have more than one mode!
          </LessonCard>
          <LessonCard title="Range">
            The 'Range' is the difference between the highest and lowest numbers in a list. Just subtract the smallest from the biggest.
          </LessonCard>
      </div>
      <div className="mt-8 flex flex-col sm:flex-row-reverse justify-center items-center gap-4">
        <button
            onClick={onStartQuiz}
            className="w-full sm:w-auto px-8 py-4 bg-pink-500 text-white font-bold text-2xl rounded-lg shadow-lg hover:bg-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-300 transform hover:scale-105 transition-all duration-300"
        >
            Start Quiz
        </button>
        <button
            onClick={onBack}
            className="w-full sm:w-auto px-8 py-4 bg-slate-600 text-white font-bold text-2xl rounded-lg shadow-lg hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-400 transform hover:scale-105 transition-all duration-300"
        >
            Back to Menu
        </button>
      </div>
    </div>
  );
};

export default StatisticsLesson;