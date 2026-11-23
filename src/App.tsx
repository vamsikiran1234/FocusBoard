import React, { useState } from 'react';
import { Plus } from 'lucide-react';
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

const DashboardContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('overview');
  const {
    openCreateModal,
    isCreateModalOpen,
    closeCreateModal,
    editingTask,
    closeEditModal,
  } = useTasks();

  const tabTitles: Record<string, string> = {
    overview: 'Overview',
    tasks: 'My tasks',
    calendar: 'Calendar',
    settings: 'Settings',
  };

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      {/* Left Sidebar for Desktop */}
      <Sidebar currentTab={currentTab} onTabChange={setCurrentTab} />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header currentTabName={tabTitles[currentTab] || 'Overview'} />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 pb-28 lg:pb-12">
          {/* Top Page Header (Desktop & Mobile) */}
          <div className="flex items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
                Your work, in focus.
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Plan your day, stay organized, and celebrate small wins.
              </p>
            </div>

            {/* Desktop New Task Button */}
            <button
              onClick={openCreateModal}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 active:scale-98 text-sm font-semibold text-white shadow-md shadow-brand-500/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>New task</span>
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
