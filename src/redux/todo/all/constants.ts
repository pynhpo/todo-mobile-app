import {AllTodoResponse} from '@type/api';

export type AllTodoStateType = {
  isFetching: boolean;
  data: AllTodoResponse;
};

export const initialAllTodoState: AllTodoStateType = {
  isFetching: true,
  data: {
    unCompletedCount: 0,
    list: {},
  },
};

export type FetchAllTodoActionPayload = {isResetFilter: boolean} | undefined;
