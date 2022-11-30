import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React, {useCallback} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Colors} from 'react-native-ui-lib';
import {Text, View} from 'react-native-ui-lib';

export const MainBottomNavigation = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps): React.ReactElement => {
  const onPress = useCallback(
    (route: BottomTabBarProps['state']['routes'][0], isFocused: boolean) => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    },
    [navigation],
  );

  return (
    <SafeAreaView edges={['bottom']} style={styles.safeView}>
      <View style={styles.bottomTabContainer}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label = options.title || route.name;
          const isFocused = state.index === index;

          return (
            <Pressable
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={() => onPress(route, isFocused)}
              style={styles.bottomTabButton}>
              <View style={styles.iconContainer}>
                {options?.tabBarIcon &&
                  options?.tabBarIcon({
                    focused: isFocused,
                    size: 24,
                    color: isFocused ? Colors.primary : Colors.inactiveTab,
                  })}
              </View>
              <Text
                style={{
                  color: isFocused ? Colors.primary : Colors.inactiveTab,
                }}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    backgroundColor: Colors.layoutLevel1,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  bottomTabContainer: {
    flexDirection: 'row',
    minHeight: 56,
    alignItems: 'center',
  },
  bottomTabButton: {
    flex: 1,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 4,
    minHeight: 24,
  },
});
