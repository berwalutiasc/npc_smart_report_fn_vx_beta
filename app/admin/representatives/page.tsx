/**
 * ADMIN REPRESENTATIVES PAGE
 * 
 * This page manages all student representatives.
 * 
 * LOCATION: /admin/representatives
 * 
 * FEATURES:
 * - List of all representatives
 * - View representative details and performance
 * - Filter by class/department
 * - Search functionality
 * - Add/Edit/Remove representatives
 */

"use client";

import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { 
  Users,
  Search,
  Filter,
  UserPlus,
  Mail,
  Phone,
  GraduationCap,
  TrendingUp,
  Eye,
  Edit2,
  Trash2
} from 'lucide-react';
import './representatives.css';

interface Representative {
  id: number;
  name: string;
  email: string;
  phone: string;
  class: string;
  department: string;
  reportsSubmitted: number;
  avgCompletionRate: number;
  status: 'active' | 'inactive';
}

const RepresentativesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');

  const representatives: Representative[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@edu.com', phone: '+1 555-0101', class: 'CS Year 3', department: 'Computer Science', reportsSubmitted: 24, avgCompletionRate: 98, status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@edu.com', phone: '+1 555-0102', class: 'ENG Year 2', department: 'Engineering', reportsSubmitted: 22, avgCompletionRate: 95, status: 'active' },
    { id: 3, name: 'Mike Johnson', email: 'mike.j@edu.com', phone: '+1 555-0103', class: 'CHEM Year 4', department: 'Chemistry', reportsSubmitted: 20, avgCompletionRate: 92, status: 'active' },
    { id: 4, name: 'Sarah Williams', email: 'sarah.w@edu.com', phone: '+1 555-0104', class: 'PHYS Year 3', department: 'Physics', reportsSubmitted: 19, avgCompletionRate: 96, status: 'active' },
    { id: 5, name: 'Tom Brown', email: 'tom.b@edu.com', phone: '+1 555-0105', class: 'CS Year 4', department: 'Computer Science', reportsSubmitted: 18, avgCompletionRate: 94, status: 'active' },
  ];

  const filteredReps = representatives.filter(rep => {
    if (filterDepartment !== 'all' && rep.department !== filterDepartment) return false;
    if (searchTerm && !rep.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !rep.email.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const departments = ['all', ...Array.from(new Set(representatives.map(r => r.department)))];

  return (
    <AdminLayout>
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1a202c', margin: 0 }}>
            Representatives
          </h1>
          <p style={{ color: '#718096', marginTop: '0.5rem', fontSize: '0.95rem' }}>
            Manage student representatives and monitor their performance
          </p>
        </div>
        <button className="btn-add-rep">
          <UserPlus size={18} />
          Add Representative
        </button>
      </div>

      {/* Stats */}
      <div className="stats-row" style={{ marginBottom: '2rem' }}>
        <div className="stat-box fade-in">
          <div className="stat-box-icon" style={{ backgroundColor: '#3b82f615', color: '#3b82f6' }}>
            <Users size={24} />
          </div>
          <div className="stat-box-content">
            <div className="stat-box-value">{representatives.length}</div>
            <div className="stat-box-label">Total Representatives</div>
          </div>
        </div>

        <div className="stat-box fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="stat-box-icon" style={{ backgroundColor: '#10b98115', color: '#10b981' }}>
            <TrendingUp size={24} />
          </div>
          <div className="stat-box-content">
            <div className="stat-box-value">{representatives.filter(r => r.status === 'active').length}</div>
            <div className="stat-box-label">Active</div>
          </div>
        </div>

        <div className="stat-box fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="stat-box-icon" style={{ backgroundColor: '#8b5cf615', color: '#8b5cf6' }}>
            <GraduationCap size={24} />
          </div>
          <div className="stat-box-content">
            <div className="stat-box-value">{departments.length - 1}</div>
            <div className="stat-box-label">Departments</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section fade-in" style={{ animationDelay: '0.3s', marginBottom: '2rem' }}>
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-buttons">
          <Filter size={18} />
          <select
            className="department-select"
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>
                {dept === 'all' ? 'All Departments' : dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Representatives Grid */}
      <div className="representatives-grid">
        {filteredReps.map((rep, index) => (
          <div key={rep.id} className="rep-card slide-in-up" style={{ animationDelay: `${0.4 + index * 0.05}s` }}>
            <div className="rep-card-header">
              <div className="rep-avatar">
                <Users size={32} />
              </div>
              <div className={`rep-status status-${rep.status}`}>
                {rep.status}
              </div>
            </div>

            <div className="rep-card-body">
              <h3 className="rep-name">{rep.name}</h3>
              <p className="rep-class">{rep.class}</p>
              <p className="rep-department">{rep.department}</p>

              <div className="rep-contact">
                <div className="contact-item">
                  <Mail size={14} />
                  <span>{rep.email}</span>
                </div>
                <div className="contact-item">
                  <Phone size={14} />
                  <span>{rep.phone}</span>
                </div>
              </div>

              <div className="rep-stats">
                <div className="rep-stat">
                  <div className="rep-stat-value">{rep.reportsSubmitted}</div>
                  <div className="rep-stat-label">Reports</div>
                </div>
                <div className="rep-stat">
                  <div className="rep-stat-value">{rep.avgCompletionRate}%</div>
                  <div className="rep-stat-label">Completion</div>
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

export default RepresentativesPage;

