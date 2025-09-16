const mongoose = require('mongoose');

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    console.log('=== MONGODB CONNECTION TEST ===');
    console.log('MONGODB_URI present:', !!process.env.MONGODB_URI);
    console.log('URI length:', process.env.MONGODB_URI ? process.env.MONGODB_URI.length : 0);
    
    // Show first and last 20 chars of URI for debugging (without exposing password)
    if (process.env.MONGODB_URI) {
      const uri = process.env.MONGODB_URI;
      console.log('URI preview:', uri.substring(0, 20) + '...' + uri.substring(uri.length - 20));
    }

    // Close any existing connections
    await mongoose.disconnect();
    
    console.log('Attempting direct connection...');
    
    // Direct connection attempt
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 15000, // 15 seconds
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      retryWrites: true,
      w: 'majority'
    });

    console.log('Connection successful!');
    console.log('Connected to:', connection.connection.host);
    console.log('Database:', connection.connection.name);
    
    // Simple database operation test
    const testSchema = new mongoose.Schema({ test: String });
    const TestModel = mongoose.models.Test || mongoose.model('Test', testSchema);
    
    // Try to create a document
    const testDoc = new TestModel({ test: 'connection-test-' + Date.now() });
    await testDoc.save();
    console.log('Test document saved successfully');
    
    // Clean up test document
    await TestModel.deleteOne({ _id: testDoc._id });
    console.log('Test document cleaned up');

    return res.status(200).json({
      success: true,
      message: 'MongoDB connection test successful',
      host: connection.connection.host,
      database: connection.connection.name,
      readyState: connection.connection.readyState
    });

  } catch (error) {
    console.error('=== MONGODB CONNECTION FAILED ===');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Full error:', error);
    
    return res.status(500).json({
      success: false,
      message: 'MongoDB connection test failed',
      error: error.message,
      errorName: error.name,
      errorCode: error.code
    });
  }
};
