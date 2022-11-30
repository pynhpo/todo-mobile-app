import {TodoItemRequest, TodoItemResponse} from '@type/api';

export type AddNewTodoItemActionPayload = TodoItemRequest;

export interface UpdateTodoItemActionPayload extends TodoItemResponse {}

export type DeleteTodoItemActionPayload = {
  uid: string;
};

export type MarkTodoItemAsCompletedActionPayload = {
  uid: string;
  completed: boolean;
};
