import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { TaskProvider, useTasks } from '../context/TaskContext';
import { INITIAL_TASKS } from '../data/initialTasks';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  React.createElement(TaskProvider, null, children)
);

describe('Task Storage & Browser Persistence (PDF Requirements)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with seed sample data when localStorage is completely empty', () => {
    const { result } = renderHook(() => useTasks(), { wrapper });
    expect(result.current.tasks.length).toBe(INITIAL_TASKS.length);
    expect(result.current.tasks[0].title).toBe(INITIAL_TASKS[0].title);
  });

  it('restores existing saved tasks from localStorage without overwriting', () => {
    const customTasks = [
      {
        id: 'custom-1',
        title: 'Custom Persisted Task',
        category: 'Design' as const,
        status: 'in-progress' as const,
        priority: 'high' as const,
        dueDate: '2026-11-25',
        createdAt: '2026-11-23T10:00:00.000Z',
        updatedAt: '2026-11-23T10:00:00.000Z',
      },
    ];
    localStorage.setItem('focusboard_tasks_v1', JSON.stringify(customTasks));

    const { result } = renderHook(() => useTasks(), { wrapper });
    expect(result.current.tasks.length).toBe(1);
    expect(result.current.tasks[0].title).toBe('Custom Persisted Task');
  });

  it('preserves an empty task list across reloads and does NOT overwrite with sample data', () => {
    // User intentionally cleared/deleted all tasks
    localStorage.setItem('focusboard_tasks_v1', JSON.stringify([]));

    const { result } = renderHook(() => useTasks(), { wrapper });
    expect(result.current.tasks.length).toBe(0);
  });

  it('persists newly added task into localStorage immediately', () => {
    const { result } = renderHook(() => useTasks(), { wrapper });

    act(() => {
      result.current.addTask({
        title: 'Brand New Task',
        description: 'Testing task persistence in localStorage',
        category: 'Development',
        status: 'to-do',
        priority: 'medium',
        dueDate: '2026-11-30',
      });
    });

    const storedJson = localStorage.getItem('focusboard_tasks_v1');
    expect(storedJson).not.toBeNull();
    const stored = JSON.parse(storedJson!);
    expect(stored[0].title).toBe('Brand New Task');
  });

  it('resets to default 12 initial tasks when resetToDefaultData is invoked', () => {
    const { result } = renderHook(() => useTasks(), { wrapper });

    act(() => {
      result.current.deleteTask(INITIAL_TASKS[0].id);
    });
    expect(result.current.tasks.length).toBe(INITIAL_TASKS.length - 1);

    act(() => {
      result.current.resetToDefaultData();
    });
    expect(result.current.tasks.length).toBe(INITIAL_TASKS.length);
  });
});
