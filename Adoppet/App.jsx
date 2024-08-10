
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Pages/Screen';
import Main from './src/Pages/Main';
import { View, Image } from 'react-native';
import  icono from"./src/img/icono.png"
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './src/Pages/Profile';
import Adopt from './src/Pages/Adop';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

const Stack= createNativeStackNavigator();
const Tab= createBottomTabNavigator();

function TabNavigator() {
  return (

  <Tab.Navigator style={style.Tab}>
      <Tab.Screen name='Home' component={Profile} options={{
        title:'ADOPPET',
        headerTintColor:'white',
        headerStyle:{
          backgroundColor:"#1999a6"
        },
        tabBarIcon: ({ color, size }) => (
          <FontAwesomeIcon icon={faHouse} />
        ),
        headerRight: () => (
          <View  style={style.view}>
            <Image
              source={icono} style={style.img} />
          </View>
        )
      }}/>
    <Tab.Screen 
        name='Inicio' 
        component={Adopt} 
        options={{
          title: 'Perfil',
         //se ponen los iconos
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faUser} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};


function App() {

  return(
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name='main' component={Home} options={{headerShown:false}}/>
      <Stack.Screen name='Home' component={Main}  options={{
          title:"ADDOPPET",
          headerTintColor:'white',
          
          headerStyle:{
            position:"relative",
            top:0,
            backgroundColor:"#1999a6"
          },
          headerRight: () => (
            <View  style={style.view}>
              <Image
                source={icono} style={style.img} />
            </View>
          ),
      }}/>

<Stack.Screen 
          name="Home2" 
          component={TabNavigator} 
          options={{ headerShown: false }} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}




const style= StyleSheet.create({
img:{
  width:70,
  height:70,
  resizeMode:"contain",
  
},
  view:{
    marginRight: 15, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  
})
export default App;