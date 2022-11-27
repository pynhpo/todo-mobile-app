import {View} from 'react-native';
import {logoutAction} from '@redux/auth/actions';
import {AppStorage} from '@services/app-storage.service';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {NavigationService} from '@services/navigation.service';
import {CrashlyticsService} from '@services/crashlytics.service';
import {SCREEN_NAME} from '@constants/navigation.constant';
import {useSelector} from 'react-redux';
import {selectNavigationReady} from '@redux/app/selectors';

export const LaunchScreen = (): React.ReactElement => {
  const dispatch = useDispatch();
  const isReady = useSelector(selectNavigationReady);

  useEffect(() => {
    try {
      if (isReady) {
        const authToken = AppStorage.getAuthToken();
        if (authToken) {
          NavigationService.reset(SCREEN_NAME.mainTab);
        } else {
          NavigationService.reset(SCREEN_NAME.login);
        }
      }
    } catch (err) {
      dispatch(logoutAction());
      CrashlyticsService.recordError(err);
    }
  }, [dispatch, isReady]);
  return <View />;
};
