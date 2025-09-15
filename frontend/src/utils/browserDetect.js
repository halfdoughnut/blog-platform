// Browser Detection Utilities

export const isChrome = () => {
  const userAgent = navigator.userAgent;
  return /Chrome/.test(userAgent) && !/Edg|Edge|OPR|Opera|Brave/.test(userAgent);
};

export const isBrave = () => {
  return navigator.brave && navigator.brave.isBrave;
};

export const getChromeFriendlyConfig = () => {
  if (isChrome()) {
    return {
      timeout: 30000,
      retries: 3,
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    };
  }
  return {};
};

// Chrome-specific fetch wrapper
export const chromeFetch = async (url, options = {}) => {
  const chromeConfig = getChromeFriendlyConfig();
  
  const finalOptions = {
    ...options,
    headers: {
      ...chromeConfig.headers,
      ...options.headers
    },
    mode: 'cors',
    credentials: 'same-origin'
  };

  try {
    const response = await fetch(url, finalOptions);
    
    // Chrome sometimes needs explicit JSON parsing
    if (response.headers.get('content-type')?.includes('application/json')) {
      const text = await response.text();
      return {
        ...response,
        json: () => Promise.resolve(JSON.parse(text)),
        data: JSON.parse(text)
      };
    }
    
    return response;
  } catch (error) {
    // Chrome-specific error handling
    if (error.name === 'TypeError' && isChrome()) {
      console.warn('Chrome fetch error, retrying with different config:', error);
      // Retry with simplified options
      return fetch(url, { ...finalOptions, credentials: 'omit' });
    }
    throw error;
  }
};

export default {
  isChrome,
  isBrave,
  chromeFetch,
  getChromeFriendlyConfig
};
