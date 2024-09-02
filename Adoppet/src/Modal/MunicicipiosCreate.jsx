import { Modal, View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axiosClient from "../utils/AxiosClient";


function Create_Municipios({visible, onclose}){
     const [datos, setdatos]= useState({
        nombre:'',
        codigo_dane:''
     });


const crear = async()=>{
    if (!datos.nombre || !datos.codigo_dane) {
        Alert.alert("Llena los Campos");
        return;
         //valida sai nombre  es string
       }else if (!datos.nombre.trim() || isNaN(datos.nombre) === false) {
            Alert.alert("El campo nombre debe ser un string");
            return;
          }

    try {
        const crear  =await axiosClient.post("/crear_municipios", datos)
        Alert.alert("Se Creo El Municipio")
        onclose()
        setdatos(crear.data.mensaje)
         console.loo("resultado",crear.data.mensaje)

    } catch (error) {
        console.log(error)
    }
}

     const handinputchange = (text, fieldName) => {
        setdatos(prevUser => ({
            ...prevUser,
            [fieldName]: text
        }));
        console.log("valores", datos)
    };
    return(
        <Modal
        visible={visible}
          transparent={true}
          animationType="slide"
          onRequestClose={onclose}>
            <View style={style.container}>
                <View  style={style.form}>
                <TouchableOpacity onPress={onclose} style={style.close}>  
                <FontAwesomeIcon icon={faClose}  size={35}/>
                </TouchableOpacity>
                <Text style={style.title}>Crear Municipio</Text>
                <Text>Ingrese el Nombre</Text>
                <TextInput
                placeholder="Ingrese El Nombre"
                style={style.input}
                onChangeText={(text) => handinputchange(text, 'nombre')}
                />
                   <Text>Ingrese el Numero Dane</Text>
                 <TextInput
                placeholder="Ingrese El No° Dane"
                style={style.input}
                keyboardType="number-pad"
                onChangeText={(text) => handinputchange(text, 'codigo_dane')}
                />

                <TouchableOpacity style={style.buttom} onPress={crear}>
                    <Text style={style.text}>Crear Municipio</Text>
                </TouchableOpacity>

                </View>
            </View>
          </Modal>
    )
}

const style = StyleSheet.create({
    container:{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex:1,
        justifyContent:"center"
    },
    form:{
        backgroundColor:"white",
        height:"63%",
        alignItems:"center",
        width:"78%",
        marginLeft:34,
        borderRadius:12
    },
    close:{
        position:"absolute",
        right:40,
        top:22
    },
    title:{
        color:"black",
        fontSize:23,
        marginTop:53
    },
    input: {
        borderColor: "#1999a6",
        borderWidth: 2,
        padding: 8,
        borderRadius: 34,
        width: '80%',
        marginTop:23, 
        marginBottom: 20, 
        textAlign:"center"
    },
    buttom:{
        backgroundColor:"#1999a6",
        borderRadius:12,
        margin:12,
        height:34,
        width:"73%",
         alignItems:"center"
      
      },
      text:{
        color :"white",
        padding:5,
      }
})
export default Create_Municipios;