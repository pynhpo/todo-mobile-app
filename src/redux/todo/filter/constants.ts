import {TodoFilterRequest} from '@type/api';

export type TodoFilterStateType = TodoFilterRequest;

export const initialTodoFilterState: TodoFilterStateType = {
  title: '',
  sortByName: 'appliedDate',
  sortByOrder: 'desc',
};

export type SetTodoFilterActionPayload = TodoFilterStateType;

export type SetTitleOfTodoFilterActionPayload = {
  title: string;
};
