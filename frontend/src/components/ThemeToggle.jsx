import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = ({ 
  size = 'default', 
  position = 'relative',
  showLabel = true,
  className = "" 
}) => {
  const { toggleTheme, isLight, isDark } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleTheme();
    
    // Reset animation after completion
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Size variants
  const sizes = {
    small: {
      button: "w-12 h-6",
      track: "w-12 h-6",
      thumb: "w-5 h-5",
      icon: "w-3 h-3",
      text: "text-xs"
    },
    default: {
      button: "w-14 h-7",
      track: "w-14 h-7", 
      thumb: "w-6 h-6",
      icon: "w-4 h-4",
      text: "text-sm"
    },
    large: {
      button: "w-16 h-8",
      track: "w-16 h-8",
      thumb: "w-7 h-7", 
      icon: "w-5 h-5",
      text: "text-base"
    }
  };

  const currentSize = sizes[size];

  // Position styles
  const positions = {
    relative: "",
    fixed: "fixed top-4 right-4 z-50",
    absolute: "absolute top-4 right-4"
  };

  return (
    <div className={`${positions[position]} ${className}`}>
      <div className="flex items-center gap-3">
        {/* Label */}
        {showLabel && (
          <span className={`font-medium transition-colors duration-200 ${currentSize.text} ${
            isDark ? 'text-gray-200' : 'text-gray-700'
          }`}>
            {isLight ? '☀️ Light' : '🌙 Dark'}
          </span>
        )}

        {/* Toggle Button */}
        <button
          onClick={handleToggle}
          className={`
            relative ${currentSize.button} rounded-full transition-all duration-300 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500
            transform hover:scale-105 active:scale-95
            ${isDark 
              ? 'bg-gray-700 hover:bg-gray-600 border border-gray-600' 
              : 'bg-gray-200 hover:bg-gray-300 border border-gray-300'
            }
            ${isAnimating ? 'animate-pulse' : ''}
          `}
          title={`Switch to ${isLight ? 'dark' : 'light'} theme`}
          aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}
        >
          {/* Track */}
          <div className={`
            absolute inset-0 rounded-full transition-all duration-300
            ${isDark 
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600' 
              : 'bg-gradient-to-r from-yellow-400 to-orange-400'
            }
          `} />

          {/* Thumb */}
          <div className={`
            absolute top-0.5 ${currentSize.thumb} rounded-full transition-all duration-300 ease-in-out
            bg-white shadow-lg transform flex items-center justify-center
            ${isDark ? 'translate-x-7' : 'translate-x-0.5'}
            ${isAnimating ? 'rotate-180' : ''}
          `}>
            {/* Icon */}
            <div className={`transition-all duration-300 ${isAnimating ? 'scale-110' : ''}`}>
              {isDark ? (
                // Moon Icon
                <svg className={`${currentSize.icon} text-indigo-600`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" clipRule="evenodd" />
                </svg>
              ) : (
                // Sun Icon  
                <svg className={`${currentSize.icon} text-orange-500`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>

          {/* Background Icons (decorative) */}
          <div className="absolute inset-0 flex items-center justify-between px-1 pointer-events-none">
            <div className={`transition-opacity duration-300 ${isDark ? 'opacity-30' : 'opacity-60'}`}>
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className={`transition-opacity duration-300 ${isDark ? 'opacity-60' : 'opacity-30'}`}>
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </button>

        {/* Theme Indicator Dots */}
        <div className="flex gap-1">
          <div className={`w-2 h-2 rounded-full transition-all duration-200 ${
            isLight ? 'bg-yellow-400 scale-110' : 'bg-gray-400 scale-75'
          }`} />
          <div className={`w-2 h-2 rounded-full transition-all duration-200 ${
            isDark ? 'bg-indigo-400 scale-110' : 'bg-gray-400 scale-75'
          }`} />
        </div>
      </div>

    </div>
  );
};

export default ThemeToggle;
