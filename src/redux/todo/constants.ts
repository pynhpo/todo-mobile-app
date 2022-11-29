import {initialAllTodoState, AllTodoStateType} from './all/constants';
import {initialTodayTodoState, TodayTodoStateType} from './today/constants';

export type TodoStateType = {
  all: AllTodoStateType;
  today: TodayTodoStateType;
};

export const initialTodoState: TodoStateType = {
  all: initialAllTodoState,
  today: initialTodayTodoState,
};
