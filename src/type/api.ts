export type Repeat = 'none' | 'everyday';
export type Priority = 'normal' | 'medium' | 'high' | 'highest';
export type Status = 'completed' | 'active' | 'today' | 'future' | 'overdue';
export type SortByName = 'createdDate' | 'completedDate' | 'appliedDate';
export type SortByOrder = 'asc' | 'desc';

export type TodoItemRequest = {
  title: string;
  content: string;
  imageUrl?: string;
  appliedAt: number;
  dueAt?: number;
  repeat: Repeat;
  priority: Priority;
};

export type TodoItemResponse = {
  uid: string;
  title: string;
  content: string;
  imageUrl?: string;
  appliedAt: number;
  createdAt: number;
  updatedAt: number;
  completed: boolean;
  completedAt: number;
  dueAt?: number;
  repeat: Repeat;
  priority: Priority;
};

export type AllTodoResponse = {
  list: Record<string, TodoItemResponse[]>;
  unCompletedCount: number;
};

export type TodayTodoResponse = AllTodoResponse;

export type TodoFilterRequest = {
  title?: string;
  status?: Status;
  sortByName: SortByName;
  sortByOrder: SortByOrder;
};
