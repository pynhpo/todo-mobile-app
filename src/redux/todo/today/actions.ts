import {createAction} from '@reduxjs/toolkit';

import {FetchTodayTodoActionPayload} from './constants';

export const fetchTodayTodoAction = createAction<FetchTodayTodoActionPayload>(
  'TODO/TODAY/FETCH_TODAY_TODO_ACTION',
);
