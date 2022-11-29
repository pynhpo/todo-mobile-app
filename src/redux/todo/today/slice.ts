import {createSlice} from '@reduxjs/toolkit';
import {initialTodayTodoState} from './constants';

const todayTodoSlice = createSlice({
  name: 'today',
  initialState: initialTodayTodoState,
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
  todayTodoSlice.actions;

export const {reducer: todayTodoReducer} = todayTodoSlice;
