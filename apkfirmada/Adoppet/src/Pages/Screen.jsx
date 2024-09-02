import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import icono from "./icono.png"
import LoginModal from '../Modal/Modal';
import axiosClient from '../utils/AxiosClient';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
    const navigation= useNavigation();
    const [openmodal, setmodal] = useState(false);

    const modalopen = () => {
        console.log("yes"),
        setmodal(true)
    };
    const modalclose = () =>{
        console.log("no")
         setmodal(false);
        
        }



    const login=async()=>{
        const data={
            correo:"invitado@gmail.com",
            contrasena:"123456789"
        }
        const logueo = await axiosClient.post("/login", data)
        if (logueo.status==200) {
             await AsyncStorage.setItem('token',logueo.data.token);
                await AsyncStorage.setItem('usuario', JSON.stringify(logueo.data.mensaje));
                const usuario = await AsyncStorage.getItem('usuario');
                if (usuario) {
                    const users = JSON.parse(usuario);
                    const tipo = users.tipo;
                    navigation.navigate("Home2");
                }
        }
    }
   

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.name}>ADOPPET</Text>
                <View style={styles.lem}>
                    <Image  source={icono}/>
                    <Text style={styles.description}>
                        En <Text style={styles.highlight}>adoppet</Text> creemos que cada mascota merece un hogar lleno de amor y cuidado. 
                        Únete a nuestra comunidad y encuentra a tu compañero perfecto
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={modalopen}>
                        <Text style={styles.buttonText}>Iniciar Sesión</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.invitado} onPress={login}>
                        <Text style={{color:'#1999a6', textDecorationLine:"underline", textDecorationStyle:"solid", textShadowColor:'#1999a6', marginTop:56, fontSize:25,}}> Ingresar Como Invitado</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <LoginModal visible={openmodal} onClose={modalclose} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20, 
    },
    name: {
        color: '#1999a6',
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 20, 
    },
    lem: {
        width: '90%', 
        alignItems: 'center',
    },
    description: {
        color: 'black',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    highlight: {
        textTransform: 'capitalize',
        color: '#1999a6',
    },
    button: {
        backgroundColor: '#1999a6',
        height: 44,
        width: '100%',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },

    invitado: {
        textDecorationLine:"line-through",
         color:'#1999a6'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18, // Ajuste para un tamaño más adecuado
    },
    buttonTexti: {
        color: 'white',
        fontWeight: 'bold',
        position:"relative",
        top:"45%",
        fontSize: 18, 
    }
});

export default Home;
