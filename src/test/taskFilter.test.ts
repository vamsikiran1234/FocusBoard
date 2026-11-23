import { describe, it, expect } from 'vitest';
import { Task, StatusFilter, PriorityFilter } from '../types';

function filterTasks(
  tasks: Task[],
  statusFilter: StatusFilter,
  priorityFilter: PriorityFilter,
  searchQuery: string
) {
  return tasks.filter((task) => {
    if (statusFilter === 'in-progress' && task.status !== 'in-progress') return false;
    if (statusFilter === 'completed' && task.status !== 'completed') return false;

    if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = task.title.toLowerCase().includes(q);
      const matchDesc = task.description.toLowerCase().includes(q);
      const matchCat = task.category.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchCat) return false;
    }

    return true;
  });
}

describe('Search and Filtering Logic', () => {
  const sampleTasks: Task[] = [
    { id: '1', title: 'Design landing page', description: 'Website redesign', category: 'Design', status: 'in-progress', priority: 'high', dueDate: '2026-11-22', createdAt: '', updatedAt: '' },
    { id: '2', title: 'Fix mobile navigation', description: 'Frontend sprint', category: 'Development', status: 'in-progress', priority: 'medium', dueDate: '2026-11-24', createdAt: '', updatedAt: '' },
    { id: '3', title: 'Review onboarding copy', description: 'Content updates', category: 'Content', status: 'completed', priority: 'low', dueDate: '2026-11-18', createdAt: '', updatedAt: '' },
    { id: '4', title: 'Optimize database indexes', description: 'Backend query tuning', category: 'Development', status: 'to-do', priority: 'high', dueDate: '2026-11-29', createdAt: '', updatedAt: '' },
  ];

  it('performs case-insensitive search by title', () => {
    const result = filterTasks(sampleTasks, 'all', 'all', 'LANDING');
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Design landing page');
  });

  it('searches by description substring', () => {
    const result = filterTasks(sampleTasks, 'all', 'all', 'sprint');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('2');
  });

  it('filters by status tabs', () => {
    const inProgressTasks = filterTasks(sampleTasks, 'in-progress', 'all', '');
    expect(inProgressTasks).toHaveLength(2);

    const completedTasks = filterTasks(sampleTasks, 'completed', 'all', '');
    expect(completedTasks).toHaveLength(1);
    expect(completedTasks[0].title).toBe('Review onboarding copy');
  });

  it('filters by priority level', () => {
    const highPriority = filterTasks(sampleTasks, 'all', 'high', '');
    expect(highPriority).toHaveLength(2);

    const lowPriority = filterTasks(sampleTasks, 'all', 'low', '');
    expect(lowPriority).toHaveLength(1);
  });

  it('combines search and multiple filters simultaneously', () => {
    // High priority + in-progress
    const combined = filterTasks(sampleTasks, 'in-progress', 'high', 'landing');
    expect(combined).toHaveLength(1);
    expect(combined[0].id).toBe('1');

    // Mismatched search
    const noMatch = filterTasks(sampleTasks, 'in-progress', 'high', 'nonexistent');
    expect(noMatch).toHaveLength(0);
  });
});
