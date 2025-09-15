// Chrome Compatibility Polyfills

// Fix for Chrome fetch API issues
if (!window.fetch) {
  window.fetch = require('whatwg-fetch').fetch;
}

// Fix for Chrome Promise issues
if (!window.Promise) {
  window.Promise = require('es6-promise').Promise;
}

// Fix for Chrome URLSearchParams
if (!window.URLSearchParams) {
  window.URLSearchParams = require('url-search-params-polyfill');
}

// Chrome-specific fixes for React
window.global = window.global || window;

// Fix for Chrome console in production
if (typeof console === 'undefined') {
  window.console = {
    log: () => {},
    warn: () => {},
    error: () => {},
    info: () => {},
  };
}

// Chrome CORS preflight fix
const originalFetch = window.fetch;
window.fetch = function(url, options = {}) {
  // Add Chrome-specific headers
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...options.headers
  };

  return originalFetch(url, {
    ...options,
    headers,
    mode: 'cors',
    credentials: 'same-origin'
  });
};

export default {};
