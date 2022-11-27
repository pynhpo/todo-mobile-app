import {
  OverlayLoadingModalStateType,
  initialOverlayLoadingModalState,
} from './overlayLoading/constants';

export type ModalStateType = {
  overlayLoading: OverlayLoadingModalStateType;
};

export const initialModalState: ModalStateType = {
  overlayLoading: initialOverlayLoadingModalState,
};
