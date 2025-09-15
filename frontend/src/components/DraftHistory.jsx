import React, { useState } from 'react';

const DraftHistory = ({ 
  draftVersions, 
  restoreVersion, 
  clearDraft,
  className = "" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(null);

  if (!draftVersions || draftVersions.length === 0) {
    return null;
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  const getWordCount = (content) => {
    return content.trim().split(/\s+/).length;
  };

  const handleRestore = (versionId) => {
    restoreVersion(versionId);
    setIsOpen(false);
    setSelectedVersion(null);
  };

  const handlePreview = (version) => {
    setSelectedVersion(selectedVersion?.id === version.id ? null : version);
  };

  return (
    <div className={`relative ${className}`}>
      {/* History Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-200 rounded transition-colors duration-200"
        title={`${draftVersions.length} saved versions`}
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        History ({draftVersions.length})
      </button>

      {/* History Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 max-h-96 overflow-hidden">
          <div className="p-3 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-white">Draft History</h4>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="max-h-72 overflow-y-auto">
            {draftVersions.map((version, index) => (
              <div key={version.id} className="border-b border-gray-800 last:border-b-0">
                <div className="p-3 hover:bg-gray-800 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-amber-400">
                          {index === 0 ? 'Latest' : `Version ${draftVersions.length - index}`}
                        </span>
                        <span className="text-xs text-gray-400">
                          {formatDate(version.timestamp)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-300 mb-1">
                        {getWordCount(version.content)} words
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-1 ml-2">
                      <button
                        onClick={() => handlePreview(version)}
                        className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded"
                        title="Preview"
                      >
                        👁️
                      </button>
                      {index !== 0 && (
                        <button
                          onClick={() => handleRestore(version.id)}
                          className="text-xs px-2 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded"
                          title="Restore this version"
                        >
                          Restore
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Preview */}
                  {selectedVersion?.id === version.id && (
                    <div className="mt-2 p-2 bg-gray-800 rounded text-xs">
                      <div className="text-gray-400 mb-1">Preview:</div>
                      <div className="text-gray-200 leading-relaxed max-h-20 overflow-y-auto">
                        {version.preview}
                      </div>
                    </div>
                  )}

                  {/* Quick preview (first line only) */}
                  {selectedVersion?.id !== version.id && (
                    <p className="text-xs text-gray-500 truncate">
                      {version.preview.split('\n')[0] || 'Empty draft'}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="p-3 border-t border-gray-700 bg-gray-900">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">
                Drafts auto-save every 3 seconds
              </span>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear all drafts? This cannot be undone.')) {
                    clearDraft();
                    setIsOpen(false);
                  }
                }}
                className="text-xs px-2 py-1 bg-red-600 hover:bg-red-500 text-white rounded"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default DraftHistory;
