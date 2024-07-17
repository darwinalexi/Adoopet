import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import Logo from"../img/logo.png"

export const Home = ({ navigation }) => {

  /**const user=[
    user="invitado",
    contraseña="invita123"
  ]
**/
    return (
       <SafeAreaView style={styles.SafeAreaView}>
         <View style={{width:323}}>
          <Image source={Logo} style={{marginLeft:48}}></Image>
          <Text style={{color:'orange', fontSize:23, marginLeft:115, paddingBottom:23}}> ADOPPET</Text>
          <Text style={{fontSize:23, color:'black'}}>En nuestra App podras Adoptar una mascota y cambiar la vida de un canino</Text>
         </View>

         <View style={styles.btn}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={[styles.button, style={borderRadius:23}]}>
              <Text style={{ position:'relative', left:94}}>Iniciar Sesion</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Sign')} style={{borderColor:'orange', borderWidth:2,  width:313,  marginTop: 20, borderRadius:23}}>
              <Text style={{margin:10, position:'relative', left:94, color:'black' }}>Registrarse</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('main')} style={{  width:313,  marginTop: 20, borderRadius:23}}>
              <Text style={{margin:10, position:'relative', left:94, color:'black', textDecorationStyle:'solid'}}>Iniciar Como Anvitado</Text>
            </TouchableOpacity>
         </View>
         
       </SafeAreaView>
    );
   };

   const styles = StyleSheet.create({
    SafeAreaView: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
    },
    button: {
       backgroundColor: 'orange',
       padding: 10,
       borderRadius: 5,
       marginTop: 20,
       width:313
    },
    btn:{
      position:'relative',
      top:45
    }

   });