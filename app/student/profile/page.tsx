/**
 * STUDENT PROFILE PAGE
 * 
 * This page allows students to view and edit their profile information.
 * 
 * LOCATION: /student/profile
 * 
 * FEATURES:
 * - Profile card with photo and basic info
 * - Edit personal information (name, email, phone, class)
 * - Change password section
 * - Account actions (logout)
 * - Student statistics
 * - Smooth animations
 */

"use client";

import React, { useState } from 'react';
import StudentLayout from '../components/StudentLayout';
import { 
  User, 
  Mail, 
  Phone, 
  GraduationCap,
  Calendar,
  MapPin,
  Edit2,
  Save,
  X,
  Lock,
  LogOut,
  Camera,
  Award,
  BookOpen,
  FileText,
  Shield
} from 'lucide-react';
import './profile.css';

// TYPES
interface StudentData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  studentId: string;
  class: string;
  department: string;
  enrollmentDate: string;
  address: string;
  dateOfBirth: string;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// MOCK STUDENT DATA
const initialStudentData: StudentData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@student.edu',
  phone: '+1 (555) 123-4567',
  studentId: 'STU-2024-001',
  class: 'Computer Science - Year 3',
  department: 'Engineering',
  enrollmentDate: 'September 2022',
  address: '123 University Ave, Campus City, ST 12345',
  dateOfBirth: '2003-05-15'
};

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [studentData, setStudentData] = useState<StudentData>(initialStudentData);
  const [editData, setEditData] = useState<StudentData>(initialStudentData);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  // Statistics
  const stats = [
    { label: 'Reports Submitted', value: '24', icon: <FileText size={20} />, color: '#3b82f6' },
    { label: 'Courses Enrolled', value: '8', icon: <BookOpen size={20} />, color: '#10b981' },
    { label: 'GPA', value: '3.85', icon: <Award size={20} />, color: '#f59e0b' },
    { label: 'Attendance', value: '95%', icon: <Shield size={20} />, color: '#8b5cf6' }
  ];

  // Handle edit mode toggle
  const handleEditToggle = () => {
    if (isEditing) {
      setEditData(studentData); // Reset to original data
    }
    setIsEditing(!isEditing);
  };

  // Handle input changes
  const handleInputChange = (field: keyof StudentData, value: string) => {
    setEditData({ ...editData, [field]: value });
  };

  // Handle password input changes
  const handlePasswordChange = (field: keyof PasswordData, value: string) => {
    setPasswordData({ ...passwordData, [field]: value });
  };

  // Save profile changes
  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setStudentData(editData);
    setIsEditing(false);
    setIsSaving(false);
    
    // Show success message (you can add a toast notification here)
    alert('Profile updated successfully!');
  };

  // Handle password change
  const handlePasswordSubmit = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }

    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSaving(false);
    setIsChangingPassword(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    
    alert('Password changed successfully!');
  };

  // Handle logout
  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      // Implement logout logic here
      alert('Logging out...');
      // window.location.href = '/login';
    }
  };

  return (
    <StudentLayout>
      {/* PAGE HEADER */}
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: '700', 
          color: '#1a202c',
          margin: 0 
        }}>
          My Profile
        </h1>
        <p style={{ 
          color: '#718096', 
          marginTop: '0.5rem',
          fontSize: '0.95rem' 
        }}>
          Manage your personal information and preferences
        </p>
      </div>

      {/* PROFILE CONTENT */}
      <div className="profile-container">
        {/* LEFT COLUMN - Profile Card */}
        <div className="profile-left">
          {/* PROFILE CARD */}
          <div className="profile-card fade-in">
            <div className="profile-header">
              <div className="profile-avatar-wrapper">
                <div className="profile-avatar">
                  <User size={48} />
                </div>
                <button className="avatar-upload-btn">
                  <Camera size={16} />
                </button>
              </div>
              <div className="profile-header-info">
                <h2 className="profile-name">{studentData.firstName} {studentData.lastName}</h2>
                <p className="profile-id">{studentData.studentId}</p>
                <p className="profile-department">{studentData.department}</p>
              </div>
            </div>

            <div className="profile-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                    {stat.icon}
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="profile-actions">
              <button className="btn-logout" onClick={handleLogout}>
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Information & Settings */}
        <div className="profile-right">
          {/* PERSONAL INFORMATION */}
          <div className="info-card fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="info-card-header">
              <h3 className="info-card-title">Personal Information</h3>
              {!isEditing ? (
                <button className="btn-edit" onClick={handleEditToggle}>
                  <Edit2 size={16} />
                  Edit Profile
                </button>
              ) : (
                <div className="edit-actions">
                  <button className="btn-cancel" onClick={handleEditToggle}>
                    <X size={16} />
                    Cancel
                  </button>
                  <button className="btn-save" onClick={handleSave} disabled={isSaving}>
                    <Save size={16} />
                    {isSaving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              )}
            </div>

            <div className="info-grid">
              {/* First Name */}
              <div className="info-field">
                <label className="info-label">
                  <User size={16} />
                  First Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    className="info-input"
                    value={editData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                  />
                ) : (
                  <div className="info-value">{studentData.firstName}</div>
                )}
              </div>

              {/* Last Name */}
              <div className="info-field">
                <label className="info-label">
                  <User size={16} />
                  Last Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    className="info-input"
                    value={editData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                  />
                ) : (
                  <div className="info-value">{studentData.lastName}</div>
                )}
              </div>

              {/* Email */}
              <div className="info-field">
                <label className="info-label">
                  <Mail size={16} />
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    className="info-input"
                    value={editData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                ) : (
                  <div className="info-value">{studentData.email}</div>
                )}
              </div>

              {/* Phone */}
              <div className="info-field">
                <label className="info-label">
                  <Phone size={16} />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    className="info-input"
                    value={editData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                ) : (
                  <div className="info-value">{studentData.phone}</div>
                )}
              </div>

              {/* Class */}
              <div className="info-field">
                <label className="info-label">
                  <GraduationCap size={16} />
                  Class
                </label>
                {isEditing ? (
                  <select
                    className="info-input"
                    value={editData.class}
                    onChange={(e) => handleInputChange('class', e.target.value)}
                  >
                    <option>Computer Science - Year 1</option>
                    <option>Computer Science - Year 2</option>
                    <option>Computer Science - Year 3</option>
                    <option>Computer Science - Year 4</option>
                    <option>Engineering - Year 1</option>
                    <option>Engineering - Year 2</option>
                    <option>Engineering - Year 3</option>
                    <option>Engineering - Year 4</option>
                  </select>
                ) : (
                  <div className="info-value">{studentData.class}</div>
                )}
              </div>

              {/* Date of Birth */}
              <div className="info-field">
                <label className="info-label">
                  <Calendar size={16} />
                  Date of Birth
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    className="info-input"
                    value={editData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  />
                ) : (
                  <div className="info-value">{new Date(studentData.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                )}
              </div>

              {/* Enrollment Date */}
              <div className="info-field">
                <label className="info-label">
                  <Calendar size={16} />
                  Enrollment Date
                </label>
                <div className="info-value info-value-readonly">{studentData.enrollmentDate}</div>
              </div>

              {/* Student ID */}
              <div className="info-field">
                <label className="info-label">
                  <Award size={16} />
                  Student ID
                </label>
                <div className="info-value info-value-readonly">{studentData.studentId}</div>
              </div>

              {/* Address */}
              <div className="info-field info-field-full">
                <label className="info-label">
                  <MapPin size={16} />
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    className="info-input info-textarea"
                    value={editData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={2}
                  />
                ) : (
                  <div className="info-value">{studentData.address}</div>
                )}
              </div>
            </div>
          </div>

          {/* SECURITY SETTINGS */}
          <div className="info-card fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="info-card-header">
              <h3 className="info-card-title">
                <Lock size={20} />
                Security Settings
              </h3>
            </div>

            {!isChangingPassword ? (
              <div className="security-content">
                <p className="security-description">
                  Keep your account secure by regularly updating your password.
                </p>
                <button className="btn-change-password" onClick={() => setIsChangingPassword(true)}>
                  <Lock size={16} />
                  Change Password
                </button>
              </div>
            ) : (
              <div className="password-form">
                <div className="info-field">
                  <label className="info-label">Current Password</label>
                  <input
                    type="password"
                    className="info-input"
                    value={passwordData.currentPassword}
                    onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                    placeholder="Enter current password"
                  />
                </div>

                <div className="info-field">
                  <label className="info-label">New Password</label>
                  <input
                    type="password"
                    className="info-input"
                    value={passwordData.newPassword}
                    onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                    placeholder="Enter new password (min 8 characters)"
                  />
                </div>

                <div className="info-field">
                  <label className="info-label">Confirm New Password</label>
                  <input
                    type="password"
                    className="info-input"
                    value={passwordData.confirmPassword}
                    onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                    placeholder="Confirm new password"
                  />
                </div>

                <div className="password-actions">
                  <button 
                    className="btn-cancel" 
                    onClick={() => {
                      setIsChangingPassword(false);
                      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn-save" 
                    onClick={handlePasswordSubmit}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default ProfilePage;

