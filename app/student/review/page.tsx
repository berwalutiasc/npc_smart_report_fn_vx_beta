/**
 * STUDENT REVIEW PAGE
 * 
 * This page allows reviewing report items and providing feedback.
 * 
 * LOCATION: /student/review
 * 
 * FEATURES:
 * - View report details
 * - Inspect individual items (10 objects)
 * - Mark items as Good, Bad, or Flagged
 * - Add comments to each item
 * - Approve or Deny entire report
 * - Loading states and animations
 */

"use client";

import React, { useState, useEffect } from 'react';
import StudentLayout from '../components/StudentLayout';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  FileText
} from 'lucide-react';
import './review.css';

// TYPES
interface InspectionItem {
  id: number;
  name: string;
  description: string;
  status: 'good' | 'bad' | 'flagged' | 'pending';
  comment: string;
}

interface Report {
  id: number;
  name: string;
  submittedBy: string;
  submissionDate: string;
  items: InspectionItem[];
}

// MOCK DATA
const mockReport: Report = {
  id: 1,
  name: 'Weekly Lab Safety Inspection - Building A',
  submittedBy: 'John Doe',
  submissionDate: '2024-10-30',
  items: [
    {
      id: 1,
      name: 'Fire Extinguisher',
      description: 'Check if fire extinguisher is accessible and not expired',
      status: 'good',
      comment: 'All fire extinguishers are properly mounted and within expiration date'
    },
    {
      id: 2,
      name: 'Emergency Exit Signs',
      description: 'Verify all emergency exit signs are illuminated',
      status: 'good',
      comment: ''
    },
    {
      id: 3,
      name: 'Window Glass',
      description: 'Inspect all windows for cracks or damage',
      status: 'bad',
      comment: 'Broken window glass found in Lab Room 203'
    },
    {
      id: 4,
      name: 'Floor Condition',
      description: 'Check for spills, cracks, or trip hazards',
      status: 'flagged',
      comment: 'Minor crack near entrance - needs attention'
    },
    {
      id: 5,
      name: 'Electrical Outlets',
      description: 'Ensure all outlets are functioning and properly covered',
      status: 'good',
      comment: ''
    },
    {
      id: 6,
      name: 'First Aid Kit',
      description: 'Verify first aid kit is stocked and accessible',
      status: 'good',
      comment: 'Kit is fully stocked and easily accessible'
    },
    {
      id: 7,
      name: 'Chemical Storage',
      description: 'Check proper labeling and storage of chemicals',
      status: 'flagged',
      comment: 'Some containers need better labeling'
    },
    {
      id: 8,
      name: 'Ventilation System',
      description: 'Ensure ventilation is working properly',
      status: 'good',
      comment: ''
    },
    {
      id: 9,
      name: 'Safety Equipment',
      description: 'Check availability of safety goggles, gloves, etc.',
      status: 'bad',
      comment: 'Low stock on safety goggles - needs replenishment'
    },
    {
      id: 10,
      name: 'Lighting',
      description: 'Verify all lights are functioning',
      status: 'good',
      comment: 'All lighting fixtures operational'
    }
  ]
};

const ReviewPage = () => {
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<Report | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simulate API call
  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1200));
      setReport(mockReport);
      setLoading(false);
    };

    fetchReport();
  }, []);

  // Handle approve
  const handleApprove = async () => {
    if (!confirm('Are you sure you want to approve this report?')) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    alert('Report approved successfully!');
  };

  // Handle deny
  const handleDeny = async () => {
    if (!confirm('Are you sure you want to deny this report?')) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    alert('Report denied. Submitter will be notified.');
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle size={20} />;
      case 'bad':
        return <XCircle size={20} />;
      case 'flagged':
        return <AlertTriangle size={20} />;
      default:
        return <MessageSquare size={20} />;
    }
  };

  // Count statistics
  const getStats = () => {
    if (!report) return { good: 0, bad: 0, flagged: 0, pending: 0 };
    
    return report.items.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  };

  const stats = getStats();

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
          Report Review
        </h1>
        <p style={{ 
          color: '#718096', 
          marginTop: '0.5rem',
          fontSize: '0.95rem' 
        }}>
          Review and provide feedback on submitted reports
        </p>
      </div>

      {loading ? (
        // Loading skeleton
        <div className="review-skeleton">
          <div className="skeleton skeleton-header"></div>
          <div className="skeleton skeleton-stats"></div>
          {[1, 2, 3].map(i => (
            <div key={i} className="skeleton skeleton-item"></div>
          ))}
        </div>
      ) : report ? (
        <div className="review-container">
          {/* REPORT HEADER */}
          <div className="review-header fade-in">
            <div className="review-header-content">
              <div className="review-title-section">
                <FileText size={24} />
                <div>
                  <h2 className="review-title">{report.name}</h2>
                  <p className="review-meta">
                    Submitted by <strong>{report.submittedBy}</strong> on{' '}
                    {new Date(report.submissionDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* STATISTICS */}
            <div className="review-stats">
              <div className="stat-box good">
                <CheckCircle size={20} />
                <div>
                  <div className="stat-value">{stats.good || 0}</div>
                  <div className="stat-label">Good</div>
                </div>
              </div>
              <div className="stat-box bad">
                <XCircle size={20} />
                <div>
                  <div className="stat-value">{stats.bad || 0}</div>
                  <div className="stat-label">Bad</div>
                </div>
              </div>
              <div className="stat-box flagged">
                <AlertTriangle size={20} />
                <div>
                  <div className="stat-value">{stats.flagged || 0}</div>
                  <div className="stat-label">Flagged</div>
                </div>
              </div>
            </div>
          </div>

          {/* INSPECTION ITEMS */}
          <div className="inspection-items">
            {report.items.map((item, index) => (
              <div
                key={item.id}
                className="inspection-item slide-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="item-content">
                  <div className="item-title-section">
                    <div className={`item-status status-${item.status}`}>
                      {getStatusIcon(item.status)}
                    </div>
                    <div className="item-info">
                      <h4 className="item-name">{item.name}</h4>
                      <p className="item-description">{item.description}</p>
                      {item.comment && (
                        <p className="item-comment">{item.comment}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ACTION BUTTONS */}
          <div className="review-actions fade-in" style={{ animationDelay: '0.5s' }}>
            <button
              className="action-btn btn-deny"
              onClick={handleDeny}
              disabled={isSubmitting}
            >
              <ThumbsDown size={20} />
              {isSubmitting ? 'Processing...' : 'Deny Report'}
            </button>
            <button
              className="action-btn btn-approve"
              onClick={handleApprove}
              disabled={isSubmitting}
            >
              <ThumbsUp size={20} />
              {isSubmitting ? 'Processing...' : 'Approve Report'}
            </button>
          </div>
        </div>
      ) : (
        // No report state
        <div className="empty-state fade-in">
          <FileText size={64} strokeWidth={1.5} />
          <h3>No Report to Review</h3>
          <p>There are no reports available for review at this time.</p>
        </div>
      )}
    </StudentLayout>
  );
};

export default ReviewPage;

