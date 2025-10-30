/**
 * ADMIN ALL REPORTS PAGE
 * 
 * This page shows all reports from all time periods.
 * 
 * LOCATION: /admin/all-reports
 * 
 * FEATURES:
 * - Complete list of all reports
 * - Advanced filtering (date range, status, class, representative)
 * - Sorting options
 * - Pagination
 * - Export functionality
 * - Batch actions
 */

"use client";

import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { 
  FileText, 
  Search,
  Filter,
  Download,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle,
  XCircle,
  User,
  GraduationCap,
  Clock
} from 'lucide-react';
import '../today-reports/today-reports.css';

// Use same Report interface and styling as today-reports

const AllReportsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const itemsPerPage = 10;

  // Mock data (expanded)
  const allReports = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `Safety Report #${i + 1}`,
    representative: `Representative ${i % 10 + 1}`,
    class: ['Computer Science', 'Engineering', 'Chemistry', 'Physics'][i % 4],
    status: (['pending', 'approved', 'rejected'] as const)[i % 3],
    time: `${8 + (i % 12)}:${(i % 4) * 15} ${i % 2 === 0 ? 'AM' : 'PM'}`,
    date: new Date(2024, 9, 30 - (i % 30)).toLocaleDateString(),
    itemsChecked: 10,
    totalItems: 10,
    flaggedItems: i % 5 === 0 ? 2 : 0
  }));

  const filteredReports = allReports.filter(r => {
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    if (searchTerm && !r.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !r.representative.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <AdminLayout>
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1a202c', margin: 0 }}>
          All Reports
        </h1>
        <p style={{ color: '#718096', marginTop: '0.5rem', fontSize: '0.95rem' }}>
          Complete archive of all inspection reports
        </p>
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-box fade-in">
          <div className="stat-box-icon" style={{ backgroundColor: '#3b82f615', color: '#3b82f6' }}>
            <FileText size={24} />
          </div>
          <div className="stat-box-content">
            <div className="stat-box-value">{allReports.length}</div>
            <div className="stat-box-label">Total Reports</div>
          </div>
        </div>

        <div className="stat-box fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="stat-box-icon" style={{ backgroundColor: '#f59e0b15', color: '#f59e0b' }}>
            <Clock size={24} />
          </div>
          <div className="stat-box-content">
            <div className="stat-box-value">{allReports.filter(r => r.status === 'pending').length}</div>
            <div className="stat-box-label">Pending</div>
          </div>
        </div>

        <div className="stat-box fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="stat-box-icon" style={{ backgroundColor: '#10b98115', color: '#10b981' }}>
            <CheckCircle size={24} />
          </div>
          <div className="stat-box-content">
            <div className="stat-box-value">{allReports.filter(r => r.status === 'approved').length}</div>
            <div className="stat-box-label">Approved</div>
          </div>
        </div>

        <div className="stat-box fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="stat-box-icon" style={{ backgroundColor: '#ef444415', color: '#ef4444' }}>
            <XCircle size={24} />
          </div>
          <div className="stat-box-content">
            <div className="stat-box-value">{allReports.filter(r => r.status === 'rejected').length}</div>
            <div className="stat-box-label">Rejected</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section fade-in" style={{ animationDelay: '0.4s' }}>
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search all reports..."
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

        <button className="btn-export" style={{ marginLeft: 'auto' }}>
          <Download size={18} />
          Export
        </button>
      </div>

      {/* Reports List */}
      <div className="reports-list">
        {paginatedReports.map((report, index) => (
          <div key={report.id} className="report-card slide-in-up" style={{ animationDelay: `${0.5 + index * 0.05}s` }}>
            <div className="report-card-header">
              <div className="report-card-title-section">
                <h3 className="report-card-title">{report.title}</h3>
                <div className="report-card-meta">
                  <span><User size={14} /> {report.representative}</span>
                  <span><GraduationCap size={14} /> {report.class}</span>
                  <span><Calendar size={14} /> {report.date}</span>
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
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination fade-in" style={{ animationDelay: '1s' }}>
        <button
          className="pagination-btn"
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={20} />
          Previous
        </button>

        <div className="pagination-info">
          Page {currentPage} of {totalPages}
        </div>

        <button
          className="pagination-btn"
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight size={20} />
        </button>
      </div>
    </AdminLayout>
  );
};

export default AllReportsPage;

