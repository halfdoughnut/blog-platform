import React, { useState, useEffect } from 'react';

const SessionClock = ({ className = "", showSeconds = true, style = "default" }) => {
  const [sessionTime, setSessionTime] = useState(0); // Time in seconds
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    // Get session start time or create new one
    const sessionStart = sessionStorage.getItem('sessionStartTime');
    const startTime = sessionStart ? parseInt(sessionStart) : Date.now();
    
    if (!sessionStart) {
      sessionStorage.setItem('sessionStartTime', startTime.toString());
    }

    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        const currentTime = Date.now();
        const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
        setSessionTime(elapsedSeconds);
      }, 1000); // Update every second for ticking effect
    }

    // Initial calculation
    const currentTime = Date.now();
    const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
    setSessionTime(elapsedSeconds);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  // Pause/resume on visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsActive(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (showSeconds) {
      if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    } else {
      if (hours > 0) {
        return `${hours}h ${minutes}m`;
      }
      return `${minutes}m`;
    }
  };

  const getReadableTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} and ${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }
    if (minutes > 0) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''} and ${seconds} second${seconds !== 1 ? 's' : ''}`;
    }
    return `${seconds} second${seconds !== 1 ? 's' : ''}`;
  };

  // Style variants
  const styles = {
    default: "flex items-center gap-2 text-sm text-gray-300",
    prominent: "flex items-center gap-3 text-lg text-amber-400 font-medium",
    minimal: "text-xs text-gray-500",
    badge: "inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 text-sm font-medium rounded-full"
  };

  const iconStyles = {
    default: "w-4 h-4",
    prominent: "w-5 h-5",
    minimal: "w-3 h-3",
    badge: "w-4 h-4"
  };

  return (
    <div className={`${styles[style]} ${className}`} title={`You've been reading for ${getReadableTime(sessionTime)}`}>
      {/* Animated Clock Icon */}
      <div className="relative">
        <svg 
          className={`${iconStyles[style]} ${isActive ? 'animate-pulse' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10" strokeWidth="2"/>
          <polyline 
            points="12,6 12,12 16,14" 
            strokeWidth="2" 
            strokeLinecap="round"
            strokeLinejoin="round"
            className="origin-center"
            style={{
              transform: `rotate(${(sessionTime * 6)}deg)`, // Second hand rotates 6 degrees per second
              transformOrigin: '12px 12px'
            }}
          />
        </svg>
        
        {/* Ticking indicator dot */}
        {isActive && (
          <div 
            className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping"
            style={{ animationDuration: '1s' }}
          />
        )}
      </div>
      
      {/* Time Display */}
      <span className="font-mono tabular-nums">
        {formatTime(sessionTime)}
      </span>
      
      {/* Session indicator */}
      <span className="text-xs opacity-60">
        session
      </span>
    </div>
  );
};

export default SessionClock;
