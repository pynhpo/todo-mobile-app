export type NavigationStateType = {
  isReady: boolean;
};

export const initialNavigationState: NavigationStateType = {
  isReady: false,
};

export type SetNavigationReadyActionPayload = {
  isReady: boolean;
};
