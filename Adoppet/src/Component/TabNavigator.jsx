import Adopcionesp from '../Pages/Adopt';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AdopcionesAdop from '../Pages/AdopcionesAcept';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse, faUser, faFingerprint } from '@fortawesome/free-solid-svg-icons';
import Pendientes from '../Pages/Adopteraing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';


const Tab= createBottomTabNavigator();



export function TabNavigator() {
  const [tipo, settipo]= useState([])
 const tipo_user=async()=>{
  const User = await AsyncStorage.getItem('usuario')
  if (User) {
    const type= JSON.parse(User)
    const tipo_usuario= type.tipo
   settipo(tipo_usuario)
  } 
 }
 useEffect(()=>{
tipo_user();
 },[])
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
  
      switch(route.name){
        case 'Home':
        iconName=faHouse
        break
        case 'Adopciones':
          iconName=faFingerprint
          break
          case 'AdopcionesA':
            iconName=faFingerprint
            break
            default:
            iconName =faUser
      }
   
  
            return <FontAwesomeIcon icon={iconName} color={color} size={size} />;
          },
                    headerShown: false,
                    tabBarActiveTintColor: '#1999a6',
                    tabBarInactiveTintColor: 'gray',
                    tabBarLabelStyle: {
                    fontSize: 12,
              },

                    tabBarStyle:{
                    borderRadius:12,
                    width:"96%",
                    marginLeft:13,
                    borderColor:"#1999a6",
                    borderWidth:2
                    }
                  })}
      >

<Tab.Screen name="Home" component={Adopcionesp} />
{tipo === 'Administrador' && (
        <>
          <Tab.Screen name="Adopciones" component={Pendientes} />
          <Tab.Screen name="AdopcionesA" component={AdopcionesAdop} />
        </>
      )}
      {tipo === 'Usuario' && (
        <>
          <Tab.Screen name="Adopciones" component={Pendientes} />
          <Tab.Screen name="AdopcionesA" component={AdopcionesAdop} />
        </>
      )}
       
      </Tab.Navigator>
    );
  }
  