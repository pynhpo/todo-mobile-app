import {StyleSheet} from 'react-native';
import {Colors} from 'react-native-ui-lib';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
  },
  mainContentCover: {
    backgroundColor: Colors.layoutLevel2,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingBottom: 16,
    flex: 1,
    marginBottom: 16,
  },
  dateCover: {
    backgroundColor: Colors.layoutLevel2,
    borderRadius: 8,
    padding: 16,
    paddingBottom: 0,
    flex: 1,
    marginBottom: 16,
  },
  repeatCover: {
    backgroundColor: Colors.layoutLevel2,
    borderRadius: 8,
    padding: 16,
    paddingBottom: 0,
    flex: 1,
    marginBottom: 16,
  },
  imageUploadPlaceholder: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderStyle: 'dashed',
    borderRadius: 1,
    flex: 1,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedImage: {
    resizeMode: 'contain',
    height: 200,
  },
  animatedImageContainer: {
    backgroundColor: Colors.layoutLevel2,
    borderRadius: 8,
  },
  relative: {
    position: 'relative',
  },
  resetIconOfImage: {
    position: 'absolute',
    top: -8,
    right: 0,
  },
  resetIconOfDueDate: {
    position: 'absolute',
    top: 26,
    right: 0,
  },
});
