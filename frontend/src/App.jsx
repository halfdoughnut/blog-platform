import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useTheme } from './context/ThemeContext.jsx';

// ========= 1. IMPORT YOUR NEW COMPONENT =========
// We are importing the modern animated background.
import ModernBackground from './components/ModernBackground.jsx';

// Updated to use minimal modern aesthetic with smooth animations.

import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import CreatePost from './pages/CreatePost.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';

// Reading Time Tracker Components
import ReadingTime from './components/ReadingTime.jsx';
import ReadingProgress from './components/ReadingProgress.jsx';
import ReadingStats from './components/ReadingStats.jsx';
import ReadingGuide from './components/ReadingGuide.jsx';
import SessionClock from './components/SessionClock.jsx';
import FloatingSessionTimer from './components/FloatingSessionTimer.jsx';
import SmartEditor from './components/SmartEditor.jsx';


const Home = () => {
  const { isDark } = useTheme();
  const { isAuthenticated } = useAuth();
  const titleRef = React.useRef(null);
  const dividerRef = React.useRef(null);
  const subtitleRef = React.useRef(null);
  const buttonsRef = React.useRef(null);
  const cardsRef = React.useRef(null);
  
  React.useEffect(() => {
    // Trigger CSS animations on mount
    setTimeout(() => {
      if (titleRef.current) {
        titleRef.current.classList.add('animate-in');
      }
    }, 200);
    
    setTimeout(() => {
      if (dividerRef.current) {
        dividerRef.current.classList.add('animate-in', 'scale');
      }
    }, 600);
    
    setTimeout(() => {
      if (subtitleRef.current) {
        subtitleRef.current.classList.add('animate-in');
      }
    }, 800);
    
    setTimeout(() => {
      if (buttonsRef.current?.children) {
        Array.from(buttonsRef.current.children).forEach((child, index) => {
          setTimeout(() => {
            child.classList.add('animate-in');
          }, index * 100);
        });
      }
    }, 1200);
    
    setTimeout(() => {
      if (cardsRef.current?.children) {
        Array.from(cardsRef.current.children).forEach((child, index) => {
          setTimeout(() => {
            child.classList.add('animate-in', 'fade-up');
          }, index * 150);
        });
      }
    }, 1600);
  }, []);
  
  return (
    <div className="min-h-screen flex items-center justify-center px-8 py-16 relative">
      <div className="text-center max-w-5xl mx-auto relative z-10">
        {/* Modern Header */}
        <div className="mb-16">
          <h1 
            ref={titleRef}
            className={`text-7xl md:text-8xl lg:text-9xl font-black mb-6 leading-tight tracking-tighter transition-all duration-300 ease-out ${
              isDark ? 'text-orange-100' : 'text-amber-900'
            }`}
          >
            <span className="inline-block word-hover cursor-default">
              The
            </span>
            {' '}
            <span className="inline-block word-hover cursor-default">
              Writer's
            </span>
            {' '}
            <span className={`inline-block font-black word-hover cursor-default ${
              isDark ? 'text-amber-300 hover:text-amber-200' : 'text-orange-700 hover:text-orange-600'
            }`}>
              Sanctuary
            </span>
          </h1>
          <div 
            ref={dividerRef}
            className={`w-20 h-0.5 mx-auto mb-8 transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-r from-amber-400 to-orange-500'
                : 'bg-gradient-to-r from-orange-600 to-amber-700'
            }`}
          ></div>
          <p 
            ref={subtitleRef}
            className={`text-xl md:text-2xl font-medium leading-relaxed max-w-3xl mx-auto transition-colors duration-300 ${
              isDark ? 'text-orange-200' : 'text-amber-800'
            }`}
          >
            A timeless space for crafting stories, sharing wisdom, and preserving thoughts in the digital age.
          </p>
        </div>
        
        {/* Modern Action Buttons */}
        <div 
          ref={buttonsRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
        >
          <Link 
            to="/register" 
            className={`group relative overflow-hidden w-full sm:w-auto font-semibold py-4 px-12 text-lg tracking-wide transition-all duration-500 hover-scale ${
              isDark 
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white'
                : 'bg-gradient-to-r from-orange-700 to-amber-800 text-white'
            }`}
            style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)' }}
          >
            <span className="relative z-10">Begin Writing</span>
            <div className={`absolute inset-0 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ${
              isDark 
                ? 'bg-gradient-to-r from-orange-500 to-yellow-500'
                : 'bg-gradient-to-r from-amber-600 to-orange-700'
            }`}></div>
          </Link>
          <Link 
            to="/dashboard" 
            className={`group relative overflow-hidden w-full sm:w-auto border font-semibold py-4 px-12 text-lg tracking-wide transition-all duration-500 hover-scale ${
              isDark 
                ? 'border-amber-400 text-amber-300 hover:text-white'
                : 'border-orange-600 text-orange-700 hover:text-white'
            }`}
            style={{ clipPath: 'polygon(5% 0, 100% 0, 100% 100%, 0% 100%)' }}
          >
            <span className="relative z-10">Enter Library</span>
            <div className={`absolute inset-0 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ${
              isDark 
                ? 'bg-gradient-to-r from-amber-600 to-orange-600'
                : 'bg-gradient-to-r from-orange-700 to-amber-800'
            }`}></div>
          </Link>
        </div>
        
        {/* Google Sign-in Option - Only show for non-authenticated users */}
        {!isAuthenticated && (
          <div className="flex flex-col items-center justify-center gap-4 mb-20">
            <div className={`text-sm font-medium ${
              isDark ? 'text-gray-300' : 'text-slate-600'
            }`}>
              Or continue with
            </div>
            <button 
              onClick={() => alert('Google Sign-in coming soon!')}
              className={`group relative overflow-hidden w-full sm:w-auto font-medium py-3 px-8 text-base tracking-wide transition-all duration-300 hover-scale flex items-center gap-3 ${
                isDark 
                  ? 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                  : 'bg-white border border-gray-300 text-slate-700 hover:bg-gray-50 shadow-sm'
              } backdrop-blur-sm rounded-lg`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="relative z-10">Continue with Google</span>
            </button>
          </div>
        )}
        
        {/* Modern Feature Cards */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div 
            className={`group relative overflow-hidden backdrop-blur-sm p-8 transition-all duration-500 hover-scale ${
              isDark 
                ? 'bg-amber-900/10 border border-amber-500/20 hover:bg-amber-900/20' 
                : 'bg-white/70 border border-slate-200 hover:bg-white/90 shadow-lg'
            }`}
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)' }}
          >
            <div className={`absolute top-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ${
              isDark ? 'bg-gradient-to-r from-amber-400 to-yellow-500' : 'bg-gradient-to-r from-amber-500 to-orange-500'
            }`}></div>
            <div className="text-4xl mb-4 text-amber-500">✒️</div>
            <h3 className={`text-xl font-medium mb-3 ${
              isDark ? 'text-white' : 'text-slate-800'
            }`}>Compose</h3>
            <p className={`leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-slate-600'
            }`}>Craft your thoughts with our classical writing interface, designed for focus and clarity.</p>
          </div>
          
          <div 
            className={`group relative overflow-hidden backdrop-blur-sm p-8 transition-all duration-500 hover-scale ${
              isDark 
                ? 'bg-amber-900/10 border border-amber-500/20 hover:bg-amber-900/20' 
                : 'bg-white/70 border border-slate-200 hover:bg-white/90 shadow-lg'
            }`}
            style={{ clipPath: 'polygon(0 10%, 100% 0, 100% 100%, 0 90%)' }}
          >
            <div className={`absolute top-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ${
              isDark ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'
            }`}></div>
            <div className="text-4xl mb-4 text-blue-500">📖</div>
            <h3 className={`text-xl font-medium mb-3 ${
              isDark ? 'text-white' : 'text-slate-800'
            }`}>Publish</h3>
            <p className={`leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-slate-600'
            }`}>Share your literary works with fellow readers in our curated collection.</p>
          </div>
          
          <div 
            className={`group relative overflow-hidden backdrop-blur-sm p-8 transition-all duration-500 hover-scale ${
              isDark 
                ? 'bg-amber-900/10 border border-amber-500/20 hover:bg-amber-900/20' 
                : 'bg-white/70 border border-slate-200 hover:bg-white/90 shadow-lg'
            }`}
            style={{ clipPath: 'polygon(0 0, 100% 10%, 100% 100%, 0 90%)' }}
          >
            <div className={`absolute top-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ${
              isDark ? 'bg-gradient-to-r from-orange-400 to-red-500' : 'bg-gradient-to-r from-green-500 to-teal-500'
            }`}></div>
            <div className="text-4xl mb-4 text-green-500">🏛️</div>
            <h3 className={`text-xl font-medium mb-3 ${
              isDark ? 'text-white' : 'text-slate-800'
            }`}>Preserve</h3>
            <p className={`leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-slate-600'
            }`}>Archive your writings in our digital library for posterity and reflection.</p>
          </div>
        </div>
        
        {/* Reading Time Demo Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className={`text-3xl font-light mb-4 ${
              isDark ? 'text-white' : 'text-slate-800'
            }`}>Experience Our Reading Features</h2>
            <p className={`${
              isDark ? 'text-gray-300' : 'text-slate-600'
            }`}>Scroll down to see the reading progress tracker in action!</p>
          </div>
          
          {/* Demo Article with Reading Time */}
          <article className={`backdrop-blur-sm rounded-lg p-8 mb-8 ${
            isDark 
              ? 'bg-amber-900/5 border border-amber-500/10' 
              : 'bg-white/50 border border-slate-200 shadow-lg'
          }`}>
            <header className="mb-6">
              <h3 className={`text-2xl font-medium mb-3 ${
                isDark ? 'text-white' : 'text-slate-800'
              }`}>The Art of Mindful Writing</h3>
              <div className="flex items-center gap-4 text-sm flex-wrap">
                <ReadingTime 
                  content={`Writing is more than just putting words on paper. It's about creating a connection between the writer and the reader, building bridges of understanding through carefully chosen words and thoughtfully constructed sentences.
                  
                  In our fast-paced digital world, the art of mindful writing has become increasingly valuable. When we write mindfully, we're not just transcribing thoughts – we're crafting experiences, painting pictures with words, and inviting readers into our inner worlds.
                  
                  The practice of mindful writing begins with intention. Before we type the first word, we pause. We breathe. We ask ourselves: What story do I want to tell? What emotion do I want to evoke? What change do I want to inspire?
                  
                  This intentional approach transforms ordinary writing into something extraordinary. Each word becomes deliberate, each sentence purposeful. The writer moves from being a mere transcriber of thoughts to becoming an architect of meaning.
                  
                  Consider the difference between writing that flows from anxiety and writing that flows from presence. Anxious writing often feels rushed, scattered, desperate to fill space. Mindful writing, on the other hand, has weight. It has breathing room. It trusts that the reader will stay for the journey.
                  
                  The beauty of mindful writing lies not just in its final form, but in the process itself. When we write mindfully, we become more aware of our thoughts, our emotions, our deepest truths. Writing becomes a form of meditation, a way of discovering not just what we think, but who we are.
                  
                  For readers, encountering mindful writing is like finding a quiet garden in the middle of a bustling city. It offers respite, reflection, and the rare gift of feeling truly understood. In a world of infinite content, mindful writing stands out not by shouting louder, but by speaking more truthfully.
                  
                  So whether you're crafting a blog post, writing in your journal, or composing your memoir, remember that every word is an opportunity. An opportunity to connect, to heal, to inspire, to transform both yourself and your readers through the simple yet profound act of mindful writing.`}
                  styleVariant="prominent"
                  showWordCount={true}
                />
                <span className="text-gray-400">•</span>
                <SessionClock styleVariant="prominent" showSeconds={true} className="" />
                <span className="text-gray-400">•</span>
                <span className="text-gray-400">March 12, 2024</span>
              </div>
            </header>
            
            <div className="prose max-w-none">
              <p className={`leading-relaxed mb-4 ${
                isDark ? 'text-gray-200' : 'text-slate-700'
              }`}>
                Writing is more than just putting words on paper. It's about creating a connection between the writer and the reader, building bridges of understanding through carefully chosen words and thoughtfully constructed sentences.
              </p>
              
              <p className={`leading-relaxed mb-4 ${
                isDark ? 'text-gray-200' : 'text-slate-700'
              }`}>
                In our fast-paced digital world, the art of mindful writing has become increasingly valuable. When we write mindfully, we're not just transcribing thoughts – we're crafting experiences, painting pictures with words, and inviting readers into our inner worlds.
              </p>
              
              <p className={`leading-relaxed mb-4 ${
                isDark ? 'text-gray-200' : 'text-slate-700'
              }`}>
                The practice of mindful writing begins with intention. Before we type the first word, we pause. We breathe. We ask ourselves: What story do I want to tell? What emotion do I want to evoke? What change do I want to inspire?
              </p>
              
              <p className={`leading-relaxed mb-4 ${
                isDark ? 'text-gray-200' : 'text-slate-700'
              }`}>
                This intentional approach transforms ordinary writing into something extraordinary. Each word becomes deliberate, each sentence purposeful. The writer moves from being a mere transcriber of thoughts to becoming an architect of meaning.
              </p>
              
              <p className={`leading-relaxed mb-4 ${
                isDark ? 'text-gray-200' : 'text-slate-700'
              }`}>
                Consider the difference between writing that flows from anxiety and writing that flows from presence. Anxious writing often feels rushed, scattered, desperate to fill space. Mindful writing, on the other hand, has weight. It has breathing room. It trusts that the reader will stay for the journey.
              </p>
              
              <p className={`leading-relaxed mb-4 ${
                isDark ? 'text-gray-200' : 'text-slate-700'
              }`}>
                The beauty of mindful writing lies not just in its final form, but in the process itself. When we write mindfully, we become more aware of our thoughts, our emotions, our deepest truths. Writing becomes a form of meditation, a way of discovering not just what we think, but who we are.
              </p>
              
              <p className={`leading-relaxed mb-4 ${
                isDark ? 'text-gray-200' : 'text-slate-700'
              }`}>
                For readers, encountering mindful writing is like finding a quiet garden in the middle of a bustling city. It offers respite, reflection, and the rare gift of feeling truly understood. In a world of infinite content, mindful writing stands out not by shouting louder, but by speaking more truthfully.
              </p>
              
              <p className={`leading-relaxed ${
                isDark ? 'text-gray-200' : 'text-slate-700'
              }`}>
                So whether you're crafting a blog post, writing in your journal, or composing your memoir, remember that every word is an opportunity. An opportunity to connect, to heal, to inspire, to transform both yourself and your readers through the simple yet profound act of mindful writing.
              </p>
            </div>
          </article>
          
          {/* Reading Stats Component */}
          <ReadingStats className="mb-8" />
          
          {/* Smart Auto-Save Editor Demo */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className={`text-3xl font-light mb-4 ${
                isDark ? 'text-white' : 'text-slate-800'
              }`}>Smart Auto-Save Editor</h2>
              <p className={`${
                isDark ? 'text-gray-300' : 'text-slate-600'
              }`}>Experience intelligent draft saving with version history!</p>
            </div>
            
            <SmartEditor
              draftKey="homepage-demo"
              placeholder="Try typing here to see the auto-save feature in action! Your text will be saved automatically every 3 seconds, and you can access version history..."
              className="mb-8"
            />
            
            <div className={`backdrop-blur-sm rounded-lg p-6 mt-4 ${
              isDark 
                ? 'bg-amber-900/10 border border-amber-500/20' 
                : 'bg-white/50 border border-slate-200 shadow-lg'
            }`}>
              <h4 className={`text-lg font-medium mb-3 flex items-center gap-2 ${
                isDark ? 'text-white' : 'text-slate-800'
              }`}>
                <span className="text-xl">✨</span>
                Auto-Save Features
              </h4>
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 text-sm ${
                isDark ? 'text-gray-200' : 'text-slate-600'
              }`}>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Automatic Saving:</strong> Your work saves every 3 seconds automatically
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Version History:</strong> Access up to 10 previous versions of your draft
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Visual Feedback:</strong> See real-time save status and progress
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Smart Recovery:</strong> Never lose your work, even if you close the browser
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  
  return (
    <AuthProvider>
      <Router>
        {/* ========= 2. RENDER THE COMPONENT HERE ========= */}
        {/* This single line gives your entire site the modern animated background. */}
        <ModernBackground />
        
        {/* Reading Progress Bar - shows on all pages */}
        <ReadingProgress position="top" color="amber" showTimeSpent={true} />
        
        {/* Reading Features Guide - floating help button */}
        <ReadingGuide />
        
        {/* Floating Session Timer - tracks time since website opened */}
        <FloatingSessionTimer position="bottom-right" />
        
        {/* Theme Toggle Button - fixed position */}
        <ThemeToggle position="fixed" size="default" showLabel={false} className="top-4 left-4" />
        
        <div className="isolate App pt-16 min-h-screen">
          <Navbar />
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/create-post" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
              <Route path="/edit-post/:id" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
              
              {/* Redirect any unknown routes */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;