export type Repeat = 'none' | 'everyday';
export type Priority = 'normal' | 'medium' | 'high' | 'highest';

export type TodoItemRequest = {
  title: string;
  content: string;
  imageUrl?: string;
  appliedDate: string;
  completed: boolean;
  dueAt?: number;
  repeat: Repeat;
  priority: Priority;
};

export type TodoItemResponse = {
  uid: string;
  title: string;
  content: string;
  imageUrl?: string;
  appliedDate: string;
  createdAt: number;
  updatedAt: number;
  completed: boolean;
  completedAt: number;
  dueAt?: number;
  repeat: Repeat;
  priority: Priority;
};

export type AllTodoResponse = {
  list: TodoItemResponse[];
  unCompletedCount: number;
};

export type TodayTodoResponse = AllTodoResponse;
