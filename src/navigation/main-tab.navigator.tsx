import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainBottomNavigation} from '@components/main-bottom-navigation.component';
import {HomeSvg} from '@components/svg/home-svg';
import {ProfileSvg} from '@components/svg/profile-svg';

const BottomTab = createBottomTabNavigator();

const EmptyComponent = () => <View />;

export const MainTabNavigator = (): React.ReactElement => {
  return (
    <BottomTab.Navigator
      initialRouteName="DebitCard"
      tabBar={props => <MainBottomNavigation {...props} />}>
      <BottomTab.Screen
        name="Home"
        component={EmptyComponent}
        options={{
          title: 'Home',
          tabBarIcon: ({color}: {color: string}) => <HomeSvg fill={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={EmptyComponent}
        options={{
          title: 'Profile',
          tabBarIcon: ({color}: {color: string}) => <ProfileSvg fill={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
};
