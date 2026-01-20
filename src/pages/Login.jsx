import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mail, CheckCircle, Loader2, Eye, EyeOff } from 'lucide-react';

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Forgot Password State
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [fpEmail, setFpEmail] = useState('');
  const [fpSubmitted, setFpSubmitted] = useState(false);
  const [fpLoading, setFpLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock authentication delay
    setTimeout(() => {
      onLogin(formData.role);
      setIsLoading(false);
    }, 1500);
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    if (!fpEmail) return;
    setFpLoading(true);
    // Simulate API call
    setTimeout(() => {
      setFpSubmitted(true);
      setFpLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-sky-800 mb-2">🎓 EDUMIND</h1>
            <p className="text-gray-600">School Management System</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Role Selection */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Login As</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="parent">Parent</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Logging in...
                </>
              ) : (
                'LOGIN'
              )}
            </button>
          </form>

          {/* Signup Link */}
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <a href="/signup" className="text-sky-500 hover:text-sky-600 font-semibold">
                Sign Up
              </a>
            </p>
          </div>

          {/* Forgot Password */}
          <div className="text-center mt-2">
            <button
              type="button"
              onClick={() => setShowForgotPasswordModal(true)}
              className="text-gray-600 hover:text-gray-700 text-sm"
            >
              Forgot Password?
            </button>
          </div>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-sky-50 rounded-lg">
            <p className="text-sm font-semibold text-gray-700 mb-2">Demo Credentials:</p>
            <p className="text-xs text-gray-600">Email: demo@edumind.com</p>
            <p className="text-xs text-gray-600">Password: demo123</p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative">
            <button 
              onClick={() => {
                setShowForgotPasswordModal(false);
                setFpSubmitted(false);
                setFpEmail('');
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="p-8">
              {fpSubmitted ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Sent!</h2>
                  <p className="text-gray-600 mb-6">
                    We've sent a password reset link to <strong>{fpEmail}</strong>
                  </p>
                  <button 
                    onClick={() => {
                      setShowForgotPasswordModal(false);
                      setFpSubmitted(false);
                      setFpEmail('');
                    }}
                    className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 rounded-lg transition-all"
                  >
                    Back to Login
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-6 h-6 text-sky-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
                    <p className="text-gray-600 text-sm">
                      Enter your email address and we'll send you a link to reset your password.
                    </p>
                  </div>

                  <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        value={fpEmail}
                        onChange={(e) => setFpEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={fpLoading}
                      className={`w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 rounded-lg transition-all ${
                        fpLoading ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {fpLoading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
