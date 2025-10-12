import React from 'react';
import { Topic } from '../types';

interface TopicSelectionScreenProps {
  onTopicSelect: (topic: Topic) => void;
}

const TopicButton: React.FC<{ onClick: () => void, title: string, description: string, colors: string }> = ({ onClick, title, description, colors }) => (
    <button
        onClick={onClick}
        className={`w-full text-left p-6 rounded-xl border border-slate-700 bg-slate-800/50 backdrop-blur-sm shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-cyan-500/20 focus:outline-none focus:ring-4 focus:ring-pink-400 ${colors}`}
    >
        <h2 className="text-3xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">{title}</h2>
        <p className="mt-2 text-slate-300">{description}</p>
    </button>
);

const TopicSelectionScreen: React.FC<TopicSelectionScreenProps> = ({ onTopicSelect }) => {
  return (
    <div className="text-center text-white max-w-3xl w-full">
      <h1 className="text-5xl md:text-7xl font-bold text-cyan-300 drop-shadow-[0_4px_4px_rgba(0,255,255,0.25)]">
        Math Blaster Missions
      </h1>
      <p className="mt-4 mb-10 text-lg text-slate-300">
        Welcome, astronaut! Please select your mission for today.
      </p>
      <div className="space-y-6">
        <TopicButton 
            onClick={() => onTopicSelect('multiplication-division')}
            title="Multiplication & Division"
            description="Practice your multiplication and division skills with whole numbers."
            colors="hover:border-cyan-400"
        />
        <TopicButton 
            onClick={() => onTopicSelect('fractions')}
            title="Fractions"
            description="Master adding and subtracting fractions with common denominators."
            colors="hover:border-pink-500"
        />
        <TopicButton 
            onClick={() => onTopicSelect('statistics')}
            title="Simple Statistics"
            description="Learn about mean, median, mode, and range with a quick lesson and quiz."
            colors="hover:border-purple-500"
        />
      </div>
    </div>
  );
};

export default TopicSelectionScreen;
