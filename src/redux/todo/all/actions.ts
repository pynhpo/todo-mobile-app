import {createAction} from '@reduxjs/toolkit';

import {FetchAllTodoActionPayload} from './constants';

export const fetchAllTodoAction = createAction<FetchAllTodoActionPayload>(
  'TODO/ALL/FETCH_ALL_TODO_ACTION',
);
