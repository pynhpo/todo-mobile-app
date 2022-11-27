import {reduxStorage} from '@services/app-storage.service';
import {configureStore} from '@reduxjs/toolkit';
import {createLogger} from 'redux-logger';
import {persistReducer, persistStore, PersistConfig} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer, {CombinedStateType, initialState} from './reducer';
import Saga, {rootSaga} from './saga';

const persistConfig: PersistConfig<CombinedStateType> = {
  key: 'root',
  storage: reduxStorage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['auth'],
  // timeout: 0, // The code base checks for falsy, so 0 disables
};

const persistedReducer = persistReducer<CombinedStateType>(
  persistConfig,
  rootReducer,
);

const store = configureStore({
  preloadedState: initialState,
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middleware = [
      ...getDefaultMiddleware({
        thunk: false,
        serializableCheck: false,
        immutableCheck: false,
      }),
      ...(__DEV__ ? [Saga, createLogger()] : [Saga]),
    ];
    return middleware;
  },
});

Saga.run(rootSaga);

export const persistor = persistStore(store);

export default store;
