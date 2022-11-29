import {combineReducers} from '@reduxjs/toolkit';
import {allTodoReducer} from './all/slice';
import {todayTodoReducer} from './today/slice';
import {todoFilterReducer} from './filter/slice';

export default combineReducers({
  all: allTodoReducer,
  today: todayTodoReducer,
  filter: todoFilterReducer,
});
