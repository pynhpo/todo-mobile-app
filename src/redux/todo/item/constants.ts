import {TodoItemRequest} from '@type/api';

export type AddNewTodoItemActionPayload = TodoItemRequest;

export type UpdateTodoItemActionPayload = TodoItemRequest;

export type DeleteTodoItemActionPayload = {
  uid: string;
};

export type MarkTodoItemAsCompletedActionPayload = {
  uid: string;
  completed: boolean;
};
