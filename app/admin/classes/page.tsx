/**
 * ADMIN CLASSES PAGE
 * 
 * This page manages all classes/departments.
 * 
 * LOCATION: /admin/classes
 * 
 * FEATURES:
 * - List of all classes
 * - View class details and statistics
 * - Filter and search
 * - Add/Edit/Remove classes
 */

"use client";

import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { 
  GraduationCap,
  Search,
  Plus,
  Users,
  FileText,
  TrendingUp,
  Eye,
  Edit2,
  Trash2,
  MapPin
} from 'lucide-react';
import '../representatives/representatives.css';

interface Class {
  id: number;
  name: string;
  department: string;
  year: number;
  totalStudents: number;
  representatives: number;
  reportsThisWeek: number;
  room: string;
  status: 'active' | 'inactive';
}

const ClassesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const classes: Class[] = [
    { id: 1, name: 'Computer Science Year 3', department: 'Engineering', year: 3, totalStudents: 45, representatives: 3, reportsThisWeek: 12, room: 'Building A - Room 301', status: 'active' },
    { id: 2, name: 'Engineering Year 2', department: 'Engineering', year: 2, totalStudents: 52, representatives: 4, reportsThisWeek: 15, room: 'Building B - Room 205', status: 'active' },
    { id: 3, name: 'Chemistry Year 4', department: 'Science', year: 4, totalStudents: 38, representatives: 2, reportsThisWeek: 8, room: 'Building C - Lab 401', status: 'active' },
    { id: 4, name: 'Physics Year 3', department: 'Science', year: 3, totalStudents: 41, representatives: 3, reportsThisWeek: 11, room: 'Building C - Room 302', status: 'active' },
    { id: 5, name: 'Mathematics Year 2', department: 'Science', year: 2, totalStudents: 48, representatives: 3, reportsThisWeek: 10, room: 'Building A - Room 201', status: 'active' },
    { id: 6, name: 'Business Studies Year 1', department: 'Business', year: 1, totalStudents: 55, representatives: 4, reportsThisWeek: 14, room: 'Building D - Room 101', status: 'active' }
  ];

  const filteredClasses = classes.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalClasses: classes.length,
    totalStudents: classes.reduce((sum, cls) => sum + cls.totalStudents, 0),
    totalRepresentatives: classes.reduce((sum, cls) => sum + cls.representatives, 0),
    reportsThisWeek: classes.reduce((sum, cls) => sum + cls.reportsThisWeek, 0)
  };

  return (
    <AdminLayout>
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1a202c', margin: 0 }}>
            Classes
          </h1>
          <p style={{ color: '#718096', marginTop: '0.5rem', fontSize: '0.95rem' }}>
            Manage classes, departments, and student groups
          </p>
        </div>
        <button className="btn-add-rep">
          <Plus size={18} />
          Add Class
        </button>
      </div>

      {/* Stats */}
      <div className="stats-row" style={{ marginBottom: '2rem' }}>
        <div className="stat-box fade-in">
          <div className="stat-box-icon" style={{ backgroundColor: '#3b82f615', color: '#3b82f6' }}>
            <GraduationCap size={24} />
          </div>
          <div className="stat-box-content">
            <div className="stat-box-value">{stats.totalClasses}</div>
            <div className="stat-box-label">Total Classes</div>
          </div>
        </div>

        <div className="stat-box fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="stat-box-icon" style={{ backgroundColor: '#10b98115', color: '#10b981' }}>
            <Users size={24} />
          </div>
          <div className="stat-box-content">
            <div className="stat-box-value">{stats.totalStudents}</div>
            <div className="stat-box-label">Total Students</div>
          </div>
        </div>

        <div className="stat-box fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="stat-box-icon" style={{ backgroundColor: '#f59e0b15', color: '#f59e0b' }}>
            <Users size={24} />
          </div>
          <div className="stat-box-content">
            <div className="stat-box-value">{stats.totalRepresentatives}</div>
            <div className="stat-box-label">Representatives</div>
          </div>
        </div>

        <div className="stat-box fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="stat-box-icon" style={{ backgroundColor: '#8b5cf615', color: '#8b5cf6' }}>
            <FileText size={24} />
          </div>
          <div className="stat-box-content">
            <div className="stat-box-value">{stats.reportsThisWeek}</div>
            <div className="stat-box-label">Reports This Week</div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="filters-section fade-in" style={{ animationDelay: '0.4s', marginBottom: '2rem' }}>
        <div className="search-box" style={{ flex: 1, maxWidth: '100%' }}>
          <Search size={20} />
          <input
            type="text"
            placeholder="Search classes or departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Classes Grid */}
      <div className="representatives-grid">
        {filteredClasses.map((cls, index) => (
          <div key={cls.id} className="rep-card slide-in-up" style={{ animationDelay: `${0.5 + index * 0.05}s` }}>
            <div className="rep-card-header" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
              <div className="rep-avatar" style={{ color: '#f59e0b' }}>
                <GraduationCap size={32} />
              </div>
              <div className={`rep-status status-${cls.status}`}>
                {cls.status}
              </div>
            </div>

            <div className="rep-card-body">
              <h3 className="rep-name">{cls.name}</h3>
              <p className="rep-class">{cls.department}</p>
              <p className="rep-department">Year {cls.year}</p>

              <div className="rep-contact" style={{ marginTop: '1rem' }}>
                <div className="contact-item">
                  <MapPin size={14} />
                  <span>{cls.room}</span>
                </div>
              </div>

              <div className="rep-stats">
                <div className="rep-stat">
                  <div className="rep-stat-value">{cls.totalStudents}</div>
                  <div className="rep-stat-label">Students</div>
                </div>
                <div className="rep-stat">
                  <div className="rep-stat-value">{cls.representatives}</div>
                  <div className="rep-stat-label">Reps</div>
                </div>
              </div>

              <div className="rep-stats" style={{ marginTop: '0.5rem' }}>
                <div className="rep-stat" style={{ gridColumn: 'span 2' }}>
                  <div className="rep-stat-value">{cls.reportsThisWeek}</div>
                  <div className="rep-stat-label">Reports This Week</div>
                </div>
              </div>

              <div className="rep-actions">
                <button className="btn-rep-view">
                  <Eye size={16} />
                  View
                </button>
                <button className="btn-rep-edit">
                  <Edit2 size={16} />
                  Edit
                </button>
                <button className="btn-rep-delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default ClassesPage;

