// This file proxies all API requests to the backend server
const path = require('path');

// Import the backend server
const app = require('../backend/server.js');

module.exports = (req, res) => {
  // Remove /api prefix from the URL for the backend
  req.url = req.url.replace(/^\/api/, '');
  if (req.url === '') {
    req.url = '/';
  }
  
  // Let the backend handle the request
  app(req, res);
};
