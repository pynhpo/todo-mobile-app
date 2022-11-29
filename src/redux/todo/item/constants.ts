import {TodoItemRequest} from '@type/api';

export type AddNewTodoItemActionPayload = TodoItemRequest;

export interface UpdateTodoItemActionPayload extends TodoItemRequest {
  uid: string;
}

export type DeleteTodoItemActionPayload = {
  uid: string;
};

export type MarkTodoItemAsCompletedActionPayload = {
  uid: string;
  completed: boolean;
};
