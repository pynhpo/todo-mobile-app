import {StyleSheet} from 'react-native';
import {Colors} from 'react-native-ui-lib';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
    paddingBottom: 0,
  },
  searchInput: {
    backgroundColor: Colors.layoutLevel2,
    borderRadius: 8,
    padding: 8,
    flex: 1,
  },
  searchIcon: {
    marginRight: 4,
  },
  filterIconCover: {
    position: 'relative',
  },
  filterIcon: {
    marginLeft: 8,
  },
  bluePlusIconCover: {
    position: 'absolute',
    bottom: 32,
    right: 32,
  },
  sectionHeader: {
    marginBottom: -16,
    backgroundColor: Colors.layoutLevel1,
  },
});
