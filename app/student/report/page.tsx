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
  FileText,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import './report.css';

// TYPES
interface Report {
  id: string; // Changed from number to string to match UUID from database
  name: string;
  submissionDate: string;
  csApproved: boolean;
  cpApproved: boolean;
  status: 'pending' | 'approved' | 'rejected';
  class: string;
  generalComment?: string;
  itemEvaluated?: any;
}

type FilterType = 'all' | 'daily' | 'weekly' | 'monthly';

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalReports: number;
  hasNext: boolean;
  hasPrev: boolean;
}

const ReportPage = () => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<Report[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalReports: 0,
    hasNext: false,
    hasPrev: false
  });

  // Get current user ID - This will work with the actual API
  // In a real app, you'd get this from your auth context or session
  const getCurrentUserId = () => {
    // TODO: Replace with actual user ID from your authentication system
    // Example: return localStorage.getItem('userId');
    // Example: return userContext.userId;
    return 'current-user-id'; // This should be dynamic in production
  };

  // Fetch reports from API - This will work with the created API
  const fetchReports = async (filter: FilterType = activeFilter, search: string = searchQuery, page: number = 1) => {
    setLoading(true);
    
    try {
      const userId = getCurrentUserId();
      const params = new URLSearchParams({
        userId,
        filter,
        search,
        page: page.toString(),
        limit: '10'
      });

      // This will call the actual API endpoint we created
      const response = await fetch(`/api/reports/get-reports?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch reports');
      }
      
      const result = await response.json();

      if (result.success) {
        setReports(result.data.reports);
        setPagination(result.data.pagination);
      } else {
        console.error('Failed to fetch reports:', result.message);
        setReports([]);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      // Fallback to empty array if API fails
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial load - This will use the real API
  useEffect(() => {
    fetchReports();
  }, []);

  // Handle filter change - This will use the real API
  useEffect(() => {
    fetchReports(activeFilter, searchQuery, 1);
  }, [activeFilter]);

  // Handle search with debounce - This will use the real API
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchReports(activeFilter, searchQuery, 1);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Handle view report
  const handleView = (reportId: string) => {
    console.log('Viewing report:', reportId);
    // TODO: Navigate to report detail page or open modal
    // Example: router.push(`/student/report/${reportId}`);
    // Example: openModal(reportId);
  };

  // Handle download report
  const handleDownload = async (reportId: string) => {
    setDownloadingId(reportId);
    
    try {
      // TODO: Implement actual download logic with the API
      // This would call a separate download endpoint
      // const response = await fetch(`/api/reports/download/${reportId}`);
      // const blob = await response.blob();
      // ... download logic
      
      // Simulate download for now
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert(`Report ${reportId} downloaded successfully!`);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    } finally {
      setDownloadingId(null);
    }
  };

  // Handle pagination - This will use the real API
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchReports(activeFilter, searchQuery, newPage);
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
          My Reports
        </h1>
        <p style={{ 
          color: '#718096', 
          marginTop: '0.5rem',
          fontSize: '0.95rem' 
        }}>
          {/* This will show real count from API */}
          View and manage your submitted reports {pagination.totalReports > 0 && `(${pagination.totalReports} total)`}
        </p>
      </div>

      {/* FILTERS AND SEARCH - These will work with real API filtering */}
      <div className="report-controls fade-in">
        <div className="filter-buttons">
          <button
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
            disabled={loading}
          >
            <Filter size={16} />
            All Reports
          </button>
          <button
            className={`filter-btn ${activeFilter === 'daily' ? 'active' : ''}`}
            onClick={() => setActiveFilter('daily')}
            disabled={loading}
          >
            <Calendar size={16} />
            Daily
          </button>
          <button
            className={`filter-btn ${activeFilter === 'weekly' ? 'active' : ''}`}
            onClick={() => setActiveFilter('weekly')}
            disabled={loading}
          >
            <Calendar size={16} />
            Weekly
          </button>
          <button
            className={`filter-btn ${activeFilter === 'monthly' ? 'active' : ''}`}
            onClick={() => setActiveFilter('monthly')}
            disabled={loading}
          >
            <Calendar size={16} />
            Monthly
          </button>
        </div>

        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search reports by title or comment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            disabled={loading}
          />
        </div>
      </div>

      {/* REPORTS LIST - This will display real data from API */}
      <div className="reports-container">
        {loading ? (
          // Loading skeletons - shown while fetching from API
          <div className="reports-list">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="report-card skeleton-card">
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-badges"></div>
              </div>
            ))}
          </div>
        ) : reports.length === 0 ? (
          // Empty state - shown when no reports found
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
          // Reports list - populated with real data from API
          <>
            <div className="reports-list">
              {reports.map((report, index) => (
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
                        <span>
                          Submitted: {new Date(report.submissionDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                        {/* Class info from real data */}
                        {report.class && (
                          <span className="report-class">Class: {report.class}</span>
                        )}
                      </div>
                    </div>
                    
                    {/* Status from real API data */}
                    <div className={`report-status status-${report.status}`}>
                      {report.status === 'approved' && <CheckCircle size={16} />}
                      {report.status === 'pending' && <Clock size={16} />}
                      {report.status === 'rejected' && <XCircle size={16} />}
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </div>
                  </div>

                  <div className="report-card-body">
                    {/* Approval badges from real API data */}
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
                    
                    {/* General comment from real data */}
                    {report.generalComment && (
                      <p className="report-comment">
                        {report.generalComment.length > 150 
                          ? `${report.generalComment.substring(0, 150)}...` 
                          : report.generalComment}
                      </p>
                    )}
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

            {/* PAGINATION - This will work with real pagination from API */}
            {pagination.totalPages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-btn"
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={!pagination.hasPrev || loading}
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>
                
                <span className="pagination-info">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                
                <button
                  className="pagination-btn"
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={!pagination.hasNext || loading}
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </StudentLayout>
  );
};

export default ReportPage;