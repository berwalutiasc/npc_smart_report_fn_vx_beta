/**
 * ADMIN PROFILE PAGE
 * 
 * This page allows admins to view and edit their profile information.
 * 
 * LOCATION: /admin/profile
 * 
 * FEATURES:
 * - Profile card with photo and basic info
 * - Edit personal information
 * - Change password section
 * - Admin statistics
 * - Account management
 */

"use client";

import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { 
  User, 
  Mail, 
  Phone, 
  Shield,
  Calendar,
  MapPin,
  Edit2,
  Save,
  X,
  Lock,
  LogOut,
  Camera,
  Award,
  FileText,
  Users,
  TrendingUp
} from 'lucide-react';
import '../../student/profile/profile.css';

const AdminProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [adminData, setAdminData] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@npc.edu',
    phone: '+1 (555) 999-0000',
    adminId: 'ADM-2024-001',
    role: 'System Administrator',
    department: 'Administration',
    joinDate: 'January 2022',
    address: '123 Admin Office, Campus City, ST 12345',
    dateOfBirth: '1985-05-15'
  });

  const stats = [
    { label: 'Total Reports Reviewed', value: '1,248', icon: <FileText size={20} />, color: '#3b82f6' },
    { label: 'Active Students', value: '856', icon: <Users size={20} />, color: '#10b981' },
    { label: 'Representatives', value: '45', icon: <Shield size={20} />, color: '#f59e0b' },
    { label: 'System Uptime', value: '99.9%', icon: <TrendingUp size={20} />, color: '#8b5cf6' }
  ];

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsEditing(false);
    setIsSaving(false);
    alert('Profile updated successfully!');
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      alert('Logging out...');
    }
  };

  return (
    <AdminLayout>
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1a202c', margin: 0 }}>
          Admin Profile
        </h1>
        <p style={{ color: '#718096', marginTop: '0.5rem', fontSize: '0.95rem' }}>
          Manage your administrator profile and preferences
        </p>
      </div>

      <div className="profile-container">
        <div className="profile-left">
          <div className="profile-card fade-in">
            <div className="profile-header">
              <div className="profile-avatar-wrapper">
                <div className="profile-avatar" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
                  <Shield size={48} color="white" />
                </div>
                <button className="avatar-upload-btn">
                  <Camera size={16} />
                </button>
              </div>
              <div className="profile-header-info">
                <h2 className="profile-name">{adminData.firstName} {adminData.lastName}</h2>
                <p className="profile-id">{adminData.adminId}</p>
                <p className="profile-department">{adminData.role}</p>
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

        <div className="profile-right">
          <div className="info-card fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="info-card-header">
              <h3 className="info-card-title">Personal Information</h3>
              {!isEditing ? (
                <button className="btn-edit" onClick={() => setIsEditing(true)}>
                  <Edit2 size={16} />
                  Edit Profile
                </button>
              ) : (
                <div className="edit-actions">
                  <button className="btn-cancel" onClick={() => setIsEditing(false)}>
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
              <div className="info-field">
                <label className="info-label">
                  <User size={16} />
                  First Name
                </label>
                {isEditing ? (
                  <input type="text" className="info-input" value={adminData.firstName} />
                ) : (
                  <div className="info-value">{adminData.firstName}</div>
                )}
              </div>

              <div className="info-field">
                <label className="info-label">
                  <User size={16} />
                  Last Name
                </label>
                {isEditing ? (
                  <input type="text" className="info-input" value={adminData.lastName} />
                ) : (
                  <div className="info-value">{adminData.lastName}</div>
                )}
              </div>

              <div className="info-field">
                <label className="info-label">
                  <Mail size={16} />
                  Email Address
                </label>
                {isEditing ? (
                  <input type="email" className="info-input" value={adminData.email} />
                ) : (
                  <div className="info-value">{adminData.email}</div>
                )}
              </div>

              <div className="info-field">
                <label className="info-label">
                  <Phone size={16} />
                  Phone Number
                </label>
                {isEditing ? (
                  <input type="tel" className="info-input" value={adminData.phone} />
                ) : (
                  <div className="info-value">{adminData.phone}</div>
                )}
              </div>

              <div className="info-field">
                <label className="info-label">
                  <Shield size={16} />
                  Role
                </label>
                <div className="info-value info-value-readonly">{adminData.role}</div>
              </div>

              <div className="info-field">
                <label className="info-label">
                  <Calendar size={16} />
                  Join Date
                </label>
                <div className="info-value info-value-readonly">{adminData.joinDate}</div>
              </div>

              <div className="info-field info-field-full">
                <label className="info-label">
                  <MapPin size={16} />
                  Address
                </label>
                {isEditing ? (
                  <textarea className="info-input info-textarea" value={adminData.address} rows={2} />
                ) : (
                  <div className="info-value">{adminData.address}</div>
                )}
              </div>
            </div>
          </div>

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
                  <input type="password" className="info-input" placeholder="Enter current password" />
                </div>

                <div className="info-field">
                  <label className="info-label">New Password</label>
                  <input type="password" className="info-input" placeholder="Enter new password (min 8 characters)" />
                </div>

                <div className="info-field">
                  <label className="info-label">Confirm New Password</label>
                  <input type="password" className="info-input" placeholder="Confirm new password" />
                </div>

                <div className="password-actions">
                  <button className="btn-cancel" onClick={() => setIsChangingPassword(false)}>
                    Cancel
                  </button>
                  <button className="btn-save">
                    Update Password
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProfilePage;

