module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Basic environment check
    const envCheck = {
      MONGODB_URI: process.env.MONGODB_URI ? 'Present' : 'Missing',
      JWT_SECRET: process.env.JWT_SECRET ? 'Present' : 'Missing',
      NODE_ENV: process.env.NODE_ENV || 'Not Set',
      VERCEL: process.env.VERCEL || 'Not Set',
      timestamp: new Date().toISOString()
    };

    console.log('Test API called:', envCheck);

    return res.status(200).json({
      success: true,
      message: 'Test API is working',
      environment: envCheck,
      method: req.method,
      url: req.url
    });

  } catch (error) {
    console.error('Test API error:', error);
    return res.status(500).json({
      success: false,
      message: 'Test API failed',
      error: error.message
    });
  }
};
