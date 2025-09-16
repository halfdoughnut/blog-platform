import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// MongoDB Atlas connection for Vercel
let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false,
      bufferMaxEntries: 0
    });
    
    cachedConnection = connection;
    console.log('Connected to MongoDB Atlas');
    return connection;
  } catch (error) {
    console.error('MongoDB Atlas connection error:', error);
    cachedConnection = null;
    throw error;
  }
};

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false }
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
    
    // Create a test user with your email
    const testEmail = 'saumya@gmail.com';
    const testPassword = '123456';
    const testName = 'Saumya';

    // Check if user already exists
    const existingUser = await User.findOne({ email: testEmail });
    if (existingUser) {
      return res.json({
        message: 'User already exists! You can now login.',
        email: testEmail,
        password: 'Use password: 123456'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(testPassword, 12);

    // Create new user
    const user = new User({
      name: testName,
      email: testEmail,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({
      message: 'Test user created successfully! You can now login.',
      email: testEmail,
      password: 'Use password: 123456',
      user: {
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({
      message: 'Error creating user',
      error: error.message
    });
  }
}
