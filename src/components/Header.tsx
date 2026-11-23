import React from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

interface HeaderProps {
  currentTabName?: string;
}

export const Header: React.FC<HeaderProps> = ({ currentTabName = 'Overview' }) => {
  const { openCreateModal } = useTasks();

  return (
    <header className="w-full bg-white/70 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 px-4 sm:px-8 py-4 flex items-center justify-between">
      {/* Breadcrumb Navigation on Desktop */}
      <div className="flex items-center gap-2 text-sm">
        <div className="lg:hidden flex items-center gap-2 mr-3">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white shadow-xs">
            <div className="grid grid-cols-2 gap-1 p-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            </div>
          </div>
          <span className="font-bold text-slate-900 text-base">FocusBoard</span>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <span className="text-slate-400 font-medium">Workspace</span>
          <span className="text-slate-300 font-normal">/</span>
          <span className="text-slate-900 font-semibold">{currentTabName}</span>
        </div>
      </div>

      {/* User Avatar & Quick Actions */}
      <div className="flex items-center gap-3">
        {/* Mobile New Task Shortcut in Header */}
        <button
          onClick={openCreateModal}
          className="md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-brand-600 text-white shadow-sm"
          aria-label="Create new task"
        >
          <Plus className="w-4 h-4" />
        </button>

        {/* User Profile Pill */}
        <div className="flex items-center gap-2 pl-2">
          <div
            className="w-9 h-9 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-700 text-xs font-bold tracking-tight cursor-pointer hover:bg-brand-100 transition-colors"
            title="Logged in as John Doe"
            tabIndex={0}
            role="button"
            aria-label="User profile John Doe"
          >
            JD
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
        </div>
      </div>
    </header>
  );
};
