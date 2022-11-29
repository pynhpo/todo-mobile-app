import {TodayTodoResponse} from '@type/api';

export type TodayTodoStateType = {
  isFetching: boolean;
  data: TodayTodoResponse;
};

export const initialTodayTodoState: TodayTodoStateType = {
  isFetching: true,
  data: {
    unCompletedCount: 0,
    list: [],
  },
};

export type FetchTodayTodoActionPayload = void;
