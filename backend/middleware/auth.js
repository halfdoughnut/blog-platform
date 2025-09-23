const UserService = require('../services/userService');

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        message: 'Access denied. No valid token provided.' 
      });
    }

    // Extract token (remove 'Bearer ' prefix)
    const token = authHeader.substring(7);

    if (!token) {
      return res.status(401).json({ 
        message: 'Access denied. Token is required.' 
      });
    }

    try {
      // Verify token using Supabase
      const user = await UserService.verifyToken(token);
      
      if (!user) {
        return res.status(401).json({ 
          message: 'Token is valid but user not found.' 
        });
      }

      // Add user to request object
      req.user = user;
      next();
    } catch (tokenError) {
      return res.status(401).json({ 
        message: 'Invalid token.' 
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ 
      message: 'Server error in authentication middleware.' 
    });
  }
};

module.exports = auth;
