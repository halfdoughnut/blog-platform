const express = require('express');
const UserService = require('../services/userService');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Please provide name, email, and password'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters long'
      });
    }

    // Create new user using Supabase Auth
    const authUser = await UserService.createUser({ name, email, password });
    
    // Get user profile from database
    const userProfile = await UserService.getUserById(authUser.id);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: userProfile.id,
        name: userProfile.name,
        email: userProfile.email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle specific Supabase errors
    if (error.message.includes('already registered')) {
      return res.status(400).json({
        message: 'User with this email already exists'
      });
    }
    
    res.status(500).json({
      message: 'Server error during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: 'Please provide email and password'
      });
    }

    // Sign in user with Supabase
    const { user, session } = await UserService.signInUser(email, password);
    
    // Get user profile from database
    const userProfile = await UserService.getUserById(user.id);

    res.json({
      message: 'Login successful',
      token: session.access_token,
      user: {
        id: userProfile.id,
        name: userProfile.name,
        email: userProfile.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    
    // Handle specific authentication errors
    if (error.message.includes('Invalid login credentials')) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }
    
    res.status(500).json({
      message: 'Server error during login',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const userProfile = await UserService.getUserById(req.user.id);
    
    res.json({
      user: {
        id: userProfile.id,
        name: userProfile.name,
        email: userProfile.email
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      message: 'Server error getting user profile'
    });
  }
});

module.exports = router;
