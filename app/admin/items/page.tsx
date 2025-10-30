/**
 * ADMIN ITEMS PAGE
 * 
 * This page displays and manages all inspection items.
 * 
 * LOCATION: /admin/items
 * 
 * FEATURES:
 * - List of all inspection items
 * - Search functionality
 * - Add/Edit/Delete items
 * - Item categories
 * - Usage statistics
 */

"use client";

import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { 
  FileText,
  Search,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Eye
} from 'lucide-react';
import './items.css';

interface InspectionItem {
  id: number;
  name: string;
  description: string;
  category: string;
  mandatory: boolean;
  usageCount: number;
  goodCount: number;
  badCount: number;
  flaggedCount: number;
}

const ItemsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Mock data for inspection items
  const inspectionItems: InspectionItem[] = [
    {
      id: 1,
      name: 'Fire Extinguisher',
      description: 'Check if fire extinguisher is accessible and not expired',
      category: 'Safety Equipment',
      mandatory: true,
      usageCount: 1248,
      goodCount: 1180,
      badCount: 45,
      flaggedCount: 23
    },
    {
      id: 2,
      name: 'Emergency Exit Signs',
      description: 'Verify all emergency exit signs are illuminated',
      category: 'Safety Equipment',
      mandatory: true,
      usageCount: 1248,
      goodCount: 1190,
      badCount: 38,
      flaggedCount: 20
    },
    {
      id: 3,
      name: 'Window Glass',
      description: 'Inspect all windows for cracks or damage',
      category: 'Infrastructure',
      mandatory: true,
      usageCount: 1248,
      goodCount: 1150,
      badCount: 65,
      flaggedCount: 33
    },
    {
      id: 4,
      name: 'Floor Condition',
      description: 'Check for spills, cracks, or trip hazards',
      category: 'Infrastructure',
      mandatory: true,
      usageCount: 1248,
      goodCount: 1170,
      badCount: 52,
      flaggedCount: 26
    },
    {
      id: 5,
      name: 'Electrical Outlets',
      description: 'Ensure all outlets are functioning and properly covered',
      category: 'Electrical',
      mandatory: true,
      usageCount: 1248,
      goodCount: 1140,
      badCount: 75,
      flaggedCount: 33
    },
    {
      id: 6,
      name: 'First Aid Kit',
      description: 'Verify first aid kit is stocked and accessible',
      category: 'Safety Equipment',
      mandatory: true,
      usageCount: 1248,
      goodCount: 1165,
      badCount: 58,
      flaggedCount: 25
    },
    {
      id: 7,
      name: 'Chemical Storage',
      description: 'Check proper labeling and storage of chemicals',
      category: 'Safety Equipment',
      mandatory: true,
      usageCount: 1248,
      goodCount: 1125,
      badCount: 88,
      flaggedCount: 35
    },
    {
      id: 8,
      name: 'Ventilation System',
      description: 'Ensure ventilation is working properly',
      category: 'HVAC',
      mandatory: true,
      usageCount: 1248,
      goodCount: 1155,
      badCount: 68,
      flaggedCount: 25
    },
    {
      id: 9,
      name: 'Safety Equipment',
      description: 'Check availability of safety goggles, gloves, etc.',
      category: 'Safety Equipment',
      mandatory: true,
      usageCount: 1248,
      goodCount: 1175,
      badCount: 50,
      flaggedCount: 23
    },
    {
      id: 10,
      name: 'Lighting',
      description: 'Verify all lights are functioning',
      category: 'Electrical',
      mandatory: true,
      usageCount: 1248,
      goodCount: 1160,
      badCount: 62,
      flaggedCount: 26
    }
  ];

  const categories = ['all', ...Array.from(new Set(inspectionItems.map(item => item.category)))];

  const filteredItems = inspectionItems.filter(item => {
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
    if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !item.description.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const stats = {
    totalItems: inspectionItems.length,
    mandatory: inspectionItems.filter(i => i.mandatory).length,
    totalUsage: inspectionItems.reduce((sum, i) => sum + i.usageCount, 0),
    avgGoodRate: Math.round((inspectionItems.reduce((sum, i) => sum + (i.goodCount / i.usageCount * 100), 0)) / inspectionItems.length)
  };

  return (
    <AdminLayout>
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1a202c', margin: 0 }}>
            Inspection Items
          </h1>
          <p style={{ color: '#718096', marginTop: '0.5rem', fontSize: '0.95rem' }}>
            Manage all inspection items used in reports
          </p>
        </div>
        <button className="btn-add-item">
          <Plus size={18} />
          Add New Item
        </button>
      </div>

      {/* Statistics */}
      <div className="stats-row" style={{ marginBottom: '2rem' }}>
        <div className="stat-box fade-in">
          <div className="stat-box-icon" style={{ backgroundColor: '#3b82f615', color: '#3b82f6' }}>
            <FileText size={24} />
          </div>
          <div className="stat-box-content">
            <div className="stat-box-value">{stats.totalItems}</div>
            <div className="stat-box-label">Total Items</div>
          </div>
        </div>

        <div className="stat-box fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="stat-box-icon" style={{ backgroundColor: '#ef444415', color: '#ef4444' }}>
            <AlertTriangle size={24} />
          </div>
          <div className="stat-box-content">
            <div className="stat-box-value">{stats.mandatory}</div>
            <div className="stat-box-label">Mandatory</div>
          </div>
        </div>

        <div className="stat-box fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="stat-box-icon" style={{ backgroundColor: '#8b5cf615', color: '#8b5cf6' }}>
            <TrendingUp size={24} />
          </div>
          <div className="stat-box-content">
            <div className="stat-box-value">{stats.totalUsage.toLocaleString()}</div>
            <div className="stat-box-label">Total Usage</div>
          </div>
        </div>

        <div className="stat-box fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="stat-box-icon" style={{ backgroundColor: '#10b98115', color: '#10b981' }}>
            <CheckCircle size={24} />
          </div>
          <div className="stat-box-content">
            <div className="stat-box-value">{stats.avgGoodRate}%</div>
            <div className="stat-box-label">Avg Good Rate</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section fade-in" style={{ animationDelay: '0.4s', marginBottom: '2rem' }}>
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search items by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-filter">
          <label>Category:</label>
          <select
            className="category-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Items List */}
      <div className="items-grid">
        {filteredItems.map((item, index) => {
          const goodRate = Math.round((item.goodCount / item.usageCount) * 100);
          const badRate = Math.round((item.badCount / item.usageCount) * 100);
          const flaggedRate = Math.round((item.flaggedCount / item.usageCount) * 100);

          return (
            <div key={item.id} className="item-card slide-in-up" style={{ animationDelay: `${0.5 + index * 0.05}s` }}>
              <div className="item-card-header">
                <div className="item-header-top">
                  <h3 className="item-name">{item.name}</h3>
                  {item.mandatory && (
                    <span className="mandatory-badge">
                      <AlertTriangle size={14} />
                      Mandatory
                    </span>
                  )}
                </div>
                <p className="item-description">{item.description}</p>
                <span className="item-category">{item.category}</span>
              </div>

              <div className="item-card-body">
                <div className="item-usage">
                  <div className="usage-header">
                    <span className="usage-label">Usage Statistics</span>
                    <span className="usage-count">{item.usageCount.toLocaleString()} times</span>
                  </div>

                  <div className="usage-breakdown">
                    <div className="usage-stat good">
                      <CheckCircle size={16} />
                      <span className="stat-percentage">{goodRate}%</span>
                      <span className="stat-count">({item.goodCount})</span>
                    </div>
                    <div className="usage-stat bad">
                      <AlertTriangle size={16} />
                      <span className="stat-percentage">{badRate}%</span>
                      <span className="stat-count">({item.badCount})</span>
                    </div>
                    <div className="usage-stat flagged">
                      <AlertTriangle size={16} />
                      <span className="stat-percentage">{flaggedRate}%</span>
                      <span className="stat-count">({item.flaggedCount})</span>
                    </div>
                  </div>

                  <div className="usage-bar">
                    <div className="bar-segment good" style={{ width: `${goodRate}%` }}></div>
                    <div className="bar-segment bad" style={{ width: `${badRate}%` }}></div>
                    <div className="bar-segment flagged" style={{ width: `${flaggedRate}%` }}></div>
                  </div>
                </div>

                <div className="item-actions">
                  <button className="btn-item-view">
                    <Eye size={16} />
                    View
                  </button>
                  <button className="btn-item-edit">
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button className="btn-item-delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AdminLayout>
  );
};

export default ItemsPage;

