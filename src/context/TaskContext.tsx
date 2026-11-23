import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  Task,
  TaskStatus,
  PriorityFilter,
  StatusFilter,
  TaskStats,
} from '../types';
import { INITIAL_TASKS } from '../data/initialTasks';
import { FOCUS_SLIDES } from '../data/focusSlides';

const STORAGE_KEY = 'focusboard_tasks_v1';
const ALT_STORAGE_KEY = 'focusboard_tasks';

export interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface TaskContextType {
  tasks: Task[];
  filteredTasks: Task[];
  stats: TaskStats;
  
  // Filters & Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: StatusFilter;
  setStatusFilter: (filter: StatusFilter) => void;
  priorityFilter: PriorityFilter;
  setPriorityFilter: (filter: PriorityFilter) => void;
  
  // Carousel State
  activeSlideIndex: number;
  currentSlide: typeof FOCUS_SLIDES[number];
  nextSlide: () => void;
  prevSlide: () => void;
  setSlide: (index: number) => void;
  
  // Task Actions
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  setTaskStatus: (id: string, status: TaskStatus) => void;
  resetToDefaultData: () => void;
  
  // Modal Controls
  isCreateModalOpen: boolean;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  
  editingTask: Task | null;
  openEditModal: (task: Task) => void;
  closeEditModal: () => void;
  
  taskToDelete: Task | null;
  openDeleteModal: (task: Task) => void;
  closeDeleteModal: () => void;
  confirmDeleteTask: () => void;

  // Toast
  toast: ToastNotification | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  hideToast: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. LocalStorage Initialization with Safe Fallback & Eager Seeding
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(ALT_STORAGE_KEY) || localStorage.getItem('tasks');
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
      // Eagerly seed initial tasks into localStorage so DevTools shows data immediately
      const initialJson = JSON.stringify(INITIAL_TASKS);
      localStorage.setItem(STORAGE_KEY, initialJson);
      localStorage.setItem(ALT_STORAGE_KEY, initialJson);
    } catch (err) {
      console.warn('Failed to load tasks from localStorage:', err);
    }
    return INITIAL_TASKS;
  });

  // 2. Persist to LocalStorage on updates
  useEffect(() => {
    try {
      const json = JSON.stringify(tasks);
      localStorage.setItem(STORAGE_KEY, json);
      localStorage.setItem(ALT_STORAGE_KEY, json);
    } catch (err) {
      console.error('Failed to save tasks to localStorage:', err);
    }
  }, [tasks]);

  // 3. Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all');

  // 4. Carousel State
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveSlideIndex((prev) => (prev + 1) % FOCUS_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveSlideIndex((prev) => (prev - 1 + FOCUS_SLIDES.length) % FOCUS_SLIDES.length);
  }, []);

  const setSlide = useCallback((index: number) => {
    if (index >= 0 && index < FOCUS_SLIDES.length) {
      setActiveSlideIndex(index);
    }
  }, []);

  const currentSlide = FOCUS_SLIDES[activeSlideIndex];

  // 5. Modals State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  // 6. Toast Notification State
  const [toast, setToast] = useState<ToastNotification | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 3500);
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  // 7. Derived Statistics (never hardcoded)
  const stats: TaskStats = useMemo(() => {
    const total = tasks.length;
    let inProgress = 0;
    let completed = 0;
    let toDo = 0;

    tasks.forEach((task) => {
      if (task.status === 'in-progress') inProgress++;
      else if (task.status === 'completed') completed++;
      else if (task.status === 'to-do') toDo++;
    });

    const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      inProgress,
      completed,
      toDo,
      completionPercentage,
    };
  }, [tasks]);

  // 8. Derived Filtered Tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Status filter
      if (statusFilter === 'in-progress' && task.status !== 'in-progress') return false;
      if (statusFilter === 'completed' && task.status !== 'completed') return false;

      // Priority filter
      if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;

      // Search query (case-insensitive across title and description)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesDesc = task.description.toLowerCase().includes(query);
        const matchesCategory = task.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesCategory) return false;
      }

      return true;
    });
  }, [tasks, statusFilter, priorityFilter, searchQuery]);

  // 9. Predictable, Immutable Mutations
  const addTask = useCallback(
    (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
      const now = new Date().toISOString();
      const newTask: Task = {
        ...taskData,
        id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        createdAt: now,
        updatedAt: now,
      };

      setTasks((prev) => [newTask, ...prev]);
      showToast(`Task "${newTask.title}" created successfully!`, 'success');
    },
    [showToast]
  );

  const updateTask = useCallback(
    (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
      setTasks((prev) =>
        prev.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              ...updates,
              updatedAt: new Date().toISOString(),
            };
          }
          return task;
        })
      );
      showToast('Task updated successfully!', 'success');
    },
    [showToast]
  );

  const deleteTask = useCallback(
    (id: string) => {
      const taskToRemove = tasks.find((t) => t.id === id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      if (taskToRemove) {
        showToast(`Task "${taskToRemove.title}" deleted.`, 'info');
      }
    },
    [tasks, showToast]
  );

  const toggleTaskStatus = useCallback(
    (id: string) => {
      setTasks((prev) =>
        prev.map((task) => {
          if (task.id === id) {
            const nextStatus: TaskStatus = task.status === 'completed' ? 'in-progress' : 'completed';
            return {
              ...task,
              status: nextStatus,
              updatedAt: new Date().toISOString(),
            };
          }
          return task;
        })
      );
    },
    []
  );

  const setTaskStatus = useCallback(
    (id: string, status: TaskStatus) => {
      setTasks((prev) =>
        prev.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              status,
              updatedAt: new Date().toISOString(),
            };
          }
          return task;
        })
      );
      showToast(`Status updated to ${status.replace('-', ' ')}`, 'info');
    },
    [showToast]
  );

  const resetToDefaultData = useCallback(() => {
    const data = JSON.stringify(INITIAL_TASKS);
    setTasks(INITIAL_TASKS);
    try {
      localStorage.setItem(STORAGE_KEY, data);
      localStorage.setItem(ALT_STORAGE_KEY, data);
    } catch {}
    showToast('Reset to original sample data.', 'info');
  }, [showToast]);

  // Modal handlers
  const openCreateModal = useCallback(() => setIsCreateModalOpen(true), []);
  const closeCreateModal = useCallback(() => setIsCreateModalOpen(false), []);

  const openEditModal = useCallback((task: Task) => setEditingTask(task), []);
  const closeEditModal = useCallback(() => setEditingTask(null), []);

  const openDeleteModal = useCallback((task: Task) => setTaskToDelete(task), []);
  const closeDeleteModal = useCallback(() => setTaskToDelete(null), []);
  const confirmDeleteTask = useCallback(() => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      setTaskToDelete(null);
    }
  }, [taskToDelete, deleteTask]);

  const value: TaskContextType = {
    tasks,
    filteredTasks,
    stats,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    activeSlideIndex,
    currentSlide,
    nextSlide,
    prevSlide,
    setSlide,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    setTaskStatus,
    resetToDefaultData,
    isCreateModalOpen,
    openCreateModal,
    closeCreateModal,
    editingTask,
    openEditModal,
    closeEditModal,
    taskToDelete,
    openDeleteModal,
    closeDeleteModal,
    confirmDeleteTask,
    toast,
    showToast,
    hideToast,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
