import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

export const Toast: React.FC = () => {
  const { toast, hideToast } = useTasks();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />,
    info: <Info className="w-4 h-4 text-brand-500 flex-shrink-0" />,
  };

  return (
    <div
      className="fixed bottom-20 sm:bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-floating border border-slate-800 animate-in fade-in slide-in-from-bottom-5 duration-200"
      role="status"
      aria-live="polite"
    >
      {icons[toast.type]}
      <span className="text-xs sm:text-sm font-medium">{toast.message}</span>
      <button
        onClick={hideToast}
        className="ml-2 text-slate-400 hover:text-white transition-colors"
        aria-label="Close notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
