import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {LaunchScreen} from '@screens/launch';
import {LoginScreen} from '@screens/login';
import {SCREEN_NAME} from '@constants/navigation.constant';
import {MainTabNavigator} from './main-tab.navigator';

const Stack = createStackNavigator();

export const RootStackNavigator = (): React.ReactElement => (
  <Stack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName={SCREEN_NAME.launch}>
    <Stack.Screen name={SCREEN_NAME.launch} component={LaunchScreen} />
    <Stack.Screen name={SCREEN_NAME.login} component={LoginScreen} />
    <Stack.Screen name={SCREEN_NAME.mainTab} component={MainTabNavigator} />
  </Stack.Navigator>
);
