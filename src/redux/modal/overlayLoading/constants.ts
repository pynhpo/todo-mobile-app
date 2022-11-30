export type OverlayLoadingModalStateType = {
  visible: boolean;
  animationOut?: boolean;
};

export const initialOverlayLoadingModalState: OverlayLoadingModalStateType = {
  visible: false,
  animationOut: false,
};

export type SetOverlayLoadingModalActionPayload = OverlayLoadingModalStateType;
