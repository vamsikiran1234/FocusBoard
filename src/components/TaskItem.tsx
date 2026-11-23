import React, { useState, useRef, useEffect } from 'react';
import {
  Calendar,
  MoreHorizontal,
  Check,
  Edit3,
  Trash2,
  Clock,
  CheckCircle2,
  ListTodo,
} from 'lucide-react';
import { Task, TaskStatus } from '../types';
import { useTasks } from '../context/TaskContext';
import { formatDueDate } from '../utils/dateUtils';
import { CategoryBadge, PriorityBadge } from './TaskBadge';

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTaskStatus, setTaskStatus, openEditModal, openDeleteModal } = useTasks();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const isCompleted = task.status === 'completed';

  const handleStatusSelect = (status: TaskStatus) => {
    setTaskStatus(task.id, status);
    setIsMenuOpen(false);
  };

  return (
    <article
      className="group bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-subtle hover:shadow-card hover:border-slate-200 transition-all duration-200"
      aria-label={`Task: ${task.title}`}
    >
      {/* Desktop Layout */}
      <div className="hidden sm:flex items-center justify-between gap-4">
        {/* Left: Checkbox + Title & Subtitle */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          {/* Status Checkbox Button */}
          <button
            type="button"
            onClick={() => toggleTaskStatus(task.id)}
            className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
              isCompleted
                ? 'bg-emerald-500 text-white shadow-xs'
                : 'border-2 border-slate-200 hover:border-brand-500 bg-white group-hover:bg-slate-50'
            }`}
            aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
            title={isCompleted ? 'Completed (Click to uncomplete)' : 'Click to complete'}
          >
            {isCompleted && <Check className="w-4 h-4 stroke-[3]" />}
          </button>

          {/* Title & Project Subtitle */}
          <div className="min-w-0 flex-1">
            <h3
              className={`text-sm sm:text-base font-bold text-slate-900 truncate transition-colors ${
                isCompleted ? 'line-through text-slate-400' : 'text-slate-800'
              }`}
            >
              {task.title}
            </h3>
            <p className="text-xs text-slate-400 truncate mt-0.5">
              {task.projectSubtitle || task.description}
            </p>
          </div>
        </div>

        {/* Right: Badges, Due Date & Menu */}
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          <CategoryBadge category={task.category} />
          <PriorityBadge priority={task.priority} />

          {/* Due date */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium min-w-[70px]">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{formatDueDate(task.dueDate)}</span>
          </div>

          {/* Actions Dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="More task actions"
              aria-expanded={isMenuOpen}
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {isMenuOpen && (
              <div
                className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-floating border border-slate-100 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-100"
                role="menu"
              >
                <button
                  onClick={() => {
                    openEditModal(task);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  role="menuitem"
                >
                  <Edit3 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Edit task</span>
                </button>

                <div className="h-px bg-slate-100 my-1" />

                <div className="px-3.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Set status
                </div>

                <button
                  onClick={() => handleStatusSelect('to-do')}
                  className={`w-full text-left px-3.5 py-1.5 text-xs font-medium flex items-center gap-2 ${
                    task.status === 'to-do'
                      ? 'text-brand-600 bg-brand-50/50'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                  role="menuitem"
                >
                  <ListTodo className="w-3.5 h-3.5" />
                  <span>To do</span>
                </button>

                <button
                  onClick={() => handleStatusSelect('in-progress')}
                  className={`w-full text-left px-3.5 py-1.5 text-xs font-medium flex items-center gap-2 ${
                    task.status === 'in-progress'
                      ? 'text-sky-600 bg-sky-50/50'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                  role="menuitem"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>In progress</span>
                </button>

                <button
                  onClick={() => handleStatusSelect('completed')}
                  className={`w-full text-left px-3.5 py-1.5 text-xs font-medium flex items-center gap-2 ${
                    task.status === 'completed'
                      ? 'text-emerald-600 bg-emerald-50/50'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                  role="menuitem"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Completed</span>
                </button>

                <div className="h-px bg-slate-100 my-1" />

                <button
                  onClick={() => {
                    openDeleteModal(task);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                  role="menuitem"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                  <span>Delete task</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Card Layout (Figma Mobile 390px format) */}
      <div className="sm:hidden flex flex-col gap-3">
        {/* Top row: Checkbox, Title & Menu */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <button
              type="button"
              onClick={() => toggleTaskStatus(task.id)}
              className={`w-6 h-6 rounded-lg flex items-center justify-center mt-0.5 transition-all flex-shrink-0 ${
                isCompleted
                  ? 'bg-emerald-500 text-white'
                  : 'border-2 border-slate-200 bg-white'
              }`}
              aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {isCompleted && <Check className="w-4 h-4 stroke-[3]" />}
            </button>

            <div className="min-w-0 flex-1">
              <h3
                className={`text-sm font-bold text-slate-900 ${
                  isCompleted ? 'line-through text-slate-400' : ''
                }`}
              >
                {task.title}
              </h3>
              <p className="text-xs text-slate-400 truncate mt-0.5">
                {task.projectSubtitle || task.description}
              </p>
            </div>
          </div>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              aria-label="More task actions"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {isMenuOpen && (
              <div
                className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-floating border border-slate-100 py-1.5 z-30"
                role="menu"
              >
                <button
                  onClick={() => {
                    openEditModal(task);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <Edit3 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Edit task</span>
                </button>
                <button
                  onClick={() => {
                    openDeleteModal(task);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                  <span>Delete task</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom row: Category badge, Priority badge, Due date */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-50">
          <div className="flex items-center gap-2">
            <CategoryBadge category={task.category} />
            <PriorityBadge priority={task.priority} />
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{formatDueDate(task.dueDate)}</span>
          </div>
        </div>
      </div>
    </article>
  );
};
