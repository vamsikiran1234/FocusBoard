import React from 'react';
import {
  LayoutGrid,
  ListTodo,
  Calendar,
  Settings,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onTabChange }) => {
  const { resetToDefaultData, stats } = useTasks();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'tasks', label: 'My tasks', icon: ListTodo, badge: stats.total },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-100 min-h-screen px-6 py-7 select-none flex-shrink-0"
      aria-label="Main Navigation"
    >
      {/* Brand Logo */}
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
          <div className="grid grid-cols-2 gap-1.5 p-1.5">
            <span className="w-2 h-2 rounded-full bg-white"></span>
            <span className="w-2 h-2 rounded-full bg-white"></span>
            <span className="w-2 h-2 rounded-full bg-white"></span>
            <span className="w-2 h-2 rounded-full bg-white"></span>
          </div>
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">
          FocusBoard
        </span>
      </div>

      {/* Navigation Group */}
      <div className="space-y-1">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-3">
          Workspace
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brand-50 text-brand-600 font-semibold shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-brand-600' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-brand-100 text-brand-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Quick Productivity Card / Seed Reset */}
      <div className="mt-auto pt-6 border-t border-slate-100 space-y-4">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100/80">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span>Focus Mode</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            {stats.completed} of {stats.total} tasks completed ({stats.completionPercentage}%).
          </p>
        </div>

        <button
          onClick={resetToDefaultData}
          title="Reset to initial Figma sample tasks"
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset sample data</span>
        </button>
      </div>
    </aside>
  );
};
