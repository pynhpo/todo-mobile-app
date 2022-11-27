import {call} from 'redux-saga/effects';
import {FetcherService, MethodType, OptionsType} from './fetcher.service';

export class SagaService {
  static *callApi(method: MethodType, url: string, options?: OptionsType): any {
    let data;
    try {
      data = yield call(FetcherService.fetch, method, url, options);
      return data;
    } catch (err) {
      throw err;
    }
  }
}
