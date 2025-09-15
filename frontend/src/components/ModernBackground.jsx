import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ModernBackground = () => {
  const { isDark } = useTheme();
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient background */}
      <div className={`absolute inset-0 transition-all duration-500 ${
        isDark 
          ? 'bg-gradient-to-br from-stone-900 via-amber-900/40 to-orange-900/20'
          : 'bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50'
      }`}></div>
      
      {/* Floating shapes */}
      <div className="absolute inset-0">
        {/* Large circle */}
        <div 
          className={`absolute w-96 h-96 rounded-full animate-float-slow transition-opacity duration-500 ${
            isDark ? 'opacity-10' : 'opacity-5'
          }`}
          style={{
            background: isDark 
              ? 'radial-gradient(circle, rgba(215,174,130,0.3) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(160,82,45,0.2) 0%, transparent 70%)',
            top: '10%',
            left: '70%',
            animationDelay: '0s'
          }}
        ></div>
        
        {/* Medium triangle */}
        <div 
          className={`absolute w-64 h-64 animate-float-medium transition-opacity duration-500 ${
            isDark ? 'opacity-5' : 'opacity-3'
          }`}
          style={{
            background: isDark
              ? 'linear-gradient(45deg, rgba(160,82,45,0.4) 0%, transparent 70%)'
              : 'linear-gradient(45deg, rgba(101,67,33,0.2) 0%, transparent 70%)',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            bottom: '20%',
            left: '10%',
            animationDelay: '2s'
          }}
        ></div>
        
        {/* Small square */}
        <div 
          className={`absolute w-32 h-32 animate-float-fast rotate-45 transition-opacity duration-500 ${
            isDark ? 'opacity-8' : 'opacity-4'
          }`}
          style={{
            background: isDark
              ? 'linear-gradient(135deg, rgba(215,174,130,0.2) 0%, transparent 70%)'
              : 'linear-gradient(135deg, rgba(139,111,96,0.2) 0%, transparent 70%)',
            top: '60%',
            right: '15%',
            animationDelay: '4s'
          }}
        ></div>
      </div>
      
      {/* Subtle overlay */}
      <div className={`absolute inset-0 transition-all duration-500 ${
        isDark ? 'bg-black/10' : 'bg-white/20'
      }`}></div>
    </div>
  );
};

export default ModernBackground;
