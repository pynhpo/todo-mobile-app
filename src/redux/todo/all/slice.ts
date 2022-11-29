import {createSlice} from '@reduxjs/toolkit';
import {initialAllTodoState} from './constants';

const allTodoSlice = createSlice({
  name: 'all',
  initialState: initialAllTodoState,
  reducers: {
    startFetching: state => {
      state.isFetching = true;
    },
    fetchSuccessfully: (state, {payload}) => {
      state.data = payload;
      state.isFetching = false;
    },
    fetchUnsuccessfully: state => {
      state.isFetching = false;
    },
  },
});

export const {startFetching, fetchSuccessfully, fetchUnsuccessfully} =
  allTodoSlice.actions;

export const {reducer: allTodoReducer} = allTodoSlice;
