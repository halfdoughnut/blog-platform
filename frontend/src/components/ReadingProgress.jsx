import React from 'react';
import { useReadingProgress } from '../hooks/useReadingTime';

const ReadingProgress = ({ 
  position = "top", 
  showTimeSpent = true, 
  color = "amber",
  height = "thin" 
}) => {
  const { progress } = useReadingProgress();

  // Color variants
  const colors = {
    amber: "bg-amber-400",
    blue: "bg-blue-400",
    green: "bg-green-400",
    purple: "bg-purple-400",
    pink: "bg-pink-400"
  };

  // Height variants
  const heights = {
    thin: "h-1",
    medium: "h-2",
    thick: "h-3"
  };

  // Position styles
  const positions = {
    top: "fixed top-0 left-0 right-0 z-50",
    bottom: "fixed bottom-0 left-0 right-0 z-50",
    sticky: "sticky top-0 z-40"
  };

  // const formatTimeSpent = (seconds) => {
  //   if (seconds < 60) return `${seconds}s`;
  //   const minutes = Math.floor(seconds / 60);
  //   const remainingSeconds = seconds % 60;
  //   return `${minutes}m ${remainingSeconds}s`;
  // };

  return (
    <>
      {/* Progress Bar */}
      <div className={`${positions[position]} bg-gray-200/20 backdrop-blur-sm`}>
        <div
          className={`${colors[color]} ${heights[height]} transition-all duration-300 ease-out`}
          style={{
            width: `${progress}%`,
            boxShadow: progress > 5 ? `0 0 10px ${colors[color].replace('bg-', 'rgba(')}` : 'none'
          }}
        />
      </div>

      {/* Reading Status Indicator removed as requested */}

      {/* Reading completion celebration */}
      {progress >= 100 && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-lg font-medium animate-in slide-in-from-top duration-500 shadow-xl">
            <div className="flex items-center gap-2">
              <span className="text-lg">🎉</span>
              <span>Great read! Article completed</span>
              <span className="text-lg">✨</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReadingProgress;
