import React from 'react';
import { TaskCategory, TaskPriority } from '../types';

interface CategoryBadgeProps {
  category: TaskCategory;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
  const styles: Record<TaskCategory, string> = {
    Design: 'bg-[#F0EEFF] text-[#6457F5]',
    Development: 'bg-[#F0EEFF] text-[#6457F5]',
    Content: 'bg-[#F0EEFF] text-[#6457F5]',
    Research: 'bg-[#FFF9EB] text-[#B45309]',
    Marketing: 'bg-[#FDF2F8] text-[#BE185D]',
    Operations: 'bg-slate-100 text-slate-600',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-xl text-xs font-semibold tracking-tight ${styles[category] || styles.Design}`}
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
      bg: 'bg-[#FFF4ED] text-[#E06D14]',
      label: 'High',
    },
    medium: {
      bg: 'bg-[#EDFDF5] text-[#0F9755]',
      label: 'Medium',
    },
    low: {
      bg: 'bg-slate-100 text-slate-600',
      label: 'Low',
    },
  };

  const current = styles[priority] || styles.medium;

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-xl text-xs font-semibold tracking-tight ${current.bg}`}
    >
      {current.label}
    </span>
  );
};
