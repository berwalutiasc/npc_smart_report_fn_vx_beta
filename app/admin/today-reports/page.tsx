/**
 * ADMIN TODAY'S REPORTS PAGE
 * 
 * This page shows all reports submitted today.
 * 
 * LOCATION: /admin/today-reports
 * 
 * FEATURES:
 * - List of all today's reports
 * - Filter by status, class, representative
 * - Search functionality
 * - View, approve, reject actions
 * - Real-time updates
 */

"use client";

import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { 
  FileText, 
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Eye,
  Clock,
  User,
  GraduationCap,
  Calendar
} from 'lucide-react';
import './today-reports.css';

// TYPES
interface Report {
  id: number;
  title: string;
  representative: string;
  class: string;
  status: 'pending' | 'approved' | 'rejected';
  time: string;
  itemsChecked: number;
  totalItems: number;
  flaggedItems: number;
}

// MOCK DATA
const mockReports: Report[] = [
  { id: 1, title: 'Safety Inspection - Room A101', representative: 'John Doe', class: 'Computer Science', status: 'pending', time: '10:30 AM', itemsChecked: 10, totalItems: 10, flaggedItems: 2 },
  { id: 2, title: 'Facility Check - Engineering Lab', representative: 'Jane Smith', class: 'Engineering', status: 'approved', time: '09:15 AM', itemsChecked: 10, totalItems: 10, flaggedItems: 0 },
  { id: 3, title: 'Equipment Inspection - Chemistry Lab', representative: 'Mike Johnson', class: 'Chemistry', status: 'pending', time: '11:45 AM', itemsChecked: 8, totalItems: 10, flaggedItems: 1 },
  { id: 4, title: 'Fire Safety Check - Building B', representative: 'Sarah Williams', class: 'Physics', status: 'approved', time: '08:30 AM', itemsChecked: 10, totalItems: 10, flaggedItems: 0 },
  { id: 5, title: 'Monthly Safety Review - Library', representative: 'Tom Brown', class: 'Library', status: 'pending', time: '12:00 PM', itemsChecked: 10, totalItems: 10, flaggedItems: 3 },
];

const TodayReportsPage = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setReports(mockReports);
      setFilteredReports(mockReports);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Filter reports
  useEffect(() => {
    let filtered = reports;

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(r => r.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(r =>
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.representative.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.class.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredReports(filtered);
  }, [searchTerm, statusFilter, reports]);

  // Handle approve
  const handleApprove = (id: number) => {
    setReports(reports.map(r => r.id === id ? { ...r, status: 'approved' as const } : r));
  };

  // Handle reject
  const handleReject = (id: number) => {
    setReports(reports.map(r => r.id === id ? { ...r, status: 'rejected' as const } : r));
  };

  // Get stats
  const stats = {
    total: reports.length,
    pending: reports.filter(r => r.status === 'pending').length,
    approved: reports.filter(r => r.status === 'approved').length,
    flagged: reports.reduce((sum, r) => sum + r.flaggedItems, 0)
  };

  return (
    <AdminLayout>
      {/* PAGE HEADER */}
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1a202c', margin: 0 }}>
          Today's Reports
        </h1>
        <p style={{ color: '#718096', marginTop: '0.5rem', fontSize: '0.95rem' }}>
          All reports submitted today - {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* STATISTICS */}
      <div className="stats-row">
        <div className="stat-box fade-in">
          <div className="stat-box-icon" style={{ backgroundColor: '#3b82f615', color: '#3b82f6' }}>
            <FileText size={24} />
          </div>
          <div className="stat-box-content">
            <div className="stat-box-value">{stats.total}</div>
            <div className="stat-box-label">Total Reports</div>
          </div>
        </div>

        <div className="stat-box fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="stat-box-icon" style={{ backgroundColor: '#f59e0b15', color: '#f59e0b' }}>
            <Clock size={24} />
          </div>
          <div className="stat-box-content">
            <div className="stat-box-value">{stats.pending}</div>
            <div className="stat-box-label">Pending Review</div>
          </div>
        </div>

        <div className="stat-box fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="stat-box-icon" style={{ backgroundColor: '#10b98115', color: '#10b981' }}>
            <CheckCircle size={24} />
          </div>
          <div className="stat-box-content">
            <div className="stat-box-value">{stats.approved}</div>
            <div className="stat-box-label">Approved</div>
          </div>
        </div>

        <div className="stat-box fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="stat-box-icon" style={{ backgroundColor: '#ef444415', color: '#ef4444' }}>
            <XCircle size={24} />
          </div>
          <div className="stat-box-content">
            <div className="stat-box-value">{stats.flagged}</div>
            <div className="stat-box-label">Flagged Items</div>
          </div>
        </div>
      </div>

      {/* FILTERS AND SEARCH */}
      <div className="filters-section fade-in" style={{ animationDelay: '0.4s' }}>
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search reports, representatives, or classes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-buttons">
          <Filter size={18} />
          <button
            className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${statusFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setStatusFilter('pending')}
          >
            Pending
          </button>
          <button
            className={`filter-btn ${statusFilter === 'approved' ? 'active' : ''}`}
            onClick={() => setStatusFilter('approved')}
          >
            Approved
          </button>
          <button
            className={`filter-btn ${statusFilter === 'rejected' ? 'active' : ''}`}
            onClick={() => setStatusFilter('rejected')}
          >
            Rejected
          </button>
        </div>
      </div>

      {/* REPORTS LIST */}
      <div className="reports-list">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading today's reports...</p>
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="empty-state fade-in">
            <FileText size={64} />
            <h3>No reports found</h3>
            <p>No reports match your current filters</p>
          </div>
        ) : (
          filteredReports.map((report, index) => (
            <div key={report.id} className="report-card slide-in-up" style={{ animationDelay: `${0.5 + index * 0.05}s` }}>
              <div className="report-card-header">
                <div className="report-card-title-section">
                  <h3 className="report-card-title">{report.title}</h3>
                  <div className="report-card-meta">
                    <span><User size={14} /> {report.representative}</span>
                    <span><GraduationCap size={14} /> {report.class}</span>
                    <span><Clock size={14} /> {report.time}</span>
                  </div>
                </div>
                <div className={`report-status status-${report.status}`}>
                  {report.status}
                </div>
              </div>

              <div className="report-card-body">
                <div className="report-progress">
                  <div className="progress-info">
                    <span>Completion: {report.itemsChecked}/{report.totalItems} items</span>
                    {report.flaggedItems > 0 && (
                      <span className="flagged-badge">{report.flaggedItems} flagged</span>
                    )}
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${(report.itemsChecked / report.totalItems) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="report-actions">
                  <button className="btn-view">
                    <Eye size={16} />
                    View Details
                  </button>
                  {report.status === 'pending' && (
                    <>
                      <button className="btn-approve" onClick={() => handleApprove(report.id)}>
                        <CheckCircle size={16} />
                        Approve
                      </button>
                      <button className="btn-reject" onClick={() => handleReject(report.id)}>
                        <XCircle size={16} />
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
};

export default TodayReportsPage;

