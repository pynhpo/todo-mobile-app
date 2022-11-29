import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {setOverlayLoadingModalState} from '../modal/overlayLoading/slice';
import {AppStorage} from '@services/app-storage.service';
import {all, call, put, takeLeading} from 'redux-saga/effects';
import {CrashlyticsService} from '@services/crashlytics.service';
import {NavigationService} from '@services/navigation.service';
import {ToastMessageService} from '@services/toast-message.service';
import {SCREEN_NAME} from '@constants/navigation.constant';
import {loginAction, logoutAction} from './actions';
import {resetUserState, setUserState} from './user/slice';

function* signOutSaga() {
  try {
    yield put(setOverlayLoadingModalState({visible: true}));
    yield auth().signOut();
    yield call(AppStorage.removeAuthToken);
    yield put(resetUserState());
    yield call(NavigationService.reset, SCREEN_NAME.login);
  } catch (err) {
    CrashlyticsService.recordError(err);
    ToastMessageService.toastWarning('Please try again!');
  } finally {
    yield put(setOverlayLoadingModalState({visible: false}));
  }
}

function* loginSaga({payload}: ReturnType<typeof loginAction>) {
  try {
    yield put(setOverlayLoadingModalState({visible: true}));
    if (!payload.email || !payload.password) {
      throw new Error();
    }

    const res: FirebaseAuthTypes.UserCredential =
      yield auth().signInWithEmailAndPassword(
        payload?.email,
        payload?.password,
      );

    yield call(AppStorage.setAuthToken, res?.user?.uid);
    yield put(
      setUserState({
        uid: res?.user?.uid,
        email: res?.user?.email,
      }),
    );
    yield put(setOverlayLoadingModalState({visible: false}));
    yield call(NavigationService.reset, SCREEN_NAME.mainTab);
  } catch (err) {
    yield put(setOverlayLoadingModalState({visible: false}));
    ToastMessageService.toastWarning('Please try again!');
    CrashlyticsService.recordError(err);
  }
}
export function* authSaga() {
  yield all([
    takeLeading(loginAction.toString(), loginSaga),
    takeLeading(logoutAction.toString(), signOutSaga),
  ]);
}
