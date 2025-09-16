module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Simple register API called');
    console.log('Request body:', req.body);

    const { name, email, password } = req.body;

    // Basic validation
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

    // Mock success response (no actual database)
    return res.status(201).json({
      success: true,
      message: 'Mock registration successful',
      user: {
        id: 'mock-id',
        name: name,
        email: email
      },
      token: 'mock-jwt-token',
      environment: {
        MONGODB_URI: process.env.MONGODB_URI ? 'Present' : 'Missing',
        JWT_SECRET: process.env.JWT_SECRET ? 'Present' : 'Missing'
      }
    });

  } catch (error) {
    console.error('Simple register error:', error);
    return res.status(500).json({
      message: 'Server error during registration',
      error: error.message
    });
  }
};
