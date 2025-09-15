import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaRocket } from 'react-icons/fa'; // Import the icon

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name] || errors.general) {
      setErrors(prev => ({ ...prev, [name]: '', confirmPassword: '', general: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const { confirmPassword, ...registrationData } = formData;
      const result = await register(registrationData);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setErrors({ general: result.message });
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Base classes for input fields
  const inputClasses = "w-full px-4 py-3 mt-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent backdrop-blur-sm text-white placeholder-white/60";
  const errorInputClasses = "border-red-400 ring-red-400 bg-red-900/20";

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-black/20 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl space-y-4 hover-scale">

        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white flex items-center justify-center gap-3 mb-2">
            <FaRocket className="text-2xl text-amber-400" />
            Join Us Today
          </h2>
          <p className="text-gray-300">
            Create your account and start blogging
          </p>
        </div>

        {/* General Error Message */}
        {errors.general && (
          <div className="bg-red-900/30 border border-red-400/50 text-red-200 p-4 rounded-lg backdrop-blur-sm">
            <p>{errors.general}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-200">Full Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              className={`${inputClasses} ${errors.name ? errorInputClasses : ''}`} 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Enter your full name" 
              disabled={isSubmitting} 
            />
            {errors.name && <p className="mt-1 text-xs text-red-300">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-200">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              className={`${inputClasses} ${errors.email ? errorInputClasses : ''}`} 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Enter your email" 
              disabled={isSubmitting} 
            />
            {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-200">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              className={`${inputClasses} ${errors.password ? errorInputClasses : ''}`} 
              value={formData.password} 
              onChange={handleChange} 
              placeholder="Enter your password" 
              disabled={isSubmitting} 
            />
            {errors.password ? <p className="mt-1 text-xs text-red-300">{errors.password}</p> : <p className="mt-1 text-xs text-gray-400">Password must be at least 6 characters long</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-200">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              className={`${inputClasses} ${errors.confirmPassword ? errorInputClasses : ''}`} 
              value={formData.confirmPassword} 
              onChange={handleChange} 
              placeholder="Confirm your password" 
              disabled={isSubmitting} 
            />
            {errors.confirmPassword && <p className="mt-1 text-xs text-red-300">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className={`w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-semibold text-white ${
              isSubmitting ? 'bg-amber-700/50 cursor-not-allowed' : 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400'
            } transition-all duration-300 transform hover:scale-105`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Creating Account...
              </>
            ) : (
              <>
                <FaRocket /> Create Account
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-300">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-amber-400 hover:text-amber-300 transition-colors duration-200">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
