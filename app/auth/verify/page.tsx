"use client";

import React, { useState, useRef, KeyboardEvent, ClipboardEvent, ChangeEvent } from 'react';
import AuthLayout from '../login/authLayout';
import SubmitButton from '@/components/submitButton/submitButton';
import FloatingClock from '@/components/FloatingClock';
import '@/auth/authLayout.css';
import './verify.css';
import Link from 'next/link';

const VerifyPage = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Handle input change
  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle keydown for backspace
  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    
    // Only allow digits
    if (!/^\d+$/.test(pastedData)) {
      return;
    }

    const newOtp = [...otp];
    pastedData.split('').forEach((char, index) => {
      if (index < 6) {
        newOtp[index] = char;
      }
    });
    setOtp(newOtp);

    // Focus the last filled input or next empty
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      alert('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('OTP Verification:', otpValue);
      alert('Verification successful!');
      // Handle successful verification here
    } catch (error) {
      console.error('Verification error:', error);
      alert('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resend OTP
  const handleResend = () => {
    console.log('Resending OTP...');
    alert('A new OTP has been sent to your email/phone');
    setOtp(Array(6).fill(''));
    inputRefs.current[0]?.focus();
  };

  return (
    <>
      <AuthLayout
        welcomeMessage="Verify Your Account"
        title="Enter Verification Code"
        subtitle="We've sent a 6-digit code to your email/phone"
      >
      <form onSubmit={handleSubmit} className="verify-form">
        <p className="verify-instruction">
          Please enter the 6-digit verification code below
        </p>

        {/* OTP Input Fields */}
        <div className="otp-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="otp-input"
              autoFocus={index === 0}
              required
            />
          ))}
        </div>

        {/* Resend Code */}
        <div className="resend-section">
          <p className="resend-text">
            Didn't receive the code?{' '}
            <button
              type="button"
              className="resend-link"
              onClick={handleResend}
            >
              Resend Code
            </button>
          </p>
        </div>

        {/* Submit Button */}
        <SubmitButton loading={isLoading}>
          Verify
        </SubmitButton>

        {/* Back to Login Link */}
        <div className="signup-section">
          <p className="signup-text">
            <Link
              href="/auth/login"
              className="signup-link"
            >
              ← Back to Login
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
    <FloatingClock />
    </>
  );
};

export default VerifyPage;

