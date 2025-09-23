import { useState, useEffect, useCallback, useRef } from 'react';

const useAutoSave = (initialContent = '', draftKey = 'default', options = {}) => {
  const {
    saveInterval = 3000, // Save every 3 seconds
    maxVersions = 10     // Keep last 10 versions
  } = options;

  const [content, setContent] = useState(initialContent);
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saving', 'saved', 'error', 'unsaved'
  const [lastSaved, setLastSaved] = useState(null);
  const [draftVersions, setDraftVersions] = useState([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const contentRef = useRef(content);
  const saveTimeoutRef = useRef(null);
  const lastSaveContentRef = useRef('');

  // Update ref when content changes
  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  // Generate unique storage keys
  const getStorageKey = useCallback((suffix = '') => {
    return `draft_${draftKey}${suffix}`;
  }, [draftKey]);

  // Load existing draft on mount
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(getStorageKey());
      const savedVersions = localStorage.getItem(getStorageKey('_versions'));
      
      if (savedDraft) {
        const draftData = JSON.parse(savedDraft);
        if (draftData.content && draftData.content.trim() !== '') {
          setContent(draftData.content);
          setLastSaved(new Date(draftData.timestamp));
          lastSaveContentRef.current = draftData.content;
        }
      }

      if (savedVersions) {
        const versions = JSON.parse(savedVersions);
        setDraftVersions(versions || []);
      }
    } catch (error) {
      console.warn('Failed to load draft:', error);
    }
  }, [getStorageKey]);

  // Save draft to localStorage
  const saveDraft = useCallback(() => {
    try {
      const currentContent = contentRef.current;
      
      // Don't save if content hasn't changed
      if (currentContent === lastSaveContentRef.current) {
        return;
      }

      // Don't save empty content
      if (!currentContent || currentContent.trim() === '') {
        return;
      }

      setSaveStatus('saving');
      
      const timestamp = new Date().toISOString();
      const draftData = {
        content: currentContent,
        timestamp,
        wordCount: currentContent.trim().split(/\s+/).length,
        characterCount: currentContent.length
      };

      // Save current draft
      localStorage.setItem(getStorageKey(), JSON.stringify(draftData));
      
      // Update versions history
      setDraftVersions(prevVersions => {
        const newVersions = [
          {
            id: Date.now(),
            content: currentContent,
            timestamp,
            preview: currentContent.substring(0, 100) + (currentContent.length > 100 ? '...' : '')
          },
          ...prevVersions.slice(0, maxVersions - 1)
        ];
        
        // Save versions to localStorage
        try {
          localStorage.setItem(getStorageKey('_versions'), JSON.stringify(newVersions));
        } catch (error) {
          console.warn('Failed to save versions:', error);
        }
        
        return newVersions;
      });

      // Update state
      setLastSaved(new Date(timestamp));
      setHasUnsavedChanges(false);
      setSaveStatus('saved');
      lastSaveContentRef.current = currentContent;

    } catch (error) {
      console.error('Failed to save draft:', error);
      setSaveStatus('error');
    }
  }, [getStorageKey, maxVersions]);

  // Auto-save effect
  useEffect(() => {
    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set unsaved status immediately when content changes
    if (content !== lastSaveContentRef.current) {
      setHasUnsavedChanges(true);
      setSaveStatus('unsaved');
    }

    // Schedule save
    saveTimeoutRef.current = setTimeout(() => {
      saveDraft();
    }, saveInterval);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [content, saveDraft, saveInterval]);

  // Manual save function
  const saveNow = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveDraft();
  }, [saveDraft]);

  // Clear draft
  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(getStorageKey());
      localStorage.removeItem(getStorageKey('_versions'));
      setContent('');
      setDraftVersions([]);
      setHasUnsavedChanges(false);
      setSaveStatus('saved');
      setLastSaved(null);
      lastSaveContentRef.current = '';
    } catch (error) {
      console.error('Failed to clear draft:', error);
    }
  }, [getStorageKey]);

  // Restore from version
  const restoreVersion = useCallback((versionId) => {
    const version = draftVersions.find(v => v.id === versionId);
    if (version) {
      setContent(version.content);
      setHasUnsavedChanges(true);
      setSaveStatus('unsaved');
    }
  }, [draftVersions]);

  // Get human-readable save status
  const getSaveStatusText = useCallback(() => {
    switch (saveStatus) {
      case 'saving':
        return 'Saving...';
      case 'saved':
        return lastSaved ? `Saved ${getTimeAgo(lastSaved)}` : 'Saved';
      case 'error':
        return 'Save failed';
      case 'unsaved':
        return 'Unsaved changes';
      default:
        return '';
    }
  }, [saveStatus, lastSaved]);

  // Save on page unload
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        saveDraft();
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (hasUnsavedChanges) {
        saveDraft();
      }
    };
  }, [hasUnsavedChanges, saveDraft]);

  return {
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
  };
};

// Helper function to get human-readable time ago
const getTimeAgo = (date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
};

export default useAutoSave;
