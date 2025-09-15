import { useState, useEffect, useCallback } from 'react';

// Average reading speed: 200-250 words per minute for adults
const WORDS_PER_MINUTE = 225;

export const useReadingTime = (content) => {
  const [readingTime, setReadingTime] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  const calculateReadingTime = useCallback((text) => {
    if (!text) return { minutes: 0, words: 0 };
    
    // Remove HTML tags and extra whitespace
    const cleanText = text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    
    // Count words (split by whitespace and filter empty strings)
    const words = cleanText.split(' ').filter(word => word.length > 0).length;
    
    // Calculate reading time in minutes
    const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
    
    return { minutes, words };
  }, []);

  useEffect(() => {
    const { minutes, words } = calculateReadingTime(content);
    setReadingTime(minutes);
    setWordCount(words);
  }, [content, calculateReadingTime]);

  return { readingTime, wordCount };
};

export const useReadingProgress = () => {
  const [progress, setProgress] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    // Get or create session-based reading start time (resets when browser closes)
    let readingStartTime = sessionStorage.getItem('currentReadingStartTime');
    let animationId = null;
    let tickInterval = null;

    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      setProgress(Math.min(100, Math.max(0, scrollPercent)));

      // Track reading time (session-based, resets when website closes)
      if (scrollPercent > 5 && scrollPercent < 95) {
        if (!readingStartTime) {
          readingStartTime = Date.now().toString();
          sessionStorage.setItem('currentReadingStartTime', readingStartTime);
        }
        setIsReading(true);
        
        // Start ticking timer if not already running
        if (!tickInterval) {
          tickInterval = setInterval(() => {
            const currentTime = Date.now();
            const elapsed = Math.floor((currentTime - parseInt(readingStartTime)) / 1000);
            setTimeSpent(elapsed);
          }, 1000); // Update every second for ticking effect
        }
      } else if (scrollPercent >= 95) {
        setIsReading(false);
        if (tickInterval) {
          clearInterval(tickInterval);
          tickInterval = null;
        }
      }
    };

    const handleScroll = () => {
      if (animationId) cancelAnimationFrame(animationId);
      animationId = requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', handleScroll);
    updateProgress(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationId) cancelAnimationFrame(animationId);
      if (tickInterval) clearInterval(tickInterval);
    };
  }, []);

  return { progress, isReading, timeSpent };
};
