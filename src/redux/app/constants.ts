import {
  NavigationStateType,
  initialNavigationState,
} from './navigation/constants';

export type AppStateType = {
  navigation: NavigationStateType;
};

export const initialAppState: AppStateType = {
  navigation: initialNavigationState,
};
