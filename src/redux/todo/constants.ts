import {initialAllTodoState, AllTodoStateType} from './all/constants';
import {initialTodayTodoState, TodayTodoStateType} from './today/constants';
import {initialTodoFilterState, TodoFilterStateType} from './filter/constants';

export type TodoStateType = {
  all: AllTodoStateType;
  today: TodayTodoStateType;
  filter: TodoFilterStateType;
};

export const initialTodoState: TodoStateType = {
  all: initialAllTodoState,
  today: initialTodayTodoState,
  filter: initialTodoFilterState,
};
