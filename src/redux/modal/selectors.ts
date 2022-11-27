import {createSelector} from 'reselect';
import {CombinedStateType} from '@init/reducer';
import {ModalStateType, initialModalState} from './constants';

export const makeSelectModalDomain = (
  state: CombinedStateType,
): ModalStateType => state.modal || initialModalState;

export const selectOverlayLoadingModal = createSelector(
  makeSelectModalDomain,
  modal => modal.overlayLoading,
);
