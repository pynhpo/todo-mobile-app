import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RootSiblingParent} from 'react-native-root-siblings';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import store, {persistor} from '@init/store';
import {LoadingView} from '@components/loading-view.component';
import {LoadingOverlay} from '@components/loading-overlay.component';
import {AppNavigator} from '@navigation/app.navigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <RootSiblingParent>
        <GestureHandlerRootView style={styles.gestureHandlerRootView}>
          <Provider store={store}>
            <PersistGate loading={<LoadingView />} persistor={persistor}>
              <AppNavigator />
              <LoadingOverlay />
            </PersistGate>
          </Provider>
        </GestureHandlerRootView>
      </RootSiblingParent>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
});

export default App;
