import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Pages/Screen';
import { View, Image, TouchableOpacity } from 'react-native';

import { StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { TabNavigator } from './src/Component/TabNavigator';
import Adopciones from './src/Pages/Adopt';
import Profile from './src/Pages/Profile';
import Adoptar from './src/Pages/Adoptar';
import Categories from './src/Pages/Categories';
import Municipios from './src/Pages/Municipios';
import Departamentos from './src/Pages/Departament';
import Slider from './src/Component/Slaider/Slider';

const Stack= createNativeStackNavigator();


function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Slaider'>
      <Stack.Screen name='main' component={Home} options={{headerShown:false}}/>

      <Stack.Screen name='Home' component={Adopciones}  options={{
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
  source={require('./src/Component/img/icono.png')}
  style={style.img}
/>
            </View>
          ),
      }}/>
       <Stack.Screen name='Adoptar' component={Adoptar}/>

<Stack.Screen 
          name="Home2" 
          component={TabNavigator} 
          
          options={({ navigation }) => ({
            title: 'ADOPPET',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: "#1999a6"
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Perfil')} >
                <FontAwesomeIcon icon={faUser} color="white" size={26} options={{backgroundColor:"#1999a6", margin:53 }}/>
              </TouchableOpacity>
            )
          })} 
        />

   <Stack.Screen name='Slaider'
        options={{headerShown:false}} 
        component={Slider}
        />
        <Stack.Screen name='Perfil'
        options={{
          title: 'ADOPPET',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#1999a6',
          },
        }} 
        component={Profile}
        />
          <Stack.Screen name='Departamento'
        options={{
          title: 'ADOPPET',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#1999a6',
          },
        }} 
        component={Departamentos}
        />
        <Stack.Screen name='Categotria'
        options={{
          title: 'ADOPPET',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#1999a6',
          },
        }} 
        component={Categories}
        /> 
        
        <Stack.Screen 
            name="Municipios" 
            component={Municipios} 
            options={{
              title: 'ADOPPET',
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#1999a6',
              },
            }} 
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