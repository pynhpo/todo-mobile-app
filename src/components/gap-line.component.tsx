import React, {useMemo, FC} from 'react';
import {StyleSheet} from 'react-native';
import {Colors, View, ViewProps} from 'react-native-ui-lib';

interface GapLineProps extends ViewProps {}

export const GapLine: FC<GapLineProps> = (props): React.ReactElement => {
  const {style, ...restProps} = props;
  const customStyle = useMemo(() => {
    return [styles.root, style];
  }, [style]);

  return <View {...restProps} style={customStyle} />;
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.lightGray,
  },
});
