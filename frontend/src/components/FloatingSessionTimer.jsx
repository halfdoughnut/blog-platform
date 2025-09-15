import React, { useState } from 'react';
import SessionClock from './SessionClock';

const FloatingSessionTimer = ({ position = "bottom-right" }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const positions = {
    "bottom-right": "fixed bottom-4 right-4 z-40",
    "bottom-left": "fixed bottom-4 left-20 z-40", // left-20 to avoid ReadingGuide button
    "top-right": "fixed top-20 right-4 z-40", // top-20 to avoid progress bar
    "top-left": "fixed top-20 left-4 z-40"
  };

  const toggleMinimize = () => setIsMinimized(!isMinimized);

  return (
    <div className={positions[position]}>
      <div className={`
        bg-black/70 backdrop-blur-sm border border-amber-500/30 rounded-lg 
        transition-all duration-300 hover:bg-black/80 hover:border-amber-500/50
        ${isMinimized ? 'p-2' : 'p-3'}
      `}>
        {isMinimized ? (
          // Minimized view - just a small clock icon
          <button 
            onClick={toggleMinimize}
            className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
            title="Show session timer"
          >
            <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
              <polyline points="12,6 12,12 16,14" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        ) : (
          // Full view
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-300 font-medium">Session Time:</span>
              <SessionClock 
                style="default" 
                showSeconds={true} 
                className="text-amber-400"
              />
            </div>
            
            {/* Minimize button */}
            <button 
              onClick={toggleMinimize}
              className="text-gray-400 hover:text-white transition-colors p-1"
              title="Minimize timer"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
          </div>
        )}
      </div>
      
      {/* Reset session button (only visible when not minimized) */}
      {!isMinimized && (
        <button
          onClick={() => {
            sessionStorage.removeItem('sessionStartTime');
            sessionStorage.removeItem('currentReadingStartTime');
            window.location.reload();
          }}
          className="absolute -top-2 -right-2 bg-red-500/80 hover:bg-red-500 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          title="Reset session (starts over)"
        >
          Reset
        </button>
      )}
    </div>
  );
};

export default FloatingSessionTimer;
