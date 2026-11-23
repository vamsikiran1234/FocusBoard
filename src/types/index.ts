export type TaskStatus = 'to-do' | 'in-progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskCategory =
  | 'Design'
  | 'Development'
  | 'Content'
  | 'Research'
  | 'Marketing'
  | 'Operations';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string; // 'YYYY-MM-DD'
  projectSubtitle?: string;
  createdAt: string;
  updatedAt: string;
}

export type StatusFilter = 'all' | 'in-progress' | 'completed';
export type PriorityFilter = 'all' | 'low' | 'medium' | 'high';

export interface TaskStats {
  total: number;
  inProgress: number;
  completed: number;
  toDo: number;
  completionPercentage: number;
}

export interface FocusSlide {
  id: number;
  slideNumber: string; // '01 / 03'
  badge: string; // 'FOCUS NOTES'
  title: string;
  subtitle: string;
  cardBadge: string; // 'NEXT UP' | 'IN PROGRESS' | 'COMPLETED'
  cardTitle: string;
  cardProgress: number;
  mobileGreeting: string;
  mobileSubtitle: string;
}
