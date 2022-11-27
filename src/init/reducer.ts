import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '@redux/auth/reducer';
import {initialAuthState} from '@redux/auth/constants';
import modalReducer from '@redux/modal/reducer';
import {initialModalState} from '@redux/modal/constants';
import appReducer from '@redux/app/reducer';
import {initialAppState} from '@redux/app/constants';

const combineReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  app: appReducer,
});

export type CombinedStateType = ReturnType<typeof combineReducer>;

export const initialState: CombinedStateType = {
  auth: initialAuthState,
  modal: initialModalState,
  app: initialAppState,
};

export default combineReducer;
