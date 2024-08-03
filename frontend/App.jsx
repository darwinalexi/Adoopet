import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './src/pages/Home';
import {Login} from"./src/pages/login"
import { Main } from './src/pages/Main';


const Stack = createNativeStackNavigator();
function App() {
 return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
        <Stack.Screen  name='main' component={Main} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
 );
}



export default App;
