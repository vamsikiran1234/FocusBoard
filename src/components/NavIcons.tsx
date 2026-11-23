import React from 'react';

interface IconProps {
  className?: string;
}

/**
 * Overview Icon: 4 rounded squares (2x2 grid)
 */
export const OverviewIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect width="6.5" height="6.5" x="3.5" y="3.5" rx="1.8" />
    <rect width="6.5" height="6.5" x="14" y="3.5" rx="1.8" />
    <rect width="6.5" height="6.5" x="14" y="14" rx="1.8" />
    <rect width="6.5" height="6.5" x="3.5" y="14" rx="1.8" />
  </svg>
);

/**
 * Tasks Icon: 3 dots on left, 3 horizontal lines on right (matching Figma exactly)
 */
export const TasksIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <line x1="9.5" x2="20.5" y1="6" y2="6" />
    <line x1="9.5" x2="20.5" y1="12" y2="12" />
    <line x1="9.5" x2="20.5" y1="18" y2="18" />
    <circle cx="4.5" cy="6" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="4.5" cy="12" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="4.5" cy="18" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

/**
 * Calendar Icon: Outline calendar with 2 top hangers and header separator
 */
export const CalendarIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect width="18" height="17" x="3" y="4.5" rx="3" />
    <line x1="3" x2="21" y1="9.5" y2="9.5" />
    <line x1="8" x2="8" y1="2" y2="5" />
    <line x1="16" x2="16" y1="2" y2="5" />
  </svg>
);

/**
 * Settings Icon: Circle with a center focus dot (matching Figma)
 */
export const SettingsIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
  </svg>
);
