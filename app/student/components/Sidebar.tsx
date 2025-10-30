/**
 * SIDEBAR NAVIGATION COMPONENT
 * 
 * Responsive sidebar navigation for the student dashboard area.
 * 
 * FEATURES:
 * - Collapsible design (icon-only or full width)
 * - Mobile overlay mode
 * - Active link highlighting
 * - Smooth transitions
 * - User profile section
 * - Logout functionality
 * 
 * RESPONSIVE BEHAVIOR:
 * - Desktop: Side-by-side with content, can collapse to icons only
 * - Mobile: Slides in as overlay from left, full menu with text
 */

"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard,
  User,
  Bell,
  FileText,
  Eye,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import './sidebar.css';

/**
 * PROPS INTERFACE
 * @property {boolean} isOpen - Controls sidebar visibility on mobile
 * @property {boolean} isCollapsed - Controls collapsed state on desktop
 * @property {function} onToggle - Callback to toggle mobile sidebar
 * @property {function} onCollapse - Callback to toggle desktop collapse
 * @property {function} onClose - Callback to close sidebar
 */
interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onToggle: () => void;
  onCollapse: () => void;
  onClose: () => void;
}

/**
 * NAVIGATION ITEM INTERFACE
 * Defines the structure of each menu item
 * 
 * @property {string} label - Display text for the menu item
 * @property {string} href - URL path to navigate to
 * @property {React.ComponentType} icon - Lucide icon component
 */
interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

/**
 * NAVIGATION MENU ITEMS
 * 
 * This array defines all the menu items in the sidebar.
 * 
 * TO ADD A NEW PAGE:
 * 1. Add a new object to this array
 * 2. Specify label, href, and icon
 * 3. Create the corresponding page in app/student/[your-page]/page.tsx
 * 
 * AVAILABLE ICONS:
 * Import from 'lucide-react' - https://lucide.dev/icons/
 */
const navigationItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/student/dashboard',
    icon: LayoutDashboard, // Home/grid icon
  },
  {
    label: 'Submit',
    href: '/student/submit',
    icon: FileText, // Submit report icon
  },
  {
    label: 'Report',
    href: '/student/report',
    icon: FileText, // Document/file icon
  },
  {
    label: 'Review',
    href: '/student/review',
    icon: Eye, // Eye/view icon
  },
  {
    label: 'Reminder',
    href: '/student/reminder',
    icon: Bell, // Notification/bell icon
  },
  {
    label: 'Profile',
    href: '/student/profile',
    icon: User, // User profile icon
  },
  {
    label: 'Settings',
    href: '/student/settings',
    icon: Settings, // Settings/gear icon
  },
];

/**
 * SIDEBAR COMPONENT
 */
const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  isCollapsed, 
  onToggle, 
  onCollapse,
  onClose 
}) => {
  // Get current pathname to highlight active link
  const pathname = usePathname();
  const router = useRouter();

  /**
   * HANDLE LOGOUT
   * 
   * Logs out the user and redirects to login page
   * In a real app, this would:
   * 1. Clear authentication tokens
   * 2. Clear user session
   * 3. Call logout API
   * 4. Redirect to login
   */
  const handleLogout = () => {
    console.log('Logging out...');
    // TODO: Implement actual logout logic here
    // Example: await logout(); clearTokens(); etc.
    router.push('/auth/login');
  };

  /**
   * HANDLE LINK CLICK
   * Closes sidebar on mobile when a link is clicked
   */
  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      {/* 
        SIDEBAR CONTAINER
        
        CLASSES:
        - sidebar: Base styles
        - open: Applied on mobile when sidebar should be visible
        - collapsed: Applied on desktop when sidebar should show icons only
        
        CSS controls the width and visibility based on these classes
      */}
      <aside className={`sidebar ${isOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
        {/* 
          SIDEBAR HEADER
          - Shows logo and app name
          - Contains collapse button for desktop
        */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            {/* Logo/Icon - only shown when not collapsed */}
            {!isCollapsed && (
              <>
                <div className="logo-icon">📊</div>
                <span className="logo-text">NPC Student</span>
              </>
            )}
            {/* Show just icon when collapsed */}
            {isCollapsed && (
              <div className="logo-icon">📊</div>
            )}
          </div>
          
          {/* 
            COLLAPSE BUTTON (Desktop Only)
            - Toggles between expanded and collapsed states
            - Shows chevron icon indicating direction
            - Hidden on mobile devices
          */}
          <button 
            className="collapse-toggle desktop-only"
            onClick={onCollapse}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* 
          USER PROFILE SECTION
          - Shows user avatar and info
          - Collapses to just avatar when sidebar is collapsed
        */}
        <div className="sidebar-user">
          <div className="user-avatar">
            <img 
              src="/assets/logo.png" 
              alt="User" 
              className="avatar-img"
            />
          </div>
          {!isCollapsed && (
            <div className="user-info">
              <p className="user-name">John Doe</p>
              <p className="user-role">Student</p>
            </div>
          )}
        </div>

        {/* 
          NAVIGATION MENU
          - Renders all navigation items from the array above
          - Highlights active page
          - Shows icons only when collapsed
        */}
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {navigationItems.map((item) => {
              // Check if this link is currently active
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <li key={item.href} className="nav-item">
                  <Link 
                    href={item.href}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={handleLinkClick}
                  >
                    {/* Icon - always visible */}
                    <Icon className="nav-icon" />
                    
                    {/* Label - hidden when collapsed */}
                    {!isCollapsed && (
                      <span className="nav-label">{item.label}</span>
                    )}

                    {/* Active indicator - shows on active page */}
                    {isActive && <div className="active-indicator" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* 
          SIDEBAR FOOTER
          - Contains logout button
          - Always at the bottom
        */}
        <div className="sidebar-footer">
          <button 
            className="logout-button"
            onClick={handleLogout}
          >
            <LogOut className="nav-icon" />
            {!isCollapsed && <span className="nav-label">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

