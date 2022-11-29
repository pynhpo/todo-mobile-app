import {StyleSheet} from 'react-native';
import {colors} from '@theme/colors';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
  },
  mainContentCover: {
    backgroundColor: colors.layoutLevel2,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingBottom: 16,
    flex: 1,
  },
  dateCover: {
    backgroundColor: colors.layoutLevel2,
    borderRadius: 8,
    padding: 16,
    flex: 1,
  },
  gap: {
    width: '100%',
    height: 1,
    backgroundColor: colors.lightGray,
    marginTop: 8,
  },
  imageUploadPlaceholder: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderStyle: 'dashed',
    borderRadius: 1,
    flex: 1,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
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
