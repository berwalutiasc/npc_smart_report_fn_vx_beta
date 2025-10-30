/**
 * STUDENT DASHBOARD PAGE
 * 
 * This is the main dashboard page that students see after logging in.
 * 
 * LOCATION: /student/dashboard
 * 
 * FEATURES:
 * - Statistics cards (Reports, Students, Classes)
 * - Weekly student activity chart
 * - Recent activity feed
 * - Quick links to other pages
 * - Recent reports list
 * - Loading animations
 * - Smooth entrance animations
 */

"use client";

import React, { useState, useEffect } from 'react';
import StudentLayout from '../components/StudentLayout';
import { 
  FileText, 
  Users, 
  GraduationCap, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Settings,
  Bell,
  Eye,
  ArrowRight,
  Activity
} from 'lucide-react';
import Link from 'next/link';
import './dashboard.css';

// TYPES
interface StatCardData {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend: number;
  color: string;
}

interface ActivityItem {
  id: number;
  type: 'submitted' | 'approved' | 'pending';
  title: string;
  time: string;
  user?: string;
}

interface RecentReport {
  id: number;
  title: string;
  status: 'approved' | 'pending' | 'draft';
  date: string;
  class: string;
}

interface WeeklyData {
  day: string;
  count: number;
}

// MOCK DATA (Simulating API response)
const mockStats: StatCardData[] = [
  {
    title: 'Total Reports',
    value: 24,
    icon: <FileText size={24} />,
    trend: 12.5,
    color: '#3b82f6'
  },
  {
    title: 'Active Students',
    value: 156,
    icon: <Users size={24} />,
    trend: 8.2,
    color: '#10b981'
  },
  {
    title: 'Classes',
    value: 8,
    icon: <GraduationCap size={24} />,
    trend: 0,
    color: '#f59e0b'
  },
  {
    title: 'This Week',
    value: 12,
    icon: <TrendingUp size={24} />,
    trend: 15.3,
    color: '#8b5cf6'
  }
];

const mockActivities: ActivityItem[] = [
  { id: 1, type: 'submitted', title: 'Weekly Progress Report', time: '2 minutes ago', user: 'John Doe' },
  { id: 2, type: 'approved', title: 'Lab Report - Chemistry', time: '1 hour ago', user: 'Jane Smith' },
  { id: 3, type: 'pending', title: 'Math Assignment Review', time: '3 hours ago', user: 'Mike Johnson' },
  { id: 4, type: 'submitted', title: 'English Essay Draft', time: '5 hours ago', user: 'Sarah Williams' },
  { id: 5, type: 'approved', title: 'Physics Experiment Report', time: '1 day ago', user: 'Tom Brown' }
];

const mockRecentReports: RecentReport[] = [
  { id: 1, title: 'Weekly Progress Report', status: 'pending', date: '2024-10-30', class: 'Computer Science' },
  { id: 2, title: 'Lab Report - Chemistry', status: 'approved', date: '2024-10-29', class: 'Chemistry' },
  { id: 3, title: 'Math Assignment', status: 'approved', date: '2024-10-28', class: 'Mathematics' },
  { id: 4, title: 'English Essay', status: 'draft', date: '2024-10-27', class: 'English' }
];

const mockWeeklyData: WeeklyData[] = [
  { day: 'Mon', count: 12 },
  { day: 'Tue', count: 19 },
  { day: 'Wed', count: 15 },
  { day: 'Thu', count: 22 },
  { day: 'Fri', count: 18 },
  { day: 'Sat', count: 8 },
  { day: 'Sun', count: 6 }
];

const quickLinks = [
  { title: 'Profile', href: '/student/profile', icon: <User size={20} />, color: '#3b82f6' },
  { title: 'Settings', href: '/student/settings', icon: <Settings size={20} />, color: '#6b7280' },
  { title: 'Reminders', href: '/student/reminder', icon: <Bell size={20} />, color: '#f59e0b' },
  { title: 'Reviews', href: '/student/review', icon: <Eye size={20} />, color: '#8b5cf6' }
];

/**
 * DASHBOARD PAGE COMPONENT
 */
const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<StatCardData[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [reports, setReports] = useState<RecentReport[]>([]);
  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([]);

  // Simulate API call with loading
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStats(mockStats);
      setActivities(mockActivities);
      setReports(mockRecentReports);
      setWeeklyData(mockWeeklyData);
      setLoading(false);
    };

    fetchData();
  }, []);

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
          Dashboard
        </h1>
        <p style={{ 
          color: '#718096', 
          marginTop: '0.5rem',
          fontSize: '0.95rem' 
        }}>
          Welcome back! Here's what's happening with your reports.
        </p>
      </div>

      {/* STATISTICS CARDS */}
      <div className="stats-grid">
        {loading ? (
          // Loading skeletons
          <>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="stat-card skeleton-card">
                <div className="skeleton skeleton-icon"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-number"></div>
              </div>
            ))}
          </>
        ) : (
          stats.map((stat, index) => (
            <div 
              key={index} 
              className="stat-card fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="stat-card-header">
                <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                  {stat.icon}
                </div>
                <div className="stat-trend" style={{ color: stat.trend >= 0 ? '#10b981' : '#ef4444' }}>
                  <TrendingUp size={16} style={{ transform: stat.trend < 0 ? 'rotate(180deg)' : 'none' }} />
                  <span>{Math.abs(stat.trend)}%</span>
                </div>
              </div>
              <div className="stat-content">
                <h3 className="stat-title">{stat.title}</h3>
                <div className="stat-value counter">{stat.value}</div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="dashboard-grid">
        {/* WEEKLY CHART */}
        <div className={`dashboard-card chart-card ${loading ? '' : 'fade-in'}`} style={{ animationDelay: '0.4s' }}>
          <div className="card-header">
            <h3 className="card-title">
              <Activity size={20} />
              Weekly Activity
            </h3>
          </div>
          <div className="card-content">
            {loading ? (
              <div className="chart-skeleton">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div key={i} className="skeleton skeleton-bar"></div>
                ))}
              </div>
            ) : (
              <div className="weekly-chart">
                {weeklyData.map((data, index) => (
                  <div key={index} className="chart-bar-wrapper">
                    <div className="chart-bar-container">
                      <div 
                        className="chart-bar slide-up"
                        style={{ 
                          height: `${(data.count / 25) * 100}%`,
                          animationDelay: `${0.5 + index * 0.1}s`
                        }}
                      >
                        <span className="bar-value">{data.count}</span>
                      </div>
                    </div>
                    <span className="chart-label">{data.day}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div className={`dashboard-card activity-card ${loading ? '' : 'fade-in'}`} style={{ animationDelay: '0.5s' }}>
          <div className="card-header">
            <h3 className="card-title">
              <Clock size={20} />
              Recent Activity
            </h3>
          </div>
          <div className="card-content">
            {loading ? (
              <div className="activity-skeleton">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="skeleton skeleton-activity"></div>
                ))}
              </div>
            ) : (
              <div className="activity-list">
                {activities.map((activity, index) => (
                  <div 
                    key={activity.id} 
                    className="activity-item slide-in-right"
                    style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                  >
                    <div className={`activity-icon ${activity.type}`}>
                      {activity.type === 'submitted' && <FileText size={16} />}
                      {activity.type === 'approved' && <CheckCircle size={16} />}
                      {activity.type === 'pending' && <AlertCircle size={16} />}
                    </div>
                    <div className="activity-content">
                      <p className="activity-title">{activity.title}</p>
                      <p className="activity-meta">
                        {activity.user && <span>{activity.user} • </span>}
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className={`dashboard-card quick-links-card ${loading ? '' : 'fade-in'}`} style={{ animationDelay: '0.6s' }}>
          <div className="card-header">
            <h3 className="card-title">Quick Links</h3>
          </div>
          <div className="card-content">
            {loading ? (
              <div className="quick-links-skeleton">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="skeleton skeleton-link"></div>
                ))}
              </div>
            ) : (
              <div className="quick-links-grid">
                {quickLinks.map((link, index) => (
                  <Link 
                    key={index} 
                    href={link.href} 
                    className="quick-link-item scale-in"
                    style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                  >
                    <div className="quick-link-icon" style={{ backgroundColor: `${link.color}15`, color: link.color }}>
                      {link.icon}
                    </div>
                    <span className="quick-link-title">{link.title}</span>
                    <ArrowRight size={16} className="quick-link-arrow" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RECENT REPORTS */}
        <div className={`dashboard-card reports-card ${loading ? '' : 'fade-in'}`} style={{ animationDelay: '0.7s' }}>
          <div className="card-header">
            <h3 className="card-title">
              <FileText size={20} />
              Recent Reports
            </h3>
            <Link href="/student/report" className="view-all-link">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="card-content">
            {loading ? (
              <div className="reports-skeleton">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="skeleton skeleton-report"></div>
                ))}
              </div>
            ) : (
              <div className="reports-list">
                {reports.map((report, index) => (
                  <div 
                    key={report.id} 
                    className="report-item slide-in-left"
                    style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                  >
                    <div className="report-info">
                      <h4 className="report-title">{report.title}</h4>
                      <p className="report-meta">{report.class} • {report.date}</p>
                    </div>
                    <div className={`report-status status-${report.status}`}>
                      {report.status}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default DashboardPage;

