import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  initialTodoFilterState,
  SetTodoFilterActionPayload,
  SetTitleOfTodoFilterActionPayload,
} from './constants';

const todoFilterSlice = createSlice({
  name: 'filter',
  initialState: initialTodoFilterState,
  reducers: {
    setTodoFilterState: (
      state,
      {payload}: PayloadAction<SetTodoFilterActionPayload>,
    ) => {
      return payload;
    },
    setTitleOfTodoFilterState: (
      state,
      {payload}: PayloadAction<SetTitleOfTodoFilterActionPayload>,
    ) => {
      state.title = payload.title;
    },
  },
});

export const {setTodoFilterState, setTitleOfTodoFilterState} =
  todoFilterSlice.actions;

export const {reducer: todoFilterReducer} = todoFilterSlice;
