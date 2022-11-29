import {createAction} from '@reduxjs/toolkit';

import {
  AddNewTodoItemActionPayload,
  UpdateTodoItemActionPayload,
  DeleteTodoItemActionPayload,
  MarkTodoItemAsCompletedActionPayload,
} from './constants';

export const addNewTodoItemAction = createAction<AddNewTodoItemActionPayload>(
  'TODO/ITEM/ADD_NEW_TODO_ITEM_ACTION',
);

export const updateTodoItemAction = createAction<UpdateTodoItemActionPayload>(
  'TODO/ITEM/UPDATE_TODO_ITEM_ACTION',
);

export const deleteTodoItemAction = createAction<DeleteTodoItemActionPayload>(
  'TODO/ITEM/DELETE_TODO_ITEM_ACTION',
);

export const markTodoItemAsCompletedAction =
  createAction<MarkTodoItemAsCompletedActionPayload>(
    'TODO/ITEM/MARK_TODO_ITEM_AS_COMPLETED_ACTION',
  );
