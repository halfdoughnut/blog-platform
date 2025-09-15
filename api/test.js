export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    res.json({
      message: 'API is working!',
      timestamp: new Date().toISOString(),
      environment: {
        mongoUri: !!process.env.MONGODB_URI,
        jwtSecret: !!process.env.JWT_SECRET,
        nodeEnv: process.env.VERCEL_ENV || 'unknown'
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Test endpoint error',
      error: error.message
    });
  }
}
