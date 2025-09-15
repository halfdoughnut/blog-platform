import React from 'react';

const AutoSaveStatus = ({ 
  saveStatus, 
  getSaveStatusText, 
  lastSaved, 
  hasUnsavedChanges, 
  saveNow,
  className = "" 
}) => {
  const getStatusColor = () => {
    switch (saveStatus) {
      case 'saving':
        return 'text-blue-400';
      case 'saved':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      case 'unsaved':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = () => {
    switch (saveStatus) {
      case 'saving':
        return (
          <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      case 'saved':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'unsaved':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getBgColor = () => {
    switch (saveStatus) {
      case 'saving':
        return 'bg-blue-900/20 border-blue-500/30';
      case 'saved':
        return 'bg-green-900/20 border-green-500/30';
      case 'error':
        return 'bg-red-900/20 border-red-500/30';
      case 'unsaved':
        return 'bg-yellow-900/20 border-yellow-500/30';
      default:
        return 'bg-gray-900/20 border-gray-500/30';
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Status Badge */}
      <div className={`
        inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium
        border backdrop-blur-sm transition-all duration-300
        ${getBgColor()} ${getStatusColor()}
      `}>
        {getStatusIcon()}
        <span>{getSaveStatusText()}</span>
      </div>

      {/* Manual Save Button (only show if unsaved or error) */}
      {(saveStatus === 'unsaved' || saveStatus === 'error') && (
        <button
          onClick={saveNow}
          className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-amber-600 hover:bg-amber-500 text-white rounded transition-colors duration-200"
          title="Save now"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          Save
        </button>
      )}

      {/* Unsaved Changes Indicator */}
      {hasUnsavedChanges && (
        <div className="flex items-center gap-1 text-xs text-yellow-400">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          <span>Unsaved</span>
        </div>
      )}
    </div>
  );
};

export default AutoSaveStatus;
