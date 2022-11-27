import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  initialNavigationState,
  SetNavigationReadyActionPayload,
} from './constants';

const navigationSlice = createSlice({
  name: 'navigation',
  initialState: initialNavigationState,
  reducers: {
    setNavigationReady: (
      state,
      action: PayloadAction<SetNavigationReadyActionPayload>,
    ) => {
      state.isReady = action?.payload?.isReady;
    },
  },
});

export const {setNavigationReady} = navigationSlice.actions;

export const {reducer: navigationReducer} = navigationSlice;
