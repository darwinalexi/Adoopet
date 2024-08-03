import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import Logo from "../img/logo.png";

export const Home = ({ navigation }) => {
  return (
     <SafeAreaView style={styles.SafeAreaView}>
      

       <View style={[{width:323},styles.Image]}>
       <View>
       <Text style={{  color:'black', fontSize:23, marginLeft:115}}>ADOPPET</Text>
       </View>
        <Image source={Logo} style={{marginLeft:48}} />
        <Text style={{fontSize:23, color:'black'}}>En nuestra App podrás Adoptar una mascota y cambiar la vida de un canino</Text>
       </View>

       <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
            <Text style={{ position:'relative', left:94}}>Iniciar Sesion</Text>
          </TouchableOpacity>
        

          <TouchableOpacity onPress={() => navigation.navigate('main')} style={styles.button}>
            <Text style={{ position:'relative', left:64, color:'white', textDecorationLine:'underline'}}>Iniciar Como Invitado</Text>
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
     backgroundColor:'#FFD166',
  },
  button: {
     backgroundColor: '#194F71',
     padding: 10,
     borderRadius: 23,
     marginTop: 20,
     width:313,
     height:'14%'
  },
  buttonContainer: {
    position:'relative',
    top:300 
   },
 
  Image:{
    position:'absolute',
    top:'14%'
  }
});
