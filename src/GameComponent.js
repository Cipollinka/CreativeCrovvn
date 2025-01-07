import React from "react";
import AppNavigator from './components/AppNavigator';
import BackgroundMusic from './components/BackgroundMusic';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function GameComponent() {
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