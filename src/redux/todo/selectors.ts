import {CombinedStateType} from '@init/reducer';
import {createSelector} from 'reselect';
import {TodoStateType, initialTodoState} from './constants';

export const makeSelectTodoDomain = (state: CombinedStateType): TodoStateType =>
  state.todo || initialTodoState;

export const selectAllTodo = createSelector(
  makeSelectTodoDomain,
  todo => todo.all,
);

export const selectTodayTodo = createSelector(
  makeSelectTodoDomain,
  todo => todo.today,
);

export const selectTodoFilter = createSelector(
  makeSelectTodoDomain,
  todo => todo.filter,
);
