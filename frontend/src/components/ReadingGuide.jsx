import React, { useState } from 'react';

const ReadingGuide = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleGuide = () => setIsVisible(!isVisible);

  return (
    <>
      {/* Guide Toggle Button */}
      <button
        onClick={toggleGuide}
        className="fixed bottom-4 left-4 z-50 bg-amber-600 hover:bg-amber-500 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        title="Reading Features Guide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {/* Guide Modal */}
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-gray-900 border border-amber-500/20 rounded-xl p-6 mx-4 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-medium text-white flex items-center gap-2">
                <span className="text-2xl">📚</span>
                Reading Features Guide
              </h3>
              <button
                onClick={toggleGuide}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4 text-gray-200">
              <div className="bg-amber-900/10 rounded-lg p-4">
                <h4 className="font-medium text-amber-400 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Reading Time Estimates
                </h4>
                <p className="text-sm">
                  See estimated reading time for each article based on your reading speed. Look for the clock icon next to article titles.
                </p>
              </div>

              <div className="bg-green-900/10 rounded-lg p-4">
                <h4 className="font-medium text-green-400 mb-2 flex items-center gap-2">
                  <div className="w-4 h-1 bg-green-400 rounded"></div>
                  Progress Bar
                </h4>
                <p className="text-sm">
                  The progress bar at the top shows how much of the article you've read. It fills up as you scroll down.
                </p>
              </div>

              <div className="bg-blue-900/10 rounded-lg p-4">
                <h4 className="font-medium text-blue-400 mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  Reading Indicator
                </h4>
                <p className="text-sm">
                  When you're actively reading, a small indicator appears showing your reading time and progress.
                </p>
              </div>

              <div className="bg-purple-900/10 rounded-lg p-4">
                <h4 className="font-medium text-purple-400 mb-2 flex items-center gap-2">
                  <span>📊</span>
                  Reading Stats
                </h4>
                <p className="text-sm">
                  Track your reading journey with stats like articles read, total time, and reading streaks. Complete articles to see your progress!
                </p>
              </div>

              <div className="bg-orange-900/10 rounded-lg p-4">
                <h4 className="font-medium text-orange-400 mb-2 flex items-center gap-2">
                  <span>🎉</span>
                  Celebrations
                </h4>
                <p className="text-sm">
                  Reach milestones and maintain reading streaks to unlock achievements and celebrations. Reading daily builds your streak!
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-400 text-center">
                Start reading to see these features in action! Your reading data is stored locally and private to you.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReadingGuide;
