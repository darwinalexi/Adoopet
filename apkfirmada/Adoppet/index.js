/**
 * @format
 */
// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import App from './App.jsx';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
