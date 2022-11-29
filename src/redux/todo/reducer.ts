import {combineReducers} from '@reduxjs/toolkit';
import {userReducer} from './user/slice';

export default combineReducers({
  user: userReducer,
});
