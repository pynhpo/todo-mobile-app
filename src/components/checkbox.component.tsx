import React, {useMemo, FC, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {
  Colors,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native-ui-lib';

import {UncheckBoxSvg} from './svg/uncheck-box-svg';
import {CheckBoxSvg} from './svg/check-box-svg';

interface CheckboxProps extends Omit<TouchableOpacityProps, 'onPress'> {
  value: boolean;
  onChange: (value: boolean) => void;
}

export const Checkbox: FC<CheckboxProps> = (props): React.ReactElement => {
  const {style, value, onChange, ...restProps} = props;
  const customStyle = useMemo(() => {
    return [styles.root, style];
  }, [style]);

  const onPress = useCallback(() => {
    onChange(!value);
  }, [onChange, value]);

  return (
    <TouchableOpacity {...restProps} style={customStyle} onPress={onPress}>
      {value ? (
        <CheckBoxSvg fill={Colors.blue50} />
      ) : (
        <UncheckBoxSvg fill={Colors.blue50} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {},
});
