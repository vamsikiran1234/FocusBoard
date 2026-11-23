import React, { useEffect } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

export const DeleteModal: React.FC = () => {
  const { taskToDelete, closeDeleteModal, confirmDeleteTask } = useTasks();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && taskToDelete) {
        closeDeleteModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [taskToDelete, closeDeleteModal]);

  if (!taskToDelete) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
    >
      <div
        className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-slate-100 p-6 sm:p-7 transform animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <button
            onClick={closeDeleteModal}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <h3
          id="delete-dialog-title"
          className="text-lg sm:text-xl font-bold text-slate-900 mb-2"
        >
          Delete task?
        </h3>

        <p className="text-sm text-slate-500 leading-relaxed mb-6">
          Are you sure you want to delete{' '}
          <strong className="text-slate-800 font-semibold">"{taskToDelete.title}"</strong>?
          This action will permanently remove it from your task list and cannot be undone.
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={closeDeleteModal}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={confirmDeleteTask}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-98 text-xs sm:text-sm font-semibold text-white shadow-md shadow-rose-500/20 flex items-center gap-2 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete task</span>
          </button>
        </div>
      </div>
    </div>
  );
};
