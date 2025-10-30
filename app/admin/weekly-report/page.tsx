/**
 * ADMIN WEEKLY REPORT PAGE
 * 
 * This page shows a summary and analytics of the week's reports.
 * 
 * LOCATION: /admin/weekly-report
 * 
 * FEATURES:
 * - Weekly statistics and trends
 * - Day-by-day breakdown (clickable to view details)
 * - Modal popup showing day details
 * - Top performers
 * - Export weekly summary
 */

"use client";

import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { 
  TrendingUp,
  FileText,
  Users,
  AlertTriangle,
  CheckCircle,
  Award,
  Download,
  Calendar,
  X,
  ThumbsUp,
  ThumbsDown,
  Flag
} from 'lucide-react';
import '../dashboard/dashboard.css';
import './weekly-report.css';

interface DayDetail {
  good: { count: number; items: { name: string; class: string }[] };
  bad: { count: number; items: { name: string; class: string }[] };
  flagged: { count: number; items: { name: string; class: string }[] };
}

const WeeklyReportPage = () => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const weekStats = {
    totalReports: 127,
    totalRepresentatives: 45,
    flaggedItems: 23,
    resolvedIssues: 18,
    trend: 12.5
  };

  const dailyBreakdown = [
    { day: 'Monday', reports: 18, flagged: 3, approved: 15 },
    { day: 'Tuesday', reports: 22, flagged: 5, approved: 17 },
    { day: 'Wednesday', reports: 19, flagged: 4, approved: 15 },
    { day: 'Thursday', reports: 25, flagged: 6, approved: 19 },
    { day: 'Friday', reports: 21, flagged: 3, approved: 18 },
    { day: 'Saturday', reports: 12, flagged: 1, approved: 11 },
    { day: 'Sunday', reports: 10, flagged: 1, approved: 9 }
  ];

  // Mock detailed data for each day
  const dayDetails: Record<string, DayDetail> = {
    'Monday': {
      good: {
        count: 56,
        items: [
          { name: 'John Doe', class: 'Computer Science Year 3' },
          { name: 'Jane Smith', class: 'Engineering Year 2' },
          { name: 'Mike Johnson', class: 'Chemistry Year 4' },
          { name: 'Sarah Williams', class: 'Physics Year 3' },
          { name: 'Tom Brown', class: 'Computer Science Year 4' }
        ]
      },
      bad: {
        count: 17,
        items: [
          { name: 'Alex Davis', class: 'Engineering Year 1' },
          { name: 'Emma Wilson', class: 'Chemistry Year 2' },
          { name: 'Chris Taylor', class: 'Physics Year 1' }
        ]
      },
      flagged: {
        count: 8,
        items: [
          { name: 'Oliver Martinez', class: 'Computer Science Year 2' },
          { name: 'Sophia Anderson', class: 'Engineering Year 3' }
        ]
      }
    },
    'Tuesday': {
      good: {
        count: 62,
        items: [
          { name: 'Liam Garcia', class: 'Computer Science Year 3' },
          { name: 'Ava Rodriguez', class: 'Engineering Year 2' },
          { name: 'Noah Lee', class: 'Chemistry Year 4' },
          { name: 'Isabella Walker', class: 'Physics Year 3' }
        ]
      },
      bad: {
        count: 20,
        items: [
          { name: 'Ethan Hall', class: 'Engineering Year 1' },
          { name: 'Mia Allen', class: 'Chemistry Year 2' },
          { name: 'James Young', class: 'Physics Year 1' }
        ]
      },
      flagged: {
        count: 10,
        items: [
          { name: 'Charlotte King', class: 'Computer Science Year 2' },
          { name: 'Benjamin Wright', class: 'Engineering Year 3' },
          { name: 'Amelia Scott', class: 'Chemistry Year 1' }
        ]
      }
    },
    'Wednesday': {
      good: {
        count: 54,
        items: [
          { name: 'Lucas Green', class: 'Computer Science Year 3' },
          { name: 'Harper Adams', class: 'Engineering Year 2' },
          { name: 'Mason Baker', class: 'Chemistry Year 4' }
        ]
      },
      bad: {
        count: 15,
        items: [
          { name: 'Evelyn Nelson', class: 'Engineering Year 1' },
          { name: 'Logan Carter', class: 'Chemistry Year 2' }
        ]
      },
      flagged: {
        count: 7,
        items: [
          { name: 'Ella Mitchell', class: 'Computer Science Year 2' },
          { name: 'Jackson Perez', class: 'Engineering Year 3' }
        ]
      }
    },
    'Thursday': {
      good: {
        count: 68,
        items: [
          { name: 'Avery Roberts', class: 'Computer Science Year 3' },
          { name: 'Sebastian Turner', class: 'Engineering Year 2' },
          { name: 'Scarlett Phillips', class: 'Chemistry Year 4' }
        ]
      },
      bad: {
        count: 22,
        items: [
          { name: 'Jack Campbell', class: 'Engineering Year 1' },
          { name: 'Sofia Parker', class: 'Chemistry Year 2' },
          { name: 'Henry Evans', class: 'Physics Year 1' }
        ]
      },
      flagged: {
        count: 12,
        items: [
          { name: 'Luna Edwards', class: 'Computer Science Year 2' },
          { name: 'Owen Collins', class: 'Engineering Year 3' }
        ]
      }
    },
    'Friday': {
      good: {
        count: 60,
        items: [
          { name: 'Grace Stewart', class: 'Computer Science Year 3' },
          { name: 'Wyatt Sanchez', class: 'Engineering Year 2' }
        ]
      },
      bad: {
        count: 18,
        items: [
          { name: 'Chloe Morris', class: 'Engineering Year 1' },
          { name: 'Grayson Rogers', class: 'Chemistry Year 2' }
        ]
      },
      flagged: {
        count: 9,
        items: [
          { name: 'Lily Reed', class: 'Computer Science Year 2' },
          { name: 'Leo Cook', class: 'Engineering Year 3' }
        ]
      }
    },
    'Saturday': {
      good: {
        count: 38,
        items: [
          { name: 'Zoe Morgan', class: 'Computer Science Year 3' },
          { name: 'Elijah Bell', class: 'Engineering Year 2' }
        ]
      },
      bad: {
        count: 10,
        items: [
          { name: 'Aria Murphy', class: 'Engineering Year 1' }
        ]
      },
      flagged: {
        count: 4,
        items: [
          { name: 'Aiden Bailey', class: 'Computer Science Year 2' }
        ]
      }
    },
    'Sunday': {
      good: {
        count: 32,
        items: [
          { name: 'Riley Rivera', class: 'Computer Science Year 3' }
        ]
      },
      bad: {
        count: 8,
        items: [
          { name: 'Zoey Cooper', class: 'Engineering Year 1' }
        ]
      },
      flagged: {
        count: 3,
        items: [
          { name: 'Nolan Richardson', class: 'Computer Science Year 2' }
        ]
      }
    }
  };

  const topPerformers = [
    { name: 'John Doe', class: 'Computer Science', reports: 7, completion: 100 },
    { name: 'Jane Smith', class: 'Engineering', reports: 6, completion: 100 },
    { name: 'Mike Johnson', class: 'Chemistry', reports: 5, completion: 98 }
  ];

  const handleDayClick = (day: string) => {
    setSelectedDay(day);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDay(null);
  };

  const currentDayDetails = selectedDay ? dayDetails[selectedDay] : null;

  return (
    <AdminLayout>
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1a202c', margin: 0 }}>
            Weekly Report
          </h1>
          <p style={{ color: '#718096', marginTop: '0.5rem', fontSize: '0.95rem' }}>
            Week of Oct 24 - Oct 30, 2024
          </p>
        </div>
        <button className="btn-export" style={{ marginLeft: 'auto' }}>
          <Download size={18} />
          Export Summary
        </button>
      </div>

      {/* Weekly Stats */}
      <div className="stats-grid">
        <div className="stat-card fade-in">
          <div className="stat-card-header">
            <div className="stat-icon" style={{ backgroundColor: '#3b82f615', color: '#3b82f6' }}>
              <FileText size={24} />
            </div>
            <div className="stat-trend" style={{ color: '#10b981' }}>
              <TrendingUp size={16} />
              <span>{weekStats.trend}%</span>
            </div>
          </div>
          <div className="stat-content">
            <h3 className="stat-title">Total Reports</h3>
            <div className="stat-value">{weekStats.totalReports}</div>
          </div>
        </div>

        <div className="stat-card fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="stat-card-header">
            <div className="stat-icon" style={{ backgroundColor: '#10b98115', color: '#10b981' }}>
              <Users size={24} />
            </div>
          </div>
          <div className="stat-content">
            <h3 className="stat-title">Active Representatives</h3>
            <div className="stat-value">{weekStats.totalRepresentatives}</div>
          </div>
        </div>

        <div className="stat-card fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="stat-card-header">
            <div className="stat-icon" style={{ backgroundColor: '#f59e0b15', color: '#f59e0b' }}>
              <AlertTriangle size={24} />
            </div>
          </div>
          <div className="stat-content">
            <h3 className="stat-title">Flagged Items</h3>
            <div className="stat-value">{weekStats.flaggedItems}</div>
          </div>
        </div>

        <div className="stat-card fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="stat-card-header">
            <div className="stat-icon" style={{ backgroundColor: '#8b5cf615', color: '#8b5cf6' }}>
              <CheckCircle size={24} />
            </div>
          </div>
          <div className="stat-content">
            <h3 className="stat-title">Resolved Issues</h3>
            <div className="stat-value">{weekStats.resolvedIssues}</div>
          </div>
        </div>
      </div>

      {/* Daily Breakdown */}
      <div className="dashboard-card fade-in" style={{ animationDelay: '0.4s', marginBottom: '2rem' }}>
        <div className="card-header">
          <h3 className="card-title">
            <Calendar size={20} />
            Daily Breakdown (Click to view details)
          </h3>
        </div>
        <div className="card-content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {dailyBreakdown.map((day, index) => (
              <div 
                key={index} 
                className="day-breakdown-item"
                onClick={() => handleDayClick(day.day)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: '#f7fafc',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ flex: '0 0 120px', fontWeight: '600', color: '#1a202c' }}>
                  {day.day}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    fontSize: '0.875rem',
                    color: '#718096',
                    marginBottom: '0.5rem'
                  }}>
                    <span>Reports: {day.reports}</span>
                    <span>Flagged: {day.flagged}</span>
                    <span>Approved: {day.approved}</span>
                  </div>
                  <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${(day.approved / day.reports) * 100}%`,
                      background: 'linear-gradient(90deg, #10b981, #34d399)',
                      transition: 'width 0.3s ease'
                    }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="dashboard-card fade-in" style={{ animationDelay: '0.5s' }}>
        <div className="card-header">
          <h3 className="card-title">
            <Award size={20} />
            Top Performers
          </h3>
        </div>
        <div className="card-content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {topPerformers.map((performer, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: index === 0 ? '#fef3c7' : '#f7fafc',
                borderRadius: '8px',
                border: index === 0 ? '2px solid #f59e0b' : '1px solid #e2e8f0'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: index === 0 ? '#f59e0b' : '#cbd5e0',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '1.125rem'
                }}>
                  {index + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600', color: '#1a202c', marginBottom: '0.25rem' }}>
                    {performer.name}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#718096' }}>
                    {performer.class}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: '700', color: '#1a202c', fontSize: '1.125rem' }}>
                    {performer.reports}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#718096' }}>
                    reports
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: '700', color: '#10b981', fontSize: '1.125rem' }}>
                    {performer.completion}%
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#718096' }}>
                    complete
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Day Details */}
      {showModal && currentDayDetails && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedDay} - Detailed Report</h2>
              <button className="modal-close" onClick={handleCloseModal}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              {/* Good Reports */}
              <div className="detail-section">
                <div className="detail-section-header good">
                  <ThumbsUp size={20} />
                  <h3>Good Reports</h3>
                  <span className="count-badge">{currentDayDetails.good.count}</span>
                </div>
                <div className="detail-list">
                  {currentDayDetails.good.items.map((item, idx) => (
                    <div key={idx} className="detail-item">
                      <div className="detail-item-name">{item.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bad Reports */}
              <div className="detail-section">
                <div className="detail-section-header bad">
                  <ThumbsDown size={20} />
                  <h3>Bad Reports</h3>
                  <span className="count-badge">{currentDayDetails.bad.count}</span>
                </div>
                <div className="detail-list">
                  {currentDayDetails.bad.items.map((item, idx) => (
                    <div key={idx} className="detail-item">
                      <div className="detail-item-name">{item.name}</div>
                      <div className="detail-item-class">{item.class}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flagged Reports */}
              <div className="detail-section">
                <div className="detail-section-header flagged">
                  <Flag size={20} />
                  <h3>Flagged Reports</h3>
                  <span className="count-badge">{currentDayDetails.flagged.count}</span>
                </div>
                <div className="detail-list">
                  {currentDayDetails.flagged.items.map((item, idx) => (
                    <div key={idx} className="detail-item">
                      <div className="detail-item-name">{item.name}</div>
                      <div className="detail-item-class">{item.class}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default WeeklyReportPage;
