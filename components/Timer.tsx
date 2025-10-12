
import React, { useState, useEffect } from 'react';

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
  isPaused: boolean;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp, isPaused }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev - (100 / duration);
        if (newProgress <= 0) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return newProgress;
      });
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, onTimeUp, isPaused]);

  return (
    <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
      <div
        className="bg-gradient-to-r from-cyan-400 to-pink-500 h-4 rounded-full transition-all duration-1000 linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default Timer;
