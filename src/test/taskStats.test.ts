import { describe, it, expect } from 'vitest';
import { Task } from '../types';

function calculateStats(tasks: Task[]) {
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

  return { total, inProgress, completed, toDo, completionPercentage };
}

describe('Calculated Statistics Derived Logic', () => {
  it('correctly calculates derived counts for sample tasks', () => {
    const mockTasks: Task[] = [
      { id: '1', title: 'Task 1', description: '', category: 'Design', status: 'in-progress', priority: 'high', dueDate: '2026-11-20', createdAt: '', updatedAt: '' },
      { id: '2', title: 'Task 2', description: '', category: 'Development', status: 'in-progress', priority: 'medium', dueDate: '2026-11-20', createdAt: '', updatedAt: '' },
      { id: '3', title: 'Task 3', description: '', category: 'Content', status: 'completed', priority: 'low', dueDate: '2026-11-20', createdAt: '', updatedAt: '' },
      { id: '4', title: 'Task 4', description: '', category: 'Research', status: 'to-do', priority: 'high', dueDate: '2026-11-20', createdAt: '', updatedAt: '' },
    ];

    const stats = calculateStats(mockTasks);
    expect(stats.total).toBe(4);
    expect(stats.inProgress).toBe(2);
    expect(stats.completed).toBe(1);
    expect(stats.toDo).toBe(1);
    expect(stats.completionPercentage).toBe(25); // 1 / 4 = 25%
  });

  it('handles empty task list gracefully with 0% completion', () => {
    const stats = calculateStats([]);
    expect(stats.total).toBe(0);
    expect(stats.inProgress).toBe(0);
    expect(stats.completed).toBe(0);
    expect(stats.completionPercentage).toBe(0);
  });

  it('updates dynamically when a task is completed', () => {
    const mockTasks: Task[] = [
      { id: '1', title: 'Task 1', description: '', category: 'Design', status: 'in-progress', priority: 'high', dueDate: '2026-11-20', createdAt: '', updatedAt: '' },
      { id: '2', title: 'Task 2', description: '', category: 'Development', status: 'completed', priority: 'medium', dueDate: '2026-11-20', createdAt: '', updatedAt: '' },
    ];

    let stats = calculateStats(mockTasks);
    expect(stats.completionPercentage).toBe(50);

    // Complete the first task
    mockTasks[0].status = 'completed';
    stats = calculateStats(mockTasks);
    expect(stats.completed).toBe(2);
    expect(stats.inProgress).toBe(0);
    expect(stats.completionPercentage).toBe(100);
  });
});
