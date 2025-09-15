import React, { useState, useEffect } from 'react';

const ReadingStats = ({ className = "" }) => {
  const [stats, setStats] = useState({
    articlesRead: 0,
    totalReadingTime: 0,
    currentStreak: 0,
    longestStreak: 0,
    averageReadingSpeed: 225,
    lastReadDate: null
  });

  const [isVisible, setIsVisible] = useState(false);

  // Load stats from localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem('readingStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  // Save stats to localStorage
  const saveStats = (newStats) => {
    setStats(newStats);
    localStorage.setItem('readingStats', JSON.stringify(newStats));
  };

  // Function to record a completed article read
  const recordArticleRead = (readingTimeMinutes, wordCount) => {
    const today = new Date().toDateString();
    const actualReadingSpeed = Math.round(wordCount / readingTimeMinutes);
    
    const newStats = {
      ...stats,
      articlesRead: stats.articlesRead + 1,
      totalReadingTime: stats.totalReadingTime + readingTimeMinutes,
      averageReadingSpeed: Math.round((stats.averageReadingSpeed + actualReadingSpeed) / 2),
      lastReadDate: today
    };

    // Calculate streak
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toDateString();

    if (stats.lastReadDate === yesterdayString || stats.lastReadDate === today) {
      newStats.currentStreak = stats.lastReadDate === today ? stats.currentStreak : stats.currentStreak + 1;
    } else if (stats.lastReadDate !== today) {
      newStats.currentStreak = 1;
    }

    newStats.longestStreak = Math.max(newStats.currentStreak, stats.longestStreak);
    
    saveStats(newStats);
    
    // Show celebration for milestones
    if (newStats.articlesRead % 10 === 0 || newStats.currentStreak > stats.currentStreak) {
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 4000);
    }
  };

  // Expose the recordArticleRead function globally for other components to use
  useEffect(() => {
    window.recordArticleRead = recordArticleRead;
    
    return () => {
      delete window.recordArticleRead;
    };
  }, [stats]);

  const formatReadingTime = (minutes) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMins = minutes % 60;
    if (hours < 24) return `${hours}h ${remainingMins}m`;
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return `${days}d ${remainingHours}h`;
  };

  const getStreakEmoji = (streak) => {
    if (streak >= 30) return "🏆";
    if (streak >= 14) return "🔥";
    if (streak >= 7) return "⭐";
    if (streak >= 3) return "📚";
    return "📖";
  };

  const getMilestoneMessage = () => {
    if (stats.currentStreak >= 30) return "Reading Master! 30 day streak!";
    if (stats.currentStreak >= 14) return "You're on fire! 2 week streak!";
    if (stats.currentStreak >= 7) return "One week reading streak!";
    if (stats.articlesRead >= 100) return "Century Club! 100 articles read!";
    if (stats.articlesRead >= 50) return "Half Century! 50 articles!";
    if (stats.articlesRead >= 25) return "Quarter Century of Reading!";
    if (stats.articlesRead >= 10) return "Double digits! 10 articles!";
    return "Keep up the great reading!";
  };

  if (stats.articlesRead === 0) return null;

  return (
    <>
      {/* Stats Dashboard */}
      <div className={`bg-amber-900/10 backdrop-blur-sm border border-amber-500/20 rounded-lg p-4 ${className}`}>
        <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
          <span className="text-xl">📊</span>
          Your Reading Journey
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Articles Read */}
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-400">{stats.articlesRead}</div>
            <div className="text-sm text-gray-300">Articles</div>
          </div>
          
          {/* Total Reading Time */}
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{formatReadingTime(stats.totalReadingTime)}</div>
            <div className="text-sm text-gray-300">Reading Time</div>
          </div>
          
          {/* Current Streak */}
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400 flex items-center justify-center gap-1">
              {stats.currentStreak}
              <span className="text-lg">{getStreakEmoji(stats.currentStreak)}</span>
            </div>
            <div className="text-sm text-gray-300">Day Streak</div>
          </div>
          
          {/* Reading Speed */}
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{stats.averageReadingSpeed}</div>
            <div className="text-sm text-gray-300">WPM</div>
          </div>
        </div>

        {/* Longest Streak Badge */}
        {stats.longestStreak > 5 && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full px-3 py-1 text-sm">
              <span className="text-purple-400">🏅 Best Streak:</span>
              <span className="font-medium text-white">{stats.longestStreak} days</span>
            </div>
          </div>
        )}
      </div>

      {/* Milestone Celebration */}
      {isVisible && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-in slide-in-from-top duration-500">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-medium shadow-2xl max-w-sm text-center">
            <div className="text-3xl mb-2">{getStreakEmoji(stats.currentStreak)}</div>
            <div className="font-bold text-lg">{getMilestoneMessage()}</div>
            <div className="text-amber-100 text-sm mt-1">Keep up the amazing work!</div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReadingStats;
