import React from 'react';
import {ActivityIndicator} from 'react-native';
import {View} from 'react-native-ui-lib';
import {colors} from '@theme/colors';

export const LoadingView = (): React.ReactElement => {
  return (
    <View center flex>
      <ActivityIndicator size="small" color={colors.primary} />
    </View>
  );
};
