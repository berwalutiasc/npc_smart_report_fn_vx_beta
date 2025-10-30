/**
 * STUDENT REPORT PAGE
 * 
 * This page allows students to view and manage their reports.
 * 
 * LOCATION: /student/report
 * 
 * FEATURES:
 * - Filter reports by time period (daily, weekly, monthly)
 * - View list of reports with status
 * - CS Approved and CP Approved status indicators
 * - View and Download buttons for each report
 * - Responsive design
 * - Loading animations
 */

"use client";

import React, { useState, useEffect } from 'react';
import StudentLayout from '../components/StudentLayout';
import { 
  Filter, 
  Download, 
  Eye, 
  CheckCircle, 
  XCircle,
  Clock,
  Search,
  Calendar,
  FileText
} from 'lucide-react';
import './report.css';

// TYPES
interface Report {
  id: number;
  name: string;
  submissionDate: string;
  csApproved: boolean;
  cpApproved: boolean;
  status: 'pending' | 'approved' | 'rejected';
}

type FilterType = 'all' | 'daily' | 'weekly' | 'monthly';

// MOCK DATA
const mockReports: Report[] = [
  {
    id: 1,
    name: 'Weekly Progress Report - Week 43',
    submissionDate: '2024-10-30',
    csApproved: true,
    cpApproved: true,
    status: 'approved'
  },
  {
    id: 2,
    name: 'Lab Safety Inspection Report',
    submissionDate: '2024-10-29',
    csApproved: true,
    cpApproved: false,
    status: 'pending'
  },
  {
    id: 3,
    name: 'Chemistry Lab Equipment Check',
    submissionDate: '2024-10-28',
    csApproved: true,
    cpApproved: true,
    status: 'approved'
  },
  {
    id: 4,
    name: 'Monthly Facility Report - October',
    submissionDate: '2024-10-25',
    csApproved: false,
    cpApproved: false,
    status: 'rejected'
  },
  {
    id: 5,
    name: 'Daily Inspection Report - Building A',
    submissionDate: '2024-10-24',
    csApproved: true,
    cpApproved: true,
    status: 'approved'
  },
  {
    id: 6,
    name: 'Weekly Safety Audit - Week 42',
    submissionDate: '2024-10-23',
    csApproved: true,
    cpApproved: false,
    status: 'pending'
  },
  {
    id: 7,
    name: 'Equipment Maintenance Report',
    submissionDate: '2024-10-22',
    csApproved: true,
    cpApproved: true,
    status: 'approved'
  },
  {
    id: 8,
    name: 'Daily Inspection Report - Building B',
    submissionDate: '2024-10-21',
    csApproved: false,
    cpApproved: true,
    status: 'pending'
  }
];

const ReportPage = () => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  // Simulate API call
  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1200));
      setReports(mockReports);
      setFilteredReports(mockReports);
      setLoading(false);
    };

    fetchReports();
  }, []);

  // Filter reports by time period
  useEffect(() => {
    let filtered = [...reports];

    // Apply time filter
    if (activeFilter !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      filtered = filtered.filter(report => {
        const reportDate = new Date(report.submissionDate);
        const diffTime = today.getTime() - reportDate.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        if (activeFilter === 'daily') return diffDays <= 1;
        if (activeFilter === 'weekly') return diffDays <= 7;
        if (activeFilter === 'monthly') return diffDays <= 30;
        return true;
      });
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(report =>
        report.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredReports(filtered);
  }, [activeFilter, searchQuery, reports]);

  // Handle view report
  const handleView = (reportId: number) => {
    console.log('Viewing report:', reportId);
    // Navigate to report detail page or open modal
  };

  // Handle download report
  const handleDownload = async (reportId: number) => {
    setDownloadingId(reportId);
    
    // Simulate download
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setDownloadingId(null);
    alert(`Report ${reportId} downloaded successfully!`);
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
          My Reports
        </h1>
        <p style={{ 
          color: '#718096', 
          marginTop: '0.5rem',
          fontSize: '0.95rem' 
        }}>
          View and manage your submitted reports
        </p>
      </div>

      {/* FILTERS AND SEARCH */}
      <div className="report-controls fade-in">
        <div className="filter-buttons">
          <button
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            <Filter size={16} />
            All Reports
          </button>
          <button
            className={`filter-btn ${activeFilter === 'daily' ? 'active' : ''}`}
            onClick={() => setActiveFilter('daily')}
          >
            <Calendar size={16} />
            Daily
          </button>
          <button
            className={`filter-btn ${activeFilter === 'weekly' ? 'active' : ''}`}
            onClick={() => setActiveFilter('weekly')}
          >
            <Calendar size={16} />
            Weekly
          </button>
          <button
            className={`filter-btn ${activeFilter === 'monthly' ? 'active' : ''}`}
            onClick={() => setActiveFilter('monthly')}
          >
            <Calendar size={16} />
            Monthly
          </button>
        </div>

        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* REPORTS LIST */}
      <div className="reports-container">
        {loading ? (
          // Loading skeletons
          <div className="reports-list">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="report-card skeleton-card">
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-badges"></div>
              </div>
            ))}
          </div>
        ) : filteredReports.length === 0 ? (
          // Empty state
          <div className="empty-state fade-in">
            <FileText size={64} strokeWidth={1.5} />
            <h3>No reports found</h3>
            <p>
              {searchQuery
                ? 'Try adjusting your search query'
                : 'No reports match the selected filter'}
            </p>
          </div>
        ) : (
          // Reports list
          <div className="reports-list">
            {filteredReports.map((report, index) => (
              <div
                key={report.id}
                className="report-card slide-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="report-card-header">
                  <div className="report-info">
                    <h3 className="report-name">{report.name}</h3>
                    <div className="report-meta">
                      <Calendar size={14} />
                      <span>Submitted: {new Date(report.submissionDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                  </div>
                  
                  <div className={`report-status status-${report.status}`}>
                    {report.status === 'approved' && <CheckCircle size={16} />}
                    {report.status === 'pending' && <Clock size={16} />}
                    {report.status === 'rejected' && <XCircle size={16} />}
                    {report.status}
                  </div>
                </div>

                <div className="report-card-body">
                  <div className="approval-badges">
                    <div className={`approval-badge ${report.csApproved ? 'approved' : 'pending'}`}>
                      {report.csApproved ? (
                        <CheckCircle size={16} />
                      ) : (
                        <Clock size={16} />
                      )}
                      <span>CS {report.csApproved ? 'Approved' : 'Pending'}</span>
                    </div>
                    
                    <div className={`approval-badge ${report.cpApproved ? 'approved' : 'pending'}`}>
                      {report.cpApproved ? (
                        <CheckCircle size={16} />
                      ) : (
                        <Clock size={16} />
                      )}
                      <span>CP {report.cpApproved ? 'Approved' : 'Pending'}</span>
                    </div>
                  </div>
                </div>

                <div className="report-card-actions">
                  <button
                    className="action-btn btn-view"
                    onClick={() => handleView(report.id)}
                  >
                    <Eye size={16} />
                    View
                  </button>
                  <button
                    className="action-btn btn-download"
                    onClick={() => handleDownload(report.id)}
                    disabled={downloadingId === report.id}
                  >
                    <Download size={16} />
                    {downloadingId === report.id ? 'Downloading...' : 'Download'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </StudentLayout>
  );
};

export default ReportPage;

