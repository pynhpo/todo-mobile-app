import {combineReducers} from '@reduxjs/toolkit';
import {navigationReducer} from './navigation/slice';

export default combineReducers({
  navigation: navigationReducer,
});
