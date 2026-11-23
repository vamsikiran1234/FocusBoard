import React from 'react';
import { ChevronDown, Plus, Filter, Inbox } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { PriorityFilter, StatusFilter } from '../types';
import { TaskItem } from './TaskItem';

export const TaskList: React.FC = () => {
  const {
    filteredTasks,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    openCreateModal,
    stats,
  } = useTasks();

  const statusTabs: { id: StatusFilter; desktopLabel: string; mobileLabel: string }[] = [
    { id: 'all', desktopLabel: `All tasks ${stats.total}`, mobileLabel: `All ${stats.total}` },
    { id: 'in-progress', desktopLabel: 'In progress', mobileLabel: 'In progress' },
    { id: 'completed', desktopLabel: 'Completed', mobileLabel: 'Completed' },
  ];

  return (
    <section className="space-y-4" aria-label="Task Management Section">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            My tasks
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 sm:text-slate-500 mt-0.5">
            <span className="sm:hidden">Your priorities for this week</span>
            <span className="hidden sm:inline">Manage and track everything in one place.</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Desktop "View all tasks" shortcut */}
          <button
            onClick={() => {
              setStatusFilter('all');
              setPriorityFilter('all');
              setSearchQuery('');
            }}
            className="hidden sm:inline-flex text-xs sm:text-sm font-semibold text-brand-600 bg-brand-50 hover:bg-brand-100/80 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
          >
            View all tasks
          </button>

          {/* Mobile + Button matching Figma mobile (w-11 h-11 rounded-2xl bg-[#6457F5]) */}
          <button
            onClick={openCreateModal}
            className="sm:hidden flex items-center justify-center w-11 h-11 rounded-2xl bg-[#6457F5] text-white shadow-md active:scale-95 cursor-pointer"
            aria-label="Create new task"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Mobile Search Input (Full width card matching Figma mobile) */}
      <div className="sm:hidden relative w-full">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          aria-hidden="true"
        >
          <circle cx="10.5" cy="10.5" r="5.5" />
          <line x1="14.5" x2="19.5" y1="14.5" y2="19.5" />
        </svg>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200/80 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-2xl text-sm text-slate-900 placeholder:text-slate-400 shadow-subtle outline-none transition-all"
          aria-label="Search tasks"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 px-1"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {/* Mobile Status Tabs (3-pill row matching Figma mobile) */}
      <div className="sm:hidden grid grid-cols-3 gap-2 w-full">
        {statusTabs.map((tab) => {
          const isActive = statusFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`py-2 px-2 text-center rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#F0EEFF] text-[#6457F5] shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-100/80 shadow-subtle'
              }`}
              aria-pressed={isActive}
            >
              {tab.mobileLabel}
            </button>
          );
        })}
      </div>

      {/* Desktop Filter and Search Bar Card */}
      <div className="hidden sm:flex bg-white rounded-2xl p-3 sm:p-4 border border-slate-100 shadow-subtle flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Desktop Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {statusTabs.map((tab) => {
            const isActive = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                aria-pressed={isActive}
              >
                {tab.desktopLabel}
              </button>
            );
          })}
        </div>

        {/* Desktop Search input & Priority Filter */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 sm:w-64">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            >
              <circle cx="10.5" cy="10.5" r="5.5" />
              <line x1="14.5" x2="19.5" y1="14.5" y2="19.5" />
            </svg>
            <input
              type="text"
              placeholder="Find a task..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 sm:py-2.5 bg-slate-50/80 border border-slate-200/80 focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 transition-all outline-none"
              aria-label="Search tasks by title, description, or category"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 px-1"
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          {/* Priority Dropdown */}
          <div className="relative flex-shrink-0">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as PriorityFilter)}
              className="appearance-none pl-3.5 pr-8 py-2 sm:py-2.5 bg-slate-50/80 border border-slate-200/80 focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl text-xs sm:text-sm font-bold text-slate-900 hover:text-slate-950 transition-all cursor-pointer outline-none"
              aria-label="Filter tasks by priority"
            >
              <option value="all" className="font-bold">Priority: All</option>
              <option value="high" className="font-bold">Priority: High</option>
              <option value="medium" className="font-bold">Priority: Medium</option>
              <option value="low" className="font-bold">Priority: Low</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
          </div>
        </div>
      </div>

      {/* Task List Items */}
      {filteredTasks.length > 0 ? (
        <div className="space-y-2.5 sm:space-y-3">
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-10 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-3">
            {searchQuery || priorityFilter !== 'all' || statusFilter !== 'all' ? (
              <Filter className="w-6 h-6" />
            ) : (
              <Inbox className="w-6 h-6" />
            )}
          </div>
          <h3 className="text-base font-bold text-slate-800 mb-1">
            No matching tasks found
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mb-4">
            {searchQuery
              ? `No tasks match the search term "${searchQuery}". Try a different keyword or reset filters.`
              : 'You have no tasks matching the selected filters.'}
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setPriorityFilter('all');
              }}
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            >
              Clear filters
            </button>
            <button
              onClick={openCreateModal}
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white transition-colors cursor-pointer"
            >
              Create new task
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
