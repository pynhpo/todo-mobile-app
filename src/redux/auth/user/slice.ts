import {createSlice} from '@reduxjs/toolkit';
import {initialUserState} from './constants';

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUserState: (state, action) => {
      return action.payload;
    },

    resetUserState: () => {
      return initialUserState;
    },
  },
});

export const {setUserState, resetUserState} = userSlice.actions;

export const {reducer: userReducer} = userSlice;
