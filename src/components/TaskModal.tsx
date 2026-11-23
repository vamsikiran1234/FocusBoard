import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, ChevronDown, AlertCircle } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { Task, TaskPriority, TaskStatus } from '../types';
import { getTodayDateString } from '../utils/dateUtils';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskToEdit?: Task | null;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  taskToEdit,
}) => {
  const { addTask, updateTask } = useTasks();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('to-do');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState<string | null>(null);

  const titleInputRef = useRef<HTMLInputElement>(null);

  // Sync form when opening or editing
  useEffect(() => {
    if (isOpen) {
      if (taskToEdit) {
        setTitle(taskToEdit.title);
        setDescription(taskToEdit.description || '');
        setStatus(taskToEdit.status);
        setPriority(taskToEdit.priority);
        setDueDate(taskToEdit.dueDate || '');
      } else {
        setTitle('');
        setDescription('');
        setStatus('to-do');
        setPriority('medium');
        setDueDate('');
      }
      setError(null);

      // Auto-focus input on modal open
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 60);
    }
  }, [isOpen, taskToEdit]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Task title is required.');
      titleInputRef.current?.focus();
      return;
    }

    const finalDueDate = dueDate.trim() || getTodayDateString();

    if (taskToEdit) {
      updateTask(taskToEdit.id, {
        title: title.trim(),
        description: description.trim(),
        status,
        priority,
        dueDate: finalDueDate,
      });
    } else {
      addTask({
        title: title.trim(),
        description: description.trim(),
        category: 'Design',
        status,
        priority,
        dueDate: finalDueDate,
        projectSubtitle: `Due soon`,
      });
    }

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-modal-title"
      onClick={onClose}
    >
      {/* Modal Dialog matching Figma 760 x 822 */}
      <div
        className="bg-white rounded-3xl w-full max-w-[660px] shadow-2xl border border-slate-100 overflow-hidden transform animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 sm:px-9 pt-7 pb-5 flex items-start justify-between border-b border-slate-100">
          <div>
            <h2
              id="task-modal-title"
              className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight"
            >
              {taskToEdit ? 'Edit task' : 'Create new task'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {taskToEdit
                ? 'Update your task details and progress.'
                : 'Add your task details to stay on top of your work.'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body - Exactly matches Figma Frame 1:279 */}
        <form onSubmit={handleSubmit} className="px-6 sm:px-9 py-6 space-y-5 overflow-y-auto">
          {/* Task Title * */}
          <div>
            <label
              htmlFor="task-title"
              className="block text-xs sm:text-sm font-bold text-slate-800 mb-2"
            >
              Task title <span className="text-brand-600">*</span>
            </label>
            <input
              ref={titleInputRef}
              id="task-title"
              type="text"
              placeholder="e.g. Update pricing page"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError(null);
              }}
              className={`w-full px-4 py-3 bg-white border rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                error
                  ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                  : 'border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20'
              }`}
              aria-invalid={!!error}
              aria-describedby={error ? 'title-error' : undefined}
            />
            {error && (
              <p
                id="title-error"
                className="flex items-center gap-1.5 text-xs text-rose-500 font-medium mt-1.5 animate-in fade-in"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                {error}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="task-desc"
              className="block text-xs sm:text-sm font-bold text-slate-800 mb-2"
            >
              Description
            </label>
            <textarea
              id="task-desc"
              rows={4}
              placeholder="Add notes about this task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none resize-none transition-all"
            />
          </div>

          {/* Status & Priority Row (2 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Status */}
            <div>
              <label
                htmlFor="task-status"
                className="block text-xs sm:text-sm font-bold text-slate-800 mb-2"
              >
                Status
              </label>
              <div className="relative">
                <select
                  id="task-status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as TaskStatus)}
                  className="w-full appearance-none px-4 py-3 bg-white border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl text-sm font-medium text-slate-800 cursor-pointer outline-none transition-all"
                >
                  <option value="to-do">To do</option>
                  <option value="in-progress">In progress</option>
                  <option value="completed">Completed</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Priority */}
            <div>
              <label
                htmlFor="task-priority"
                className="block text-xs sm:text-sm font-bold text-slate-800 mb-2"
              >
                Priority
              </label>
              <div className="relative">
                <select
                  id="task-priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as TaskPriority)}
                  className="w-full appearance-none px-4 py-3 bg-white border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl text-sm font-medium text-slate-800 cursor-pointer outline-none transition-all"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Due date with placeholder DD / MM / YYYY and no right-side browser icon */}
          <div>
            <label
              htmlFor="task-due-date"
              className="block text-xs sm:text-sm font-bold text-slate-800 mb-2"
            >
              Due date
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="task-due-date"
                type={dueDate ? 'date' : 'text'}
                placeholder="DD / MM / YYYY"
                value={dueDate}
                onFocus={(e) => {
                  e.target.type = 'date';
                  try {
                    e.target.showPicker?.();
                  } catch {}
                }}
                onBlur={(e) => {
                  if (!e.target.value) {
                    e.target.type = 'text';
                  }
                }}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none transition-all cursor-pointer"
              />
            </div>
          </div>

          <p className="text-xs text-slate-400 pt-1">* Required field</p>

          {/* Action Buttons with subtle top border */}
          <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-7 py-2.5 rounded-xl bg-[#6457F5] hover:bg-[#5547EB] active:scale-98 text-sm font-semibold text-white shadow-sm transition-all cursor-pointer"
            >
              {taskToEdit ? 'Save changes' : 'Create task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
