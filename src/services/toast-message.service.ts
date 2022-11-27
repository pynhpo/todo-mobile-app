import {ErrorCode} from '@services/fetcher.service';
import get from 'lodash/get';
import Toast from 'react-native-root-toast';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const toastColor = {
  INFO: '#007bff',
  SUCCESS: '#28a745',
  WARNING: '#ffc107',
  ERROR: '#dc3545',
};

export class ToastMessageService {
  private static lastToast = null;
  private static defaultToastOption = {
    duration: Toast.durations.SHORT,
    position: getStatusBarHeight(),
    opacity: 1,
    shadowColor: '#fff',
    onHidden: () => {
      ToastMessageService.lastToast = null;
    },
  };

  static toastInfo = (message: string): void => {
    ToastMessageService.lastToast && Toast.hide(ToastMessageService.lastToast);
    ToastMessageService.lastToast = Toast.show(message, {
      ...ToastMessageService.defaultToastOption,
      backgroundColor: toastColor.INFO,
    });
  };

  static toastSuccess = (message: string): void => {
    ToastMessageService.lastToast && Toast.hide(ToastMessageService.lastToast);
    ToastMessageService.lastToast = Toast.show(message, {
      ...ToastMessageService.defaultToastOption,
      backgroundColor: toastColor.SUCCESS,
    });
  };

  static toastWarning = (message: string): void => {
    ToastMessageService.lastToast && Toast.hide(ToastMessageService.lastToast);
    ToastMessageService.lastToast = Toast.show(message, {
      ...ToastMessageService.defaultToastOption,
      backgroundColor: toastColor.WARNING,
    });
  };

  static toastError = (message: string): void => {
    ToastMessageService.lastToast && Toast.hide(ToastMessageService.lastToast);
    ToastMessageService.lastToast = Toast.show(message, {
      ...ToastMessageService.defaultToastOption,
      backgroundColor: toastColor.ERROR,
    });
  };

  static handleError = (err: Error): void => {
    ToastMessageService.lastToast && Toast.hide(ToastMessageService.lastToast);
    switch (get(err, 'response.data.code') as any) {
      case ErrorCode.no_content:
        ToastMessageService.toastWarning('No content!');
        break;
      default:
        ToastMessageService.toastWarning('Error! Please try again!');
        break;
    }
  };
}
