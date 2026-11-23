import React, { useState, useEffect } from 'react';
import { TaskProvider, useTasks } from './context/TaskContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { MobileBottomNav } from './components/MobileBottomNav';
import { FocusCarousel } from './components/FocusCarousel';
import { StatCards } from './components/StatCards';
import { TaskList } from './components/TaskList';
import { TaskModal } from './components/TaskModal';
import { DeleteModal } from './components/DeleteModal';
import { Toast } from './components/Toast';
import { ShortcutsModal } from './components/ShortcutsModal';

const DashboardContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('overview');
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  const {
    openCreateModal,
    isCreateModalOpen,
    closeCreateModal,
    editingTask,
    closeEditModal,
    setSlide,
  } = useTasks();

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement?.tagName || '').toLowerCase();
      if (['input', 'textarea', 'select'].includes(activeTag)) {
        return;
      }

      if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
      } else if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        openCreateModal();
      } else if (e.key === '/') {
        e.preventDefault();
        const searchInput = document.querySelector<HTMLInputElement>('input[placeholder*="task"]');
        searchInput?.focus();
      } else if (['1', '2', '3'].includes(e.key)) {
        setSlide(parseInt(e.key, 10) - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openCreateModal, setSlide]);

  const tabTitles: Record<string, string> = {
    overview: 'Overview',
    tasks: 'My tasks',
    calendar: 'Calendar',
    settings: 'Settings',
  };

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      {/* Left Sidebar for Desktop */}
      <Sidebar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header currentTabName={tabTitles[currentTab] || 'Overview'} />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 pb-32 lg:pb-12">
          {/* Top Page Header (Desktop & Mobile) */}
          <div className="flex items-start sm:items-center justify-between gap-4">
            <div>
              <h1
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.15]"
                aria-label="Your work, in focus."
              >
                <span className="sm:hidden">Your work,<br />in focus.</span>
                <span className="hidden sm:inline">Your work, in focus.</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                <span className="sm:hidden">Stay organized and keep moving forward.</span>
                <span className="hidden sm:inline">Plan your day, stay organized, and celebrate small wins.</span>
              </p>
            </div>

            {/* Desktop New Task Button (Exact Figma Spec: 171x46, #6457F5) */}
            <button
              onClick={openCreateModal}
              className="hidden sm:inline-flex items-center justify-center w-[171px] h-[46px] rounded-2xl bg-[#6457F5] hover:bg-[#5547EB] active:scale-98 text-sm font-semibold text-white shadow-sm transition-all cursor-pointer"
            >
              New task
            </button>
          </div>

          {/* Focus Notes Carousel Banner (All 3 Figma Slides) */}
          <FocusCarousel />

          {/* Overview Statistics Cards */}
          <StatCards />

          {/* My Tasks Section (Tabs, Filter, Search, Rows/Cards) */}
          <TaskList />
        </main>

        {/* Mobile Fixed Bottom Navigation Bar */}
        <MobileBottomNav currentTab={currentTab} onTabChange={setCurrentTab} />
      </div>

      {/* Modals & Overlay Alerts */}
      <TaskModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
      />
      <TaskModal
        isOpen={!!editingTask}
        onClose={closeEditModal}
        taskToEdit={editingTask}
      />
      <DeleteModal />
      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <TaskProvider>
      <DashboardContent />
    </TaskProvider>
  );
}
