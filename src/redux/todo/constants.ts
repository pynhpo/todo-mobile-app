import {initialUserState, UserStateType} from './user/constants';

export type AuthStateType = {
  user: UserStateType;
};

export const initialAuthState: AuthStateType = {
  user: initialUserState,
};

export type LoginActionPayload = {
  email: string;
  password: string;
};
