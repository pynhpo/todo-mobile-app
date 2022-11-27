import {MMKV} from 'react-native-mmkv';
import {Storage} from 'redux-persist';

export const storage = new MMKV();

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const AUTH_TOKEN_KEY = 'auth_token';

export class AppStorage {
  static getAuthToken = (): string => {
    return storage.getString(AUTH_TOKEN_KEY) || '';
  };
  static setAuthToken = (token: string) => {
    return storage.set(AUTH_TOKEN_KEY, token);
  };
  static removeAuthToken = () => {
    return storage.delete(AUTH_TOKEN_KEY);
  };
}
