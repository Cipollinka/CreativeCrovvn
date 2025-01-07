import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import AppManager from '@/AppManager';

function App(): React.JSX.Element {
  return <AppManager />
}
AppRegistry.registerComponent(appName, () => App);

export default App;
