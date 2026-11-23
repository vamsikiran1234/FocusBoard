import React from 'react';
import { Search, ChevronDown, Plus, Filter, Inbox } from 'lucide-react';
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

  const statusTabs: { id: StatusFilter; label: string; count?: number }[] = [
    { id: 'all', label: `All tasks ${stats.total}` },
    { id: 'in-progress', label: 'In progress', count: stats.inProgress },
    { id: 'completed', label: 'Completed', count: stats.completed },
  ];

  return (
    <section className="space-y-4" aria-label="Task Management Section">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            My tasks
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage and track everything in one place.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* View all tasks toggle / shortcut */}
          <button
            onClick={() => {
              setStatusFilter('all');
              setPriorityFilter('all');
              setSearchQuery('');
            }}
            className="text-xs sm:text-sm font-semibold text-brand-600 bg-brand-50 hover:bg-brand-100/80 px-3.5 py-2 rounded-xl transition-colors"
          >
            View all tasks
          </button>

          {/* Mobile floating / inline + button matching mobile mockup */}
          <button
            onClick={openCreateModal}
            className="sm:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-brand-600 text-white shadow-md active:scale-95"
            aria-label="Create new task"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-100 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {statusTabs.map((tab) => {
            const isActive = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                aria-pressed={isActive}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search input & Priority Filter */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 sm:w-60">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Find a task..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50/70 border border-slate-200/80 focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 transition-all outline-none"
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
              className="appearance-none pl-3.5 pr-8 py-2 bg-slate-50/70 border border-slate-200/80 focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 transition-all cursor-pointer outline-none"
              aria-label="Filter tasks by priority"
            >
              <option value="all">Priority: All</option>
              <option value="high">Priority: High</option>
              <option value="medium">Priority: Medium</option>
              <option value="low">Priority: Low</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
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
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              Clear filters
            </button>
            <button
              onClick={openCreateModal}
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white transition-colors"
            >
              Create new task
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
