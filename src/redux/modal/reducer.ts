import {combineReducers} from '@reduxjs/toolkit';
import {overlayLoadingReducer} from './overlayLoading/slice';

export default combineReducers({
  overlayLoading: overlayLoadingReducer,
});
