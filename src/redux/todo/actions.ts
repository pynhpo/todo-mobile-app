import {createAction} from '@reduxjs/toolkit';

import {LoginActionPayload} from './constants';

export const loginAction =
  createAction<LoginActionPayload>('AUTH/LOG_IN_ACTION');

export const logoutAction = createAction<void>('AUTH/LOG_OUT_ACTION');
