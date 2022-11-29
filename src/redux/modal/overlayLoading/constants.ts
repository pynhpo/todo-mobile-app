export type OverlayLoadingModalStateType = {
  visible: boolean;
  animationOut?: boolean;
};

export const initialOverlayLoadingModalState: OverlayLoadingModalStateType = {
  visible: false,
  animationOut: true,
};

export type SetOverlayLoadingModalActionPayload = OverlayLoadingModalStateType;
