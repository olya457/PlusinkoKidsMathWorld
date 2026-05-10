jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-linear-gradient', () => {
  const React = require('react');
  const {View} = require('react-native');

  return function LinearGradient({children, ...props}) {
    return React.createElement(View, props, children);
  };
});
