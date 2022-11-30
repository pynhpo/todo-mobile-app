import {Colors, ThemeManager, ButtonProps} from 'react-native-ui-lib';

const colors = {
  primary: '#092E76',
  secondary: '#006868',
  inactiveTab: '#DDDDDD',
  lightGray: '#DCDCDC',
  disabledButton: '#EEEEEE',
  gray: 'gray',
  red: 'red',
  black: 'black',
  green: 'green',
  white: 'white',
  transparent: 'transparent',
  lightBlue: 'lightblue',
  lightGreen: '#E5FAF0',
  inputTextColor: '#222222',
  layoutLevel1: '#FFFFFF',
  layoutLevel2: '#EEEEEE',
  defaultLabel1: '#FFFFFF',
  defaultLabel2: '#25345F',
  pTextColor: '#222222',
};

Colors.loadColors(colors);

ThemeManager.setComponentTheme('Button', (props: ButtonProps) => {
  return {
    backgroundColor: props.outline ? undefined : colors.primary,
    color: props.outline ? colors.primary : undefined,
    outlineColor: props.outline ? colors.primary : undefined,
  };
});

ThemeManager.setComponentTheme('TouchableOpacity', () => {
  return {
    hitSlop: {bottom: 10, left: 10, right: 10, top: 10},
  };
});
