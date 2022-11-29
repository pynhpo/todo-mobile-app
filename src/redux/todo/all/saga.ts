import {all, put, takeLeading} from 'redux-saga/effects';
import {CrashlyticsService} from '@services/crashlytics.service';
import {URL} from '@constants/url.constant';
import {SagaService} from '@services/saga.service';
import {AllTodoResponse} from '@type/api';
import {fetchAllTodoAction} from './actions';
import {startFetching, fetchSuccessfully, fetchUnsuccessfully} from './slice';

function* fetchAllTodoSaga({payload}: ReturnType<typeof fetchAllTodoAction>) {
  try {
    yield put(startFetching());

    const res: AllTodoResponse = yield SagaService.callApi('get', URL.allTodo, {
      params: payload,
    });
    yield put(fetchSuccessfully(res));
  } catch (err) {
    yield put(fetchUnsuccessfully());
    CrashlyticsService.recordError(err);
  }
}
export function* allTodoSaga() {
  yield all([takeLeading(fetchAllTodoAction.toString(), fetchAllTodoSaga)]);
}
