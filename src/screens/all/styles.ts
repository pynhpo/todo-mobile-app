import {StyleSheet} from 'react-native';
import {colors} from '@theme/colors';

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
});
