import React from 'react';
import { TaskCategory, TaskPriority } from '../types';

interface CategoryBadgeProps {
  category: TaskCategory;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
  const styles: Record<TaskCategory, string> = {
    Design: 'bg-indigo-50 text-indigo-600 border border-indigo-100/60',
    Development: 'bg-violet-50 text-violet-600 border border-violet-100/60',
    Content: 'bg-purple-50 text-purple-600 border border-purple-100/60',
    Research: 'bg-amber-50 text-amber-700 border border-amber-100/60',
    Marketing: 'bg-pink-50 text-pink-600 border border-pink-100/60',
    Operations: 'bg-slate-50 text-slate-600 border border-slate-200/60',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-tight ${styles[category] || styles.Design}`}
    >
      {category}
    </span>
  );
};

interface PriorityBadgeProps {
  priority: TaskPriority;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const styles: Record<TaskPriority, { bg: string; label: string }> = {
    high: {
      bg: 'bg-amber-50 text-amber-700 border border-amber-100',
      label: 'High',
    },
    medium: {
      bg: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
      label: 'Medium',
    },
    low: {
      bg: 'bg-slate-100 text-slate-600 border border-slate-200/60',
      label: 'Low',
    },
  };

  const current = styles[priority] || styles.medium;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-tight ${current.bg}`}
    >
      {current.label}
    </span>
  );
};
