import {combineReducers} from '@reduxjs/toolkit';
import {allTodoReducer} from './all/slice';
import {todayTodoReducer} from './today/slice';

export default combineReducers({
  all: allTodoReducer,
  today: todayTodoReducer,
});
