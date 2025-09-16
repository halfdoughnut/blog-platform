import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsDropdownOpen(false);
  };

  return (
    // UPDATED: Styles changed for a fixed, transparent 'glass' effect. The old 'mb-8' is removed as it's no longer needed.
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo - colors adjusted for better contrast */}
          <div className="flex items-center">
            <Link 
              to={isAuthenticated ? "/dashboard" : "/"} 
              className="flex items-center text-white text-xl font-bold hover:text-gray-300 transition-colors"
            >
              <svg className="w-8 h-8 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zM6 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd"/>
              </svg>
              BlogPlatform
            </Link>
          </div>

          {/* Desktop Navigation - colors adjusted for contrast */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">📊 Dashboard</Link>
                <Link to="/create-post" className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">➕ New Post</Link>
                <div className="relative">
                  <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    👤 SomDev
                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">🚪 Logout</button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Login</Link>
                <Link to="/register" className="bg-white/90 hover:bg-white text-gray-900 px-4 py-2 rounded-md text-sm font-semibold transition-colors">Sign Up</Link>
              </>
            )}
          </div>

          {/* Mobile menu button - colors adjusted */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">{isMenuOpen ? <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/> : <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>}</svg>
            </button>
          </div>
        </div>

        {/* Mobile menu - Styles updated to match the new 'glass' look */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/50 backdrop-blur-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="text-gray-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMenuOpen(false)}>📊 Dashboard</Link>
                  <Link to="/create-post" className="text-gray-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMenuOpen(false)}>➕ New Post</Link>
                  <button onClick={handleLogout} className="text-gray-200 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">🚪 Logout (SomDev)</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMenuOpen(false)}>Login</Link>
                  <Link to="/register" className="text-gray-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      
      {isDropdownOpen && <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)}></div>}
    </nav>
  );
};

export default Navbar;