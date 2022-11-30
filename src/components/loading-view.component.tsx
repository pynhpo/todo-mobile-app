import React from 'react';
import {ActivityIndicator} from 'react-native';
import {View} from 'react-native-ui-lib';
import {Colors} from 'react-native-ui-lib';

export const LoadingView = (): React.ReactElement => {
  return (
    <View center flex>
      <ActivityIndicator size="small" color={Colors.primary} />
    </View>
  );
};
