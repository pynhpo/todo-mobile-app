import createSagaMiddleware from 'redux-saga';
import {all} from 'redux-saga/effects';
import {authSaga} from '@redux/auth/saga';
import {todoSaga} from '@redux/todo/saga';

export default createSagaMiddleware();

export function* rootSaga() {
  yield all([authSaga(), todoSaga()]);
}
