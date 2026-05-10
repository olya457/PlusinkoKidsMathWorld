import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppNavigator} from './src/navigation/AppNavigator';
import {AppStateProvider} from './src/state/AppStateContext';
import {colors} from './src/theme/theme';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <AppStateProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.background}
          translucent={false}
        />
        <AppNavigator />
      </AppStateProvider>
    </SafeAreaProvider>
  );
}

export default App;
