import {all, put, takeLeading} from 'redux-saga/effects';
import {CrashlyticsService} from '@services/crashlytics.service';
import {URL} from '@constants/url.constant';
import {SagaService} from '@services/saga.service';
import {NavigationService} from '@services/navigation.service';
import {ToastMessageService} from '@services/toast-message.service';
import {
  addNewTodoItemAction,
  updateTodoItemAction,
  deleteTodoItemAction,
  markTodoItemAsCompletedAction,
} from './actions';
import {fetchAllTodoAction} from '../all/actions';
import {fetchTodayTodoAction} from '../today/actions';

import {setOverlayLoadingModalState} from '../../modal/overlayLoading/slice';

function* addNewTodoItemSaga({
  payload,
}: ReturnType<typeof addNewTodoItemAction>) {
  try {
    yield put(setOverlayLoadingModalState({visible: true}));
    yield SagaService.callApi('post', URL.addTodoItem, {
      data: payload,
    });
    yield all([
      put(fetchAllTodoAction({isResetFilter: true})),
      put(fetchTodayTodoAction()),
    ]);
    yield put(setOverlayLoadingModalState({visible: false}));
    yield NavigationService.goBack();
  } catch (err) {
    yield put(setOverlayLoadingModalState({visible: false}));
    ToastMessageService.toastError('Please try again!');
    CrashlyticsService.recordError(err);
  }
}

function* updateTodoItemSaga({
  payload,
}: ReturnType<typeof updateTodoItemAction>) {
  try {
    yield put(setOverlayLoadingModalState({visible: true}));
    yield SagaService.callApi('put', URL.updateTodoItem, {
      data: payload,
    });
    yield all([put(fetchAllTodoAction()), put(fetchTodayTodoAction())]);
    yield put(setOverlayLoadingModalState({visible: false}));
    yield NavigationService.goBack();
  } catch (err) {
    yield put(setOverlayLoadingModalState({visible: false}));
    ToastMessageService.toastError('Please try again!');
    CrashlyticsService.recordError(err);
  }
}

function* deleteTodoItemSaga({
  payload,
}: ReturnType<typeof deleteTodoItemAction>) {
  try {
    yield put(setOverlayLoadingModalState({visible: true}));
    yield SagaService.callApi(
      'delete',
      `${URL.deleteTodoItem}/${payload?.uid}`,
    );
    yield all([put(fetchAllTodoAction()), put(fetchTodayTodoAction())]);
    yield put(setOverlayLoadingModalState({visible: false}));
  } catch (err) {
    yield put(setOverlayLoadingModalState({visible: false}));
    ToastMessageService.toastError('Please try again!');
    CrashlyticsService.recordError(err);
  }
}

function* markTodoItemAsCompletedSaga({
  payload,
}: ReturnType<typeof markTodoItemAsCompletedAction>) {
  try {
    yield SagaService.callApi('patch', URL.markTodoItemAsCompleted, {
      data: payload,
    });
    yield all([put(fetchAllTodoAction()), put(fetchTodayTodoAction())]);
  } catch (err) {
    CrashlyticsService.recordError(err);
  }
}

export function* todoItemSaga() {
  yield all([
    takeLeading(addNewTodoItemAction.toString(), addNewTodoItemSaga),
    takeLeading(updateTodoItemAction.toString(), updateTodoItemSaga),
    takeLeading(deleteTodoItemAction.toString(), deleteTodoItemSaga),
    takeLeading(
      markTodoItemAsCompletedAction.toString(),
      markTodoItemAsCompletedSaga,
    ),
  ]);
}
