import React, { useEffect } from 'react';
import { X, Keyboard, Command } from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
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

  const shortcuts = [
    { key: 'N', description: 'Create a new task' },
    { key: '/', description: 'Focus search bar' },
    { key: '1, 2, 3', description: 'Switch Focus Notes slide' },
    { key: '?', description: 'Show keyboard shortcuts' },
    { key: 'Esc', description: 'Close modal or dropdown' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-[480px] shadow-2xl border border-slate-100 overflow-hidden transform animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Keyboard className="w-4 h-4" />
            </div>
            <div>
              <h2 id="shortcuts-modal-title" className="text-base font-bold text-slate-900">
                Keyboard Shortcuts
              </h2>
              <p className="text-xs text-slate-400">Power-user navigation hotkeys</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Shortcuts List */}
        <div className="p-6 divide-y divide-slate-100">
          {shortcuts.map((item) => (
            <div key={item.key} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">{item.description}</span>
              <div className="flex items-center gap-1">
                {item.key.split(', ').map((k) => (
                  <kbd
                    key={k}
                    className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-700 shadow-xs"
                  >
                    {k}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Command className="w-3.5 h-3.5" /> Quick tip: Press <kbd className="font-mono text-slate-600">?</kbd> anywhere to open
          </span>
          <button
            onClick={onClose}
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
