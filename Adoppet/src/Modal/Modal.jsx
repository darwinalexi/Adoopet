import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet,  TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const LoginModal = ({ visible, onClose }) => {

    const navigation=useNavigation();
    const [user, setuser]=useState([])

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

    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >

            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <FontAwesomeIcon icon={faClose} size={25}/>
                    </TouchableOpacity>
                    <Text style={styles.modalText}>iniciar Sesion</Text>
                     <TextInput
                      placeholder='Ingresa Tu Usuario' 
                     style={styles.TextInput}
                     placeholderTextColor="gray"
                     onChangeText={(text) => handinputchange(text, 'correo')}
                     />
                      <TextInput
                     placeholder='Ingresa Tu Contraseña' 
                     style={[styles.TextInput, {marginTop:34}]}
                     onChangeText={(text) => handinputchange(text, 'contrasena')}
                     placeholderTextColor="gray"
                     secureTextEntry
                     />
                       <TouchableOpacity  style={styles.login}   onPress={() => navigation.navigate('Home')}>
                        <Text style={{ paddingLeft:34, paddingTop:2, fontWeight:'bold', fontSize:23, color:"white"}}>Iniciar Sesion</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
}

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
        color:'black'
    },
    closeButton: {
        position:'relative',
        left:92,
        padding: 6,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    TextInput:{
        borderBlockColor:'red',
        borderWidth:2,
        borderRadius:22,
        width:"85%",
        paddingLeft:33,
        color:'black',
    },
    login:{
        backgroundColor:'#1999a6',
        width:"85%",
        marginTop:45,
        borderRadius:23,
        height:"12%",
       
    }
});

export default LoginModal;
