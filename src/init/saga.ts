import createSagaMiddleware from 'redux-saga';
import {all} from 'redux-saga/effects';
import {authSaga} from '@redux/auth/saga';

export default createSagaMiddleware();

export function* rootSaga() {
  yield all([authSaga()]);
}
