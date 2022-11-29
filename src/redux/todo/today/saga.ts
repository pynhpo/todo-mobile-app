import {all, put, takeLeading} from 'redux-saga/effects';
import {CrashlyticsService} from '@services/crashlytics.service';
import {URL} from '@constants/url.constant';
import {SagaService} from '@services/saga.service';
import {TodayTodoResponse} from '@type/api';
import {fetchTodayTodoAction} from './actions';
import {startFetching, fetchSuccessfully, fetchUnsuccessfully} from './slice';

function* fetchTodayTodoSaga() {
  try {
    yield put(startFetching());
    const res: TodayTodoResponse = yield SagaService.callApi(
      'get',
      URL.allTodo,
      {
        params: {
          status: 'today',
        },
      },
    );
    yield put(fetchSuccessfully(res));
  } catch (err) {
    yield put(fetchUnsuccessfully());
    CrashlyticsService.recordError(err);
  }
}
export function* todayTodoSaga() {
  yield all([takeLeading(fetchTodayTodoAction.toString(), fetchTodayTodoSaga)]);
}
