import React from 'react';
import { useReadingTime } from '../hooks/useReadingTime';

const ReadingTime = ({ content, className = "", showWordCount = false, style = "default" }) => {
  const { readingTime, wordCount } = useReadingTime(content);

  if (!content || readingTime === 0) return null;

  const formatReadingTime = (minutes) => {
    if (minutes === 1) return "1 min read";
    if (minutes < 60) return `${minutes} min read`;
    
    const hours = Math.floor(minutes / 60);
    const remainingMins = minutes % 60;
    
    if (hours === 1 && remainingMins === 0) return "1 hour read";
    if (hours === 1) return `1h ${remainingMins}m read`;
    if (remainingMins === 0) return `${hours} hours read`;
    return `${hours}h ${remainingMins}m read`;
  };

  const formatWordCount = (words) => {
    if (words < 1000) return `${words} words`;
    if (words < 1000000) return `${(words / 1000).toFixed(1)}k words`;
    return `${(words / 1000000).toFixed(1)}M words`;
  };

  // Style variants
  const styles = {
    default: "flex items-center gap-2 text-sm text-gray-400",
    badge: "inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full",
    minimal: "text-xs text-gray-500",
    prominent: "flex items-center gap-2 text-amber-400 font-medium"
  };

  const iconStyles = {
    default: "w-4 h-4",
    badge: "w-3 h-3",
    minimal: "w-3 h-3",
    prominent: "w-4 h-4"
  };

  return (
    <div className={`${styles[style]} ${className}`}>
      {/* Clock Icon */}
      <svg 
        className={iconStyles[style]} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
      
      <span>{formatReadingTime(readingTime)}</span>
      
      {showWordCount && (
        <>
          <span className="text-gray-300">•</span>
          <span>{formatWordCount(wordCount)}</span>
        </>
      )}
    </div>
  );
};

export default ReadingTime;
