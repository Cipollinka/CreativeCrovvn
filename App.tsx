import React from 'react';
import AppNavigator from './src/components/AppNavigator';
import BackgroundMusic from '@/components/BackgroundMusic';
import {AppRegistry, Text} from 'react-native';
import {name as appName} from './app.json';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  // @ts-ignore
  Text.defaultProps = Text.defaultProps || {};
  // @ts-ignore
  Text.defaultProps.style = {fontFamily: 'LexendDeca-Regular'};

  return (
    <SafeAreaProvider>
      <BackgroundMusic />
      <AppNavigator />
    </SafeAreaProvider>
  );
}
AppRegistry.registerComponent(appName, () => App);

export default App;
