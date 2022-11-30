module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!@react-native-firebase/.*|@react-native/.*|react-native/.*|react-native-root-siblings/.*|axios/.*|react-native-root-toast/.*|react-native-status-bar-height/.*|react-native-ui-lib/.*|react-native-modal/.*|react-native-animatable/.*|@react-navigation/.*|react-native-reanimated/.*|react-native-image-picker/.*)',
  ],
};
