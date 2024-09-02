import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';


const Logout = () => {
    const navigation = useNavigation();

    const logout = async () => {
        try {
            await AsyncStorage.clear();
            Alert.alert('Sesión Cerrada');
            navigation.navigate('main');
        } catch (e) {
            Alert.alert('Error al cerrar sesión');
            console.log('Error:', e);
        }
    };

    return (
        <TouchableOpacity style={style.btn} onPress={logout}>
            <Text style={{textAlign:"center", fontWeight:"bold", color:"white"}}>Salir</Text>
        </TouchableOpacity>
    );
};
const style= StyleSheet.create({
    btn:{
     backgroundColor:"#1999a6",
     borderRadius:32,
       width:"45%",
       height:"23%",
       position:"relative",
       left:"25%",
       
    }
})
export default Logout;
