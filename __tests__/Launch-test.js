import 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {LaunchScreen} from '../src/screens/launch';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('Launch snapshot', () => {
  const initialState = {};
  const mockStore = configureStore();
  const store = mockStore(initialState);
  const snap = renderer
    .create(
      <Provider store={store}>
        <LaunchScreen />
      </Provider>,
    )
    .toJSON();
  expect(snap).toMatchSnapshot();
});
