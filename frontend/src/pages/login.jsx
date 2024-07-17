import axios from 'axios';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import { ScrollView } from 'react-native';
import { AsyncStorage } from 'react-native';
export const Login = ({navigation}) => {
    
const [user,setuser]= useState([]);


const handinputchange = (event) => {
  const { name, value } = event.target;
  setuser((prevUsuarios) => {
    const updatedUsuarios = {
    ...prevUsuarios,
      [name]: value
    };
    console.log('Updated usuarios:', updatedUsuarios);
    return updatedUsuarios;
  });
}

const login =  async()=>{mensaje

  const logueo= await axios.post("http://192.168.0.104:/4001/login", user)
  if (logueo.status==200 ) {
    await AsyncStorage.setItem('token', logueo.data.token);
    await AsyncStorage.setItem('usuario', JSON.stringify(logueo.data.mensaje));
  }
}

  return (
       <SafeAreaView style={styles.SafeAreaView}>
        <ScrollView style={styles.main}> 
          <View>
           <Text style={[styles.title,{color:'black', fontSize:45 }]}>Login</Text>
           <View style={{marginTop:94, width:'96%', paddingLeft:14}}>
           <Text style={{color:'black', textTransform:'capitalize', fontSize:18}}>correo electronico</Text>
              <TextInput placeholderTextColor="gray" placeholder='Ingresa tu Correo'  onChange={handinputchange} style={styles.input}></TextInput>
    
           <Text style={{color:'black', textTransform:'capitalize', fontSize:18}}>Contraseña</Text>
             <TextInput placeholderTextColor='gray' placeholder='Ingresa tu Contraseña' style={styles.input} onChange={handinputchange}></TextInput>
           </View>
           <TouchableOpacity onPress={() => navigation.navigate('Home')} style={[styles.button, {marginLeft:14, height:53}]}>
           <Text style={{fontFamily:'bold', fontSize:19, marginLeft:83}}>Iniciar Sesion</Text>
         </TouchableOpacity>
         </View>

         <View>
           <TouchableOpacity onPress={() => navigation.navigate('Sign')} style={{marginLeft:14, backgroundColor:'#F2EDAA',height:53, borderColor:'orange', borderWidth:2, marginTop:23, borderRadius:42}}>
           <Text style={{fontFamily:'bold', fontSize:19, marginLeft:103, }}>Registrate</Text>
         </TouchableOpacity>
         </View>
         </ScrollView>
       </SafeAreaView>
    );
   };

   const styles = StyleSheet.create({
    SafeAreaView: {
       justifyContent: 'center',
      
    },
    button: {
       backgroundColor: 'orange',
       padding: 10,
       borderRadius: 56,
       marginTop: 20,
       width:'90%',
marginTop:'13%'
      },
    input:{
      borderBottomWidth:2,
      borderRadius:45,
      opacity:32,
      borderRadius:23,
      
      textAlign:'center'

    },
    title:{
     position:'absolute',
     left:78
    },
    main:{
      position:'relative',
      top:127
    }
   });