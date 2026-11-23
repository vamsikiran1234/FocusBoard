import React from 'react';
import { useTasks } from '../context/TaskContext';

// 1. Total Tasks Bullet List Icon (Figma exact: 3 dots + 3 lines)
const TotalTasksIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
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
    <line x1="9" x2="20" y1="6" y2="6" />
    <line x1="9" x2="20" y1="12" y2="12" />
    <line x1="9" x2="20" y1="18" y2="18" />
    <circle cx="4" cy="6" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="4" cy="12" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="4" cy="18" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

// 2. In Progress Clock Icon (Figma exact: round clock with clean hands)
const InProgressIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
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
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15.5 13.5" />
  </svg>
);

// 3. Completed Checkmark Icon (Figma exact: crisp bold green checkmark)
const CompletedIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const StatCards: React.FC = () => {
  const { stats } = useTasks();

  const desktopCards = [
    {
      id: 'total',
      label: 'Total tasks',
      count: stats.total,
      subtitle: 'Across all projects',
      icon: TotalTasksIcon,
      iconContainer: 'bg-[#F0EEFF] text-[#6457F5]',
    },
    {
      id: 'in-progress',
      label: 'In progress',
      count: stats.inProgress,
      subtitle: 'Keep the momentum',
      icon: InProgressIcon,
      iconContainer: 'bg-[#E0F2FE] text-[#0284C7]',
    },
    {
      id: 'completed',
      label: 'Completed',
      count: stats.completed,
      subtitle: 'Great work this week',
      icon: CompletedIcon,
      iconContainer: 'bg-[#E6F9F0] text-[#059669]',
    },
  ];

  const mobileCards = [
    {
      id: 'total',
      label: 'Total tasks',
      count: stats.total,
      icon: TotalTasksIcon,
      iconContainer: 'bg-[#F0EEFF] text-[#6457F5]',
    },
    {
      id: 'completed',
      label: 'Completed',
      count: stats.completed,
      icon: CompletedIcon,
      iconContainer: 'bg-[#E6F9F0] text-[#059669]',
    },
  ];

  return (
    <section aria-label="Overview Statistics">
      {/* Mobile Heading */}
      <h2 className="sm:hidden text-xl font-bold text-slate-900 mb-3 tracking-tight">
        Overview
      </h2>

      {/* Mobile 2-Card Layout (Exact Figma 390px spec) */}
      <div className="grid grid-cols-2 gap-3 sm:hidden">
        {mobileCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-subtle flex flex-col justify-between"
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mb-3 ${card.iconContainer}`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  {card.count}
                </span>
                <span className="text-[12px] font-medium text-slate-500">
                  {card.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop 3-Card Layout */}
      <div className="hidden sm:grid grid-cols-3 gap-5">
        {desktopCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-subtle flex flex-col justify-between transition-all hover:shadow-card"
            >
              {/* Top row: Icon container + Label */}
              <div className="flex items-center gap-3.5 mb-4">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${card.iconContainer}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-slate-500">
                  {card.label}
                </span>
              </div>

              {/* Bottom: Number + Subtitle */}
              <div>
                <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {card.count}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {card.subtitle}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
