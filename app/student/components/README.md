# Student Dashboard System - Documentation

## 📚 Overview

This directory contains the reusable components for the Student Dashboard area. The system uses a **responsive sidebar layout** that adapts to different screen sizes and provides a consistent navigation experience.

---

## 🏗️ Architecture

### Directory Structure

```
app/student/
├── components/              # Reusable components (THIS DIRECTORY)
│   ├── StudentLayout.tsx    # Main layout wrapper with sidebar
│   ├── Sidebar.tsx          # Navigation sidebar component
│   ├── studentLayout.css    # Layout styles
│   ├── sidebar.css          # Sidebar styles
│   └── README.md            # This documentation
├── dashboard/
│   └── page.tsx            # Dashboard page
├── profile/
│   └── page.tsx            # Profile page
├── reminder/
│   └── page.tsx            # Reminder page
├── report/
│   └── page.tsx            # Report page
├── review/
│   └── page.tsx            # Review page
└── settings/
    └── page.tsx            # Settings page
```

---

## 🧩 Components

### 1. StudentLayout (Main Layout Wrapper)

**File:** `StudentLayout.tsx`

**Purpose:** Wraps all student pages with a consistent layout including sidebar and content area.

**Features:**
- Responsive sidebar (collapsible on desktop, overlay on mobile)
- Content area that adjusts to sidebar state
- Mobile header with hamburger menu
- Floating clock component
- Smooth transitions

**Usage:**
```tsx
import StudentLayout from '../components/StudentLayout';

const YourPage = () => {
  return (
    <StudentLayout>
      {/* Your page content here */}
      <h1>Page Title</h1>
      <p>Content...</p>
    </StudentLayout>
  );
};
```

**Props:**
- `children` (ReactNode): The page content to render

**State Management:**
- `isSidebarOpen`: Boolean - Controls sidebar visibility on mobile
- `isSidebarCollapsed`: Boolean - Controls sidebar collapse state on desktop

---

### 2. Sidebar (Navigation Component)

**File:** `Sidebar.tsx`

**Purpose:** Provides navigation menu with icons and labels.

**Features:**
- Collapsible design (icons-only or full width)
- Active page highlighting
- User profile section
- Logout functionality
- Responsive behavior

**Navigation Items:**

Each navigation item has:
- **label**: Display text
- **href**: URL path
- **icon**: Lucide React icon

Current menu items:
1. Dashboard (`/student/dashboard`)
2. Profile (`/student/profile`)
3. Reminder (`/student/reminder`)
4. Report (`/student/report`)
5. Review (`/student/review`)
6. Settings (`/student/settings`)

**Adding a New Page:**

1. Add navigation item in `Sidebar.tsx`:
```tsx
const navigationItems: NavItem[] = [
  // ... existing items
  {
    label: 'Your New Page',
    href: '/student/your-page',
    icon: YourIcon, // Import from lucide-react
  },
];
```

2. Create the page directory and file:
```bash
mkdir app/student/your-page
# Create page.tsx inside
```

3. Use the StudentLayout in your page:
```tsx
import StudentLayout from '../components/StudentLayout';

const YourPage = () => {
  return (
    <StudentLayout>
      <h1>Your New Page</h1>
    </StudentLayout>
  );
};

export default YourPage;
```

---

## 📱 Responsive Behavior

### Desktop (≥ 768px)
- Sidebar is always visible on the left
- Can be collapsed to show icons only
- Content area adjusts margin based on sidebar state
- Sidebar width:
  - Expanded: 280px
  - Collapsed: 80px

### Mobile (< 768px)
- Sidebar hidden by default
- Opens as overlay from left side
- Hamburger menu button in header
- Full sidebar (280px) when open
- Dark overlay behind sidebar
- Clicking overlay closes sidebar

---

## 🎨 Styling

### CSS Files

**studentLayout.css:**
- Main layout container styles
- Content area spacing
- Mobile header styles
- Responsive breakpoints
- Utility classes

**sidebar.css:**
- Sidebar container and positioning
- Navigation menu styles
- User profile section
- Active link highlighting
- Collapse animations
- Scrollbar styling

### Color Scheme

```css
/* Primary Color */
--primary: #667eea (Purple/Blue)

/* Background Colors */
--bg-main: #f7fafc (Light Gray)
--bg-card: #ffffff (White)

/* Text Colors */
--text-primary: #1a202c (Dark Gray)
--text-secondary: #718096 (Medium Gray)
--text-muted: #a0aec0 (Light Gray)

/* Border Colors */
--border: #e2e8f0 (Light Gray)

/* Interactive States */
--hover-bg: #f7fafc
--active-bg: #eef2ff
```

---

## 🔄 State Flow

### Sidebar States

```
Desktop:
├── Expanded (default)
│   ├── Width: 280px
│   ├── Shows: Icons + Text
│   └── Content margin: 280px
│
└── Collapsed
    ├── Width: 80px
    ├── Shows: Icons only
    └── Content margin: 80px

Mobile:
├── Closed (default)
│   ├── Position: Off-screen (translateX(-100%))
│   ├── Shows: Hidden
│   └── Content margin: 0
│
└── Open
    ├── Position: On-screen (translateX(0))
    ├── Shows: Full sidebar with overlay
    └── Content margin: 0
```

---

## 🚀 How It Works

### Page Rendering Flow

1. **User navigates** to `/student/dashboard`

2. **Next.js routing** loads `app/student/dashboard/page.tsx`

3. **Page component** wraps content with `StudentLayout`:
   ```tsx
   <StudentLayout>
     <YourContent />
   </StudentLayout>
   ```

4. **StudentLayout** renders:
   - Sidebar component
   - Content area with your page
   - Mobile header (if mobile)
   - FloatingClock

5. **Sidebar** shows:
   - Navigation menu
   - Active page highlighted
   - User profile
   - Logout button

6. **User interactions**:
   - Click nav link → Navigate to page
   - Click collapse button → Toggle sidebar
   - Click hamburger (mobile) → Open sidebar
   - Click overlay (mobile) → Close sidebar

---

## 📝 Page Template

Use this template for new pages:

```tsx
/**
 * [PAGE NAME] PAGE
 * 
 * Description of what this page does
 * 
 * LOCATION: /student/[page-name]
 * 
 * PURPOSE:
 * - List main purposes
 * - What user can do here
 */

"use client";

import React from 'react';
import StudentLayout from '../components/StudentLayout';

const YourPage = () => {
  return (
    <StudentLayout>
      {/* Page Header */}
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: '700', 
          color: '#1a202c',
          margin: 0 
        }}>
          Page Title
        </h1>
        <p style={{ 
          color: '#718096', 
          marginTop: '0.5rem',
          fontSize: '0.95rem' 
        }}>
          Page description or subtitle
        </p>
      </div>

      {/* Page Content */}
      <div>
        {/* Your content here */}
      </div>
    </StudentLayout>
  );
};

export default YourPage;
```

---

## 🎯 Best Practices

1. **Always wrap pages** with `StudentLayout` component

2. **Use consistent spacing**:
   - Page header: 2rem margin bottom
   - Content cards: 1rem padding
   - Section gaps: 1.5-2rem

3. **Follow responsive design**:
   - Test on mobile (< 768px)
   - Test on tablet (768px - 1024px)
   - Test on desktop (> 1024px)

4. **Maintain navigation**:
   - Keep menu items relevant
   - Use appropriate icons
   - Keep labels short and clear

5. **Performance**:
   - Use "use client" only when needed
   - Lazy load heavy components
   - Optimize images

---

## 🔧 Customization

### Changing Sidebar Width

In `sidebar.css`:
```css
.sidebar {
  width: 280px; /* Change expanded width */
}

.sidebar.collapsed {
  width: 80px; /* Change collapsed width */
}
```

Update content margin in `studentLayout.css`:
```css
.student-content {
  margin-left: 280px; /* Match expanded width */
}

.student-content.sidebar-collapsed {
  margin-left: 80px; /* Match collapsed width */
}
```

### Adding User Avatar

Replace in `Sidebar.tsx`:
```tsx
<img 
  src="/assets/logo.png"  // Change to actual user avatar
  alt="User" 
  className="avatar-img"
/>
```

### Changing Color Theme

Update colors in `sidebar.css` and `studentLayout.css`:
```css
/* Primary color */
.nav-link:hover {
  color: #your-color;
}

.nav-link.active {
  color: #your-color;
  background-color: #your-light-color;
}
```

---

## 🐛 Troubleshooting

### Sidebar not showing on mobile
- Check that `isOpen` state is being set
- Verify overlay click handler is working
- Check z-index conflicts

### Content overlapping sidebar
- Verify margin-left on `.student-content`
- Check media query breakpoints
- Ensure sidebar has fixed positioning

### Active link not highlighting
- Check `usePathname()` is returning correct path
- Verify `href` matches exactly
- Check active class styles are being applied

---

## 📖 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Lucide Icons](https://lucide.dev/icons/)
- [React Documentation](https://react.dev/)
- [CSS Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

---

## 💡 Summary

The Student Dashboard system provides a **professional, responsive layout** with:

✅ Collapsible sidebar navigation  
✅ Mobile-friendly design  
✅ Consistent page structure  
✅ Easy to extend with new pages  
✅ Well-commented code  
✅ Reusable components  

Simply wrap your page content with `StudentLayout` and you're ready to go!

