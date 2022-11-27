import {createSelector} from 'reselect';
import {CombinedStateType} from '@init/reducer';
import {AppStateType, initialAppState} from './constants';

export const makeSelectAppDomain = (state: CombinedStateType): AppStateType =>
  state.app || initialAppState;

export const selectNavigationReady = createSelector(
  makeSelectAppDomain,
  app => app.navigation.isReady,
);
