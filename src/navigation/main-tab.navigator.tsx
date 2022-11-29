import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainBottomNavigation} from '@components/main-bottom-navigation.component';
import {FocusSvg} from '@components/svg/focus-svg';
import {ListSvg} from '@components/svg/list-svg';
import {ProfileSvg} from '@components/svg/profile-svg';
import {SCREEN_NAME} from '@constants/navigation.constant';
import {AllScreen} from '@screens/all';

const BottomTab = createBottomTabNavigator();

const EmptyComponent = () => <View />;

export const MainTabNavigator = (): React.ReactElement => {
  return (
    <BottomTab.Navigator
      initialRouteName={SCREEN_NAME.all}
      tabBar={props => <MainBottomNavigation {...props} />}>
      <BottomTab.Screen
        name={SCREEN_NAME.all}
        component={AllScreen}
        options={{
          title: 'All',
          tabBarIcon: ({color}: {color: string}) => <ListSvg fill={color} />,
        }}
      />
      <BottomTab.Screen
        name={SCREEN_NAME.today}
        component={EmptyComponent}
        options={{
          title: 'Today',
          tabBarIcon: ({color}: {color: string}) => <FocusSvg fill={color} />,
        }}
      />
      <BottomTab.Screen
        name={SCREEN_NAME.profile}
        component={EmptyComponent}
        options={{
          title: 'Profile',
          tabBarIcon: ({color}: {color: string}) => <ProfileSvg fill={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
};
