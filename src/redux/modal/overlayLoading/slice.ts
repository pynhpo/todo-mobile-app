import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  initialOverlayLoadingModalState,
  SetOverlayLoadingModalActionPayload,
} from './constants';

const overlayLoadingSlice = createSlice({
  name: 'overlayLoading',
  initialState: initialOverlayLoadingModalState,
  reducers: {
    setOverlayLoadingModalState: (
      state,
      action: PayloadAction<SetOverlayLoadingModalActionPayload>,
    ) => {
      return action.payload;
    },
  },
});

export const {setOverlayLoadingModalState} = overlayLoadingSlice.actions;

export const {reducer: overlayLoadingReducer} = overlayLoadingSlice;
