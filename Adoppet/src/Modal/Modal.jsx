import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import axiosClient from '../utils/AxiosClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginModal = ({ visible, onClose }) => {
    const navigation = useNavigation();
    const [user, setUser] = useState({});
    
    const handinputchange = (text, fieldName) => {
        setUser(prevUser => ({
            ...prevUser,
            [fieldName]: text
        }));
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const login = async () => {
        if (!user.correo || !user.contrasena) {
            Alert.alert("Llena los campos obligatorios");
            return;
        }

        if (!validateEmail(user.correo)) {
            Alert.alert("Por favor, ingresa un correo electrónico válido.");
            return;
        }

        try {
            const response = await axiosClient.post("/login", user);
            onClose();
            if (response.status === 200) {
               
                await AsyncStorage.setItem('token', response.data.token);
                await AsyncStorage.setItem('usuario', JSON.stringify(response.data.mensaje));
                const usuario = await AsyncStorage.getItem('usuario');
                if (usuario) {
                    const users = JSON.parse(usuario);
                    const tipo = users.tipo;
                    if (tipo=="Administrador" || tipo=="SuperUsuario") {
                        Alert.alert("Su usuario no pose permisos para ingresar a nuestra App")
                       return;
                    }
                    navigation.navigate("Home2");
                }
            } else if (response.status === 404) {
                console.log("Usuario no encontrado:", user);
                Alert.alert("lo sentimos su usuario y contraseña no estan registrados en nuestra Base de Datos")
            }
            console.log(response);
        } catch (error) {
            console.log("Error en login:", error.response ? error.response.data : error.message);
            Alert.alert("Error", "Hubo un problema al iniciar sesión. Intenta nuevamente.");
        }
    };

    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <FontAwesomeIcon icon={faClose} size={25} />
                    </TouchableOpacity>
                    <Text style={styles.modalText}>Iniciar Sesión</Text>
                    <TextInput
                        placeholder='Ingresa Tu Usuario'
                        style={styles.textInput}
                        placeholderTextColor="gray"
                        onChangeText={(text) => handinputchange(text, 'correo')}
                    />
                    <TextInput
                        placeholder='Ingresa Tu Contraseña'
                        style={[styles.textInput, { marginTop: 34 }]}
                        onChangeText={(text) => handinputchange(text, 'contrasena')}
                        placeholderTextColor="gray"
                        secureTextEntry
                    />
                    <TouchableOpacity style={styles.login} onPress={login}>
                        <Text style={styles.loginText}>Iniciar Sesión</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 28,
        marginBottom: 20,
        color: 'black'
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 6,
        borderRadius: 5,
    },
    textInput: {
        borderWidth: 2,
        borderRadius: 22,
        width: "85%",
        paddingLeft: 33,
        color: 'black',
    },
    login: {
        backgroundColor: '#1999a6',
        width: "85%",
        marginTop: 45,
        borderRadius: 23,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginText: {
        paddingLeft: 34,
        paddingTop: 2,
        fontWeight: 'bold',
        fontSize: 23,
        color: "white"
    }
});

export default LoginModal;