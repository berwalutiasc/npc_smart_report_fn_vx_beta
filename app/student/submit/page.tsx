/**
 * SUBMIT REPORT PAGE
 * 
 * This page allows students to submit inspection reports.
 * 
 * LOCATION: /student/submit
 * 
 * FEATURES:
 * - Form with all inspection items
 * - Mark items as Good, Bad, or Flagged
 * - Add comments to each item
 * - Mark All Good button
 * - Clear Selection button
 * - Submit Report button
 * - Quick tips sidebar
 * - Statistics display
 */

"use client";

import React, { useState, useEffect } from 'react';
import StudentLayout from '../components/StudentLayout';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Send,
  RotateCcw,
  Lightbulb,
  TrendingUp,
  Info
} from 'lucide-react';
import './submit.css';

// TYPES
interface InspectionItem {
  id: number;
  name: string;
  description: string;
  status: 'good' | 'bad' | 'flagged' | 'pending';
  comment: string;
}

// INSPECTION ITEMS TEMPLATE
const inspectionItemsTemplate: InspectionItem[] = [
  {
    id: 1,
    name: 'Fire Extinguisher',
    description: 'Check if fire extinguisher is accessible and not expired',
    status: 'pending',
    comment: ''
  },
  {
    id: 2,
    name: 'Emergency Exit Signs',
    description: 'Verify all emergency exit signs are illuminated',
    status: 'pending',
    comment: ''
  },
  {
    id: 3,
    name: 'Window Glass',
    description: 'Inspect all windows for cracks or damage',
    status: 'pending',
    comment: ''
  },
  {
    id: 4,
    name: 'Floor Condition',
    description: 'Check for spills, cracks, or trip hazards',
    status: 'pending',
    comment: ''
  },
  {
    id: 5,
    name: 'Electrical Outlets',
    description: 'Ensure all outlets are functioning and properly covered',
    status: 'pending',
    comment: ''
  },
  {
    id: 6,
    name: 'First Aid Kit',
    description: 'Verify first aid kit is stocked and accessible',
    status: 'pending',
    comment: ''
  },
  {
    id: 7,
    name: 'Chemical Storage',
    description: 'Check proper labeling and storage of chemicals',
    status: 'pending',
    comment: ''
  },
  {
    id: 8,
    name: 'Ventilation System',
    description: 'Ensure ventilation is working properly',
    status: 'pending',
    comment: ''
  },
  {
    id: 9,
    name: 'Safety Equipment',
    description: 'Check availability of safety goggles, gloves, etc.',
    status: 'pending',
    comment: ''
  },
  {
    id: 10,
    name: 'Lighting',
    description: 'Verify all lights are functioning',
    status: 'pending',
    comment: ''
  }
];

const SubmitPage = () => {
  const [items, setItems] = useState<InspectionItem[]>(inspectionItemsTemplate);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Calculate statistics
  const stats = items.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Handle status change
  const handleStatusChange = (itemId: number, status: 'good' | 'bad' | 'flagged') => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, status } : item
    ));
  };

  // Handle comment change
  const handleCommentChange = (itemId: number, comment: string) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, comment } : item
    ));
  };

  // Mark all as good
  const handleMarkAllGood = () => {
    setItems(items.map(item => ({ ...item, status: 'good' })));
  };

  // Clear all selections
  const handleClearSelection = () => {
    setItems(items.map(item => ({ ...item, status: 'pending', comment: '' })));
  };

  // Submit report
  const handleSubmit = async () => {
    // Check if all items are marked
    const hasUnmarked = items.some(item => item.status === 'pending');
    if (hasUnmarked) {
      alert('Please mark all items before submitting!');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccess(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setItems(inspectionItemsTemplate);
    }, 3000);
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
        return null;
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
          Submit Report
        </h1>
        <p style={{ 
          color: '#718096', 
          marginTop: '0.5rem',
          fontSize: '0.95rem' 
        }}>
          Complete the inspection checklist and submit your report
        </p>
      </div>

      {/* SUCCESS MESSAGE */}
      {showSuccess && (
        <div className="success-banner slide-down">
          <CheckCircle size={24} />
          <div>
            <h4>Report Submitted Successfully!</h4>
            <p>Your inspection report has been submitted for review</p>
          </div>
        </div>
      )}

      <div className="submit-container">
        {/* LEFT COLUMN - FORM */}
        <div className="submit-left">
          {/* ACTION BUTTONS */}
          <div className="action-buttons fade-in">
            <button className="btn-mark-all" onClick={handleMarkAllGood}>
              <CheckCircle size={18} />
              Mark All Good
            </button>
            <button className="btn-clear" onClick={handleClearSelection}>
              <RotateCcw size={18} />
              Clear Selection
            </button>
          </div>

          {/* INSPECTION ITEMS FORM */}
          <div className="inspection-form">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="form-item slide-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="form-item-header">
                  <div className="form-item-title">
                    <span className="item-number">{item.id}</span>
                    <div>
                      <h4>{item.name}</h4>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </div>

                <div className="form-item-body">
                  {/* STATUS BUTTONS */}
                  <div className="status-buttons">
                    <button
                      className={`status-btn good ${item.status === 'good' ? 'active' : ''}`}
                      onClick={() => handleStatusChange(item.id, 'good')}
                    >
                      <CheckCircle size={18} />
                      Good
                    </button>
                    <button
                      className={`status-btn bad ${item.status === 'bad' ? 'active' : ''}`}
                      onClick={() => handleStatusChange(item.id, 'bad')}
                    >
                      <XCircle size={18} />
                      Bad
                    </button>
                    <button
                      className={`status-btn flagged ${item.status === 'flagged' ? 'active' : ''}`}
                      onClick={() => handleStatusChange(item.id, 'flagged')}
                    >
                      <AlertTriangle size={18} />
                      Flagged
                    </button>
                  </div>

                  {/* COMMENT FIELD */}
                  <div className="comment-field">
                    <label>Comment / Notes {item.status !== 'good' && <span className="required">*</span>}</label>
                    <textarea
                      placeholder="Add your observations or notes here..."
                      value={item.comment}
                      onChange={(e) => handleCommentChange(item.id, e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            className="btn-submit-report fade-in"
            style={{ animationDelay: '0.6s' }}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            <Send size={20} />
            {isSubmitting ? 'Submitting Report...' : 'Submit Report'}
          </button>
        </div>

        {/* RIGHT COLUMN - TIPS & STATS */}
        <div className="submit-right">
          {/* QUICK TIPS */}
          <div className="tips-card fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="tips-header">
              <Lightbulb size={20} />
              <h3>Quick Tips</h3>
            </div>
            <div className="tips-body">
              <div className="tip-item">
                <div className="tip-icon good">
                  <CheckCircle size={18} />
                </div>
                <div className="tip-content">
                  <h4>Good</h4>
                  <p>Item is in excellent condition, functioning properly, and meets all safety standards.</p>
                </div>
              </div>

              <div className="tip-item">
                <div className="tip-icon bad">
                  <XCircle size={18} />
                </div>
                <div className="tip-content">
                  <h4>Bad</h4>
                  <p>Item is broken, missing, or poses a safety hazard. Requires immediate attention.</p>
                </div>
              </div>

              <div className="tip-item">
                <div className="tip-icon flagged">
                  <AlertTriangle size={18} />
                </div>
                <div className="tip-content">
                  <h4>Flagged</h4>
                  <p>Item needs attention or minor repairs. Not critical but should be addressed soon.</p>
                </div>
              </div>

              <div className="tip-note">
                <Info size={16} />
                <p>Always add comments for Bad and Flagged items to provide context.</p>
              </div>
            </div>
          </div>

          {/* STATISTICS */}
          <div className="stats-card fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="stats-header">
              <TrendingUp size={20} />
              <h3>Submission Stats</h3>
            </div>
            <div className="stats-body">
              <div className="stat-item good">
                <CheckCircle size={20} />
                <div className="stat-info">
                  <div className="stat-value">{stats.good || 0}</div>
                  <div className="stat-label">Good Items</div>
                </div>
              </div>

              <div className="stat-item bad">
                <XCircle size={20} />
                <div className="stat-info">
                  <div className="stat-value">{stats.bad || 0}</div>
                  <div className="stat-label">Bad Items</div>
                </div>
              </div>

              <div className="stat-item flagged">
                <AlertTriangle size={20} />
                <div className="stat-info">
                  <div className="stat-value">{stats.flagged || 0}</div>
                  <div className="stat-label">Flagged Items</div>
                </div>
              </div>

              <div className="stat-item pending">
                <div className="pending-icon">—</div>
                <div className="stat-info">
                  <div className="stat-value">{stats.pending || 0}</div>
                  <div className="stat-label">Pending</div>
                </div>
              </div>

              <div className="progress-bar">
                <div className="progress-label">
                  <span>Completion Progress</span>
                  <span className="progress-percentage">
                    {Math.round(((10 - (stats.pending || 0)) / 10) * 100)}%
                  </span>
                </div>
                <div className="progress-track">
                  <div 
                    className="progress-fill"
                    style={{ width: `${((10 - (stats.pending || 0)) / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default SubmitPage;

