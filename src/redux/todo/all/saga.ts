import {all, put, takeLeading, select} from 'redux-saga/effects';
import {CrashlyticsService} from '@services/crashlytics.service';
import {URL} from '@constants/url.constant';
import {SagaService} from '@services/saga.service';
import {AllTodoResponse} from '@type/api';
import {fetchAllTodoAction} from './actions';
import {startFetching, fetchSuccessfully, fetchUnsuccessfully} from './slice';
import {selectTodoFilter} from '../selectors';
import {TodoFilterStateType, initialTodoFilterState} from '../filter/constants';
import {setTodoFilterState} from '../filter/slice';

function* fetchAllTodoSaga({payload}: ReturnType<typeof fetchAllTodoAction>) {
  try {
    yield put(startFetching());
    const filter: TodoFilterStateType = yield select(selectTodoFilter);
    const res: AllTodoResponse = yield SagaService.callApi('get', URL.allTodo, {
      params: payload?.isResetFilter ? initialTodoFilterState : filter,
    });
    yield put(fetchSuccessfully(res));
    if (payload?.isResetFilter) {
      yield put(setTodoFilterState(initialTodoFilterState));
    }
  } catch (err) {
    yield put(fetchUnsuccessfully());
    CrashlyticsService.recordError(err);
  }
}
export function* allTodoSaga() {
  yield all([takeLeading(fetchAllTodoAction.toString(), fetchAllTodoSaga)]);
}
