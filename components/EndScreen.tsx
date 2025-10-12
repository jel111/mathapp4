import React from 'react';

interface EndScreenProps {
  score: number;
  totalQuestions: number;
  onReturnToMenu: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ score, totalQuestions, onReturnToMenu }) => {
    const percentage = Math.round((score / totalQuestions) * 100);
    let message = "";
    if (percentage === 100) {
        message = "Mission Perfect! You're a math superstar!";
    } else if (percentage >= 80) {
        message = "Great work, astronaut! Your math skills are out of this world!";
    } else if (percentage >= 50) {
        message = "Good effort! Keep practicing to reach the stars!";
    } else {
        message = "Mission needs a reboot. Don't give up, try again!";
    }


  return (
    <div className="text-center text-white bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-slate-700">
      <h2 className="text-4xl font-bold text-cyan-300">Mission Complete!</h2>
      <p className="text-6xl font-bold my-4">{score} / {totalQuestions}</p>
       <div className="w-full bg-slate-700 rounded-full h-8 my-4">
        <div 
          className="bg-gradient-to-r from-cyan-400 to-pink-500 h-8 rounded-full transition-all duration-1000 ease-out" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-xl mt-4 text-slate-300">{message}</p>
      <button
        onClick={onReturnToMenu}
        className="mt-8 px-8 py-4 bg-pink-500 text-white font-bold text-2xl rounded-lg shadow-lg hover:bg-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-300 transform hover:scale-105 transition-all duration-300"
      >
        Back to Menu
      </button>
    </div>
  );
};

export default EndScreen;
