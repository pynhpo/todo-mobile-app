import {AllTodoResponse} from '@type/api';

export type AllTodoStateType = {
  isFetching: boolean;
  data: AllTodoResponse;
};

export const initialAllTodoState: AllTodoStateType = {
  isFetching: true,
  data: {
    unCompletedCount: 0,
    list: [],
  },
};

export type FetchAllTodoActionPayload =
  | {
      title: string;
      status: 'completed' | 'active' | 'today' | 'future' | 'overdue';
      sortByName: 'createdDate' | 'completedDate';
      sortByOrder: 'asc' | 'desc';
    }
  | undefined;
