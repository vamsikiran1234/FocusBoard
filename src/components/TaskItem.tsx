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
  const desktopMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const clickedInsideDesktop = desktopMenuRef.current?.contains(target);
      const clickedInsideMobile = mobileMenuRef.current?.contains(target);
      if (!clickedInsideDesktop && !clickedInsideMobile) {
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
        <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
          {/* Status Checkbox Button - Figma squircle with inner outline or checkmark */}
          <button
            type="button"
            onClick={() => toggleTaskStatus(task.id)}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center transition-all duration-200 flex-shrink-0 cursor-pointer ${
              isCompleted
                ? 'bg-[#E6F9F0] text-[#059669]'
                : 'bg-[#F0EEFF] text-[#6457F5] hover:bg-[#EAE5FF]'
            }`}
            aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
            title={isCompleted ? 'Completed (Click to uncomplete)' : 'Click to complete'}
          >
            {isCompleted ? (
              <Check className="w-4 h-4 stroke-[2.5]" />
            ) : (
              <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-[5px] border-2 border-[#6457F5]" />
            )}
          </button>

          {/* Title & Project Subtitle with delicate middle dot */}
          <div className="min-w-0 flex-1">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
              {task.title}
            </h3>
            <div className="text-xs text-[#94A3B8] font-normal truncate mt-0.5 flex items-center">
              {task.projectSubtitle?.includes('•') ? (
                <>
                  <span>{task.projectSubtitle.split('•')[0].trim()}</span>
                  <span className="mx-1.5 text-slate-300 font-bold leading-none select-none">·</span>
                  <span>{task.projectSubtitle.split('•')[1].trim()}</span>
                </>
              ) : task.projectSubtitle?.includes('·') ? (
                <>
                  <span>{task.projectSubtitle.split('·')[0].trim()}</span>
                  <span className="mx-1.5 text-slate-300 font-bold leading-none select-none">·</span>
                  <span>{task.projectSubtitle.split('·')[1].trim()}</span>
                </>
              ) : (
                <span>{task.projectSubtitle || task.description}</span>
              )}
            </div>
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
          <div className="relative" ref={desktopMenuRef}>
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
                onMouseDown={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(task);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
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
                  type="button"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusSelect('to-do');
                  }}
                  className={`w-full text-left px-3.5 py-1.5 text-xs font-medium flex items-center gap-2 cursor-pointer ${
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
                  type="button"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusSelect('in-progress');
                  }}
                  className={`w-full text-left px-3.5 py-1.5 text-xs font-medium flex items-center gap-2 cursor-pointer ${
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
                  type="button"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusSelect('completed');
                  }}
                  className={`w-full text-left px-3.5 py-1.5 text-xs font-medium flex items-center gap-2 cursor-pointer ${
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
                  type="button"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    openDeleteModal(task);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
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
              className={`w-7 h-7 rounded-xl flex items-center justify-center mt-0.5 transition-all flex-shrink-0 cursor-pointer ${
                isCompleted
                  ? 'bg-[#E6F9F0] text-[#059669]'
                  : 'bg-[#F0EEFF] text-[#6457F5]'
              }`}
              aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {isCompleted ? (
                <Check className="w-4 h-4 stroke-[2.5]" />
              ) : (
                <span className="w-3.5 h-3.5 rounded-[5px] border-2 border-[#6457F5]" />
              )}
            </button>

            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-bold text-slate-900 leading-tight">
                {task.title}
              </h3>
              <div className="text-xs text-[#94A3B8] font-normal truncate mt-0.5">
                {task.projectSubtitle?.includes('•')
                  ? task.projectSubtitle.split('•')[0].trim()
                  : task.projectSubtitle?.includes('·')
                  ? task.projectSubtitle.split('·')[0].trim()
                  : task.projectSubtitle || task.description}
              </div>
            </div>
          </div>

          <div className="relative" ref={mobileMenuRef}>
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
                onMouseDown={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(task);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Edit task</span>
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    openDeleteModal(task);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                  <span>Delete task</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom row: Category badge, Priority badge, Due date (Grouped on left matching Figma mobile) */}
        <div className="flex items-center gap-2 pt-0.5">
          <CategoryBadge category={task.category} />
          <PriorityBadge priority={task.priority} />

          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium ml-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{formatDueDate(task.dueDate)}</span>
          </div>
        </div>
      </div>
    </article>
  );
};
