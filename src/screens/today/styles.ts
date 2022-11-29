import {StyleSheet} from 'react-native';
import {colors} from '@theme/colors';
import {Colors, BorderRadiuses} from 'react-native-ui-lib';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    backgroundColor: colors.layoutLevel2,
    borderRadius: 8,
    padding: 8,
    flex: 1,
  },
  searchIcon: {
    marginRight: 4,
  },
  filterIcon: {
    marginLeft: 8,
  },
  greenPlusIconCover: {
    position: 'absolute',
    bottom: 32,
    right: 32,
  },

  // draft
  image: {
    width: 54,
    height: 54,
    borderRadius: BorderRadiuses.br20,
    marginHorizontal: 14,
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey70,
  },
});
