const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB connection
let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    cachedConnection = connection;
    return connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  timestamps: true
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default async function handler(req, res) {
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
    await connectDB();

    // Create test user with known credentials
    const testEmail = 'saumya@gmail.com';
    const testPassword = '123456';

    // Check if user already exists
    const existingUser = await User.findOne({ email: testEmail });
    if (existingUser) {
      return res.json({
        message: 'Test user already exists',
        user: {
          email: testEmail,
          name: existingUser.name
        }
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(testPassword, 12);

    // Create new user
    const user = new User({
      name: 'Saumya Test User',
      email: testEmail,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({
      message: 'Test user created successfully',
      user: {
        email: testEmail,
        name: user.name,
        password: 'Use password: 123456'
      }
    });

  } catch (error) {
    console.error('Create test user error:', error);
    res.status(500).json({
      message: 'Server error creating test user',
      error: error.message
    });
  }
}
