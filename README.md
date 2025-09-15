# BlogPlatform - Modern MERN Stack Blog Application

A full-stack blog platform built with MongoDB, Express.js, React, and Node.js, featuring JWT authentication and a beautiful Tailwind CSS interface.

## 🚀 Features

### Authentication
- User registration with validation
- Secure login with JWT tokens
- Protected routes and middleware
- Automatic token refresh handling

### Blog Management
- Create new blog posts with rich content
- Edit and update existing posts
- Delete posts with confirmation
- Tag system for categorization
- Responsive dashboard with statistics

### User Interface
- Modern, responsive design with Tailwind CSS
- Intuitive navigation with mobile support
- Real-time form validation
- Loading states and error handling
- Clean typography and visual hierarchy

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - UI library with hooks
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first styling
- **Context API** - State management

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn** package manager

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd blog-platform
```

### 2. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/blog-platform
JWT_SECRET=your-super-secure-jwt-secret-key-here
PORT=5000
NODE_ENV=development
```

**Important**: Replace `your-super-secure-jwt-secret-key-here` with a strong, unique secret key.

### 3. Frontend Setup

Navigate to the frontend directory:
```bash
cd ../frontend
```

Install dependencies:
```bash
npm install
```

### 4. Database Setup

Make sure MongoDB is running on your system:
- **Local MongoDB**: Start the MongoDB service
- **MongoDB Atlas**: Update the `MONGODB_URI` in your `.env` file with your Atlas connection string

## 🚀 Running the Application

### Start the Backend Server
```bash
cd backend
npm run dev
```
The backend server will start on `http://localhost:5000`

### Start the Frontend Development Server
```bash
cd frontend
npm start
```
The frontend application will start on `http://localhost:3000`

## 📡 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Blog Post Routes (Protected)
- `GET /api/posts` - Get all posts by logged-in user
- `GET /api/posts/:id` - Get single post by ID
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

## 🎯 Usage Guide

### 1. Registration
- Visit `http://localhost:3000`
- Click "Sign Up" or navigate to `/register`
- Fill in your name, email, and password
- Your account will be created and you'll be logged in automatically

### 2. Login
- Click "Login" or navigate to `/login`
- Enter your email and password
- You'll be redirected to the dashboard

### 3. Dashboard
- View all your blog posts
- See statistics (total posts, published posts, categories)
- Create new posts or edit existing ones
- Delete posts with confirmation

### 4. Creating Posts
- Click "Write New Post" from the dashboard or navbar
- Enter a compelling title
- Write your content (up to 10,000 characters)
- Add tags separated by commas (optional)
- Click "Publish Post"

### 5. Editing Posts
- From the dashboard, click the edit icon (✏️) on any post
- Modify the title, content, or tags
- Click "Update Post" to save changes

### 6. Deleting Posts
- From the dashboard, click the delete icon (🗑️) on any post
- Confirm the deletion in the popup dialog

## 🎨 Design Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Clean, professional interface with Tailwind CSS
- **Interactive Elements**: Hover effects, smooth transitions, loading states
- **Accessibility**: Proper ARIA labels, keyboard navigation support
- **Visual Feedback**: Success/error messages, form validation indicators

## 🔐 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Route Protection**: Private routes require authentication
- **Input Validation**: Both client-side and server-side validation
- **CORS Configuration**: Proper cross-origin request handling
- **Error Handling**: Comprehensive error handling and logging

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the connection string in `.env`
   - Verify network connectivity for Atlas

2. **Port Already in Use**
   - Change the PORT in backend `.env` file
   - Kill processes using the default ports

3. **CORS Errors**
   - Ensure backend server is running
   - Check API base URL configuration

4. **Build Errors**
   - Delete `node_modules` and reinstall dependencies
   - Clear npm cache: `npm cache clean --force`

### Development Tips

- Use MongoDB Compass for database visualization
- Install React Developer Tools for debugging
- Use Postman or Thunder Client for API testing

## 🚀 Deployment

### Backend Deployment (Heroku example)
1. Create a Heroku app
2. Set environment variables
3. Connect to MongoDB Atlas
4. Deploy the backend folder

### Frontend Deployment (Netlify/Vercel example)
1. Build the React app: `npm run build`
2. Deploy the `build` folder
3. Configure environment variables
4. Set up redirects for SPA routing

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions, issues, or feature requests, please create an issue in the repository.

---

**Happy Blogging! ✍️**
