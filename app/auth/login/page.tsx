"use client";

import React, { useState } from 'react';
import { useInput } from '@/hooks/useInput';
import AuthLayout from './authLayout';
import FormInput from '@/components/formInput/formInput';
import PasswordToggle from '@/components/PasswordToggle/passwordToggle';
import SubmitButton from '@/components/submitButton/submitButton';
import FloatingClock from '@/components/FloatingClock';
import '@/auth/authLayout.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  
  // Form state management
  const email = useInput('');
  const password = useInput('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Login attempt:', {
        email: email.value,
        password: password.value,
        rememberMe
      });
      // Handle successful login here
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <>
      <AuthLayout
        welcomeMessage="Welcome Back!"
        title="Sign In to Your Account"
        subtitle="Enter your credentials to access the system"
      >
      <form onSubmit={handleSubmit} className="login-form">
        {/* Email Input */}
        <FormInput
          label="Email Address"
          type="email"
          value={email.value}
          onChange={email.handleChange}
          onFocus={email.handleFocus}
          onBlur={email.handleBlur}
          isFocused={email.isFocused}
          required={true}
          autoComplete="email"
        />

        {/* Password Input */}
        <FormInput
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password.value}
          onChange={password.handleChange}
          onFocus={password.handleFocus}
          onBlur={password.handleBlur}
          isFocused={password.isFocused}
          required={true}
          autoComplete="current-password"
        />

        {/* Password Toggle */}
        <PasswordToggle
          showPassword={showPassword}
          onToggle={() => setShowPassword(!showPassword)}
        />

        {/* Remember Me & Forgot Password */}
        <div className="form-options">
          <label className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span>Remember me</span>
          </label>
          
          <Link
            href="/auth/reset-password"
            className="forgot-password-link"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <SubmitButton loading={isLoading}>
          Sign In
        </SubmitButton>

        {/* Sign Up Link */}
        <div className="signup-section">
          <p className="signup-text">
            Don't have an account?{' '}
            <Link
              href="/auth/signup"
              className="signup-link"
            >
              Sign up now
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
    <FloatingClock />
    </>
  );
};

export default LoginPage;
