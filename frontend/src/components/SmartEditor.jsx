import React, { useRef, useEffect } from 'react';
import useAutoSave from '../hooks/useAutoSave';
import AutoSaveStatus from './AutoSaveStatus';
import DraftHistory from './DraftHistory';

const SmartEditor = ({ 
  initialContent = '', 
  draftKey = 'smart-editor',
  placeholder = 'Start writing your amazing content...',
  onContentChange,
  className = ""
}) => {
  const textareaRef = useRef(null);
  
  const {
    content,
    setContent,
    saveStatus,
    lastSaved,
    hasUnsavedChanges,
    draftVersions,
    saveNow,
    clearDraft,
    restoreVersion,
    getSaveStatusText
  } = useAutoSave(initialContent, draftKey, {
    saveInterval: 3000,
    maxVersions: 10
  });

  // Call parent callback when content changes
  useEffect(() => {
    if (onContentChange) {
      onContentChange(content);
    }
  }, [content, onContentChange]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.max(textarea.scrollHeight, 200) + 'px';
    }
  }, [content]);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleKeyDown = (e) => {
    // Ctrl+S to save manually
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      saveNow();
    }
  };

  const getWordCount = () => {
    return content.trim() ? content.trim().split(/\s+/).length : 0;
  };

  const getCharCount = () => {
    return content.length;
  };

  const getReadingTime = () => {
    const wordCount = getWordCount();
    const minutes = Math.ceil(wordCount / 225); // Average reading speed
    return minutes;
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Editor Header */}
      <div className="flex items-center justify-between mb-4 p-3 bg-gray-900/50 border border-gray-700 rounded-t-lg backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <h3 className="text-sm font-medium text-white">Smart Editor</h3>
          <AutoSaveStatus
            saveStatus={saveStatus}
            getSaveStatusText={getSaveStatusText}
            lastSaved={lastSaved}
            hasUnsavedChanges={hasUnsavedChanges}
            saveNow={saveNow}
          />
        </div>

        <div className="flex items-center gap-3">
          <DraftHistory
            draftVersions={draftVersions}
            restoreVersion={restoreVersion}
            clearDraft={clearDraft}
          />
        </div>
      </div>

      {/* Main Editor */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleContentChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="
            w-full min-h-[300px] p-4 bg-gray-900/30 border border-gray-700 rounded-b-lg
            text-gray-200 placeholder-gray-500 resize-none focus:outline-none 
            focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50
            backdrop-blur-sm transition-all duration-200
          "
          style={{ 
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
            lineHeight: '1.6'
          }}
        />

        {/* Word count overlay */}
        <div className="absolute bottom-4 right-4 flex items-center gap-4 text-xs text-gray-400">
          <span>{getWordCount()} words</span>
          <span>{getCharCount()} characters</span>
          <span>{getReadingTime()} min read</span>
        </div>
      </div>

      {/* Editor Footer */}
      <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <span>Auto-saves every 3 seconds</span>
          <span>Press Ctrl+S to save manually</span>
        </div>
        
        <div className="flex items-center gap-2">
          {hasUnsavedChanges && (
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-yellow-400">Unsaved changes</span>
            </div>
          )}
          
          {!hasUnsavedChanges && lastSaved && (
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
              <span className="text-green-400">All changes saved</span>
            </div>
          )}
        </div>
      </div>

      {/* Recovery Notice */}
      {content && content !== initialContent && (
        <div className="mt-3 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
          <div className="flex items-start gap-2">
            <svg className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-xs">
              <p className="text-blue-400 font-medium mb-1">Draft Recovered</p>
              <p className="text-blue-300">
                We found a previous draft and restored it automatically. You can access older versions using the History button above.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartEditor;
