import store from '@init/store';
import {logoutAction} from '@redux/auth/actions';
import axios, {AxiosRequestConfig} from 'axios';
import get from 'lodash/get';
import {AppStorage} from './app-storage.service';

export type OptionsType = {
  skipAuthorization?: boolean;
} & AxiosRequestConfig;

export type MethodType = 'get' | 'post' | 'put' | 'delete' | 'patch';

export enum ErrorMessage {
  BadRequest = 'Bad Request',
  UnauthorizedRequest = 'Unauthorized Request',
  NotPermission = 'Not Permission',
  ContentNotFound = 'Content Not Found',
  InternalServerError = 'Internal Server Error',
  UnknownError = 'Unknown Error',
}

export enum ErrorCode {
  no_content = 'no_content',
  invalid_token = 'invalid_token',
}

const defaultOptions: OptionsType = {
  skipAuthorization: false,
  headers: {},
};

export class FetcherService {
  private static getDefaultHeaders = async (
    skipAuthorization: boolean,
  ): Promise<any> => {
    if (skipAuthorization) {
      return {
        'Content-Type': 'application/json',
      };
    }
    const authToken = await AppStorage.getAuthToken();
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };
  };

  private static callAxios = async (
    method: MethodType,
    url: string,
    options = defaultOptions,
  ): Promise<any> => {
    const {
      skipAuthorization = false,
      headers: headersOption = {},
      ...axiosConfig
    } = options;
    const headers = {
      ...(await FetcherService.getDefaultHeaders(skipAuthorization)),
      ...headersOption,
    };
    const config = {
      headers,
      ...axiosConfig,
    };
    if (__DEV__) {
      console.log('***** Network call', url, config);
    }
    const {data} = await axios({
      method,
      url,
      ...config,
    });
    if (__DEV__) {
      console.log('***** Network response', data);
    }
    return data;
  };

  static fetch = async (
    method: MethodType,
    url: string,
    options = defaultOptions,
  ): Promise<any> => {
    try {
      const data = await FetcherService.callAxios(method, url, options);
      return data;
    } catch (err: any) {
      if (__DEV__) {
        console.log('***** Network error', err?.response?.data || err);
      }
      if (get(err, 'response.data.code') === ErrorCode.invalid_token) {
        store.dispatch(logoutAction());
        throw err;
      } else {
        throw err;
      }
    }
  };

  static getErrorMessage = (err: {status: number}): ErrorMessage => {
    const status = err.status;
    let message: ErrorMessage = ErrorMessage.UnknownError;
    switch (status) {
      case 400:
        message = ErrorMessage.BadRequest;
        break;
      case 401:
        message = ErrorMessage.UnauthorizedRequest;
        break;
      case 403:
        message = ErrorMessage.NotPermission;
        break;
      case 404:
        message = ErrorMessage.ContentNotFound;
        break;
      case 500:
        message = ErrorMessage.InternalServerError;
        break;
    }
    return message;
  };
}
