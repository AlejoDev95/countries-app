module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    'react-native-worklets/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@core': './src/core',
          '@shared': './src/shared',
          '@features': './src/features',
          '@navigation': './src/navigation',
        },
      },
    ],
  ],
};
