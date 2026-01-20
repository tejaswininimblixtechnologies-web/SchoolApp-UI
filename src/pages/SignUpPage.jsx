import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle, ArrowLeft, Shield, GraduationCap, Users, Briefcase } from 'lucide-react';

export default function SignUpPage() {
  const navigate = useNavigate();

  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Common fields
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    staffType: 'teaching', // Default to teaching

    // Student specific
    rollNumber: '',
    className: '',

    // Staff specific
    designation: '',
    subject: '',

    // Parent specific
    childName: '',
    relationship: '',
  });

  const calculatePasswordStrength = (pwd) => {
    let strength = 0;
    if (pwd.length >= 8) strength += 20;
    if (/[a-z]/.test(pwd)) strength += 20;
    if (/[A-Z]/.test(pwd)) strength += 20;
    if (/[0-9]/.test(pwd)) strength += 20;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) strength += 20;
    return strength;
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setFormData({ ...formData, password: pwd });
    setPasswordStrength(calculatePasswordStrength(pwd));
    if (errors.password) setErrors({ ...errors, password: '' });
  };

  const validateForm = () => {
    const newErrors = {};

    // Common validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Phone must be 10 digits';
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one special character';
    } else if (passwordStrength < 50) {
      newErrors.password = 'Password is too weak. Use uppercase, lowercase, numbers, and symbols.';
    }
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    // Role-specific validation
    if (role === 'student') {
      if (!formData.rollNumber.trim()) newErrors.rollNumber = 'Roll number is required';
      if (!formData.className.trim()) newErrors.className = 'Class is required';
    }

    if (role === 'staff') {
      if (formData.staffType === 'teaching' && !formData.designation.trim()) newErrors.designation = 'Designation is required';
      if (formData.staffType === 'teaching' && !formData.subject.trim()) {
        newErrors.subject = 'Subject is required for teaching staff';
      }
    }

    if (role === 'parent') {
      if (!formData.childName.trim()) newErrors.childName = 'Child name is required';
      if (!formData.relationship.trim()) newErrors.relationship = 'Relationship is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setTimeout(() => {
      // Get existing registered users
      let registeredUsers = {};
      try {
        registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
      } catch (error) {
        console.error('Error parsing registered users:', error);
        registeredUsers = {};
      }
      
      // Determine user role key (use 'staff' for teachers)
      const roleKey = role;
      
      // Register new user
      registeredUsers[roleKey] = {
        email: formData.email.toLowerCase(),
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        role: role,
      };
      
      // Add role-specific fields
      if (role === 'student') {
        registeredUsers[roleKey].rollNumber = formData.rollNumber;
        registeredUsers[roleKey].className = formData.className;
      } else if (role === 'staff') {
        registeredUsers[roleKey].designation = formData.designation;
        registeredUsers[roleKey].subject = formData.subject;
        registeredUsers[roleKey].staffType = formData.staffType;
      } else if (role === 'parent') {
        registeredUsers[roleKey].childName = formData.childName;
        registeredUsers[roleKey].relationship = formData.relationship;
      }
      
      // Save to localStorage
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      console.log('✅ User registered successfully!');
      console.log('📝 Registered Users:', registeredUsers);
      
      localStorage.setItem('userRole', role);
      localStorage.setItem('userName', `${formData.firstName} ${formData.lastName}`);
      localStorage.setItem('userEmail', formData.email);
      setSubmitted(true);
      setLoading(false);

      setTimeout(() => {
        navigate(role === 'staff' ? '/teacher' : '/'); // Redirect to dashboard or login
      }, 2500);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Account Created!</h2>
          <p className="text-gray-600 mb-4">Welcome to EduMind. You're being redirected...</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex flex-col items-center justify-center p-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="flex justify-start items-center mb-6">
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Login
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 px-8 py-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-blue-100">Join EduMind and manage your education</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Select your role</label>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { id: 'admin', label: 'Admin', icon: Shield },
                  { id: 'student', label: 'Student', icon: GraduationCap },
                  { id: 'parent', label: 'Parent', icon: Users },
                  { id: 'staff', label: 'Staff', icon: Briefcase }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setRole(id);
                      setFormData({ ...formData, role: id });
                    }}
                    className={`py-3 px-2 rounded-lg font-semibold text-sm transition-all flex flex-col items-center justify-center gap-2 ${
                      role === id
                        ? 'bg-blue-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Basic Information */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={(e) => {
                      setFormData({ ...formData, firstName: e.target.value });
                      if (errors.firstName) setErrors({ ...errors, firstName: '' });
                    }}
                    placeholder="John"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={(e) => {
                      setFormData({ ...formData, lastName: e.target.value });
                      if (errors.lastName) setErrors({ ...errors, lastName: '' });
                    }}
                    placeholder="Doe"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    placeholder="john@example.com"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    placeholder="9876543210"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Password Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Password Setup</h3>
              <div className="space-y-4">
                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handlePasswordChange}
                      placeholder="Enter strong password"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}

                  {/* Password Requirements */}
                  {formData.password && (
                    <div className="mt-3 space-y-2">
                      <div className="text-xs font-medium text-gray-600 mb-2">Password Requirements:</div>
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        <div className={`flex items-center gap-1 ${formData.password.length >= 8 ? 'text-green-600' : 'text-gray-400'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${formData.password.length >= 8 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                          <span>8+ characters</span>
                        </div>
                        <div className={`flex items-center gap-1 ${/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${/[A-Z]/.test(formData.password) ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                          <span>Uppercase letter</span>
                        </div>
                        <div className={`flex items-center gap-1 ${/[a-z]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${/[a-z]/.test(formData.password) ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                          <span>Lowercase letter</span>
                        </div>
                        <div className={`flex items-center gap-1 ${/[0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${/[0-9]/.test(formData.password) ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                          <span>Number</span>
                        </div>
                        <div className={`flex items-center gap-1 ${/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                          <span>Special character</span>
                        </div>
                      </div>

                      {/* Strength Meter */}
                      <div className="mt-3">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs font-medium text-gray-600">Password Strength</span>
                          <span className={`text-xs font-semibold ${
                            passwordStrength < 60 ? 'text-red-500' : passwordStrength < 80 ? 'text-yellow-500' : 'text-green-500'
                          }`}>
                            {passwordStrength < 60 ? 'Weak' : passwordStrength < 80 ? 'Good' : 'Strong'}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              passwordStrength < 60 ? 'bg-red-500' : passwordStrength < 80 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${passwordStrength}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={(e) => {
                        setFormData({ ...formData, confirmPassword: e.target.value });
                        if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                      }}
                      placeholder="Re-enter password"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>
            </div>

            {/* Role-Specific Fields */}
            {role === 'student' && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Student Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Roll Number *</label>
                    <input
                      type="text"
                      name="rollNumber"
                      value={formData.rollNumber}
                      onChange={(e) => {
                        setFormData({ ...formData, rollNumber: e.target.value });
                        if (errors.rollNumber) setErrors({ ...errors, rollNumber: '' });
                      }}
                      placeholder="12345"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.rollNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.rollNumber && <p className="text-red-500 text-xs mt-1">{errors.rollNumber}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Class *</label>
                    <select
                      name="className"
                      value={formData.className}
                      onChange={(e) => {
                        setFormData({ ...formData, className: e.target.value });
                        if (errors.className) setErrors({ ...errors, className: '' });
                      }}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.className ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select Class</option>
                      {['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'].map((cls) => (
                        <option key={cls} value={cls}>{cls}</option>
                      ))}
                    </select>
                    {errors.className && <p className="text-red-500 text-xs mt-1">{errors.className}</p>}
                  </div>
                </div>
              </div>
            )}

            {role === 'staff' && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Staff Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Staff Type *</label>
                    <div className="flex gap-4">
                      {['teaching', 'non-teaching'].map((type) => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="staffType"
                            checked={formData.staffType === type}
                            onChange={() => setFormData({ ...formData, staffType: type })}
                            className="w-4 h-4 text-blue-600"
                          />
                          <span className="text-sm text-gray-700 capitalize">{type.replace('-', ' ')} Staff</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Designation *</label>
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={(e) => {
                        setFormData({ ...formData, designation: e.target.value });
                        if (errors.designation) setErrors({ ...errors, designation: '' });
                      }}
                      placeholder="Senior Teacher"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.designation ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation}</p>}
                  </div>
                  {formData.staffType === 'teaching' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={(e) => {
                          setFormData({ ...formData, subject: e.target.value });
                          if (errors.subject) setErrors({ ...errors, subject: '' });
                        }}
                        placeholder="Mathematics"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.subject ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                    </div>
                  )}
                </div>
              </div>
            )}

            {role === 'parent' && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Parent Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Child Name *</label>
                    <input
                      type="text"
                      name="childName"
                      value={formData.childName}
                      onChange={(e) => {
                        setFormData({ ...formData, childName: e.target.value });
                        if (errors.childName) setErrors({ ...errors, childName: '' });
                      }}
                      placeholder="Jane Doe"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.childName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.childName && <p className="text-red-500 text-xs mt-1">{errors.childName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Relationship *</label>
                    <input
                      type="text"
                      name="relationship"
                      value={formData.relationship}
                      onChange={(e) => {
                        setFormData({ ...formData, relationship: e.target.value });
                        if (errors.relationship) setErrors({ ...errors, relationship: '' });
                      }}
                      placeholder="Father"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.relationship ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.relationship && <p className="text-red-500 text-xs mt-1">{errors.relationship}</p>}
                  </div>
                </div>
              </div>
            )}

            {role === 'admin' && (
              <div className="border-t pt-6">
                <p className="text-gray-600 text-sm">Admin accounts require special verification. Contact support for registration.</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="border-t pt-6">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-teal-600 hover:shadow-lg transform hover:scale-105'
                }`}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center pt-4 border-t">
              <p className="text-gray-600 text-sm">
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/')}
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  Login here
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
