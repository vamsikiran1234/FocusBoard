import React from 'react';
import { Sparkles, RotateCcw, Download, Keyboard } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { Logo } from './Logo';
import {
  OverviewIcon,
  TasksIcon,
  CalendarIcon,
  SettingsIcon,
} from './NavIcons';

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onOpenShortcuts?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onTabChange, onOpenShortcuts }) => {
  const { resetToDefaultData, exportTasksAsJSON, stats } = useTasks();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: OverviewIcon },
    { id: 'tasks', label: 'My tasks', icon: TasksIcon },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <aside
      className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-100 min-h-screen select-none flex-shrink-0"
      aria-label="Main Navigation"
    >
      {/* Brand Logo Header - Generous top spacing, no bottom line */}
      <div className="h-[84px] flex items-center px-6 pt-3 flex-shrink-0">
        <Logo size={40} />
      </div>

      {/* Navigation Group & Body */}
      <div className="flex-1 flex flex-col justify-between px-6 py-6">
        <div className="space-y-2">
          <div className="text-[12px] font-bold uppercase tracking-wider text-slate-400 px-3.5 mb-3">
            Workspace
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-[15px] font-medium transition-all ${
                    isActive
                      ? 'bg-brand-50 text-brand-600 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors flex-shrink-0 ${
                      isActive ? 'text-brand-600' : 'text-slate-400'
                    }`}
                  />
                  <span className="tracking-tight">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Productivity Card / Seed Reset */}
        <div className="pt-6 border-t border-slate-100 space-y-4">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100/80">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              <span>Focus Mode</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              {stats.completed} of {stats.total} tasks completed ({stats.completionPercentage}%).
            </p>
          </div>

          <div className="space-y-1">
            <button
              onClick={exportTasksAsJSON}
              title="Export all tasks to a JSON file"
              className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Download className="w-3.5 h-3.5 text-slate-400" />
                <span>Export JSON</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">.json</span>
            </button>

            {onOpenShortcuts && (
              <button
                onClick={onOpenShortcuts}
                title="Keyboard Shortcuts"
                className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Keyboard className="w-3.5 h-3.5 text-slate-400" />
                  <span>Shortcuts</span>
                </span>
                <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-mono text-slate-500">?</kbd>
              </button>
            )}

            <button
              onClick={resetToDefaultData}
              title="Reset to initial Figma sample tasks"
              className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset sample data</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
