import {all} from 'redux-saga/effects';
import {allTodoSaga} from './all/saga';
import {todayTodoSaga} from './today/saga';
import {todoItemSaga} from './item/saga';

export function* todoSaga() {
  yield all([allTodoSaga(), todayTodoSaga(), todoItemSaga()]);
}
