import React from 'react';
import { ListTodo, Clock, Check } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

export const StatCards: React.FC = () => {
  const { stats } = useTasks();

  const cards = [
    {
      id: 'total',
      label: 'Total tasks',
      count: stats.total,
      subtitle: 'Across all projects',
      icon: ListTodo,
      iconBg: 'bg-brand-50 text-brand-600',
    },
    {
      id: 'in-progress',
      label: 'In progress',
      count: stats.inProgress,
      subtitle: 'Keep the momentum',
      icon: Clock,
      iconBg: 'bg-sky-50 text-sky-600',
    },
    {
      id: 'completed',
      label: 'Completed',
      count: stats.completed,
      subtitle: 'Great work this week',
      icon: Check,
      iconBg: 'bg-emerald-50 text-emerald-600',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5" aria-label="Overview Statistics">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        // On very small mobile screens, the third card ("In progress") can span 2 cols or be hidden if matching mobile Figma 2-col exactly
        const isThirdCard = idx === 1; // In progress is card 2
        return (
          <div
            key={card.id}
            className={`bg-white rounded-2xl p-5 border border-slate-100 shadow-subtle flex flex-col justify-between transition-all hover:shadow-card ${
              isThirdCard ? 'col-span-2 md:col-span-1' : 'col-span-1'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${card.iconBg}`}
              >
                <Icon className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-slate-500">
                {card.label}
              </span>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {card.count}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-400 mt-1">
                {card.subtitle}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
