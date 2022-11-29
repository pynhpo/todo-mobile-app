module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src/'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: ['./tests/'],
          '@components': './src/components',
          '@init': './src/init',
          '@screens': './src/screens',
          '@services': './src/services',
          '@navigation': './src/navigation',
          '@redux': './src/redux',
          '@constants': './src/constants',
          '@theme': './src/theme',
          '@type': './src/type',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
