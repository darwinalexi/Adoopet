import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosClient from '../utils/AxiosClient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

export const Login = ({navigation}) => {
    
const [user,setuser]= useState({
  correo:'',
  contrasena:''
});

const handinputchange = (text, fieldName) => {
  setuser(prevUser => {
    const updatedUser = {
      ...prevUser,
      [fieldName]: text
    };
    console.log('Usuario actualizado:', updatedUser); 
    return updatedUser;
  });
};

const login = async () => {
  try {
    const logueo = await axiosClient.post("/login", user);
    if (logueo.status == 200) {
      await AsyncStorage.setItem('token', logueo.data.token);
      await AsyncStorage.setItem('usuario', JSON.stringify(logueo.data.mensaje));
      navigation.navigate('main');
    } else if (logueo.status == 404) {
      console.log("usuario enviado", user);
    }
  } catch (error) {
    console.log("respuesta", error);
  }
};

  return (
       <SafeAreaView style={styles.SafeAreaView}>
        <ScrollView style={styles.main}> 
          <View>
           <Text style={[styles.title,{color:'black', fontSize:45 }]}>Iniciar Sesion</Text>
           <View style={{marginTop:94, width:'96%', paddingLeft:14}}>
           <Text style={{color:'black', textTransform:'capitalize', fontSize:18}}>correo electronico</Text>
           <FontAwesomeIcon icon={faEnvelope} size={33} color="#194F71"style={{position:'absolute', left:26, top:33}}/>
           <TextInput
              placeholderTextColor="gray"
              placeholder='Ingresa tu Correo'
              onChangeText={(text) => handinputchange(text, 'correo')}
              style={styles.input}
            />
    </View>
          <View>
           <Text style={{color:'black', textTransform:'capitalize', fontSize:18}}>Contraseña</Text>
        
           <TextInput
              placeholderTextColor='gray'
              placeholder='Ingresa tu Contraseña'
              secureTextEntry // Para ocultar la contraseña
              onChangeText={(text) => handinputchange(text, 'contrasena')}
              style={styles.input}
            />
           </View>
           <TouchableOpacity onPress={login} style={[styles.button, {marginLeft:14, height:53}]}>
           <Text style={{fontFamily:'bold', fontSize:19, marginLeft:83}}>Iniciar Sesion</Text>
         </TouchableOpacity>
         </View>

        
         </ScrollView>
       </SafeAreaView>
    );
   };

   const styles = StyleSheet.create({
    SafeAreaView: {
       justifyContent: 'center',
         backgroundColor:'#FFD166',
      
    },
    button: {
       backgroundColor: '#194F71',
       padding: 10,
       borderRadius: 56,
       marginTop: 20,
       width:'90%',
marginTop:'13%'
      },
    input:{
      borderRadius:45,
      opacity:32,
      borderRadius:23,
      borderColor:'#194F71',
      textAlign:'center',
      borderWidth:3,
      color:'black',

    },
    title:{
     position:'absolute',
     left:38
    },
    main:{
      position:'relative',
      top:127,
      backgroundColor:'#FFD166',
      paddingBottom:190
    }
   });